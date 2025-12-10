import React from "react";

export const RecommendButton = ({ onClick, loading, disabled }) => {
  return (
    <button
      type="button" onClick={onClick} disabled={disabled} className="w-full px-6 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 disabled:from-slate-700 disabled:to-slate-700 disabled:cursor-not-allowed text-base font-semibold transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-emerald-500/20 disabled:shadow-none flex items-center justify-center gap-2"
    >
      {
      loading ? (
        <>
          <span className="animate-spin text-xl">...</span>
          Finding recommendations...
        </>
      ) : (
        <>

          Get Recommendations
        </>
      )}
    </button>
  )
}