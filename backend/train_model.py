import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
import joblib

# 1. Load dataset
df = pd.read_csv("../dataset/enhanced_anxiety_dataset.csv")

# 2. Label target: Anxiety Level (1-10) → kategori
def map_label(x):
    if x <= 2:
        return "Normal"
    elif x <= 4:
        return "Mild"
    elif x <= 7:
        return "Moderate"
    else:
        return "Severe"

df["label"] = df["Anxiety Level (1-10)"].apply(map_label)

# 3. Pilih fitur
X = df.drop(columns=["Anxiety Level (1-10)", "label"])
y = df["label"]

# 4. Encode data kategorikal
encoders = {}
for col in X.select_dtypes(include=["object"]).columns:
    le = LabelEncoder()
    X[col] = le.fit_transform(X[col])
    encoders[col] = le

# 5. Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 6. Train model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# 7. Save model & encoder
joblib.dump(model, "model.pkl")
joblib.dump(encoders, "encoders.pkl")

print("✅ Model trained & saved!")
