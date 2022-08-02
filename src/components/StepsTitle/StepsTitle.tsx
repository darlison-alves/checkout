import React from 'react'


interface StepTitleProps {
  step: string
  title: string
}

export const StepsTitle = ({ step, title }: StepTitleProps) => {
  return (
    <div className="flex items-center gap-2">
      <span className="step-border rounded-full w-[37px] h-[37px] border border-primary flex items-center justify-center text-primary">{step}</span>
      <h6 className="text-primary text-xl font-normal">{title}</h6>
    </div>
  )
}

export const Title = ({ title }: StepTitleProps) => {
  return (
    <div className="flex items-center gap-2">
      <h6 className="text-primary text-xl font-normal">{title}</h6>
    </div>
  )
}
