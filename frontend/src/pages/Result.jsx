import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state?.result;

  return (
    <div>
      <h2>Hasil Tes Anxiety</h2>
      {result ? (
        <div>
          <p><b>Prediksi:</b> {result.prediction}</p>
          <p><b>Detail:</b> {result.detail}</p>
        </div>
      ) : (
        <p>Belum ada hasil tes.</p>
      )}
      <button onClick={() => navigate("/")}>Kembali ke Home</button>
    </div>
  );
}

export default Result;
