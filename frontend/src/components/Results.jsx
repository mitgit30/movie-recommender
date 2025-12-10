import React from "react";
import { MovieCard } from "./MovieCard";

export const Results = ({ data }) => {
  if (!data || !data.recommendations || data.recommendations.length === 0) {
    return null;
  }

  return (
    <div>
      <div>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        
          Recommended for you
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {data.recommendations.map((title, idx) => {
            const posterUrl = data.poster_urls?.[idx] || null;
            return (
              <MovieCard key={`${title}-${idx}`} title={title} posterUrl={posterUrl} />
            )
          })}
        </div>
      </div>
    </div>
  )
}