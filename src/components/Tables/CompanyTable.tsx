import { Pagination } from "@mui/material"
import { addressView } from "../../utils/address.util"
import { ButtonCustom } from "../Button/Button"
import { Input } from "../Input/Input"
import { LoadingFullLigth } from "../Loading/loading.full.compoment"
import { ImageProfile } from "../Profile/Image.Profile"

export const CompaniesTable = ({
  companies = [],
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
          <p>Lista Empresas </p>
          {/* <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">Browse a list of Flowbite products designed to help you work and play, stay organized, get answers, keep in touch, grow your business, and more.</p> */}
          <div className="my-3">
            <Input focusPlaceholder="Pesquisar por nome" type="text" placeholder="Pesquisar por nome" />
          </div>
          <div className="min-w-screen flex" style={{ float: 'right' }}>           
            <ButtonCustom
              text="Nova Empresa Parceira"
              type="button" className="mr-2 mb-2 p-2 bg-primary text-sm " />
            <ButtonCustom
              text="Nova Empresa Cliente"
              type="button"
              className="mr-2 mb-2 p-2 bg-primary text-sm" />
            <ButtonCustom
              text="Nova Instituição Caridade"
              type="button"
              className="mr-2 mb-2 p-2 bg-primary text-sm" />
          </div>
        </caption>
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="py-3 px-6">
              Logo
            </th>
            <th scope="col" className="py-3 px-6">
              Nome
            </th>
            <th scope="col" className="py-3 px-6">
              Endereço
            </th>
            <th scope="col" className="py-3 px-6">
              Tipo
            </th>
            <th scope="col" className="py-3 px-6">
              Codigo Indicação
            </th>
            <th scope="col" className="py-3 px-6">
              <span className="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody>

          {
            companies.map((company: any) => {
              return (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th scope="row" className="py-1 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    <ImageProfile />
                  </th>
                  <td className="py-4 px-6">
                    {company?.user?.name}
                  </td>
                  <td className="py-4 px-6">
                    {addressView(company?.endereco)}
                  </td>
                  <td className="py-4 px-6">
                    {company?.type}
                  </td>
                  <td className="py-4 px-6">
                    {company?.user?.indicationCode}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
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