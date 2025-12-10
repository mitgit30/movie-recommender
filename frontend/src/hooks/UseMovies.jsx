import { useEffect, useState } from "react";
import { movieApi } from "../service/api";

export const useMovies = () => {
  const [movies,setMovies] = useState([]);
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState("");

  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await movieApi.fetchMovies();
        setMovies(data || []);
      }
       catch (err) {
        setError(err.message || "Could not load movie list");
      } 
      finally {
        setLoading(false);
      }
    };
    loadMovies();
  }, []);

  return { movies, loading, error };
};