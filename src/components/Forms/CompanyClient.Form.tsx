import { useState } from "react";
import { useFormik } from "formik"
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import { MaskedInput } from "../InputMask/InputMask";
import { StepsTitle } from "../StepsTitle/StepsTitle"
import { CompanyBaseForm } from "./Company.Form"

interface ICompanyForm {
  razaoSocial: string;
  cnpj: string;
  nome: string;
  categoriaEmpresa: Array<string>;
}

export const CompanyClientForm = () => {

  const [loading, setLoading] = useState(false)

  const formik = useFormik<ICompanyForm>({
    initialValues: {
      cnpj: "",
      razaoSocial: "",
      nome: "",
      categoriaEmpresa: []
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

        <CompanyBaseForm handleChange={formik.handleChange} handleBlur={formik.handleBlur} values={formik.values} />

        {/* <>
          <div className="grid md:grid-cols-2 grid-cols-1 my-4 gap-4">
            <Input
              name="razaoSocial"
              placeholder="Razão Social"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.razaoSocial}
              focusPlaceholder="Razão Social"
            />

            <Input
              name="nome"
              placeholder="Nome Fantasia"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.nome}
              focusPlaceholder="Nome Fantasia"
            />
          </div>
          <div className="grid md:grid-cols-2 grid-cols-1 my-4 gap-4">
            <MaskedInput
              name="cnpj"
              error={false}
              mask="99.999.999/9999-99"
              placeholder="CNPJ"
              onChange={formik.handleChange}
              value={formik.values.cnpj}
              type="text"
              focusPlaceholder="CNPJ"
            />
          </div>
        </> */}
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