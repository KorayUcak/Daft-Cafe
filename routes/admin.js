/**
 * Admin Rotaları
 * ------------------------------------------
 * Tüm /admin/* yolları burada tanımlıdır.
 * adminAuth middleware'i ile şifre koruması altındadır.
 * Login/logout rotaları middleware dışında kalır.
 */

const express = require('express');
const router = express.Router();
const upload = require('../helpers/upload');
const adminController = require('../controllers/adminController');
const { adminAuth, girisFormu, girisYap, cikisYap } = require('../middleware/auth');

// ============================================================
//  AUTH ROTALARI (Şifre koruması YOK — herkes erişebilir)
// ============================================================

// Giriş formu
router.get('/giris', girisFormu);

// Giriş işlemi
router.post('/giris', girisYap);

// Çıkış
router.get('/cikis', cikisYap);

// ============================================================
//  KORUNMUŞ ROTALAR (adminAuth middleware aktif)
// ============================================================

// Admin paneli ana sayfası
router.get('/', adminAuth, adminController.panel);

// Yeni ürün ekleme (POST + multer)
router.post('/ekle', adminAuth, upload.single('image'), adminController.urunEkle);

// Satır içi hızlı fiyat güncelleme (POST)
router.post('/fiyat/:id', adminAuth, adminController.fiyatGuncelle);

// Tam ürün güncelleme (POST + multer)
router.post('/guncelle/:id', adminAuth, upload.single('image'), adminController.urunGuncelle);

// Ürün silme (POST)
router.post('/sil/:id', adminAuth, adminController.urunSil);

module.exports = router;
