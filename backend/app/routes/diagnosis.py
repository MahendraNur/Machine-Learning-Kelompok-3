from fastapi import APIRouter
from backend.app.models.schemas import InputDiagnosis, OutputDiagnosis
from backend.app.ml.predictor import prediksi_asma

router = APIRouter()

@router.post("/", response_model=OutputDiagnosis)
def diagnosis(data: InputDiagnosis):
    hasil_prediksi = prediksi_asma(data)
    return hasil_prediksi
