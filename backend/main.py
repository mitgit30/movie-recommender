from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import pickle
import requests
import time 
import os

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

movies_dict = pickle.load(open("./movies_dict.pkl", "rb"))
movies = pd.DataFrame(movies_dict)
similarity = pickle.load(open("./similarity.pkl", "rb"))
movies["title_lower"] = movies["title"].str.lower()

TMDB_API_KEY = os.getenv("TMDB_API_KEY",)
TMDB_BASE_URL = "https://api.themoviedb.org/3/movie"
TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w500"

def fetch_poster(movie_id: int):
    try:
        url = f"{TMDB_BASE_URL}/{movie_id}"
        params = {"api_key": TMDB_API_KEY,"language": "en-US",
        }
        resp = requests.get(url, params=params, timeout=5)
        resp.raise_for_status()
        data = resp.json()

        path = data.get("poster_path")
        if not path:
            return None
        return f"{TMDB_IMAGE_BASE}{path}"

    except requests.RequestException as e:
        print(f"TMDB ERROR movie_id={movie_id}: {e}")
        return None

@app.get("/movies")
def movie_list():
    return movies["title"].tolist()


@app.get("/recommend")
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
    for id , score in movies_list:
        row = movies.iloc[id]
        recommended_movies.append(row["title"])
        movie_id = int(row["movie_id"])
        print(movie_id)
        time.sleep(1) # One second time delay for api processing

        poster_url = fetch_poster(movie_id)
        print(poster_url)
        recommended_posters.append(poster_url)

    poster_sorted = sorted(
        recommended_posters,
        key=lambda x: (x is None)
    )

    return {
        "selected_movie": match.iloc[0].title,
        "recommendations": recommended_movies,
        "poster_urls":poster_sorted,
        
    }
