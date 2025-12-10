import React from "react";

export const MovieDropdown = ({ movies, selectedMovie, onSelect }) => {
  if (movies.length === 0) return null

  return (
    <div className="absolute z-10 w-full mt-2 max-h-80 overflow-y-auto rounded-2xl border border-slate-700/50 bg-slate-800/95 backdrop-blur-xl shadow-2xl">
      {movies.map((title, idx) => {
        const isSelected = title === selectedMovie;
        return (
          <button key={`${title}-${idx}`} type="button" onClick={() => onSelect(title)} className={`w-full text-left px-5 py-3 text-sm border-b border-slate-700/30 last:border-b-0 transition-all ${
              isSelected ? "bg-emerald-500/20 text-emerald-300" : "text-slate-200 hover:bg-slate-700/50"
            }`} >
            <span className="inline-block mr-2 opacity-50">{"-->"}</span>
            {title}
          </button>
        )
      })}
    </div>
  );
};