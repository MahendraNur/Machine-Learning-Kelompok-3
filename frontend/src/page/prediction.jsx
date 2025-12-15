// src/components/Prediction.jsx
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './prediction.css';

function Prediction() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); 

  // State data form
  const [formData, setFormData] = useState({
    jam_tidur: "",
    aktivitas_fisik_jam_minggu: "",
    asupan_kafein_mg_hari: "",
    konsumsi_alkohol_gelas_minggu: "",
    tingkat_stres: "",
    detak_jantung_bpm: "",
    laju_pernapasan: "",
    merokok: "",
    riwayat_keluarga_kecemasan: "",
    peristiwa_besar_hidup: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value === "0" || value === "1" ? Number(value) : Number(value),
    });
  };

  // Submit ke backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch("http://localhost:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Gagal menghubungi server");
      }

      const result = await res.json();
      navigate("/result", { state: { prediction: result } });
    } catch (err) {
      console.error("Error:", err);
      setError("⚠ Terjadi kesalahan saat memproses prediksi. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="prediction-container">
      <header className="prediction-header">
        <h1>🧠 Deteksi Tingkat Kecemasan</h1>
        <p>Isi informasi dengan jujur agar hasil lebih akurat</p>
      </header>

      <main className="prediction-main">
        <form onSubmit={handleSubmit} className="prediction-form">
          
          {/* STEP 1 → Input angka */}
          {step === 1 && (
            <div className="form-grid">
              {[
                "jam_tidur",
                "aktivitas_fisik_jam_minggu",
                "asupan_kafein_mg_hari",
                "konsumsi_alkohol_gelas_minggu",
                "tingkat_stres",
                "detak_jantung_bpm",
                "laju_pernapasan",
              ].map((key) => {
                const label = key
                  .replace(/_/g, ' ')
                  .replace(/\b\w/g, l => l.toUpperCase());

                return (
                  <div className="form-group" key={key}>
                    <label>{label}:</label>
                    <input
                      type="number"
                      name={key}
                      value={formData[key]}
                      onChange={handleChange}
                      step={key.includes("jam") ? 0.1 : 1}
                      required
                      placeholder={`Masukkan ${label.toLowerCase()}`}
                    />
                  </div>
                );
              })}

              <button 
                type="button" 
                onClick={() => setStep(2)} 
                className="next-button"
              >
                Lanjut ➝
              </button>
            </div>
          )}

          {/* STEP 2 → Pertanyaan Ya/Tidak */}
          {step === 2 && (
            <div className="form-grid">
              {[
                "merokok",
                "riwayat_keluarga_kecemasan",
                "peristiwa_besar_hidup",
              ].map((key) => {
                const label = key
                  .replace(/_/g, ' ')
                  .replace(/\b\w/g, l => l.toUpperCase());

                return (
                  <div className="form-group" key={key}>
                    <label>{label}:</label>
                    <select 
                      name={key} 
                      value={formData[key]} 
                      onChange={handleChange} 
                      required
                    >
                      <option value="">Pilih</option>
                      <option value={0}>Tidak</option>
                      <option value={1}>Ya</option>
                    </select>
                  </div>
                );
              })}

              <div className="form-buttons">
                <button 
                  type="button" 
                  onClick={() => setStep(1)} 
                  className="back-button"
                >
                  ⬅ Kembali
                </button>

                <button 
                  type="submit" 
                  disabled={isLoading} 
                  className="submit-button"
                >
                  {isLoading ? "Menganalisis..." : "Mulai Analisis"}
                </button>
              </div>
            </div>
          )}
        </form>

        {error && <div className="error-message">{error}</div>}
      </main>
    </div>
  );
}

export default Prediction;
