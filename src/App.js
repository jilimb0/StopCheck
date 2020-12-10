import React from "react"
import logo from "./img/logo.png"
import "./styles/App.css"
import Modal from "./modal.js"

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
      services: [
        {
          id: 1,
          title: "Компьютерная диагностика",
          price: "от 300 грн",
          content: `Чтение и интерпретация ошибок 
Поиск неисправностей
Адаптации и сброс адаптаций
Кодирование комплектаций
Сброс краш даты
Настройка угла впрыска дизельных автомобилей после замены ГРМ
Кодировка форсунок
Диагностика и настройка ГБО`,
        },
        {
          id: 2,
          title: "Чип Тюнинг",
          price: "от 2000 грн",
          content: `Программное отключение: 
    DPF FAP Сажевого фильтра 
    EGR Клапана рециркуляции отработанных газов 
AdBlue Отключение впрыска мочевины 
Immo Отключение иммобилайзера 
Euro 2 Отключение второго датчика кислорода
Tuning Улучшение динамических и Економических характеристик двигателя`,
        },
        {
          id: 3,
          title: "Подбор  автомобиля при покупке",
          price: "от 600 грн",
          content: `Осмотр на наличие скрытых дефектов
Проверка лакокрасочного покрытия 
Компьютерная диагностика 
Сопровождение при осмотре на СТО`,
        },
        {
          id: 4,
          title: "Механические работы",
          price: "от 500 грн",
          content: `Поиск подсоса воздуха дымогенератором
Проверка давления топлива
Проверка давления масла
Проверка системы зажигания
Ендоскопия двигателя
Проверка компрессии
Проверка утечки надпоршневого пространства 
Регулировка начального угла впрыска дизельных двигателей 1.9 2.5 автомобилей группы ваг
Чистка форсунок на автомобиле:  D4,GDI,FSI,TFSI,MPI`,
        },
        { id: 5, title: "Запись" },
        {
          id: 6,
          title: "Контакты",
          content: `
+380909090909
+380909090909
+380909090909`,
        },
      ],
    }
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
    const services = this.state.services

    const data = services.find((item) => {
      return item.id === Number(event.target.id)
    })

    this.showModal(data)
  }

  render() {
    const { modalData, services } = this.state

    return (
      <div class="container">
        <div class="menu">
          <div class="buttons__left">
            {services.map((item) => {
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
            {services.map((item) => {
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
        </Modal>
      </div>
    )
  }
}

export default App
