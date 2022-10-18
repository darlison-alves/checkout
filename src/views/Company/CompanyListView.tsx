import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { CompaniesTable } from "../../components/Tables/CompanyTable"
import { CompanyService } from "../../services/company.service"

export const CompanyListView = () => {
  const companyService = new CompanyService()
  const [companies, setCompanies] = useState([])
  const [filters, setFilters] = useState({ page: 1, size: 10, name: '', companyTypes: ["CLIENT", "PARTNER"] })
  const [pagination, setPagination] = useState({ page: 1, size: 10, total: 0 })
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true)
    companyService.findAll(filters)
      .then(res => {
        setCompanies(res.data.content)
        setPagination(old => ({ ...old, page: res.data.page, size: res.data.size, total: res.data.totalPages }))
      }).finally(() => {
        setLoading(false);
      })
  }, [filters])

  return (
    <div className="overflow-x-auto">
      <CompaniesTable
        companies={companies}
        loading={loading}
        setFilters={setFilters}
        pagination={pagination}
        onEdit={(company: any) => {
          navigate('/companies-admin/add', { state: company })
        }}
      />
    </div>
  )
}