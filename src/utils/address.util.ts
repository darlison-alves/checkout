import axios from "axios";
import { IAddressVIACEP } from "../interfaces/address.interface";

export const handleCompleteAddressAPI = async (cep: string): Promise<IAddressVIACEP> => {
  const response = await axios.get<IAddressVIACEP>(
    `https://viacep.com.br/ws/${cep}/json/`
  );
  return response.data
}

export const addressView = ({ 
  bairro = "", cep = "" , cidade = "", codeIBGE = "", complemento = "", 
  estado = "", logradouro = "", numero = "", pais = "" }) => {
  return `${logradouro},\n ${numero}\n- ${bairro} - ${cidade}/${estado} - ${cep}`
}