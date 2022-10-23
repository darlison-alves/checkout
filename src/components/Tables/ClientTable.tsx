import { Pagination } from "@mui/material"
import { initialDataCompany } from "../../utils/payloads.utils"
import { ButtonCustom } from "../Button/Button"
import { Input } from "../Input/Input"
import { LoadingFullLigth } from "../Loading/loading.full.compoment"

export const ClientTable = ({
  clients = [],
  setFilters = (filters: any) => { },
  pagination = { total: 0 },
  loading = false,
  onEdit = (data: any) => { }
}) => {
  return (
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
      {loading && <LoadingFullLigth />}
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <caption className="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
          <p>Lista Clientes </p>
          {/* <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">Browse a list of Flowbite products designed to help you work and play, stay organized, get answers, keep in touch, grow your business, and more.</p> */}
          <div className="my-3">
            <Input focusPlaceholder="Pesquisar por nome" type="text" placeholder="Pesquisar por nome" />
          </div>
          <div className="min-w-screen flex" style={{ float: 'right' }}>           
            <ButtonCustom
              onClick={() => onEdit(initialDataCompany)}
              text="Novo Cliente"
              type="button" className="mr-2 mb-2 p-2 bg-primary text-sm " />
          </div>
        </caption>
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="py-3 px-6">
              Nome
            </th>
            <th scope="col" className="py-3 px-6">
              CPF
            </th>
            <th scope="col" className="py-3 px-6">
              Telefone
            </th>
            <th scope="col" className="py-3 px-6">
              Código Indicação
            </th>
            <th scope="col" className="py-3 px-6">
              Ações
            </th>            
          </tr>
        </thead>
        <tbody>

          {
            clients.map((client: any) => {
              return (
                <tr key={client.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="py-4 px-6">
                    {client?.user?.name}
                  </td>
                  <td className="py-4 px-6">
                    {client?.cpf}
                  </td>
                  <td className="py-4 px-6">
                    {client?.telefone}
                  </td>
                  <td className="py-4 px-6">
                    {client?.user?.indicationCode}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <a href="#" onClick={() => onEdit(client)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={4} >
              <Pagination count={pagination.total} onChange={(evt, page) => setFilters((old: any) => ({ ...old, page }))} />
            </td>
          </tr>
          
        </tfoot>
      </table>
    </div>
  )
}