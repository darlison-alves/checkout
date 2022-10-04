import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import { IsLoggedContext } from '../../context/IsLoggedContext';
import { logout } from '../../services/auth';
import { AuthNotShowedComponent, AuthShowedComponent } from '../Auth/Auth.Component';

export const Header = () => {

  const [showMenu, setShowMenu] = useState(false)
  const { isLogged, setIsLogged } = useContext(IsLoggedContext)

  return (
    <div className="inherit bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <a href="#">
              <span className="sr-only">Workflow</span>
              <img className="h-8 w-auto sm:h-10" src={logo} alt="" />
            </a>
          </div>
          <div className="-mr-2 -my-2 md:hidden">
            <button onClick={() => setShowMenu(!showMenu)} type="button" className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500" aria-expanded="false">
              <span className="sr-only">Open menu</span>

              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
          <nav className="hidden md:flex space-x-10">

            {/* <Link to={'/companies'} className="text-base font-medium text-gray-500 hover:text-gray-900"> Empresas </Link>
            <Link to={'/my-coupons'} className="text-base font-medium text-gray-500 hover:text-gray-900"> Meus Cupons </Link>
            <Link to={'/extracts'} className="text-base font-medium text-gray-500 hover:text-gray-900"> Extratos </Link>
            <Link to={'/recommendations'} className="text-base font-medium text-gray-500 hover:text-gray-900"> Indicados </Link>
            <Link to={'/share-indication-code'} className="text-base font-medium text-gray-500 hover:text-gray-900"> Compartilhar link </Link> */}
            {/* <Link to={'/indications'} className="text-base font-medium text-gray-500 hover:text-gray-900"> Documentos </Link> */}

            {/* <div className="relative">

              <button type="button" className="text-gray-500 group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" aria-expanded="false">
                <span>More</span>

                <svg className="text-gray-400 ml-2 h-5 w-5 group-hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </button>
            </div> */}
          </nav>
          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            <AuthNotShowedComponent isLogged={isLogged} >
              <Link to={'/login'} className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"> Login </Link>
              <Link to={'/plans'} className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary hover:bg-primary-100"> Cadastrar </Link>
            </AuthNotShowedComponent>

            <AuthShowedComponent isLogged={isLogged} >
              <div className="-mr-2 -my-2">
                <button onClick={() => setShowMenu(!showMenu)} type="button" className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500" aria-expanded="false">
                  <span className="sr-only">Open menu</span>

                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </AuthShowedComponent>
          </div>
        </div>
      </div>

      <div style={{ display: showMenu ? 'block' : 'none', position: 'absolute', zIndex: '99999' }} className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
        <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
          <div className="pt-5 pb-6 px-5">
            <div className="flex items-center justify-between">
              <div>
                <img className="h-8 w-auto" src={logo} alt="Workflow" />
              </div>
              <div className="-mr-2">
                <button onClick={() => setShowMenu(!showMenu)} type="button" className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span className="sr-only">Close menu</span>
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="mt-6 " style={{ position: 'inherit' }}>
              <nav className="grid gap-y-8">

                <div className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50">

                  {/* <svg className="flex-shrink-0 h-6 w-6 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg> */}
                  <Link onClick={() => setShowMenu(false)} to={'/subscription/me'} className="ml-3 text-base font-medium text-gray-500 hover:text-gray-900"> Meu Plano </Link>

                </div>
                <div className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50">
                  <Link onClick={() => setShowMenu(false)} to={'/change-password'} className="ml-3 text-base font-medium text-gray-500 hover:text-gray-900"> Alterar Senha </Link>
                </div>

              </nav>
            </div>
          </div>
          <div className="py-6 px-5 space-y-6">
            {/* <div className="grid grid-cols-2 gap-y-4 gap-x-8">
              <a href="#" className="text-base font-medium text-gray-900 hover:text-gray-700"> Pricing </a>

              <a href="#" className="text-base font-medium text-gray-900 hover:text-gray-700"> Docs </a>

              <a href="#" className="text-base font-medium text-gray-900 hover:text-gray-700"> Help Center </a>

              <a href="#" className="text-base font-medium text-gray-900 hover:text-gray-700"> Guides </a>

              <a href="#" className="text-base font-medium text-gray-900 hover:text-gray-700"> Events </a>

              <a href="#" className="text-base font-medium text-gray-900 hover:text-gray-700"> Security </a>
            </div> */}

            <AuthNotShowedComponent isLogged={isLogged} >
              <Link onClick={() => setShowMenu(false)} to={'/plans'} className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"> Cadastrar </Link>
              <p className="mt-6 text-center text-base font-medium text-gray-500">
                Existe Conta?
                <Link onClick={() => setShowMenu(false)} to="/Login" className="text-indigo-600 hover:text-indigo-500"> Login </Link>
              </p>
            </AuthNotShowedComponent>

            <AuthShowedComponent isLogged={isLogged} >
              <p className="mt-6 text-center text-base font-medium text-gray-500">
                Sair
                <Link onClick={() => {
                  logout()
                  setShowMenu(false)
                  setIsLogged(false)
                }} to="/Login" className="text-indigo-600 hover:text-indigo-500"> Logout </Link>
              </p>
            </AuthShowedComponent>

          </div>
        </div>
      </div>
    </div>
  )
}