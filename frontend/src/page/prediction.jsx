import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './prediction.css';

const FIELDS_STEP1 = [
  {
    key: "jam_tidur", label: "Jam Tidur", suffix: "jam/hari",
    type: "range", min: 1, max: 12, step: 0.5, def: 7,
    title: "Durasi Tidur Harian",
    desc: "Berapa jam rata-rata Anda tidur setiap malam? Tidur optimal orang dewasa adalah 7–9 jam.",
    ex: "Contoh: tidur jam 23.00, bangun jam 06.00 = 7 jam"
  },
  {
    key: "aktivitas_fisik_jam_minggu", label: "Aktivitas Fisik", suffix: "jam/minggu",
    type: "range", min: 0, max: 20, step: 0.5, def: 3,
    title: "Total Olahraga per Minggu",
    desc: "Total jam berolahraga atau bergerak aktif dalam seminggu — jogging, gym, renang, sepeda, dll.",
    ex: "Jogging 30 menit/hari × 5 hari = 2.5 jam/minggu"
  },
  {
    key: "asupan_kafein_mg_hari", label: "Asupan Kafein", suffix: "mg/hari",
    type: "number", def: 100,
    title: "Konsumsi Kafein Harian",
    desc: "Jumlah kafein yang dikonsumsi per hari dalam miligram. Kafein berlebih dapat memicu kecemasan.",
    ex: "Kopi 1 cangkir ≈ 80–120mg | Teh ≈ 30–50mg | Minuman energi ≈ 80–160mg"
  },
  {
    key: "konsumsi_alkohol_gelas_minggu", label: "Konsumsi Alkohol", suffix: "gelas/minggu",
    type: "number", def: 0,
    title: "Konsumsi Alkohol Mingguan",
    desc: "Rata-rata berapa gelas minuman beralkohol per minggu. Isi 0 jika tidak mengonsumsi.",
    ex: "1 gelas = 1 kaleng bir (330ml) atau 1 gelas wine kecil"
  },
  {
    key: "tingkat_stres", label: "Tingkat Stres", suffix: "skala",
    type: "range", min: 1, max: 10, step: 1, def: 5,
    title: "Skala Stres Subyektif",
    desc: "Seberapa stres Anda dalam 2 minggu terakhir? 1 = sangat tenang, 10 = stres berat.",
    ex: "5–6 = tekanan kerja biasa | 8–10 = stres berat/krisis"
  },
  {
    key: "detak_jantung_bpm", label: "Detak Jantung", suffix: "BPM",
    type: "number", def: 72,
    title: "Detak Jantung Istirahat",
    desc: "Detak jantung saat beristirahat. Normal orang dewasa: 60–100 BPM. Ukur pagi hari sebelum aktivitas.",
    ex: "Cara ukur: hitung denyut nadi di pergelangan tangan selama 60 detik"
  },
  {
    key: "laju_pernapasan", label: "Laju Pernapasan", suffix: "napas/menit",
    type: "number", def: 16,
    title: "Frekuensi Napas per Menit",
    desc: "Berapa kali bernapas dalam 1 menit saat istirahat. Normal orang dewasa: 12–20 napas/menit.",
    ex: "Cara ukur: hitung napas masuk+keluar selama 60 detik saat duduk tenang"
  },
];

const FIELDS_STEP2 = [
  {
    key: "merokok", label: "Merokok",
    title: "Status Merokok Aktif",
    desc: "Apakah Anda saat ini adalah perokok aktif? Nikotin dapat memperburuk gejala kecemasan dan meningkatkan detak jantung.",
    ex: "Perokok aktif = merokok minimal 1 batang per hari secara rutin"
  },
  {
    key: "riwayat_keluarga_kecemasan", label: "Riwayat Keluarga Kecemasan",
    title: "Faktor Genetik Kecemasan",
    desc: "Apakah ada anggota keluarga inti (orang tua, saudara kandung) yang didiagnosis gangguan kecemasan?",
    ex: "Riwayat keluarga meningkatkan risiko sekitar 30–40% secara genetik"
  },
  {
    key: "peristiwa_besar_hidup", label: "Peristiwa Besar dalam Hidup",
    title: "Kejadian Hidup Signifikan",
    desc: "Apakah Anda mengalami peristiwa besar dalam 6–12 bulan terakhir yang mengubah hidup Anda?",
    ex: "Kehilangan pekerjaan, perceraian, kehilangan orang tersayang, pindah kota, pernikahan"
  },
];

function TooltipIcon({ field, openId, setOpenId }) {
  const isOpen = openId === field.key;
  return (
    <div className="tooltip-container">
      <button
        type="button"
        className={`info-btn ${isOpen ? 'active' : ''}`}
        onClick={() => setOpenId(isOpen ? null : field.key)}
        aria-label="Info"
      >?</button>
      {isOpen && (
        <div className="tooltip-box">
          <div className="tooltip-title">{field.title}</div>
          <div className="tooltip-desc">{field.desc}</div>
          <div className="tooltip-ex">{field.ex}</div>
        </div>
      )}
    </div>
  );
}

function RangeField({ field, value, onChange, openId, setOpenId }) {
  return (
    <div className="field">
      <div className="field-header">
        <label className="field-label">{field.label}</label>
        <TooltipIcon field={field} openId={openId} setOpenId={setOpenId} />
      </div>
      <div className="range-wrap">
        <div className="range-meta">
          <span className="range-min">{field.min}</span>
          <span className="range-value">{value} <span className="range-suffix">{field.suffix}</span></span>
          <span className="range-max">{field.max}</span>
        </div>
        <input
          type="range" min={field.min} max={field.max} step={field.step}
          value={value}
          onChange={e => onChange(field.key, Number(e.target.value))}
          className="range-input"
        />
        <div className="range-track-labels">
          <span>Min</span>
          <span>Max</span>
        </div>
      </div>
    </div>
  );
}

function NumberField({ field, value, onChange, openId, setOpenId }) {
  return (
    <div className="field">
      <div className="field-header">
        <label className="field-label">{field.label}</label>
        <TooltipIcon field={field} openId={openId} setOpenId={setOpenId} />
      </div>
      <div className="input-wrap">
        <input
          type="number" min={0} value={value}
          placeholder="Masukkan nilai..."
          onChange={e => onChange(field.key, Number(e.target.value))}
          className="num-input"
        />
        <span className="input-suffix">{field.suffix}</span>
      </div>
    </div>
  );
}

function SelectField({ field, value, onChange, openId, setOpenId }) {
  return (
    <div className="field">
      <div className="field-header">
        <label className="field-label">{field.label}</label>
        <TooltipIcon field={field} openId={openId} setOpenId={setOpenId} />
      </div>
      <div className="select-wrap">
        <select
          value={value}
          onChange={e => onChange(field.key, Number(e.target.value))}
          required className="sel-input"
        >
          <option value="" disabled>— Pilih Status —</option>
          <option value={0}>Tidak</option>
          <option value={1}>Ya</option>
        </select>
        <span className="sel-arrow">▼</span>
      </div>
    </div>
  );
}

export default function Prediction() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [openId, setOpenId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    jam_tidur: 7,
    aktivitas_fisik_jam_minggu: 3,
    asupan_kafein_mg_hari: 100,
    konsumsi_alkohol_gelas_minggu: 0,
    tingkat_stres: 5,
    detak_jantung_bpm: 72,
    laju_pernapasan: 16,
    merokok: "",
    riwayat_keluarga_kecemasan: "",
    peristiwa_besar_hidup: "",
  });

  const handleChange = (key, val) => {
    setFormData(prev => ({ ...prev, [key]: val }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const bools = ['merokok', 'riwayat_keluarga_kecemasan', 'peristiwa_besar_hidup'];
    if (bools.some(k => formData[k] === "")) {
      setError("⚠ Harap lengkapi semua pilihan sebelum melanjutkan.");
      return;
    }
    setIsLoading(true); setError('');
    try {
      const res = await fetch("https://mahen321-anxiety-prediction-ml.hf.space/predict", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error();
      const result = await res.json();
      navigate("/result", { state: { prediction: result } });
    } catch (err) {
      console.error("Detail Error:", err); // Menambahkan ini agar 'err' terpakai
      setError("⚠ Terjadi kesalahan saat memproses prediksi. Pastikan server aktif.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pred-container">
      <div className="pred-glow pred-glow-1" />
      <div className="pred-glow pred-glow-2" />

      <div className="pred-inner">
        <header className="pred-header">
          <div className="pred-badge">✦ MindCare</div>
          <h1 className="pred-title">Formulir Asesmen<br /><span className="pred-title-accent">Kecemasan</span></h1>
          <p className="pred-subtitle">Isi data dengan jujur untuk hasil analisis yang akurat. Data Anda sepenuhnya aman dan terenkripsi.</p>

          <div className="stepper">
            <div className={`step-node ${step >= 1 ? 'done' : ''} ${step === 1 ? 'current' : ''}`}>
              <span>1</span>
              <span className="step-node-label">Fisik & Gaya Hidup</span>
            </div>
            <div className={`step-connector ${step >= 2 ? 'done' : ''}`} />
            <div className={`step-node ${step >= 2 ? 'done' : ''} ${step === 2 ? 'current' : ''}`}>
              <span>2</span>
              <span className="step-node-label">Riwayat Kesehatan</span>
            </div>
          </div>

          <div className="progress-bar">
            <div className="progress-fill" style={{ width: step === 1 ? '50%' : '100%' }} />
          </div>
          <div className="progress-label">Langkah {step} dari 2</div>
        </header>

        <form onSubmit={handleSubmit} className="pred-form">

          {/* STEP 1 */}
          {step === 1 && (
            <div className="step-panel animated">
              <div className="step-heading">
                <h3>Metrik Fisik & Gaya Hidup</h3>
                <p>Data ini membantu sistem memahami pola keseharian Anda yang berkaitan dengan kecemasan.</p>
              </div>
              <div className="form-grid-2">
                {FIELDS_STEP1.map(field =>
                  field.type === 'range'
                    ? <RangeField key={field.key} field={field} value={formData[field.key]} onChange={handleChange} openId={openId} setOpenId={setOpenId} />
                    : <NumberField key={field.key} field={field} value={formData[field.key]} onChange={handleChange} openId={openId} setOpenId={setOpenId} />
                )}
              </div>
              <div className="form-actions">
                <button type="button" className="btn-secondary" onClick={() => navigate('/')}>← Beranda</button>
                <button type="button" className="btn-primary" onClick={() => { setStep(2); setOpenId(null); }}>Lanjut ke Tahap 2 →</button>
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="step-panel animated">
              <div className="step-heading">
                <h3>Riwayat & Kondisi Tambahan</h3>
                <p>Informasi ini penting untuk melengkapi analisis berdasarkan faktor risiko personal Anda.</p>
              </div>
              <div className="form-grid-1">
                {FIELDS_STEP2.map(field =>
                  <SelectField key={field.key} field={field} value={formData[field.key]} onChange={handleChange} openId={openId} setOpenId={setOpenId} />
                )}
              </div>
              {error && <div className="error-alert">{error}</div>}
              <div className="form-actions">
                <button type="button" className="btn-secondary" onClick={() => { setStep(1); setOpenId(null); }}>← Kembali</button>
                <button type="submit" disabled={isLoading} className="btn-submit">
                  {isLoading ? <><span className="spinner" /> Menganalisis...</> : 'Analisis Hasil 🧠'}
                </button>
              </div>
            </div>
          )}

        </form>
      </div>
    </div>
  );
}