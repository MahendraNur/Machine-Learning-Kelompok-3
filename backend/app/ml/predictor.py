import joblib
import numpy as np
from backend.app.models.schemas import InputDiagnosis

# Load model
MODEL_PATH = "backend/app/ml/model.pkl"
model = joblib.load(MODEL_PATH)

def prediksi_asma(data: InputDiagnosis):
    fitur = np.array([[
        data.BMI,
        data.Smoking,
        data.PhysicalActivity,
        data.DietQuality,
        data.SleepQuality,
        data.PollutionExposure,
        data.PollenExposure,
        data.DustExposure,
        data.PetAllergy,
        data.FamilyHistoryAsthma,
        data.HistoryOfAllergies,
        data.Eczema,
        data.HayFever,
        data.GastroesophagealReflux,
        data.LungFunctionFEV1,
        data.LungFunctionFVC,
        data.Wheezing,
        data.ShortnessOfBreath,
        data.ChestTightness,
        data.Coughing,
        data.NighttimeSymptoms,
        data.ExerciseInduced
    ]])

    pred = model.predict(fitur)[0]
    prob = model.predict_proba(fitur)[0][1]

    return {
        "diagnosis": "Asma" if pred == 1 else "Bukan Asma",
        "probability": float(prob)
    }
