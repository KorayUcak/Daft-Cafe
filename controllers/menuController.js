/**
 * Menü Controller Katmanı
 * ------------------------------------------
 * HTTP isteklerini karşılar, Model üzerinden veri işler ve View'a gönderir.
 * 
 * Genel (Public) Fonksiyonlar:
 *   anaSayfa        → Ana sayfa (kategorilere göre gruplandırılmış ürünler)
 *   menuSayfasi     → Menü listesi
 *   urunDetay       → Tek ürün detayı
 * 
 * Admin CRUD Fonksiyonları:
 *   adminPanel      → Admin paneli ana sayfası (tüm ürünler + işlemler)
 *   urunEkleForm    → Ürün ekleme formu (GET)
 *   urunEkle        → Ürün ekleme işlemi (POST)
 *   urunDuzenleForm → Ürün düzenleme formu (GET)
 *   urunGuncelle    → Ürün güncelleme işlemi (POST)
 *   urunSil         → Ürün silme işlemi (POST) + fotoğraf temizleme
 */

const fs = require('fs');
const path = require('path');
const MenuModel = require('../models/menuModel');
const CampaignModel = require('../models/campaignModel');

// Uploads klasörünün tam yolu
const uploadsDir = path.join(__dirname, '..', 'public', 'uploads');

// ============================================================
//  YARDIMCI: FOTOĞRAF SİLME
// ============================================================

/**
 * Verilen imagePath'e sahip dosyayı public/uploads'tan siler.
 * imagePath örneği: "/uploads/urun-1712345678-123456789.jpg"
 * @param {string|null} imagePath - Ürünün imagePath değeri
 */
function fotoğrafSil(imagePath) {
  if (!imagePath) return;

  // imagePath → /uploads/dosyaadi.jpg şeklinde geliyor
  // Fiziksel yola çevir → public/uploads/dosyaadi.jpg
  const dosyaAdi = path.basename(imagePath);
  const tamYol = path.join(uploadsDir, dosyaAdi);

  fs.unlink(tamYol, (err) => {
    if (err) {
      if (err.code === 'ENOENT') {
        console.warn(`⚠️  Silinecek fotoğraf bulunamadı (zaten yok): ${tamYol}`);
      } else {
        console.error(`❌ Fotoğraf silme hatası: ${err.message}`);
      }
    } else {
      console.log(`🗑️  Fotoğraf silindi: ${dosyaAdi}`);
    }
  });
}

// ============================================================
//  GENEL (PUBLIC) SAYFA FONKSİYONLARI
// ============================================================

/**
 * Ana Sayfa
 * Tüm menüyü kategorilere göre gruplandırarak gösterir.
 */
exports.anaSayfa = (req, res) => {
  const tumUrunler = MenuModel.getAll();
  const kampanyalar = CampaignModel.getAll();

  const kategoriler = {
    kahve: tumUrunler.filter(u => u.kategori === 'kahve'),
    tatli: tumUrunler.filter(u => u.kategori === 'tatli'),
    'soguk-icecek': tumUrunler.filter(u => u.kategori === 'soguk-icecek')
  };

  res.render('index', {
    title: 'Daft Coffee',
    kategoriler,
    urunler: tumUrunler,
    kampanyalar
  });
};

/**
 * Menü Sayfası
 * Tüm ürünleri kart görünümünde listeler.
 * Opsiyonel query parametresi ile kategori filtreleme destekler.
 */
exports.menuSayfasi = (req, res) => {
  const { kategori } = req.query;
  let urunler;

  if (kategori) {
    urunler = MenuModel.getByKategori(kategori);
  } else {
    urunler = MenuModel.getAll();
  }

  const kategoriler = MenuModel.getKategoriler();

  res.render('menu', {
    title: 'Menümüz - Daft Cafe',
    urunler,
    kategoriler,
    seciliKategori: kategori || ''
  });
};

/**
 * Ürün Detay
 * Tek bir ürünün tüm bilgilerini gösterir.
 */
exports.urunDetay = (req, res) => {
  const urun = MenuModel.getById(req.params.id);

  if (!urun) {
    return res.status(404).render('404', { title: 'Ürün Bulunamadı' });
  }

  res.render('urunDetay', {
    title: `${urun.isim} - Daft Cafe`,
    urun
  });
};

// ============================================================
//  ADMİN PANELİ CRUD FONKSİYONLARI
// ============================================================

/**
 * Admin Paneli Ana Sayfası
 * Tüm ürünleri düzenleme/silme butonlarıyla birlikte listeler.
 */
exports.adminPanel = (req, res) => {
  const urunler = MenuModel.getAll();
  const kategoriler = MenuModel.getKategoriler();

  // Başarı/hata mesajları (query param ile)
  const mesaj = req.query.mesaj || null;
  const hataMesaji = req.query.hata || null;

  res.render('admin/panel', {
    title: 'Admin Paneli - Daft Cafe',
    urunler,
    kategoriler,
    mesaj,
    hataMesaji
  });
};

/**
 * Ürün Ekleme Formu (GET)
 * Yeni ürün ekleme formunu gösterir.
 */
exports.urunEkleForm = (req, res) => {
  res.render('admin/urunEkle', {
    title: 'Yeni Ürün Ekle - Daft Cafe'
  });
};

/**
 * Ürün Ekleme İşlemi (POST)
 * Form verilerini ve yüklenen dosyayı alır, yeni ürün oluşturur.
 */
exports.urunEkle = (req, res) => {
  const { isim, kategori, fiyat } = req.body;

  // Multer'dan gelen dosya bilgisi
  const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

  const yeniUrun = MenuModel.create({ isim, kategori, fiyat, imagePath });

  console.log(`📦 Controller: Yeni ürün eklendi → ${yeniUrun.isim}`);

  res.redirect('/admin?mesaj=Ürün başarıyla eklendi!');
};

/**
 * Ürün Düzenleme Formu (GET)
 * Mevcut ürün bilgilerini formda gösterir.
 */
exports.urunDuzenleForm = (req, res) => {
  const urun = MenuModel.getById(req.params.id);

  if (!urun) {
    return res.status(404).render('404', { title: 'Ürün Bulunamadı' });
  }

  res.render('admin/urunDuzenle', {
    title: `Düzenle: ${urun.isim} - Daft Cafe`,
    urun
  });
};

/**
 * Ürün Güncelleme İşlemi (POST)
 * Form verilerini alır, ürünü günceller.
 * Yeni fotoğraf yüklendiyse eski fotoğrafı siler.
 */
exports.urunGuncelle = (req, res) => {
  const { isim, kategori, fiyat } = req.body;
  const guncelVeri = { isim, kategori, fiyat: parseFloat(fiyat) };

  // Yeni fotoğraf yüklendiyse ekle
  if (req.file) {
    guncelVeri.imagePath = `/uploads/${req.file.filename}`;
  }

  const sonuc = MenuModel.update(req.params.id, guncelVeri);

  if (!sonuc) {
    return res.status(404).render('404', { title: 'Ürün Bulunamadı' });
  }

  // Yeni fotoğraf yüklendiyse ESKİ fotoğrafı sil
  if (req.file && sonuc.eskiImagePath) {
    fotoğrafSil(sonuc.eskiImagePath);
    console.log(`🔄 Eski fotoğraf değiştirildi: ${sonuc.eskiImagePath} → ${guncelVeri.imagePath}`);
  }

  res.redirect('/admin?mesaj=Ürün başarıyla güncellendi!');
};

/**
 * Ürün Silme İşlemi (POST)
 * Ürünü veritabanından siler.
 * Ürüne ait fotoğraf varsa public/uploads'tan fs.unlink ile fiziksel olarak da siler.
 */
exports.urunSil = (req, res) => {
  const silinenUrun = MenuModel.remove(req.params.id);

  if (!silinenUrun) {
    return res.status(404).render('404', { title: 'Ürün Bulunamadı' });
  }

  // ========================================
  // FOTOĞRAF SİLME MANTIĞI
  // Ürüne ait bir fotoğraf varsa, fiziksel
  // dosyayı da public/uploads'tan sil.
  // ========================================
  if (silinenUrun.imagePath) {
    fotoğrafSil(silinenUrun.imagePath);
  }

  res.redirect('/admin?mesaj=Ürün başarıyla silindi!');
};
