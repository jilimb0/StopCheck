import { fireEvent, render, screen } from "@testing-library/react"
import App from "./App"

test("renders service navigation buttons", () => {
  render(<App />)

  expect(screen.getByText("Компьютерная диагностика")).toBeInTheDocument()
  expect(screen.getByText("Расчёт стоимости")).toBeInTheDocument()
})

test("opens cost modal form", () => {
  render(<App />)

  fireEvent.click(screen.getByText("Расчёт стоимости"))

  expect(screen.getByPlaceholderText("Email")).toBeInTheDocument()
  expect(screen.getByRole("button", { name: "Отправить" })).toBeInTheDocument()
})
