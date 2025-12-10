import requests
import time
from config import TMDB_API_KEY, TMDB_BASE_URL, TMDB_IMAGE_BASE

def fetch_poster(movie_id: int):
    try:
        # Fetch the Url
        url = f"{TMDB_BASE_URL}/{movie_id}"
        params = { "api_key": TMDB_API_KEY,"language": "en-US", }
        resp = requests.get(url, params=params, timeout=5)
        resp.raise_for_status()
        # Get the JSON response
        data = resp.json()

        # Fetch poster paths
        path = data.get("poster_path")
        if not path:
            return None

        return f"{TMDB_IMAGE_BASE}{path}"

    except requests.RequestException as e:
        print(f"TMDB ERROR movie_id={movie_id}: {e}")
        return None
