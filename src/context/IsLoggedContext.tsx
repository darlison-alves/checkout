import React, { createContext, useEffect, useState } from "react";
import { isAuthenticated } from "../services/auth";

export const IsLoggedContext = createContext({
  isLogged: false,
  setIsLogged: (isLogged: boolean) => {}
})

export const IsLoggedProvider = ({ children }: any) => {
  const [ isLogged, setIsLogged] = useState(false)

  useEffect(() => {
    setIsLogged(isAuthenticated())
  }, [])
  
  return (
    <IsLoggedContext.Provider value={{ isLogged, setIsLogged }}>
      {children}
    </IsLoggedContext.Provider>
  )
}