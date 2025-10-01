# Machine-Learning-Kelompok-3

## 1. Pengertian Project Manager
Project Manager (PM) adalah orang yang bertanggung jawab penuh terhadap perencanaan, pelaksanaan, dan pengendalian proyek agar berjalan sesuai tujuan, waktu, dan kualitas yang ditentukan.
Dalam proyek machine learning, PM berperan sebagai pengatur jalannya tim: memastikan data, model, QA, dan deployment berjalan terkoordinasi.

## 2. Pengertian Trello / Jira (Alat Manajemen Proyek)
Trello → aplikasi manajemen proyek berbasis papan (board) yang menggunakan konsep kanban (To Do, In Progress, Done).
Jira → alat manajemen proyek yang lebih kompleks, biasanya dipakai untuk agile/scrum dengan fitur sprint, backlog, dan bug tracking.
Fungsi utama alat ini untuk PM:
Membagi tugas ke anggota tim.
Memantau progres pekerjaan.
Mencatat deadline dan prioritas tugas.
Menyediakan transparansi pekerjaan antar anggota tim.

## 3. Pengertian Gantt Chart & Timeline
Gantt Chart → grafik batang yang menggambarkan jadwal proyek dari awal hingga akhir, siapa mengerjakan apa, dan kapan selesai.
Timeline → alur waktu keseluruhan proyek agar tidak melenceng dari target.
PM menggunakan ini untuk mengontrol apakah proyek on track atau ada keterlambatan.

## 4. Leadership & Communication dalam Proyek
Leadership → kemampuan PM mengarahkan tim, mengambil keputusan, dan menyelesaikan konflik.
Communication → kemampuan berkoordinasi dengan seluruh anggota tim agar tidak ada miskomunikasi.4. Leadership & Communication dalam Proyek
Leadership → kemampuan PM mengarahkan tim, mengambil keputusan, dan menyelesaikan konflik.
Communication → kemampuan berkoordinasi dengan seluruh anggota tim agar tidak ada miskomunikasi.

## 5. Fungsi Project Manager dalam Proyek ML
- Membagi tugas → menentukan siapa bertanggung jawab di bagian data, modeling, QA, dan deployment.
- Membuat timeline → menetapkan target mingguan agar proyek selesai tepat waktu.
- Monitoring → memantau progres tim lewat Trello/Jira atau laporan harian.
- Koordinasi → menjadi penghubung antar bagian, termasuk dengan dosen/pembimbing.
- Decision Making → mengambil keputusan jika ada kendala teknis atau konflik antar anggota.
- Dokumentasi → memastikan semua hasil tercatat rapi untuk laporan akhir.



## 1. Pengertian Machine Learning Engineer
Machine Learning Engineer adalah anggota tim yang bertugas untuk membangun, melatih, mengevaluasi, dan mengoptimalkan model machine learning agar bisa digunakan dalam aplikasi.
Dalam proyek kampus, bagian ini bertanggung jawab mulai dari pemrosesan data → training model → evaluasi → menyajikan model dalam bentuk siap dipakai API.

## 2. Konsep Penting yang Harus Dikuasai
- EDA (Exploratory Data Analysis) → analisis data awal untuk memahami distribusi, pola, outlier, dan masalah data.
- Data Preprocessing → mencakup encoding (label / one-hot), scaling (standardisasi, normalisasi), handling missing values.
- Split Data → membagi dataset jadi training, validation, dan testing (sering dengan stratified split untuk data imbalance).
- Algoritma ML → regresi, klasifikasi, clustering, decision tree, random forest, SVM, neural network dasar.

## 3. Evaluasi Model
- Confusion Matrix → matriks perbandingan prediksi vs aktual.
- Metrik Utama:
Accuracy → proporsi prediksi benar.
Precision → seberapa tepat prediksi positif.
Recall → seberapa banyak positif terdeteksi.
F1 Score → harmonisasi precision & recall.
ROC-AUC & PR-AUC → menilai performa model pada berbagai threshold.
- Cross Validation → evaluasi lebih adil dengan membagi data jadi beberapa lipatan.

## 4. Optimisasi Model
- Hyperparameter Tuning → Grid Search, Random Search, atau Bayesian Optimization untuk mencari parameter terbaik.
- Regularisasi → mencegah overfitting (misalnya L1, L2, dropout pada neural network).
- Feature Selection → memilih fitur yang relevan agar model lebih sederhana dan efisien.

## 5. Fungsi Machine Learning Engineer dalam Proyek
- Mengolah data → melakukan preprocessing agar data siap dipakai model.
- Membangun model → memilih algoritma yang sesuai dengan jenis data & tujuan.
- Evaluasi model → menghitung metrik (accuracy, precision, recall, F1, AUC).
- Optimisasi model → melakukan hyperparameter tuning agar performa maksimal.
- Membuat model siap deployment → menyimpan model (pickle/joblib/h5) agar bisa dipakai di API.
- Dokumentasi hasil → mencatat performa model, kelemahan, dan rekomendasi.



## 1. Pengertian Backend Engineer
Backend Engineer adalah anggota tim yang bertugas membangun server, API, dan integrasi model machine learning ke dalam sistem.
Mereka memastikan model yang sudah dibuat oleh tim Machine Learning bisa dipakai oleh aplikasi (web, mobile, atau pihak lain) dengan cara menyediakan endpoint yang aman, cepat, dan dapat diakses.

## 2. Konsep Penting yang Harus Dikuasai
- REST API → arsitektur API berbasis HTTP (method: GET, POST, PUT, DELETE).
- Flask / FastAPI / Django → framework populer untuk membuat backend di Python.
- JSON (JavaScript Object Notation) → format standar pertukaran data antara client dan server.
- Serialization → menyimpan dan memuat model (pickle, joblib, h5) agar bisa dipanggil lewat API.
- Middleware & Routing → mengatur jalur (endpoint) untuk setiap request client.
- Error Handling → mengelola input yang salah atau request yang tidak valid.
- Deployment Dasar → cara menjalankan API di server lokal maupun cloud.

## 3. Tools untuk Testing & Dokumentasi API
- Postman → testing API secara manual (input/output, validasi error).
- Swagger (OpenAPI) → dokumentasi interaktif untuk mencoba API langsung di browser.

## 4. Fungsi Backend Engineer dalam Proyek ML
- Membangun API → menghubungkan model ML dengan client.
- Integrasi Model → memanggil model yang sudah dilatih dan menyajikan prediksi lewat endpoint.
- Membuat Dokumentasi API → menyediakan Swagger/OpenAPI agar tim lain bisa mudah paham format request/response.
- Menangani Request & Response → memastikan input valid, output sesuai, dan error tertangani.
- Keamanan Dasar → membatasi akses (misalnya dengan token/API key).
- Kolaborasi → menjadi penghubung antara Machine Learning Engineer, QA, dan tim frontend/aplikasi.

## 5. Contoh Alur Backend untuk Proyek ML
- Client (web/mobile) → kirim data (misal fitur rumah: luas, kamar, lokasi).
- API Backend (Flask/FastAPI) → menerima data → memanggil model ML → menghasilkan prediksi.
- Response → API mengirim hasil prediksi dalam format JSON.



## 1. Pengertian Frontend Engineer
Frontend Engineer adalah anggota tim yang bertugas membangun antarmuka (UI/UX) aplikasi sehingga pengguna bisa berinteraksi dengan sistem dan model machine learning dengan mudah.
Frontend memastikan data dari user dikirim ke backend/API, lalu hasil prediksi ditampilkan dengan cara yang jelas, rapi, dan user-friendly.

## 2. Konsep Penting yang Harus Dikuasai
- HTML, CSS, JavaScript → fondasi dasar pembuatan tampilan web.
- Framework Frontend → React, Vue, atau Angular (opsional, tergantung kebutuhan).
- Responsive Design → tampilan bisa menyesuaikan di laptop maupun smartphone.
- UX (User Experience) → alur penggunaan yang mudah dimengerti.
- Integrasi API → fetch/axios untuk mengambil data dari backend.
- Form Handling → mengatur input pengguna (misalnya form prediksi).
- Error Handling UI → menampilkan pesan jika ada kesalahan dari backend.

## 3. Tools Pendukung
- Bootstrap / Tailwind CSS → mempercepat desain UI.
- Axios / Fetch API → untuk komunikasi dengan backend.
- Figma / Canva → merancang wireframe atau mockup tampilan.

## 4. Fungsi Frontend Engineer dalam Proyek ML
- Membangun UI/UX → membuat tampilan aplikasi yang menarik dan mudah digunakan.
- Menghubungkan ke API Backend → mengirim input dari user ke backend dan menampilkan hasil prediksi.
- Membuat Form Input → agar user bisa memasukkan data sesuai format model ML.
- Menyajikan Output → menampilkan hasil prediksi dalam bentuk teks, grafik, atau tabel.
- Validasi Input → memberi peringatan kalau data user tidak sesuai format.
- Kolaborasi → bekerja sama dengan tim backend dan QA untuk memastikan alur aplikasi berjalan lancar.

## 5. Contoh Alur Frontend untuk Proyek ML
- User → mengisi form (misalnya luas rumah, jumlah kamar, lokasi).
- Frontend → mengirim data ke backend API dengan fetch/axios.
- Backend → memproses data dengan model ML dan mengirim prediksi.
- Frontend → menampilkan hasil prediksi di layar dengan desain yang jelas.



## 1. Pengertian QA (Quality Assurance)
Quality Assurance (QA) adalah proses untuk menjamin kualitas sistem, aplikasi, atau model machine learning agar sesuai standar yang ditentukan. QA tidak hanya mencari bug, tapi juga memastikan akurasi, keandalan, keamanan, dan konsistensi hasil.
Dalam proyek ML, QA berperan memeriksa kualitas data, kinerja model, serta integrasi API sebelum dipakai pengguna.

## 2. Pengertian Postman
Postman adalah alat untuk menguji API. Dengan Postman, QA bisa mengirim request (GET, POST, PUT, DELETE) ke server, lalu melihat response berupa data JSON, status code, dan waktu eksekusi.

Fungsinya:
- Menguji apakah API berjalan sesuai spesifikasi.
- Mengecek bagaimana API menangani input benar maupun salah.
- Membuat collection request sebagai dokumentasi pengujian.

## 3. Pengertian Swagger
Swagger adalah dokumentasi interaktif API yang biasanya dibuat otomatis oleh framework (misalnya FastAPI).
Dengan Swagger, kita bisa:
- Melihat daftar endpoint API yang tersedia.
- Melihat format input/output secara jelas.
- Menguji API langsung dari halaman dokumentasi (tanpa perlu Postman).

Swagger membantu QA memahami alur API tanpa harus membaca kode backend.

## 4. Black-Box vs White-Box Testing
- Black-Box Testing → metode pengujian yang fokus pada input dan output tanpa melihat isi kode.
Contoh: QA coba kirim data ke API, lalu cek apakah hasil sesuai prediksi yang diharapkan.

- White-Box Testing → metode pengujian dengan mengetahui isi kode program.
Contoh: QA atau developer memeriksa logika di dalam fungsi model atau preprocessing untuk memastikan langkahnya benar.

## 5. Fungsi QA dalam Proyek ML
- Menjamin kualitas data → memeriksa data bersih, tidak ada error besar.
- Menjamin kualitas model → mengecek apakah metrik evaluasi dihitung dengan benar.
- Menjamin kualitas API → menguji API dengan Postman/Swagger untuk validasi input-output.
- Menjaga reproducibility → memastikan hasil bisa diulang di environment berbeda.
- Membuat laporan bug & feedback → memberikan catatan ke tim agar sistem lebih stabil.
