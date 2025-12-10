import pandas as pd
import pickle

movies_dict = pickle.load(open("./movies_dict.pkl", "rb"))
movies = pd.DataFrame(movies_dict)

similarity = pickle.load(open("./similarity.pkl", "rb"))

movies["title_lower"] = movies["title"].str.lower()
