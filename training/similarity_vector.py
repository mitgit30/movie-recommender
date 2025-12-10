from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity


def build_vectors_and_similarity(new_df, max_features=5000):
    cv = CountVectorizer(max_features=max_features, stop_words="english")
    vectors = cv.fit_transform(new_df["tag"]).toarray()

    similarity = cosine_similarity(vectors)
    return cv, vectors, similarity

# Afterwords dump the similarity with pickle module