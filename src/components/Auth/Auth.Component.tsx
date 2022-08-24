import { PropsWithChildren } from "react";

export interface IPropsShowedComponent extends PropsWithChildren {
  isLogged: boolean
}

export const AuthNotShowedComponent = ({ children, isLogged = false }:IPropsShowedComponent ) => {

  if(isLogged) return <div />
  return (
    <>{ children }</>
  )
}

export const AuthShowedComponent = ({ children, isLogged }: IPropsShowedComponent) => {
  
  if(!isLogged) return <div />
  return (
    <>{ children }</>
  )
}