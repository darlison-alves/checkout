import { CSSProperties } from "react"

export const getBgColorByPlanId = (tag: any): CSSProperties => {
  console.log('plan.tag', tag)
  switch (tag) {
    case "PROTECAO_COMPACTA":
      return {
        // b: '[#54595F]'
        backgroundColor: '#54595F'
      }
    case "PROTECAO_ESPECIAL":

      return {
        // bg: '[#0693e3]'
        backgroundColor: '#0693e3'
      }
    case "PROTECAO_ESSENCIAL":
      return {
        // bg: 'pink-600'
        backgroundColor: '#ec1c8a'
      }
    case "PROTECAO_FAMILIAR_GOLD":
      return {
        // bg: '[#ff8228]'
        backgroundColor: '#ff8228'
      }
    case "PROTECAO_FAMILIAR_PREMIUM":
      return {
        // bg: '[#009040]'
        backgroundColor: '#009040'
      }
    default:
      return {
        // bg: '[#54595F]'
        backgroundColor: '#54595F'
      }
  }
}