// ═══════════════════════════════════════════════════
// NOOR — pages/quran.js: Quran Reader
// ═══════════════════════════════════════════════════

let surahsList = [];

async function loadSurahs() {
  try {
    const r = await fetch('https://api.alquran.cloud/v1/surah');
    const d = await r.json();
    surahsList = d.data;
    renderSurahs(surahsList, window._quranLang || 'en');
  } catch(e) {
    const grid = document.getElementById('qrGrid');
    if (grid) grid.innerHTML = '<p style="color:var(--text-3);padding:20px">Failed to load. Check your connection.</p>';
  }
}

function renderSurahs(list, lang) {
  const grid = document.getElementById('qrGrid');
  if (!grid) return;
  grid.innerHTML = list.map(s => {
    const type = s.revelationType === 'Meccan' ? 'Meccan' : 'Medinan';
    const typeAr = s.revelationType === 'Meccan' ? 'مكية' : 'مدنية';
    return `<div class="qr-card" data-num="${s.number}">
      <div class="qr-num">${s.number}</div>
      <div class="qr-ar">${s.name}</div>
      <div class="qr-en">${s.englishName}</div>
      <div class="qr-info">${s.numberOfAyahs} ${lang === 'ar' ? 'آية' : 'verses'} · ${lang === 'ar' ? typeAr : type}</div>
    </div>`;
  }).join('');

  // Wire click handlers
  grid.querySelectorAll('.qr-card').forEach(card => {
    card.addEventListener('click', () => openSurah(parseInt(card.dataset.num), lang));
  });
}

async function openSurah(num, lang) {
  const list = document.getElementById('qrList');
  const reading = document.getElementById('qrReading');
  const content = document.getElementById('qrContent');
  if (!list || !reading || !content) return;

  list.classList.add('hide');
  reading.classList.add('show');
  content.innerHTML = '<div class="qr-loading"><i class="ri-loader-4-line" style="animation:lSpin 1s linear infinite"></i> Loading surah...</div>';

  try {
    const [arRes, enRes] = await Promise.all([
      fetch(`https://api.alquran.cloud/v1/surah/${num}/ar.alafasy`),
      fetch(`https://api.alquran.cloud/v1/surah/${num}/en.asad`)
    ]);
    const ar = await arRes.json(), en = await enRes.json();
    const arAyahs = ar.data.ayahs, enAyahs = en.data.ayahs;
    let html = (num !== 1 && num !== 9) ? '<div class="qr-bismillah">بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</div>' : '';
    html += `<h2 style="text-align:center;margin-bottom:20px;font-family:var(--font-arabic);font-size:28px;color:var(--emerald-700)">${ar.data.name}</h2>`;
    arAyahs.forEach((a, i) => {
      html += `<div class="qr-verse"><div class="qr-verse-num">${a.numberInSurah}</div><div class="qr-verse-ar">${a.text}</div><div class="qr-verse-en">${enAyahs[i]?.text || ''}</div></div>`;
    });
    content.innerHTML = html;
  } catch(e) {
    content.innerHTML = '<p style="color:var(--text-3);padding:20px">Failed to load surah. Please try again.</p>';
  }
}

function closeSurah() {
  document.getElementById('qrList')?.classList.remove('hide');
  document.getElementById('qrReading')?.classList.remove('show');
}

function filterSurahs(q, lang) {
  if (!q) { renderSurahs(surahsList, lang); return; }
  const f = surahsList.filter(s =>
    s.englishName.toLowerCase().includes(q.toLowerCase()) ||
    s.name.includes(q) ||
    s.number.toString() === q ||
    s.englishNameTranslation.toLowerCase().includes(q.toLowerCase())
  );
  renderSurahs(f, lang);
}

const Quran = {
  render(lang) {
    const isAr = lang === 'ar';
    return `
<div class="pg-hd">
  <div class="pg-hd-ic"><i class="ri-book-open-fill"></i></div>
  <h1>${isAr ? 'القرآن الكريم' : 'Quran Reader'}</h1>
  <p>${isAr ? 'تصفح السور مع الترجمة الإنجليزية' : 'Browse all 114 surahs with English translation.'}</p>
</div>
<div class="pg-body">
  <div id="qrList">
    <div class="qr-search rv">
      <input type="text" id="qrSearch" placeholder="${isAr ? 'ابحث عن سورة...' : 'Search surah...'}" oninput="window.filterSurahs(this.value)">
    </div>
    <div class="qr-grid rv rv-d1" id="qrGrid">
      <div class="qr-loading"><i class="ri-loader-4-line" style="animation:lSpin 1s linear infinite"></i> ${isAr ? 'جار التحميل...' : 'Loading surahs...'}</div>
    </div>
  </div>
  <div class="qr-reading" id="qrReading">
    <button class="qr-back" onclick="window.closeSurah()"><i class="ri-arrow-left-line"></i> ${isAr ? 'العودة إلى السور' : 'Back to Surahs'}</button>
    <div id="qrContent"></div>
  </div>
</div>
<footer class="ft"><i class="ri-heart-fill"></i> ${isAr ? 'صُنع للأمة' : 'Built for the Ummah'}</footer>`;
  },

  init(lang) {
    window._quranLang = lang;
    window.filterSurahs = (q) => filterSurahs(q, lang);
    window.closeSurah = closeSurah;
    loadSurahs();
  },

  destroy() {
    delete window._quranLang;
    delete window.filterSurahs;
    delete window.closeSurah;
  }
};

export default Quran;
