/**
 * Admin Controller
 * ------------------------------------------
 * Admin paneli CRUD işlemlerini yönetir.
 * Tüm admin rotaları auth middleware arkasında çalışır.
 */

const fs = require('fs');
const path = require('path');
const MenuModel = require('../models/menuModel');

const uploadsDir = path.join(__dirname, '..', 'public', 'uploads');

// ============================================================
//  YARDIMCI: FOTOĞRAF SİLME
// ============================================================

function fotografSil(imagePath) {
  if (!imagePath) return;

  const dosyaAdi = path.basename(imagePath);
  const tamYol = path.join(uploadsDir, dosyaAdi);

  fs.unlink(tamYol, (err) => {
    if (err) {
      if (err.code === 'ENOENT') {
        console.warn(`⚠️  Fotoğraf zaten yok: ${tamYol}`);
      } else {
        console.error(`❌ Fotoğraf silme hatası: ${err.message}`);
      }
    } else {
      console.log(`🗑️  Fotoğraf silindi: ${dosyaAdi}`);
    }
  });
}

// ============================================================
//  ADMİN PANELİ
// ============================================================

/**
 * Admin Paneli — Tek sayfa: ürün listesi + ekleme formu.
 */
exports.panel = (req, res) => {
  const urunler = MenuModel.getAll();
  const kategoriler = MenuModel.getKategoriler();

  const mesaj = req.query.mesaj || null;
  const hataMesaji = req.query.hata || null;

  res.render('admin/panel', {
    title: 'Admin Paneli - Daft Coffee',
    urunler,
    kategoriler,
    mesaj,
    hataMesaji
  });
};

/**
 * Yeni ürün ekleme (POST).
 */
exports.urunEkle = (req, res) => {
  const { isim, kategori, fiyat, description } = req.body;
  const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

  const yeniUrun = MenuModel.create({ isim, kategori, fiyat, description, imagePath });
  console.log(`📦 Yeni ürün eklendi: ${yeniUrun.isim}`);

  res.redirect('/admin?mesaj=Ürün başarıyla eklendi!');
};

/**
 * Fiyat güncelleme (POST) — satır içi hızlı güncelleme.
 */
exports.fiyatGuncelle = (req, res) => {
  const { fiyat } = req.body;
  const sonuc = MenuModel.update(req.params.id, { fiyat: parseFloat(fiyat) });

  if (!sonuc) {
    return res.redirect('/admin?hata=Ürün bulunamadı!');
  }

  console.log(`💰 Fiyat güncellendi: ${sonuc.urun.isim} → ${fiyat} ₺`);
  res.redirect('/admin?mesaj=Fiyat başarıyla güncellendi!');
};

/**
 * Tam ürün güncelleme (POST) — isim, kategori, fiyat, açıklama ve fotoğraf.
 */
exports.urunGuncelle = (req, res) => {
  const { isim, kategori, fiyat, description } = req.body;
  const guncelVeri = { isim, kategori, fiyat: parseFloat(fiyat), description };

  if (req.file) {
    guncelVeri.imagePath = `/uploads/${req.file.filename}`;
  }

  const sonuc = MenuModel.update(req.params.id, guncelVeri);

  if (!sonuc) {
    return res.redirect('/admin?hata=Ürün bulunamadı!');
  }

  if (req.file && sonuc.eskiImagePath) {
    fotografSil(sonuc.eskiImagePath);
  }

  res.redirect('/admin?mesaj=Ürün başarıyla güncellendi!');
};

/**
 * Ürün silme (POST) — fotoğrafı da fiziksel olarak siler.
 */
exports.urunSil = (req, res) => {
  const silinenUrun = MenuModel.remove(req.params.id);

  if (!silinenUrun) {
    return res.redirect('/admin?hata=Ürün bulunamadı!');
  }

  if (silinenUrun.imagePath) {
    fotografSil(silinenUrun.imagePath);
  }

  res.redirect('/admin?mesaj=Ürün başarıyla silindi!');
};
