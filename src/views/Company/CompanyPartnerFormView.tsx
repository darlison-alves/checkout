import { useEffect, useState } from "react"
import { CompanyPartnerForm } from "../../components/Forms/CompanyPartner.Form"
import { api } from "../../config/axios.base"
import { ICategory } from "./interface"

export const CompanyPartnerFormView = ({ initialValues }: any) => {

  const [categories, setCategories] = useState<Array<ICategory>>([])

  useEffect(() => {
    api().get('/empresa/categorias')
      .then(res => {        
        setCategories(res.data)
      }).catch(err => {
        console.log('err category', err)
      })
  }, [])

  return (
    <CompanyPartnerForm initialValues={initialValues} categories={categories} />
  )
}