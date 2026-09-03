# Web Kelas — Website Kelas Interaktif

Aplikasi web **kelas XI RPL 2** interaktif dengan desain **neo-brutalism monokrom**
(latar krem, kartu putih berborder hitam tebal dengan bayangan keras, aksen
merah & kuning). Terbuka untuk semua tanpa login.

Dibangun dengan **Vue 3 + Vite + vue-router**.

> **Catatan penting:** Aplikasi ini **tanpa fitur tambah/edit/hapus**. Semua
> perubahan data dilakukan **langsung lewat kode**, yaitu dengan mengedit file
> JSON di `src/data/`, lalu menjalankan `npm run dev` untuk melihat hasilnya.

## Fitur

| Halaman | Deskripsi |
|---|---|
| **Dashboard** | Statistik kelas, pengurus, jadwal hari ini, dan highlight terbaru |
| **Jadwal Pelajaran** | Kartu jadwal per hari (Senin–Jumat), 13 slot waktu per hari, tanpa ruang |
| **Kegiatan** | Laporan kegiatan kelas; kartu dengan slot foto (16:9) & pemutar video |
| **Highlight** | Sorotan prestasi & berita kelas; kartu dengan slot foto |
| **Organisasi & Siswa** | Pengurus kelas + daftar siswa; tabel dengan kolom foto |

Utilitas global: **mode gelap** dan **pencarian**. Tidak ada login. Konten
utama melebar penuh mengisi seluruh lebar layar.

## Mengisi data (lewat kode)

Semua data ada di folder `src/data/`:

| File | Isi | Format |
|---|---|---|
| `students.json` | Daftar siswa | `{ "id", "name", "gender": "L/P", "photo" }` |
| `schedule.json` | Jadwal pelajaran | `{ "id", "day", "time", "subject", "teacher", "type" }` |
| `activities.json` | Laporan kegiatan | `{ "id", "title", "date", "category", "description", "photo" }` |
| `highlights.json` | Sorotan prestasi/berita | `{ "id", "title", "date", "category", "content", "photo" }` |
| `organizers.json` | Pengurus kelas | `{ "id", "role", "studentId" }` |

- **`type` jadwal:** `"lesson"` (pelajaran), `"break"` (Istirahat), `"free"`
  (Tidak ada pelajaran — untuk slot yang masih kosong).
- **Guru:** biarkan `"teacher": ""` sampai diisi.
- **Placeholder:** `students.json` sudah berisi 30 baris siswa kosong (nama,
  jenis kelamin, foto dikosongkan). `activities.json` dan `highlights.json`
  masing-masing berisi 3 kartu kosong (kategori sudah terisi, judul/tanggal/
  keterangan/foto dikosongkan). Tinggal isi kolom yang kosong tersebut.
- **Foto:** taruh file di folder yang sesuai:
  - Kegiatan & Highlight → `public/photo/kegiatan/`
  - Siswa → `public/photo/siswa/`
  - Logo → `public/photo/logo/`
  Cukup tulis **nama file saja**, mis. `"photo": "teater1.jpeg"`. Jika
  dikosongkan, slot foto menampilkan placeholder.
- **Video:** taruh file di `public/video/`, lalu isi `"video": "nama-file.mp4"`
  (contoh: `"video": "IMG_3406.MOV"`) — kartu Kegiatan otomatis menampilkan
  pemutar video. Path lama yang lengkap (`/photo/kegiatan/...`) tetap didukung.
- **Pengurus kelas** diatur di `src/data/organizers.json` — isi `studentId`
  dengan `id` siswa dari `students.json` (`null` = belum ditentukan). Bisa
  menambah/mengubah jabatan lewat file tersebut.

## Menjalankan

```bash
npm install
npm run dev      # mode pengembangan → http://localhost:5173
npm run build    # build produksi ke dist/
npm run preview  # pratinjau hasil build
```

## Teknologi

- Vue 3 (`<script setup>`), vue-router (history mode)
- Vite sebagai build tool
- CSS murni (global.css) bergaya neo-brutalism monokrom, tanpa framework UI
- Font: Archivo Black (display) + Space Grotesk (body)

## Struktur

```
kelas/
├─ public/                     # folder aset: photo/ (kegiatan, siswa, logo) + video/
├─ index.html                 # entry + script anti-flash mode gelap
├─ src/
│  ├─ main.js                 # bootstrap: settings.init()
│  ├─ App.vue                 # layout + toolbar global (cari, gelap)
│  ├─ config.js               # nama kelas/sekolah + storage key
│  ├─ router/index.js         # rute halaman
│  ├─ styles/global.css       # tema neo-brutalism light/dark + komponen global
│  ├─ data/*.json             # data (siswa, jadwal, kegiatan, highlight, pengurus)
│  ├─ core/store.js           # store reaktif + persist localStorage
│  ├─ services/               # settings (tema), toast, ui (search overlay)
│  ├─ utils/storage.js        # wrapper localStorage
│  ├─ components/
│  │  ├─ layout/Sidebar.vue   # navigasi samping
│  │  └─ ui/                  # Toast, SearchOverlay
│  └─ views/                  # Dashboard, Jadwal, Kegiatan, Highlight, Siswa
└─ README.md
```