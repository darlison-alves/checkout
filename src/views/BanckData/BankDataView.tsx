import { BankDataForm } from "../../components/Forms/BankData.Form"
import { useGetInfoUser } from "../../hooks/useGetInfoUser"

export const BankDataView = () => {

  const { user} = useGetInfoUser()

  return (
    <div className="mt-3">
      <BankDataForm
        initialValues={{ digitoAgencia: "0", digitoConta: "0" }}
        userId={user.id}
        username={user.username}
      />
    </div>
  )
}