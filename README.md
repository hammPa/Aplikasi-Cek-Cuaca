# 🌦️ Aplikasi Cek Cuaca & Berita Terkini

Aplikasi web fullstack berbasis **Node.js (Express)** yang menampilkan:
- Prediksi cuaca berdasarkan lokasi (menggunakan API cuaca)
- Berita terkini bertema **cuaca & iklim** (menggunakan Mediastack API)
- Tampilan antarmuka responsif berbasis HTML, CSS, dan JavaScript.

---

## 🧭 Fungsi Aplikasi

| Fitur | Deskripsi |
|-------|------------|
| 🔍 Cek Cuaca | Menampilkan prakiraan cuaca terkini berdasarkan lokasi yang di masukkan. |
| 📰 Berita Cuaca | Menampilkan berita terbaru bertema cuaca dan iklim. |
| 💡 Bantuan | Menyediakan informasi dan FAQ seputar penggunaan aplikasi. |
| 👤 Tentang | Menampilkan informasi singkat tentang pengembang aplikasi. |

---

## ⚙️ Teknologi yang Digunakan

| Kategori | Teknologi / Library |
|-----------|----------------------|
| **Backend** | Node.js, Express.js |
| **Frontend** | HTML, CSS, JavaScript (vanilla) |
| **Template Engine** | Handlebars (HBS) |
| **API Cuaca** | WeatherStack |
| **API Berita** | Mediastack API |
| **API Lokasi** | Nominatim API |
| **Environment** | dotenv |
| **Deployment** | Vercel |

---

## 🧩 Struktur Direktori
project-root/<br>
│<br>
├─ public/ # File statis (HTML, CSS, JS, gambar)<br>
│ ├─ css/<br>
│ ├─ js/<br>
│ └─ img/<br>
│<br>
├─ src/<br>
│ ├─ utils/ # Fungsi geocode & prediksi cuaca<br>
│ └─ app.js # Server utama Express<br>
│<br>
├─ templates/<br>
│ ├─ views/ # File .hbs (halaman utama, berita, bantuan, tentang)<br>
│ └─ partials/ # Header, footer, komponen bersama<br>
│<br>
├─ .env # API key & konfigurasi rahasia<br>
├─ package.json<br>
└─ README.md<br>


## 🧰 Instalasi

### 1️. Clone Repository
```bash
git clone https://github.com/hammPa/Aplikasi-Cek-Cuaca.git
cd nama-repo
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Konfigurasi Environment
Buat file .env di root proyek:
```bash
PORT=4000
MEDIA=https://api.mediastack.com
MEDIA_API_KEY=api_media
WEATHER=http://api.weatherstack.com
API_KEY=api_weather
MAP=https://nominatim.openstreetmap.org
```

### 4. Pindah ke src:
```bash
cd src/app.js
```

### 5. Jalankan Server
```bash
node app.js
```

### 6. Buka Aplikasi
Buka browser dan akses:
```bash
http://localhost:4000
```