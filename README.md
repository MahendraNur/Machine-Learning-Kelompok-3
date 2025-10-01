# Machine-Learning-Kelompok-3

1. Pengertian QA (Quality Assurance)
Quality Assurance (QA) adalah proses untuk menjamin kualitas sistem, aplikasi, atau model machine learning agar sesuai standar yang ditentukan. QA tidak hanya mencari bug, tapi juga memastikan akurasi, keandalan, keamanan, dan konsistensi hasil.
Dalam proyek ML, QA berperan memeriksa kualitas data, kinerja model, serta integrasi API sebelum dipakai pengguna.

2. Pengertian Postman
Postman adalah alat untuk menguji API. Dengan Postman, QA bisa mengirim request (GET, POST, PUT, DELETE) ke server, lalu melihat response berupa data JSON, status code, dan waktu eksekusi.

Fungsinya:
- Menguji apakah API berjalan sesuai spesifikasi.
- Mengecek bagaimana API menangani input benar maupun salah.
- Membuat collection request sebagai dokumentasi pengujian.

3. Pengertian Swagger
Swagger adalah dokumentasi interaktif API yang biasanya dibuat otomatis oleh framework (misalnya FastAPI).
Dengan Swagger, kita bisa:
- Melihat daftar endpoint API yang tersedia.
- Melihat format input/output secara jelas.
- Menguji API langsung dari halaman dokumentasi (tanpa perlu Postman).

Swagger membantu QA memahami alur API tanpa harus membaca kode backend.

4. Black-Box vs White-Box Testing
- Black-Box Testing → metode pengujian yang fokus pada input dan output tanpa melihat isi kode.
Contoh: QA coba kirim data ke API, lalu cek apakah hasil sesuai prediksi yang diharapkan.

- White-Box Testing → metode pengujian dengan mengetahui isi kode program.
Contoh: QA atau developer memeriksa logika di dalam fungsi model atau preprocessing untuk memastikan langkahnya benar.

5. Fungsi QA dalam Proyek ML
- Menjamin kualitas data → memeriksa data bersih, tidak ada error besar.
- Menjamin kualitas model → mengecek apakah metrik evaluasi dihitung dengan benar.
- Menjamin kualitas API → menguji API dengan Postman/Swagger untuk validasi input-output.
- Menjaga reproducibility → memastikan hasil bisa diulang di environment berbeda.
- Membuat laporan bug & feedback → memberikan catatan ke tim agar sistem lebih stabil.
