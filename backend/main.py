import pandas as pd
import joblib
from fastapi import FastAPI
from pydantic import BaseModel

# Initialize the FastAPI application
# Inisialisasi aplikasi FastAPI
app = FastAPI(title="API Prediksi Kecemasan")

# Load the model from the .joblib file
# Muat model dari file .joblib
try:
    model = joblib.load('model.joblib')
    print("INFO:     Model successfully loaded from 'model.joblib'")
except FileNotFoundError:
    print("ERROR:    File 'model.joblib' not found. Make sure it's in the same directory.")
    model = None
except Exception as e:
    print(f"ERROR:    An error occurred while loading the model: {e}")
    model = None

# Define the data input format using Pydantic
# Tentukan format input data
class DataInput(BaseModel):
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

# Create the prediction endpoint
# Buat endpoint untuk prediksi
@app.post("/predict")
def predict(data: DataInput):
    if model is None:
        return {"error": "Model could not be loaded. Please check the server logs."}

    # Convert input data to a DataFrame
    # Ubah data input menjadi DataFrame
    df = pd.DataFrame([data.dict()])
    
    # Make prediction and get probabilities
    # Buat prediksi dan dapatkan probabilitas
    prediksi = model.predict(df)
    probabilitas = model.predict_proba(df)
    hasil = "Cemas" if prediksi[0] == 1 else "Tidak Cemas"
    
    # Return the result
    # Kembalikan hasilnya
    return {
        "prediksi": hasil,
        "label_prediksi": int(prediksi[0]),
        "probabilitas_tidak_cemas": f"{probabilitas[0][0]*100:.2f}%",
        "probabilitas_cemas": f"{probabilitas[0][1]*100:.2f}%"
    }

# Root endpoint to check if the API is active
# Endpoint dasar untuk memeriksa apakah API aktif
@app.get("/")
def read_root():
    return {"status": "API is active!"}