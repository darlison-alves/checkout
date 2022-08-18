import { PropsWithChildren } from "react";
import { isAuthenticated } from "../../services/auth";

export const AuthNotShowedComponent = ({ children }: PropsWithChildren) => {
  if(isAuthenticated()) return <div />
  return (
    <>{ children }</>
  )
}

export const AuthShowedComponent = ({ children }: PropsWithChildren) => {
  if(!isAuthenticated()) return <div />
  return (
    <>{ children }</>
  )
}