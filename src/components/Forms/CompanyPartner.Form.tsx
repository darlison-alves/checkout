import { useState } from "react";
import { useFormik } from "formik"
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Button } from "../Button/Button";
import { StepsTitle } from "../StepsTitle/StepsTitle"
import { CompanyBaseForm, ICompanyForm } from "./Company.Form"
import { Input } from "../Input/Input";
import { MaskedInput } from "../InputMask/InputMask";
import { SelectActivateUser } from "../Select/Select.Activate";
import { AddressForm } from "./Address.Form";
import { IAddress } from "../../interfaces/address.interface";
import { CheckBox } from "../CheckBox/checkbox.form";

export interface ICompanyPartnerForm extends ICompanyForm {
  desconto?: number | null;
  telefone?: string;
  celular?: string;
  urlSite: string;
  endereco?: IAddress;
  allowIndication: boolean,
  ibbTresEmUm: boolean
}

export const CompanyPartnerForm = () => {

  const [loading, setLoading] = useState(false)

  const formik = useFormik<ICompanyPartnerForm>({
    initialValues: {
      cnpj: "",
      razaoSocial: "",
      user: {
        nome: "",
        email: "",
        active: false
      },
      categoriaEmpresa: 0,
      desconto: null,
      telefone: "",
      celular: "",
      urlSite: "",
      allowIndication: false,
      ibbTresEmUm: false
      
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

      <section>
        <StepsTitle step="2" title="Dados Configuração" />
        <div className="grid md:grid-cols-3 grid-cols-1 my-4 gap-4">
          <Input
            required={false}
            name="desconto"
            placeholder="Desconto concedido em %"
            type="number"
            onChange={formik.handleChange}
            value={formik.values.desconto}
            focusPlaceholder="Desconto concedido em %"
          />

          <MaskedInput
            name="telefone"
            error={false}
            mask="(99)9 9999-9999"
            placeholder="Telefone"
            onChange={formik.handleChange}
            value={formik.values.telefone}
            type="text"
            focusPlaceholder="telefone"
          />

          <MaskedInput
            name="celular"
            error={false}
            mask="(99)9 9999-9999"
            placeholder="Celular"
            onChange={formik.handleChange}
            value={formik.values.celular}
            type="text"
            focusPlaceholder="celular"
          />
        </div>
      </section>
      <section>
        <div className="grid md:grid-cols-2 grid-cols-1 my-4 gap-4">
          <Input
            name="user.email"
            placeholder="Insira um email"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.user.email}
            focusPlaceholder="email"
          />

          <Input
            required={false}
            name="urlSite"
            placeholder="Insira a url Site"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.urlSite}
            focusPlaceholder="urlSite"
          />
        </div>
      </section>

      <section>
        <div className="grid md:grid-cols-2 grid-cols-1 my-4 gap-4">
          <SelectActivateUser onChange={(value) => formik.setFieldValue("user.active", value)} value={formik.values.user.active ? "active" : "inactive"} />
        </div>
      </section>

      <section>
        <StepsTitle step="3" title="Dados Endereço" />
        <div className="my-4">
          <AddressForm setErrors={() => { }} initiValues={{}} errors={[]} onChange={(add: any) => formik.setFieldValue("endereco", add)} />
        </div>
      </section>

      <section>
        <div className="flex my-4 justify-between">
          <CheckBox 
            name="allowIndication"
            htmlFor="indication" 
            onChange={formik.handleChange} 
            description="Deseja ser uma empresa INDICADA?" 
            checked={formik.values.allowIndication}
          />
          <CheckBox name="ibbTresEmUm" htmlFor="fideliza" onChange={formik.handleChange} description="Deseja ser uma empresa FIDELIZA IBB?" checked={formik.values.ibbTresEmUm} />
        </div>
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