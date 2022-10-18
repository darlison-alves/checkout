import { Input } from "../Input/Input"

interface IPasswordFormProps {
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
  password: string;
  repassword: string;
}

export const PasswordForm = ({ handleChange, password, repassword }: IPasswordFormProps) => {
  return (
    <div className="grid md:grid-cols-3 grid-cols-1 my-4 gap-4">
      <Input
        required={false}
        name="password"
        placeholder="Senha"
        type="password"
        onChange={handleChange}
        value={password}
        focusPlaceholder="Senha"
      />
      <Input
        required={false}
        name="repassword"
        placeholder="Confirmar Senha"
        type="password"
        onChange={handleChange}
        value={repassword}
        focusPlaceholder="Confirmar Senha"
      />
    </div>
  )
}