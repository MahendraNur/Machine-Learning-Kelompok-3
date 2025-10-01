import os
import joblib
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score

# Pastikan folder models ada
os.makedirs("models", exist_ok=True)

# Load dataset
df = pd.read_csv("data_clean.csv")

# Pisahkan fitur dan target
X = df.drop("Diagnosis", axis=1)
y = df["Diagnosis"]

# Split data (80% train, 20% test)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Train model Logistic Regression
model = LogisticRegression(max_iter=1000)
model.fit(X_train, y_train)

# Evaluasi model
y_pred = model.predict(X_test)
acc = accuracy_score(y_test, y_pred)
print(f"✅ Training selesai! Akurasi model: {acc:.2f}")

# Simpan model
joblib.dump(model, "models/asthma_model.pkl")
print("💾 Model berhasil disimpan di: models/asthma_model.pkl")
