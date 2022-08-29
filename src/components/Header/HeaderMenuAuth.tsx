import { useEffect, useState } from "react"
import { useGetInfoUser } from "../../hooks/useGetInfoUser"
import { HeaderMenu } from "./HeaderMenu"
import { HeaderMenuAdmin } from "./HeaderMenuAdmin"

export const HeaderMenuAuth = () => {
  
  const { user } = useGetInfoUser()

  const [profile, setProfile] = useState("")

  useEffect(() => {
    console.log('user', user)
    setProfile(user.perfil)
  }, [user])

  return (
    <>
      <HeaderMenuAdmin profile={profile} />
      <HeaderMenu profile={profile} />
    </>
  )
}