# Gunakan Python base image
FROM python:3.12-slim

# Set working directory di dalam container
WORKDIR /app

# Copy requirements.txt ke dalam container
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy semua file backend ke container
COPY . .

# Jalankan aplikasi
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
