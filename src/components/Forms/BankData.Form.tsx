import { useFormik } from "formik"
import { useContext, useEffect, useState } from "react"
import { ToastContext } from "../../context/ToastContext"
import { BankAccountStatus, IBankData } from "../../interfaces/bank.interface"
import { ErrorEnum } from "../../interfaces/enums/errors.enum"
import { BankService } from "../../services/bank.service"
import { getResponseError } from "../../utils/tratamento.response-error"
import { ButtonPrimary } from "../Button/Button"
import { Input } from "../Input/Input"
import { SelectBanks } from "../Select/Select.Banks"
import { SelectAccountType } from "../Select/Select.TypeAccount"

interface IBankDataProps {
  initialValues: IBankData;
  userId: number;
  username: string;
}

const bankService = new BankService()

export const BankDataForm = ({ initialValues, userId, username }: IBankDataProps) => {

  const [loadingActivate, setLoadingActivate] = useState(false)
  const [loading, setLoading] = useState(false)
  const { showToast, setType } = useContext(ToastContext)

  const formik = useFormik<IBankData>({
    initialValues,
    onSubmit: (values) => {
      console.log('values', values)
      submit(values)
    },
  })

  useEffect(() => {
    if (username)
      bankService.getProfile(username)
        .then(res => {
          console.log('res', res.data)

          formik.setValues(res.data.contaBancaria)

        }).catch(err => {
          console.log('err', err)
        })
  }, [username])

  const submit = (data: IBankData) => {
    setLoading(true);
    bankService.createOrUpdate(data, userId)
      .then(res => {
        formik.setValues(res.data)
        setType(ErrorEnum.success)
        showToast('Conta salva com sucesso');
      }).catch(err => {
        const message = getResponseError(err)
        setType(ErrorEnum.error)
        showToast(message);
      }).finally(() => {
        setLoading(false)
      })
  }

  const activate = () => {
    setLoadingActivate(true)
    bankService.activateAccount(userId)
      .then(res => {
        console.log('data', res.data);
        setType(ErrorEnum.success)
        showToast('Conta ativada com sucesso');
      }).catch(err => {
        console.log('err', err)
        const message = getResponseError(err)
        setType(ErrorEnum.error)
        showToast(message);
      }).finally(() => { setLoadingActivate(false) })
  }

  const isNotPending = () => {
    if ((formik.values.id && !formik.values.status) || formik.values.status === BankAccountStatus.PENDING)
      return false
    return true
  }

  return (

    <form
      onSubmit={formik.handleSubmit}
      className="bg-white shadow-sm max-w-full md:max-w-[830px] w-full mx-auto mb-10 p-5 overflow-x-hidden rounded-md"
    >
      <div className="flex md:flex-row flex-col gap-3 md:gap-4">
        <div className="md:max-w-[515px] w-full">
          <SelectBanks onChange={formik.handleChange} value={formik.values.codigoBanco} />
        </div>

        <div className="md:max-w-[270px] w-full">
          <SelectAccountType onChange={formik.handleChange} value={formik.values.tipo} />
        </div>
      </div>

      <div className="flex md:flex-row flex-col gap-3 md:gap-4 mt-4">
        <div className="md:max-w-[270px] w-full">
          <Input
            name="agencia"
            focusPlaceholder="Agência"
            placeholder="Agência"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.agencia}
          />
        </div>

        <div className="md:max-w-[170px] w-full">
          <Input
            name="digitoAgencia"
            focusPlaceholder="Digito Agência"
            placeholder="Digito Agência"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.digitoAgencia}
          />
        </div>

        <div className="md:max-w-[270px] w-full">
          <Input
            name="conta"
            focusPlaceholder="Conta"
            placeholder="Conta"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.conta}
          />
        </div>

        <div className="md:max-w-[120px] w-full">
          <Input
            name="digitoConta"
            focusPlaceholder="Digito Conta"
            placeholder="Digito Conta"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.digitoConta}
          />
        </div>
      </div>

      <div className="flex items-baseline my-4">
        <h3 className="font-semibold text-gray-500 mr-2">status conta: </h3>
        <h6 className="text-gray-900 text-sm font-semibold" >{formik.values.status}</h6>
      </div>

      <section className="flex justify-between">
        <ButtonPrimary
          disabled={isNotPending()}
          onClick={() => activate()}
          loaging={loadingActivate}
          text="Ativar"
          type="button" />

        <ButtonPrimary
          onClick={() => { }}
          loaging={loading}
          text="Salvar"
          type="submit" />
      </section>
    </form>
  )
}