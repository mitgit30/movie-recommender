#  Movie Recommender System (FastAPI + React + AWS)

A complete end-to-end **Movie Recommendation System** that suggests the **top 5 similar movies** based on user selection.  
Built using **FastAPI**, **React (Vite)**, **scikit-learn**, **Docker**, and deployed on **AWS EC2** + **Vercel**.

---

##  Project Overview

- Trained a recommendation model on **5000 movies** and their details.  
- Training code was **modularized** and have an  `.ipynb` workflow.  
- Built a **FastAPI backend** to serve recommendations via API.  
- Created a basic  **React frontend** with a dropdown where users pick a movie.  
- Backend computes the top 5 similar movies using **cosine similarity** and returns posters + titles.  
- Frontend displays recommendations in a simple UI.  
- Backend tested with **Postman** before integrating UI.  
- Backend dockerized and deployed on **AWS EC2 (Free Tier)**.  
- Frontend hosted on **Vercel**.

---

##  Tech Stack

### **Backend**
- FastAPI  
- scikit-learn (cosine similarity)  
- pandas, numpy  
- Uvicorn  
- Docker  
- AWS EC2 Hosting  
- Postman API testing

### **Frontend**
- React (Vite)  
- Component-based architecture  
- Fetch API for backend communication  

---

##  Recommendation Logic

1. Cleaned and vectorized movie dataset.  
2. Generated similarity matrix using **cosine similarity**.  
3. On movie selection:
   - Frontend sends the movie name → backend  
   - Backend returns top 5 similar movies  
   - Posters + names shown in UI  

---

##  System Flow

```mermaid
flowchart TD
    A[User selects a movie in React UI] --> B[Frontend sends API request to FastAPI]
    B --> C[FastAPI loads similarity model]
    C --> D[Find top 5 similar movies]
    D --> E[Return titles + poster URLs]
    E --> F[React displays recommendations]
