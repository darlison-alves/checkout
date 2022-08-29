import React, { createContext, useState } from "react";
import { SuccessSendToast, ToastAlert } from "../components/Toast/Success.toast";
import { ErrorEnum } from "../interfaces/enums/errors.enum";

export const ToastContext = createContext({
  message: "",
  setMessage: (message: string) => {},
  showToast: (message: string) => {},
  type: "",
  setType: (type: ErrorEnum) => {}
})

export const ToastProvider = ({ children }: any) => {
  const [ message, setMessage] = useState("")
  const [ showed, setShowed] = useState(false)
  const [ type, setType] = useState(ErrorEnum.info)

  const showToast = (message: string) => {
    setMessage(message)
    setShowed(true);

    setTimeout(() => {
      setMessage("")
      setShowed(false)
    }, 5000)
  }

  return (
    <ToastContext.Provider value={{ message, setMessage, showToast, type, setType }}>
      { showed && <ToastAlert message={message} type={type} /> }
      {children}
    </ToastContext.Provider>
  )
}