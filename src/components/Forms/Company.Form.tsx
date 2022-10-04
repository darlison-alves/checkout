import { Input } from "../Input/Input"
import { MaskedInput } from "../InputMask/InputMask"

interface ICompanyBaseForm {
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
  handleBlur: React.FocusEventHandler<HTMLInputElement>;
  values: { razaoSocial: "", nome: "", cnpj: "" }
}

export const CompanyBaseForm = ({
  handleChange,
  handleBlur,
  values,
 }: ICompanyBaseForm)  => {
  return (
    <>
    <div className="grid md:grid-cols-2 grid-cols-1 my-4 gap-4">
      <Input
        name="razaoSocial"
        placeholder="Razão Social"
        type="text"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.razaoSocial}
        focusPlaceholder="Razão Social"
      />

      <Input
        name="nome"
        placeholder="Nome Fantasia"
        type="text"
        onChange={handleChange}
        value={values.nome}
        focusPlaceholder="Nome Fantasia"
      />
    </div>
    <div className="grid md:grid-cols-2 grid-cols-1 my-4 gap-4">
      <MaskedInput
        name="cnpj"
        error={false}
        mask="99.999.999/9999-99"
        placeholder="CNPJ"
        onChange={handleChange}
        value={values.cnpj}
        type="text"
        focusPlaceholder="CNPJ"
      />
    </div>
  </> 
  )
}