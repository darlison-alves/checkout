import React, { useEffect, useState } from "react";
import { StepsTitle } from "../../components/StepsTitle/StepsTitle";
import Cards, { Focused } from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { validateMaskedInput } from "../../utils/validateMaskedInput";
import { FaRegCreditCard } from "react-icons/fa";
import { Button } from "../../components/Button/Button";
import { useFirstFormData } from "../../context/FormContext";
import { expiryOption, yearOption } from "../../utils/optionsData";
import { useNavigate } from "react-router-dom";
import imgExample from "../../assets/topo.png";
import InputMask from "react-input-mask";

import Swal from "sweetalert2";
import { api } from "../../config/axios.base";

const SecondStepForm = () => {
  const firstFormData = useFirstFormData();

  const [isPending, setIsPending] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [focus, setFocus] = useState<Focused>("name");
  const [cardNumber, setCardNumber] = useState("");
  const [name, setName] = useState("");
  // const [cpf, setCpf] = useState('')
  const [expiry, setExpiry] = useState("");
  const [year, setYear] = useState("");
  const [cvv, setCvv] = useState("");
  const [isAlreadyFocus, setIsAlreadyFocus] = useState<string[]>([]);

  const navigate = useNavigate();

  const handleInputFocus = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    if (e.target.name === "name") {
      setFocus("name");
    }
    if (e.target.name === "number") {
      setFocus("number");
    }
    if (e.target.name === "expiry") {
      setFocus("expiry");
    }
    if (e.target.name === "cvc") {
      setFocus("cvc");
    }
    setIsAlreadyFocus((currState) => [...currState, e.target.name]);
  };

  const checkForErrors = (error: string) => {
    return errors.find((err) => err === error) ? true : false;
  };

  const getSelectedExpiry = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value !== "Mes") {
      setErrors((currState) => {
        return currState.filter((err) => err !== "Mes");
      });
    } else {
      setErrors((currState) => [...currState, "Mes"]);
    }
    setExpiry(e.target.value);
  };

  const getSelectedYear = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value !== "Ano") {
      setErrors((currState) => {
        return currState.filter((err) => err !== "year");
      });
    } else {
      setErrors((currState) => [...currState, "year"]);
    }
    setYear(e.target.value);
  };

  const getCardNumberValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (validateMaskedInput(e.target.value)) {
      setErrors((currState) => {
        return currState.filter((err) => err !== "card");
      });
    } else {
      setErrors((currState) => [...currState, "card"]);
    }
    setCardNumber(e.target.value);
  };

  // const getCpfValue = (e:React.ChangeEvent<HTMLInputElement>) =>{
  //   if(validateMaskedInput(e.target.value)){
  //     setErrors(currState => {
  //      return currState.filter(err => err !== 'cpf')
  //     })
  //   }else{
  //     setErrors(currState => [...currState, 'cpf'])
  //   }
  //   setCpf(e.target.value)
  // }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsPending(true);

    try {
      const data = {
        clientId: firstFormData,
        orderWay: "CC",
        card: {
          holder: name,
          cardNumber: cardNumber,
          expirationDate: `${expiry}/${year}`,
          securityCode: cvv,
        },
      };

      const response = await api().post(
        "/api/payments/plan/pf",
        data
      );

      console.log(response);

      navigate("/obrigado", { replace: true });
    } catch (err: any) {
      console.error(err);
      Swal.fire({
        title: "Alguma coisa deu errado :(",
        text: `Erro: ${err.response.data.message}`,
        icon: "error",
        confirmButtonText: "OK",
      });
      setIsPending(false);
    }
  };

  const validateLabelHasToShow = (label: string) => {
    return isAlreadyFocus.find((item) => item === label);
  };

  return (
    <>
      <img
        src={imgExample}
        className="max-w-full md:max-w-[830px] w-full mx-auto h-[300px] object-cover"
        alt="imagem do produto"
      />

      <form
        onSubmit={handleSubmit}
        className="bg-white max-w-full md:max-w-[830px] w-full mx-auto mb-10 p-5 overflow-x-hidden rounded-md shadow-sm"
      >
        <StepsTitle step="3" title="Pagamento" />

        <p className="text-base font-light my-3">
          Digite as informações de cobrança para finalizar a assinatura.
        </p>

        <section className="grid md:grid-cols-2 gap-4 mt-5">
          <Cards
            cvc={cvv}
            expiry={expiry + year.slice(2, 4)}
            focused={focus}
            name={name}
            number={cardNumber}
            locale={{ valid: "Validade" }}
            placeholders={{ name: "Seu nome aqui" }}
          />

          <div>
            <div className="w-full relative mt-3">
              <FaRegCreditCard
                className="absolute top-[14px] left-[12px]"
                color="#92979A"
                size={20}
              />
              <InputMask
                className="pr-3 pl-10 py-3 text-base font-semibold text-secondary border rounded-[4px] w-full placeholder:text-secondary placeholder:text-base focus:outline-none focus:ring-2  border-[#CED4DA] focus:ring-primary transition-colors"
                placeholder="Número do cartão"
                mask="9999 9999 9999 9999"
                onChange={getCardNumberValue}
                onFocus={handleInputFocus}
                name="number"
                type="text"
                value={cardNumber}
              />
              {validateLabelHasToShow("number") && (
                <span className="text-primary text-xs absolute top-[-10px] px-2 bg-white transition left-5">
                  Número do cartão
                </span>
              )}
            </div>

            <div className="w-full relative mt-3">
              <input
                className="transition-colors px-3 py-3 text-base font-semibold text-secondary border rounded-[4px] w-full placeholder:text-secondary placeholder:text-base focus:outline-none focus:ring-2 border-[#CED4DA] focus:ring-primary"
                placeholder="NOME (Como escrito no Cartão)"
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                onFocus={handleInputFocus}
                name="name"
              />
              {validateLabelHasToShow("name") && (
                <span className="text-primary text-xs absolute top-[-10px] px-2 bg-white transition left-5">
                  Nome
                </span>
              )}
            </div>
            {/*           
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
          </div> */}

            <div className="grid grid-cols-2 gap-4 mt-3">
              <div className="flex gap-3">
                <select
                  onFocus={handleInputFocus}
                  name="expiry"
                  value={expiry}
                  onChange={getSelectedExpiry}
                  className={`px-3 py-3 text-base font-semibold text-secondary border rounded-[4px] w-full placeholder:text-secondary transition-colors placeholder:text-base focus:outline-none focus:ring-2  
          ${
            checkForErrors("Mes")
              ? "border-red-700 focus:ring-red-700"
              : "border-[#CED4DA] focus:ring-primary"
          }`}
                >
                  <option value="Mes">Mês</option>
                  {expiryOption.map((expiry, index) => {
                    return (
                      <option
                        key={expiry}
                        value={index + 1 > 9 ? index + 1 : `0${index + 1}`}
                      >
                        {expiry}
                      </option>
                    );
                  })}
                </select>

                <select
                  onFocus={handleInputFocus}
                  name="expiry"
                  value={year}
                  onChange={getSelectedYear}
                  className={`px-3 py-3 text-base font-semibold text-secondary border rounded-[4px] w-full placeholder:text-secondary transition-colors placeholder:text-base focus:outline-none focus:ring-2  
          ${
            checkForErrors("year")
              ? "border-red-700 focus:ring-red-700"
              : "border-[#CED4DA] focus:ring-primary"
          }`}
                >
                  <option value="Ano">Ano</option>
                  {yearOption.map((year) => {
                    return (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="w-full relative">
                <input
                  className="transition-colors px-3 py-3 text-base font-semibold text-secondary border rounded-[4px] w-full placeholder:text-secondary placeholder:text-base focus:outline-none focus:ring-2 border-[#CED4DA] focus:ring-primary"
                  placeholder="CVV (3 ou 4 dígitos)"
                  type="text"
                  onChange={(e) => setCvv(e.target.value)}
                  value={cvv}
                  onFocus={handleInputFocus}
                  name="cvc"
                />
                {validateLabelHasToShow("cvc") && (
                  <span className="text-primary text-xs absolute top-[-10px] px-2 bg-white transition left-5">
                    CVC
                  </span>
                )}
              </div>
            </div>

            <div className="w-full mt-3">
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
                <Button text="FINALIZAR COMPRA" type="submit" />
              )}
            </div>
          </div>
        </section>
      </form>
    </>
  );
};

export default SecondStepForm;
