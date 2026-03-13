<div align="center">

# 🌿 Ruang Aman untuk Kita
### *Perempuan Kuat*

**Kuesioner interaktif untuk mengukur tingkat rasa aman perempuan**

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](#)

</div>

---

## 📖 Tentang Proyek

**Ruang Aman untuk Kita** adalah website kuesioner interaktif yang dirancang untuk membantu perempuan memahami tingkat rasa aman mereka di berbagai aspek kehidupan — dari keamanan rumah, relasi sosial, kesehatan mental, hingga perlindungan hukum.

Terinspirasi dari format tes kepribadian seperti MBTI, kuesioner ini menyajikan **16 pertanyaan dengan skala 1–4** yang menghasilkan analisis personal dan rekomendasi langkah yang bisa diambil.

> *"Rasa aman bukan kemewahan. Itu hak dasarmu."*

---

## ✨ Fitur

- **🏠 Landing Page** — Hero section yang powerful, statistik penting, penjelasan kuesioner, dan alur penggunaan
- **📝 Kuesioner Interaktif** — 16 pertanyaan dengan transisi mulus, kategori pertanyaan, dan indikator progres
- **📊 Halaman Hasil** — Skor animasi, 5 level hasil, tips personal, dan sumber bantuan
- **🔒 100% Anonim** — Tidak ada data yang disimpan atau dikirim ke server
- **📱 Fully Responsive** — Nyaman digunakan di semua ukuran layar

---

## 🗂️ Kategori Pertanyaan

| No. | Kategori |
|-----|----------|
| 1, 3, 4, 5 | Keamanan Rumah |
| 2 | Relasi Sosial |
| 6, 7, 8 | Kesehatan Mental |
| 9, 12 | Keamanan Lingkungan |
| 10 | Kepercayaan Sistem |
| 11 | Kesadaran Diri |
| 13 | Perlindungan Hukum |
| 14 | Pemulihan Diri |
| 15, 16 | Edukasi & Kebijakan Publik |

---

## 📊 Level Hasil

| Skor | Level | Emoji |
|------|-------|-------|
| 0–30% | Butuh Perhatian Segera | 🌧️ |
| 31–50% | Dalam Proses Pemulihan | 🌤️ |
| 51–70% | Cukup Aman, Terus Bertumbuh | 🌿 |
| 71–85% | Kuat & Berdaya | 🌸 |
| 86–100% | Perempuan Kuat & Aman | ✨ |

---

## 🎨 Design System

| Elemen | Nilai |
|--------|-------|
| **Warna Utama** | Sage Green `#87A878` / `#5E8050` |
| **Background** | Cream `#FBF7F0` |
| **Aksen** | Blush `#E8B4B8`, Lavender `#C8C0DC` |
| **Font Display** | [Playfair Display](https://fonts.google.com/specimen/Playfair+Display) |
| **Font Body** | [DM Sans](https://fonts.google.com/specimen/DM+Sans) |
| **Mood** | Calming · Safe · Warm · Feminine but Strong |

---

## 🗃️ Struktur Proyek

```
ruang-aman-website/
├── src/
│   └── app/
│       ├── page.tsx          # Landing page
│       ├── quiz/
│       │   └── page.tsx      # Halaman kuesioner (16 pertanyaan)
│       ├── result/
│       │   └── page.tsx      # Halaman hasil & analisis
│       ├── globals.css       # Design system & animasi
│       └── layout.tsx        # Root layout + metadata SEO
├── public/
├── next.config.ts
└── package.json
```

---

## 🚀 Cara Menjalankan

**Prasyarat:** Node.js 18+ dan npm

```bash
# 1. Clone repository
git clone https://github.com/geraltritama/ruang-aman-website.git
cd ruang-aman-website

# 2. Install dependencies
npm install

# 3. Jalankan development server
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

---

## 🛠️ Tech Stack

- **Framework** — [Next.js 16](https://nextjs.org/) (App Router)
- **Language** — TypeScript
- **Styling** — Tailwind CSS v4 + Custom CSS
- **Fonts** — Google Fonts (Playfair Display, DM Sans)
- **Deployment** — Vercel-ready

---

## 🤝 Berkontribusi

Kontribusi sangat diterima! Beberapa area yang bisa ditingkatkan:

- Menambah lebih banyak pertanyaan atau kategori
- Menambah fitur berbagi hasil ke media sosial
- Terjemahan ke bahasa lain
- Integrasi dengan layanan konseling online

---

## 📞 Sumber Bantuan Darurat

Jika kamu atau seseorang yang kamu kenal membutuhkan bantuan:

| Lembaga | Kontak |
|---------|--------|
| Hotline KDRT Kemensos | `021-500-454` |
| Komnas Perempuan | `021-390-3963` |
| Crisis Center KPPPA | `1500-454` |
| Hotline Kesehatan Jiwa | `119 ext 8` |

---

<div align="center">

Dibuat dengan 💚 untuk perempuan Indonesia

*Rasa aman bukan kemewahan — itu hak dasarmu.*

</div>
