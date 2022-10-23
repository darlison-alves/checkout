import { useEffect, useState } from "react"
import { api } from "../config/axios.base"

export const useGetInfoUser = () => {
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<any>({})
  const getMe = () => {
    setLoading(true)
    if (localStorage.getItem('@IBB_USER')) {
      console.log('MEU')
      const userData: any = JSON.parse(localStorage.getItem('@IBB_USER') || "{}")
      setUser((old: any) => ({...old, ...userData }))
      setLoading(false)
    } else {
      api().get('/user/me')
        .then(res => {
          setUser(res.data)
          localStorage.setItem('@IBB_USER', JSON.stringify(res.data))
        }).catch(err => {
          // console.error(err)
        }).finally(() => {
          setLoading(false)
        })
    }
  }

  useEffect(() => {
    console.log('dwdwd')
    getMe()
  }, [])

  return { loading, user, setLoading, getMe }

}