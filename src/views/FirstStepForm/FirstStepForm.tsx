import React, { useState } from "react";
import { StepsTitle } from "../../components/StepsTitle/StepsTitle";
import { MdEmail } from "react-icons/md";
import { BsFillHouseFill } from "react-icons/bs";
import { HiLockClosed } from "react-icons/hi";
import { Input } from "../../components/Input/Input";
import { MaskedInput } from "../../components/InputMask/InputMask";
import axios from 'axios'
import { Button } from "../../components/Button/Button";
import { FirstStepFormProps } from "./FirstStepForm.types";
import { validateMaskedInput } from "../../utils/validateMaskedInput";
import { useUpdateFirstFormData } from "../../context/FormContext";
import { statesOption } from "../../utils/optionsData";
import imgExample from '../../assets/topo.png'
import {useParams} from 'react-router-dom'
import { api } from "../../services/api";

const FirstStepForm = ({nextStepForm}:FirstStepFormProps) => {
  //states for error
  const [errors, setErrors] = useState<string[]>([])
  const [isCepDefined, setIsCepDefined] = useState(false) 
  //states for store the inputs value
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [cep, setCep] = useState('')
  const [address, setAddress] = useState('')
  const [number, setNumber] = useState('')
  const [complement, setComplement] = useState('')
  const [district, setDistrict] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('Estado')
  const [cpf, setCpf] = useState('')
  const [codeIBGE, setCodeIBGE] = useState('')


  const updateFirstFormData = useUpdateFirstFormData()
  const {id} = useParams()


  const checkForErrors = (error:string) =>{
    return errors.find(err => err === error) ? true : false
  }

  const validateEmailInput = (value:string) =>{
    const pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/; 
    if(value.match(pattern)){
      return true
    }else{
      return false
    }
  }

  const getEmailInputValue = (e:React.ChangeEvent<HTMLInputElement>) =>{
    if(validateEmailInput(e.target.value)){
      setErrors(currState => {
       return currState.filter(err => err !== 'email')
      })
    }else{
      setErrors(currState => [...currState, 'email'])
    }
    setEmail(e.target.value)
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

  const getCellPhoneInputValue = (e:React.ChangeEvent<HTMLInputElement>) =>{
    if(validateMaskedInput(e.target.value)){
      setErrors(currState => {
       return currState.filter(err => err !== 'phone')
      })
    }else{
      setErrors(currState => [...currState, 'phone'])
    }
    setPhone(e.target.value)
  }

  const getSelectValue = (e:React.ChangeEvent<HTMLSelectElement>) =>{
    if(e.target.value !== "Estado"){
      setErrors(currState => {
       return currState.filter(err => err !== 'state')
      })
    }else{
      setErrors(currState => [...currState, 'state'])
    }
    setState(e.target.value)
  }


  const handleAutoCompleteAddress = async (e:React.ChangeEvent<HTMLInputElement>) =>{
    setCep(e.target.value)

    if(validateMaskedInput(e.target.value)){
      setErrors(currState => {
       return currState.filter(err => err !== 'cep')
      })
    }else{
      setErrors(currState => [...currState, 'cep'])
    }

    if(e.target.value.includes('_')) return

    try{
      const response = await axios.get(`https://viacep.com.br/ws/${e.target.value}/json/`)

      
      setAddress(response.data.logradouro)
      setComplement(response.data.complemento)
      setDistrict(response.data.bairro)
      setCity(response.data.localidade)
      setState(response.data.uf)
      setCodeIBGE(response.data.ibge)

      setIsCepDefined(true)

    }catch(err:any){
      console.error(err.message)
    }
   
  }

  const goToNextStep = async (e:React.FormEvent) =>{
    e.preventDefault()
    if(state === 'Estado'){
      setErrors(currState => [...currState, 'state'])
      return
    }
    setErrors(currState => currState.filter(err => err !== 'state'))

    const dataFromForm = {
      email,
      firstName,
      lastName,
      phone,
      cep,
      address,
      number,
      complement,
      district,
      city,
      state
    }

        
    let userInfo = {
      "nome": `${firstName} ${lastName}`,
      "email": email,
      "cpf": cpf,
      "telefone":phone,
      "planoId": id
    }

    console.log(userInfo)

    let addressInfo = {
      "logradouro": address,
      "bairro": district,
      "cidade": city,
      "estado": state,
      "codeIBGE": codeIBGE
    }

    try{
     const userSignupInfo = await axios.post('https://api.ibigboss.link/api/auth/signup',{
       headers: {'Content-Type': 'application/json'}, 
       body:JSON.stringify(userInfo)
     })
     console.log(userSignupInfo)
    
    //  const addressUserInfo = await api.post(`/address/${userId}/me`)

    console.log(dataFromForm)
    updateFirstFormData(dataFromForm)
    // nextStepForm()
    }catch(err:any){
      console.error(err.message)
    }

    
  }


  return (
    <>
    <img src={imgExample} className="max-w-full md:max-w-[830px] w-full mx-auto shadow-sm" alt="imagem do produto" />
    <form onSubmit={goToNextStep} className="bg-white max-w-full md:max-w-[830px] w-full mx-auto mb-10 p-5 overflow-x-hidden rounded-md">
      <section>
        <StepsTitle step="1" title="Dados pessoais" />

        <p className="text-base font-light my-3">
          Digite seus dados pessoais abaixo para iniciar a sua assinatura.
        </p>

        <Input
          hasIcon={true}
          error={errors.find(err => err === 'email') ? true : false}
          icon={
            <MdEmail
              className="absolute top-[14px] left-[12px]"
              color="#92979A"
              size={20}
            />
          }
          value={email}
          placeholder="Seu e-mail"
          type="Email"
          onChange={getEmailInputValue}
          focusPlaceholder="E-mail"
        />

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

        <div className="grid md:grid-cols-3 grid-cols-1 my-4 gap-4">
          <Input
            placeholder="Seu nome"
            type="text"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
            focusPlaceholder="Seu Nome"
          />

          <Input
            placeholder="Seu sobrenome"
            type="text"
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
            focusPlaceholder="Seu sobrenome"
          />

          <MaskedInput
            error={checkForErrors('phone')}
            mask="(99) 99999-9999"
            onChange={getCellPhoneInputValue}
            type="text"
            value={phone}
            placeholder="(__) _____-____"
            focusPlaceholder="Telefone"
          />
        </div>
      </section>

      <section>
        <StepsTitle step="2" title="Seu endereço" />

        <p className="text-base font-light my-3">
          Digite o CEP para onde vamos enviar o seu pedido abaixo.
        </p>

        <div className="md:max-w-[252px] w-full">
          <MaskedInput
            error={checkForErrors('cep')}
            hasIcon={true}
            icon={
              <BsFillHouseFill
                className="absolute top-[14px] left-[12px]"
                color="#92979A"
                size={20}
              />
            }
            mask="99999-999"
            placeholder="00000-000"
            onChange={handleAutoCompleteAddress}
            value={cep}
            type="text"
            focusPlaceholder="CEP"
          />
        </div>

        {isCepDefined && (
          <div className="my-3">
          <div className="flex md:flex-row flex-col gap-3 md:gap-4">

          <div className="md:max-w-[515px] w-full">
          <Input
              placeholder="Endereço (ex: rua joaquina dos santos)"
              type="text"
              onChange={(e) => setAddress(e.target.value)}
              value={address}
              focusPlaceholder="Endereço"
          />
          </div>
        
          <div className="md:max-w-[270px] w-full">
          <Input
              placeholder="Número"
              type="text"
              onChange={(e) => setNumber(e.target.value)}
              value={number}
              focusPlaceholder="Número"
          />
          </div>

          </div>

          <div className="grid md:grid-cols-2 my-3 gap-4">
          <Input
              placeholder="Complemento"
              type="text"
              onChange={(e) => setComplement(e.target.value)}
              value={complement}
              focusPlaceholder="Complemento"
              required={false}
          />
          <Input
              placeholder="Bairro"
              type="text"
              onChange={(e) => setDistrict(e.target.value)}
              value={district}
              focusPlaceholder="Bairro"
          />
          </div>


          <div className="grid md:grid-cols-2 my-3 gap-4">
          <Input
              placeholder="Cidade"
              type="text"
              onChange={(e) => setCity(e.target.value)}
              value={city}
              focusPlaceholder="Cidade"
          />
          <select value={state} onChange={getSelectValue} className={`px-3 py-3 text-base font-semibold text-secondary border rounded-[4px] w-full placeholder:text-secondary transition-colors placeholder:text-base focus:outline-none focus:ring-2  
          ${checkForErrors('state') ? 'border-red-700 focus:ring-red-700' : 'border-[#CED4DA] focus:ring-primary'}`}
          >
          <option value="Estado">Estado</option>
          {statesOption.map(state => {
            return (
              <option key={state} value={state}>{state}</option>
            )
          })}
          </select>
          </div>
    
        </div>
        )    
        }
        

        <section className="mt-7 flex md:flex-row flex-col items-center justify-between gap-4">
          <div className="flex text-primary items-center gap-3">
            <HiLockClosed size={30}/>
            <p className="text-base font-normal">Você está em uma página segura</p>
          </div>
          <div className="md:max-w-[300px] w-full">
          <Button type="submit" text="Continuar"/>
          </div>
        </section>
      </section>
    </form>
    </>
  );
};

export default FirstStepForm;
