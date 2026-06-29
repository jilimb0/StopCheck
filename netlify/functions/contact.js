const LOG_LEVELS = { debug: 0, info: 1, warn: 2, error: 3 }
const currentLevel = process.env.LOG_LEVEL || "info"

function serialize(args) {
  return args
    .map((a) => {
      if (a instanceof Error)
        return JSON.stringify({ message: a.message, stack: a.stack, name: a.name })
      if (typeof a === "object" && a !== null) return JSON.stringify(a)
      return String(a)
    })
    .join(" ")
}

function log(level, ...args) {
  if (LOG_LEVELS[level] < LOG_LEVELS[currentLevel]) return
  const timestamp = new Date().toISOString()
  const message = serialize(args)
  const output = `[${timestamp}] [${level.toUpperCase()}] ${message}`
  if (level === "error") console.error(output)
  else if (level === "warn") console.warn(output)
  else console.log(output)
}

const logger = {
  info: (...args) => log("info", ...args),
  error: (...args) => log("error", ...args),
  warn: (...args) => log("warn", ...args),
}

const RATE_WINDOW_MS = 60 * 1000
const RATE_MAX = 5
const rateBuckets = new Map()

function enforceRateLimit(ip) {
  const now = Date.now()
  const bucket = rateBuckets.get(ip) || { count: 0, resetAt: now + RATE_WINDOW_MS }
  if (now > bucket.resetAt) {
    bucket.count = 0
    bucket.resetAt = now + RATE_WINDOW_MS
  }
  bucket.count += 1
  rateBuckets.set(ip, bucket)
  if (bucket.count > RATE_MAX) {
    return { allowed: false, retryAfter: Math.ceil((bucket.resetAt - now) / 1000) }
  }
  return { allowed: true }
}

const REQUIRED_FIELDS = ["email", "phone", "name"]

const response = (statusCode, message) => ({
  statusCode,
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
  body: JSON.stringify({ message }),
})

const escapeHtml = (value = "") =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;")

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return response(405, "Метод не поддерживается")
  }

  const ip = event.headers["x-forwarded-for"] || event.headers["client-ip"] || "unknown"
  const rateResult = enforceRateLimit(ip)
  if (!rateResult.allowed) {
    logger.warn("Rate limit hit", { ip })
    return {
      statusCode: 429,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Retry-After": String(rateResult.retryAfter),
      },
      body: JSON.stringify({ message: "Слишком много запросов. Попробуйте позже." }),
    }
  }

  let payload
  try {
    payload = JSON.parse(event.body || "{}")
  } catch (_error) {
    logger.warn("Invalid request body", { ip })
    return response(400, "Некорректный формат запроса")
  }

  for (const field of REQUIRED_FIELDS) {
    if (!payload[field] || !String(payload[field]).trim()) {
      return response(422, `Поле "${field}" обязательно для заполнения`)
    }
  }

  const email = String(payload.email).trim()
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return response(422, "Ошибка. Укажите корректный email.")
  }

  const rows = [
    ["Телефон", payload.phone],
    ["Имя", payload.name],
    ["Марка, модель авто", payload.brand],
    ["Год выпуска, пробег", payload.year],
    ["Мощность л.с.", payload.power],
    ["Объём", payload.volume],
    ["Двигатель", payload.engine],
    ["Топливо", payload.fuel],
    ["Интересуемые услуги", payload.services],
    ["Свой вариант", payload.message],
  ]

  const html = rows
    .map(([label, value]) => `<b>${escapeHtml(label)}:</b> ${escapeHtml(value)}<br/>`)
    .join("")

  const resendApiKey = process.env.RESEND_API_KEY
  const toEmail = process.env.CONTACT_TO_EMAIL || "stopchek@gmail.com"
  const fromEmail = process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev"

  if (!resendApiKey) {
    logger.error("RESEND_API_KEY not configured")
    return response(503, "Форма временно недоступна: не настроен RESEND_API_KEY.")
  }

  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      reply_to: email,
      subject: "Отзыв с сайта",
      html,
    }),
  })

  if (!resendResponse.ok) {
    const errBody = await resendResponse.text()
    logger.error("Resend API error", { status: resendResponse.status, body: errBody })
    return response(502, "Ошибка. Сообщение не отправлено!")
  }

  logger.info("Contact form submitted", { email, ip })
  return response(200, "Спасибо за отправку вашего сообщения!")
}
