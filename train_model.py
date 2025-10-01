import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.pipeline import Pipeline
from sklearn.metrics import classification_report, confusion_matrix
import joblib

# 1️⃣ Load dataset
df = pd.read_csv("cleaned_anxiety_dataset_encoded.csv")
print("📊 Dataset shape:", df.shape)

# 2️⃣ Buat target yang lebih sensitif
# Ubah threshold menjadi lebih rendah untuk mendeteksi anxiety lebih awal
X = df.drop(columns=["Anxiety Level (1-10)"])
y = (df["Anxiety Level (1-10)"] >= 3).astype(int)  # 🔽 Threshold lebih rendah (dari 4 ke 3)

print("🎯 Target distribution (0=Tidak Anxiety, 1=Anxiety):")
print(y.value_counts())
print("Ratio:", y.value_counts(normalize=True))

# 3️⃣ Berikan weight yang lebih tinggi pada feature penting
# Buat custom class weights yang lebih sensitif
class_weights = {0: 1, 1: 2}  # 🔼 Beri weight lebih tinggi untuk kelas anxiety

# 4️⃣ Buat pipeline dengan parameter yang lebih sensitif
pipeline = Pipeline([
    ("model", RandomForestClassifier(
        n_estimators=150,
        max_depth=12,              # 🔽 Kurangi depth untuk lebih general
        min_samples_split=3,       # 🔽 Lebih sensitif terhadap split
        min_samples_leaf=1,        # 🔽 Lebih sensitif
        max_features='sqrt',       # Gunakan sqrt features
        class_weight=class_weights, # 🔼 Gunakan custom weights
        random_state=42
    ))
])

# 5️⃣ Split data
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

# 6️⃣ Latih model
pipeline.fit(X_train, y_train)

# 7️⃣ Evaluasi model
train_score = pipeline.score(X_train, y_train)
test_score = pipeline.score(X_test, y_test)

print(f"📊 Akurasi training: {train_score:.2%}")
print(f"📊 Akurasi testing: {test_score:.2%}")

# Prediksi dan laporan detail
y_pred = pipeline.predict(X_test)
print("\n📋 Classification Report:")
print(classification_report(y_test, y_pred))

# 8️⃣ Cek feature importance
feature_importance = pd.DataFrame({
    'feature': X.columns,
    'importance': pipeline.named_steps['model'].feature_importances_
}).sort_values('importance', ascending=False)

print("\n🔝 Feature Importance:")
print(feature_importance)

# 9️⃣ Simpan model
joblib.dump(pipeline, "model/random_forest_anxiety_model.pkl")
print("\n✅ Model sensitif berhasil dilatih dan disimpan!")