import pandas as pd
import joblib
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

    # Inisialisasi aplikasi FastAPI
app = FastAPI(title="API Prediksi Kecemasan", version="1.0")

    # Pengaturan CORS untuk mengizinkan React berkomunikasi dengan API
origins = [
        "http://localhost:3000",
        "http://localhost:5173", # Alamat default server Vite React
    ]
app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # Muat model dari file .joblib
try:
        model = joblib.load('model.joblib')
except Exception:
        model = None

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

    # =============================================================================
    # ENDPOINTS API
    # =============================================================================

@app.get("/")
def read_root():
        """Endpoint dasar untuk memastikan API berjalan."""
        return {"status": "API Prediksi Kecemasan Aktif!"}

@app.get("/health")
def health_check():
        """Endpoint untuk memeriksa status kesehatan layanan."""
        return {"status": "ok", "message": "Layanan berjalan normal."}

@app.get("/model-info")
def get_model_info():
    """Endpoint untuk mendapatkan informasi tentang model."""
    if model is None:
        return {"error": "Model tidak berhasil dimuat."}
    
    return {
        "keterangan": "Model ini dimuat dari file 'model.joblib' saya.", # <-- INI PERUBAHANNYA
        "tipe_model": type(model.named_steps['classifier']).__name__,
        "fitur_input": list(model.feature_names_in_),
        "label_output": {0: "Tidak Cemas", 1: "Cemas"}
    }

@app.post("/predict")
def predict(data: DataInput):
        """Endpoint inti untuk membuat prediksi kecemasan."""
        if model is None:
            return {"error": "Model tidak berhasil dimuat."}

        df = pd.DataFrame([data.dict()])
        prediksi = model.predict(df)
        probabilitas = model.predict_proba(df)
        hasil = "Cemas" if prediksi[0] == 1 else "Tidak Cemas"
        
        return {
            "prediksi": hasil,
            "label_prediksi": int(prediksi[0]),
            "probabilitas_tidak_cemas": f"{probabilitas[0][0]*100:.2f}%",
            "probabilitas_cemas": f"{probabilitas[0][1]*100:.2f}%"
        }