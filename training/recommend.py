def recommend(movie, new_df, similarity, top_n=5):
   
    movie_index = new_df[new_df["title"] == movie].index[0]
    distances = similarity[movie_index]

    movie_list = sorted(list(enumerate(distances)),reverse=True,key=lambda x: x[1])[1: top_n + 1]

    titles = [new_df.iloc[i].title for i, _ in movie_list]
    return titles