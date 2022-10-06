interface ICheckBoxProps {
  description: string;
  checked: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  htmlFor: string;
  name: string;
}
export const CheckBox = ({ description, checked, onChange, htmlFor, name }: ICheckBoxProps) => {
  return (
    <div className="flex items-center mb-4">
      <input name={name} onChange={onChange} id={htmlFor} type="checkbox" checked={checked} className="w-4 h-4 text-primary bg-primary rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
      <label htmlFor={htmlFor} className="ml-2 text-sm font-medium text-primary dark:text-gray-300">{description}</label>
    </div>
  )
}