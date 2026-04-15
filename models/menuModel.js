/**
 * Menü Model Katmanı
 * ------------------------------------------
 * data/menu.json dosyası üzerinde tüm CRUD işlemlerini yönetir.
 * Node.js yerleşik 'fs' modülünü kullanarak veri okuma/yazma yapar.
 * 
 * Fonksiyonlar:
 *   getAll()              → Tüm ürünleri getirir
 *   saveAll(items)        → Tüm ürünleri dosyaya yazar
 *   getById(id)           → ID'ye göre tek ürün getirir
 *   getByKategori(kat)    → Kategoriye göre ürünleri filtreler
 *   create(urunData)      → Yeni ürün oluşturur (UUID otomatik atanır)
 *   update(id, data)      → Mevcut ürünü günceller
 *   remove(id)            → Ürünü siler ve silinen ürünü döndürür
 */

const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const dataPath = path.join(__dirname, '..', 'data', 'menu.json');

// ============================================================
//  YARDIMCI FONKSİYONLAR
// ============================================================

/**
 * JSON dosyasının varlığını kontrol eder.
 * Dosya yoksa boş bir dizi ile oluşturur.
 */
function ensureDataFile() {
  if (!fs.existsSync(dataPath)) {
    const dataDir = path.dirname(dataPath);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    fs.writeFileSync(dataPath, '[]', 'utf-8');
  }
}

// ============================================================
//  CRUD FONKSİYONLARI
// ============================================================

/**
 * JSON dosyasından tüm menü verilerini okur.
 * Dosya bozuksa veya yoksa boş dizi döner.
 * @returns {Array} Menü öğeleri dizisi
 */
function getAll() {
  try {
    ensureDataFile();
    const raw = fs.readFileSync(dataPath, 'utf-8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error('❌ menu.json okuma hatası:', err.message);
    return [];
  }
}

/**
 * Tüm ürün verisini JSON dosyasına yazar.
 * @param {Array} items - Menü öğeleri dizisi
 * @returns {boolean} Yazma başarılı mı
 */
function saveAll(items) {
  try {
    ensureDataFile();
    fs.writeFileSync(dataPath, JSON.stringify(items, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('❌ menu.json yazma hatası:', err.message);
    return false;
  }
}

/**
 * Belirli bir UUID'ye sahip ürünü getirir.
 * @param {string} id - Ürün UUID'si
 * @returns {Object|null} Bulunan ürün veya null
 */
function getById(id) {
  const items = getAll();
  const urun = items.find(item => item.id === id);
  return urun || null;
}

/**
 * Belirli bir kategorideki ürünleri getirir.
 * @param {string} kategori - Kategori adı (kahve, tatli, soguk-icecek)
 * @returns {Array} Filtrelenmiş ürün dizisi
 */
function getByKategori(kategori) {
  const items = getAll();
  return items.filter(item => item.kategori === kategori);
}

/**
 * Mevcut tüm kategori isimlerini döndürür (unique).
 * @returns {Array<string>} Kategori isimleri
 */
function getKategoriler() {
  const items = getAll();
  const kategoriler = [...new Set(items.map(item => item.kategori))];
  return kategoriler;
}

/**
 * Yeni bir ürün oluşturur ve JSON dosyasına kaydeder.
 * UUID otomatik olarak oluşturulur.
 * @param {Object} urunData - Ürün bilgileri { isim, kategori, fiyat, imagePath }
 * @returns {Object} Oluşturulan ürün (id dahil)
 */
function create(urunData) {
  const items = getAll();

  const yeniUrun = {
    id: uuidv4(),
    isim: urunData.isim ? urunData.isim.trim() : '',
    kategori: urunData.kategori ? urunData.kategori.trim() : '',
    fiyat: parseFloat(urunData.fiyat) || 0,
    description: urunData.description ? urunData.description.trim() : '',
    imagePath: urunData.imagePath || null,
    olusturmaTarihi: new Date().toISOString()
  };

  items.push(yeniUrun);
  saveAll(items);

  console.log(`✅ Yeni ürün oluşturuldu: ${yeniUrun.isim} (${yeniUrun.id})`);
  return yeniUrun;
}

/**
 * Mevcut bir ürünü günceller.
 * ID ve oluşturma tarihi değiştirilemez.
 * @param {string} id - Güncellenecek ürünün UUID'si
 * @param {Object} guncelVeri - Güncellenecek alanlar { isim, kategori, fiyat, imagePath }
 * @returns {Object|null} Güncellenen ürün veya null (bulunamazsa)
 */
function update(id, guncelVeri) {
  const items = getAll();
  const index = items.findIndex(item => item.id === id);

  if (index === -1) {
    console.warn(`⚠️  Güncellenecek ürün bulunamadı: ${id}`);
    return null;
  }

  // Eski fotoğraf yolunu sakla (controller fotoğraf silme için kullanacak)
  const eskiImagePath = items[index].imagePath;

  // Sadece gelen alanları güncelle, ID ve oluşturma tarihini koru
  if (guncelVeri.isim !== undefined) {
    items[index].isim = guncelVeri.isim.trim();
  }
  if (guncelVeri.kategori !== undefined) {
    items[index].kategori = guncelVeri.kategori.trim();
  }
  if (guncelVeri.fiyat !== undefined) {
    items[index].fiyat = parseFloat(guncelVeri.fiyat) || items[index].fiyat;
  }
  if (guncelVeri.description !== undefined) {
    items[index].description = guncelVeri.description.trim();
  }
  if (guncelVeri.imagePath !== undefined) {
    items[index].imagePath = guncelVeri.imagePath;
  }

  // Güncelleme tarihi ekle
  items[index].guncellemeTarihi = new Date().toISOString();

  saveAll(items);

  console.log(`✅ Ürün güncellendi: ${items[index].isim} (${id})`);

  // Güncellenen ürünü ve eski fotoğraf yolunu döndür
  return {
    urun: items[index],
    eskiImagePath
  };
}

/**
 * Bir ürünü siler ve silinen ürünün bilgilerini döndürür.
 * Controller bu bilgiyi kullanarak varsa fotoğrafı da silebilir.
 * @param {string} id - Silinecek ürünün UUID'si
 * @returns {Object|null} Silinen ürün bilgisi veya null (bulunamazsa)
 */
function remove(id) {
  const items = getAll();
  const silinecekUrun = items.find(item => item.id === id);

  if (!silinecekUrun) {
    console.warn(`⚠️  Silinecek ürün bulunamadı: ${id}`);
    return null;
  }

  const filtrelenmis = items.filter(item => item.id !== id);
  saveAll(filtrelenmis);

  console.log(`🗑️  Ürün silindi: ${silinecekUrun.isim} (${id})`);

  // Silinen ürünü döndür (controller fotoğraf silme işlemi için kullanacak)
  return silinecekUrun;
}

// ============================================================
//  DIŞA AKTARIM
// ============================================================

module.exports = {
  getAll,
  saveAll,
  getById,
  getByKategori,
  getKategoriler,
  create,
  update,
  remove
};
