import { useEffect } from "react"
import { useState } from "react"
import { api } from "../../config/axios.base"
import { IBank } from "../../interfaces/bank.interface"

interface ISelectBanksProps {
  value?: any,
  onChange: any
}

export const SelectBanks = ({ value, onChange }: ISelectBanksProps) => {

  const [banks, setBanks] = useState<Array<IBank>>([])

  useEffect(() => {
    api().get('/banking-institution')
      .then(res => {
        setBanks(res.data)
      }).catch(err => {
        const { response = {} } = err;
        const { data = {} } = response;
        const { message = 'error inesperado aconteceu!' } = data;
        console.log('message', message)
      })
  }, [])

  return (
    <select
      name="codigoBanco"
      placeholder="Selecione um banco"
      onChange={onChange}
      value={value}
      className={`px-3 py-3 text-base font-semibold text-secondary border rounded-[4px] w-full placeholder:text-secondary transition-colors placeholder:text-base focus:outline-none focus:ring-2`}
    >
      <option value={''}>Selecione Banco</option>
      {
        banks.map(bank => (<option key={bank.codigo} value={ bank.codigo }>{ bank.nome }</option>))
      }
    </select>
  )
}