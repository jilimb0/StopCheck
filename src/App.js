import React from "react"
import logo from "./img/logo.png"
import "./styles/App.css"
import Modal from "./modal.js"
import inst from "./img/insta.svg"
import services from "./services.json"
import form from "./form.json"

class App extends React.Component {
  constructor(props) {
    super(props)

    this.initialModalDataState = {
      title: "",
      price: "",
      content: "",
    }

    this.state = {
      modalData: this.initialModalDataState,
      show: false,
    }
  }

  componentDidMount() {
    const cost = services.find((item) => item.id === 5)
    const contacts = services.find((item) => item.id === 6)

    cost.additionalData = (
      <form>
        {form
          .filter((item) => item.id === 8)
          .map((item) => {
            return (
              <div className="text__input_inline-block">
                <input
                  id={item.id}
                  placeholder={item.label1}
                  type="text"
                  className="text__input_inline"
                ></input>
                <input
                  id={item.id}
                  placeholder={item.label2}
                  type="text"
                  className="text__input_inline"
                ></input>
              </div>
            )
          })}
        {form
          .filter((item) => item.id >= 9 && item.id <= 11)
          .map((item) => {
            return (
              <input
                id={item.id}
                placeholder={item.label}
                type="text"
                className="text__input"
              ></input>
            )
          })}
        {form
          .filter((item) => item.id === 12)
          .map((item) => {
            return (
              <div className="text__input_inline-block">
                <input
                  id={item.id}
                  placeholder={item.label1}
                  type="text"
                  className="text__input_inline"
                ></input>
                <input
                  id={item.id}
                  placeholder={item.label2}
                  type="text"
                  className="text__input_inline"
                ></input>
              </div>
            )
          })}
        {form
          .filter((item) => item.id === 13)
          .map((item) => {
            return (
              <select>
                <option selected disabled value={item.label}>
                  {item.label}
                </option>
                <option value={item.values[0]}>{item.values[0]}</option>
                <option value={item.values[1]}>{item.values[1]}</option>
              </select>
            )
          })}
        {form
          .filter((item) => item.id === 14)
          .map((item) => {
            return (
              <select>
                <option selected disabled value={item.label}>
                  {item.label}
                </option>
                <option value={item.values[0]}>{item.values[0]}</option>
                <option value={item.values[1]}>{item.values[1]}</option>
                <option value={item.values[2]}>{item.values[2]}</option>
                <option value={item.values[3]}>{item.values[3]}</option>
              </select>
            )
          })}
        {form
          .filter((item) => item.id === 15)
          .map((item) => {
            return (
              <>
                <select>
                  <option selected disabled value={item.label}>
                    {item.label}
                  </option>
                  <option value={item.values[0]}>{item.values[0]}</option>
                  <option value={item.values[1]}>{item.values[1]}</option>
                  <option value={item.values[2]}>{item.values[2]}</option>
                  <option value={item.values[3]}>{item.values[3]}</option>
                  <option value={item.values[4]}>{item.values[4]}</option>
                  <option value={item.values[5]}>{item.values[5]}</option>
                  <option value={item.values[6]}>{item.values[6]}</option>
                </select>
                <input
                  id={item.id}
                  placeholder={item.values[7]}
                  type="text"
                ></input>
              </>
            )
          })}
      </form>
    )
    contacts.additionalData = (
      <>
        <a href="https://cutt.ly/VhPW0my" className="adress">
          Хмельницкий, ул. Курчатова 8/10
        </a>
        <a href="tel:+380 93 28 00 306" className="tel">
          +380 93 28 00 306
        </a>
        <a
          href="https://instagram.com/stop.check?igshid=1l5d3dnyrixx4"
          className="img__link"
        >
          <img src={inst} alt="" className="img__link" />
        </a>
      </>
    )
  }

  showModal = (modalData) => {
    this.setState({
      show: true,
      modalData: modalData || this.initialModalDataState,
    })
  }

  hideModal = (e) => {
    this.setState({
      show: false,
      modalData: this.initialModalDataState,
    })
  }

  handleClick = (event) => {
    const data = services.find((item) => {
      return item.id === Number(event.target.id)
    })

    this.showModal(data)
  }

  render() {
    const { modalData } = this.state

    return (
      <div class="container">
        <div class="menu">
          <div class="buttons__left">
            {services
              .filter((item) => item.id <= 3)
              .map((item) => {
                return (
                  <button
                    id={item.id}
                    className="button gradient-btn"
                    onClick={this.handleClick}
                  >
                    {item.title}
                  </button>
                )
              })}
          </div>
          <div class="logo">
            <a href="#index" class="logo__link">
              <img src={logo} class="logo__icon" alt="" />
            </a>
          </div>
          <div class="buttons__right">
            {services
              .filter((item) => item.id > 3)
              .map((item) => {
                return (
                  <button
                    id={item.id}
                    className="button gradient-btn"
                    onClick={this.handleClick}
                  >
                    {item.title}
                  </button>
                )
              })}
          </div>
        </div>

        <Modal show={this.state.show} hideModal={this.hideModal}>
          <div className="title">{modalData.title}</div>
          <div className="price">{modalData.price}</div>
          <div className="content">{modalData.content}</div>
          {modalData.additionalData && modalData.additionalData}
        </Modal>
      </div>
    )
  }
}

export default App
