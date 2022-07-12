import React,{useState} from 'react'
import { StepsTitle } from '../../components/StepsTitle/StepsTitle'
import Cards, { Focused } from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import { Input } from '../../components/Input/Input';
import { MaskedInput } from '../../components/InputMask/InputMask';
import { validateMaskedInput } from '../../utils/validateMaskedInput';
import { FaRegCreditCard } from "react-icons/fa";
import {BiChevronLeft} from 'react-icons/bi'
import {BsCheck2} from 'react-icons/bs'
import {IoAlert} from 'react-icons/io5'
import { Button } from '../../components/Button/Button';
import { useFirstFormData } from '../../context/FormContext';
import { expiryOption, yearOption } from '../../utils/optionsData';
import { useNavigate } from "react-router-dom";
import imgExample from '../../assets/topo.png'
import AccordionMUI from '../../components/AccordionMUI/AccordionMUI';


const SecondStepFormModel = () => {
  const firstFormData = useFirstFormData()
  const [accordion, setAccordion] = useState('cartão')

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

        <AccordionMUI onClick={() => setAccordion('cartão')} expanded={accordion === 'cartão' ? true : false} accStep="1" accTitle="Pagar com cartão">
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
            placeholder='___.___.___-__'
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
        </AccordionMUI>

        <AccordionMUI onClick={() => setAccordion('boleto')} expanded={accordion === 'boleto' ? true : false} accStep="2" accTitle="Pagar com boleto">
            <p className="font-bold text-base text-black/75 flex items-center gap-2 mb-4">
                <IoAlert/>
                Informações sobre o pagamento via boleto
            </p>
            <div className='md:max-w-[50%]'>
            <MaskedInput
            error={checkForErrors('cpf')}
            mask="999.999.999-99"
            placeholder='___.___.___-__'
            onChange={getCpfValue} 
            type="text"
            value={cpf}
            focusPlaceholder="CPF"
          />
            </div>

            <div className="grid md:grid-cols-2 gap-4 mt-4">
                <button type="button" onClick={() => setAccordion('cartão')} className="bg-white border border-primary uppercase text-primary text-base font-normal py-3 w-full flex gap-2 items-center justify-center rounded-md">
                    <BiChevronLeft size={20}/>
                    Voltar para cartão
                </button>
                <button className="bg-primary uppercase text-white text-base font-normal py-3 w-full flex gap-3 items-center justify-center rounded-md">
                    <BsCheck2 size={20}/>
                    Gerar boleto
                </button>
            </div>
        </AccordionMUI>

        <AccordionMUI onClick={() => setAccordion('pix')} expanded={accordion === 'pix' ? true : false} accStep="3" accTitle="Pagar com pix">
          <p><b>Produtos</b>: R$ 397,00</p>
          <p><b>Frete</b>: R$ 0,00</p>
          <hr className="my-2"/>
          <p><b>Total</b>: R$ 397,00</p>

          <label className="block my-2 text-sm">CPF (Para emissão da Nota Fiscal)</label>
          <MaskedInput
            error={checkForErrors('cpf')}
            mask="999.999.999-99"
            placeholder='___.___.___-__'
            onChange={getCpfValue} 
            type="text"
            value={cpf}
            focusPlaceholder="CPF"
          />

          <button className="bg-primary uppercase text-white text-base font-normal py-3 w-full text-center rounded-md mt-5">
                    Gerar boleto
          </button>
        </AccordionMUI>
    </form>
    </>
  )
}

export default SecondStepFormModel