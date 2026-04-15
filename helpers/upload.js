/**
 * Multer Dosya Yükleme Yapılandırması
 * ------------------------------------------
 * Yüklenen görselleri public/uploads klasörüne kaydeder.
 * Dosya adlarını benzersiz hale getirir (timestamp + random).
 * Sadece belirli görsel formatlarını kabul eder.
 */

const multer = require('multer');
const path = require('path');

// --- Depolama Ayarları ---
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'public', 'uploads'));
  },
  filename: (req, file, cb) => {
    // Orijinal dosya adından Türkçe/özel karakterleri temizle
    const temizAd = file.originalname
      .replace(/[^a-zA-Z0-9.]/g, '-')
      .toLowerCase();
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `urun-${uniqueSuffix}${ext}`);
  }
});

// --- Dosya Filtresi ---
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp|svg/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    const hata = new Error('Geçersiz dosya formatı! Sadece resim dosyaları kabul edilir: JPEG, JPG, PNG, GIF, WEBP, SVG');
    hata.code = 'INVALID_FILE_TYPE';
    cb(hata, false);
  }
};

// --- Multer Instance ---
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // Maksimum 5MB
    files: 1                    // Tek seferde 1 dosya
  }
});

module.exports = upload;
