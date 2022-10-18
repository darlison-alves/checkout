import { AxiosError, AxiosResponse } from "axios";

interface IAxiosResponse extends AxiosResponse {
  message: string;
}

export const getResponseError = (err: AxiosError<IAxiosResponse>): string => {
  const { message } = err.response ? err.response.data : { message: "error inesperado aconteceu!" }
  return message
}