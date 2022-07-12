import React, { useState } from "react";

interface InputProps {
  hasIcon?: boolean
  placeholder: string
  value?: string
  name?:string
  type: string
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  onFocus?: React.FocusEventHandler<HTMLInputElement>
  icon?: React.ReactNode
  error?:boolean
  focusPlaceholder?:string
  required?:boolean
}

export const Input = ({
  hasIcon = false,
  placeholder,
  value,
  onChange,
  onFocus,
  icon,
  type,
  name,
  error = false,
  focusPlaceholder = 'Placeholder',
  required = true
}: InputProps) => {

  return (
    <>
      {hasIcon ? (
      <div className="relative w-full">
        <input
          onChange={onChange}
          onFocus={onFocus}
          name={name}
          className={`isFocus pr-3 pl-10 py-3 text-base font-semibold text-secondary border rounded-[4px] w-full placeholder:text-secondary placeholder:text-base focus:outline-none focus:ring-2  ${error ? 'border-red-700 focus:ring-red-700' : 'border-[#CED4DA] focus:ring-primary'} transition-colors`}
          type={type}
          value={value}
          placeholder={placeholder}
          required
        />
        <span className="text-primary text-xs absolute top-[-10px] px-2 bg-white opacity-0 transition left-5">{focusPlaceholder}</span>
        {icon}
      </div>
      ) : (
      <div className="relative w-full">
        
        <input
          onChange={onChange}
          onFocus={onFocus}
          className={`isFocus px-3 py-3 text-base font-semibold text-secondary border rounded-[4px] w-full placeholder:text-secondary placeholder:text-base focus:outline-none focus:ring-2  ${error ? 'border-red-700 focus:ring-red-700' : 'border-[#CED4DA] focus:ring-primary'}
           transition-colors`}
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          required={required}
        />
        <span className="text-primary text-xs absolute top-[-10px] bg-white px-2 left-3 opacity-0 transition">{focusPlaceholder}</span>
      </div>
      )
    }
    </>
  );
};
