import React, { useEffect, useState } from 'react';
import { ListRecommendation } from '../../components/Recommendation/ListRecommendation';
import { api } from '../../config/axios.base';
import { IRecommendation } from '../../interfaces/recommendation.interface';

export const ListRecommendationView = () => {

  const [recommendations, setRecommendations] = useState<IRecommendation[]>([])
    
  const getRecommendations = () => {
    api().get("/indicacao")
    .then( res => {
      console.log('res.data', res.data)
      setRecommendations(res.data.content)
    }).catch(err => {
      console.log('error', err);
    })
  }

  useEffect(() => {
    getRecommendations()
  }, [])

  return (
    <ListRecommendation recommendations={recommendations} />
  )
}