// ═══════════════════════════════════════════════════
// NOOR — i18n.js  ·  Complete translation system
// Every UI string for every page in all 6 languages
// ═══════════════════════════════════════════════════

export const LANGUAGES = [
  { code:'en', label:'English',    native:'English',   dir:'ltr', flag:'🇬🇧' },
  { code:'ar', label:'Arabic',     native:'العربية',   dir:'rtl', flag:'🇹🇳' },
  { code:'fr', label:'French',     native:'Français',  dir:'ltr', flag:'🇫🇷' },
  { code:'tr', label:'Turkish',    native:'Türkçe',    dir:'ltr', flag:'🇹🇷' },
  { code:'ur', label:'Urdu',       native:'اردو',      dir:'rtl', flag:'🇵🇰' },
  { code:'id', label:'Indonesian', native:'Indonesia', dir:'ltr', flag:'🇮🇩' },
];

export const RTL_LANGS = ['ar','ur'];

export function isRTL(lang) { return RTL_LANGS.includes(lang); }
export function getFontFamily(lang) {
  return (lang==='ar'||lang==='ur') ? "'Harmattan','IBM Plex Sans Arabic',sans-serif" : "'Outfit',sans-serif";
}

// ── Full translation table ──
const T = {
  // ── Sidebar ──
  'nav.main':         { en:'Main',              ar:'الرئيسية',           fr:'Principal',             tr:'Ana',               ur:'مرکزی',              id:'Utama'              },
  'nav.tools':        { en:'Tools',             ar:'أدوات',              fr:'Outils',                tr:'Araçlar',           ur:'ٹولز',                id:'Alat'               },
  'nav.new':          { en:'New',               ar:'جديد',               fr:'Nouveau',               tr:'Yeni',              ur:'نیا',                 id:'Baru'               },
  'nav.resources':    { en:'Resources',         ar:'الموارد',            fr:'Ressources',            tr:'Kaynaklar',         ur:'وسائل',              id:'Sumber'             },
  'nav.home':         { en:'Home',              ar:'الرئيسية',           fr:'Accueil',               tr:'Ana Sayfa',         ur:'ہوم',                 id:'Beranda'            },
  'nav.categories':   { en:'Categories',        ar:'الأقسام',            fr:'Catégories',            tr:'Kategoriler',       ur:'زمرے',                id:'Kategori'           },
  'nav.prayer':       { en:'Prayer Times',      ar:'مواقيت الصلاة',      fr:'Horaires Prière',       tr:'Namaz Vakti',       ur:'نماز اوقات',         id:'Waktu Shalat'       },
  'nav.quran':        { en:'Quran Reader',      ar:'القرآن الكريم',      fr:'Lecteur Coran',         tr:'Kuran',             ur:'قرآن کریم',          id:'Quran'              },
  'nav.dhikr':        { en:'Dhikr & Duas',      ar:'الأذكار والأدعية',   fr:'Dhikr & Douâs',         tr:'Zikir & Dualar',    ur:'ذکر و دعا',          id:'Dzikir & Doa'       },
  'nav.calendar':     { en:'Islamic Calendar',  ar:'التقويم الهجري',     fr:'Calendrier Islamique',  tr:'İslami Takvim',     ur:'اسلامی تقویم',       id:'Kalender Islam'     },
  'nav.zakat':        { en:'Zakat Calculator',  ar:'حاسبة الزكاة',       fr:'Calculateur Zakat',     tr:'Zekat Hesabı',      ur:'زکوٰۃ کیلکولیٹر',    id:'Kalkulator Zakat'   },
  'nav.tasbih':       { en:'Tasbih Counter',    ar:'عداد التسبيح',       fr:'Compteur Tasbih',       tr:'Tesbih Sayacı',     ur:'تسبیح کاؤنٹر',       id:'Penghitung Tasbih'  },
  'nav.names':        { en:'99 Names',          ar:'أسماء الله الحسنى',  fr:'99 Noms d\'Allah',      tr:'99 İsim',           ur:'اللہ کے ۹۹ نام',     id:'99 Nama Allah'      },
  'nav.halal':        { en:'Halal Checker',     ar:'فحص الحلال',         fr:'Vérificateur Halal',    tr:'Helal Kontrol',     ur:'حلال چیکر',          id:'Cek Halal'          },
  'nav.ramadan':      { en:'Ramadan',           ar:'رمضان',              fr:'Ramadan',               tr:'Ramazan',           ur:'رمضان',               id:'Ramadan'            },
  'nav.daily':        { en:'Daily Verse',       ar:'آية اليوم',          fr:'Verset Quotidien',      tr:'Günün Ayeti',       ur:'آج کی آیت',          id:'Ayat Harian'        },
  'nav.duagen':       { en:'Dua Companion',     ar:'رفيق الدعاء',        fr:'Guide de Douâ',         tr:'Dua Rehberi',       ur:'دعا رہنما',          id:'Teman Doa'          },
  'nav.mirath':       { en:'Inheritance',       ar:'المواريث',           fr:'Héritage Islamique',    tr:'Miras Hesabı',      ur:'وراثت',               id:'Warisan Islam'      },
  'nav.sources':      { en:'Trusted Sources',   ar:'المصادر الموثوقة',   fr:'Sources Fiables',       tr:'Güvenilir Kaynaklar',ur:'قابل اعتماد ذرائع', id:'Sumber Terpercaya'  },
  'nav.videos':     { en:'Video Library',    ar:'مكتبة الفيديو',    fr:'Vidéothèque',      tr:'Video Kütüphanesi',ur:'ویڈیو لائبریری',   id:'Perpustakaan Video' },
  'nav.about':        { en:'About Noor',        ar:'عن نور',             fr:'À propos de Noor',      tr:'Noor Hakkında',     ur:'نور کے بارے میں',    id:'Tentang Noor'       },
  'common.theme':     { en:'Theme',             ar:'المظهر',             fr:'Thème',                 tr:'Tema',              ur:'تھیم',                id:'Tema'               },
  'common.next_prayer':{ en:'Next Prayer',      ar:'الصلاة القادمة',     fr:'Prochaine Prière',      tr:'Sonraki Namaz',     ur:'اگلی نماز',          id:'Shalat Berikutnya'  },
  'common.ummah':     { en:'Built for the Ummah', ar:'صُنع للأمة',      fr:"Pour l'Oumma",          tr:'Ümmet için',        ur:'امت کے لیے',         id:'Untuk Umat'         },
  'common.loading':   { en:'Loading...',        ar:'جار التحميل...',     fr:'Chargement...',         tr:'Yükleniyor...',     ur:'لوڈ ہو رہا ہے...',   id:'Memuat...'          },
  'common.error':     { en:'Error. Try again.', ar:'خطأ. حاول مجدداً.',  fr:'Erreur. Réessayez.',    tr:'Hata. Tekrar deneyin.', ur:'خطا۔ دوبارہ کوشش کریں۔', id:'Error. Coba lagi.' },
  'common.search':    { en:'Search...',         ar:'ابحث...',            fr:'Rechercher...',         tr:'Ara...',            ur:'تلاش کریں...',       id:'Cari...'            },
  'common.calculate': { en:'Calculate',         ar:'احسب',              fr:'Calculer',              tr:'Hesapla',           ur:'حساب کریں',          id:'Hitung'             },
  'common.copy':      { en:'Copy',              ar:'نسخ',               fr:'Copier',                tr:'Kopyala',           ur:'کاپی کریں',          id:'Salin'              },
  'common.share':     { en:'Share',             ar:'مشاركة',            fr:'Partager',              tr:'Paylaş',            ur:'شیئر کریں',          id:'Bagikan'            },
  'common.generate':  { en:'Generate',          ar:'توليد',             fr:'Générer',               tr:'Oluştur',           ur:'تیار کریں',          id:'Buat'               },
  'common.back':      { en:'Back',              ar:'عودة',              fr:'Retour',                tr:'Geri',              ur:'واپس',                id:'Kembali'            },
  'common.sources':   { en:'Sources',           ar:'مصادر',             fr:'Sources',               tr:'Kaynaklar',         ur:'ذرائع',              id:'Sumber'             },
  'common.scholars':  { en:'References scholars — does not issue fatwas. Covers all madhahib.', ar:'يستشهد بالعلماء — لا يصدر فتاوى. يشمل جميع المذاهب.', fr:'Référence des savants — ne délivre pas de fatwas.', tr:'Alimlere atıfta bulunur — fetva vermez. Tüm mezhepler.', ur:'علماء کا حوالہ دیتا ہے — فتوی جاری نہیں کرتا۔', id:'Merujuk ulama — tidak mengeluarkan fatwa. Semua mazhab.' },
  'common.verses':    { en:'verses',            ar:'آية',               fr:'versets',               tr:'ayet',              ur:'آیات',               id:'ayat'               },
  'common.days':      { en:'days',              ar:'أيام',              fr:'jours',                 tr:'gün',               ur:'دن',                  id:'hari'               },
  'common.times':     { en:'times',             ar:'مرات',              fr:'fois',                  tr:'kez',               ur:'مرتبہ',               id:'kali'               },

  // ── Home Page ──
  'home.subtitle':    { en:'Find Answers from <br><span class="hl">Trusted Scholars</span>', ar:'ابحث عن إجابات من <br><span class="hl">العلماء الموثوقين</span>', fr:'Trouvez des réponses de <br><span class="hl">savants de confiance</span>', tr:'<span class="hl">Güvenilir Alimler</span>den<br>cevap bulun', ur:'<span class="hl">قابل اعتماد علماء</span> سے<br>جوابات تلاش کریں', id:'Temukan Jawaban dari<br><span class="hl">Ulama Terpercaya</span>' },
  'home.desc':        { en:'Helping Muslims and non-Muslims find authentic Islamic answers with proof, references, and scholarly explanations.', ar:'نساعد المسلمين وغير المسلمين في إيجاد إجابات إسلامية أصيلة بالأدلة والمراجع.', fr:'Aider à trouver des réponses islamiques authentiques avec preuves et références.', tr:'Müslüman ve gayrimüslimlerin delil ve referanslarla otantik İslami cevaplar bulmasına yardımcı olur.', ur:'مسلمانوں اور غیر مسلموں کو دلائل کے ساتھ مستند اسلامی جوابات تلاش کرنے میں مدد۔', id:'Membantu menemukan jawaban Islam yang autentik dengan dalil dan referensi ulama.' },
  'home.stat_sources':{ en:'Sources',          ar:'مصدر',              fr:'Sources',               tr:'Kaynak',            ur:'مصادر',              id:'Sumber'             },
  'home.stat_madh':   { en:'Madhahib',         ar:'مذاهب',             fr:'Madhahib',              tr:'Mezhep',            ur:'مذاہب',              id:'Mazhab'             },
  'home.stat_langs':  { en:'Languages',        ar:'لغات',              fr:'Langues',               tr:'Dil',               ur:'زبانیں',             id:'Bahasa'             },
  'home.ask':         { en:'Ask an Islamic question...', ar:'اسأل سؤالاً إسلامياً...', fr:'Posez une question islamique...', tr:'İslami soru sorun...', ur:'ایک اسلامی سوال پوچھیں...', id:'Ajukan pertanyaan Islam...' },
  'home.sug1_t':      { en:"Traveler's Prayer",ar:'صلاة المسافر',      fr:'Prière du voyageur',    tr:'Yolcu Namazı',      ur:'مسافر کی نماز',      id:'Shalat Musafir'     },
  'home.sug1_d':      { en:'How do I pray when traveling?', ar:'كيف أصلي أثناء السفر؟', fr:'Comment prier en voyage ?', tr:'Seyahatte nasıl namaz kılınır?', ur:'سفر میں نماز کیسے پڑھیں؟', id:'Bagaimana shalat saat bepergian?' },
  'home.sug2_t':      { en:'Surah Al-Kahf',   ar:'سورة الكهف',        fr:'Sourate Al-Kahf',       tr:'Kehf Suresi',       ur:'سورہ الکہف',         id:'Surah Al-Kahf'      },
  'home.sug2_d':      { en:'What is the meaning of Surah Al-Kahf?', ar:'ما معنى سورة الكهف؟', fr:'Quelle est la signification de la sourate Al-Kahf ?', tr:'Kehf Suresinin anlamı nedir?', ur:'سورہ الکہف کا مفہوم کیا ہے؟', id:'Apa makna Surah Al-Kahf?' },
  'home.sug3_t':      { en:'What is Islam?',  ar:'ما هو الإسلام؟',    fr:"Qu'est-ce que l'Islam ?",tr:'İslam nedir?',      ur:'اسلام کیا ہے؟',      id:'Apa itu Islam?'     },
  'home.sug3_d':      { en:'A simple introduction for everyone', ar:'مقدمة بسيطة للجميع', fr:'Une introduction simple pour tous', tr:'Herkes için basit bir giriş', ur:'سب کے لیے ایک آسان تعارف', id:'Pengenalan sederhana untuk semua' },
  'home.sug4_t':      { en:'Credit Cards',    ar:'بطاقات الائتمان',   fr:'Cartes de crédit',      tr:'Kredi Kartları',    ur:'کریڈٹ کارڈ',         id:'Kartu Kredit'       },
  'home.sug4_d':      { en:'Is paying with a credit card permissible?', ar:'هل الدفع ببطاقة الائتمان جائز؟', fr:'Est-il permis de payer par carte de crédit ?', tr:'Kredi kartıyla ödeme caiz midir?', ur:'کریڈٹ کارڈ سے ادائیگی جائز ہے؟', id:'Apakah pembayaran dengan kartu kredit diperbolehkan?' },
  'home.disclaimer':  { en:'This answer is based on scholarly sources and is not a personal fatwa. Seeking knowledge is an obligation upon every Muslim. (Ibn Majah)', ar:'هذه الإجابة مبنية على مصادر علمية وليست فتوى شخصية. طلب العلم فريضة على كل مسلم. (ابن ماجه)', fr:"Cette réponse est basée sur des sources savantes et n'est pas une fatwa. «Chercher la connaissance est une obligation pour tout musulman.» (Ibn Majah)", tr:'Bu cevap bilimsel kaynaklara dayanmaktadır ve kişisel fetva değildir. "İlim öğrenmek her Müslümana farçtır." (İbn Mace)', ur:'یہ جواب علمی ذرائع پر مبنی ہے اور ذاتی فتویٰ نہیں ہے۔ علم حاصل کرنا ہر مسلمان پر فرض ہے۔ (ابن ماجہ)', id:'Jawaban ini berdasarkan sumber ilmiah dan bukan fatwa pribadi. Menuntut ilmu adalah kewajiban setiap Muslim. (Ibn Majah)' },

  // ── Categories ──
  'cats.title':       { en:'Browse Categories',ar:'تصفح الأقسام',      fr:'Parcourir les catégories',tr:'Kategorilere Göz At',ur:'زمروں کو دریافت کریں',id:'Jelajahi Kategori'  },
  'cats.sub':         { en:'Explore Islamic knowledge by topic with multiple scholarly views.', ar:'استكشف المعرفة الإسلامية حسب الموضوع مع آراء علمية متعددة.', fr:'Explorez la connaissance islamique par sujet avec plusieurs points de vue.', tr:'İslami bilgiyi konuya göre keşfedin.', ur:'موضوع کے مطابق اسلامی علم دریافت کریں۔', id:'Jelajahi ilmu Islam berdasarkan topik dengan berbagai pandangan ulama.' },
  'cats.prayer':      { en:'Prayer',          ar:'الصلاة',             fr:'Prière',                tr:'Namaz',             ur:'نماز',               id:'Shalat'             },
  'cats.prayer_sub':  { en:'Salah · Times · Rules', ar:'الصلاة · المواقيت · الأحكام', fr:'Salah · Horaires · Règles', tr:'Namaz · Vakitler · Kurallar', ur:'صلاح · اوقات · احکام', id:'Shalat · Waktu · Hukum' },
  'cats.quran':       { en:'Quran',           ar:'القرآن',             fr:'Coran',                 tr:'Kuran',             ur:'قرآن',               id:'Quran'              },
  'cats.quran_sub':   { en:'Tafseer · Recitation', ar:'التفسير · التلاوة', fr:'Tafseer · Récitation', tr:'Tefsir · Tilavet', ur:'تفسیر · تلاوت',      id:'Tafseer · Tilawah'  },
  'cats.hadith':      { en:'Hadith',          ar:'الحديث',             fr:'Hadith',                tr:'Hadis',             ur:'حدیث',               id:'Hadits'             },
  'cats.hadith_sub':  { en:'Prophetic Traditions', ar:'الأحاديث النبوية', fr:'Traditions Prophétiques', tr:'Hadisler',        ur:'احادیث نبوی',        id:'Tradisi Nabi'       },
  'cats.fiqh':        { en:'Fiqh',            ar:'الفقه',              fr:'Fiqh',                  tr:'Fıkıh',             ur:'فقہ',                 id:'Fikih'              },
  'cats.fiqh_sub':    { en:'All Four Madhahib', ar:'المذاهب الأربعة',  fr:'Les quatre madhahib',   tr:'Dört Mezhep',       ur:'چاروں مذاہب',        id:'Empat Mazhab'       },
  'cats.dua':         { en:'Duas',            ar:'الأدعية',            fr:'Douâs',                 tr:'Dualar',            ur:'دعائیں',             id:'Doa-doa'            },
  'cats.dua_sub':     { en:'Supplications · Adhkar', ar:'الأدعية · الأذكار', fr:'Supplications · Adhkar', tr:'Dualar · Zikirler', ur:'دعائیں · اذکار',   id:'Doa · Dzikir'       },
  'cats.seerah':      { en:'Seerah',          ar:'السيرة',             fr:'Seerah',                tr:'Siyer',             ur:'سیرت',               id:'Sirah'              },
  'cats.seerah_sub':  { en:"Prophet's Life ﷺ", ar:'حياة النبي ﷺ',     fr:'Vie du Prophète ﷺ',    tr:'Hz. Peygamberin Hayatı ﷺ', ur:'نبی ﷺ کی زندگی', id:'Kehidupan Nabi ﷺ'   },
  'cats.intro':       { en:'New to Islam',    ar:'جديد في الإسلام',   fr:'Nouveau en Islam',      tr:'İslama yeni',       ur:'اسلام میں نئے',     id:'Baru Mengenal Islam'},
  'cats.intro_sub':   { en:'Learn the Basics', ar:'تعلّم الأساسيات',  fr:'Apprenez les bases',    tr:'Temelleri öğren',   ur:'بنیادی باتیں سیکھیں',id:'Pelajari Dasar-Dasar'},
  'cats.finance':     { en:'Finance',         ar:'المالية',            fr:'Finance',               tr:'Finans',            ur:'مالیات',             id:'Keuangan'           },
  'cats.finance_sub': { en:'Halal · Zakat · Riba', ar:'حلال · زكاة · ربا', fr:'Halal · Zakat · Riba', tr:'Helal · Zekat · Faiz', ur:'حلال · زکوٰۃ · سود', id:'Halal · Zakat · Riba'},

  // ── Prayer page ──
  'prayer.title':     { en:'Prayer Times',    ar:'مواقيت الصلاة',     fr:'Horaires des Prières',  tr:'Namaz Vakitleri',   ur:'نماز کے اوقات',      id:'Waktu Shalat'       },
  'prayer.sub':       { en:'Accurate prayer times based on your GPS location.', ar:'أوقات الصلاة الدقيقة بناءً على موقعك.', fr:'Horaires de prière précis basés sur votre position GPS.', tr:'GPS konumunuza göre doğru namaz vakitleri.', ur:'آپ کے GPS مقام کی بنیاد پر درست نماز کے اوقات۔', id:'Waktu shalat akurat berdasarkan lokasi GPS Anda.' },
  'prayer.next':      { en:'Next Prayer',     ar:'الصلاة القادمة',    fr:'Prochaine Prière',      tr:'Sonraki Namaz',     ur:'اگلی نماز',          id:'Shalat Berikutnya'  },
  'prayer.loading':   { en:'Loading...',      ar:'جار التحميل...',    fr:'Chargement...',         tr:'Yükleniyor...',     ur:'لوڈ ہو رہا ہے...',   id:'Memuat...'          },
  'prayer.hijri_loading':{ en:'Loading Hijri date...', ar:'جار تحميل التاريخ...', fr:'Chargement de la date...', tr:'Hicri tarih yükleniyor...', ur:'ہجری تاریخ لوڈ ہو رہی ہے...', id:'Memuat tanggal Hijriyah...' },
  'prayer.qibla':     { en:'Qibla Direction', ar:'اتجاه القبلة',      fr:'Direction de la Qibla', tr:'Kıble Yönü',        ur:'قبلہ کی سمت',        id:'Arah Kiblat'        },
  'prayer.calculating':{ en:'Calculating...', ar:'جار الحساب...',     fr:'Calcul en cours...',    tr:'Hesaplanıyor...',   ur:'حساب ہو رہا ہے...',  id:'Menghitung...'      },

  // ── Quran Reader ──
  'quran.title':      { en:'Quran Reader',    ar:'القرآن الكريم',     fr:'Lecteur de Coran',      tr:'Kuran Okuyucu',     ur:'قرآن کریم',          id:'Pembaca Quran'      },
  'quran.sub':        { en:'114 surahs with translation and authentic tafsir.', ar:'١١٤ سورة مع الترجمة والتفسير الأصيل.', fr:'114 sourates avec traduction et tafsir authentique.', tr:'Çeviri ve otantik tefsirle 114 sure.', ur:'ترجمہ اور مستند تفسیر کے ساتھ ۱۱۴ سورتیں۔', id:'114 surah dengan terjemahan dan tafsir yang otentik.' },
  'quran.search':     { en:'Search by name or number...', ar:'ابحث بالاسم أو الرقم...', fr:'Rechercher par nom ou numéro...', tr:'İsim veya numaraya göre ara...', ur:'نام یا نمبر سے تلاش کریں...', id:'Cari berdasarkan nama atau nomor...' },
  'quran.verse':      { en:'Verse',           ar:'آية',               fr:'Verset',                tr:'Ayet',              ur:'آیت',                 id:'Ayat'               },
  'quran.reading':    { en:'Reading',         ar:'قراءة',             fr:'Lecture',               tr:'Okuma',             ur:'پڑھنا',               id:'Baca'               },
  'quran.tafsir':     { en:'Tafsir',          ar:'التفسير',           fr:'Tafsir',                tr:'Tefsir',            ur:'تفسیر',               id:'Tafsir'             },
  'quran.translation':{ en:'Translation',     ar:'الترجمة',           fr:'Traduction',            tr:'Çeviri',            ur:'ترجمہ',               id:'Terjemahan'         },
  'quran.translations':{ en:'Translations',  ar:'الترجمات',          fr:'Traductions',           tr:'Çeviriler',         ur:'ترجمے',              id:'Terjemahan'         },
  'quran.verse_ph':   { en:'Verse no. or word...', ar:'رقم الآية أو كلمة...', fr:'N° ou mot...', tr:'Ayet no veya kelime...', ur:'آیت نمبر یا لفظ...', id:'No. ayat atau kata...' },
  'quran.meccan':     { en:'Meccan',          ar:'مكية',              fr:'Mecquoise',             tr:'Mekki',             ur:'مکی',                 id:'Makkiyah'           },
  'quran.medinan':    { en:'Medinan',         ar:'مدنية',             fr:'Médinoise',             tr:'Medeni',            ur:'مدنی',                id:'Madaniyah'          },
  'quran.hide':       { en:'Hide',            ar:'إخفاء',             fr:'Masquer',               tr:'Gizle',             ur:'چھپائیں',             id:'Sembunyikan'        },

  // ── Dhikr ──
  'dhikr.title':      { en:'Dhikr & Duas',   ar:'الأذكار والأدعية',  fr:'Dhikr & Douâs',         tr:'Zikir & Dualar',    ur:'ذکر و دعا',          id:'Dzikir & Doa'       },
  'dhikr.sub':        { en:'Authentic supplications from the Quran & Sunnah.', ar:'أذكار وأدعية أصيلة من القرآن والسنة.', fr:'Rappels authentiques du Coran et de la Sunnah.', tr:'Kuran ve Sunnetten otantik zikirler.', ur:'قرآن و سنت سے مستند اذکار و دعائیں۔', id:'Dzikir dan doa autentik dari Quran & Sunnah.' },
  'dhikr.all':        { en:'All',             ar:'الكل',              fr:'Tout',                  tr:'Hepsi',             ur:'سب',                  id:'Semua'              },
  'dhikr.morning':    { en:'Morning',         ar:'الصباح',            fr:'Matin',                 tr:'Sabah',             ur:'صبح',                 id:'Pagi'               },
  'dhikr.evening':    { en:'Evening',         ar:'المساء',            fr:'Soir',                  tr:'Akşam',             ur:'شام',                 id:'Sore'               },
  'dhikr.after':      { en:'After Prayer',    ar:'بعد الصلاة',        fr:'Après la Prière',       tr:'Namazdan Sonra',    ur:'نماز کے بعد',        id:'Setelah Shalat'     },
  'dhikr.sleep':      { en:'Sleep',           ar:'النوم',              fr:'Sommeil',               tr:'Uyku',              ur:'سونا',                id:'Tidur'              },
  'dhikr.protect':    { en:'Protection',      ar:'الحماية',           fr:'Protection',            tr:'Koruma',            ur:'حفاظت',              id:'Perlindungan'       },
  'dhikr.quran_cat':  { en:'From Quran',      ar:'من القرآن',          fr:'Du Coran',              tr:"Kuran'dan",         ur:'قرآن سے',            id:'Dari Quran'         },
  'dhikr.general':    { en:'General',         ar:'عام',                fr:'Général',               tr:'Genel',             ur:'عمومی',              id:'Umum'               },
  'dhikr.travel':     { en:'Travel',          ar:'السفر',              fr:'Voyage',                tr:'Yolculuk',          ur:'سفر',                 id:'Perjalanan'         },
  'dhikr.stress':     { en:'Anxiety',         ar:'القلق',              fr:'Anxiété',               tr:'Stres',             ur:'پریشانی',            id:'Kecemasan'          },
  'dhikr.translit':   { en:'Transliteration', ar:'النطق',              fr:'Translitération',       tr:'Telaffuz',          ur:'تلفظ',                id:'Transliterasi'      },
  'dhikr.meaning':    { en:'Translation',     ar:'الترجمة',           fr:'Traduction',            tr:'Çeviri',            ur:'ترجمہ',              id:'Terjemahan'         },
  'dhikr.virtue':     { en:'Virtue',          ar:'الفضيلة',           fr:'Vertu',                 tr:'Fazilet',           ur:'فضیلت',              id:'Keutamaan'          },
  'dhikr.explain':    { en:'Explanation',     ar:'الشرح',              fr:'Explication',           tr:'Açıklama',          ur:'تشریح',              id:'Penjelasan'         },

  // ── Calendar ──
  'cal.title':        { en:'Islamic Calendar', ar:'التقويم الهجري',   fr:'Calendrier Islamique',  tr:'İslami Takvim',     ur:'اسلامی تقویم',       id:'Kalender Islam'     },
  'cal.sub':          { en:"Today's Hijri date, Islamic events, and all 12 Hijri months.", ar:'تاريخ اليوم الهجري والأحداث الإسلامية.', fr:"La date hijri d'aujourd'hui et les événements islamiques.", tr:'Bugünün Hicri tarihi ve İslami olaylar.', ur:'آج کی ہجری تاریخ اور اسلامی واقعات۔', id:'Tanggal Hijriyah hari ini dan peristiwa Islam.' },
  'cal.events':       { en:'Islamic Events',  ar:'الأحداث الإسلامية', fr:'Événements Islamiques', tr:'İslami Olaylar',    ur:'اسلامی واقعات',      id:'Peristiwa Islam'    },
  'cal.months':       { en:'Hijri Months',    ar:'الأشهر الهجرية',   fr:'Mois Hijri',             tr:'Hicri Aylar',       ur:'ہجری مہینے',         id:'Bulan Hijriyah'     },

  // ── Zakat ──
  'zakat.title':      { en:'Zakat Calculator',ar:'حاسبة الزكاة',     fr:'Calculateur de Zakat',  tr:'Zekat Hesaplayıcı', ur:'زکوٰۃ کیلکولیٹر',    id:'Kalkulator Zakat'   },
  'zakat.sub':        { en:'Calculate your annual Zakat. Nisab: 85g gold or 595g silver.', ar:'احسب زكاتك السنوية. النصاب: ٨٥ جرام ذهب أو ٥٩٥ جرام فضة.', fr:'Calculez votre Zakat annuel. Nissab: 85g or ou 595g argent.', tr:'Yıllık zekatınızı hesaplayın. Nisap: 85g altın veya 595g gümüş.', ur:'اپنی سالانہ زکوٰۃ کا حساب کریں۔ نصاب: ۸۵ گرام سونا یا ۵۹۵ گرام چاندی۔', id:'Hitung zakat tahunan Anda. Nisab: 85g emas atau 595g perak.' },
  'zakat.currency':   { en:'Currency',        ar:'العملة',            fr:'Devise',                tr:'Para Birimi',       ur:'کرنسی',              id:'Mata Uang'          },
  'zakat.cash':       { en:'Cash & Bank Savings', ar:'النقد والمدخرات', fr:'Espèces et économies', tr:'Nakit ve Birikim',  ur:'نقد اور بچت',        id:'Tunai & Tabungan'   },
  'zakat.gold':       { en:'Gold Value',      ar:'قيمة الذهب',        fr:'Valeur Or',             tr:'Altın Değeri',      ur:'سونے کی قیمت',       id:'Nilai Emas'         },
  'zakat.silver':     { en:'Silver Value',    ar:'قيمة الفضة',        fr:'Valeur Argent',         tr:'Gümüş Değeri',      ur:'چاندی کی قیمت',      id:'Nilai Perak'        },
  'zakat.stocks':     { en:'Stocks & Investments', ar:'الأسهم والاستثمارات', fr:'Actions et investissements', tr:'Hisse ve Yatırımlar', ur:'حصص اور سرمایہ',  id:'Saham & Investasi'  },
  'zakat.business':   { en:'Business Assets', ar:'أصول الأعمال',      fr:"Actifs d'entreprise",   tr:'İş Varlıkları',     ur:'کاروباری اثاثے',     id:'Aset Bisnis'        },
  'zakat.debts':      { en:'Debts (deducted)',ar:'الديون (تُطرح)',     fr:'Dettes (déduites)',     tr:'Borçlar (düşülür)', ur:'قرضے (کٹائے جائیں گے)',id:'Hutang (dikurangi)' },
  'zakat.due':        { en:'Zakat Due',       ar:'الزكاة الواجبة',    fr:'Zakat à Payer',         tr:'Ödenecek Zekat',    ur:'واجب زکوٰۃ',         id:'Zakat yang Harus Dibayar' },
  'zakat.enter':      { en:'Enter your assets above to calculate', ar:'أدخل أصولك أعلاه للحساب', fr:'Entrez vos actifs ci-dessus pour calculer', tr:'Hesaplamak için varlıklarınızı girin', ur:'حساب کے لیے اوپر اثاثے درج کریں', id:'Masukkan aset Anda di atas untuk menghitung' },
  'zakat.total':      { en:'Total zakatable assets', ar:'إجمالي الأصول الزكوية', fr:'Total des actifs zakatable', tr:'Toplam zekat varlıkları', ur:'کل زکوٰۃ کے اثاثے', id:'Total aset zakat' },
  'zakat.info':       { en:'Zakat is 2.5% of total zakatable wealth held for one lunar year above the nisab threshold. Consult a qualified scholar for your situation.', ar:'الزكاة ٢.٥٪ من إجمالي الثروة الزكوية المحتفظ بها لمدة حول. استشر عالماً لحالتك الخاصة.', fr:'La Zakat est de 2,5% de la richesse totale zakatable détenue pendant un an lunaire. Consultez un savant.', tr:'Zekat, nisap üzerindeki toplam zekat varlığının %2,5\'idir. Durumunuz için bir alim danışın.', ur:'زکوٰۃ ایک قمری سال تک نصاب سے اوپر رکھی گئی کل زکوٰۃ دولت کا ۲.۵٪ ہے۔', id:'Zakat adalah 2,5% dari total kekayaan zakat yang disimpan selama satu tahun lunar di atas nisab.' },

  // ── Tasbih ──
  'tasbih.title':     { en:'Tasbih Counter',  ar:'عداد التسبيح',      fr:'Compteur Tasbih',       tr:'Tesbih Sayacı',     ur:'تسبیح کاؤنٹر',       id:'Penghitung Tasbih'  },
  'tasbih.sub':       { en:'Count your dhikr digitally with target tracking.', ar:'عدّ أذكارك رقمياً مع تتبع الهدف.', fr:'Comptez votre dhikr numériquement avec suivi.', tr:'Hedefinizi takip ederek zikirlerinizi sayın.', ur:'ہدف ٹریکنگ کے ساتھ ڈیجیٹل ذکر گنیں۔', id:'Hitung dzikir digital dengan pelacakan target.' },
  'tasbih.tap':       { en:'Tap',             ar:'اضغط',              fr:'Appuyer',               tr:'Dokun',             ur:'دبائیں',             id:'Ketuk'              },
  'tasbih.free':      { en:'Free',            ar:'حر',                fr:'Libre',                 tr:'Serbest',           ur:'آزاد',               id:'Bebas'              },
  'tasbih.reset':     { en:'Reset',           ar:'إعادة',             fr:'Réinitialiser',         tr:'Sıfırla',           ur:'دوبارہ ترتیب',       id:'Reset'              },

  // ── 99 Names ──
  'names.title':      { en:'99 Names of Allah',ar:'أسماء الله الحسنى', fr:'Les 99 Noms d\'Allah', tr:'Allah\'ın 99 İsmi', ur:'اللہ کے ۹۹ نام',     id:'99 Nama Allah'      },
  'names.sub':        { en:'Al-Asma ul-Husna — The Most Beautiful Names of Allah.', ar:'الأسماء الحسنى — أجمل أسماء الله تعالى.', fr:'Al-Asma ul-Husna — Les plus beaux noms d\'Allah.', tr:'El-Esma\'ül Hüsna — Allah\'ın en güzel isimleri.', ur:'الاسماء الحسنیٰ — اللہ کے خوبصورت ترین نام۔', id:'Al-Asma ul-Husna — Nama-nama Allah yang terindah.' },
  'names.search':     { en:'Search names...', ar:'ابحث عن اسم...',    fr:'Rechercher un nom...',  tr:'İsim ara...',       ur:'نام تلاش کریں...',   id:'Cari nama...'       },

  // ── Halal ──
  'halal.title':      { en:'Halal Checker',   ar:'فحص الحلال',        fr:'Vérificateur Halal',    tr:'Helal Denetleyici', ur:'حلال چیکر',          id:'Pemeriksa Halal'    },
  'halal.sub':        { en:'Check food ingredients and E-numbers — database + AI fallback.', ar:'تحقق من المكونات وأرقام E — قاعدة بيانات + ذكاء اصطناعي.', fr:'Vérifiez les ingrédients et numéros E — base de données + IA.', tr:'Gıda içeriklerini ve E numaralarını kontrol edin.', ur:'کھانے کے اجزاء اور E نمبر چیک کریں — ڈیٹابیس + AI۔', id:'Periksa bahan makanan dan nomor E — database + AI.' },
  'halal.placeholder':{ en:'Enter ingredient or E-number (e.g. Gelatin, E441)', ar:'أدخل مكوناً أو رقم E (مثل: جيلاتين، E441)', fr:'Entrez un ingrédient ou numéro E (ex: Gélatine, E441)', tr:'Malzeme veya E numarası girin (örn: Jelatin, E441)', ur:'اجزاء یا E نمبر درج کریں (مثلاً جیلیٹن، E441)', id:'Masukkan bahan atau nomor E (mis. Gelatin, E441)' },
  'halal.check':      { en:'Check',           ar:'فحص',               fr:'Vérifier',              tr:'Kontrol Et',        ur:'چیک کریں',           id:'Periksa'            },
  'halal.quick':      { en:'Quick checks:',   ar:'فحص سريع:',         fr:'Vérifications rapides:', tr:'Hızlı kontrol:',   ur:'فوری چیک:',          id:'Cek cepat:'         },
  'halal.disclaimer': { en:'This tool is a reference only. Consult a qualified scholar or certified halal authority for a definitive ruling.', ar:'هذه الأداة للمرجعية فقط. استشر عالماً مؤهلاً أو هيئة حلال معتمدة.', fr:'Cet outil est une référence uniquement. Consultez un savant qualifié.', tr:'Bu araç yalnızca referans içindir. Yetkili bir alim danışın.', ur:'یہ ٹول صرف حوالہ کے لیے ہے۔ کسی قابل عالم سے مشورہ کریں۔', id:'Alat ini hanya sebagai referensi. Konsultasikan dengan ulama yang berkualifikasi.' },

  // ── Ramadan ──
  'ramadan.title':    { en:'Ramadan Tracker', ar:'متتبع رمضان',       fr:'Suivi de Ramadan',      tr:'Ramazan Takip',     ur:'رمضان ٹریکر',        id:'Pelacak Ramadan'    },
  'ramadan.desc':     { en:'Countdown, fasting log, Suhoor & Iftar times.', ar:'العد التنازلي وتتبع الصيام وأوقات السحور والإفطار.', fr:'Compte à rebours, journal du jeûne et horaires.', tr:'Geri sayım, oruç takibi ve Sahur/İftar vakitleri.', ur:'الٹی گنتی، روزہ ٹریکر اور سحری و افطار کے اوقات۔', id:'Hitung mundur, catatan puasa, waktu Sahur & Iftar.' },
  'ramadan.countdown':{ en:'Days until Ramadan', ar:'أيام حتى رمضان', fr:'Jours avant Ramadan',  tr:'Ramazana kalan gün', ur:'رمضان تک دن',        id:'Hari menuju Ramadan'},
  'ramadan.here':     { en:'Ramadan is here! 🌙', ar:'رمضان كريم! 🌙', fr:'Ramadan est là! 🌙',  tr:'Ramazan geldi! 🌙', ur:'رمضان مبارک! 🌙',    id:'Ramadan telah tiba! 🌙' },
  'ramadan.suhoor':   { en:'Suhoor ends',    ar:'ينتهي السحور',       fr:'Fin du Suhoor',         tr:'Sahur biter',       ur:'سحری ختم',           id:'Sahur berakhir'     },
  'ramadan.iftar':    { en:'Iftar time',     ar:'موعد الإفطار',       fr:'Heure d\'Iftar',        tr:'İftar vakti',       ur:'افطار کا وقت',       id:'Waktu Iftar'        },
  'ramadan.fasted':   { en:'Days fasted',   ar:'أيام صمت',           fr:'Jours jeûnés',          tr:'Tutulan oruç',      ur:'روزے رکھے',          id:'Hari berpuasa'      },
  'ramadan.log':      { en:'Log today',     ar:'سجّل اليوم',          fr:'Journaliser aujourd\'hui', tr:'Bugünü kaydet',  ur:'آج درج کریں',        id:'Catat hari ini'     },
  'ramadan.fasted_btn':{ en:'✅ I Fasted',  ar:'✅ صمت اليوم',        fr:"✅ J'ai jeûné",          tr:'✅ Oruç tuttum',    ur:'✅ روزہ رکھا',        id:'✅ Saya Berpuasa'    },
  'ramadan.not_btn':  { en:'❌ Not Today',  ar:'❌ لم أصم',           fr:"❌ Pas aujourd'hui",     tr:'❌ Bugün değil',    ur:'❌ آج نہیں',         id:'❌ Tidak Hari Ini'   },
  'ramadan.laylatul': { en:'Laylatul Qadr Watch', ar:'ترقب ليلة القدر', fr:'Laylat al-Qadr',     tr:'Kadir Gecesi',      ur:'لیلۃ القدر',         id:'Malam Lailatul Qadar'},
  'ramadan.last10':   { en:'Last 10 nights of Ramadan — seek Laylatul Qadr', ar:'الليالي العشر الأخيرة — ابحث عن ليلة القدر', fr:'10 dernières nuits — cherchez Laylat al-Qadr', tr:'Son 10 gece — Kadir Gecesini ara', ur:'آخری ۱۰ راتیں — لیلۃ القدر تلاش کریں', id:'10 malam terakhir — cari Laylatul Qadar' },
  'ramadan.iftar_dua':{ en:'Iftar Dua',    ar:'دعاء الإفطار',        fr:'Douâ d\'Iftar',         tr:'İftar Duası',       ur:'افطار کی دعا',       id:'Doa Buka Puasa'     },

  // ── Daily Verse ──
  'daily.title':      { en:'Daily Verse & Hadith', ar:'آية وحديث اليوم', fr:'Verset & Hadith du Jour', tr:'Günün Ayeti & Hadisi', ur:'آج کی آیت اور حدیث', id:'Ayat & Hadits Harian' },
  'daily.sub':        { en:'A new Quran verse and authentic hadith every day.', ar:'آية قرآنية وحديث صحيح كل يوم.', fr:'Un verset et un hadith authentique chaque jour.', tr:'Her gün yeni bir ayet ve sahih hadis.', ur:'ہر روز ایک قرآنی آیت اور صحیح حدیث۔', id:'Ayat Quran dan hadits shahih setiap hari.' },
  'daily.verse':      { en:'Verse of the Day', ar:'آية اليوم',         fr:'Verset du Jour',        tr:'Günün Ayeti',       ur:'آج کی آیت',          id:'Ayat Hari Ini'      },
  'daily.hadith':     { en:'Hadith of the Day', ar:'حديث اليوم',      fr:'Hadith du Jour',        tr:'Günün Hadisi',      ur:'آج کی حدیث',         id:'Hadits Hari Ini'    },
  'daily.reflection': { en:'Reflection',    ar:'تأمل',                fr:'Réflexion',             tr:'Yansıma',           ur:'غور و فکر',          id:'Renungan'           },
  'daily.new':        { en:'New verse at midnight', ar:'آية جديدة عند منتصف الليل', fr:'Nouveau verset à minuit', tr:'Gece yarısı yeni ayet', ur:'آدھی رات نئی آیت', id:'Ayat baru tengah malam' },
  'daily.narrator':   { en:'Narrator',      ar:'الراوي',               fr:'Narrateur',             tr:'Ravi',              ur:'راوی',               id:'Perawi'             },

  // ── Dua Generator ──
  'dua.title':        { en:'Dua Companion', ar:'رفيق الدعاء',         fr:'Guide de Douâ',         tr:'Dua Rehberi',       ur:'دعا رہنما',          id:'Teman Doa'          },
  'dua.sub':          { en:'Describe your need and receive an authentic dua from scholarly sources.', ar:'صف حاجتك واحصل على دعاء أصيل من المصادر العلمية.', fr:'Décrivez votre besoin et recevez une douâ authentique.', tr:'İhtiyacınızı anlatın ve otantik dua alın.', ur:'اپنی ضرورت بیان کریں اور مستند دعا حاصل کریں۔', id:'Ceritakan kebutuhan Anda dan dapatkan doa yang autentik.' },
  'dua.placeholder':  { en:'Describe your situation (e.g. I have an exam tomorrow, seeking guidance)', ar:'صف حالتك (مثل: لدي امتحان غداً، أبحث عن توجيه)', fr:'Décrivez votre situation (ex: J\'ai un examen demain)', tr:'Durumunuzu anlatın (örn: Yarın sınavım var)', ur:'اپنی صورتحال بیان کریں (مثلاً: کل میرا امتحان ہے)', id:'Ceritakan situasi Anda (mis: Saya punya ujian besok)' },
  'dua.categories':   { en:'Quick Categories', ar:'فئات سريعة',       fr:'Catégories rapides',    tr:'Hızlı Kategoriler', ur:'فوری زمرے',          id:'Kategori Cepat'     },
  'dua.generating':   { en:'Generating your dua...', ar:'جار توليد دعائك...', fr:'Génération de votre douâ...', tr:'Duanız oluşturuluyor...', ur:'آپ کی دعا تیار ہو رہی ہے...', id:'Membuat doa Anda...' },
  'dua.source':       { en:'Source',        ar:'المصدر',               fr:'Source',                tr:'Kaynak',            ur:'ماخذ',               id:'Sumber'             },
  'dua.meaning':      { en:'Meaning',       ar:'المعنى',               fr:'Signification',         tr:'Anlam',             ur:'معنی',               id:'Arti'               },
  'dua.translit':     { en:'Transliteration', ar:'النطق',              fr:'Translitération',       tr:'Telaffuz',          ur:'تلفظ',               id:'Transliterasi'      },
  'dua.disclaimer':   { en:'This dua is a reference. Always verify with a qualified scholar.', ar:'هذا الدعاء للمرجعية فقط. تحقق دائماً مع عالم مؤهل.', fr:'Cette douâ est une référence. Vérifiez avec un savant.', tr:'Bu dua referans amaçlıdır. Nitelikli bir alim ile doğrulayın.', ur:'یہ دعا صرف حوالے کے لیے ہے۔ ہمیشہ قابل عالم سے تصدیق کریں۔', id:'Doa ini hanya sebagai referensi. Verifikasikan dengan ulama.' },

  // ── Mirath ──
  'mirath.title':     { en:'Inheritance (Mirath)', ar:'المواريث',     fr:'Héritage Islamique',    tr:'Miras (Mirath)',    ur:'وراثت (میراث)',       id:'Warisan Islam'      },
  'mirath.sub':       { en:'Calculate Islamic inheritance based on Quran 4:11-12 and 4:176.', ar:'احسب الميراث الإسلامي بناءً على القرآن الكريم.', fr:"Calculez l'héritage islamique selon le Coran 4:11-12.", tr:"Kuran 4:11-12'ye göre İslami mirası hesaplayın.", ur:'قرآن ۴:۱۱-۱۲ کے مطابق اسلامی وراثت کا حساب کریں۔', id:'Hitung warisan Islam berdasarkan Quran 4:11-12.' },
  'mirath.estate':    { en:'Total Estate',  ar:'إجمالي التركة',        fr:'Succession totale',     tr:'Toplam miras',      ur:'کل ترکہ',            id:'Total harta'        },
  'mirath.debts':     { en:'Debts & Funeral', ar:'الديون والجنازة',   fr:'Dettes et funérailles', tr:'Borçlar ve cenaze', ur:'قرضے اور جنازہ',     id:'Hutang & pemakaman' },
  'mirath.heirs':     { en:'Select Heirs',  ar:'حدد الورثة',           fr:'Sélectionner les héritiers', tr:'Varisleri seçin', ur:'وارثین منتخب کریں', id:'Pilih ahli waris'  },
  'mirath.husband':   { en:'Husband',       ar:'الزوج',                fr:'Mari',                  tr:'Koca',              ur:'شوہر',               id:'Suami'              },
  'mirath.father':    { en:'Father',        ar:'الأب',                 fr:'Père',                  tr:'Baba',              ur:'والد',               id:'Ayah'               },
  'mirath.mother':    { en:'Mother',        ar:'الأم',                 fr:'Mère',                  tr:'Anne',              ur:'والدہ',              id:'Ibu'                },
  'mirath.wives':     { en:'Wives',         ar:'الزوجات',              fr:'Épouses',               tr:'Eşler',             ur:'بیویاں',             id:'Istri'              },
  'mirath.sons':      { en:'Sons',          ar:'الأبناء',              fr:'Fils',                  tr:'Oğullar',           ur:'بیٹے',               id:'Anak laki-laki'     },
  'mirath.daughters': { en:'Daughters',     ar:'البنات',               fr:'Filles',                tr:'Kızlar',            ur:'بیٹیاں',             id:'Anak perempuan'     },
  'mirath.brothers':  { en:'Brothers (blocking)', ar:'الإخوة (للحجب)', fr:'Frères (blocage)',     tr:'Erkek kardeş',      ur:'بھائی (حجب)',        id:'Saudara laki-laki'  },
  'mirath.result':    { en:'Distribution Result', ar:'نتيجة التوزيع', fr:'Résultat de la distribution', tr:'Dağıtım sonucu', ur:'تقسیم کا نتیجہ',   id:'Hasil pembagian'    },
  'mirath.heir':      { en:'Heir',          ar:'الوارث',               fr:'Héritier',              tr:'Varis',             ur:'وارث',               id:'Ahli waris'         },
  'mirath.share':     { en:'Share',         ar:'النصيب',               fr:'Part',                  tr:'Pay',               ur:'حصہ',                id:'Bagian'             },
  'mirath.amount':    { en:'Amount',        ar:'المبلغ',               fr:'Montant',               tr:'Miktar',            ur:'رقم',                id:'Jumlah'             },
  'mirath.ref':       { en:'Reference',     ar:'المرجع',               fr:'Référence',             tr:'Referans',          ur:'حوالہ',              id:'Referensi'          },
  'mirath.net':       { en:'Net Estate',    ar:'صافي التركة',          fr:'Succession nette',      tr:'Net miras',         ur:'خالص ترکہ',          id:'Harta bersih'       },
  'mirath.after_debts':{ en:'After deducting debts', ar:'بعد خصم الديون', fr:'Après déduction des dettes', tr:'Borçlar düşüldükten sonra', ur:'قرضے کاٹنے کے بعد', id:'Setelah dikurangi hutang' },
  'mirath.disclaimer':{ en:'This calculator is for reference only. Consult a qualified Islamic scholar for a binding ruling. والله أعلم', ar:'هذه الحاسبة للمرجعية فقط. استشر عالماً مؤهلاً. والله أعلم', fr:'Ce calculateur est à titre de référence. Consultez un savant islamique. والله أعلم', tr:'Bu hesaplayıcı yalnızca referans içindir. Nitelikli bir alim danışın. والله أعلم', ur:'یہ کیلکولیٹر صرف حوالے کے لیے ہے۔ قابل عالم سے مشورہ کریں۔ والله أعلم', id:'Kalkulator ini hanya untuk referensi. Konsultasikan dengan ulama. والله أعلم' },
  'mirath.basis':     { en:'Quranic Basis', ar:'الأساس القرآني',       fr:'Base coranique',        tr:'Kuran Referansı',   ur:'قرآنی بنیاد',        id:'Dasar Quran'        },

  // ── Sources page ──
  'sources.title':    { en:'Trusted Sources', ar:'المصادر الموثوقة',  fr:'Sources Fiables',       tr:'Güvenilir Kaynaklar',ur:'قابل اعتماد ذرائع',  id:'Sumber Terpercaya'  },
  'sources.sub':      { en:'Every answer cites scholar names, book references, and direct links.', ar:'كل إجابة تذكر اسم العالم والمرجع والرابط.', fr:'Chaque réponse cite des savants et des références.', tr:'Her cevap alim adları ve referanslar içerir.', ur:'ہر جواب عالم کا نام، کتاب کا حوالہ اور لنک دیتا ہے۔', id:'Setiap jawaban mencantumkan nama ulama dan referensi.' },
  'sources.hadith':   { en:'Hadith & Sunnah', ar:'الحديث والسنة',     fr:'Hadith & Sunnah',       tr:'Hadis & Sünnet',    ur:'حدیث اور سنت',       id:'Hadits & Sunnah'    },
  'sources.scholarly':{ en:'Scholarly Q&A & Fatwa', ar:'الأسئلة والفتاوى', fr:'Q&A savant et Fatwa', tr:'Alim Soru-Cevap ve Fetva', ur:'علمی سوال جواب اور فتویٰ', id:'Tanya Jawab Ulama & Fatwa' },
  'sources.research': { en:'Research & Encyclopedia', ar:'البحث والموسوعة', fr:'Recherche et Encyclopédie', tr:'Araştırma ve Ansiklopedi', ur:'تحقیق اور انسائیکلوپیڈیا', id:'Penelitian & Ensiklopedia' },
  'sources.books':    { en:'Books & Media', ar:'الكتب والإعلام',      fr:'Livres & Médias',       tr:'Kitaplar ve Medya', ur:'کتابیں اور میڈیا',   id:'Buku & Media'       },
  'sources.commit':   { en:'Our Commitment to Sources', ar:'التزامنا بالمصادر', fr:'Notre engagement envers les sources', tr:'Kaynak taahhüdümüz', ur:'ذرائع کے ساتھ ہمارا عہد', id:'Komitmen Kami terhadap Sumber' },
  'sources.commit_desc':{ en:'Noor only references verified scholars and classical books. We never issue fatwas — we reflect what scholars have said.', ar:'نور يستشهد فقط بالعلماء الموثوقين والكتب الكلاسيكية. لا نصدر فتاوى.', fr:'Noor ne référence que des savants vérifiés. Nous ne délivrons jamais de fatwas.', tr:'Noor yalnızca doğrulanmış alimlere atıfta bulunur. Asla fetva vermeyiz.', ur:'نور صرف تصدیق شدہ علماء کا حوالہ دیتا ہے۔ ہم کبھی فتویٰ جاری نہیں کرتے۔', id:'Noor hanya merujuk ulama terverifikasi. Kami tidak pernah mengeluarkan fatwa.' },

  // ── About page ──
  'about.title':      { en:'About Noor',    ar:'عن نور',               fr:'À propos de Noor',      tr:'Noor Hakkında',     ur:'نور کے بارے میں',    id:'Tentang Noor'       },
  'about.sub':        { en:'Your Islamic Knowledge Assistant — guided by light.', ar:'مساعد المعرفة الإسلامية — بالنور نهتدي.', fr:'Votre assistant de connaissance islamique — guidé par la lumière.', tr:'İslami Bilgi Asistanınız — ışığa rehberlik eder.', ur:'آپ کا اسلامی علم مددگار — نور سے رہنمائی۔', id:'Asisten Pengetahuan Islam Anda — dibimbing oleh cahaya.' },
  'about.mission':    { en:'Our Mission',   ar:'مهمتنا',               fr:'Notre Mission',          tr:'Misyonumuz',        ur:'ہمارا مشن',          id:'Misi Kami'          },
  'about.mission_text':{ en:'Noor (نور — meaning Light) is designed to help everyone — Muslims and non-Muslims — access authentic Islamic knowledge easily. Every answer is built on verified scholarly sources, never invented opinions.', ar:'نور مُصمَّم لمساعدة الجميع على الوصول إلى المعرفة الإسلامية الأصيلة بسهولة. كل إجابة مبنية على مصادر علمية موثقة.', fr:"Noor est conçu pour aider tout le monde à accéder facilement à la connaissance islamique authentique. Chaque réponse est basée sur des sources savantes vérifiées.", tr:'Noor, herkese — Müslümanlara ve gayrimüslimlere — özgün İslami bilgiye kolayca erişim sağlamak için tasarlanmıştır.', ur:'نور (معنی: روشنی) سب کی مدد کے لیے ڈیزائن کیا گیا ہے — مسلمانوں اور غیر مسلموں کو آسانی سے مستند اسلامی علم تک رسائی دیتا ہے۔', id:'Noor (نور — artinya Cahaya) dirancang untuk membantu semua orang mengakses pengetahuan Islam yang autentik dengan mudah.' },
  'about.for_who':    { en:'Who is Noor for?', ar:'لمن هو نور؟',      fr:'Pour qui est Noor ?',   tr:'Noor kimin için?',  ur:'نور کس کے لیے ہے؟', id:'Noor untuk siapa?' },
  'about.features':   { en:'Key Features',  ar:'المميزات الرئيسية',  fr:'Fonctionnalités clés',  tr:'Temel Özellikler',  ur:'اہم خصوصیات',        id:'Fitur Utama'        },
  'about.notice':     { en:'Important Notice', ar:'تنبيه مهم',        fr:'Avis important',        tr:'Önemli Not',        ur:'اہم نوٹس',           id:'Pemberitahuan Penting' },
  'about.notice_text':{ en:'Noor is a reference assistant, not a mufti. It does not issue binding fatwas. Always consult a qualified scholar for your personal questions. والله أعلم', ar:'نور مساعد مرجعي وليس مفتياً. لا يُصدر فتاوى ملزمة. استشر عالماً مؤهلاً. والله أعلم', fr:"Noor est un assistant de référence, pas un mufti. Il ne délivre pas de fatwas. Consultez un savant. والله أعلم", tr:'Noor bir referans asistanıdır, müftü değil. Bağlayıcı fetva vermez. Bir alim danışın. والله أعلم', ur:'نور ایک حوالہ جاتی مددگار ہے، مفتی نہیں۔ پابند فتویٰ جاری نہیں کرتا۔ اپنے سوالات کے لیے قابل عالم سے مشورہ کریں۔ والله أعلم', id:'Noor adalah asisten referensi, bukan mufti. Tidak mengeluarkan fatwa yang mengikat. Konsultasikan pertanyaan Anda dengan ulama. والله أعلم' },
};

export function t(key, lang = 'en') {
  const entry = T[key];
  if (!entry) { console.warn('[i18n] Missing key:', key); return key; }
  return entry[lang] || entry['en'] || key;
}
