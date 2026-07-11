import { useCallback, useState } from "react"
import logo from "./img/logo.png"
import "./styles/App.scss"
import form from "./form.json"
import inst from "./img/insta.svg"
import Modal from "./Modal.jsx"
import services from "./services.json"

const UI_MESSAGES = {
  ru: {
    sending: "Отправка...",
    fallbackSubmitError: "Произошла ошибка при отправке формы.",
    networkSubmitError: "Не удалось отправить форму. Попробуйте позже.",
  },
  uk: {
    sending: "Надсилання...",
    fallbackSubmitError: "Сталася помилка під час надсилання форми.",
    networkSubmitError: "Не вдалося надіслати форму. Спробуйте пізніше.",
  },
  en: {
    sending: "Sending...",
    fallbackSubmitError: "An error occurred while submitting the form.",
    networkSubmitError: "Unable to submit the form. Please try again later.",
  },
}

const SERVICE_TRANSLATIONS = {
  uk: {
    1: {
      title: "Комп'ютерна діагностика",
      price: "від 300 грн",
      content:
        "Читання та інтерпретація помилок. Пошук несправностей. Адаптації та скидання адаптацій. Кодування комплектацій. Скидання crash data. Кодування форсунок. Діагностика та налаштування ГБО",
    },
    2: {
      title: "Чип-тюнінг",
      price: "від 2000 грн",
      content:
        "DPF Відключення сажового фільтра. EGR Відключення клапана рециркуляції відпрацьованих газів. FLAP Відключення заслінок впускного колектора. AdBlue Відключення впорскування сечовини. Immo Відключення імобілайзера. Euro 2 Відключення другого датчика кисню. Tuning Покращення динамічних та економічних характеристик двигуна",
    },
    3: {
      title: "Підбір автомобіля",
      price: "від 600 грн",
      content:
        "Огляд на наявність прихованих дефектів. Перевірка лакофарбового покриття. Комп'ютерна діагностика",
    },
    4: {
      title: "Механічні роботи",
      price: "від 500 грн",
      content:
        "Пошук підсосу повітря димогенератором. Перевірка тиску палива. Перевірка тиску масла. Перевірка системи запалювання. Ендоскопія двигуна. Перевірка компресії. Перевірка витоку надпоршневого простору. Регулювання упорскування дизельних двигунів 1.9 2.5 авто групи VAG. Чистка форсунок на авто: D4,GDI,FSI,TFSI,MPI",
    },
    5: { title: "Розрахунок вартості" },
    6: { title: "Контакти" },
  },
  en: {
    1: {
      title: "Computer Diagnostics",
      price: "from 300 UAH",
      content:
        "Reading and interpreting fault codes. Troubleshooting. Adaptations and adaptation reset. Feature coding. Crash data reset. Injector coding. LPG diagnostics and setup",
    },
    2: {
      title: "Chip Tuning",
      price: "from 2000 UAH",
      content:
        "DPF particulate filter disable. EGR exhaust gas recirculation disable. FLAP intake manifold flap disable. AdBlue injection disable. Immo immobilizer disable. Euro 2 second oxygen sensor disable. Tuning to improve engine dynamics and fuel economy",
    },
    3: {
      title: "Car Selection",
      price: "from 600 UAH",
      content: "Inspection for hidden defects. Paintwork thickness check. Computer diagnostics",
    },
    4: {
      title: "Mechanical Works",
      price: "from 500 UAH",
      content:
        "Intake leak detection by smoke generator. Fuel pressure check. Oil pressure check. Ignition system check. Engine endoscopy. Compression check. Combustion chamber leak check. Injection adjustment for 1.9 and 2.5 VAG diesel engines. Injector cleaning on vehicle: D4,GDI,FSI,TFSI,MPI",
    },
    5: { title: "Price Estimate" },
    6: { title: "Contacts" },
  },
}

const FORM_TRANSLATIONS = {
  uk: {
    8: { label1: "Email", label2: "Номер телефону" },
    9: { label: "Ім'я" },
    10: { label: "Марка, модель авто" },
    11: { label: "Рік випуску, пробіг" },
    12: { label1: "Потужність к.с.", label2: "Об'єм" },
    13: {
      label: "Двигун",
      values: ["Турбований двигун", "Атмосферний двигун"],
    },
    14: {
      label: "Паливо",
      values: ["Дизель", "Бензин", "Пропан", "Метан"],
    },
    15: {
      label: "Цікавлять послуги",
      values: [
        "Збільшення потужності та зниження витрати",
        "Відключення сажового фільтра (програмно)",
        "Видалення системи ADBLUE (програмно)",
        "Чип-тюнінг автоматичної коробки передач",
        "Відключення системи зворотних газів EGR (програмно)",
        "Відключення каталізатора (програмно)",
        "Програмне видалення вихрових заслінок",
        "Свій варіант:",
        "Надіслати",
      ],
    },
  },
  en: {
    8: { label1: "Email", label2: "Phone number" },
    9: { label: "Name" },
    10: { label: "Car make and model" },
    11: { label: "Year and mileage" },
    12: { label1: "Power hp", label2: "Engine volume" },
    13: {
      label: "Engine",
      values: ["Turbocharged engine", "Naturally aspirated engine"],
    },
    14: {
      label: "Fuel",
      values: ["Diesel", "Petrol", "LPG", "CNG"],
    },
    15: {
      label: "Interested services",
      values: [
        "Increase power and reduce fuel consumption",
        "Disable particulate filter (software)",
        "Remove ADBLUE system (software)",
        "Automatic transmission chip tuning",
        "Disable EGR system (software)",
        "Disable catalytic converter (software)",
        "Software removal of swirl flaps",
        "Custom request:",
        "Send",
      ],
    },
  },
}

const CONTACTS = {
  ru: {
    address: "Город N, ул. Примерная 123",
    phone: "+1 (000) 000-00-00",
  },
  uk: {
    address: "Місто N, вул. Прикладна 123",
    phone: "+1 (000) 000-00-00",
  },
  en: {
    address: "City N, Example Street 123",
    phone: "+1 (000) 000-00-00",
  },
}

const initialModalDataState = {
  id: null,
  title: "",
  price: "",
  content: "",
}

const App = () => {
  const [modalData, setModalData] = useState(initialModalDataState)
  const [show, setShow] = useState(false)
  const [submitStatus, setSubmitStatus] = useState("idle")
  const [submitMessage, setSubmitMessage] = useState("")
  const [lang, setLang] = useState("ru")

  const setLanguage = useCallback((newLang) => {
    setLang(newLang)
  }, [])

  const getLocalizedServiceData = (service) => {
    if (!service) {
      return initialModalDataState
    }

    const localized = SERVICE_TRANSLATIONS[lang]?.[service.id]
    return { ...service, ...localized }
  }

  const getFormItem = (id) => {
    const baseItem = form.find((item) => item.id === id)
    if (!baseItem) {
      return null
    }

    const localized = FORM_TRANSLATIONS[lang]?.[id]
    return localized ? { ...baseItem, ...localized } : baseItem
  }

  const showModal = useCallback((data) => {
    setShow(true)
    setModalData(data || initialModalDataState)
    setSubmitStatus("idle")
    setSubmitMessage("")
  }, [])

  const hideModal = useCallback(() => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur()
    }

    setShow(false)
    setModalData(initialModalDataState)
    setSubmitStatus("idle")
    setSubmitMessage("")
  }, [])

  const handleClick = useCallback(
    (event) => {
      const selectedId = Number(event.currentTarget.id)
      const data = services.find((item) => item.id === selectedId)
      showModal(data)
    },
    [showModal],
  )

  const handleFormSubmit = useCallback(
    async (event) => {
      event.preventDefault()

      const payload = new URLSearchParams(new FormData(event.currentTarget))
      const messages = UI_MESSAGES[lang]

      setSubmitStatus("loading")
      setSubmitMessage("")

      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(Object.fromEntries(payload.entries())),
        })
        const data = await response.json()

        setSubmitStatus(response.ok ? "success" : "error")
        setSubmitMessage(data.message || messages.fallbackSubmitError)
      } catch (_error) {
        setSubmitStatus("error")
        setSubmitMessage(messages.networkSubmitError)
      }
    },
    [lang],
  )

  const renderCostForm = () => {
    const emailPhone = getFormItem(8)
    const baseFields = form
      .filter((item) => item.id >= 9 && item.id <= 11)
      .map((item) => getFormItem(item.id))
    const powerVolume = getFormItem(12)
    const engine = getFormItem(13)
    const fuel = getFormItem(14)
    const servicesField = getFormItem(15)

    return (
      <form onSubmit={handleFormSubmit} id="service-form" noValidate>
        {emailPhone && (
          <div className="text__input_inline-block">
            <input
              id={emailPhone.name1}
              placeholder={emailPhone.label1}
              name={emailPhone.name1}
              type="email"
              className="text__input_inline"
              required
            />
            <input
              id={emailPhone.name2}
              placeholder={emailPhone.label2}
              name={emailPhone.name2}
              type="tel"
              className="text__input_inline"
              required
            />
          </div>
        )}

        {baseFields.map((item) => (
          <input
            key={item.id}
            id={item.name}
            placeholder={item.label}
            name={item.name}
            type="text"
            className="text__input"
            required
          />
        ))}

        {powerVolume && (
          <div className="text__input_inline-block">
            <input
              id={powerVolume.name1}
              placeholder={powerVolume.label1}
              name={powerVolume.name1}
              type="number"
              className="text__input_inline"
              required
            />
            <input
              id={powerVolume.name2}
              placeholder={powerVolume.label2}
              name={powerVolume.name2}
              type="number"
              className="text__input_inline"
              required
            />
          </div>
        )}

        {engine && (
          <select name={engine.name} defaultValue="" required>
            <option disabled value="">
              {engine.label}
            </option>
            {engine.values.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        )}

        {fuel && (
          <select name={fuel.name} defaultValue="" required>
            <option disabled value="">
              {fuel.label}
            </option>
            {fuel.values.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        )}

        {servicesField && (
          <>
            <select name={servicesField.name} defaultValue="" required>
              <option disabled value="">
                {servicesField.label}
              </option>
              {servicesField.values.slice(0, 7).map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
            <input id="message" placeholder={servicesField.values[7]} type="text" name="message" />
            <button className="btn__submit" type="submit" disabled={submitStatus === "loading"}>
              {submitStatus === "loading" ? UI_MESSAGES[lang].sending : servicesField.values[8]}
            </button>
          </>
        )}

        {submitMessage && <div className="form__response">{submitMessage}</div>}
      </form>
    )
  }

  const renderContacts = () => {
    const contact = CONTACTS[lang]

    return (
      <>
        <a href="/#" className="adress">
          {contact.address}
        </a>
        <a href="/#" className="tel">
          {contact.phone}
        </a>
        <a href="/#" className="img__link">
          <img src={inst} alt="Instagram" className="img__link" />
        </a>
      </>
    )
  }

  const renderModalContent = (data) => {
    if (!data.id) {
      return null
    }

    if (data.id <= 4) {
      return data.content
        .split(". ")
        .filter(Boolean)
        .map((line) => <div key={line}>{line.trim()}</div>)
    }

    return data.content
  }

  const renderAdditionalData = (data) => {
    if (data.id === 5) {
      return renderCostForm()
    }

    if (data.id === 6) {
      return renderContacts()
    }

    return null
  }

  const localizedModalData = getLocalizedServiceData(modalData)

  return (
    <div className="container">
      <div className="lang-switcher" role="group" aria-label="Language switcher">
        <button
          type="button"
          className={`lang-btn ${lang === "ru" ? "active" : ""}`}
          onClick={() => setLanguage("ru")}
        >
          RU
        </button>
        <button
          type="button"
          className={`lang-btn ${lang === "uk" ? "active" : ""}`}
          onClick={() => setLanguage("uk")}
        >
          UA
        </button>
        <button
          type="button"
          className={`lang-btn ${lang === "en" ? "active" : ""}`}
          onClick={() => setLanguage("en")}
        >
          EN
        </button>
      </div>

      <div className="menu">
        <div className="buttons__left">
          {services
            .filter((item) => item.id <= 3)
            .map((item) => {
              const localizedItem = getLocalizedServiceData(item)
              return (
                <button
                  key={item.id}
                  id={item.id}
                  className="button gradient-btn"
                  onClick={handleClick}
                >
                  {localizedItem.title}
                </button>
              )
            })}
        </div>
        <div className="logo">
          <a href="#index" className="logo__link">
            <img src={logo} className="logo__icon" alt="StopCheck" />
          </a>
        </div>
        <div className="buttons__right">
          {services
            .filter((item) => item.id > 3)
            .map((item) => {
              const localizedItem = getLocalizedServiceData(item)
              return (
                <button
                  key={item.id}
                  id={item.id}
                  className="button gradient-btn"
                  onClick={handleClick}
                >
                  {localizedItem.title}
                </button>
              )
            })}
        </div>
      </div>

      <Modal show={show} hideModal={hideModal}>
        <button className="close" onClick={hideModal}>
          X
        </button>
        <div className="title">{localizedModalData.title}</div>
        <div className="price">{localizedModalData.price}</div>
        <div className={`content content-${localizedModalData.id || "none"}`}>
          {renderModalContent(localizedModalData)}
        </div>
        {renderAdditionalData(localizedModalData)}
      </Modal>
    </div>
  )
}

export default App
