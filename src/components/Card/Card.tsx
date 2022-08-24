import { CSSProperties, MouseEventHandler } from "react";

export interface IPlan {
  id: number;
  name: string;
  price: number;
  color?: string;
  darkBgColor?: string;
  style?: CSSProperties;
  onClick?: MouseEventHandler;
}

export const CardPlan = ({ name, price = 0, onClick = () => {}, style = {}}: IPlan) => {
  return (
    <div style={style} className={`p-4 max-w-sm rounded-lg border shadow-md sm:p-8 dark:border-gray-700 ml-2`}>
      <h5 className="mb-4 text-xl font-medium text-white dark:text-white">{ name }</h5>
      <hr />
      <div className="flex items-baseline text-white dark:text-white">
        <hr />
        <span className="text-1xl font-semibold">R$</span>
        <span className="text-3xl font-extrabold tracking-tight">{ price.toFixed(2) }</span>
        <span className="ml-1 text-xl font-normal text-white dark:text-white">/mês</span>
      </div>
  
      <ul role="list" className="my-7 space-y-5">
        
      </ul>
      <button type="button" className={`bg-transparent text-white font-semibold py-2 px-4 border border-white rounded`} onClick={onClick} >
        Escolher plano 
      </button>
    </div>
  )
}