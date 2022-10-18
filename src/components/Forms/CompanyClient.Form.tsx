import { useState } from "react";
import { useFormik } from "formik"
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import { MaskedInput } from "../InputMask/InputMask";
import { StepsTitle } from "../StepsTitle/StepsTitle"
import { CompanyBaseForm, ICompanyForm } from "./Company.Form"

export const CompanyClientForm = () => {

  const [loading, setLoading] = useState(false)

  const formik = useFormik<ICompanyForm>({
    initialValues: {
      cnpj: "",
      razaoSocial: "",
      user: {
        name: "",
        active: false,
        email: ""
      },
      categoriaEmpresa: 0,
      type: "CLIENT"
    },
    onSubmit: (values) => {
      console.log('values', values)
    }
  })

  const goToNextStep = () => { }

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="bg-white shadow-sm max-w-full md:max-w-[830px] w-full mx-auto mb-10 p-5 overflow-x-hidden rounded-md"
    >
      <section>
        <StepsTitle step="1" title="Dados Empresa" />

        <p className="text-base font-light my-3">
          Digite os dados da empresa abaixo.
        </p>

        <CompanyBaseForm
          categories={[]}
          handleChange={formik.handleChange} 
          handleBlur={formik.handleBlur} values={formik.values} />

      </section>

      <section className='my-3' >

        {loading ? (<button
          type="button"
          className="bg-[#f3c2a0] text-white text-base font-normal py-3 w-full flex gap-3 items-center justify-center rounded-md disabled:opacity-50"
          disabled={loading}
        >
          Processando...
          <AiOutlineLoading3Quarters className="animate-spin" />
        </button>) : <Button type="submit" text="SALVAR" hasIcon={false} />}

      </section>
    </form>
  )
}