import { createContext,useContext,useState } from "react";

interface FormProviderProps {
    children:React.ReactNode
}

interface firstFormDataProps {
    email:string
    firstName:string
    lastName:string
    phone:string
    cep:string
    address:string
    number:string
    complement:string
    district:string
    city:string
    state:string
}


const FormContext = createContext({})

const FormDataUpdateContext = createContext<any>(null)

export const useFirstFormData = () => {
    return useContext(FormContext)
}

export const useUpdateFirstFormData = () => {
    return useContext(FormDataUpdateContext)
}

export function FormProvider ({children}:FormProviderProps) {
    const [firstFormData, setFirstFormData] = useState<firstFormDataProps | {}>({})

    const updateFormData = (data:firstFormDataProps) =>{
        setFirstFormData(data)
    }

    return (
        <FormContext.Provider value={firstFormData}>
            <FormDataUpdateContext.Provider value={updateFormData}>
            {children}
            </FormDataUpdateContext.Provider>     
        </FormContext.Provider>
    )
}