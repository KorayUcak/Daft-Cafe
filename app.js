require('dotenv').config();

const express = require('express');
const path = require('path');
const fs = require('fs');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3000;

// --- uploads klasörünü oluştur (yoksa) ---
const uploadsDir = path.join(__dirname, 'public', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// --- View Engine (EJS) ---
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// --- Middleware ---
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// --- Session (Admin Şifre Koruması İçin) ---
app.use(session({
  secret: process.env.SESSION_SECRET || 'daftcoffee-fallback-secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 2, // 2 saat
    httpOnly: true,
    secure: false // production'da true yapılmalı
  }
}));

// --- Routes ---
const menuRoutes = require('./routes/menuRoutes');
const adminRoutes = require('./routes/admin');

app.use('/', menuRoutes);          // Public rotalar
app.use('/admin', adminRoutes);     // Admin rotalar (şifre korumalı)

// --- 404 Yakalayıcı ---
app.use((req, res) => {
  res.status(404).render('404', { title: 'Sayfa Bulunamadı - Daft Coffee' });
});

// --- Hata Yakalayıcı ---
app.use((err, req, res, next) => {
  console.error('Sunucu Hatası:', err.stack);
  res.status(500).send('Sunucu hatası oluştu.');
});

// --- Sunucuyu Başlat ---
app.listen(PORT, () => {
  console.log(`✅ Daft Cafe sunucusu http://localhost:${PORT} adresinde çalışıyor`);
});
