import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { ClientForm } from "../../components/Forms/Client.Form"

export const ClientEditView = (props: any) => {
  const location = useLocation()
 
  const [client, setClient] = useState<any>({})

  useEffect(() => {    
    setClient(location.state)
  }, [])

  return (
    <div className="mt-4">
      <ClientForm initiValues={client} id={client.id} />
    </div>
  )
}