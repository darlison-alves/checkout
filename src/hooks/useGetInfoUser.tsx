import { useEffect, useState } from "react"
import { api } from "../config/axios.base"

export const useGetInfoUser = () => {
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<any>({})
  const [roles, setRoles] = useState([])

  const getMe = () => {

    if (localStorage.getItem('@IBB_USER')) {
      const userData: any = JSON.parse(localStorage.getItem('@IBB_USER') || "{}")
      console.log('dwddwdw', userData)
      setUser((old: any) => ({...old, ...userData }))
    } else {
      api().get('/user/me')
        .then(res => {
          console.log(res.data)
          setUser(res.data)
          localStorage.setItem('@IBB_USER', JSON.stringify(res.data))
        }).catch(err => {
          console.error(err)
        })
    }
  }

  useEffect(() => {
    getMe()
  }, [])

  return { loading, user }

}