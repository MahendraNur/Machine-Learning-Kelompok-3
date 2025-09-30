from pydantic import BaseModel

# Schema input -> harus sesuai fitur (tanpa PatientID, Age, Gender, dll)
class InputDiagnosis(BaseModel):
    BMI: float
    Smoking: int
    PhysicalActivity: int
    DietQuality: int
    SleepQuality: int
    PollutionExposure: int
    PollenExposure: int
    DustExposure: int
    PetAllergy: int
    FamilyHistoryAsthma: int
    HistoryOfAllergies: int
    Eczema: int
    HayFever: int
    GastroesophagealReflux: int
    LungFunctionFEV1: float
    LungFunctionFVC: float
    Wheezing: int
    ShortnessOfBreath: int
    ChestTightness: int
    Coughing: int
    NighttimeSymptoms: int
    ExerciseInduced: int

class OutputDiagnosis(BaseModel):
    diagnosis: str
    probability: float
