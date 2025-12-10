import React, { useMemo, useState, useCallback } from "react";
import { useMovies } from "./hooks/UseMovies";
import { movieApi } from "./service/api";
import { Header } from "./components/Header";
import { SearchInput } from "./components/SearchInput";
import { MovieDropdown } from "./components/MovieDropdown";
import { RecommendButton } from "./components/RecommendButton";
import { Results } from "./components/Results";

function App() {
  const { movies, loading: moviesLoading, error: moviesError } = useMovies();

  const [filter, setFilter] = useState("");
  const [selectedMovie,setSelectedMovie] = useState("");
  const [showDropdown,setShowDropdown] = useState(false);

  const [data,setData] = useState(null);
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState("");

// For optimaztion
  const filteredMovies = useMemo(() => {
    const q = filter.trim().toLowerCase();
    if (!q)
      {
          return movies.slice(0, 50);
      } 
    return movies.filter( (title) => title.toLowerCase().includes(q)).slice(0, 50);
  }, 
  [movies, filter]
);

// useCallback for avoiding recurrent calling of an component
  const handleRecommend = useCallback(async () => {
    setError("");
    setData(null);

    const movieToUse = selectedMovie || filter.trim();
    if (!movieToUse) {
      setError("Please select a movie first.");
      return;
    }

    setLoading(true);
    try {
      const json = await movieApi.fetchRecommendations(movieToUse);
      setData(json);
      setShowDropdown(false);
    } 
    catch (err) {
      setError(err.message || "Failed to fetch recommendations");
      alert("Unexpected error or server instance may be not running")
    } 
    finally {
      setLoading(false);
    }
  }, [selectedMovie, filter]);

  const selectMovie = useCallback((title) => {
    setSelectedMovie(title);
    setFilter(title);
    setShowDropdown(false);
  }, []);

  const hasResults = data?.recommendations?.length > 0;

  return (
    <div className="fixed inset-0 bg-slate-600 text-slate-100 overflow-auto">

      <div className="relative flex items-center justify-center min-h-full px-4 py-8">
        <div className="w-full max-w-6xl">
          <Header />

          
          <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/50 rounded-3xl shadow-2xl p-6 md:p-8">
           
            <div className="mb-8">
              <div className="space-y-4">
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Search for a movie
                </label>

                <div className="relative">
                  <SearchInput value={filter} onChange={(e) => { setFilter(e.target.value); setSelectedMovie(""); setShowDropdown(true);}} onFocus={() => setShowDropdown(true)} loading={moviesLoading}
 />
                  {
                  showDropdown && !moviesLoading && (
                    <MovieDropdown movies={filteredMovies} selectedMovie={selectedMovie} onSelect={selectMovie}/>
                  )
                  }
                </div>
                {
                moviesLoading && (
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    Loading movie database...
                  </div>
                )
                }

                {
                moviesError && (
                  <div className="flex items-center gap-2 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                    {
                      alert("Unexpected error or server instance may be not running")
                  
                  }
                  </div>
                )
                }

                { 
                selectedMovie && (
                  <div className="flex items-center gap-2 text-sm text-emerald-400 bg-emerald-500/10 rounded-xl px-4 py-2 border border-emerald-500/20">
                    <span>Selected: <strong>{selectedMovie}</strong></span>
                  </div>
                )
                 }

                <RecommendButton onClick={handleRecommend} loading={loading} disabled={loading || moviesLoading || !filter.trim()}/>
              </div>
            </div>

       
            {
             !loading && !error && !hasResults && (
              <div className="text-center py-12">
                <p className="text-slate-400 text-lg">
                  Select a movie above to discover similar films
                </p>
              </div>
            )}

            
            <Results data={data} />
          </div>

        
          <p className="mt-6 text-l text-center text-slate-100">
            Built with FastAPI, Scikit-learn & React-tailwind
          </p>
        </div>
      </div>
    </div>
  );
}

export default App