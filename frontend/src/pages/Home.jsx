import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Aplikasi Tes Anxiety</h1>
      <p>Selamat datang! Aplikasi ini membantu mengukur tingkat kecemasan.</p>
      <button onClick={() => navigate("/predict")}>
        Mulai Tes
      </button>
    </div>
  );
}

export default Home;
