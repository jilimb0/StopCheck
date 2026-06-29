import React, { useCallback, useEffect } from "react"
import "./styles/App.scss"

const Modal = ({ show, hideModal, children }) => {
  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "Escape" && show) {
        event.preventDefault()
        hideModal?.(event)
      }
    },
    [show, hideModal],
  )

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])

  return (
    <div className={show ? "modal show" : "modal"} onClick={hideModal}>
      <div
        className={show ? "modal__content show" : "modal__content"}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}

export default Modal
