import { useEffect, useState } from "react"
import { CouponCompanyCard } from "../../components/Card/Coupon.Company.Card"
import { LoadingFullLigth } from "../../components/Loading/loading.full.compoment"
import { useGetInfoUser } from "../../hooks/useGetInfoUser"
import { ICompanyPartner } from "../../interfaces/company.interface"
import { CompanyService } from "../../services/company.service"

const companyService = new CompanyService()

export const CompanyPartnerListView = () => {

  const [companies, setCompanies] = useState<Array<ICompanyPartner>>([])
  const [filters, setFilters] = useState({ page: 1, size: 10, name: '', companyTypes: ["PARTNER"] })
  const [loading, setLoading] = useState(false)

  const { user } = useGetInfoUser()

  useEffect(() => {
    setLoading(true)
    companyService.findAll(filters).then(res => {
      setCompanies(res.data.content)
    }).catch(err => {
    }).finally(() => {
      setLoading(false)
    })
  }, [filters])

  return (
    <div className="mt-5 px-10">
      {loading && <LoadingFullLigth />}
      {
        !loading && companies.map(company => {
          return(
            <CouponCompanyCard clienteId={user.clientId} company={company} />
          )
        })
      }
    </div>
  )
}