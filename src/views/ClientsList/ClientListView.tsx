import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ClientsTable } from "../../components/Tables/ClientsTable"
import { api } from "../../config/axios.base"

export const ClientListView = () => {

  const [clients, setClients] = useState([])
  const [filters, setFilters] = useState({ page: 1, size: 10, name: '' })
  const [pagination, setPagination] = useState({ page: 1, size: 10, total: 0 })
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const getClients = () => {
    setLoading(true)
    api().get('/clients', {
      params: filters
    })
      .then(res => {
        setClients(res.data.content)
        setPagination(old => ({...old, page: res.data.page, size: res.data.size, total: res.data.totalPages }))
      }).catch(err => {
        
      }).finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    getClients()
  }, [filters])

  return (
    <ClientsTable 
      loading={loading} 
      clients={clients} 
      setFilters={setFilters} 
      pagination={pagination}
      onEdit={(client: any) => {
        navigate('/clients/new', { state: client })
      }}
    />
  )
}