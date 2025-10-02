import pandas as pd
import joblib
from fastapi import FastAPI, Request, Form
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.templating import Jinja2Templates

app = FastAPI(title="API Prediksi Kecemasan", version="1.0")

# Izinkan CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model
try:
    model = joblib.load("model.joblib")
except Exception:
    model = None

# Template folder
templates = Jinja2Templates(directory="templates")

# Simpan hasil prediksi terakhir
last_result = None

@app.get("/home", response_class=HTMLResponse)
def home(request: Request):
    return templates.TemplateResponse("home.html", {"request": request})

@app.get("/predict", response_class=HTMLResponse)
def predict_form(request: Request):
    return templates.TemplateResponse("predict.html", {"request": request})

@app.post("/predict")
def predict_result(
    request: Request,
    jam_tidur: float = Form(...),
    aktivitas_fisik_jam_minggu: float = Form(...),
    asupan_kafein_mg_hari: int = Form(...),
    konsumsi_alkohol_gelas_minggu: int = Form(...),
    merokok: int = Form(...),
    riwayat_keluarga_kecemasan: int = Form(...),
    tingkat_stres: int = Form(...),
    detak_jantung_bpm: int = Form(...),
    laju_pernapasan: int = Form(...),
    peristiwa_besar_hidup: int = Form(...)
):
    global last_result

    if model is None:
        last_result = {"error": "Model tidak dimuat"}
        return RedirectResponse(url="/result", status_code=303)

    df = pd.DataFrame([{
        "jam_tidur": jam_tidur,
        "aktivitas_fisik_jam_minggu": aktivitas_fisik_jam_minggu,
        "asupan_kafein_mg_hari": asupan_kafein_mg_hari,
        "konsumsi_alkohol_gelas_minggu": konsumsi_alkohol_gelas_minggu,
        "merokok": merokok,
        "riwayat_keluarga_kecemasan": riwayat_keluarga_kecemasan,
        "tingkat_stres": tingkat_stres,
        "detak_jantung_bpm": detak_jantung_bpm,
        "laju_pernapasan": laju_pernapasan,
        "peristiwa_besar_hidup": peristiwa_besar_hidup
    }])

    prediksi = model.predict(df)[0]
    probabilitas = model.predict_proba(df)[0]
    hasil = "Cemas" if prediksi == 1 else "Tidak Cemas"

    last_result = {
        "prediksi": hasil,
        "label_prediksi": int(prediksi),
        "probabilitas_tidak_cemas": f"{probabilitas[0]*100:.2f}%",
        "probabilitas_cemas": f"{probabilitas[1]*100:.2f}%"
    }

    return RedirectResponse(url="/result", status_code=303)

@app.get("/result", response_class=HTMLResponse)
def result(request: Request):
    global last_result
    return templates.TemplateResponse("result.html", {"request": request, "result": last_result})
