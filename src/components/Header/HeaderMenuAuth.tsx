import { useContext, useEffect, useState } from "react"
import { IsLoggedContext } from "../../context/IsLoggedContext"
import { useGetInfoUser } from "../../hooks/useGetInfoUser"
import { HeaderMenu } from "./HeaderMenu"
import { HeaderMenuAdmin } from "./HeaderMenuAdmin"

export const HeaderMenuAuth = () => {
  
  const { user, getMe } = useGetInfoUser()

  const [profile, setProfile] = useState("")
  
  const { isLogged } = useContext(IsLoggedContext)

  useEffect(() => {
    console.log('user', user, isLogged)
    setProfile(user.perfil)
  }, [user])

  useEffect(() => {
    getMe()
  }, [isLogged])

  return (
    <>
      <HeaderMenuAdmin profile={profile} />
      <HeaderMenu profile={profile} />
    </>
  )
}