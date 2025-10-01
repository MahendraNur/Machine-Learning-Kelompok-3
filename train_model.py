import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
import joblib
import os

# Load dataset
df = pd.read_csv("data_clean.csv")

# Fitur (semua kecuali Patient ID dan Diagnosis)
X = df.drop(columns=["Diagnosis"])
y = df["Diagnosis"]

# Bagi data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train model (RandomForest biar kuat)
model = RandomForestClassifier(random_state=42)
model.fit(X_train, y_train)

# Simpan model
os.makedirs("models", exist_ok=True)
joblib.dump(model, "models/asthma_model.pkl")

print("✅ Model saved to models/asthma_model.pkl")
