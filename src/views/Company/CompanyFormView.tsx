import { useLocation } from "react-router-dom"
import { CompanyPartnerFormView } from "./CompanyPartnerFormView"

export const CompanyFormView = () => {

  const { state } = useLocation()

  return (
    <CompanyPartnerFormView initialValues={state} />
  )
}