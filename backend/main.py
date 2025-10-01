from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import pandas as pd

app = FastAPI()

# Load model & encoder
model = joblib.load("model.pkl")
encoders = joblib.load("encoders.pkl")

class PredictRequest(BaseModel):
    Age: int
    Gender: str
    Occupation: str
    Sleep_Hours: float
    Physical_Activity: float
    Caffeine_Intake: int
    Alcohol_Consumption: int
    Smoking: str
    Family_History: str
    Stress_Level: int
    Heart_Rate: int
    Breathing_Rate: int
    Sweating_Level: int
    Dizziness: str
    Medication: str
    Therapy_Sessions: int
    Life_Event: str
    Diet_Quality: int

@app.get("/home")
def home():
    return {"info": "Tes ini membantu mengenali tingkat kecemasan Anda. Klik 'Mulai Tes' untuk memulai."}

@app.post("/predict")
def predict(data: PredictRequest):
    input_data = data.dict()
    df = pd.DataFrame([input_data])

    # encode kolom kategorikal
    for col in encoders:
        df[col] = encoders[col].transform(df[col])

    pred = model.predict(df)[0]
    return {"hasil": pred}

@app.get("/result")
def result(hasil: str = "Normal"):
    rekomendasi = {
        "Normal": "Anda berada dalam kondisi normal. Tetap jaga pola hidup sehat.",
        "Mild": "Cobalah relaksasi, olahraga, atau meditasi ringan.",
        "Moderate": "Pertimbangkan untuk berkonsultasi dengan konselor atau psikolog.",
        "Severe": "Sebaiknya segera konsultasi dengan profesional kesehatan mental."
    }
    return {"hasil": hasil, "saran": rekomendasi[hasil]}
