/**
 * Daft Coffee — Internationalization (i18n)
 * ------------------------------------------
 * Lightweight client-side translation system.
 * Supports: TR, EN, ES, DE, RU
 * Default: TR (Turkish)
 *
 * Usage: Add data-i18n="key" to any HTML element.
 * The system will replace its textContent with the
 * matching translation when the language changes.
 */

const I18N = {
  // ── Current language ──
  currentLang: 'tr',

  // ── Translation dictionary ──
  translations: {

    // ═══════════════════════════════════════
    //  NAVIGATION
    // ═══════════════════════════════════════
    'nav.home': {
      tr: 'Ana Sayfa',
      en: 'Home',
      es: 'Inicio',
      de: 'Startseite',
      ru: 'Главная'
    },
    'nav.menu': {
      tr: 'Menü',
      en: 'Menu',
      es: 'Menú',
      de: 'Speisekarte',
      ru: 'Меню'
    },
    'nav.about': {
      tr: 'Hakkımızda',
      en: 'About',
      es: 'Nosotros',
      de: 'Über uns',
      ru: 'О нас'
    },
    'nav.admin': {
      tr: 'Admin',
      en: 'Admin',
      es: 'Admin',
      de: 'Admin',
      ru: 'Админ'
    },

    // ═══════════════════════════════════════
    //  HERO
    // ═══════════════════════════════════════
    'hero.tagline': {
      tr: 'Zanaatkar kahve deneyimi',
      en: 'Artisan coffee experience',
      es: 'Experiencia de café artesanal',
      de: 'Handwerkliches Kaffeeerlebnis',
      ru: 'Ремесленный кофе'
    },

    // ═══════════════════════════════════════
    //  CAMPAIGNS
    // ═══════════════════════════════════════
    'campaigns.title': {
      tr: 'Kampanyalar',
      en: 'Promotions',
      es: 'Promociones',
      de: 'Aktionen',
      ru: 'Акции'
    },
    'campaigns.soon': {
      tr: 'Çok yakında...',
      en: 'Coming soon...',
      es: 'Muy pronto...',
      de: 'Demnächst...',
      ru: 'Скоро...'
    },
    'campaigns.desc': {
      tr: 'Size özel fırsatlar burada olacak.',
      en: 'Special offers just for you will be here.',
      es: 'Las ofertas especiales para ti estarán aquí.',
      de: 'Sonderangebote nur für Sie werden hier sein.',
      ru: 'Специальные предложения для вас будут здесь.'
    },

    // ═══════════════════════════════════════
    //  SIGNATURE ITEMS
    // ═══════════════════════════════════════
    'signature.title': {
      tr: 'İmza Lezzetlerimiz',
      en: 'Our Signature Flavors',
      es: 'Nuestros Sabores Exclusivos',
      de: 'Unsere Signature-Geschmäcker',
      ru: 'Наши фирменные вкусы'
    },
    'signature.filter.name': {
      tr: 'Daft Filtre',
      en: 'Daft Filter',
      es: 'Daft Filtrado',
      de: 'Daft Filter',
      ru: 'Дафт Фильтр'
    },
    'signature.filter.desc': {
      tr: 'Özenle kavrulmuş spesiyal çekirdeklerden, yumuşak içimli efsanevi klasiğimiz.',
      en: 'Our legendary classic — carefully roasted specialty beans with a smooth finish.',
      es: 'Nuestro clásico legendario — granos especiales tostados con un acabado suave.',
      de: 'Unser legendärer Klassiker — sorgfältig geröstete Spezialbohnen mit sanftem Abgang.',
      ru: 'Наш легендарный классик — тщательно обжаренные зёрна с мягким послевкусием.'
    },
    'signature.cheesecake.name': {
      tr: 'San Sebastian',
      en: 'San Sebastian',
      es: 'San Sebastián',
      de: 'San Sebastian',
      ru: 'Сан-Себастьян'
    },
    'signature.cheesecake.desc': {
      tr: 'Dışı hafif karamelize, içi akışkan krem peynir rüyası; kahvenin en iyi dostu.',
      en: 'Lightly caramelized on the outside, creamy cheese dream inside — coffee\'s best friend.',
      es: 'Ligeramente caramelizado por fuera, cremoso sueño de queso por dentro — el mejor amigo del café.',
      de: 'Außen leicht karamellisiert, innen cremiger Käsetraum — der beste Freund des Kaffees.',
      ru: 'Слегка карамелизированный снаружи, кремовая сырная мечта внутри — лучший друг кофе.'
    },
    'signature.coldbrew.name': {
      tr: 'Daft Cold Brew',
      en: 'Daft Cold Brew',
      es: 'Daft Cold Brew',
      de: 'Daft Cold Brew',
      ru: 'Дафт Колд Брю'
    },
    'signature.coldbrew.desc': {
      tr: '18 saat soğuk suda demlenmiş, asiditesi düşük, buz gibi güçlü bir enerji kaynağı.',
      en: 'Brewed 18 hours in cold water — low acidity, ice-cold, a powerful energy source.',
      es: 'Preparado 18 horas en agua fría — baja acidez, helado, una poderosa fuente de energía.',
      de: '18 Stunden kalt gebrüht — niedrige Säure, eiskalt, eine kraftvolle Energiequelle.',
      ru: '18 часов холодного заваривания — низкая кислотность, ледяной, мощный источник энергии.'
    },

    // ═══════════════════════════════════════
    //  MENU SECTION
    // ═══════════════════════════════════════
    'menu.title': {
      tr: 'Menü',
      en: 'Menu',
      es: 'Menú',
      de: 'Speisekarte',
      ru: 'Меню'
    },
    'menu.subtitle': {
      tr: 'tüm lezzetler bir arada',
      en: 'all flavors in one place',
      es: 'todos los sabores en un solo lugar',
      de: 'alle Geschmäcker an einem Ort',
      ru: 'все вкусы в одном месте'
    },
    'menu.filter.all': {
      tr: 'Tümü',
      en: 'All',
      es: 'Todos',
      de: 'Alle',
      ru: 'Все'
    },
    'menu.filter.coffee': {
      tr: 'Kahve',
      en: 'Coffee',
      es: 'Café',
      de: 'Kaffee',
      ru: 'Кофе'
    },
    'menu.filter.dessert': {
      tr: 'Tatlı',
      en: 'Dessert',
      es: 'Postre',
      de: 'Dessert',
      ru: 'Десерт'
    },
    'menu.filter.cold': {
      tr: 'Soğuk İçecek',
      en: 'Cold Drinks',
      es: 'Bebidas Frías',
      de: 'Kaltgetränke',
      ru: 'Холодные напитки'
    },
    'menu.empty': {
      tr: 'Bu kategoride henüz ürün bulunmamaktadır.',
      en: 'No products in this category yet.',
      es: 'Aún no hay productos en esta categoría.',
      de: 'Noch keine Produkte in dieser Kategorie.',
      ru: 'В этой категории пока нет товаров.'
    },
    'menu.item.defaultdesc': {
      tr: 'Baristalarımızın özel dokunuşlarıyla taze taze.',
      en: 'Freshly crafted with our baristas\' special touch.',
      es: 'Preparado con el toque especial de nuestros baristas.',
      de: 'Frisch zubereitet mit der besonderen Note unserer Baristas.',
      ru: 'Свежеприготовлено с особым подходом наших бариста.'
    },
    'menu.detail': {
      tr: 'Detaylı Bilgi',
      en: 'Details',
      es: 'Detalles',
      de: 'Details',
      ru: 'Подробнее'
    },
    'menu.viewdetail': {
      tr: 'Ürünü İncele →',
      en: 'View Item →',
      es: 'Ver Producto →',
      de: 'Produkt ansehen →',
      ru: 'Подробнее →'
    },

    // ═══════════════════════════════════════
    //  ABOUT SECTION
    // ═══════════════════════════════════════
    'about.title': {
      tr: 'Hakkımızda',
      en: 'About Us',
      es: 'Sobre Nosotros',
      de: 'Über Uns',
      ru: 'О Нас'
    },
    'about.subtitle': {
      tr: 'daft coffee hikayesi',
      en: 'the daft coffee story',
      es: 'la historia de daft coffee',
      de: 'die daft coffee Geschichte',
      ru: 'история daft coffee'
    },
    'about.text': {
      tr: 'Daft Coffee, kahve kültürüne tutkuyla bağlı bir ekibin elinden doğdu. Her fincanda özenle seçilmiş çekirdeklerin, ustaca kavrulmuş aromaların ve samimi bir atmosferin buluştuğu bir deneyim sunuyoruz. Sadeliğin zarafetini ve lezzetin derinliğini bir arada yaşatmak için buradayız.',
      en: 'Daft Coffee was born from a team deeply passionate about coffee culture. In every cup, we offer an experience where carefully selected beans, expertly roasted aromas, and a warm atmosphere come together. We are here to celebrate the elegance of simplicity and the depth of flavor.',
      es: 'Daft Coffee nació de un equipo apasionado por la cultura del café. En cada taza, ofrecemos una experiencia donde granos cuidadosamente seleccionados, aromas tostados con maestría y un ambiente cálido se encuentran. Estamos aquí para celebrar la elegancia de la simplicidad y la profundidad del sabor.',
      de: 'Daft Coffee entstand aus einem Team, das leidenschaftlich der Kaffeekultur verbunden ist. In jeder Tasse bieten wir ein Erlebnis, bei dem sorgfältig ausgewählte Bohnen, meisterhaft geröstete Aromen und eine herzliche Atmosphäre zusammenkommen. Wir sind hier, um die Eleganz der Einfachheit und die Tiefe des Geschmacks zu feiern.',
      ru: 'Daft Coffee был создан командой, страстно увлечённой кофейной культурой. В каждой чашке мы предлагаем опыт, где тщательно отобранные зёрна, мастерски обжаренные ароматы и тёплая атмосфера объединяются. Мы здесь, чтобы отпраздновать элегантность простоты и глубину вкуса.'
    },

    // ═══════════════════════════════════════
    //  FOOTER
    // ═══════════════════════════════════════
    'footer.contact.heading': {
      tr: 'Bize Ulaşın',
      en: 'Contact Us',
      es: 'Contáctenos',
      de: 'Kontakt',
      ru: 'Свяжитесь с нами'
    },
    'footer.address.label': {
      tr: 'Adres',
      en: 'Address',
      es: 'Dirección',
      de: 'Adresse',
      ru: 'Адрес'
    },
    'footer.address.value': {
      tr: 'Alsancak Mahallesi 1480 sokak No:10, İzmir, Türkiye 35220',
      en: 'Alsancak Neighborhood 1480 street No:10, Izmir, Turkey 35220',
      es: 'Barrio Alsancak calle 1480 No:10, Esmirna, Turquía 35220',
      de: 'Alsancak Viertel 1480 Straße Nr:10, Izmir, Türkei 35220',
      ru: 'Район Алсанджак 1480 улица №:10, Измир, Турция 35220'
    },
    'footer.phone.label': {
      tr: 'Telefon',
      en: 'Phone',
      es: 'Teléfono',
      de: 'Telefon',
      ru: 'Телефон'
    },
    'footer.hours.label': {
      tr: 'Çalışma Saatleri',
      en: 'Working Hours',
      es: 'Horario',
      de: 'Öffnungszeiten',
      ru: 'Время работы'
    },
    'footer.hours.value': {
      tr: 'Pzt - Cmt: 10:00 - 22:00 | Pazar: 12:00 - 21:00',
      en: 'Mon - Sat: 10:00 - 22:00 | Sun: 12:00 - 21:00',
      es: 'Lun - Sáb: 10:00 - 22:00 | Dom: 12:00 - 21:00',
      de: 'Mo - Sa: 10:00 - 22:00 | So: 12:00 - 21:00',
      ru: 'Пн - Сб: 10:00 - 22:00 | Вс: 12:00 - 21:00'
    },
    'footer.phone.value': {
      tr: '0537 995 73 52',
      en: '0537 995 73 52',
      es: '0537 995 73 52',
      de: '0537 995 73 52',
      ru: '0537 995 73 52'
    },
    'footer.social': {
      tr: 'Takip Edin',
      en: 'Follow Us',
      es: 'Síguenos',
      de: 'Folgen Sie uns',
      ru: 'Подписывайтесь'
    },
    'footer.directions': {
      tr: 'Konuma Git',
      en: 'Get Directions',
      es: 'Cómo Llegar',
      de: 'Route Planen',
      ru: 'Маршрут'
    }
  },

  // ═══════════════════════════════════════
  //  METHODS
  // ═══════════════════════════════════════

  /**
   * Get a translation by key for the current language.
   */
  t(key) {
    const entry = this.translations[key];
    if (!entry) return key;
    return entry[this.currentLang] || entry['tr'] || key;
  },

  /**
   * Apply translations to all elements with [data-i18n].
   */
  applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const text = this.t(key);
      if (text) {
        el.textContent = text;
      }
    });

    // Update the html lang attribute
    document.documentElement.lang = this.currentLang;

    // Update the active language display
    const activeLangEl = document.getElementById('langActive');
    if (activeLangEl) {
      activeLangEl.textContent = this.currentLang.toUpperCase();
    }

    // Mark active option in inline switcher
    document.querySelectorAll('.lang-opt').forEach(opt => {
      opt.classList.toggle('active', opt.getAttribute('data-lang') === this.currentLang);
    });
  },

  /**
   * Switch to a new language.
   */
  setLanguage(lang) {
    this.currentLang = lang;
    localStorage.setItem('daft-lang', lang);
    this.applyTranslations();
  },

  /**
   * Initialize: load saved language or default to TR.
   */
  init() {
    // Load from localStorage, default to 'tr'
    const saved = localStorage.getItem('daft-lang');
    this.currentLang = saved || 'tr';
    this.applyTranslations();

    // Language option clicks (inline switcher)
    document.querySelectorAll('.lang-opt').forEach(opt => {
      opt.addEventListener('click', () => {
        const lang = opt.getAttribute('data-lang');
        this.setLanguage(lang);
      });
    });
  }
};

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => I18N.init());
