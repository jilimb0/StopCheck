import React from "react"
import "./styles/App.scss"

class Modal extends React.Component {
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown)
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown)
  }

  handleKeyDown = (event) => {
    if (event.key === "Escape" && this.props.show) {
      event.preventDefault()
      this.hideModal(event)
    }
  }

  hideModal = (e) => {
    this.props.hideModal && this.props.hideModal(e)
  }

  render() {
    return (
      <div
        className={this.props.show ? "modal show" : "modal"}
        onClick={this.hideModal}
      >
        <div
          className={this.props.show ? "modal__content show" : "modal__content"}
          onClick={(e) => e.stopPropagation()}
        >
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default Modal
