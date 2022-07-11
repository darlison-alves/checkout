import React from 'react'
import successIcon from '../../assets/success.png'



export const Thanks = () => {
  return (
    <main className='flex flex-col justify-center items-center gap-6 min-h-screen'>
        <div className="bg-[#D1FADF] w-[120px] h-[120px] rounded-full flex justify-center items-center">
            <img src={successIcon} alt="Icone de sucesso" />
        </div>

        <section>
        <h1 className='font-semibold text-2xl text-[#404248] text-center'>Assinatura realizada com sucesso!</h1>

        <p className='text-[#999999] text-sm max-w-[600px] mx-auto text-center mt-2'>Enviamos todas as informações de acesso para seu email, nós da IBB agradecemos pela preferência.
            <br />
            <br />
            Perguntas? Sugestões? Precisa de ajuda?
            <br />
            <a className='text-[#3FA9E2] underline' href="mailto:teste@example.com">Nos envie um email</a>.</p>
        </section>
    </main> 
  )
}
