import { Link, useLocation } from "react-router-dom";
import "./result.css";

export default function Result() {
  const location = useLocation();
  const prediction = location.state?.prediction;

  if (!prediction) {
    return (
      <div className="result-container">
        <div className="result-card placeholder">
          <h2>⚠️ Tidak ada data hasil analisis</h2>
          <p>Silakan kembali ke halaman utama dan lakukan prediksi terlebih dahulu.</p>
          <Link to="/" className="back-button">⬅ Kembali</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="result-container">
      <div className={`result-card ${prediction.prediksi === "Cemas" ? "cemas" : "tidak-cemas"}`}>
        <h2>📊 Hasil Analisis</h2>

        <p className="prediction-label">
          Tingkat Kecemasan:{" "}
          <span className={`highlight ${prediction.prediksi === "Cemas" ? "cemas" : "tidak-cemas"}`}>
            {prediction.prediksi}
          </span>
        </p>

        <div className="probability-box">
          <p><strong>Probabilitas Cemas:</strong> {prediction.probabilitas_cemas}</p>
          <p><strong>Probabilitas Tidak Cemas:</strong> {prediction.probabilitas_tidak_cemas}</p>
        </div>

        <p className="subtext">(*Label prediksi: {prediction.label_prediksi})</p>

        {/* Faktor risiko */}
        {prediction.faktor_risiko && prediction.faktor_risiko.length > 0 && (
          <div className="risk-factors">
            <h3>⚠️ Faktor Risiko yang Terdeteksi</h3>
            <ul>
              {prediction.faktor_risiko.map((f, idx) => (
                <li key={idx}>{f}</li>
              ))}
            </ul>
          </div>
        )}

        <Link to="/" className="back-button">⬅ Kembali</Link>
      </div>
    </div>
  );
}
