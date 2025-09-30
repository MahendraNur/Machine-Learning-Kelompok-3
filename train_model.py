import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, accuracy_score
import joblib
import os

# === 1. Load dataset ===
DATA_PATH = "backend/app/data/asthma_disease_data.csv"
df = pd.read_csv(DATA_PATH)

# === 2. Drop kolom identitas / sensitif ===
drop_cols = ['PatientID', 'Age', 'Gender', 'Ethnicity', 'EducationLevel', 'DoctorInCharge']
df = df.drop(columns=drop_cols, errors="ignore")

# === 3. Pisahkan fitur & target ===
X = df.drop(columns=["Diagnosis"])
y = df["Diagnosis"]

# === 4. Train-test split ===
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

# === 5. Model Training ===
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# === 6. Evaluasi sederhana ===
y_pred = model.predict(X_test)
print("Akurasi:", accuracy_score(y_test, y_pred))
print("\nLaporan Klasifikasi:\n", classification_report(y_test, y_pred))

# === 7. Simpan model ke file ===
MODEL_PATH = "backend/app/ml/model.pkl"
os.makedirs(os.path.dirname(MODEL_PATH), exist_ok=True)
joblib.dump(model, MODEL_PATH)
print(f"✅ Model berhasil disimpan di {MODEL_PATH}")
