/**
 * Menü Rotaları (Public)
 * ------------------------------------------
 * Halka açık sayfaların rotalarını tanımlar.
 * Admin rotaları routes/admin.js'e taşındı.
 */

const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');

// Ana sayfa
router.get('/', menuController.anaSayfa);

// Menü sayfası (opsiyonel ?kategori=kahve filtresi)
router.get('/menu', menuController.menuSayfasi);

// Ürün detay sayfası
router.get('/menu/:id', menuController.urunDetay);

module.exports = router;
