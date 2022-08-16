import React from 'react'
import { BsWhatsapp } from 'react-icons/bs'
import {IoMdLock} from 'react-icons/io'
import { IconType } from 'react-icons/lib'
import { MdEmail } from 'react-icons/md'

interface ButtonProps {
  onClick?: () => void
    text:string
    type:'button' | 'submit'| 'reset'
    Icon?: IconType
}
export const Button = ({text,onClick,type, Icon = IoMdLock }:ButtonProps) => {
  return (
    <button type={type} onClick={onClick} className="bg-primary text-white text-base font-normal py-3 w-full flex gap-3 items-center justify-center rounded-md">
        <Icon />
        {text}
    </button>
  )
}

export const ButtonEmail = ({text,onClick,type, Icon = MdEmail }:ButtonProps) => {
  return (
    <button type={type} onClick={onClick} className="bg-[#ea4335] text-white text-base font-normal py-3 w-full flex gap-3 items-center justify-center rounded-md">
        <Icon />
        {text}
    </button>
  )
}

export const ButtonWhats = ({text,onClick,type, Icon = BsWhatsapp }:ButtonProps) => {
  return (
    <button type={type} onClick={onClick} className="bg-[#04d361] text-white text-base font-normal py-3 w-full flex gap-3 items-center justify-center rounded-md">
        <Icon />
        {text}
    </button>
  )
}
