import { ICategory } from "../../views/Company/interface";
import { Input } from "../Input/Input"
import { MaskedInput } from "../InputMask/InputMask"

export interface IUserRegister {
  name: string;
  email: string;
  active: boolean;
}

export interface ICompanyForm {
  id?: number;
  razaoSocial: string;
  cnpj: string;
  user: IUserRegister;
  categoriaEmpresa: number;
  type: string;
}

interface ICompanyBaseForm {
  handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement>;
  handleBlur: React.FocusEventHandler<HTMLInputElement>;
  values: ICompanyForm;
  categories: Array<ICategory>;
}

export const CompanyBaseForm = ({
  handleChange,
  handleBlur,
  values,
  categories = []
}: ICompanyBaseForm) => {
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
          name="user.nome"
          placeholder="Nome Fantasia"
          type="text"
          onChange={handleChange}
          value={values.user.name}
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

        <select
          name="categoriaEmpresa"
          value={values.categoriaEmpresa}
          onChange={handleChange}
          className={`px-3 py-3 text-base font-semibold text-secondary border rounded-[4px] w-full placeholder:text-secondary transition-colors placeholder:text-base focus:outline-none focus:ring-2`}
        >
          <option value="Estado">Categorias</option>
          {
            categories.map((item) => {
              return (
                <option key={item.id} value={item.id}>
                  {item.description}
                </option>
              );
            })}
        </select>
      </div>
    </>
  )
}