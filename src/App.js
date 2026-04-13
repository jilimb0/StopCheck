import React from "react"
import logo from "./img/logo.png"
import "./styles/App.scss"
import Modal from "./modal.js"
import inst from "./img/insta.svg"
import services from "./services.json"
import form from "./form.json"

class App extends React.Component {
  constructor(props) {
    super(props)

    this.initialModalDataState = {
      id: null,
      title: "",
      price: "",
      content: "",
    }

    this.state = {
      modalData: this.initialModalDataState,
      show: false,
      submitStatus: "idle",
      submitMessage: "",
    }
  }

  showModal = (modalData) => {
    this.setState({
      show: true,
      modalData: modalData || this.initialModalDataState,
      submitStatus: "idle",
      submitMessage: "",
    })
  }

  hideModal = () => {
    this.setState({
      show: false,
      modalData: this.initialModalDataState,
      submitStatus: "idle",
      submitMessage: "",
    })
  }

  handleClick = (event) => {
    const selectedId = Number(event.currentTarget.id)
    const data = services.find((item) => item.id === selectedId)
    this.showModal(data)
  }

  getFormItem = (id) => form.find((item) => item.id === id)

  handleFormSubmit = async (event) => {
    event.preventDefault()

    const payload = new URLSearchParams(new FormData(event.currentTarget))

    this.setState({ submitStatus: "loading", submitMessage: "" })

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(payload.entries())),
      })
      const data = await response.json()

      this.setState({
        submitStatus: response.ok ? "success" : "error",
        submitMessage: data.message || "Произошла ошибка при отправке формы.",
      })
    } catch (error) {
      this.setState({
        submitStatus: "error",
        submitMessage: "Не удалось отправить форму. Попробуйте позже.",
      })
    }
  }

  renderCostForm = () => {
    const emailPhone = this.getFormItem(8)
    const baseFields = form.filter((item) => item.id >= 9 && item.id <= 11)
    const powerVolume = this.getFormItem(12)
    const engine = this.getFormItem(13)
    const fuel = this.getFormItem(14)
    const servicesField = this.getFormItem(15)
    const { submitStatus, submitMessage } = this.state

    return (
      <form onSubmit={this.handleFormSubmit} id="service-form" noValidate>
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
            <input
              id="message"
              placeholder={servicesField.values[7]}
              type="text"
              name="message"
            />
            <button className="btn__submit" type="submit" disabled={submitStatus === "loading"}>
              {submitStatus === "loading" ? "Отправка..." : servicesField.values[8]}
            </button>
          </>
        )}

        {submitMessage && <div className="form__response">{submitMessage}</div>}
      </form>
    )
  }

  renderContacts = () => (
    <>
      <a href="https://cutt.ly/VhPW0my" className="adress">
        Хмельницкий, ул. Курчатова 8/10
      </a>
      <a href="tel:+380932800306" className="tel">
        +380 93 28 00 306
      </a>
      <a
        href="https://instagram.com/stop.check?igshid=1l5d3dnyrixx4"
        className="img__link"
      >
        <img src={inst} alt="Instagram" className="img__link" />
      </a>
    </>
  )

  renderModalContent = () => {
    const { modalData } = this.state

    if (!modalData.id) {
      return null
    }

    if (modalData.id <= 4) {
      return modalData.content
        .split(". ")
        .filter(Boolean)
        .map((line) => <div key={line}>{line.trim()}</div>)
    }

    return modalData.content
  }

  renderAdditionalData = () => {
    const { modalData } = this.state

    if (modalData.id === 5) {
      return this.renderCostForm()
    }

    if (modalData.id === 6) {
      return this.renderContacts()
    }

    return null
  }

  render() {
    const { modalData, show } = this.state

    return (
      <div className="container">
        <div className="menu">
          <div className="buttons__left">
            {services
              .filter((item) => item.id <= 3)
              .map((item) => (
                <button
                  key={item.id}
                  id={item.id}
                  className="button gradient-btn"
                  onClick={this.handleClick}
                >
                  {item.title}
                </button>
              ))}
          </div>
          <div className="logo">
            <a href="#index" className="logo__link">
              <img src={logo} className="logo__icon" alt="StopCheck" />
            </a>
          </div>
          <div className="buttons__right">
            {services
              .filter((item) => item.id > 3)
              .map((item) => (
                <button
                  key={item.id}
                  id={item.id}
                  className="button gradient-btn"
                  onClick={this.handleClick}
                >
                  {item.title}
                </button>
              ))}
          </div>
        </div>

        <Modal show={show} hideModal={this.hideModal}>
          <button className="close" onClick={this.hideModal}>
            X
          </button>
          <div className="title">{modalData.title}</div>
          <div className="price">{modalData.price}</div>
          <div className={`content content-${modalData.id || "none"}`}>
            {this.renderModalContent()}
          </div>
          {this.renderAdditionalData()}
        </Modal>
      </div>
    )
  }
}

export default App
