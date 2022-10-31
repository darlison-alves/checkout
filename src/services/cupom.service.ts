import { api } from "../config/axios.base";
import { InterValEnum } from "../interfaces/enums/interval.enum";

interface IGenerateCode {
  empresaId: number;
  clienteId: number;
  valor: number;
  intervalo: InterValEnum;
  dataFinalCobranca?: string; // MM/AAAA
}

export class CupomService {
  async generateCode(data: IGenerateCode) {
    return api().post('/cupom/generate', data)
  }
}