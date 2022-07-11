import React from "react";

interface InputProps {
  hasIcon?: boolean;
  placeholder: string;
  value?: string;
  name?:string
  type: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  onFocus?: React.FocusEventHandler<HTMLInputElement>
  icon?: React.ReactNode;
  error?:boolean
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
  error = false
}: InputProps) => {

  return (
    <>
      {hasIcon ? (
      <div className="relative w-full">
        <input
          onChange={onChange}
          onFocus={onFocus}
          name={name}
          className={`pr-3 pl-10 py-3 text-base font-semibold text-secondary border rounded-[4px] w-full placeholder:text-secondary placeholder:text-base focus:outline-none focus:ring-2  ${error ? 'border-red-700' : 'border-[#CED4DA]'} ${error ? 'focus:ring-red-700' : 'focus:ring-primary'} transition-colors`}
          type={type}
          value={value}
          placeholder={placeholder}
          required
        />
        {icon}
      </div>
      ) : (
      <>
        <input
          onChange={onChange}
          onFocus={onFocus}
          className={`px-3 py-3 text-base font-semibold text-secondary border rounded-[4px] w-full placeholder:text-secondary placeholder:text-base focus:outline-none focus:ring-2  ${error ? 'border-red-700' : 'border-[#CED4DA]'} ${error ? 'focus:ring-red-700' : 'focus:ring-primary'} transition-colors`}
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          required
        />
      </>
      )
    }
    </>
  );
};
