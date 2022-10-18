interface ISelectActivateUser {
  value: any,
  onChange: (value: boolean) => {}
}

export const SelectActivateUser = ({ value, onChange }: ISelectActivateUser) => {

  const onChangeHandle = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value === "active" ? true: false)
  }

  return (
    <select
      onChange={onChangeHandle}
      value={value}
      className={`px-3 py-3 text-base font-semibold text-secondary border rounded-[4px] w-full placeholder:text-secondary transition-colors placeholder:text-base focus:outline-none focus:ring-2`}
    >
      <option value="inactive">Não Ativo</option>
      <option value="active">Ativo</option>
    </select>
  )
}