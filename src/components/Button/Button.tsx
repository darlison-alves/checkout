import React from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { BsWhatsapp } from 'react-icons/bs'
import { IoMdLock } from 'react-icons/io'
import { IconType } from 'react-icons/lib'
import { MdEmail } from 'react-icons/md'

interface ButtonProps {
  onClick?: () => void
  text: string
  type: 'button' | 'submit' | 'reset'
  Icon?: IconType
  hasIcon?: boolean
  className?: string
  disabled?: boolean;
  loaging?: boolean;
}
export const Button = ({ text, onClick, type, Icon = IoMdLock, hasIcon = true }: ButtonProps) => {
  return (
    <button type={type} onClick={onClick} className="bg-primary text-white text-base font-normal py-3 w-full flex gap-3 items-center justify-center rounded-md">
      { hasIcon && <Icon /> }
      {text}
    </button>
  )
}

export const ButtonPrimary = ({ loaging = false, disabled = false, text, onClick, type, className = "" }: ButtonProps) => {
  return (
    <button disabled={disabled || loaging} type={type} onClick={onClick} className={`${ loaging || disabled ? 'bg-[#f3c2a0]' : 'bg-primary' } py-2 w-[100px] ${className} ${disabled && "cursor-not-allowed" } text-white font-normal flex items-center justify-center rounded-md`}>
      { loaging && <AiOutlineLoading3Quarters className="animate-spin mr-3" /> }
      {text}
    </button>
  )
}

export const ButtonCustom = ({ disabled = false, text, onClick, type, className = "" }: ButtonProps) => {
  return (
    <button disabled={disabled} type={type} onClick={onClick} className={`${className} ${disabled && "cursor-not-allowed" } text-white font-normal flex items-center justify-center rounded-md`}>
      {text}
    </button>
  )
}

export const ButtonEmail = ({ text, onClick, type, Icon = MdEmail }: ButtonProps) => {
  return (
    <button type={type} onClick={onClick} className="bg-[#ea4335] text-white text-base font-normal py-3 w-full flex gap-3 items-center justify-center rounded-md">
      <Icon />
      {text}
    </button>
  )
}

export const ButtonWhats = ({ text, onClick, type, Icon = BsWhatsapp }: ButtonProps) => {
  return (
    <button type={type} onClick={onClick} className="bg-[#04d361] text-white text-base font-normal py-3 w-full flex gap-3 items-center justify-center rounded-md">
      <Icon />
      {text}
    </button>
  )
}
