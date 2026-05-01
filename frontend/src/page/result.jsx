import { Link, useLocation } from "react-router-dom";
import "./result.css";

export default function Result() {
  const location = useLocation();
  const prediction = location.state?.prediction;

  if (!prediction) {
    return (
      <div className="result-container">
        <div className="result-card glass-panel placeholder">
          <div className="placeholder-icon">⚠️</div>
          <h2>Data Tidak Ditemukan</h2>
          <p>Silakan kembali ke halaman utama dan lakukan proses asesmen terlebih dahulu.</p>
          <Link to="/" className="back-button">Mulai Asesmen</Link>
        </div>
      </div>
    );
  }

  const isAnxious = prediction.prediksi === "Cemas";
  const themeClass = isAnxious ? "theme-danger" : "theme-success";

  return (
    <div className={`result-container ${themeClass}`}>
      <div className="bg-glow-result"></div>
      
      <div className={`result-card glass-panel ${themeClass}`}>
        <div className="result-header">
          <span className="result-icon">{isAnxious ? "🧠" : "🌿"}</span>
          <h2>Hasil Analisis Anda</h2>
        </div>

        <div className="prediction-showcase">
          <p>Tingkat Kecemasan Saat Ini:</p>
          <div className="status-badge">
            {prediction.prediksi}
          </div>
          <p className="subtext">Akurasi Label: {prediction.label_prediksi}</p>
        </div>

        <div className="probability-section">
          <h3>Detail Probabilitas</h3>
          
          <div className="prob-item">
            <div className="prob-info">
              <span>Cemas</span>
              <span className="prob-value">{prediction.probabilitas_cemas}</span>
            </div>
            <div className="prob-bar-bg">
              <div 
                className="prob-bar-fill fill-danger" 
                style={{ width: prediction.probabilitas_cemas }}
              ></div>
            </div>
          </div>

          <div className="prob-item">
            <div className="prob-info">
              <span>Tidak Cemas</span>
              <span className="prob-value">{prediction.probabilitas_tidak_cemas}</span>
            </div>
            <div className="prob-bar-bg">
              <div 
                className="prob-bar-fill fill-success" 
                style={{ width: prediction.probabilitas_tidak_cemas }}
              ></div>
            </div>
          </div>
        </div>

        {prediction.faktor_risiko && prediction.faktor_risiko.length > 0 && (
          <div className="risk-factors-container">
            <h3><span className="warn-icon">⚡</span> Faktor Risiko Terdeteksi</h3>
            <ul className="risk-list">
              {prediction.faktor_risiko.map((f, idx) => (
                <li key={idx}><span>{f}</span></li>
              ))}
            </ul>
          </div>
        )}

        <div className="action-footer">
          <Link to="/" className="back-button">Kembali ke Beranda</Link>
        </div>
      </div>
    </div>
  );
}