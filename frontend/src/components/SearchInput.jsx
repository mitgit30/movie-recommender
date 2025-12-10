import React from "react";

export const SearchInput = ({ value, onChange, onFocus, loading }) => {
  return (
    <div className="relative">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl">
        {"-->"}
      </div>
      <input type="text" placeholder="Type movie name..." value={value} onChange={onChange} onFocus={onFocus} disabled={loading} className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-800/50 border border-slate-700/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 text-base transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      />
    </div>
  );
};