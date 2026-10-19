# 🎨 CodeCanvas — Next.js Studio & Visual Page Builder

**CodeCanvas** adalah visual UI editor untuk codebase **React** dan **Next.js**, dirancang sebagai *"Figma for Code"* MVP. Memungkinkan perancangan antarmuka secara visual dengan pembangkitan kode Next.js dan utilitas Tailwind CSS secara instan dan real-time.

---

## 🌟 Fitur Utama

- 🖌️ **Visual Drag & Drop Canvas**: Desain tata letak komponen secara bebas dan responsif pada kanvas visual interaktif.
- ⚡ **Generasi Kode Real-time**: Konversi instan elemen visual menjadi sintaks JSX/TSX yang bersih dengan utilitas Tailwind CSS.
- 🎛️ **Komponen Inspector**: Penyesuaian tipografi, warna, jarak (*spacing*), flexbox/grid, dan properti CSS secara presisi.
- 🗂️ **Hirarki Layer & Komponen**: Navigasi struktur pohon komponen dengan cepat layaknya layer di aplikasi desain profesional.
- 📦 **State Management Solid**: Didukung oleh Zustand untuk performa state editor yang reaktif dan cepat.
- 🔮 **Integrasi AI Studio**: Kemampuan integrasi pembuatan komponen cerdas dengan Gemini API (`@google/genai`).

---

## 🛠️ Tech Stack

| Layer | Teknologi |
| :--- | :--- |
| **Framework** | [Next.js 15](https://nextjs.org/) (App Router) |
| **Bahasa** | [TypeScript](https://www.typescriptlang.org/) |
| **UI & Styling** | [React 19](https://react.dev/), [Tailwind CSS 4](https://tailwindcss.com/) |
| **State Management** | [Zustand](https://zustand.docs.pmnd.rs/) |
| **Animasi** | [Motion](https://motion.dev/) |
| **Ikon** | [Lucide React](https://lucide.dev/) |
| **AI SDK** | [@google/genai](https://www.npmjs.com/package/@google/genai) |

---

## 📁 Struktur Direktori

```text
codecanvas/
├── app/
│   ├── layout.tsx         # Root layout, definisi font & tema gelap
│   ├── page.tsx           # Entry point aplikasi editor
│   ├── globals.css        # Styling dasar & token Tailwind CSS
│   ├── error.tsx          # Error boundary
│   └── not-found.tsx      # Halaman 404
├── src/
│   ├── core/              # Store Zustand & logika state editor
│   ├── editor/            # Komponen editor (canvas, inspector, layers, toolbar, code viewer)
│   └── types/             # Definisi tipe TypeScript
├── metadata.json          # Metadata konfigurasi ekstensi / template studio
├── package.json
└── tsconfig.json
```

---

## 🚀 Panduan Memulai

### 1. Prasyarat
- **Node.js**: `v18.18.0` atau versi lebih baru
- **npm** / **pnpm** / **yarn**

### 2. Instalasi Dependensi
```bash
npm install
```

### 3. Konfigurasi Environment (Opsional)
Salin contoh environment dan masukkan API key Gemini jika menggunakan fitur AI:
```bash
cp .env.example .env.local
```

### 4. Menjalankan Server Pengembangan
```bash
npm run dev
```
Buka [http://localhost:3000](http://localhost:3000) pada browser Anda.

### 5. Kompilasi Produksi
```bash
npm run build
npm run start
```

---

<p align="center">
  <sub>Dibuat dengan ❤️ untuk ekosistem pengembang Next.js & React • CodeCanvas</sub>
</p>
