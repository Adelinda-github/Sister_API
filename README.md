# Dokumentasi Penggunaan API (RESTful) untuk Produk dan Konsumen (USAGE 👌)

Hallloooo 👋
Full rest API ini dibangun untuk Mengelola Produk dan konsumen berdasarkan dokumen soal UAS SISTER melalui berbagai endpoint yang disediakan di dalamnya . Berikut adalah penjelasan tentang penggunaan masing-masing endpoint API.

## 1. Persiapan

Sebelum menggunakan API, ada beberapa Persiapan hal berikut:

1. Install Node.js dan npm
2. Download atau clone repository ini.
3. Install dependencies dengan menjalankan perintah berikut:

   ```bash
   npm install
   ```

4. Pastikan database MySQL yang berjalan dan sudah mengkonfigurasi database dengan nama `rest_api_db` yang sesuai dengan struktur tabel berikut:

   - **Tabel `products`**: Menyimpan data produk.
     Dengan stuktur Kolom sebagai Berikut
     | id | name | category | Price |
     | ------------- | ------------- | ------------- | ------------- |
   - **Tabel `consumers`**: Menyimpan data konsumen.
     Dengan stuktur Kolom sebagai Berikut
     | id | name | Email |
     | ------------- | ------------- | ------------- |

## 2. Menjalankan Server

Untuk menjalankan server Node js pada program ini menggunakan library Nodemon untuk memudah kan development memanfaatkan hot reload yang dimiliki nya,oleh karena itu selanjut nya buka terminal dan jalankan perintah berikut:

```bash
npm start
```

Server akan berjalan di `http://localhost:3000`.

## 3. Endpoint API

### **Produk**

#### a. Mendapatkan Semua Produk

- **URL**: `/products`
- **Method**: `GET`
- **Query Parameters**:
  - `name` (opsional): Mencari produk berdasarkan nama.
  - `category` (opsional): Mencari produk berdasarkan kategori.
- **Contoh URL**:
  ```
  http://localhost:3000/products?name=Shampoo&category=Haircare
  ```
- **Response**:
  - Status: `200 OK`
  - Body: Array objek produk.

#### b. Mendapatkan Produk Berdasarkan ID

- **URL**: `/products/:id`
- **Method**: `GET`
- **Parameter**:
  - `id`: ID produk yang ingin diambil.
- **Contoh URL**:
  ```
  http://localhost:3000/products/1
  ```
- **Response**:
  - Status: `200 OK`
  - Body: Objek produk dengan ID yang diberikan.

#### c. Menambahkan Produk Baru

- **URL**: `/products`
- **Method**: `POST`
- **Body Request**:
  ```json
  {
    "name": "Produk A",
    "category": "Kategori A",
    "price": 10000
  }
  ```
- **Response**:
  - Status: `201 Created`
  - Body: Objek produk yang baru ditambahkan.

#### d. Mengupdate Produk

- **URL**: `/products/:id`
- **Method**: `PUT`
- **Parameter**:
  - `id`: ID produk yang ingin diupdate.
- **Body Request**:
  ```json
  {
    "name": "Produk A Updated",
    "category": "Kategori A Updated",
    "price": 15000
  }
  ```
- **Response**:
  - Status: `200 OK`
  - Body: Objek produk yang telah diperbarui.

#### e. Menghapus Produk

- **URL**: `/products/:id`
- **Method**: `DELETE`
- **Parameter**:
  - `id`: ID produk yang ingin dihapus.
- **Response**:
  - Status: `204 No Content`

---

### **Konsumen**

#### a. Mendapatkan Semua Konsumen

- **URL**: `/consumers`
- **Method**: `GET`
- **Response**:
  - Status: `200 OK`
  - Body: Array objek konsumen.

#### b. Mendapatkan Konsumen Berdasarkan ID

- **URL**: `/consumers/:id`
- **Method**: `GET`
- **Parameter**:
  - `id`: ID konsumen yang ingin diambil.
- **Contoh URL**:
  ```
  http://localhost:3000/consumers/1
  ```
- **Response**:
  - Status: `200 OK`
  - Body: Objek konsumen dengan ID yang diberikan.

#### c. Menambahkan Konsumen Baru

- **URL**: `/consumers`
- **Method**: `POST`
- **Body Request**:
  ```json
  {
    "name": "Konsumen A",
    "email": "konsumenA@example.com"
  }
  ```
- **Response**:
  - Status: `201 Created`
  - Body: Objek konsumen yang baru ditambahkan.

#### d. Mengupdate Konsumen

- **URL**: `/consumers/:id`
- **Method**: `PUT`
- **Parameter**:
  - `id`: ID konsumen yang ingin diupdate.
- **Body Request**:
  ```json
  {
    "name": "Konsumen A Updated",
    "email": "konsumenAUpdated@example.com"
  }
  ```
- **Response**:
  - Status: `200 OK`
  - Body: Objek konsumen yang telah diperbarui.

#### e. Menghapus Konsumen

- **URL**: `/consumers/:id`
- **Method**: `DELETE`
- **Parameter**:
  - `id`: ID konsumen yang ingin dihapus.
- **Response**:
  - Status: `204 No Content`

## 4. Contoh Penggunaan dengan Postman

### **GET Produk**

1. Buka Postman dan pilih method `GET`.
2. Masukkan URL berikut untuk mendapatkan semua produk:
   ```
   http://localhost:3000/products
   ```

### **POST Produk**

1. Pilih method `POST` di Postman.
2. Masukkan URL:
   ```
   http://localhost:3000/products
   ```
3. Di tab `Body`, pilih `raw` dan pilih format `JSON`.
4. Masukkan data produk seperti berikut:
   ```json
   {
     "name": "Produk B",
     "category": "Kategori B",
     "price": 20000
   }
   ```

### **PUT Produk**

1. Pilih method `PUT` di Postman.
2. Masukkan URL untuk mengupdate produk:
   ```
   http://localhost:3000/products/1
   ```
3. Di tab `Body`, pilih `raw` dan pilih format `JSON`.
4. Masukkan data produk yang ingin diperbarui.

---

## 5. Penanganan Error

Jika terjadi error pada request, API ini akan mengembalikan pesan error dalam format JSON dengan kode status yang sesuai. Berikut adalah contoh pesan error:

- **400 Bad Request**: Jika ada data yang hilang atau tidak valid.
- **404 Not Found**: Jika produk atau konsumen yang dicari tidak ditemukan.
- **500 Internal Server Error**: Jika terjadi kesalahan pada server.

---

## 6. Menambahkan Fitur Pencarian

API ini juga mendukung fitur pencarian berdasarkan nama dan kategori produk. Gunakan query parameter `name` untuk mencari produk berdasarkan nama, dan `category` untuk mencari berdasarkan kategori.

Contoh URL pencarian:

```
http://localhost:3000/products?name=Shampoo&category=Haircare
```

---

Thankyou 😁😁😁
