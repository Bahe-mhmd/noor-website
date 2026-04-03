// ═══════════════════════════════════════════════════
// NOOR — pages/sources.js: Trusted Sources
// ═══════════════════════════════════════════════════

const SOURCES = [
  { section_en:'Hadith & Sunnah', section_ar:'الحديث والسنة', items: [
    { name:'Sunnah.com', domain:'sunnah.com', desc_en:'Complete hadith collections — Bukhari, Muslim, Abu Dawud, Tirmidhi, Nasa\'i, Ibn Majah.', desc_ar:'مجموعات حديثية كاملة.' },
    { name:'SunnahOnline.com', domain:'sunnahonline.com', desc_en:'Authenticated Sunnah articles and resources.', desc_ar:'مقالات موثقة عن السنة.' },
  ]},
  { section_en:'Scholarly Q&A & Fatwa', section_ar:'الأسئلة العلمية والفتاوى', items: [
    { name:'IslamQA.info', domain:'islamqa.info', desc_en:"Sheikh al-Munajjid's comprehensive Q&A database.", desc_ar:'أسئلة وأجوبة الشيخ المنجد الشاملة.' },
    { name:'IslamWeb.net', domain:'islamweb.net', desc_en:'Multilingual fatwa database and Islamic articles.', desc_ar:'قاعدة فتاوى متعددة اللغات.' },
    { name:'BinBaz.org.sa', domain:'binbaz.org.sa', desc_en:'Sheikh Ibn Baz — fatwas and scholarly opinions.', desc_ar:'الشيخ ابن باز — فتاوى وآراء علمية.' },
    { name:'BinOthaimeen.net', domain:'binothaimeen.net', desc_en:'Sheikh Ibn Uthaymin — rulings and lectures.', desc_ar:'الشيخ ابن عثيمين — أحكام ومحاضرات.' },
  ]},
  { section_en:'Research & Encyclopedia', section_ar:'البحث والموسوعة', items: [
    { name:'Dorar.net', domain:'dorar.net', desc_en:'Al-Durar Al-Saniyyah — Islamic encyclopedia with fatwa index.', desc_ar:'الدرر السنية — موسوعة إسلامية مع فهرس الفتاوى.' },
    { name:'AhlElHdeeth.com', domain:'ahlelhdeeth.com', desc_en:'Hadith sciences forum and research.', desc_ar:'منتدى علوم الحديث والبحث.' },
    { name:'MTafsir.net', domain:'mtafsir.net', desc_en:'Comprehensive Quran tafseer platform.', desc_ar:'منصة شاملة لتفسير القرآن.' },
    { name:'IslamWay (ar)', domain:'ar.islamway.net', desc_en:'Arabic Islamic lectures, articles, and content.', desc_ar:'محاضرات ومقالات إسلامية بالعربية.' },
  ]},
  { section_en:'Books & Media', section_ar:'الكتب والإعلام', items: [
    { name:'Kalamullah.com', domain:'kalamullah.com', desc_en:'Classical Islamic books and lectures library.', desc_ar:'مكتبة الكتب الإسلامية الكلاسيكية.' },
    { name:'MuslimMatters.org', domain:'muslimmatters.org', desc_en:'Contemporary Islamic articles and scholarship.', desc_ar:'مقالات إسلامية معاصرة.' },
    { name:'Quran.com', domain:'quran.com', desc_en:'Quran with translations, tafseer, and audio.', desc_ar:'القرآن مع الترجمات والتفسير والصوت.' },
  ]},
];

const Sources = {
  render(lang) {
    const isAr = lang === 'ar';
    return `
<div class="pg-hd">
  <div class="pg-hd-ic"><i class="ri-book-marked-fill"></i></div>
  <h1>${isAr ? 'المصادر الموثوقة' : 'Trusted Sources'}</h1>
  <p>${isAr ? 'كل إجابة تذكر اسم العالم والمرجع والرابط المباشر.' : 'Every answer cites scholar names, book references, and direct links.'}</p>
</div>
<div class="pg-body">
  ${SOURCES.map(section => `
    <div class="section-label rv">${isAr ? section.section_ar : section.section_en}</div>
    <div class="src-grid">
      ${section.items.map((src, i) => `
        <div class="src-card rv${i > 0 ? ` rv-d${i}` : ''}">
          <div class="src-favicon">
            <img src="https://www.google.com/s2/favicons?domain=${src.domain}&sz=64" alt="${src.name}" loading="lazy">
          </div>
          <div>
            <h3>${src.name}</h3>
            <p>${isAr ? src.desc_ar : src.desc_en}</p>
            <a class="src-lnk" href="https://${src.domain}" target="_blank" rel="noopener">
              ${src.domain} <i class="ri-external-link-line"></i>
            </a>
          </div>
        </div>`).join('')}
    </div>`).join('')}

  <div class="trust rv" style="margin-top:28px">
    <div class="trust-ic"><i class="ri-shield-check-fill"></i></div>
    <div>
      <h3>${isAr ? 'التزامنا بالمصادر' : 'Our Commitment to Sources'}</h3>
      <p>${isAr ? 'نور يستشهد فقط بالعلماء الموثوقين والكتب الكلاسيكية. لا نصدر فتاوى — نحن نعكس ما قاله العلماء.' : 'Noor only references verified scholars and classical books. We never issue fatwas — we reflect what scholars have said.'}</p>
    </div>
  </div>
</div>
<footer class="ft"><i class="ri-heart-fill"></i> ${isAr ? 'صُنع للأمة' : 'Built for the Ummah'}</footer>`;
  },

  init() {}
};

export default Sources;
