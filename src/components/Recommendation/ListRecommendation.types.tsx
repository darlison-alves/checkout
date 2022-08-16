import { IRecommendation } from "../../interfaces/recommendation.interface"

interface IRecommendationList {
  recommendations: Array<IRecommendation>
}

export type RecommendationProps = IRecommendationList