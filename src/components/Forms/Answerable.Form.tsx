import { useEffect, useState } from "react"
import { Input } from "../Input/Input"

export interface IAnswerable {
  nome?: string;
  email?: string;
  cpf?: string;
  cargo?: string;
  telefone?: string;
  celular?: string;
}

interface IAnswerableProps {
  onChange: Function
}

export const AnswerableForm = ({ onChange = () => {} }: IAnswerableProps) => {

  const [answearable, setAnswerable] = useState<IAnswerable>({})

  useEffect(() => {
    onChange(answearable)
  }, [answearable])

  return (
    <div className="my-3">
      <div className="grid md:grid-cols-2 my-3 gap-4">
        <Input
          required={false}
          placeholder="Nome do responsável"
          type="text"
          onChange={(e) => setAnswerable(old => ({ ...old, nome: e.target.value }))}
          value={answearable.nome}
          focusPlaceholder="Nome"
        />

        <Input
          required={false}
          placeholder="E-mail do responsável"
          type="text"
          onChange={(e) => setAnswerable(old => ({ ...old, email: e.target.value }))}
          value={answearable.email}
          focusPlaceholder="E-Mail"
        />
      </div>

      <div className="grid md:grid-cols-2 my-3 gap-4">
        <Input
          placeholder="CPF"
          type="text"
          onChange={(e) => setAnswerable(old => ({ ...old, cpf: e.target.value }))}
          value={answearable.cpf}
          focusPlaceholder="CPF"
          required={false}
        />
        <Input
          required={false}
          placeholder="Cargo"
          type="text"
          onChange={(e) => setAnswerable(old => ({ ...old, cargo: e.target.value }))}
          value={answearable.cargo}
          focusPlaceholder="Cargo"
        />
      </div>

      <div className="grid md:grid-cols-2 my-3 gap-4">
        <Input
          required={false}
          placeholder="Telefone"
          type="text"
          onChange={(e) => setAnswerable(old => ({ ...old, telefone: e.target.value }))}
          value={answearable.telefone}
          focusPlaceholder="Telefone"
        />
        <Input
          required={false}
          placeholder="Celular"
          type="text"
          onChange={(e) => setAnswerable(old => ({ ...old, celular: e.target.value }))}
          value={answearable.celular}
          focusPlaceholder="Celular"
        />
      </div>
    </div>
  )
}