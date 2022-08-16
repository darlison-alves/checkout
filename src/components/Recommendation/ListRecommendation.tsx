import React from 'react';
import { RecommendationProps } from './ListRecommendation.types';

export const ListRecommendation = ({ recommendations }: RecommendationProps) => {
  return (
    <div className="overflow-x-auto relative">      
      <div className="w-full">
        <div className="bg-white shadow-md rounded my-6">          
          <table className="min-w-max w-full table-auto">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Indicação</th>
                <th className="py-3 px-6 text-left">Situação</th>
                <th className="py-3 px-6 text-center">Data</th>
                {/* <th className="py-3 px-6 text-center">Ações</th> */}
              </tr>
            </thead>

            <tbody>

              {
                recommendations?.map(recommendation => (
                  <tr className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6 text-left whitespace-nowrap">
                      <div className="flex items-center">

                        <span className="font-medium">{recommendation.nameIndicado}</span>
                      </div>
                    </td>

                    <td className="py-3 px-6 text-center">
                      <span className="bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs">{recommendation.situacao}</span>
                    </td>

                    <td className="py-3 px-6 text-left">
                      <div className="flex items-center">
                        <span>{recommendation.date}</span>
                      </div>
                    </td>

                    {/* <td className="py-3 px-6 text-center">
                      <div className="flex items-center justify-center">
                        <span>{recommendation.}</span>
                      </div>
                    </td> */}

                  </tr>
                ))
              }

            </tbody>

          </table>
        </div>
      </div>
    </div>
  )
}