# ☕ Daft Coffee

Minimalist cafe web sitesi — Node.js, Express ve EJS ile MVC mimarisinde geliştirilmiştir. Veritabanı yerine JSON dosyası kullanılır.

---

## 📸 Önizleme

| Ana Sayfa | Menü | Admin Paneli |
|-----------|------|--------------|
| Hero + Kategori kartları | Filtrelenebilir ürün listesi | Şifre korumalı yönetim |

---

## 🚀 Kurulum

### 1. Depoyu klonlayın

```bash
git clone <repo-url>
cd daft-cafe
```

### 2. Bağımlılıkları yükleyin

```bash
npm install
```

### 3. Ortam değişkenlerini ayarlayın

```bash
cp .env.example .env
```

`.env` dosyasını açın ve değerleri güncelleyin:

```env
PORT=3000
NODE_ENV=development
ADMIN_PASSWORD=daft2024        # Admin paneli şifresi
SESSION_SECRET=gizli-anahtar   # Session şifreleme anahtarı
```

### 4. Sunucuyu başlatın

```bash
# Production
npm start

# Geliştirme (nodemon ile otomatik yeniden başlatma)
npm run dev
```

Sunucu varsayılan olarak **http://localhost:3000** adresinde çalışır.

---

## 📂 Proje Yapısı

```
daft-cafe/
├── app.js                    # Ana sunucu dosyası
├── .env                      # Ortam değişkenleri (git'e eklenmez)
├── .env.example              # Örnek ortam değişkenleri
├── package.json              # Bağımlılıklar ve scriptler
│
├── models/
│   └── menuModel.js          # JSON veri erişim katmanı (CRUD)
│
├── controllers/
│   ├── menuController.js     # Public sayfa fonksiyonları
│   └── adminController.js    # Admin CRUD fonksiyonları
│
├── routes/
│   ├── menuRoutes.js         # Public rotalar (/, /menu, /menu/:id)
│   └── admin.js              # Admin rotalar (/admin/*)
│
├── middleware/
│   └── auth.js               # Şifre koruma middleware'i
│
├── helpers/
│   └── upload.js             # Multer dosya yükleme yapılandırması
│
├── views/
│   ├── index.ejs             # Ana sayfa (Hero + Kategoriler)
│   ├── menu.ejs              # Menü sayfası (Filtreleme)
│   ├── urunDetay.ejs         # Ürün detay sayfası
│   ├── 404.ejs               # 404 hata sayfası
│   ├── partials/
│   │   ├── header.ejs        # Ortak header (Logo + Nav)
│   │   └── footer.ejs        # Ortak footer
│   └── admin/
│       ├── giris.ejs         # Admin login sayfası
│       └── panel.ejs         # Admin yönetim paneli
│
├── public/
│   ├── css/
│   │   └── style.css         # Ana stil dosyası
│   ├── images/
│   │   ├── hero-bg.png       # Ana sayfa hero görseli
│   │   └── defaults/         # Varsayılan ürün görselleri
│   │       ├── kahve-default.png
│   │       ├── tatli-default.png
│   │       └── soguk-icecek-default.png
│   └── uploads/              # Yüklenen ürün fotoğrafları
│
└── data/
    └── menu.json             # Ürün veritabanı (JSON)
```

---

## 🔑 Admin Paneli

### Erişim

1. Tarayıcıda **http://localhost:3000/admin** adresine gidin
2. Giriş sayfasına yönlendirileceksiniz
3. `.env` dosyasındaki `ADMIN_PASSWORD` değerini girin (varsayılan: `daft2024`)

### Özellikler

| Özellik | Açıklama |
|---------|----------|
| **Ürün Ekleme** | İsim, kategori, fiyat ve fotoğraf yükleme |
| **Fiyat Güncelleme** | Satır içi hızlı güncelleme |
| **Ürün Silme** | Onay ile silme + fotoğraf temizleme |
| **Şifre Koruması** | Session tabanlı, 2 saat ömürlü |
| **Çıkış** | `/admin/cikis` ile oturum sonlandırma |

---

## 🎨 Tasarım

- **Font:** Montserrat (Google Fonts)
- **Renk Paleti:** Sıcak bej, krem, beyaz, kahverengi tonları
- **Stil:** Minimalist, modern cafe estetiği
- **Responsive:** Mobil uyumlu (hamburger menü)
- **Animasyonlar:** IntersectionObserver ile scroll animasyonları

---

## 📋 Varsayılan Görseller

Ürüne fotoğraf yüklenmemişse, kategorisine göre otomatik olarak varsayılan bir görsel gösterilir:

| Kategori | Varsayılan Görsel |
|----------|-------------------|
| Kahve | `public/images/defaults/kahve-default.png` |
| Tatlı | `public/images/defaults/tatli-default.png` |
| Soğuk İçecek | `public/images/defaults/soguk-icecek-default.png` |

Bu görseller projeyle birlikte gelir ve değiştirilebilir.

---

## 📡 API Rotaları

### Public (Herkes erişebilir)

| Metod | Yol | Açıklama |
|-------|-----|----------|
| GET | `/` | Ana sayfa |
| GET | `/menu` | Menü listesi |
| GET | `/menu?kategori=kahve` | Kategori filtreli menü |
| GET | `/menu/:id` | Ürün detay |

### Admin (Şifre korumalı)

| Metod | Yol | Açıklama |
|-------|-----|----------|
| GET | `/admin/giris` | Giriş formu |
| POST | `/admin/giris` | Şifre kontrolü |
| GET | `/admin` | Admin paneli |
| POST | `/admin/ekle` | Yeni ürün ekle |
| POST | `/admin/fiyat/:id` | Hızlı fiyat güncelle |
| POST | `/admin/guncelle/:id` | Tam ürün güncelle |
| POST | `/admin/sil/:id` | Ürün sil |
| GET | `/admin/cikis` | Çıkış yap |

---

## 🛠️ Teknolojiler

| Paket | Sürüm | Kullanım |
|-------|-------|----------|
| express | ^4.21 | Web framework |
| ejs | ^3.1 | Template engine |
| multer | ^1.4 | Dosya yükleme |
| uuid | ^11.1 | Benzersiz ID üretimi |
| dotenv | ^16.4 | Ortam değişkenleri |
| express-session | ^1.18 | Oturum yönetimi |
| nodemon | ^3.1 | Geliştirme (dev dependency) |

---

## 📝 Lisans

ISC
