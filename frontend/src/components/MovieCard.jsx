import React from "react";

export const MovieCard = ({ title, posterUrl }) => {
  return (
    <div className="group bg-slate-800/40 border border-slate-700/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-300 hover:scale-105 hover:border-emerald-500/30">
      <div className="aspect-[2/3] bg-slate-800 relative overflow-hidden">
        { 
        posterUrl ? 
        (
          <img
            src={posterUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            onError={(e) => {
              e.currentTarget.src =
                "https://via.placeholder.com/500x750/1e293b/64748b?text=No+Poster";
            }}
          />
        ) : (
          <div>
            
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <div className="p-3">
        <p className="text-sm font-medium line-clamp-2 text-slate-200 group-hover:text-emerald-300 transition-colors">
          {title}
        </p>
      </div>
    </div>
  );
};