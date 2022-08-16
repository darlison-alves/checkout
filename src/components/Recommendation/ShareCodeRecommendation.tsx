import React, { useContext, useState } from "react";
import { MdEmail } from "react-icons/md";
import { api } from "../../config/axios.base";
import { ToastContext } from "../../context/ToastContext";
import { ButtonEmail, ButtonWhats } from "../Button/Button";
import { Input } from "../Input/Input";
import { ShareCodeSchema } from "./shareCodeSchema";

interface IShareCodeRecommendationProps {
  codeRecommendation: string;
  userId: string;
}

export const ShareCodeRecommendation = ({ codeRecommendation, userId }: IShareCodeRecommendationProps) => {

  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<(string | number)[]>([]);

  const { showToast } = useContext(ToastContext)

  const redirectWhats = () => {
    window.open(`https://api.whatsapp.com/send?text=Utilize meu código de indicação ${codeRecommendation}. Link para cadastro https://app.ibigboss.com.br/client/signup?codeRecommendation=${codeRecommendation}`)
  }

  const sendEmail = () => {
    setErrors([])
    const payload = {
      code: codeRecommendation,
      email: email,
      link: window.location.host,
      type: "EMAIL"
    }

    const validated = ShareCodeSchema.validate(payload)

    if (validated.error?.details.length) {
      const [detail] = validated.error?.details
      setErrors(detail.path)
      setLoading(false)
    } else {
      api().post(`/indicacao/shared-my-code/${userId}`, payload).then(res => {
        showToast(res.data.message)
        setEmail("")
      }).catch(err => {
        console.log('res', err)
      })
    }
  }

  return (
    <>
      <div className="min-h-screen mt-16">
        <p className="text-lg">Compartilhe o seu código de indicação.</p>
        <p className="text-base font-light my-3 ml-5">Compartilhe e ganhe dinheiro.</p>

        <div className="flex space-x-4 mt-10">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>

          <p className="text-xl">{codeRecommendation}</p>
        </div>

        <div className="mt-4">
          <Input
            hasIcon={true}
            error={errors.find((err) => err === "email") ? true : false}
            icon={
              <MdEmail
                className="absolute top-[14px] left-[12px]"
                color="#92979A"
                size={20}
              />
            }
            name="email"
            value={email}
            placeholder="digite o e-mail da indicação"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            focusPlaceholder="Digite o E-mail da indicação"
          />

          <div className="mt-4">
            <ButtonEmail onClick={() => sendEmail()} text="Compartilhar código de indicação" type="button" />
          </div>

          <div className="mt-4">
            <ButtonWhats onClick={() => redirectWhats()} text="Compartilhar código de indicação" type="button" />
          </div>
        </div>
      </div>
    </>
  )
}