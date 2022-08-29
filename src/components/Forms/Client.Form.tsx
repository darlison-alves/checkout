import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { BsFillHouseFill } from "react-icons/bs";
import { HiLockClosed } from "react-icons/hi";
import { MdEmail } from "react-icons/md";
import { ToastContext } from "../../context/ToastContext";
import { IAddress } from "../../interfaces/address.interface";
import { IClientUser } from "../../interfaces/clientUser.iterface";
import { ErrorEnum } from "../../interfaces/enums/errors.enum";
import { ClientService } from "../../services/client.service";
import { handleCompleteAddressAPI } from "../../utils/address.util";
import { statesOption } from "../../utils/optionsData";
import { validateEmailInput, validateMaskedInput } from "../../utils/validateMaskedInput";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import { MaskedInput } from "../InputMask/InputMask";
import { StepsTitle } from "../StepsTitle/StepsTitle";
import { AddressForm } from "./Address.Form";

interface IClientFormProps {
  initiValues: IClientUser
  id?: number;
}

export const ClientForm = ({ initiValues = {}, id }: IClientFormProps) => {
  const clientService = new ClientService()
  const [errors, setErrors] = useState<string[]>([]);
  const [isPending, setIsPending] = useState(false);
  //states for store the inputs value
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [address, setAddress] = useState<IAddress>({})
  
  const [cpf, setCpf] = useState("");

  const { showToast, setType } = useContext(ToastContext)

  useEffect(() => {
    if(initiValues) {
      setEmail(initiValues?.user?.email || "")
      setName(initiValues?.user?.name || "")
      setPhone(initiValues?.telefone || "")
      setCpf(initiValues?.cpf || "")
    }
  }, [initiValues])
  
  const goToNextStep = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true)
    const payload = {
      ...address,
      email,
      nome: name,
      cpf: cpf.replace(/[.-]/g, ''),
      telefone: phone.replace(/[()-\s]/g, '')
    }

    if(id) {
      clientService.update({...payload, id })
      .then(res => {
        console.log('res', res)
        showToast("atualizado com success")
        setType(ErrorEnum.success)
      }).catch(err => {
        console.log('err', err)
        showToast(err.message)
        setType(ErrorEnum.error)
      }).finally(() => {
        setIsPending(false)
      })
    } else {
      clientService.create(payload)
      .then(res => {
        console.log('res', res)
      }).catch(err => {
        console.log('err', err)
        showToast(err.message)
        setType(ErrorEnum.error)
      }).finally(() => {
        setIsPending(false)
      })
    }
  }

  const checkForErrors = (error: string) => {
    return errors.find((err) => err === error) ? true : false;
  };

  const getEmailInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (validateEmailInput(e.target.value)) {
      setErrors((currState) => {
        return currState.filter((err) => err !== "email");
      });
    } else {
      setErrors((currState) => [...currState, "email"]);
    }
    setEmail(e.target.value);
  };

  const getCpfValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (validateMaskedInput(e.target.value)) {
      setErrors((currState) => {
        return currState.filter((err) => err !== "cpf");
      });
    } else {
      setErrors((currState) => [...currState, "cpf"]);
    }
    setCpf(e.target.value);
  };

  const getCellPhoneInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (validateMaskedInput(e.target.value)) {
      setErrors((currState) => {
        return currState.filter((err) => err !== "phone");
      });
    } else {
      setErrors((currState) => [...currState, "phone"]);
    }
    setPhone(e.target.value);
  };

  return (
    <form
        onSubmit={goToNextStep}
        className="bg-white shadow-sm max-w-full md:max-w-[830px] w-full mx-auto mb-10 p-5 overflow-x-hidden rounded-md"
      >
        <section>
          <StepsTitle step="1" title="Dados pessoais" />

          <p className="text-base font-light my-3">
            Digite seus dados pessoais abaixo para iniciar a sua assinatura.
          </p>

          <Input
            hasIcon={true}
            error={errors.find((err) => err === "email") ? true : false}
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
              error={checkForErrors("cpf")}
              mask="999.999.999-99"
              placeholder="CPF"
              onChange={getCpfValue}
              type="text"
              value={cpf}
              focusPlaceholder="CPF"
            />
          </div>

          <div className="grid md:grid-cols-2 grid-cols-1 my-4 gap-4">
            <Input
              placeholder="Seu nome"
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              focusPlaceholder="Seu Nome"
            />

            <MaskedInput
              error={checkForErrors("phone")}
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
          <StepsTitle step="3" title="Seu endereço" />

          <p className="text-base font-light my-3">
            Digite o CEP para onde vamos enviar o seu pedido abaixo.
          </p>

          <AddressForm
            errors={errors}
            setErrors={setErrors}
            initiValues={initiValues?.endereco || {}}
            onChange={(addressChanged: IAddress) => { setAddress(old => ({ ...old, ...addressChanged }))  }} />
          
          <section className="mt-7 flex md:flex-row flex-col items-center justify-between gap-4">
            <div className="flex text-primary items-center gap-3">
              <HiLockClosed size={30} />
              <p className="text-base font-normal">
                Você está em uma página segura
              </p>
            </div>
            <div className="md:max-w-[300px] w-full">
              {isPending ? (
                <button
                  type="button"
                  className="bg-primary text-white text-base font-normal py-3 w-full flex gap-3 items-center justify-center rounded-md disabled:opacity-50"
                  disabled={isPending}
                >
                  Processando
                  <AiOutlineLoading3Quarters className="animate-spin" />
                </button>
              ) : (
                <Button type="submit" text="Continuar" />
              )}
            </div>
          </section>
        </section>
      </form>
  )
}