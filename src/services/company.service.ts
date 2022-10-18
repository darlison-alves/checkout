import { ICompanyPartnerForm } from "../components/Forms/CompanyPartner.Form";
import { api } from "../config/axios.base";

export class CompanyService {
  async findAll({ page, size, name = "", companyTypes }: any) {
    let query = "page=" + page + "&size=" + size + "&name=" +name;

    companyTypes.forEach((type: string, index: number) => {
      query = query + `&companyTypes[${index}]=${type}`
    })
    return api().get('/empresa?' + query)
  }

  async create(company: ICompanyPartnerForm) {
    return api().post('/empresa', {...company, username: company.user.email})
  }

  async update(company: ICompanyPartnerForm) {
    return api().put(`/empresa/${company.id}`, {...company, username: company.user.email})
  }
}