# Use official Python base image
FROM python:3.11-slim

# Set work directory
WORKDIR /app

# Copy project
COPY . .

# Install dependencies
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Run Alembic migrations & start server
CMD alembic upgrade head && uvicorn app.main:app --host 0.0.0.0 --port 8090
