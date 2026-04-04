// ═══════════════════════════════════════════════════
// NOOR — pages/quran.js  ·  Redesigned Quran Reader
// Inspired by quran.com  ·  Noor theme
// ═══════════════════════════════════════════════════

// ── Module State ──
let _surahs      = [];
let _arAyahs     = [];
let _transAyahs  = [];
let _currentNum  = null;
let _currentData = null;
let _mode        = 'verse';   // 'verse' | 'reading'
let _trans       = null;      // { id, name }
let _tafsirIdx   = 0;
let _tafsirEd    = 'ar.muyassar';
let _tafsirCache = {};        // 'edition:S:A' → text
let _lang        = 'en';

// ── Available Translations ──
const TRANSLATIONS = [
  { group:'None', items:[{ id:'none', name:'Arabic Only' }] },
  { group:'English', items:[
    { id:'en.asad',      name:'Muhammad Asad'        },
    { id:'en.pickthall', name:'Pickthall'            },
    { id:'en.yusufali',  name:'Yusuf Ali'            },
    { id:'en.sahih',     name:'Saheeh International' },
  ]},
  { group:'Français', items:[{ id:'fr.hamidullah', name:'Hamidullah' }] },
  { group:'Türkçe',   items:[{ id:'tr.ates',       name:'Ateş'       }] },
  { group:'اردو',     items:[{ id:'ur.maududi',    name:'Maududi'    }] },
  { group:'Indonesia',items:[{ id:'id.indonesian', name:'Kemenag RI' }] },
];

// ── Available Tafsirs ──
const TAFSIRS = [
  { id:'ar.muyassar', name:'الميسر',            dir:'rtl' },
  { id:'ar.jalalayn', name:'الجلالين',          dir:'rtl' },
  { id:'ar.katheer',  name:'ابن كثير',          dir:'rtl' },
  { id:'ar.saadi',    name:'السعدي',            dir:'rtl' },
  { id:'ar.baghawy',  name:'البغوي',            dir:'rtl' },
  { id:'ar.tabari',   name:'الطبري',            dir:'rtl' },
  { id:'ar.qurtubi',  name:'القرطبي',           dir:'rtl' },
  { id:'ar.waseet',   name:'الوسيط (الطنطاوي)', dir:'rtl' },
  { id:'en.maududi',  name:'Maududi (EN)',      dir:'ltr' },
];

function defaultTrans(lang) {
  const map = { en:'en.asad', fr:'fr.hamidullah', tr:'tr.ates', ur:'ur.maududi', id:'id.indonesian', ar:'none' };
  const id = map[lang] || 'en.asad';
  for (const g of TRANSLATIONS) {
    const f = g.items.find(i => i.id === id);
    if (f) return f;
  }
  return TRANSLATIONS[1].items[0];
}

// ── Helpers ──
const $  = id => document.getElementById(id);
const q  = (el, sel) => el?.querySelector(sel);
const qa = (el, sel) => el?.querySelectorAll(sel);

function surahSelectOptions() {
  return _surahs.map(s => `<option value="${s.number}">${s.number}. ${s.englishName} — ${s.name}</option>`).join('');
}
function syncSurahSelects() {
  ['qrHeadSel','qrTafSel'].forEach(id => {
    const el = $(id);
    if (!el || !_surahs.length) return;
    if (!el.dataset.filled) { el.innerHTML = surahSelectOptions(); el.dataset.filled='1'; }
    if (_currentNum) el.value = _currentNum;
  });
}

// ── Load surah list ──
async function loadList() {
  if (_surahs.length) { renderGrid(); return; }
  const grid = $('qrGrid');
  if (!grid) return;
  grid.innerHTML = '<div style="text-align:center;padding:60px;grid-column:1/-1"><i class="ri-loader-4-line" style="font-size:28px;animation:lSpin 1s linear infinite;color:var(--emerald-600)"></i></div>';
  try {
    const r = await fetch('https://api.alquran.cloud/v1/surah');
    _surahs = (await r.json()).data;
    renderGrid();
    syncSurahSelects();
  } catch(e) {
    grid.innerHTML = '<p style="color:var(--text-3);text-align:center;padding:40px;grid-column:1/-1">Failed to load. Check your connection.</p>';
  }
}

function renderGrid() {
  const grid = $('qrGrid');
  if (!grid) return;
  const q = $('qrListSearch')?.value?.toLowerCase() || '';
  const list = q
    ? _surahs.filter(s =>
        s.englishName.toLowerCase().includes(q) ||
        s.name.includes(q) ||
        s.number.toString() === q ||
        s.englishNameTranslation.toLowerCase().includes(q)
      )
    : _surahs;

  grid.innerHTML = list.map(s => {
    const type = s.revelationType === 'Meccan'
      ? (_lang==='ar'?'مكية':'Meccan')
      : (_lang==='ar'?'مدنية':'Medinan');
    return `<div class="qr-card" data-num="${s.number}">
      <div class="qr-num">${s.number}</div>
      <div class="qr-ar">${s.name}</div>
      <div class="qr-en">${s.englishName}</div>
      <div class="qr-info">${s.numberOfAyahs} ${_lang==='ar'?'آية':'verses'} · ${type}</div>
    </div>`;
  }).join('');

  grid.querySelectorAll('.qr-card').forEach(card => {
    card.addEventListener('click', () => openSurah(parseInt(card.dataset.num)));
  });
}

// ── Open a surah ──
async function openSurah(num) {
  _currentNum  = num;
  _arAyahs     = [];
  _transAyahs  = [];
  _tafsirCache = {};
  closeTafsir();
  closeTrans();

  // Swap views
  $('qrListView').style.display  = 'none';
  $('qrReadView').style.display  = 'block';
  window.scrollTo({ top:0, behavior:'instant' });

  // Loading state
  $('qrContent').innerHTML = `
    <div style="text-align:center;padding:100px 20px;color:var(--text-3)">
      <i class="ri-loader-4-line" style="font-size:36px;animation:lSpin 1s linear infinite;color:var(--emerald-600)"></i>
      <div style="margin-top:16px">${_lang==='ar'?'جار التحميل...':'Loading surah...'}</div>
    </div>`;

  syncSurahSelects();

  try {
    _currentData = _surahs.find(s => s.number === num) || null;

    // Fetch Arabic text
    const arR = await fetch(`https://api.alquran.cloud/v1/surah/${num}/ar.alafasy`);
    _arAyahs   = (await arR.json()).data.ayahs;

    // Fetch translation (unless Arabic-only)
    if (_trans && _trans.id !== 'none') {
      try {
        const tR  = await fetch(`https://api.alquran.cloud/v1/surah/${num}/${_trans.id}`);
        _transAyahs = (await tR.json()).data.ayahs;
      } catch { _transAyahs = []; }
    }

    renderContent();
    // Update translation button label
    updateTransBtn();

  } catch(e) {
    $('qrContent').innerHTML = `<p style="color:var(--text-3);text-align:center;padding:40px">Failed to load surah. Please try again.</p>`;
  }
}

// ── Render main content ──
function renderContent() {
  window.scrollTo({ top:0, behavior:'instant' });
  if (_mode === 'reading') renderReading();
  else renderVerse();
}

function renderVerse() {
  const content = $('qrContent');
  if (!content || !_arAyahs.length) return;
  const isAr = _lang === 'ar';
  const hasTrans = _transAyahs.length > 0;

  let html = `
    <div class="qrn-banner">
      <div class="qrn-banner-ar">${_currentData?.name || ''}</div>
      <div class="qrn-banner-en">${_currentData?.englishName || ''} — ${_currentData?.englishNameTranslation || ''}</div>
      <div class="qrn-banner-meta">
        <span><i class="ri-map-pin-2-line"></i> ${_currentData?.revelationType||''}</span>
        <span><i class="ri-list-ordered"></i> ${_arAyahs.length} ${isAr?'آية':'verses'}</span>
      </div>
    </div>`;

  if (_currentNum !== 1 && _currentNum !== 9) {
    html += `<div class="qrn-bismillah">بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</div>`;
  }

  html += _arAyahs.map((a, i) => `
    <div class="qrn-verse" id="qrnV${i}" data-idx="${i}">
      <div class="qrn-verse-top">
        <span class="qrn-verse-ref">${_currentNum}:${a.numberInSurah}</span>
      </div>
      <div class="qrn-arabic">${a.text}</div>
      ${hasTrans && _transAyahs[i]
        ? `<div class="qrn-trans">${_transAyahs[i].text}</div>` : ''}
      <div class="qrn-actions">
        <button class="qrn-tafsir-btn" data-idx="${i}">
          <i class="ri-book-2-line"></i>
          ${isAr ? 'التفسير' : 'Tafsir'}
        </button>
      </div>
    </div>`).join('');

  content.innerHTML = html;

  content.querySelectorAll('.qrn-tafsir-btn').forEach(btn => {
    btn.addEventListener('click', () => openTafsir(parseInt(btn.dataset.idx)));
  });
}

function renderReading() {
  const content = $('qrContent');
  if (!content || !_arAyahs.length) return;
  const isAr = _lang === 'ar';
  const hasTrans = _transAyahs.length > 0;

  let html = `
    <div class="qrn-banner">
      <div class="qrn-banner-ar">${_currentData?.name || ''}</div>
      <div class="qrn-banner-en">${_currentData?.englishName || ''}</div>
      <div class="qrn-banner-meta">
        <span>${_currentData?.revelationType||''}</span>
        <span>${_arAyahs.length} ${isAr?'آية':'verses'}</span>
      </div>
    </div>`;

  if (_currentNum !== 1 && _currentNum !== 9) {
    html += `<div class="qrn-bismillah">بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</div>`;
  }

  // Continuous Arabic mushaf style
  html += `<div class="qrn-reading-block">
    ${_arAyahs.map(a => `${a.text} <span class="qrn-vmarker">${a.numberInSurah}</span>`).join(' ')}
  </div>`;

  // Translation block
  if (hasTrans) {
    html += `<div class="qrn-reading-trans">
      <div class="qrn-rt-label">${_trans?.name || 'Translation'}</div>
      ${_transAyahs.map((t,i) => `<span class="qrn-rt-verse"><strong>${_arAyahs[i]?.numberInSurah}.</strong> ${t.text}</span>`).join(' ')}
    </div>`;
  }

  content.innerHTML = html;
}

// ── Tafsir Modal ──
function openTafsir(idx) {
  _tafsirIdx = idx;
  $('qrTafsirOverlay').style.display = 'flex';
  updateTafsirHeader();
  loadTafsir(_tafsirEd, idx);
}

function closeTafsir() {
  const el = $('qrTafsirOverlay');
  if (el) el.style.display = 'none';
}

function updateTafsirHeader() {
  const ayah = _arAyahs[_tafsirIdx];
  if (!ayah) return;

  const refEl    = $('qrTafRef');
  const verseEl  = $('qrTafVerse');
  const prevBtn  = $('qrTafPrev');
  const nextBtn  = $('qrTafNext');

  if (refEl)   refEl.textContent = `${_currentNum}:${ayah.numberInSurah}`;
  if (verseEl) verseEl.textContent = ayah.text;
  if (prevBtn) prevBtn.disabled = _tafsirIdx === 0;
  if (nextBtn) nextBtn.disabled = _tafsirIdx === _arAyahs.length - 1;

  syncSurahSelects();
}

async function loadTafsir(edition, idx) {
  _tafsirEd = edition;

  // Active tab
  document.querySelectorAll('.qrn-taf-tab').forEach(t => {
    t.classList.toggle('active', t.dataset.ed === edition);
  });

  const textEl = $('qrTafText');
  if (!textEl) return;

  const ayah = _arAyahs[idx];
  if (!ayah) return;

  const cacheKey = `${edition}:${_currentNum}:${ayah.numberInSurah}`;
  if (_tafsirCache[cacheKey]) { showTafsirText(_tafsirCache[cacheKey], edition); return; }

  textEl.innerHTML = `<div style="text-align:center;padding:40px;color:var(--text-3)">
    <i class="ri-loader-4-line" style="font-size:24px;animation:lSpin 1s linear infinite"></i>
  </div>`;

  try {
    const r = await fetch(`https://api.alquran.cloud/v1/ayah/${_currentNum}:${ayah.numberInSurah}/${edition}`);
    const d = await r.json();
    const text = d.data?.text || '';
    if (text) {
      _tafsirCache[cacheKey] = text;
      showTafsirText(text, edition);
    } else {
      textEl.innerHTML = `<p style="color:var(--text-3);padding:20px;text-align:center">Not available for this verse in this edition.</p>`;
    }
  } catch {
    textEl.innerHTML = `<p style="color:var(--text-3);padding:20px;text-align:center">Failed to load. Check your connection.</p>`;
  }
}

function showTafsirText(text, edition) {
  const el   = $('qrTafText');
  const info = TAFSIRS.find(t => t.id === edition);
  if (el) el.innerHTML = `<div class="qrn-taf-body" dir="${info?.dir||'rtl'}">${text}</div>`;
}

// ── Translation Sidebar ──
function openTrans() {
  $('qrTransSidebar')?.classList.add('open');
}
function closeTrans() {
  $('qrTransSidebar')?.classList.remove('open');
}

function selectTrans(id, name) {
  _trans = { id, name };
  document.querySelectorAll('.qrn-trans-item').forEach(item => {
    item.classList.toggle('active', item.dataset.id === id);
  });
  updateTransBtn();
  if (_currentNum) openSurah(_currentNum);
  closeTrans();
}

function updateTransBtn() {
  const el = $('qrTransBtn');
  if (el && _trans) {
    el.innerHTML = `<i class="ri-translate-2"></i> ${_trans.name} <i class="ri-arrow-down-s-line"></i>`;
  }
}

// ── Mode toggle ──
function setMode(m) {
  _mode = m;
  $('qrModeVerse')?.classList.toggle('active', m==='verse');
  $('qrModeRead')?.classList.toggle('active', m==='reading');
  renderContent();
}

// ── Back ──
function goBack() {
  _currentNum = null;
  $('qrListView').style.display  = 'block';
  $('qrReadView').style.display  = 'none';
  closeTafsir();
  closeTrans();
  window.scrollTo({ top:0, behavior:'instant' });
}

// ── Verse search ──
function searchVerse(q) {
  const cards = document.querySelectorAll('.qrn-verse');
  if (!q.trim()) { cards.forEach(c=>{ c.style.opacity='1'; c.style.display=''; }); return; }
  const num = parseInt(q);
  let scrolled = false;
  cards.forEach((card, i) => {
    const ayah = _arAyahs[i];
    const trs  = _transAyahs[i];
    const hit  = (!isNaN(num) && ayah?.numberInSurah===num) ||
                  ayah?.text?.includes(q) ||
                  trs?.text?.toLowerCase().includes(q.toLowerCase());
    card.style.opacity = hit ? '1' : '0.25';
    card.style.display = '';
    if (hit && !scrolled && !isNaN(num)) { card.scrollIntoView({behavior:'smooth',block:'start'}); scrolled=true; }
  });
}

// ── Page Module ──
const Quran = {
  render(lang) {
    _lang = lang;
    if (!_trans) _trans = defaultTrans(lang);
    const isAr = lang === 'ar';

    const transListHtml = TRANSLATIONS.map(g => `
      <div class="qrn-ts-group">
        <div class="qrn-ts-glabel">${g.group}</div>
        ${g.items.map(item => `
          <div class="qrn-trans-item${_trans?.id===item.id?' active':''}" data-id="${item.id}" data-name="${item.name}">
            ${_trans?.id===item.id?'<i class="ri-check-line" style="margin-right:6px;color:var(--emerald-600)"></i>':'<span style="width:20px;display:inline-block"></span>'}
            ${item.name}
          </div>`).join('')}
      </div>`).join('');

    const tafsirTabsHtml = TAFSIRS.map(t => `
      <button class="qrn-taf-tab${t.id===_tafsirEd?' active':''}" data-ed="${t.id}">${t.name}</button>
    `).join('');

    return `
<div id="qrApp">

  <!-- ══ SURAH LIST ══ -->
  <div id="qrListView">
    <div class="pg-hd">
      <div class="pg-hd-ic"><i class="ri-book-open-fill"></i></div>
      <h1>${isAr?'القرآن الكريم':'Quran Reader'}</h1>
      <p>${isAr?'١١٤ سورة مع الترجمة والتفسير':'114 surahs with translation and authentic tafsir.'}</p>
    </div>
    <div class="pg-body">
      <div class="qr-search rv">
        <input type="text" id="qrListSearch"
          placeholder="${isAr?'ابحث بالاسم أو الرقم...':'Search by name or number...'}">
      </div>
      <div class="qr-grid rv rv-d1" id="qrGrid"></div>
    </div>
  </div>

  <!-- ══ SURAH READER ══ -->
  <div id="qrReadView" style="display:none">

    <!-- Sticky header -->
    <div class="qrn-header">
      <button class="qrn-hbtn" id="qrBackBtn" title="${isAr?'العودة':'Back'}">
        <i class="${isAr?'ri-arrow-right-line':'ri-arrow-left-line'}"></i>
      </button>

      <select class="qrn-hsel" id="qrHeadSel"></select>

      <div class="qrn-hsearch">
        <i class="ri-search-line"></i>
        <input type="text" id="qrVerseSearch"
          placeholder="${isAr?'رقم الآية...':'Verse no...'}">
      </div>

      <div class="qrn-modes">
        <button class="qrn-mode active" id="qrModeVerse">
          <i class="ri-list-check"></i>
          <span>${isAr?'آية آية':'Verse'}</span>
        </button>
        <button class="qrn-mode" id="qrModeRead">
          <i class="ri-book-read-line"></i>
          <span>${isAr?'قراءة':'Reading'}</span>
        </button>
      </div>

      <button class="qrn-trans-btn" id="qrTransBtn">
        <i class="ri-translate-2"></i>
        <span>${_trans?.name||'Translation'}</span>
        <i class="ri-arrow-down-s-line"></i>
      </button>
    </div>

    <!-- Verse content -->
    <div class="qrn-content" id="qrContent"></div>

    <!-- ── Translation sidebar ── -->
    <div class="qrn-trans-sidebar" id="qrTransSidebar">
      <div class="qrn-ts-header">
        <span>${isAr?'اختر الترجمة':'Translations'}</span>
        <button id="qrTransClose"><i class="ri-close-line"></i></button>
      </div>
      <div class="qrn-ts-list">${transListHtml}</div>
    </div>

    <!-- ── Tafsir Modal ── -->
    <div class="qrn-taf-overlay" id="qrTafsirOverlay" style="display:none">
      <div class="qrn-taf-modal">

        <!-- Modal header -->
        <div class="qrn-taf-mhead">
          <select class="qrn-hsel" id="qrTafSel" style="max-width:180px;font-size:13px"></select>
          <div class="qrn-taf-nav">
            <button class="qrn-taf-navbtn" id="qrTafPrev">
              <i class="${isAr?'ri-arrow-right-s-line':'ri-arrow-left-s-line'}"></i>
            </button>
            <span class="qrn-taf-ref" id="qrTafRef">—</span>
            <button class="qrn-taf-navbtn" id="qrTafNext">
              <i class="${isAr?'ri-arrow-left-s-line':'ri-arrow-right-s-line'}"></i>
            </button>
          </div>
          <button class="qrn-taf-closebtn" id="qrTafClose">
            <i class="ri-close-line"></i>
          </button>
        </div>

        <!-- Verse display -->
        <div class="qrn-taf-verse" id="qrTafVerse"></div>

        <!-- Tafsir edition tabs -->
        <div class="qrn-taf-tabs" id="qrTafTabs">${tafsirTabsHtml}</div>

        <!-- Tafsir text -->
        <div class="qrn-taf-text" id="qrTafText">
          <div style="color:var(--text-3);text-align:center;padding:50px">
            ${isAr?'اضغط على زر "التفسير" في أي آية':'Click the Tafsir button on any verse to begin'}
          </div>
        </div>

      </div>
    </div>

  </div><!-- end qrReadView -->

</div><!-- end qrApp -->
<footer class="ft"><i class="ri-heart-fill"></i> ${isAr?'صُنع للأمة':'Built for the Ummah'}</footer>`;
  },

  init(lang) {
    _lang = lang;
    if (!_trans) _trans = defaultTrans(lang);

    // List search
    $('qrListSearch')?.addEventListener('input', renderGrid);

    // Back button
    $('qrBackBtn')?.addEventListener('click', goBack);

    // Header surah select
    $('qrHeadSel')?.addEventListener('change', e => openSurah(parseInt(e.target.value)));

    // Tafsir surah select
    $('qrTafSel')?.addEventListener('change', e => {
      closeTafsir();
      openSurah(parseInt(e.target.value));
    });

    // Mode buttons
    $('qrModeVerse')?.addEventListener('click', () => setMode('verse'));
    $('qrModeRead')?.addEventListener('click',  () => setMode('reading'));

    // Translation sidebar
    $('qrTransBtn')?.addEventListener('click', openTrans);
    $('qrTransClose')?.addEventListener('click', closeTrans);
    $('qrTransSidebar')?.addEventListener('click', e => {
      const item = e.target.closest('.qrn-trans-item');
      if (item) selectTrans(item.dataset.id, item.dataset.name);
    });

    // Tafsir modal
    $('qrTafClose')?.addEventListener('click', closeTafsir);
    $('qrTafsirOverlay')?.addEventListener('click', e => {
      if (e.target === $('qrTafsirOverlay')) closeTafsir();
    });

    // Tafsir prev / next
    $('qrTafPrev')?.addEventListener('click', () => {
      if (_tafsirIdx > 0) { _tafsirIdx--; updateTafsirHeader(); loadTafsir(_tafsirEd, _tafsirIdx); }
    });
    $('qrTafNext')?.addEventListener('click', () => {
      if (_tafsirIdx < _arAyahs.length-1) { _tafsirIdx++; updateTafsirHeader(); loadTafsir(_tafsirEd, _tafsirIdx); }
    });

    // Tafsir tabs (delegation)
    $('qrTafTabs')?.addEventListener('click', e => {
      const tab = e.target.closest('.qrn-taf-tab');
      if (tab) loadTafsir(tab.dataset.ed, _tafsirIdx);
    });

    // Verse search
    $('qrVerseSearch')?.addEventListener('input', e => searchVerse(e.target.value));

    // Close translation sidebar when clicking outside
    document.addEventListener('click', e => {
      const sidebar = $('qrTransSidebar');
      const btn     = $('qrTransBtn');
      if (sidebar?.classList.contains('open') && !sidebar.contains(e.target) && e.target!==btn && !btn?.contains(e.target)) {
        closeTrans();
      }
    });

    // Load surah list
    loadList();
  },

  destroy() {
    closeTafsir();
    closeTrans();
    document.removeEventListener('click', closeTrans);
  }
};

export default Quran;
