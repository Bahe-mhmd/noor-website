// ═══════════════════════════════════════════════════
// NOOR — i18n.js: Multi-Language Translation System
// Languages: English, Arabic, French, Turkish, Urdu, Indonesian
// ═══════════════════════════════════════════════════

export const LANGUAGES = [
  { code: 'en', label: 'English',    native: 'English',    dir: 'ltr', flag: '🇬🇧' },
  { code: 'ar', label: 'Arabic',     native: 'العربية',    dir: 'rtl', flag: '🇸🇦' },
  { code: 'fr', label: 'French',     native: 'Français',   dir: 'ltr', flag: '🇫🇷' },
  { code: 'tr', label: 'Turkish',    native: 'Türkçe',     dir: 'ltr', flag: '🇹🇷' },
  { code: 'ur', label: 'Urdu',       native: 'اردو',       dir: 'rtl', flag: '🇵🇰' },
  { code: 'id', label: 'Indonesian', native: 'Indonesia',  dir: 'ltr', flag: '🇮🇩' },
];

// RTL languages
export const RTL_LANGS = ['ar', 'ur'];

// All UI strings — add new keys here, translate in all 6 langs
export const T = {

  // ── Sidebar ──
  'nav.main':        { en:'Main',          ar:'الرئيسية',      fr:'Principal',     tr:'Ana',         ur:'مرکزی',       id:'Utama'        },
  'nav.tools':       { en:'Tools',         ar:'أدوات',         fr:'Outils',        tr:'Araçlar',     ur:'ٹولز',         id:'Alat'         },
  'nav.resources':   { en:'Resources',     ar:'الموارد',       fr:'Ressources',    tr:'Kaynaklar',   ur:'وسائل',       id:'Sumber'       },
  'nav.home':        { en:'Home',          ar:'الرئيسية',      fr:'Accueil',       tr:'Ana Sayfa',   ur:'ہوم',          id:'Beranda'      },
  'nav.categories':  { en:'Categories',    ar:'الأقسام',       fr:'Catégories',    tr:'Kategoriler', ur:'زمرے',         id:'Kategori'     },
  'nav.prayer':      { en:'Prayer Times',  ar:'مواقيت الصلاة', fr:'Horaires',      tr:'Namaz Vakti', ur:'نماز کے اوقات',id:'Waktu Shalat' },
  'nav.quran':       { en:'Quran Reader',  ar:'القرآن الكريم', fr:'Le Coran',      tr:'Kuran',       ur:'قرآن کریم',   id:'Quran'        },
  'nav.dhikr':       { en:'Dhikr & Duas',  ar:'الأذكار والأدعية',fr:'Dhikr & Douâs',tr:'Zikir & Dualar',ur:'ذکر و دعا', id:'Dzikir & Doa' },
  'nav.calendar':    { en:'Islamic Calendar',ar:'التقويم الهجري',fr:'Calendrier',   tr:'Takvim',      ur:'اسلامی تقویم', id:'Kalender Islam'},
  'nav.zakat':       { en:'Zakat Calculator',ar:'حاسبة الزكاة',fr:'Calculateur Zakat',tr:'Zekat Hesabı',ur:'زکوٰۃ کیلکولیٹر',id:'Kalkulator Zakat'},
  'nav.tasbih':      { en:'Tasbih Counter',ar:'عداد التسبيح',  fr:'Compteur Tasbih',tr:'Tesbih Sayacı',ur:'تسبیح کاؤنٹر',id:'Penghitung Tasbih'},
  'nav.names':       { en:'99 Names',      ar:'أسماء الله الحسنى',fr:'99 Noms',    tr:'99 İsim',     ur:'اللہ کے ۹۹ نام',id:'99 Nama Allah'},
  'nav.halal':       { en:'Halal Checker', ar:'فحص الحلال',    fr:'Vérif. Halal',  tr:'Helal Kontrol',ur:'حلال چیکر',  id:'Cek Halal'    },
  'nav.ramadan':     { en:'Ramadan',       ar:'رمضان',         fr:'Ramadan',       tr:'Ramazan',     ur:'رمضان',        id:'Ramadan'      },
  'nav.daily':       { en:'Verse of Day',  ar:'آية اليوم',     fr:'Verset du Jour',tr:'Günün Ayeti', ur:'آیت روز',      id:'Ayat Harian'  },
  'nav.duagen':      { en:'AI Dua Generator',ar:'مولّد الأدعية',fr:'Générateur Dua',tr:'Dua Üretici',ur:'دعا جنریٹر',  id:'Generator Doa'},
  'nav.mirath':      { en:'Inheritance',   ar:'المواريث',      fr:'Héritage',      tr:'Miras',       ur:'وراثت',        id:'Warisan'      },
  'nav.sources':     { en:'Trusted Sources',ar:'المصادر الموثوقة',fr:'Sources fiables',tr:'Güvenilir Kaynaklar',ur:'قابل اعتماد ذرائع',id:'Sumber Terpercaya'},
  'nav.about':       { en:'About Noor',    ar:'عن نور',        fr:'À propos',      tr:'Hakkında',    ur:'نور کے بارے میں',id:'Tentang Noor'},

  // ── Common ──
  'common.loading':  { en:'Loading...',    ar:'جار التحميل...', fr:'Chargement...', tr:'Yükleniyor...',ur:'لوڈ ہو رہا ہے...',id:'Memuat...'},
  'common.error':    { en:'Error. Try again.',ar:'خطأ. حاول مجدداً.',fr:'Erreur. Réessayez.',tr:'Hata. Tekrar deneyin.',ur:'خطا۔ دوبارہ کوشش کریں۔',id:'Error. Coba lagi.'},
  'common.ummah':    { en:'Built for the Ummah',ar:'صُنع للأمة',fr:'Pour l\'Oumma',tr:'Ümmet için',ur:'امت کے لیے',id:'Untuk Umat'},
  'common.allahu':   { en:'والله أعلم',   ar:'والله أعلم',    fr:'والله أعلم',    tr:'والله أعلم',  ur:'والله أعلم',   id:'والله أعلم'   },
  'common.calculate':{ en:'Calculate',    ar:'احسب',          fr:'Calculer',      tr:'Hesapla',     ur:'حساب کریں',   id:'Hitung'       },
  'common.reset':    { en:'Reset',        ar:'إعادة',         fr:'Réinitialiser', tr:'Sıfırla',     ur:'دوبارہ ترتیب', id:'Reset'        },
  'common.search':   { en:'Search...',    ar:'ابحث...',        fr:'Rechercher...',  tr:'Ara...',      ur:'تلاش کریں...',  id:'Cari...'      },
  'common.check':    { en:'Check',        ar:'فحص',           fr:'Vérifier',      tr:'Kontrol Et',  ur:'چیک کریں',    id:'Periksa'      },
  'common.generate': { en:'Generate',     ar:'توليد',         fr:'Générer',       tr:'Oluştur',     ur:'تیار کریں',   id:'Buat'         },
  'common.copy':     { en:'Copy',         ar:'نسخ',           fr:'Copier',        tr:'Kopyala',     ur:'کاپی کریں',   id:'Salin'        },
  'common.share':    { en:'Share',        ar:'مشاركة',        fr:'Partager',      tr:'Paylaş',      ur:'شیئر کریں',   id:'Bagikan'      },
  'common.day':      { en:'Day',          ar:'يوم',           fr:'Jour',          tr:'Gün',         ur:'دن',           id:'Hari'         },
  'common.days':     { en:'days',         ar:'أيام',          fr:'jours',         tr:'gün',         ur:'دن',           id:'hari'         },
  'common.next':     { en:'Next Prayer',  ar:'الصلاة القادمة', fr:'Prochain',     tr:'Sonraki',     ur:'اگلی نماز',   id:'Shalat Berikutnya'},

  // ── Ramadan Page ──
  'ramadan.title':   { en:'Ramadan Tracker',ar:'متتبع رمضان',fr:'Suivi Ramadan',  tr:'Ramazan Takip',ur:'رمضان ٹریکر',id:'Pelacak Ramadan'},
  'ramadan.desc':    { en:'Countdown, fasting tracker, Suhoor & Iftar times.',ar:'العد التنازلي وتتبع الصيام وأوقات السحور والإفطار.',fr:'Compte à rebours, suivi du jeûne.',tr:'Geri sayım ve oruç takibi.',ur:'الٹی گنتی اور افطار کے اوقات۔',id:'Hitung mundur dan jadwal sahur-iftar.'},
  'ramadan.countdown':{ en:'Days until Ramadan',ar:'أيام حتى رمضان',fr:'Jours avant Ramadan',tr:'Ramazana kalan gün',ur:'رمضان تک دن',id:'Hari menuju Ramadan'},
  'ramadan.in_progress':{ en:'Ramadan is here! 🌙',ar:'رمضان كريم! 🌙',fr:'Ramadan est là! 🌙',tr:'Ramazan geldi! 🌙',ur:'رمضان مبارک! 🌙',id:'Ramadan telah tiba! 🌙'},
  'ramadan.day_of':  { en:'Day',          ar:'اليوم',         fr:'Jour',          tr:'Gün',         ur:'دن',           id:'Hari'         },
  'ramadan.suhoor':  { en:'Suhoor ends',  ar:'ينتهي السحور',  fr:'Fin Suhoor',    tr:'Sahur biter', ur:'سحری ختم',    id:'Sahur berakhir'},
  'ramadan.iftar':   { en:'Iftar time',   ar:'موعد الإفطار',  fr:'Heure Iftar',   tr:'İftar vakti', ur:'افطار کا وقت', id:'Waktu Iftar'  },
  'ramadan.fasted':  { en:'Days fasted',  ar:'أيام صمت',      fr:'Jours jeûnés',  tr:'Tutulan oruç',ur:'روزے رکھے',   id:'Hari berpuasa' },
  'ramadan.log':     { en:'Log today',    ar:'سجّل اليوم',    fr:'Journaliser',   tr:'Kaydet',      ur:'آج درج کریں', id:'Catat hari ini'},
  'ramadan.fasted_btn':{ en:'✅ I Fasted', ar:'✅ صمت اليوم',fr:'✅ J\'ai jeûné', tr:'✅ Oruç tuttum',ur:'✅ روزہ رکھا',id:'✅ Saya Berpuasa'},
  'ramadan.not_fasted':{ en:'❌ Not Today',ar:'❌ لم أصم',    fr:'❌ Pas aujourd\'hui',tr:'❌ Bugün değil',ur:'❌ آج نہیں', id:'❌ Tidak Hari Ini'},
  'ramadan.laylatul':{ en:'Laylatul Qadr Watch',ar:'ترقب ليلة القدر',fr:'Laylat al-Qadr',tr:'Kadir Gecesi',ur:'لیلۃ القدر',id:'Malam Lailatul Qadar'},
  'ramadan.last10':  { en:'Last 10 nights of Ramadan — seek Laylatul Qadr',ar:'الليالي العشر الأخيرة — ابحث عن ليلة القدر',fr:'10 dernières nuits — cherchez Laylat al-Qadr',tr:'Son 10 gece — Kadir Gecesini ara',ur:'آخری ۱۰ راتیں — لیلۃ القدر تلاش کریں',id:'10 malam terakhir — cari Laylatul Qadar'},

  // ── Daily Verse ──
  'daily.title':     { en:'Verse & Hadith of the Day',ar:'آية وحديث اليوم',fr:'Verset & Hadith du Jour',tr:'Günün Ayeti & Hadisi',ur:'آج کی آیت اور حدیث',id:'Ayat & Hadits Hari Ini'},
  'daily.desc':      { en:'A new Quran verse and authentic hadith every day.',ar:'آية قرآنية وحديث صحيح كل يوم.',fr:'Un verset et un hadith authentique chaque jour.',tr:'Her gün yeni bir ayet ve sahih hadis.',ur:'ہر روز ایک قرآنی آیت اور صحیح حدیث۔',id:'Ayat Quran dan hadits shahih setiap hari.'},
  'daily.verse':     { en:'Verse of the Day',ar:'آية اليوم',fr:'Verset du Jour',tr:'Günün Ayeti',ur:'آج کی آیت',id:'Ayat Hari Ini'},
  'daily.hadith':    { en:'Hadith of the Day',ar:'حديث اليوم',fr:'Hadith du Jour',tr:'Günün Hadisi',ur:'آج کی حدیث',id:'Hadits Hari Ini'},
  'daily.reflection':{ en:'Reflection',  ar:'تأمل',          fr:'Réflexion',     tr:'Yansıma',     ur:'غور و فکر',   id:'Renungan'     },
  'daily.new':       { en:'New verse tomorrow',ar:'آية جديدة غداً',fr:'Nouveau verset demain',tr:'Yarın yeni ayet',ur:'کل نئی آیت',id:'Ayat baru besok'},

  // ── Dua Generator ──
  'dua.title':       { en:'AI Dua Generator',ar:'مولّد الأدعية بالذكاء الاصطناعي',fr:'Générateur de Doua IA',tr:'AI Dua Üretici',ur:'AI دعا جنریٹر',id:'Generator Doa AI'},
  'dua.desc':        { en:'Describe your need and receive a personalized dua from scholarly sources.',ar:'صف حاجتك واحصل على دعاء مخصص من المصادر العلمية.',fr:'Décrivez votre besoin et recevez une douâ personnalisée.',tr:'İhtiyacınızı anlatın, kişisel bir dua alın.',ur:'اپنی ضرورت بیان کریں اور ذاتی دعا حاصل کریں۔',id:'Ceritakan kebutuhan Anda dan dapatkan doa yang dipersonalisasi.'},
  'dua.placeholder': { en:'Describe your situation (e.g. I have an exam tomorrow, seeking guidance)',ar:'صف حالتك (مثل: لدي امتحان غداً، أبحث عن توجيه)',fr:'Décrivez votre situation',tr:'Durumunuzu anlatın',ur:'اپنی صورتحال بیان کریں',id:'Ceritakan situasi Anda'},
  'dua.categories':  { en:'Quick Categories',ar:'فئات سريعة',fr:'Catégories rapides',tr:'Hızlı kategoriler',ur:'فوری زمرے',id:'Kategori Cepat'},
  'dua.generating':  { en:'Generating your dua...',ar:'جار توليد دعائك...',fr:'Génération de votre douâ...',tr:'Duanız oluşturuluyor...',ur:'آپ کی دعا تیار ہو رہی ہے...',id:'Membuat doa Anda...'},
  'dua.arabic':      { en:'Arabic',      ar:'عربي',          fr:'Arabe',          tr:'Arapça',      ur:'عربی',         id:'Arab'         },
  'dua.transliteration':{ en:'Transliteration',ar:'النطق',  fr:'Translitération',tr:'Telaffuz',     ur:'تلفظ',         id:'Transliterasi'},
  'dua.meaning':     { en:'Meaning',     ar:'المعنى',        fr:'Signification',  tr:'Anlam',       ur:'معنی',         id:'Arti'         },
  'dua.source':      { en:'Source',      ar:'المصدر',        fr:'Source',         tr:'Kaynak',      ur:'ماخذ',         id:'Sumber'       },
  'dua.disclaimer':  { en:'This dua is generated as a reference. Always verify with a qualified scholar.',ar:'هذا الدعاء للمرجعية فقط. تحقق دائماً مع عالم مؤهل.',fr:'Cette douâ est générée à titre de référence.',tr:'Bu dua referans amaçlıdır.',ur:'یہ دعا صرف حوالے کے لیے ہے۔',id:'Doa ini dibuat sebagai referensi.'},

  // ── Mirath (Inheritance) ──
  'mirath.title':    { en:'Inheritance Calculator',ar:'حاسبة المواريث',fr:'Calculateur d\'Héritage',tr:'Miras Hesabı',ur:'وراثت کیلکولیٹر',id:'Kalkulator Warisan'},
  'mirath.desc':     { en:'Calculate Islamic inheritance (Mirath) based on Quran and Sunnah.',ar:'احسب الميراث الإسلامي بناءً على القرآن والسنة.',fr:'Calculez l\'héritage islamique selon le Coran.',tr:'Kuran ve Sünnete göre miras hesabı.',ur:'قرآن و سنت کے مطابق اسلامی وراثت کا حساب۔',id:'Hitung warisan Islam berdasarkan Quran dan Sunnah.'},
  'mirath.estate':   { en:'Total Estate Value',ar:'إجمالي قيمة التركة',fr:'Valeur totale de la succession',tr:'Toplam miras değeri',ur:'کل ترکہ کی قیمت',id:'Total nilai harta warisan'},
  'mirath.debts':    { en:'Debts & Funeral Expenses',ar:'الديون ومصاريف الجنازة',fr:'Dettes et frais funéraires',tr:'Borçlar ve cenaze masrafları',ur:'قرضے اور جنازے کے اخراجات',id:'Hutang & biaya pemakaman'},
  'mirath.heirs':    { en:'Select Heirs',ar:'حدد الورثة',fr:'Sélectionner les héritiers',tr:'Varisleri seçin',ur:'وارثین منتخب کریں',id:'Pilih ahli waris'},
  'mirath.spouse':   { en:'Spouse',      ar:'الزوج/ة',       fr:'Conjoint(e)',    tr:'Eş',          ur:'شریک حیات',   id:'Pasangan'     },
  'mirath.sons':     { en:'Sons',        ar:'الأبناء',       fr:'Fils',          tr:'Oğullar',     ur:'بیٹے',         id:'Anak laki-laki'},
  'mirath.daughters':{ en:'Daughters',   ar:'البنات',        fr:'Filles',        tr:'Kızlar',      ur:'بیٹیاں',       id:'Anak perempuan'},
  'mirath.father':   { en:'Father alive',ar:'الأب على قيد الحياة',fr:'Père vivant',tr:'Baba hayatta',ur:'والد زندہ ہیں',id:'Ayah masih hidup'},
  'mirath.mother':   { en:'Mother alive',ar:'الأم على قيد الحياة',fr:'Mère vivante',tr:'Anne hayatta',ur:'والدہ زندہ ہیں',id:'Ibu masih hidup'},
  'mirath.husband':  { en:'Husband',     ar:'الزوج',         fr:'Mari',          tr:'Koca',        ur:'شوہر',         id:'Suami'        },
  'mirath.wife':     { en:'Wife/Wives',  ar:'الزوجة/الزوجات',fr:'Femme(s)',      tr:'Eş(ler)',     ur:'بیوی/بیویاں', id:'Istri'        },
  'mirath.result':   { en:'Distribution Result',ar:'نتيجة التوزيع',fr:'Résultat de la distribution',tr:'Dağıtım sonucu',ur:'تقسیم کا نتیجہ',id:'Hasil pembagian'},
  'mirath.share':    { en:'Share',       ar:'النصيب',        fr:'Part',          tr:'Pay',         ur:'حصہ',          id:'Bagian'       },
  'mirath.fraction': { en:'Fraction',    ar:'الكسر',         fr:'Fraction',      tr:'Kesir',       ur:'کسر',          id:'Pecahan'      },
  'mirath.amount':   { en:'Amount',      ar:'المبلغ',        fr:'Montant',       tr:'Miktar',      ur:'رقم',          id:'Jumlah'       },
  'mirath.reference':{ en:'Quranic Reference',ar:'المرجع القرآني',fr:'Référence coranique',tr:'Kuran referansı',ur:'قرآنی حوالہ',id:'Referensi Quran'},
};

/**
 * Get a translated string.
 * Usage: t('nav.home', lang)  →  "Home" / "الرئيسية" / etc.
 * Falls back to 'en' if the lang key doesn't exist.
 */
export function t(key, lang = 'en') {
  const entry = T[key];
  if (!entry) return key; // Return key as fallback
  return entry[lang] || entry['en'] || key;
}

/** Check if a language is RTL */
export function isRTL(lang) {
  return RTL_LANGS.includes(lang);
}

/** Get font family for a language */
export function getFontFamily(lang) {
  if (lang === 'ar' || lang === 'ur') return "'Harmattan','IBM Plex Sans Arabic',sans-serif";
  return "'Outfit',sans-serif";
}
