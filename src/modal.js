import React from "react"
import "./styles/App.css"

class Modal extends React.Component {
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
