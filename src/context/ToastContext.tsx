import React, { createContext, useState } from "react";
import { SuccessSendToast } from "../components/Toast/Success.toast";

export const ToastContext = createContext({
  message: "",
  setMessage: (message: string) => {},
  showToast: (message: string) => {}
})

export const ToastProvider = ({ children }: any) => {
  const [ message, setMessage] = useState("")
  const [ showed, setShowed] = useState(false)

  const showToast = (message: string) => {
    setMessage(message)
    setShowed(true);

    setTimeout(() => {
      setMessage("")
      setShowed(false)
    }, 5000)
  }

  return (
    <ToastContext.Provider value={{ message, setMessage, showToast }}>
      { showed && <SuccessSendToast message={message} /> }
      {children}
    </ToastContext.Provider>
  )
}