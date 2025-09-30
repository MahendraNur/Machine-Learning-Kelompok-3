from fastapi import FastAPI
from app.routes import diagnosis

app = FastAPI(
    title="API Diagnosis Asma",
    description="API sederhana untuk memprediksi asma berdasarkan gejala & faktor risiko",
    version="1.0.0"
)

# register router
app.include_router(diagnosis.router, prefix="/diagnosis", tags=["Diagnosis"])

@app.get("/")
def root():
    return {"message": "Selamat datang di API Diagnosis Asma"}
