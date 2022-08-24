import { OrderWayEnum } from "../interfaces/payment.interface";

export const descriptionPaymentMethod: any = {
  [OrderWayEnum.CC]: 'Cartão de Crédito',
  [OrderWayEnum.CD]: 'Cartão de Débito',
  [OrderWayEnum.BOL]: 'Boleto',
  [OrderWayEnum.PIX]: 'PIX'
}