import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Predict() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nama: "",
    umur: "",
    q1: "",
    q2: "",
    q3: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/predict", form);
      navigate("/result", { state: { result: res.data } });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Isi Tes Anxiety</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="nama" placeholder="Nama (opsional)" onChange={handleChange} /><br/>
        <input type="number" name="umur" placeholder="Umur (opsional)" onChange={handleChange} /><br/>
        <label>Pertanyaan 1</label>
        <input type="text" name="q1" onChange={handleChange} /><br/>
        <label>Pertanyaan 2</label>
        <input type="text" name="q2" onChange={handleChange} /><br/>
        <label>Pertanyaan 3</label>
        <input type="text" name="q3" onChange={handleChange} /><br/>
        <button type="submit">Kirim</button>
      </form>
    </div>
  );
}

export default Predict;
