import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CardPlan } from "../../components/Card/Card";
import { api } from '../../config/axios.base';
import { getBgColorByPlanId } from '../../config/utils.color';
import { IPlan } from './payload.interface';

export const PlanListPage = () => {

  const [plans, setPlans] = useState(Array<IPlan>)

  const navigate = useNavigate()

  useEffect(() => {
    api().get('/plans').then(res => {
      setPlans(res.data)
    }).catch(err => {
      console.log('err', err)
    })
  }, [])

  return (
    <div className="">
      <div className="md:flex items-stretch py-7 md:shrink-0 w-full">

        {plans.map(plan => {
          const configStyle = getBgColorByPlanId(plan.tag)
          return <CardPlan key={plan.id} onClick={() => { navigate(`/client/plans/${plan.id}`) }} name={plan.name} price={plan.price} id={plan.id} color={configStyle.bg} />
        })}
        {/* <CardPlan onClick={() => { navigate('/checkout/1') }} name="Proteção Compacta" price={9.9} id={1} color="gray-500" darkBgColor="bg-gray-800" />
        <CardPlan onClick={() => { navigate('/checkout/2') }} name="Proteção Compacta" price={9.9} id={2} color="[#0693e3]" />
        <CardPlan onClick={() => { navigate('/checkout/3') }} name="Proteção Compacta" price={9.9} id={3} color="pink-600" />
        <CardPlan onClick={() => { navigate('/checkout/4') }} name="Proteção Compacta" price={9.9} id={4} color="[#ff8228]" />
        <CardPlan onClick={() => { navigate('/checkout/5') }} name="Proteção Compacta" price={9.9} id={5} color="[#009040]" /> */}
      </div>
    </div>
  )
}