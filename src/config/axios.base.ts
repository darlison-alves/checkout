import axios from "axios";

// const { BASE_URL } = import.meta.env

export const api = () => {
  return axios.create({
    baseURL: "http://localhost:5000/api",
    headers: {
      "Content-type": "application/json"
    }
  })
}