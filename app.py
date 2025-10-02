from flask import Flask, render_template, request, redirect, url_for
import joblib
import pandas as pd
import os
import numpy as np

app = Flask(__name__)

# ✅ Load model
try:
    model_path = "model/random_forest_anxiety_model.pkl"
    if os.path.exists(model_path):
        model = joblib.load(model_path)
        print("✅ Model berhasil dimuat")
        print(f"🎯 Model classes: {model.classes_}")
    else:
        print("❌ Model file tidak ditemukan")
        model = None
except Exception as e:
    print(f"❌ Error loading model: {e}")
    model = None

# ✅ Pastikan urutan kolom sama seperti saat training
EXPECTED_COLS = [
    "Sleep Hours",
    "Physical Activity (hrs/week)",
    "Caffeine Intake (mg/day)",
    "Alcohol Consumption (drinks/week)",
    "Stress Level (1-10)",
    "Heart Rate (bpm)",
    "Breathing Rate (breaths/min)",
    "Smoking_No",
    "Smoking_Yes",
    "Family History of Anxiety_No",
    "Family History of Anxiety_Yes",
    "Recent Major Life Event_No",
    "Recent Major Life Event_Yes"
]

@app.route("/")
def index():
    return redirect(url_for('home'))

@app.route("/home")
def home():
    return render_template("home.html")

@app.route("/predict_page", methods=["GET"])
def predict_page():
    return render_template("predict.html")

@app.route("/predict", methods=["POST"])
def predict():
    try:
        if model is None:
            return "Model tidak tersedia. Silakan coba lagi nanti."
        
        # 📥 Ambil data dari form HTML
        data = {
            'sleep_hours': float(request.form['sleep_hours']),
            'physical_activity': float(request.form['physical_activity']),
            'caffeine': float(request.form['caffeine']),
            'alcohol': float(request.form['alcohol']),
            'stress_level': float(request.form['stress_level']),
            'heart_rate': float(request.form['heart_rate']),
            'breathing_rate': float(request.form['breathing_rate']),
            'smoking': request.form['smoking'],
            'family_history': request.form['family_history'],
            'life_event': request.form['life_event']
        }

        print("📥 Data yang diterima:", data)

        # 🧠 One-hot encoding
        smoking_no = 1 if data['smoking'] == "No" else 0
        smoking_yes = 1 if data['smoking'] == "Yes" else 0
        family_no = 1 if data['family_history'] == "No" else 0
        family_yes = 1 if data['family_history'] == "Yes" else 0
        event_no = 1 if data['life_event'] == "No" else 0
        event_yes = 1 if data['life_event'] == "Yes" else 0

        # 📊 Susun data sesuai kolom
        row = [
            data['sleep_hours'],
            data['physical_activity'],
            data['caffeine'],
            data['alcohol'],
            data['stress_level'],
            data['heart_rate'],
            data['breathing_rate'],
            smoking_no,
            smoking_yes,
            family_no,
            family_yes,
            event_no,
            event_yes
        ]
        
        X = pd.DataFrame([row], columns=EXPECTED_COLS)
        
        print("🔍 Data untuk prediksi:")
        print(X)

        # 🔮 Prediksi
        pred_proba = model.predict_proba(X)[0]
        
        print(f"📊 Probabilitas: {pred_proba}")
        print(f"🏷️ Classes: {model.classes_}")

        # 🎯 AMBIL PERSENTASE ANXIETY SAJA
        if len(pred_proba) == 2:
            anxiety_percent = pred_proba[1] * 100  # Persentase anxiety
        else:
            anxiety_percent = pred_proba[0] * 100

        # 🎯 BOOST SENSITIVITAS BERDASARKAN INPUT
        base_percent = anxiety_percent
        
        # Factor sensitivitas berdasarkan input user
        sensitivity_boost = 0
        
        # Stress Level tinggi → boost persentase
        if data['stress_level'] >= 7:
            sensitivity_boost += 15
        elif data['stress_level'] >= 5:
            sensitivity_boost += 8
            
        # Tidur sedikit → boost persentase  
        if data['sleep_hours'] <= 5:
            sensitivity_boost += 12
        elif data['sleep_hours'] <= 6:
            sensitivity_boost += 6
            
        # Aktivitas fisik rendah → boost persentase
        if data['physical_activity'] <= 2:
            sensitivity_boost += 10
        elif data['physical_activity'] <= 3:
            sensitivity_boost += 5
            
        # Kafein tinggi → boost persentase
        if data['caffeine'] >= 200:
            sensitivity_boost += 8
        elif data['caffeine'] >= 100:
            sensitivity_boost += 4
            
        # Riwayat keluarga → boost persentase
        if data['family_history'] == "Yes":
            sensitivity_boost += 10
            
        # Life event → boost persentase
        if data['life_event'] == "Yes":
            sensitivity_boost += 12

        # Terapkan boost (maksimal +50%)
        final_percent = min(base_percent + sensitivity_boost, 95)
        
        print(f"📈 Base: {base_percent:.1f}% + Boost: {sensitivity_boost}% = Final: {final_percent:.1f}%")

        # Format hasil hanya persentase
        hasil = f"{final_percent:.1f}%"
        
        # Saran berdasarkan persentase akhir
        if final_percent < 25:
            saran = "✅ Kondisi baik. Pertahankan pola hidup sehat."
        elif final_percent < 50:
            saran = "🟡 Perhatikan pola hidup. Disarankan konsultasi lanjutan."
        elif final_percent < 75:
            saran = "🟠 Disarankan konsultasi dengan profesional kesehatan mental."
        else:
            saran = "🔴 Sangat disarankan segera konsultasi dengan psikolog/psikiater."

        return render_template("result.html", 
                             hasil=hasil, 
                             saran=saran,
                             percent=final_percent)

    except Exception as e:
        error_msg = f"Terjadi kesalahan: {str(e)}"
        print("❌ Error:", error_msg)
        return render_template("error.html", error=error_msg)
    
@app.route("/test_model")
def test_model():
    """Route untuk testing model dengan data sample"""
    if model is None:
        return "Model tidak tersedia"
    
    # Data sample yang seharusnya memicu anxiety
    test_data_anxiety = [
        4.5,  # Sleep Hours (sedikit)
        1.0,  # Physical Activity (rendah)
        200,  # Caffeine (tinggi)
        5,    # Alcohol (tinggi)
        9,    # Stress Level (tinggi)
        95,   # Heart Rate (tinggi)
        22,   # Breathing Rate (tinggi)
        0,    # Smoking_No
        1,    # Smoking_Yes
        0,    # Family History_No  
        1,    # Family History_Yes
        0,    # Life Event_No
        1     # Life Event_Yes
    ]
    
    X_test = pd.DataFrame([test_data_anxiety], columns=EXPECTED_COLS)
    pred = model.predict(X_test)[0]
    proba = model.predict_proba(X_test)[0]
    
    return f"""
    <h1>Test Model</h1>
    <p>Prediksi: {pred} (0=Tidak Anxiety, 1=Anxiety)</p>
    <p>Probabilitas: {proba}</p>
    <p>Classes: {model.classes_}</p>
    <a href="/home">Kembali ke Home</a>
    """

if __name__ == "__main__":
    print("🚀 Starting Flask application...")
    app.run(debug=True, host='0.0.0.0', port=5000)