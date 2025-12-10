#  Movie Recommender System (FastAPI + React + AWS)

A complete end-to-end **Movie Recommendation System** that suggests the **top 5 similar movies** based on user selection.  
Built using **FastAPI**, **React (Vite)**, **scikit-learn**, **NLP techniques**, **Docker**, **UV (fast Python package management)**, and deployed on **AWS EC2** + **Vercel**.

---

##  Project Overview

- Trained a recommendation model on **5000 movies** and their details (IMDB).
- Training pipeline is **modularized** with a clean `.ipynb` workflow.
- Applied **basic NLP preprocessing** to clean and process movie metadata.
- Built a **FastAPI backend** to serve recommendations via REST API.
- Created a **React (Vite)** frontend with a dropdown movie selector.
- Backend computes top 5 similar movies using **cosine similarity**.
- **TMDB API** is used to dynamically fetch **high-quality movie posters**.
- Backend tested thoroughly with **Postman**.
- Backend dockerized and deployed using **AWS Elastic Cloud Compute (EC2 Free Tier)**.
- Frontend deployed on **Vercel**.
- Backend packages are managed efficiently using **UV**, improving speed and environment consistency.

---

##  Tech Stack

### **Backend**
- FastAPI  
- scikit-learn (cosine similarity)  
- Basic NLP preprocessing  
- pandas, numpy  
- Uvicorn  
- Docker  
- **UV (ultra-fast Python package manager)**  
- TMDB API (for fetching posters)  
- AWS EC2 Hosting  
- Postman API testing  

### **Frontend**
- React (Vite)  
- Component-based architecture  
- Fetch API for backend communication  

---

##  Recommendation Logic

1. Cleaned movie metadata using basic NLP techniques.  
2. Vectorized dataset using text features.  
3. Generated similarity matrix with **cosine similarity**.  
4. On movie selection:
   - Frontend sends the movie name → backend  
   - Backend finds top 5 similar movies  
   - Poster URLs fetched via **TMDB API**  
   - Frontend displays titles + posters  

---

##  System Flow

```mermaid
flowchart TD
    A[User selects a movie in React UI] --> B[Frontend sends API request to FastAPI]
    B --> C[FastAPI loads similarity model + NLP processed data]
    C --> D[Compute top 5 similar movies]
    D --> E[Fetch posters using TMDB API]
    E --> F[Return titles + poster URLs]
    F --> G[React displays recommendations]
