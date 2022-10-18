import { api } from "../config/axios.base";
import { IBankData } from "../interfaces/bank.interface";

export class BankService {
  async activateAccount(userId: number) {
    return api().put(`/marketplace/accounts/${userId}/activate`)
  }

  async create(data:IBankData, userId: number) {
    return api().post(`/marketplace/accounts/${userId}/create`, data)
  }

  async update(data:IBankData, userId: number) {
    return api().put(`/marketplace/accounts/${userId}/update`, data)
  }

  async createOrUpdate(data:IBankData, userId: number) {
    if(data.id) return this.update(data, userId)
    return this.create(data, userId)
  }

  async getProfile(userName: string) {
    return api().get(`/users/${userName}`)
  }
}