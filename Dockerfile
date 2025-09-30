FROM python:3.10-slim

WORKDIR /app

# copy requirements.txt
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# copy folder backend/app ke dalam container
COPY backend/app ./app

# copy script training
COPY train_model.py ./train_model.py

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
