import React,{useState} from 'react'
import { StepsTitle } from '../../components/StepsTitle/StepsTitle'
import Cards, { Focused } from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import { Input } from '../../components/Input/Input';
import { MaskedInput } from '../../components/InputMask/InputMask';
import { validateMaskedInput } from '../../utils/validateMaskedInput';
import { FaRegCreditCard } from "react-icons/fa";
import { Button } from '../../components/Button/Button';
import { useFirstFormData } from '../../context/FormContext';
import { expiryOption, yearOption } from '../../utils/optionsData';
import { useNavigate } from "react-router-dom";
import imgExample from '../../assets/topo.png'

const SecondStepForm = () => {
  const firstFormData = useFirstFormData()

  const [errors, setErrors] = useState<string[]>([])
  const [focus, setFocus] = useState<Focused>('name')
  const [cardNumber, setCardNumber] = useState('')
  const [name, setName] = useState('')
  const [cpf, setCpf] = useState('')
  const [expiry, setExpiry] = useState('')
  const [year, setYear] = useState('')
  const [cvv, setCvv] = useState('')

  const navigate = useNavigate()

  const handleInputFocus = (e:React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    if(e.target.name === 'name'){
      setFocus('name')
    }
    if(e.target.name === 'number'){
      setFocus('number')
    }
    if(e.target.name === 'expiry'){
      setFocus('expiry')
    }
    if(e.target.name === 'cvc'){
      setFocus('cvc')
    }
  }


  const checkForErrors = (error:string) =>{
    return errors.find(err => err === error) ? true : false
  }

  const getSelectedExpiry = (e:React.ChangeEvent<HTMLSelectElement>) =>{
    if(e.target.value !== "Mes"){
      setErrors(currState => {
       return currState.filter(err => err !== 'Mes')
      })
    }else{
      setErrors(currState => [...currState, 'Mes'])
    }
    setExpiry(e.target.value)
  }

  const getSelectedYear = (e:React.ChangeEvent<HTMLSelectElement>) =>{
    if(e.target.value !== "Ano"){
      setErrors(currState => {
       return currState.filter(err => err !== 'year')
      })
    }else{
      setErrors(currState => [...currState, 'year'])
    }
    setYear(e.target.value)
  }

  const getCardNumberValue = (e:React.ChangeEvent<HTMLInputElement>) =>{
    if(validateMaskedInput(e.target.value)){
      setErrors(currState => {
       return currState.filter(err => err !== 'card')
      })
    }else{
      setErrors(currState => [...currState, 'card'])
    }
    setCardNumber(e.target.value)
  }

  const getCpfValue = (e:React.ChangeEvent<HTMLInputElement>) =>{
    if(validateMaskedInput(e.target.value)){
      setErrors(currState => {
       return currState.filter(err => err !== 'cpf')
      })
    }else{
      setErrors(currState => [...currState, 'cpf'])
    }
    setCpf(e.target.value)
  }


  const handleSubmit = async (e:React.FormEvent) =>{
    e.preventDefault()
    
    const data = {
      cvv,
      expiry,
      name,
      cardNumber,
      cpf,
      year,
    }

    const raw = {
      ...data,
      ...firstFormData
    }


    console.log(raw)

    navigate('/obrigado',{replace:true})
  }

  return (
    <>
    <img src={imgExample} className="max-w-full md:max-w-[830px] w-full mx-auto" alt="imagem do produto" />

    <form onSubmit={handleSubmit} className="bg-white max-w-full md:max-w-[830px] w-full mx-auto mb-10 p-5 overflow-x-hidden rounded-md shadow-sm">
        <StepsTitle step="3" title="Pagamento" />

        <p className="text-base font-light my-3">
        Digite as informações de cobrança para finalizar a assinatura.
        </p>

        <section className="grid md:grid-cols-2 gap-4 mt-5">
        <Cards
          cvc={cvv}
          expiry={expiry+year}
          focused={focus}
          name={name}
          number={cardNumber}
          locale={{valid:'Validade'}}
          placeholders={{name:'Seu nome aqui'}}
        />

        <div>
        <MaskedInput
        hasIcon={true}
        error={checkForErrors('card')}
        icon={
          <FaRegCreditCard
            className="absolute top-[14px] left-[12px]"
            color="#92979A"
            size={20}
          />
        }
            mask="9999 9999 9999 9999"
            placeholder='Número do Cartão'
            onChange={getCardNumberValue}
            onFocus={handleInputFocus}
            name="number"
            type="text"
            value={cardNumber}
            focusPlaceholder="Número do cartão"
          />

          <div className="mt-3">
          <Input
            placeholder="NOME (Como escrito no Cartão)"
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            onFocus={handleInputFocus}
            name="name"
            focusPlaceholder="Nome"
          />
          </div>

          <div className="mt-3">
          <MaskedInput
            error={checkForErrors('cpf')}
            mask="999.999.999-99"
            placeholder='CPF'
            onChange={getCpfValue} 
            type="text"
            value={cpf}
            focusPlaceholder="CPF"
          />
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-3">

          <div className="flex gap-3">
          <select onFocus={handleInputFocus} name="expiry" value={expiry} onChange={getSelectedExpiry} className={`px-3 py-3 text-base font-semibold text-secondary border rounded-[4px] w-full placeholder:text-secondary transition-colors placeholder:text-base focus:outline-none focus:ring-2  
          ${checkForErrors('Mes') ? 'border-red-700 focus:ring-red-700' : 'border-[#CED4DA] focus:ring-primary'}`}
          >
          <option value="Mes">Mês</option>
          {expiryOption.map((expiry,index) => {
            return (
              <option key={expiry} value={index + 1 > 9 ? index+1 : `0${index+1}`}>{expiry}</option>
            )
          })}
          </select>

          <select onFocus={handleInputFocus} name="expiry" value={year} onChange={getSelectedYear} className={`px-3 py-3 text-base font-semibold text-secondary border rounded-[4px] w-full placeholder:text-secondary transition-colors placeholder:text-base focus:outline-none focus:ring-2  
          ${checkForErrors('year') ? 'border-red-700 focus:ring-red-700' : 'border-[#CED4DA] focus:ring-primary'}`}
          >
          <option value="Ano">Ano</option>
          {yearOption.map(year => {
            return (
              <option key={year} value={year.slice(2,4)}>{year}</option>
            )
          })}
          </select>
          </div>

          <Input
            placeholder="CVV (3 ou 4 dígitos)"
            type="text"
            onChange={(e) => setCvv(e.target.value)}
            value={cvv}
            onFocus={handleInputFocus}
            name="cvc"
            focusPlaceholder="CVV"
          />

          </div>          
        
            <div className="w-full mt-3">
            <Button text='FINALIZAR COMPRA' type='submit'/>
            </div>
        </div>

        </section>
    </form>
    </>
  )
}

export default SecondStepForm