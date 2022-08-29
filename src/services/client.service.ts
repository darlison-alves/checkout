import { api } from "../config/axios.base";

export class ClientService {
  async update(data: any ) {
    return api().put("/clients", data)
  }

  async create(data: any ) {
    return api().post("/clients", data)
  }
}