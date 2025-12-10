# Base image
FROM python:3.11-slim

# Working Directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y build-essential && rm -rf /var/lib/apt/lists/*

# Copy requirements 
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# copy all items
COPY . .

# Expose FastAPI port
EXPOSE 8000

# Run the app
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
