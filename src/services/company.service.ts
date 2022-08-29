import { api } from "../config/axios.base";

export class CompanyService {
  async findAll(filter: any) {
    return api().get('/empresa', { params: filter })
  }
}