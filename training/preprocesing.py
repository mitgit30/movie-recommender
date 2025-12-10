
import pandas as pd
from helper_functions import convert
from helper_functions import extract
from helper_functions import fetch_director
movie_csv_path = "../tmdb_5000_movies.csv"
credits_csv_path = "../tmdb_5000_credits.csv"
def load_data(movies_path=movie_csv_path ,credits_path=credits_csv_path):
    movies = pd.read_csv(movies_path)
    credits = pd.read_csv(credits_path)

    movies = movies.merge(credits, on="title")

    # keep only relevant columns
    movies = movies[["movie_id", "title", "overview",
                     "genres", "keywords", "cast", "crew"]]

    # drop missing
    movies.dropna(inplace=True)

    return movies


def preprocess_movies(movies):
    movies["genres"] = movies["genres"].apply(convert)
    movies["keywords"] = movies["keywords"].apply(convert)
    movies["cast"] = movies["cast"].apply(extract)
    movies["crew"] = movies["crew"].apply(fetch_director)

    # tokenize overview
    movies["overview"] = movies["overview"].apply(lambda x: x.split())

    # remove spaces
    movies["genres"] = movies["genres"].apply(lambda x: [i.replace(" ", "") for i in x])
    movies["keywords"] = movies["keywords"].apply(lambda x: [i.replace(" ", "") for i in x])
    movies["cast"] = movies["cast"].apply(lambda x: [i.replace(" ", "") for i in x])
    movies["crew"] = movies["crew"].apply(lambda x: [i.replace(" ", "") for i in x])

    # build tag column and concatinate
    movies["tag"] = (movies["overview"]+ movies["genres"]+ movies["keywords"]+ movies["cast"]+ movies["crew"])

    # new_df 
    new_df = movies[["movie_id", "title", "tag"]]

    # join tokens lowercase, then stem
    new_df["tag"] = new_df["tag"].apply(lambda x: " ".join(x))
    new_df["tag"] = new_df["tag"].apply(lambda x: x.lower())
    new_df["tag"] = new_df["tag"].apply(stem)

    return new_df
