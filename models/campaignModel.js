const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const dataPath = path.join(__dirname, '..', 'data', 'campaigns.json');

// ============================================================
//  YARDIMCI FONKSİYONLAR
// ============================================================

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

function getAll() {
  try {
    ensureDataFile();
    const raw = fs.readFileSync(dataPath, 'utf-8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error('❌ campaigns.json okuma hatası:', err.message);
    return [];
  }
}

function saveAll(items) {
  try {
    ensureDataFile();
    fs.writeFileSync(dataPath, JSON.stringify(items, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('❌ campaigns.json yazma hatası:', err.message);
    return false;
  }
}

function getById(id) {
  const items = getAll();
  const campaign = items.find(item => item.id === id);
  return campaign || null;
}

function create(campaignData) {
  const items = getAll();

  const yeniKampanya = {
    id: uuidv4(),
    isim: campaignData.isim ? campaignData.isim.trim() : '',
    description: campaignData.description ? campaignData.description.trim() : '',
    fiyat: parseFloat(campaignData.fiyat) || 0,
    imagePath: campaignData.imagePath || null,
    olusturmaTarihi: new Date().toISOString()
  };

  items.push(yeniKampanya);
  saveAll(items);

  console.log(`✅ Yeni kampanya oluşturuldu: ${yeniKampanya.isim} (${yeniKampanya.id})`);
  return yeniKampanya;
}

function remove(id) {
  const items = getAll();
  const silinecekKampanya = items.find(item => item.id === id);

  if (!silinecekKampanya) {
    console.warn(`⚠️  Silinecek kampanya bulunamadı: ${id}`);
    return null;
  }

  const filtrelenmis = items.filter(item => item.id !== id);
  saveAll(filtrelenmis);

  console.log(`🗑️  Kampanya silindi: ${silinecekKampanya.isim} (${id})`);
  return silinecekKampanya;
}

module.exports = {
  getAll,
  saveAll,
  getById,
  create,
  remove
};
