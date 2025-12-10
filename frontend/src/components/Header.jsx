import React from "react";

export const Header = () => {
  return (
    <div className="text-center mb-8">
      <div className="inline-flex items-center gap-3 mb-4">
        <div className="text-5xl">🎬</div>
       <h1 className="font-bold">Movie Recommender</h1>
      </div>
      <p className="text-slate-400 text-lg">
        Discover your next favorite film powered by machine learning
      </p>
    </div>
  )
}