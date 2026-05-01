import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './prediction.css';

function Prediction() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); 

  const [formData, setFormData] = useState({
    jam_tidur: "", aktivitas_fisik_jam_minggu: "", asupan_kafein_mg_hari: "",
    konsumsi_alkohol_gelas_minggu: "", tingkat_stres: "", detak_jantung_bpm: "",
    laju_pernapasan: "", merokok: "", riwayat_keluarga_kecemasan: "",
    peristiwa_besar_hidup: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value === "0" || value === "1" ? Number(value) : Number(value),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); setError('');
    try {
      const res = await fetch("https://mahen321-anxiety-prediction-ml.hf.space/predict", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Gagal menghubungi server");
      const result = await res.json();
      navigate("/result", { state: { prediction: result } });
    } catch (err) {
      console.error("Detail Error:", err); // Menambahkan ini agar 'err' terpakai
      setError("⚠ Terjadi kesalahan saat memproses prediksi. Pastikan server aktif.");
    } finally {
      setIsLoading(false);
    }
  };

  const renderInput = (key, type = "number", suffix = "") => {
    const label = key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    return (
      <div className="form-group" key={key}>
        <label>{label}</label>
        <div className="input-wrapper">
          <input
            type={type} name={key} value={formData[key]}
            onChange={handleChange} required
            step={key.includes("jam") ? 0.1 : 1}
            placeholder={`Masukkan nilai...`}
          />
          {suffix && <span className="input-suffix">{suffix}</span>}
        </div>
      </div>
    );
  };

  return (
    <div className="prediction-container">
      <div className="bg-glow"></div>
      
      <header className="prediction-header">
        <h1>Formulir Asesmen</h1>
        <p>Data Anda dijamin kerahasiaannya. Isi dengan jujur untuk akurasi maksimal.</p>
        
        <div className="step-indicator">
          <div className={`step ${step >= 1 ? 'active' : ''}`}>1</div>
          <div className={`line ${step >= 2 ? 'active' : ''}`}></div>
          <div className={`step ${step >= 2 ? 'active' : ''}`}>2</div>
        </div>
      </header>

      <main>
        <form onSubmit={handleSubmit} className="prediction-form glass-panel">
          <div className={`form-step-container ${step === 1 ? 'visible' : 'hidden'}`}>
            <h3 className="step-title">Metrik Fisik & Gaya Hidup</h3>
            <div className="form-grid-2">
              {renderInput("jam_tidur", "number", "Jam/Hari")}
              {renderInput("aktivitas_fisik_jam_minggu", "number", "Jam/Minggu")}
              {renderInput("asupan_kafein_mg_hari", "number", "mg/Hari")}
              {renderInput("konsumsi_alkohol_gelas_minggu", "number", "Gelas/Minggu")}
              {renderInput("tingkat_stres", "number", "(1-10)")}
              {renderInput("detak_jantung_bpm", "number", "BPM")}
              {renderInput("laju_pernapasan", "number", "Napas/Menit")}
            </div>
            <div className="form-actions right">
              <button type="button" onClick={() => setStep(2)} className="primary-btn">
                Lanjut ke Tahap 2 <span className="arrow">→</span>
              </button>
            </div>
          </div>

          <div className={`form-step-container ${step === 2 ? 'visible' : 'hidden'}`}>
            <h3 className="step-title">Riwayat & Kondisi Tambahan</h3>
            <div className="form-grid-1">
              {["merokok", "riwayat_keluarga_kecemasan", "peristiwa_besar_hidup"].map((key) => {
                const label = key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                return (
                  <div className="form-group" key={key}>
                    <label>{label}</label>
                    <div className="select-wrapper">
                      <select name={key} value={formData[key]} onChange={handleChange} required>
                        <option value="" disabled>-- Pilih Status --</option>
                        <option value={0}>Tidak</option>
                        <option value={1}>Ya</option>
                      </select>
                    </div>
                  </div>
                );
              })}
            </div>

            {error && <div className="error-alert">{error}</div>}

            <div className="form-actions split">
              <button type="button" onClick={() => setStep(1)} className="secondary-btn">
                ⬅ Kembali
              </button>
              <button type="submit" disabled={isLoading} className="submit-btn primary-btn pulse-hover">
                {isLoading ? (
                  <><span className="spinner"></span> Menganalisis...</>
                ) : (
                  "Analisis Hasil 🧠"
                )}
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}

export default Prediction;