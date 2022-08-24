export interface IOrder {
  dataPagamento?: string
  dataVencimento?: string
  linhaDigital?: string
  merchantOrderId?: string
  message?: string
  numeroSerie?: string
  orderId?: number;
  paymentId?: string
  recurrent?: false
  recurrentId?: string
  status?: string
  urlBoleto?: string
  userId?: number;
  valor?: number;
}

export interface ISubscriptionUser {
  formaPagamento?: string
  order?:IOrder
  plano?: string
  price?: number
}