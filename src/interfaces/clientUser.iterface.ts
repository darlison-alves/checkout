import { IAddress } from "./address.interface";

export interface IbankDetails {

}

export interface IUser {
  active: boolean;
  contaBancaria?: IbankDetails
  email: string;
  id: number;
  indicationCode: string;
  name: string;
  type: string;
  username: string;
}

export interface IClientUser {
  email?: string;
  nome?: string;
  cpf?: string;
  telefone?: string;
  endereco?: IAddress;
  user?: IUser
}