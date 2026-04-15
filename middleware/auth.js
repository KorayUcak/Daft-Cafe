/**
 * Admin Şifre Koruma Middleware'i
 * ------------------------------------------
 * .env'den okunan ADMIN_PASSWORD ile session tabanlı
 * basit şifre kontrolü yapar.
 * 
 * Giriş yapılmamışsa → /admin/giris sayfasına yönlendirir.
 * Giriş yapılmışsa → next() ile devam eder.
 */

/**
 * Admin oturumunu kontrol eder.
 * Session'da adminAuth flag'i yoksa login sayfasına yönlendirir.
 */
function adminAuth(req, res, next) {
  if (req.session && req.session.adminAuth === true) {
    return next();
  }
  // Giriş yapılmamış — login sayfasına yönlendir
  res.redirect('/admin/giris');
}

/**
 * Giriş sayfasını gösterir (GET /admin/giris).
 */
function girisFormu(req, res) {
  const hata = req.query.hata || null;
  res.render('admin/giris', {
    title: 'Admin Girişi - Daft Coffee',
    hata
  });
}

/**
 * Şifreyi kontrol eder (POST /admin/giris).
 * Doğruysa session'a flag yazar ve admin paneline yönlendirir.
 */
function girisYap(req, res) {
  const { sifre } = req.body;
  const dogruSifre = process.env.ADMIN_PASSWORD || 'daft2024';

  if (sifre === dogruSifre) {
    req.session.adminAuth = true;
    console.log('🔓 Admin girişi başarılı');
    res.redirect('/admin');
  } else {
    console.warn('🔒 Hatalı admin şifre denemesi');
    res.redirect('/admin/giris?hata=Şifre hatalı. Lütfen tekrar deneyin.');
  }
}

/**
 * Oturumu sonlandırır (GET /admin/cikis).
 */
function cikisYap(req, res) {
  req.session.destroy((err) => {
    if (err) {
      console.error('Session silme hatası:', err);
    }
    console.log('🔒 Admin çıkış yaptı');
    res.redirect('/');
  });
}

module.exports = {
  adminAuth,
  girisFormu,
  girisYap,
  cikisYap
};
