from fastapi import APIRouter, HTTPException
from dependencies.data_loader import movies, similarity
from dependencies.tmdb import fetch_poster
import time

router = APIRouter()

@router.get("/recommend")
def recommend(movie: str):
    movie_lower = movie.strip().lower()
    match = movies[movies["title_lower"] == movie_lower]
    if match.empty:
        raise HTTPException(status_code=404, detail=f"Movie '{movie}' not found")

    movie_index = match.index[0]
    distances = similarity[movie_index]

    movies_list = sorted(list(enumerate(distances)),reverse=True,key=lambda x: x[1],)[1:6]

    recommended_movies = []
    recommended_posters = []

    for id, score in movies_list:
        row = movies.iloc[id]
        recommended_movies.append(row["title"])
        movie_id = int(row["movie_id"])
        print(movie_id)

        time.sleep(0.5)  # delay for api processing

        poster_url = fetch_poster(movie_id)
        print(poster_url)
        recommended_posters.append(poster_url)

    poster_sorted = sorted(recommended_posters,key=lambda x: (x is None))

    return {
        "selected_movie": match.iloc[0].title,
        "recommendations": recommended_movies,
        "poster_urls": poster_sorted,
    }
