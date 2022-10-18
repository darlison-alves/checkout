export enum BankAccountType {
  CONTA_CORRENTE = 'CC',
  CONTA_POUPANCA = 'PP'
}

export enum BankAccountStatus {
  PENDING  = 'PENDENTE',
  ACTIVE   = 'ATIVA',
  DISABLED = 'DESATIVADA'
}

export interface IBankData {
  id?:number;
  codigoBanco?: string;
  tipo?: BankAccountType;
  agencia?: string;
  digitoAgencia: string;
  conta?: string;
  digitoConta: string
  status?: string
}

export interface IBank {
  codigo?: string;
  nome?: string
}
