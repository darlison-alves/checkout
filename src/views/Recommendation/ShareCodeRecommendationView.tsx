import React, { useEffect, useState } from "react";
import { ShareCodeRecommendation } from "../../components/Recommendation/ShareCodeRecommendation";
import { useGetInfoUser } from "../../hooks/useGetInfoUser";

export const ShareCodeRecommendationView = () => {
  const { user } = useGetInfoUser()

  const [codeRecommendation, setCodeRecommendation] = useState('')

  useEffect(() => {
    setCodeRecommendation(user.codeRecommendation)
  }, [user])

  return <ShareCodeRecommendation codeRecommendation={codeRecommendation} userId={user.id} />
}