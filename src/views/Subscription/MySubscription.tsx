import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ButtonCustom } from "../../components/Button/Button"
import { ProfileCard } from "../../components/Card/Profile.Card"
import { api } from "../../config/axios.base"
import { ISubscriptionUser } from "../../interfaces/subscription.interface"

export const MySubscriptionView = () => {

  const navigate = useNavigate()
  const [subscription, setSubscription] = useState<ISubscriptionUser>({})

  useEffect(() => {
    api().get("/subscription/me")
      .then(res => {
        console.log('res', res.data)
        setSubscription(res.data)
      }).catch(err => {
        console.error('ee', err)
      })
  }, [])

  return (
    <div>

      <div className="flex justify-between mt-5 mx-5 md:bg-blue">

        <div className="w-full max-w-sm bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
          <div className="justify-between px-5 pb-5 pt-5 flex flex-wrap text-sm font-medium text-center text-base items-baseline text-gray-500 bg-white rounded-t-lg border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 dark:bg-gray-800" id="defaultTab" data-tabs-toggle="#defaultTabContent" role="tablist">
            <h3 className="font-semibold">Dados de cobrança</h3>
            <ButtonCustom disabled type="button" text="Alterar dados" className="bg-primary px-5 py-3" />
          </div>
          <div className="px-5 pb-5">
            <ProfileCard />
          </div>
        </div>

        <div className="w-full max-w-sm bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
          <div className="justify-between px-5 pb-5 pt-5 flex flex-wrap text-sm font-medium text-center text-base items-baseline text-gray-500 bg-white rounded-t-lg border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 dark:bg-gray-800" id="defaultTab" data-tabs-toggle="#defaultTabContent" role="tablist">
            <h3 className="font-semibold">Plano Assinado</h3>
          </div>
          <div className="px-5 pb-5">
            <div>
              <h5 className="mb-4 mt-5 text-xl font-medium text-gray-500 dark:text-gray-400">{subscription.plano}</h5>

              <div className="flex items-baseline text-gray-900 dark:text-white">
                <span className="text-3xl font-semibold">R$</span>
                <span className="text-5xl font-extrabold tracking-tight">{subscription.price?.toFixed(2)}</span>
                <span className="ml-1 text-xl font-normal text-gray-500 dark:text-gray-400">/Mês</span>
              </div>
              <ButtonCustom onClick={() => { navigate('/orders') }} type="button" text="Histórico e Utilização" className="bg-secondary px-5 py-3 mt-3" />
              <hr className="my-5" />

              <div className="flex items-baseline">
                <h3 className="font-semibold text-gray-500 mr-2">Forma Pagamento: </h3><h6 className="text-gray-900 text-sm font-semibold" >{subscription.formaPagamento}</h6>
              </div>

            </div>

          </div>
        </div>

      </div>

      <div className="mx-5 my-5 bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
        <div className="justify-between px-5 pb-5 pt-5 flex flex-wrap text-sm font-medium text-center text-base items-baseline text-gray-500 bg-white rounded-t-lg border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 dark:bg-gray-800" id="defaultTab" data-tabs-toggle="#defaultTabContent" role="tablist">
          <h3 className="font-semibold">Detalhamento da fatura</h3>
        </div>
        <div className="px-5 pb-5">

          <div className="flex md:justify-between" >
            <div className="border-r-4 w-[70%] py-3 pr-4 flex justify-between" >
              <div>
                <h3 className="text-base text-gray-500 dark:text-gray-400" >
                  {subscription?.order?.recurrentId} - {subscription.plano}
                </h3>

                <ButtonCustom disabled={!(subscription.formaPagamento === "BOLETO")} onClick={() => { 
                  if(subscription?.order?.urlBoleto)
                    window.open(subscription?.order?.urlBoleto, "_blank")
                 }} type="button" text="Boleto" className={`${ (subscription.formaPagamento === "BOLETO") ? 'bg-primary': 'bg-secondary' } px-5 py-3 mt-3`} />
              </div>

              <h3 className="text-base text-gray-500 dark:text-gray-400" >
                R$ {subscription?.price?.toFixed(2)}
              </h3>
            </div>
            <div className="w-[29%] pt-3">
                <h3 className="text-base text-gray-500 dark:text-gray-400" >
                  {subscription?.order?.dataVencimento}
                </h3>
                <h3 className="text-base text-gray-500 dark:text-gray-400" >
                  {subscription?.order?.status}
                </h3>
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}