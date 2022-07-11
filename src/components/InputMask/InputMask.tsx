import React from 'react'
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
    icon?: React.ReactNode;
    error:boolean
}

export const MaskedInput = ({mask,hasIcon = false,icon,error, name, value,onChange,placeholder,type,onFocus}:MaskedInputProps) => {
  return (
    <>
    {hasIcon ? (
  <InputMask mask={mask} value={value} onChange={onChange} placeholder={placeholder} type={type} name={name}>
    <div className="relative w-full">
      <input
        onChange={onChange}
        onFocus={onFocus}
        className={`pr-3 pl-10 py-3 text-base font-semibold text-secondary border rounded-[4px] w-full placeholder:text-secondary placeholder:text-base focus:outline-none focus:ring-2  ${error ? 'border-red-700 focus:ring-red-700' : 'border-[#CED4DA] focus:ring-primary'} transition-colors`}
        type={type}
        placeholder={placeholder}
        required
      />
      {icon}
    </div>
    </InputMask>

    ) : (
    <>
    <InputMask mask={mask} value={value} onChange={onChange} onFocus={onFocus} placeholder={placeholder} type={type} name={name}>
      <input
          className={`px-3 py-3 text-base font-semibold text-secondary border rounded-[4px] w-full placeholder:text-secondary placeholder:text-base focus:outline-none focus:ring-2  ${error ? 'border-red-700 focus:ring-red-700' : 'border-[#CED4DA] focus:ring-primary'} transition-colors`}
          required
       />
     </InputMask>
    </>
    )
  }
  </>
    
  )
}
