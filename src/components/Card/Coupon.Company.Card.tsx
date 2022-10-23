import { useEffect, useState } from 'react';
import arrowRight from '../../assets/svgs/arrow-right.svg';
import { calculeCoupon } from '../../utils/calculo.utils';
import { InputCurrency } from '../Input/InputCurrency';

const locale = "pt-br";
const currencyFormatter = (value: any) => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

export const CouponCompanyCard = () => {

  const [amount, setAmount] = useState(0)
  const [amountWithDiscount, setAmountWithDiscount] = useState('0.00')
  const [amountDiscount, setAmountDiscount] = useState('0.00')

  useEffect(() => {
    if (!Number.isNaN(amount)) {
      const result = calculeCoupon(amount, 10)
      setAmountWithDiscount(result.amountWithDiscount)
      setAmountDiscount(result.amountDiscount)
    }

  }, [amount])

  return (
    <div id="app" className="bg-white w-128 h-70 rounded shadow-md flex card text-grey-darkest">
      <div className="w-full flex flex-col">
        <div className="p-4 pb-0 flex-1">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
            <div className="inline-flex overflow-hidden relative justify-center items-center w-12 h-12 bg-gray-100 rounded-full dark:bg-gray-600 ">
              <span className="font-medium text-gray-600 dark:text-gray-300">NO</span>
            </div> 
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                <h3 className="font-light mb-1 text-grey-darkest">Nome da Empresa</h3>
              </p>
              <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                Desconto:
              </p>
            </div>
            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
              <span className="text-4xl text-[#22bb33]">10<span className="text-lg"> % </span></span>
            </div>
          </div>

          <div className='py-2'>
            <InputCurrency setValue={setAmount} focusPlaceholder="Digite valor do cupom" />
          </div>
          <div className="flex items-center my-4">
            <div className="pr-2 text-sm ">
              Valor a pagar: {amountWithDiscount}
            </div>
            <div className="px-2 text-sm">
              Desconto: {amountDiscount}
            </div>
          </div>
        </div>
        <div className="bg-gray-lighter p-3 flex items-center justify-between transition hover:bg-gray-light" style={{ cursor: 'pointer' }}>
          Gerar Cupom
          <img src={arrowRight} className="w-[20px]" />
        </div>
      </div>
    </div>
  )
}