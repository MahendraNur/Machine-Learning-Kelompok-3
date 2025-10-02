import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"

// Semua gaya (CSS) sekarang ada di dalam file ini
const styles = `
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    background-color: #f4f7f6;
    color: #333;
    margin: 0;
    padding: 20px;
  }
  .container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: white;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  header {
    text-align: center;
    margin-bottom: 30px;
    border-bottom: 1px solid #eee;
    padding-bottom: 20px;
  }
  header h1 { color: #0056b3; }
  .prediction-form { display: flex; flex-direction: column; }
  .form-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    margin-bottom: 20px;
  }
  .form-group label { display: block; font-weight: 600; margin-bottom: 8px; font-size: 0.9em; }
  .form-group input, .form-group select {
    width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 6px;
    box-sizing: border-box; transition: border-color 0.2s;
  }
  .form-group input:focus, .form-group select:focus { border-color: #007bff; outline: none; }
  button {
    padding: 12px 20px; font-size: 1.1em; font-weight: bold; color: white;
    background-color: #007bff; border: none; border-radius: 6px; cursor: pointer;
    transition: background-color 0.2s; align-self: center;
  }
  button:hover:not(:disabled) { background-color: #0056b3; }
  button:disabled { background-color: #cccccc; cursor: not-allowed; }
  .error-message {
    margin-top: 20px; padding: 15px; background-color: #f8d7da;
    color: #721c24; border: 1px solid #f5c6cb; border-radius: 6px; text-align: center;
  }
  .result-card {
    margin-top: 30px; padding: 25px; border-radius: 12px;
    text-align: center; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  }
  .result-card h2 { margin-top: 0; }
  .prediction-text { font-size: 2.5em; font-weight: bold; margin: 10px 0; }
  .cemas { background-color: #fff4f4; border: 1px solid #ffb8b8; }
  .cemas .prediction-text { color: #d93030; }
  .tidak-cemas { background-color: #f6fff4; border: 1px solid #c3e6cb; }
  .tidak-cemas .prediction-text { color: #155724; }
  .probability-details { margin-top: 20px; font-size: 0.95em; color: #555; }
`;

function Prediction() {
  // State untuk menyimpan data dari form
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    jam_tidur: 7.0,
    aktivitas_fisik_jam_minggu: 3.0,
    asupan_kafein_mg_hari: 150,
    konsumsi_alkohol_gelas_minggu: 2,
    merokok: 0,
    riwayat_keluarga_kecemasan: 0,
    tingkat_stres: 4,
    detak_jantung_bpm: 80,
    laju_pernapasan: 18,
    peristiwa_besar_hidup: 0,
  });

  // State lainnya
  const [predictionResult, setPredictionResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Fungsi untuk menangani perubahan pada input form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: Number(value),
    });
  };

  // Fungsi untuk mengirim data ke API saat form disubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setPredictionResult(null);
    setError('');

    try {
      const res = await fetch("http://localhost:8000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      navigate("/result", { state: { prediction: result} })
    }
    catch(err){
      console.error("Error:", err);
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="container">
        <header>
          <h1>Aplikasi Prediksi Kecemasan</h1>
          <p>Masukkan data Anda di bawah ini untuk mendapatkan prediksi dari model Machine Learning.</p>
        </header>
        <main>
          <form onSubmit={handleSubmit} className="prediction-form">
            <div className="form-grid">
              {Object.keys(formData).map((key) => {
                const label = key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                if (['merokok', 'riwayat_keluarga_kecemasan', 'peristiwa_besar_hidup'].includes(key)) {
                  return (
                    <div className="form-group" key={key}>
                      <label>{label}:</label>
                      <select name={key} value={formData[key]} onChange={handleChange}>
                        <option value={0}>Tidak</option>
                        <option value={1}>Ya</option>
                      </select>
                    </div>
                  );
                }
                return (
                  <div className="form-group" key={key}>
                    <label>{label}:</label>
                    <input
                      type="number"
                      name={key}
                      value={formData[key]}
                      onChange={handleChange}
                      step={key.includes('jam_') ? 0.1 : 1}
                      required
                    />
                  </div>
                );
              })}
            </div>
            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Memprediksi...' : 'Dapatkan Prediksi'}
            </button>
          </form>
          {error && <div className="error-message">{error}</div>}
          {predictionResult && (
            <div className={`result-card ${predictionResult.prediksi === 'Cemas' ? 'cemas' : 'tidak-cemas'}`}>
              <h2>Hasil Prediksi</h2>
              <p className="prediction-text">{predictionResult.prediksi}</p>
              <div className="probability-details">
                <p><strong>Probabilitas Cemas:</strong> {predictionResult.probabilitas_cemas}</p>
                <p><strong>Probabilitas Tidak Cemas:</strong> {predictionResult.probabilitas_tidak_cemas}</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
}

export default Prediction;