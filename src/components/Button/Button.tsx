import React from 'react'
import {IoMdLock} from 'react-icons/io'

interface ButtonProps {
  onClick?: () => void
    text:string
    type:'button' | 'submit'| 'reset'
}
export const Button = ({text,onClick,type}:ButtonProps) => {
  return (
    <button type={type} onClick={onClick} className="bg-primary text-white text-base font-normal py-3 w-full flex gap-3 items-center justify-center rounded-md">
        <IoMdLock/>
        {text}
    </button>
  )
}
