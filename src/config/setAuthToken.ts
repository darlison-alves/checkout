import axios from "axios";

export const setAuthToken = (token: string) => {
  if(token)
    axios.defaults.headers.common['authorization'] = `Bearer ${token}`
  else
    delete axios.defaults.headers.common['authorization']
}