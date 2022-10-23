import { useEffect, useState } from "react";

import { IAddress } from "../../interfaces/address.interface";
import { IBankData } from "../../interfaces/bank.interface";
import { IUser } from "../../interfaces/clientUser.iterface";
import { BankService } from "../../services/bank.service";
import { ButtonBank } from "../Button/Button";
import { ToolTipRight } from "../Tooltip/Tooltip.right";

import blankProfile from '../../assets/img/blank-profile.png'
import { useNavigate } from "react-router-dom";

interface IProfileProps {
  username: string;
  address: IAddress;
}

const bankService = new BankService()

export const Profile = ({ username, address = {} }: IProfileProps) => {
  const { logradouro, bairro, cidade, estado, numero } = address
  const [user, setUser] = useState<IUser>({ active: false, email: "", id: 0, indicationCode: "", name: "", type: "", username: "" })
  const [bankData, setBankData] = useState<IBankData>({ digitoAgencia: "", digitoConta: "" })

  const navigate = useNavigate()

  useEffect(() => {
    if (username)
      bankService.getProfile(username)
        .then(res => {
          const { contaBancaria } = res.data
          setUser(old => ({ ...old, ...res.data }))
          setBankData(old => ({ ...old, ...contaBancaria }))
        }).catch(err => {
          console.log('err', err)
        })
  }, [username])

  return (
    <main className="profile-page">
      <section className="relative block h-500-px">
        <div className="absolute top-0 bg-center bg-cover" style={
          { backgroundImage: `url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=2710&amp;q=80')` }} >
          <span id="blackOverlay" className="w-full h-full absolute opacity-50 bg-black"></span>
        </div>
        <div className="top-auto bottom-0 left-0 right-0 w-full pointer-events-none overflow-hidden h-70-px" style={{ transform: 'translateZ(0px)' }}>
          <svg className="absolute bottom-0 overflow-hidden" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" version="1.1" viewBox="0 0 2560 100" x="0" y="0">
            <polygon className="text-blueGray-200 fill-current" points="2560 0 2560 100 0 100"></polygon>
          </svg>
        </div>
      </section>
      <section className="relative py-5 bg-blueGray-200">
        <div className="container mx-auto px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg">
            <div className="px-6">
              <div className="flex flex-wrap justify-center">
                <div className="w-full lg:w-3/12 md:w-3/12 px-4 lg:order-2 flex justify-center">
                  <div className="relative">
                    <img alt="..." src={blankProfile}
                      className="shadow-xl rounded-full h-auto align-middle border-none m-2 max-w-150-px" />
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                  <div className="px-3 mt-10 sm:mt-0">
                    <ToolTipRight text={`${ !(bankData.id) ? 'Vincule sua conta bancária para ativação': 'Conta Vinculada' }`} >
                      <ButtonBank  onClick={() => navigate('/user/bank-data/me')} text="DADOS BANCÁRIOS" type="button" disabled={!(bankData.id)} className="bg-primary font-bold uppercase px-4 py-2 text-xs rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150" />
                    </ToolTipRight>
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4 lg:order-1">
                  {/* <div className="flex justify-center py-4 lg:pt-4 pt-8">
                    <div className="mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">R$0,00</span><span className="text-sm text-blueGray-400">Saldo</span>
                    </div>
                    <div className="mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">0</span><span className="text-sm text-blueGray-400">Indicações</span>
                    </div>
                  </div> */}
                </div>
              </div>
              <div className="text-center mt-12">
                <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                  {user.name}
                </h3>
                <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                  <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                  {`${logradouro}, ${numero}, ${bairro} - ${cidade} - ${estado}`}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}