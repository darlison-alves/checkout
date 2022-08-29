import { useContext } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { IsLoggedContext } from "../../context/IsLoggedContext"
import { AuthShowedComponent } from "../Auth/Auth.Component"

const roles = [
  "ROLE_USER"
]

const ItemMenu = [
  {
    name: 'Empresas',
    to: '/companies'
  },
  {
    name: 'Meus Cupons',
    to: '/my-coupons'
  },
  {
    name: 'Extratos',
    to: '/extracts'
  },
  {
    name: 'indicados',
    to: '/recommendations'
  },
  {
    name: 'Compartilhar link',
    to: '/share-indication-code'
  },
  {
    name: 'Documentos',
    to: '/documents'
  }
]

export const HeaderMenu = ({ profile }: any) => {

  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { isLogged } = useContext(IsLoggedContext)

  if(!roles.includes(profile)) return <div />

  return (
    <AuthShowedComponent isLogged={isLogged} >
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">Select your country</label>
        <select onChange={(evt) => { navigate(evt.target.value) }} id="tabs" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          {
            ItemMenu.map(item => <option key={item.to} value={item.to} > {item.name} </option>)
          }
        </select>
      </div>
      <ul className="hidden text-sm font-medium text-center text-gray-500 rounded-lg divide-x divide-gray-200 shadow sm:flex dark:divide-gray-700 dark:text-gray-400">
        {
          ItemMenu.map(item => {

            if (pathname === item.to)
              return (
                <li className="w-full">
                  <Link to={item.to} className="inline-block p-4 w-full text-gray-900 bg-gray-100 rounded-l-lg focus:ring-4 focus:ring-blue-300 active focus:outline-none dark:bg-gray-700 dark:text-white" aria-current="page">{item.name}</Link>
                </li>
              )

            return (<li key={item.to} className="w-full"> <Link to={item.to} className="inline-block p-4 w-full bg-white hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" > {item.name} </Link> </li>)
          })
        }
      </ul>
    </AuthShowedComponent>
  )
}