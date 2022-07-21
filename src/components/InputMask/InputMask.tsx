import React, { useState } from 'react'
import InputMask from "react-input-mask";

interface MaskedInputProps {
    mask:string
    hasIcon?:boolean
    value?:string
    onChange: React.ChangeEventHandler<HTMLInputElement>
    onFocus?: React.FocusEventHandler<HTMLInputElement>
    name?:string
    placeholder?:string
    type:string
    icon?: React.ReactNode
    error:boolean,
    focusPlaceholder?:string
}

export const MaskedInput = ({mask,hasIcon = false,focusPlaceholder = 'Placeholder',icon,error, name, value,onChange,placeholder,type,onFocus}:MaskedInputProps) => {
  const [isAlreadyFocus, setIsAlreadyFocus] = useState(false)
 
  const handleFocus = () =>{
    setIsAlreadyFocus(true)
    onFocus
  }
  return (
    <>
    {hasIcon ? (
          <div className="relative w-full">
  <InputMask 
  onFocus={handleFocus}
   className={`isFocus pr-3 pl-10 py-3 text-base font-semibold text-secondary border rounded-[4px] w-full placeholder:text-secondary placeholder:text-base focus:outline-none focus:ring-2  ${error ? 'border-red-700 focus:ring-red-700' : 'border-[#CED4DA] focus:ring-primary'} transition-colors`}
  mask={mask} 
  value={value} 
  onChange={onChange} 
  placeholder={placeholder} 
  type={type} 
  name={name}>

    </InputMask>
    {isAlreadyFocus &&  <span className="text-primary text-xs absolute top-[-10px] px-2 bg-white transition left-5">{focusPlaceholder}</span>}
      {icon}
    </div>

    ) : (
      <div className="relative w-full">
    <InputMask
     mask={mask} 
     value={value} 
     onChange={onChange} 
     onFocus={handleFocus}
     placeholder={placeholder} 
     type={type} 
     name={name}
     className={`isFocus px-3 py-3 text-base font-semibold text-secondary border rounded-[4px] w-full placeholder:text-secondary placeholder:text-base focus:outline-none focus:ring-2  ${error ? 'border-red-700 focus:ring-red-700' : 'border-[#CED4DA] focus:ring-primary'} transition-colors`}
     required
     >

     </InputMask>
     {isAlreadyFocus &&  <span className="text-primary text-xs absolute top-[-10px] px-2 bg-white transition left-5">{focusPlaceholder}</span>}
     </div>
    )
  }
  </>
    
  )
}
