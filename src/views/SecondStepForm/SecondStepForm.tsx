import React, { CSSProperties, useEffect, useState } from "react";
import { StepsTitle } from "../../components/StepsTitle/StepsTitle";
import Cards, { Focused } from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Button } from "../../components/Button/Button";
import { useFirstFormData } from "../../context/FormContext";
import { useNavigate, useParams } from "react-router-dom";

import Swal from "sweetalert2";
import { api } from "../../config/axios.base";
import { IPlan } from "../Subscription/payload.interface";
import { getBgColorByPlanId } from "../../config/utils.color";
import { CardPaymentForm } from "../../components/Forms/Card.Form";
import { ICardInfo, OrderWayEnum } from "../../interfaces/payment.interface";
import { ChoosePaymentMethod } from "./ChoosePaymentMethod";

const SecondStepForm = () => {
  const firstFormData = useFirstFormData();

  const [isPending, setIsPending] = useState(false);
  const [card, setCard] = useState<ICardInfo>({})
  const [orderWay, setOrderWay] = useState<OrderWayEnum>()

  const [plan, setPlan] = useState<IPlan>({ id: 0, name: '', price: 0, tag: '' })
  const [configStyle, setConfigStyle] = useState<CSSProperties>({})

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    api().get('/plans/' + id)
      .then(res => {
        setPlan(res.data)
        setConfigStyle(getBgColorByPlanId(res.data.tag))
      })
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsPending(true);

    // holder: name,
    //       cardNumber: cardNumber,
    //       expirationDate: `${expiry}/${year}`,
    //       securityCode: cvv

    try {
      const data = {
        clientId: firstFormData,
        orderWay,
        card
      };

      const response = await api().post(
        "/payments/plan/pf",
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


  return (
    <>
      <div
        style={configStyle}
        className={`text-white text-4xl max-w-full md:max-w-[830px] w-full mx-auto shadow-sm h-[300px] object-cover`}
      >
        <h4 className="font-semibold p-10" >{plan.name.replace(' ', `\n`)}</h4>
        <hr />
        <div className="pl-10 pt-5 flex items-baseline text-white dark:text-white">
          <hr />
          <span className="text-1xl font-semibold">R$</span>
          <span className="text-6xl font-extrabold tracking-tight">{plan.price.toFixed(2)}</span>
          <span className="ml-1 text-xl font-normal text-white dark:text-white">/mês</span>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white max-w-full md:max-w-[830px] w-full mx-auto mb-10 p-5 overflow-x-hidden rounded-md shadow-sm"
      >
        <StepsTitle step="3" title="Pagamento" />

        <p className="text-base font-light my-3">
          Digite as informações de cobrança para finalizar a assinatura.
        </p>

        <ChoosePaymentMethod onChange={setOrderWay} />
        { orderWay === OrderWayEnum.CC && <CardPaymentForm onChange={(data) => { setCard(old => ({ ...old, ...data })) }} /> }

        <div className="flex w-full mt-3">
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
            <div className="w-full sm:w-[50%]">
              <Button text="FINALIZAR COMPRA" type="submit" />
            </div>
          )}
        </div>
      </form>
    </>
  );
};

export default SecondStepForm;
