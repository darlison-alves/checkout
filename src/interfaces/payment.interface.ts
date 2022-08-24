export interface ICardInfo {
  holder?: string;
  cardNumber?: string;
  expirationDate?: string;
  securityCode?: string;
}

export enum OrderWayEnum {
  CC = 'CC',
  BOL = 'BOL',
  CD = 'CD',
  PIX = 'PIX',
  NOT = ''
}
