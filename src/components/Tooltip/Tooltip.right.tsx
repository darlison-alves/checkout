import { PropsWithChildren } from 'react';
interface IToolTipRightProps extends PropsWithChildren {
  text: string;
}

export const ToolTipRight = ({ text, children }: IToolTipRightProps) => {
  return (
    <div className="tooltip">
      {children}
      <div className='tooltiptext'>
        {text}
      </div>
    </div>
  )
}