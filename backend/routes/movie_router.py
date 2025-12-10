from fastapi import APIRouter
from dependencies.data_loader import movies

router = APIRouter()

@router.get("/movies")
def movie_list():
    return movies["title"].tolist()
