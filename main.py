from fastapi import FastAPI
from pydantic import BaseModel, validator
import joblib
import numpy as np

app = FastAPI()

# Load model
model = joblib.load("model.pkl")

class PatientData(BaseModel):
    Age: int
    Gender: str   # <- pakai str dulu, bukan int
    BMI: float
    Smoking: int
    Physical_Activity: int
    Sleep_Quality: int
    Pollution_Exposure: int
    Dust_Exposure: int
    Family_History_Asthma: int
    History_of_Allergies: int
    Gastroesophageal_Reflux: int
    Lung_Function_FEV1: float
    Lung_Function_FVC: float
    Wheezing: int
    Shortness_of_Breath: int
    Chest_Tightness: int
    Coughing: int
    Nighttime_Symptoms: int
    Exercise_Induced: int

    @validator("Gender")
    def gender_to_int(cls, v):
        if isinstance(v, str):
            v = v.lower()
            if v in ["male", "m", "1"]:
                return 1
            elif v in ["female", "f", "0"]:
                return 0
            else:
                raise ValueError("Gender must be 'Male' or 'Female'")
        return v

@app.post("/predict")
def predict(data: PatientData):
    features = np.array([[
        data.Age,
        data.Gender,  # sudah dikonversi ke 0/1
        data.BMI,
        data.Smoking,
        data.Physical_Activity,
        data.Sleep_Quality,
        data.Pollution_Exposure,
        data.Dust_Exposure,
        data.Family_History_Asthma,
        data.History_of_Allergies,
        data.Gastroesophageal_Reflux,
        data.Lung_Function_FEV1,
        data.Lung_Function_FVC,
        data.Wheezing,
        data.Shortness_of_Breath,
        data.Chest_Tightness,
        data.Coughing,
        data.Nighttime_Symptoms,
        data.Exercise_Induced
    ]])

    prediction = model.predict(features)
    return {"prediction": int(prediction[0])}
