import { createContext,useContext,useState } from "react";

interface FormProviderProps {
    children:React.ReactNode
}

interface firstFormDataProps {
    id:string
}


const FormContext = createContext({} as firstFormDataProps)

const FormDataUpdateContext = createContext<any>(null)

export const useFirstFormData = () => {
    return useContext(FormContext)
}

export const useUpdateFirstFormData = () => {
    return useContext(FormDataUpdateContext)
}

export function FormProvider ({children}:FormProviderProps) {
    const [firstFormData, setFirstFormData] = useState<firstFormDataProps>({} as firstFormDataProps)

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