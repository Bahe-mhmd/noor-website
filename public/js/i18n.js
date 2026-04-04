// ═══════════════════════════════════════════════════
// NOOR — i18n.js  (fixed: Tunisia flag, full translations)
// ═══════════════════════════════════════════════════

export const LANGUAGES = [
  { code:'en', label:'English',    native:'English',   dir:'ltr', flag:'🇬🇧' },
  { code:'ar', label:'Arabic',     native:'العربية',   dir:'rtl', flag:'🇹🇳' }, // ← Tunisia flag
  { code:'fr', label:'French',     native:'Français',  dir:'ltr', flag:'🇫🇷' },
  { code:'tr', label:'Turkish',    native:'Türkçe',    dir:'ltr', flag:'🇹🇷' },
  { code:'ur', label:'Urdu',       native:'اردو',      dir:'rtl', flag:'🇵🇰' },
  { code:'id', label:'Indonesian', native:'Indonesia', dir:'ltr', flag:'🇮🇩' },
];

export const RTL_LANGS = ['ar','ur'];

// Full translation table
export const T = {
  // ── Sidebar nav labels ──
  'nav.main':      {en:'Main',          ar:'الرئيسية',       fr:'Principal',      tr:'Ana',           ur:'مرکزی',        id:'Utama'        },
  'nav.tools':     {en:'Tools',         ar:'أدوات',          fr:'Outils',         tr:'Araçlar',       ur:'ٹولز',          id:'Alat'         },
  'nav.new':       {en:'New',           ar:'جديد',           fr:'Nouveau',        tr:'Yeni',          ur:'نیا',           id:'Baru'         },
  'nav.resources': {en:'Resources',     ar:'الموارد',        fr:'Ressources',     tr:'Kaynaklar',     ur:'وسائل',        id:'Sumber'       },
  'nav.home':      {en:'Home',          ar:'الرئيسية',       fr:'Accueil',        tr:'Ana Sayfa',     ur:'ہوم',           id:'Beranda'      },
  'nav.categories':{en:'Categories',    ar:'الأقسام',        fr:'Catégories',     tr:'Kategoriler',   ur:'زمرے',          id:'Kategori'     },
  'nav.prayer':    {en:'Prayer Times',  ar:'مواقيت الصلاة',  fr:'Horaires Prière',tr:'Namaz Vakti',   ur:'نماز اوقات',   id:'Waktu Shalat' },
  'nav.quran':     {en:'Quran Reader',  ar:'القرآن الكريم',  fr:'Lecteur Coran',  tr:'Kuran',         ur:'قرآن کریم',    id:'Quran'        },
  'nav.dhikr':     {en:'Dhikr & Duas',  ar:'الأذكار والأدعية',fr:'Dhikr & Douâs', tr:'Zikir & Dualar',ur:'ذکر و دعا',    id:'Dzikir & Doa' },
  'nav.calendar':  {en:'Islamic Calendar',ar:'التقويم الهجري',fr:'Calendrier',    tr:'Takvim',        ur:'اسلامی تقویم', id:'Kalender Islam'},
  'nav.zakat':     {en:'Zakat Calculator',ar:'حاسبة الزكاة',fr:'Calculateur Zakat',tr:'Zekat Hesabı',ur:'زکوٰۃ کیلکولیٹر',id:'Kalkulator Zakat'},
  'nav.tasbih':    {en:'Tasbih Counter',ar:'عداد التسبيح',   fr:'Compteur Tasbih',tr:'Tesbih',        ur:'تسبیح کاؤنٹر', id:'Tasbih'       },
  'nav.names':     {en:'99 Names',      ar:'أسماء الله الحسنى',fr:'99 Noms',      tr:'99 İsim',       ur:'اللہ کے ۹۹ نام',id:'99 Nama Allah'},
  'nav.halal':     {en:'Halal Checker', ar:'فحص الحلال',     fr:'Vérif. Halal',   tr:'Helal Kontrol', ur:'حلال چیکر',    id:'Cek Halal'    },
  'nav.ramadan':   {en:'Ramadan',       ar:'رمضان',          fr:'Ramadan',        tr:'Ramazan',       ur:'رمضان',         id:'Ramadan'      },
  'nav.daily':     {en:'Daily Verse',   ar:'آية اليوم',      fr:'Verset du Jour', tr:'Günün Ayeti',   ur:'آج کی آیت',    id:'Ayat Harian'  },
  'nav.duagen':    {en:'Dua Companion', ar:'رفيق الدعاء',    fr:'Guide Douâ',     tr:'Dua Rehberi',   ur:'دعا رہنما',    id:'Teman Doa'    },
  'nav.mirath':    {en:'Inheritance',   ar:'المواريث',       fr:'Héritage',       tr:'Miras',         ur:'وراثت',         id:'Warisan'      },
  'nav.sources':   {en:'Trusted Sources',ar:'المصادر الموثوقة',fr:'Sources',      tr:'Kaynaklar',     ur:'ذرائع',         id:'Sumber'       },
  'nav.about':     {en:'About Noor',    ar:'عن نور',         fr:'À propos',       tr:'Hakkında',      ur:'نور کے بارے میں',id:'Tentang'    },

  // ── Common ──
  'common.loading':{en:'Loading...',    ar:'جار التحميل...',  fr:'Chargement...',  tr:'Yükleniyor...',  ur:'لوڈ ہو رہا ہے...',id:'Memuat...'},
  'common.error':  {en:'Error. Try again.',ar:'خطأ. حاول مجدداً.',fr:'Erreur.',    tr:'Hata.',         ur:'خطا۔',          id:'Error.'       },
  'common.ummah':  {en:'Built for the Ummah',ar:'صُنع للأمة',fr:"Pour l'Oumma",   tr:'Ümmet için',    ur:'امت کے لیے',   id:'Untuk Umat'   },
  'common.calculate':{en:'Calculate',   ar:'احسب',           fr:'Calculer',       tr:'Hesapla',       ur:'حساب کریں',    id:'Hitung'       },
  'common.copy':   {en:'Copy',          ar:'نسخ',            fr:'Copier',         tr:'Kopyala',       ur:'کاپی کریں',    id:'Salin'        },
  'common.share':  {en:'Share',         ar:'مشاركة',         fr:'Partager',       tr:'Paylaş',        ur:'شیئر کریں',    id:'Bagikan'      },
  'common.generate':{en:'Generate',     ar:'توليد',          fr:'Générer',        tr:'Oluştur',       ur:'تیار کریں',    id:'Buat'         },
  'common.next':   {en:'Next Prayer',   ar:'الصلاة القادمة', fr:'Prochain',       tr:'Sonraki',       ur:'اگلی نماز',    id:'Shalat Berikutnya'},
  'common.theme':  {en:'Theme',         ar:'المظهر',         fr:'Thème',          tr:'Tema',          ur:'تھیم',          id:'Tema'         },

  // ── Home page ──
  'home.hero_ar':  {en:'بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ', ar:'بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ', fr:'بِسْمِ ٱللَّٰهِ', tr:'بِسْمِ ٱللَّٰهِ', ur:'بِسْمِ ٱللَّٰهِ', id:'بِسْمِ ٱللَّٰهِ'},
  'home.h1':       {en:'Find Answers from <span class="hl">Trusted Scholars</span>', ar:'ابحث عن إجابات من <span class="hl">العلماء الموثوقين</span>', fr:'Trouvez des réponses de <span class="hl">savants de confiance</span>', tr:'<span class="hl">Güvenilir Alimler</span>den cevap bulun', ur:'<span class="hl">قابل اعتماد علماء</span> سے جوابات تلاش کریں', id:'Temukan Jawaban dari <span class="hl">Ulama Terpercaya</span>'},
  'home.sub':      {en:'Helping Muslims and non-Muslims find authentic Islamic answers with proof, references, and scholarly explanations.', ar:'نساعد المسلمين وغير المسلمين في إيجاد إجابات إسلامية أصيلة بالأدلة والمراجع وشرح العلماء.', fr:'Aider les musulmans et non-musulmans à trouver des réponses islamiques authentiques.', tr:'Müslümanların ve gayrimüslimlerin otantik İslami cevaplar bulmasına yardımcı olur.', ur:'مسلمانوں اور غیر مسلموں کو مستند اسلامی جوابات تلاش کرنے میں مدد کرتا ہے۔', id:'Membantu Muslim dan non-Muslim menemukan jawaban Islam yang otentik.'},
  'home.ask':      {en:'Ask an Islamic question...', ar:'اسأل سؤالاً إسلامياً...', fr:'Posez une question islamique...', tr:'İslami soru sorun...', ur:'ایک اسلامی سوال پوچھیں...', id:'Ajukan pertanyaan Islam...'},
  'home.note':     {en:'References scholars — does not issue fatwas. Covers all madhahib.', ar:'يستشهد بالعلماء — لا يصدر فتاوى. يشمل جميع المذاهب.', fr:'Référence des savants — ne délivre pas de fatwas.', tr:'Alimlere atıfta bulunur — fetva vermez.', ur:'علماء کا حوالہ دیتا ہے — فتوی جاری نہیں کرتا۔', id:'Merujuk ulama — tidak mengeluarkan fatwa.'},
  'home.sources':  {en:'Sources', ar:'مصادر', fr:'Sources', tr:'Kaynaklar', ur:'ذرائع', id:'Sumber'},

  // ── Categories ──
  'cats.title':    {en:'Browse Categories', ar:'تصفح الأقسام', fr:'Parcourir les catégories', tr:'Kategorilere Göz At', ur:'زمروں کو دریافت کریں', id:'Jelajahi Kategori'},
  'cats.sub':      {en:'Explore Islamic knowledge by topic.', ar:'استكشف المعرفة الإسلامية حسب الموضوع.', fr:'Explorez la connaissance islamique par sujet.', tr:'İslami bilgiyi konuya göre keşfedin.', ur:'موضوع کے مطابق اسلامی علم دریافت کریں۔', id:'Jelajahi ilmu Islam berdasarkan topik.'},

  // ── Ramadan ──
  'ramadan.title': {en:'Ramadan Tracker',ar:'متتبع رمضان',fr:'Suivi Ramadan',    tr:'Ramazan Takip',  ur:'رمضان ٹریکر',  id:'Pelacak Ramadan'},
  'ramadan.desc':  {en:'Countdown, fasting log, and Suhoor & Iftar times.',ar:'العد التنازلي وتتبع الصيام وأوقات السحور والإفطار.',fr:'Compte à rebours, journal du jeûne.',tr:'Geri sayım ve oruç takibi.',ur:'الٹی گنتی اور افطار کے اوقات۔',id:'Hitung mundur dan jadwal sahur-iftar.'},
  'ramadan.countdown':{en:'Days until Ramadan',ar:'أيام حتى رمضان',fr:'Jours avant Ramadan',tr:'Ramazana kalan gün',ur:'رمضان تک دن',id:'Hari menuju Ramadan'},
  'ramadan.in_progress':{en:'Ramadan is here! 🌙',ar:'رمضان كريم! 🌙',fr:'Ramadan est là! 🌙',tr:'Ramazan geldi! 🌙',ur:'رمضان مبارک! 🌙',id:'Ramadan telah tiba! 🌙'},
  'ramadan.day_of':{en:'Day',ar:'اليوم',fr:'Jour',tr:'Gün',ur:'دن',id:'Hari'},
  'ramadan.suhoor':{en:'Suhoor ends',ar:'ينتهي السحور',fr:'Fin Suhoor',tr:'Sahur biter',ur:'سحری ختم',id:'Sahur berakhir'},
  'ramadan.iftar': {en:'Iftar time',ar:'موعد الإفطار',fr:'Heure Iftar',tr:'İftar vakti',ur:'افطار کا وقت',id:'Waktu Iftar'},
  'ramadan.fasted':{en:'Days fasted',ar:'أيام صمت',fr:'Jours jeûnés',tr:'Tutulan oruç',ur:'روزے رکھے',id:'Hari berpuasa'},
  'ramadan.log':   {en:'Log today',ar:'سجّل اليوم',fr:'Journaliser',tr:'Kaydet',ur:'آج درج کریں',id:'Catat hari ini'},
  'ramadan.fasted_btn':{en:'✅ I Fasted',ar:'✅ صمت اليوم',fr:"✅ J'ai jeûné",tr:'✅ Oruç tuttum',ur:'✅ روزہ رکھا',id:'✅ Saya Berpuasa'},
  'ramadan.not_fasted':{en:'❌ Not Today',ar:'❌ لم أصم',fr:"❌ Pas aujourd'hui",tr:'❌ Bugün değil',ur:'❌ آج نہیں',id:'❌ Tidak Hari Ini'},
  'ramadan.laylatul':{en:'Laylatul Qadr Watch',ar:'ترقب ليلة القدر',fr:'Laylat al-Qadr',tr:'Kadir Gecesi',ur:'لیلۃ القدر',id:'Lailatul Qadar'},
  'ramadan.last10':{en:'Last 10 nights of Ramadan — seek Laylatul Qadr',ar:'الليالي العشر الأخيرة — ابحث عن ليلة القدر',fr:'10 dernières nuits — cherchez Laylat al-Qadr',tr:'Son 10 gece — Kadir Gecesini ara',ur:'آخری ۱۰ راتیں — لیلۃ القدر تلاش کریں',id:'10 malam terakhir — cari Laylatul Qadar'},

  // ── Daily Verse ──
  'daily.title':   {en:'Daily Verse & Hadith',ar:'آية وحديث اليوم',fr:'Verset & Hadith du Jour',tr:'Günün Ayeti & Hadisi',ur:'آج کی آیت اور حدیث',id:'Ayat & Hadits Harian'},
  'daily.desc':    {en:'A new Quran verse and authentic hadith every day.',ar:'آية قرآنية وحديث صحيح كل يوم.',fr:'Un verset et un hadith authentique chaque jour.',tr:'Her gün yeni bir ayet ve sahih hadis.',ur:'ہر روز ایک قرآنی آیت اور صحیح حدیث۔',id:'Ayat Quran dan hadits shahih setiap hari.'},
  'daily.verse':   {en:'Verse of the Day',ar:'آية اليوم',fr:'Verset du Jour',tr:'Günün Ayeti',ur:'آج کی آیت',id:'Ayat Hari Ini'},
  'daily.hadith':  {en:'Hadith of the Day',ar:'حديث اليوم',fr:'Hadith du Jour',tr:'Günün Hadisi',ur:'آج کی حدیث',id:'Hadits Hari Ini'},
  'daily.reflection':{en:'Reflection',ar:'تأمل',fr:'Réflexion',tr:'Yansıma',ur:'غور و فکر',id:'Renungan'},
  'daily.new':     {en:'New verse at midnight',ar:'آية جديدة عند منتصف الليل',fr:'Nouveau verset à minuit',tr:'Yarın yeni ayet',ur:'آدھی رات نئی آیت',id:'Ayat baru tengah malam'},

  // ── Dua Companion ──
  'dua.title':     {en:'Dua Companion',ar:'رفيق الدعاء',fr:'Guide de Douâ',tr:'Dua Rehberi',ur:'دعا رہنما',id:'Teman Doa'},
  'dua.desc':      {en:'Describe your need and receive an authentic dua from scholarly sources.',ar:'صف حاجتك واحصل على دعاء أصيل من المصادر العلمية.',fr:'Décrivez votre besoin et recevez une douâ authentique.',tr:'İhtiyacınızı anlatın, otantik bir dua alın.',ur:'اپنی ضرورت بیان کریں اور مستند دعا حاصل کریں۔',id:'Ceritakan kebutuhan Anda dan dapatkan doa yang autentik.'},
  'dua.placeholder':{en:'Describe your situation (e.g. I have an exam tomorrow, seeking guidance)',ar:'صف حالتك (مثل: لدي امتحان غداً، أبحث عن توجيه)',fr:'Décrivez votre situation',tr:'Durumunuzu anlatın',ur:'اپنی صورتحال بیان کریں',id:'Ceritakan situasi Anda'},
  'dua.categories':{en:'Quick Categories',ar:'فئات سريعة',fr:'Catégories rapides',tr:'Hızlı kategoriler',ur:'فوری زمرے',id:'Kategori Cepat'},
  'dua.generating':{en:'Generating your dua...',ar:'جار توليد دعائك...',fr:'Génération de votre douâ...',tr:'Duanız oluşturuluyor...',ur:'آپ کی دعا تیار ہو رہی ہے...',id:'Membuat doa Anda...'},
  'dua.transliteration':{en:'Transliteration',ar:'النطق',fr:'Translitération',tr:'Telaffuz',ur:'تلفظ',id:'Transliterasi'},
  'dua.meaning':   {en:'Meaning',ar:'المعنى',fr:'Signification',tr:'Anlam',ur:'معنی',id:'Arti'},
  'dua.source':    {en:'Source',ar:'المصدر',fr:'Source',tr:'Kaynak',ur:'ماخذ',id:'Sumber'},
  'dua.disclaimer':{en:'This dua is a reference. Always verify with a qualified scholar.',ar:'هذا الدعاء للمرجعية فقط. تحقق دائماً مع عالم مؤهل.',fr:'Cette douâ est une référence. Vérifiez avec un savant.',tr:'Bu dua referans amaçlıdır.',ur:'یہ دعا صرف حوالے کے لیے ہے۔',id:'Doa ini sebagai referensi.'},

  // ── Mirath ──
  'mirath.title':  {en:'Inheritance Calculator',ar:'حاسبة المواريث',fr:"Calculateur d'Héritage",tr:'Miras Hesabı',ur:'وراثت کیلکولیٹر',id:'Kalkulator Warisan'},
  'mirath.desc':   {en:'Calculate Islamic inheritance (Mirath) based on Quran 4:11-12.',ar:'احسب الميراث الإسلامي بناءً على القرآن الكريم.',fr:'Calculez l\'héritage islamique selon le Coran.',tr:'Kuran\'a göre miras hesabı.',ur:'قرآن کریم کے مطابق وراثت کا حساب۔',id:'Hitung warisan Islam berdasarkan Quran.'},
  'mirath.estate': {en:'Total Estate',ar:'إجمالي التركة',fr:'Succession totale',tr:'Toplam miras',ur:'کل ترکہ',id:'Total harta'},
  'mirath.debts':  {en:'Debts & Funeral Costs',ar:'الديون ومصاريف الجنازة',fr:'Dettes et frais funéraires',tr:'Borçlar',ur:'قرضے',id:'Hutang'},
  'mirath.heirs':  {en:'Select Heirs',ar:'حدد الورثة',fr:'Sélectionner les héritiers',tr:'Varisleri seçin',ur:'وارثین منتخب کریں',id:'Pilih ahli waris'},
  'mirath.result': {en:'Distribution Result',ar:'نتيجة التوزيع',fr:'Résultat',tr:'Sonuç',ur:'تقسیم کا نتیجہ',id:'Hasil pembagian'},
  'mirath.share':  {en:'Heir',ar:'الوارث',fr:'Héritier',tr:'Varis',ur:'وارث',id:'Ahli Waris'},
  'mirath.fraction':{en:'Share',ar:'النصيب',fr:'Part',tr:'Pay',ur:'حصہ',id:'Bagian'},
  'mirath.amount': {en:'Amount',ar:'المبلغ',fr:'Montant',tr:'Miktar',ur:'رقم',id:'Jumlah'},
  'mirath.reference':{en:'Reference',ar:'المرجع',fr:'Référence',tr:'Referans',ur:'حوالہ',id:'Referensi'},
};

export function t(key, lang='en') {
  const entry = T[key];
  if (!entry) return key;
  return entry[lang] || entry['en'] || key;
}

export function isRTL(lang) { return RTL_LANGS.includes(lang); }

export function getFontFamily(lang) {
  return (lang==='ar'||lang==='ur') ? "'Harmattan','IBM Plex Sans Arabic',sans-serif" : "'Outfit',sans-serif";
}
