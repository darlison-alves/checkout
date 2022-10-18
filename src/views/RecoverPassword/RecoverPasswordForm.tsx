import React from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { MdEmail } from 'react-icons/md';
import { WarningAlert } from '../../components/Alerts/warning.alert';
import { Button } from '../../components/Button/Button';
import { Input } from '../../components/Input/Input';
import { Title } from '../../components/StepsTitle/StepsTitle';
import { api } from '../../config/axios.base';

export const RecoverPasswordForm = () => {

  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [responseError, setResponseError] = React.useState("");

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()

    setResponseError("")
    setLoading(true);

    console.log(window.location)

    const link = `${window.location.protocol}${window.location.host}`

    api().post('/auth/recover-password', { email, link })
      .then(respo => {
        console.log(respo);
      }).catch(err => {
        console.log(err)
        setResponseError(err?.response?.data?.message)
      }).finally(() => {
        setLoading(false);
      })
  }

  return (
    <div className='mt-10'>
      <form name='login' onSubmit={onSubmit} className="bg-white shadow-sm max-w-full md:max-w-[830px] w-full mx-auto mb-10 p-5 overflow-x-hidden rounded-md" >
        <section>
          <Title step="1" title="Recuperar Senha" />
          <p className="text-base font-light my-3">
            Digite seu email!
          </p>
          {responseError && <WarningAlert text={responseError} />}
          <Input
            hasIcon={true}
            icon={
              <MdEmail
                className="absolute top-[14px] left-[12px]"
                color="#92979A"
                size={20}
              />
            }
            name="email"
            value={email}
            placeholder="Seu e-mail"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            focusPlaceholder="E-mail"
          />

        </section>

        <section className='my-3' >

          {loading ? (<button
            type="button"
            className="bg-[#f3c2a0] text-white text-base font-normal py-3 w-full flex gap-3 items-center justify-center rounded-md disabled:opacity-50"
            disabled={loading}
          >
            Processando...
            <AiOutlineLoading3Quarters className="animate-spin" />
          </button>) : <Button type="submit" text="Enviar" hasIcon={false} />}

        </section>
      </form>
    </div>
  )
}