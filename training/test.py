
from preprocesing import load_data
from preprocesing import preprocess_movies
from similarity_vector import build_vectors_and_similarity
from recommend import recommend



if __name__ == "__main__":
    # load raw data
    movies = load_data()
   
    new_df = preprocess_movies(movies)
  
    cv, vectors, similarity = build_vectors_and_similarity(new_df)


    # manual test 
    sample_movie = "Batman"
    try:
        rec = recommend(sample_movie, new_df, similarity)
        print(f"Recommendations for '{sample_movie}'")
        for title in rec:
            print(title)
    except Exception as e:
        print(f"Movie '{sample_movie}' not found in dataset.",e)