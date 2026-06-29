import "@testing-library/jest-dom"
import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import App from "./App.jsx"

describe("StopCheck", () => {
  it("renders service navigation buttons", () => {
    render(<App />)
    expect(screen.getByText("Компьютерная диагностика")).toBeInTheDocument()
    expect(screen.getByText("Расчёт стоимости")).toBeInTheDocument()
  })

  it("opens cost modal form", () => {
    render(<App />)
    fireEvent.click(screen.getByText("Расчёт стоимости"))
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Отправить" })).toBeInTheDocument()
  })
})
