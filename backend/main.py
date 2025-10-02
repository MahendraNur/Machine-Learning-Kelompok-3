import pandas as pd
import joblib
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="API Prediksi Kecemasan", version="1.0")

# Izinkan CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # untuk dev, semua origin boleh
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model
try:
    model = joblib.load("model.joblib")
except Exception:
    model = None

# Schema input dari React
class InputData(BaseModel):
    jam_tidur: float
    aktivitas_fisik_jam_minggu: float
    asupan_kafein_mg_hari: int
    konsumsi_alkohol_gelas_minggu: int
    merokok: int
    riwayat_keluarga_kecemasan: int
    tingkat_stres: int
    detak_jantung_bpm: int
    laju_pernapasan: int
    peristiwa_besar_hidup: int

@app.post("/predict")
def predict_result(data: InputData):
    if model is None:
        return {"error": "Model tidak dimuat"}

    df = pd.DataFrame([data.dict()])

    prediksi = model.predict(df)[0]
    probabilitas = model.predict_proba(df)[0]
    hasil = "Cemas" if prediksi == 1 else "Tidak Cemas"

    return {
        "prediksi": hasil,
        "label_prediksi": int(prediksi),
        "probabilitas_tidak_cemas": f"{probabilitas[0]*100:.2f}%",
        "probabilitas_cemas": f"{probabilitas[1]*100:.2f}%"
    }
    
