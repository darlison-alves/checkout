import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CardPlan } from "../../components/Card/Card";
import { api } from '../../config/axios.base';
import { getBgColorByPlanId } from '../../config/utils.color';
import { IPlan } from './payload.interface';

export const PlanListPage = () => {

  const [plans, setPlans] = useState(Array<IPlan>);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()

  useEffect(() => {
    setLoading(true)
    api().get('/plans').then(res => {
      setPlans(res.data)
    }).catch(err => {
      console.log('err', err)
    }).finally(() => {
      setLoading(false)
    })
  }, [])

  return (
    <div className="">
      <div className="md:flex items-stretch py-7 md:shrink-0 w-full">

        {loading && (<div>loading...</div>)}

        {!loading &&
          plans.map(plan => {
            const style = getBgColorByPlanId(plan.tag)
            return <CardPlan key={plan.id} style={style} onClick={() => { navigate(`/client/plans/${plan.id}`) }} name={plan.name} price={plan.price} id={plan.id} />
          }
          )}
        {/* <CardPlan onClick={() => { navigate('/checkout/1') }} name="Proteção Compacta" price={9.9} id={1} color="pink-600" darkBgColor="bg-gray-800" /> */}
        {/* <CardPlan onClick={() => { navigate('/checkout/2') }} name="Proteção Compacta" price={9.9} id={2} color="[#0693e3]" /> */}
        {/* <CardPlan onClick={() => { navigate('/checkout/3') }} name="Proteção Compacta" price={9.9} id={3} color="pink-600" /> */}
        {/* <CardPlan onClick={() => { navigate('/checkout/4') }} name="Proteção Compacta" price={9.9} id={4} color="[#ff8228]" /> */}
        {/* <CardPlan onClick={() => { navigate('/checkout/5') }} name="Proteção Compacta" price={9.9} id={5} color="[#009040]" />  */}
      </div>
    </div>
  )
}