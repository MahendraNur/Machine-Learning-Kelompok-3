# Gunakan versi Python yang ringan
FROM python:3.10-slim

# Set direktori kerja di dalam container
WORKDIR /app

# Salin file requirements dan install
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Salin seluruh sisa file (main.py dan model.joblib)
COPY . .

# Hugging Face Spaces MENGHARUSKAN aplikasi berjalan di port 7860
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "7860"]