
# Machine-Learning-Kelompok-3

## 📌 Deskripsi Proyek
Proyek ini bertujuan membangun sistem **Prediksi Tingkat Kecemasan (Anxiety Detection)** berbasis **Machine Learning**. Sistem terdiri dari Backend (FastAPI + ML Model), Frontend (ReactJS), Integrasi melalui API, serta Quality Assurance (QA) & Deployment (Docker).

## 👥 Pembagian Tugas Tim
**Lead / Project Manager** bertugas mengatur timeline proyek, membagi tugas, menggunakan Trello / Jira untuk manajemen, membuat Gantt Chart & Timeline agar progres terkontrol, menjadi penghubung antar tim, serta membuat dokumentasi proyek.  

**Machine Learning Engineer** bertugas melakukan EDA (Exploratory Data Analysis), preprocessing data (handling missing values, encoding, scaling), melatih model ML, mengevaluasi model (Accuracy, Precision, Recall, F1-score, ROC-AUC, PR-AUC), melakukan hyperparameter tuning, dan menyimpan model terlatih dalam format `.joblib` untuk backend. Output utama adalah `model.joblib` yang disimpan di folder backend.  

**Backend Engineer** menggunakan FastAPI, Python, Pandas, Scikit-Learn, dan Joblib untuk membangun API prediksi. Tugasnya membuat endpoint `/predict`, mengatur schema input dengan Pydantic, memuat model ML `model.joblib`, menambahkan CORS Middleware agar frontend dapat mengakses API, serta menyediakan dokumentasi API melalui Swagger. Struktur backend:  
```

backend/
├─ main.py
├─ model.joblib
├─ requirements.txt
├─ Dockerfile
└─ templates/ (opsional)

**Frontend Engineer** menggunakan React (Vite, Fetch API, Tailwind opsional). Tugasnya membangun UI dengan alur: `/home` (penjelasan anxiety + tombol mulai tes), `/predict` (form input data sesuai schema backend), dan `/result` (menampilkan hasil prediksi). Frontend juga bertanggung jawab menghubungkan form ke API backend dan menampilkan hasil user-friendly. Struktur frontend:  
```

frontend/
├─ src/
│   ├─ App.jsx
│   ├─ pages/
│   │   ├─ Home.jsx
│   │   ├─ Predict.jsx
│   │   └─ Result.jsx
├─ package.json
└─ vite.config.js

**QA Engineer** melakukan black-box testing menggunakan Postman dan Swagger, membuat unit test untuk endpoint backend, memastikan input-output API sesuai, dan membuat laporan bug.  

**DevOps Engineer** membuat `Dockerfile` untuk backend (menjalankan FastAPI dengan uvicorn, expose port 8000), serta menjalankan container dengan:  
```bash
docker build -t anxiety-backend .
docker run -d -p 8000:8000 --name anxiety-backend-container anxiety-backend
````

Opsional: membuat `docker-compose.yml` agar backend dan frontend bisa berjalan bersamaan.

## 🚀 Cara Menjalankan Proyek

1. **Jalankan Backend**

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

Akses API di [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

2. **Jalankan Backend via Docker**

bash
cd backend
docker build -t anxiety-backend .
docker run -d -p 8000:8000 anxiety-backend


3. **Jalankan Frontend**

bash
cd frontend
npm install
npm run dev

Akses aplikasi di [http://localhost:5173](http://localhost:5173)

## 📊 Alur Sistem

1. User membuka aplikasi frontend di `/home`.
2. Klik tombol **Mulai Tes** → diarahkan ke `/predict`.
3. User mengisi form input → frontend kirim request ke backend `/predict`.
4. Backend memproses input dengan model ML `model.joblib` dan mengembalikan hasil prediksi.
5. Hasil prediksi ditampilkan di halaman `/result`.
