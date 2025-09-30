# Base image
FROM python:3.10

# Set workdir
WORKDIR /app

# Copy requirements dan install
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy semua file ke container
COPY . .

# Expose port FastAPI
EXPOSE 8000

# Jalankan uvicorn server
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
