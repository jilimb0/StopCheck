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

  let payload

  try {
    payload = JSON.parse(event.body || "{}")
  } catch (_error) {
    return response(400, "Некорректный формат запроса")
  }

  for (const field of REQUIRED_FIELDS) {
    if (!payload[field] || !String(payload[field]).trim()) {
      return response(422, `Поле \"${field}\" обязательно для заполнения`)
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
    return response(
      503,
      "Форма временно недоступна: не настроен RESEND_API_KEY в Netlify Environment Variables."
    )
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
    return response(502, "Ошибка. Сообщение не отправлено!")
  }

  return response(200, "Спасибо за отправку вашего сообщения!")
}
