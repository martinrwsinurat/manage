## ERD
![Database ERD - Management System](https://github.com/user-attachments/assets/61547a7d-c56e-4480-ae7c-263e16c379b9)
Entity Relationship Diagram untuk sistem management ini menunjukkan hubungan antar tabel dalam database.
### Komponen Database:
- **Users**: Manajemen pengguna sistem
- **Products/Items**: Data produk atau item yang dikelola
- **Categories**: Kategori untuk organisasi data
- **Transactions**: Pencatatan transaksi
---
## Flowchart
![Database ERD - Management System](![pemweb lanjut1 2 drawio](https://github.com/user-attachments/assets/e4943cf2-0463-40b0-96a3-3393b61ed72c))
## Berikut penjelasan singkat diagram alur sistem Kanban Board:
Frontend (React):
User Browser - Antarmuka pengguna

React State Management - Mengelola state aplikasi (useState/Context)

API Request - Mengirim permintaan ke backend (Axios/Fetch)

Backend (Laravel):

Routes - Menentukan endpoint API (api.php/web.php)

Middleware - Autentikasi JWT

Controller - Logika bisnis (TaskController)

Request Validation - Validasi input

Model - Interaksi database (Task, User)

Alur Data:
Frontend mengirim request → Backend memproses → Mengembalikan response JSON → Frontend menampilkan update

Database:

Penyimpanan data tasks dan user

Sistem ini menggunakan arsitektur modern dengan:

React untuk UI dinamis

Laravel sebagai API server

JWT untuk keamanan

Axios/Fetch untuk komunikasi client-server

---
Cara Deployment Project
1. lakukan git clone https://github.com/martinrwsinurat/manage.git untuk menyalin projek dari github saya.
2. buka laragon dan jalankan,lalu buka terminal.
3. masuk ke folder di www lalau cd manage
4. install depedencis dengan memasukan perintah composer install
5. lalu jangan lupa intsall npm juga.
6. Masukan perintah cp .env.example .env
7. lalu buat database baru sesuai dengan di DB_DATABASE=uasmaster (nama database yang harus dibuat)
8. lakukan perintah php artisan key:generate untuk membuat kunnci
9. php artisan migrate untuk mengirim data tabel database
10. php artisan db:seed untuk mengirim data dari isi tabel jika tidak masuk kedatabase
11.  untuk mendapatkan performa yang baik di laravel bisa dimasukkan perintah sebagai berikut:php artisan config:clear,php artisan route:clear ,php artisan view:clear dan php artisan optimize:clear.
12.  silahkan jalankan program bisa dengan npm run dev atau php artisan serve.
13.  untuk membuka web yang sudah di clone bisa di ikuti perintah ctrl+klik atau juga bisa dengan mencari di google dengan kata kunci localhost:8000/login untuk memunculkan tampilan login web yang sudah di clone.

salam hangat from MM152
