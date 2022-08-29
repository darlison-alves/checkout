import { useEffect, useState } from "react"
import { useGetInfoUser } from "../../hooks/useGetInfoUser"

export const ProfileCard = () => {

  const { user } = useGetInfoUser()

  const [userInfo, setUserInfo] = useState<any>({})

  useEffect(() => {
    setUserInfo(user)
  }, [user])

  return (

    <dl className="max-w-md text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
      <div className="flex flex-col pb-3">
        <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Nome</dt>
        <dd className="text-lg font-semibold">{ userInfo.name }</dd>
      </div>
      
      <div className="flex flex-col pb-3">
        <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Email</dt>
        <dd className="text-lg font-semibold">{ userInfo.email }</dd>
      </div>
      <div className="flex flex-col py-3">
        <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Endereço</dt>
        <dd className="text-lg font-semibold">Rua / Av. { userInfo?.endereco?.logradouro }, { userInfo?.endereco?.numero } - {userInfo?.endereco?.bairro}, { userInfo?.endereco?.cidade } - { userInfo?.endereco?.estado }, { userInfo?.endereco?.cep } </dd>
      </div>
      <div className="flex flex-col pt-3">
        <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Telefone</dt>
        <dd className="text-lg font-semibold">{ userInfo.phone }</dd>
      </div>
    </dl>

  )
}