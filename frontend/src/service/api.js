
const API_BASE = import.meta.env.VITE_BASE_API; // Your Api Base

export const movieApi = {
  fetchMovies: async () => {
    const res = await fetch(`${API_BASE}/movies`);

    if (!res.ok) {

      alert("Failed to load or Server instance may be closed")
      throw new Error("Failed to load movie list");
    }
      return res.json();
  },

  fetchRecommendations: async (movieTitle) => {
    const res = await fetch(`${API_BASE}/recommend?movie=${ encodeURIComponent (movieTitle)}` )
    if (!res.ok) {
      const errBody = await res.json().catch(() => (
        {}
      ));

      throw new Error(errBody.detail || "Something went wrong")
    }
    return res.json();
  }
}