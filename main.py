from fastapi import FastAPI
import joblib
import pandas as pd

app = FastAPI(
    title="Asthma Prediction API - Kelompok 3",
    description="API untuk prediksi asma berdasarkan dataset klinis",
    version="1.0.0"
)

# load model
model = joblib.load("models/asthma_model.pkl")

@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.post("/predict")
def predict(data: dict):
    df = pd.DataFrame([data])
    prediction = model.predict(df)[0]
    return {"prediction": int(prediction)}