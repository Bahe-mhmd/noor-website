// ═══════════════════════════════════════════════════
// NOOR — pages/quran.js  (v6 — body-portal modal fix)
//
// ROOT CAUSE FIX: .page has transform:translateY() for
// entrance animation. CSS spec: any element with a
// transform creates a new containing block, so
// position:fixed children are positioned relative to
// that parent, NOT the viewport. Fix: append the tafsir
// modal directly to document.body — outside all transforms.
// ═══════════════════════════════════════════════════
import { t } from '../i18n.js';

let _surahs = [], _arAyahs = [], _transAyahs = [];
let _currentNum = null, _currentData = null;
let _mode = 'verse', _trans = null;
let _tafsirIdx = 0, _tafsirEd = 'ar.muyassar';
let _tafsirCache = {}, _lang = 'en';
let _tafsirEl = null; // The body-level tafsir DOM node

// ── Diacritic stripper for fuzzy search ──
function stripDiac(s) {
  if (!s) return '';
  return s
    .replace(/[\u064B-\u065F\u0610-\u061A\u06D6-\u06DC\u06DF-\u06E8\u06EA-\u06ED\u0670]/g, '')
    .replace(/[أإآٱ]/g, 'ا').replace(/ة/g, 'ه').replace(/ى/g, 'ي')
    .replace(/\s+/g, ' ').trim();
}

const TRANSLATIONS = [
  { group:'None',     items:[{ id:'none',          name:'Arabic Only'    }] },
  { group:'English',  items:[
    { id:'en.asad',     name:'Muhammad Asad'   },
    { id:'en.pickthall',name:'Pickthall'       },
    { id:'en.yusufali', name:'Yusuf Ali'       },
    { id:'en.sahih',    name:'Saheeh Intl'     },
  ]},
  { group:'Français', items:[{ id:'fr.hamidullah', name:'Hamidullah (FR)' }] },
  { group:'Türkçe',   items:[{ id:'tr.ates',       name:'Suat Ateş (TR)'  }] },
  { group:'اردو',     items:[{ id:'ur.maududi',    name:'مودودی (اردو)'   }] },
  { group:'Indonesia',items:[{ id:'id.indonesian', name:'Kemenag (ID)'    }] },
];

const TAFSIRS = [
  { id:'ar.muyassar', name:'الميسّر',  dir:'rtl' },
  { id:'ar.jalalayn', name:'الجلالين',dir:'rtl' },
  { id:'ar.katheer',  name:'ابن كثير',dir:'rtl' },
  { id:'ar.saadi',    name:'السعدي',  dir:'rtl' },
  { id:'ar.baghawy',  name:'البغوي',  dir:'rtl' },
  { id:'ar.tabari',   name:'الطبري',  dir:'rtl' },
  { id:'ar.qurtubi',  name:'القرطبي', dir:'rtl' },
  { id:'ar.waseet',   name:'الوسيط',  dir:'rtl' },
  { id:'en.maududi',  name:'Maududi', dir:'ltr' },
];

function defaultTrans(lang) {
  const map = { en:'en.asad', fr:'fr.hamidullah', tr:'tr.ates', ur:'ur.maududi', id:'id.indonesian', ar:'none' };
  const id = map[lang] || 'en.asad';
  for (const g of TRANSLATIONS) { const f = g.items.find(i => i.id === id); if (f) return f; }
  return TRANSLATIONS[1].items[0];
}

const $ = id => document.getElementById(id);

// ════════════════════════════════════════
// TAFSIR MODAL — Rendered directly on body
// This bypasses all CSS transform ancestors
// ════════════════════════════════════════
function buildTafsirModal() {
  // Remove any stale modal
  const old = document.getElementById('noorTafsirPortal');
  if (old) old.remove();

  const isRTL = _lang === 'ar' || _lang === 'ur';
  const tafsirTabsHtml = TAFSIRS.map(tf =>
    '<button class="qrn-taf-tab' + (tf.id === _tafsirEd ? ' active' : '') + '" data-ed="' + tf.id + '">' + tf.name + '</button>'
  ).join('');

  const div = document.createElement('div');
  div.id = 'noorTafsirPortal';
  // Inline styles — nothing can override these, no CSS cascade issues
  div.style.cssText = [
    'position:fixed',
    'inset:0',
    'width:100vw',
    'height:100vh',
    'background:rgba(0,0,0,0.62)',
    'z-index:2147483647',  // max z-index
    'display:flex',
    'align-items:center',
    'justify-content:center',
    'padding:16px',
    'box-sizing:border-box',
    'animation:qrTafFadeIn .22s ease'
  ].join(';');

  div.innerHTML = `
    <div class="qrn-taf-modal">
      <div class="qrn-taf-mhead">
        <select class="qrn-hsel" id="qrTafSel" style="max-width:200px;font-size:13px"></select>
        <div class="qrn-taf-nav">
          <button class="qrn-taf-navbtn" id="qrTafPrev">
            <i class="${isRTL ? 'ri-arrow-right-s-line' : 'ri-arrow-left-s-line'}"></i>
          </button>
          <span class="qrn-taf-ref" id="qrTafRef">—</span>
          <button class="qrn-taf-navbtn" id="qrTafNext">
            <i class="${isRTL ? 'ri-arrow-left-s-line' : 'ri-arrow-right-s-line'}"></i>
          </button>
        </div>
        <button class="qrn-taf-closebtn" id="qrTafClose">
          <i class="ri-close-line"></i>
        </button>
      </div>
      <div class="qrn-taf-verse" id="qrTafVerse"></div>
      <div class="qrn-taf-tabs" id="qrTafTabs">${tafsirTabsHtml}</div>
      <div class="qrn-taf-text" id="qrTafText">
        <div style="text-align:center;padding:60px;color:var(--text-3)">
          <i class="ri-loader-4-line" style="font-size:28px;animation:lSpin 1s linear infinite"></i>
        </div>
      </div>
    </div>`;

  // Append to BODY — completely outside the .page transform context
  document.body.appendChild(div);
  _tafsirEl = div;

  // Wire events on the newly created elements
  div.addEventListener('click', e => { if (e.target === div) closeTafsir(); });
  document.getElementById('qrTafClose')?.addEventListener('click', closeTafsir);
  document.getElementById('qrTafPrev')?.addEventListener('click', () => {
    if (_tafsirIdx > 0) { _tafsirIdx--; refreshTafsirHeader(); loadTafsir(_tafsirEd, _tafsirIdx); }
  });
  document.getElementById('qrTafNext')?.addEventListener('click', () => {
    if (_tafsirIdx < _arAyahs.length - 1) { _tafsirIdx++; refreshTafsirHeader(); loadTafsir(_tafsirEd, _tafsirIdx); }
  });
  document.getElementById('qrTafTabs')?.addEventListener('click', e => {
    const tab = e.target.closest('.qrn-taf-tab');
    if (tab) loadTafsir(tab.dataset.ed, _tafsirIdx);
  });
  document.getElementById('qrTafSel')?.addEventListener('change', e => {
    closeTafsir();
    openSurah(parseInt(e.target.value));
  });

  // Populate surah select
  const sel = document.getElementById('qrTafSel');
  if (sel && _surahs.length) {
    sel.innerHTML = _surahs.map(s => '<option value="' + s.number + '">' + s.number + '. ' + s.englishName + ' — ' + s.name + '</option>').join('');
    if (_currentNum) sel.value = _currentNum;
  }

  // ESC key closes
  window._tafsirEscHandler = e => { if (e.key === 'Escape') closeTafsir(); };
  document.addEventListener('keydown', window._tafsirEscHandler);

  return div;
}

function openTafsir(idx) {
  _tafsirIdx = idx;

  // Build and inject modal directly on body — bypasses transform bug
  buildTafsirModal();
  document.body.style.overflow = 'hidden';

  refreshTafsirHeader();
  loadTafsir(_tafsirEd, idx);
}

function closeTafsir() {
  if (_tafsirEl) {
    _tafsirEl.style.animation = 'qrTafFadeOut .18s ease forwards';
    setTimeout(() => {
      _tafsirEl?.remove();
      _tafsirEl = null;
    }, 180);
  }
  document.body.style.overflow = '';
  if (window._tafsirEscHandler) {
    document.removeEventListener('keydown', window._tafsirEscHandler);
    delete window._tafsirEscHandler;
  }
}

function refreshTafsirHeader() {
  const ayah = _arAyahs[_tafsirIdx];
  if (!ayah) return;
  const refEl = document.getElementById('qrTafRef');
  const verseEl = document.getElementById('qrTafVerse');
  const prevBtn = document.getElementById('qrTafPrev');
  const nextBtn = document.getElementById('qrTafNext');
  if (refEl)   refEl.textContent = _currentNum + ':' + ayah.numberInSurah;
  if (verseEl) verseEl.textContent = ayah.text;
  if (prevBtn) prevBtn.disabled = _tafsirIdx === 0;
  if (nextBtn) nextBtn.disabled = _tafsirIdx === _arAyahs.length - 1;
  const textEl = document.getElementById('qrTafText');
  if (textEl) textEl.scrollTop = 0;
}

async function loadTafsir(edition, idx) {
  _tafsirEd = edition;
  document.querySelectorAll('.qrn-taf-tab').forEach(tab => tab.classList.toggle('active', tab.dataset.ed === edition));
  const textEl = document.getElementById('qrTafText');
  if (!textEl) return;
  const ayah = _arAyahs[idx];
  if (!ayah) return;
  const key = edition + ':' + _currentNum + ':' + ayah.numberInSurah;
  if (_tafsirCache[key]) { showTafsirText(_tafsirCache[key], edition); return; }
  textEl.innerHTML = '<div style="text-align:center;padding:60px;color:var(--text-3)"><i class="ri-loader-4-line" style="font-size:24px;animation:lSpin 1s linear infinite"></i></div>';
  textEl.scrollTop = 0;
  try {
    const d = (await (await fetch('https://api.alquran.cloud/v1/ayah/' + _currentNum + ':' + ayah.numberInSurah + '/' + edition)).json()).data;
    const text = d?.text || '';
    if (text) { _tafsirCache[key] = text; showTafsirText(text, edition); }
    else textEl.innerHTML = '<p style="color:var(--text-3);padding:30px;text-align:center">Not available for this verse.</p>';
  } catch {
    textEl.innerHTML = '<p style="color:var(--text-3);padding:30px;text-align:center">' + t('common.error', _lang) + '</p>';
  }
}

function showTafsirText(text, edition) {
  const el = document.getElementById('qrTafText');
  const info = TAFSIRS.find(t => t.id === edition);
  if (el) {
    el.innerHTML = '<div class="qrn-taf-body" dir="' + (info?.dir || 'rtl') + '">' + text + '</div>';
    el.scrollTop = 0;
  }
}

// ── Surah list ──
function surahOpts() {
  return _surahs.map(s => '<option value="' + s.number + '">' + s.number + '. ' + s.englishName + ' — ' + s.name + '</option>').join('');
}
function syncHeadSel() {
  const el = $('qrHeadSel');
  if (!el || !_surahs.length) return;
  if (!el.dataset.filled) { el.innerHTML = surahOpts(); el.dataset.filled = '1'; }
  if (_currentNum) el.value = _currentNum;
}

async function loadList() {
  if (_surahs.length) { renderGrid(); return; }
  const grid = $('qrGrid');
  if (!grid) return;
  grid.innerHTML = '<div style="text-align:center;padding:60px;grid-column:1/-1;color:var(--text-3)"><i class="ri-loader-4-line" style="font-size:28px;animation:lSpin 1s linear infinite;color:var(--emerald-600)"></i><div style="margin-top:12px">' + t('common.loading', _lang) + '</div></div>';
  try {
    _surahs = (await (await fetch('https://api.alquran.cloud/v1/surah')).json()).data;
    renderGrid();
    syncHeadSel();
  } catch (e) {
    if (grid) grid.innerHTML = '<p style="color:var(--text-3);text-align:center;padding:40px;grid-column:1/-1">' + t('common.error', _lang) + '</p>';
  }
}

function renderGrid() {
  const grid = $('qrGrid');
  if (!grid) return;
  const q = ($('qrListSearch')?.value || '').toLowerCase();
  const norm = stripDiac(q);
  const list = q ? _surahs.filter(s =>
    s.englishName.toLowerCase().includes(q) || s.name.includes(q) ||
    stripDiac(s.name).includes(norm) || s.number.toString() === q ||
    s.englishNameTranslation.toLowerCase().includes(q)
  ) : _surahs;
  const meccan = t('quran.meccan', _lang), medinan = t('quran.medinan', _lang), verses = t('common.verses', _lang);
  grid.innerHTML = list.map(s =>
    '<div class="qr-card" data-num="' + s.number + '">'
    + '<div class="qr-num">' + s.number + '</div>'
    + '<div class="qr-ar">' + s.name + '</div>'
    + '<div class="qr-en">' + s.englishName + '</div>'
    + '<div class="qr-info">' + s.numberOfAyahs + ' ' + verses + ' · ' + (s.revelationType === 'Meccan' ? meccan : medinan) + '</div>'
    + '</div>'
  ).join('');
  grid.querySelectorAll('.qr-card').forEach(c => c.addEventListener('click', () => openSurah(parseInt(c.dataset.num))));
}

// ── Open surah ──
async function openSurah(num) {
  _currentNum = num;
  _arAyahs = []; _transAyahs = []; _tafsirCache = {};
  closeTafsir(); closeTrans();
  $('qrListView').style.display = 'none';
  $('qrReadView').style.display = 'block';
  window.scrollTo({ top: 0, behavior: 'instant' });
  $('qrContent').innerHTML = '<div style="text-align:center;padding:120px 20px;color:var(--text-3)"><i class="ri-loader-4-line" style="font-size:36px;animation:lSpin 1s linear infinite;color:var(--emerald-600)"></i><div style="margin-top:16px">' + t('common.loading', _lang) + '</div></div>';
  syncHeadSel();
  try {
    _currentData = _surahs.find(s => s.number === num) || null;
    _arAyahs = (await (await fetch('https://api.alquran.cloud/v1/surah/' + num + '/ar.alafasy')).json()).data.ayahs;
    if (_trans && _trans.id !== 'none') {
      try { _transAyahs = (await (await fetch('https://api.alquran.cloud/v1/surah/' + num + '/' + _trans.id)).json()).data.ayahs; } catch { _transAyahs = []; }
    }
    renderContent();
    updateTransBtn();
  } catch (e) {
    $('qrContent').innerHTML = '<p style="color:var(--text-3);text-align:center;padding:40px">' + t('common.error', _lang) + '</p>';
  }
}

function renderContent() {
  window.scrollTo({ top: 0, behavior: 'instant' });
  _mode === 'reading' ? renderReading() : renderVerse();
}

function renderVerse() {
  const content = $('qrContent');
  if (!content || !_arAyahs.length) return;
  const hasTrans = _transAyahs.length > 0;
  const tafLabel = t('quran.tafsir', _lang), vLabel = t('common.verses', _lang);
  const meccan = t('quran.meccan', _lang), medinan = t('quran.medinan', _lang);
  let html = '<div class="qrn-banner">'
    + '<div class="qrn-banner-ar">' + (_currentData?.name || '') + '</div>'
    + '<div class="qrn-banner-en">' + (_currentData?.englishName || '') + ' — ' + (_currentData?.englishNameTranslation || '') + '</div>'
    + '<div class="qrn-banner-meta">'
    + '<span><i class="ri-map-pin-2-line"></i> ' + (_currentData?.revelationType === 'Meccan' ? meccan : medinan) + '</span>'
    + '<span><i class="ri-list-ordered"></i> ' + _arAyahs.length + ' ' + vLabel + '</span>'
    + '</div></div>';
  if (_currentNum !== 1 && _currentNum !== 9) {
    html += '<div class="qrn-bismillah">بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</div>';
  }
  html += _arAyahs.map((a, i) =>
    '<div class="qrn-verse" data-idx="' + i + '">'
    + '<div class="qrn-verse-top"><span class="qrn-verse-ref">' + _currentNum + ':' + a.numberInSurah + '</span></div>'
    + '<div class="qrn-arabic">' + a.text + '</div>'
    + (hasTrans && _transAyahs[i] ? '<div class="qrn-trans">' + _transAyahs[i].text + '</div>' : '')
    + '<div class="qrn-actions"><button class="qrn-tafsir-btn" data-idx="' + i + '"><i class="ri-book-2-line"></i> ' + tafLabel + '</button></div>'
    + '</div>'
  ).join('');
  content.innerHTML = html;
  content.querySelectorAll('.qrn-tafsir-btn').forEach(btn =>
    btn.addEventListener('click', () => openTafsir(parseInt(btn.dataset.idx)))
  );
}

function renderReading() {
  const content = $('qrContent');
  if (!content || !_arAyahs.length) return;
  const hasTrans = _transAyahs.length > 0, vLabel = t('common.verses', _lang);
  let html = '<div class="qrn-banner">'
    + '<div class="qrn-banner-ar">' + (_currentData?.name || '') + '</div>'
    + '<div class="qrn-banner-en">' + (_currentData?.englishName || '') + '</div>'
    + '<div class="qrn-banner-meta">'
    + '<span>' + (_currentData?.revelationType || '') + '</span>'
    + '<span>' + _arAyahs.length + ' ' + vLabel + '</span>'
    + '</div></div>';
  if (_currentNum !== 1 && _currentNum !== 9) html += '<div class="qrn-bismillah">بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</div>';
  html += '<div class="qrn-reading-block">' + _arAyahs.map(a => a.text + ' <span class="qrn-vmarker">' + a.numberInSurah + '</span>').join(' ') + '</div>';
  if (hasTrans) {
    html += '<div class="qrn-reading-trans"><div class="qrn-rt-label">' + (_trans?.name || t('quran.translation', _lang)) + '</div>'
      + _transAyahs.map((tr, i) => '<span class="qrn-rt-verse"><strong>' + (i + 1) + '.</strong> ' + tr.text + ' </span>').join('')
      + '</div>';
  }
  content.innerHTML = html;
}

// ── Translation sidebar ──
function openTrans()  { $('qrTransSidebar')?.classList.add('open'); }
function closeTrans() { $('qrTransSidebar')?.classList.remove('open'); }

function selectTrans(id, name) {
  _trans = { id, name };
  document.querySelectorAll('.qrn-trans-item').forEach(el => el.classList.toggle('active', el.dataset.id === id));
  updateTransBtn();
  if (_currentNum) openSurah(_currentNum);
  closeTrans();
}
function updateTransBtn() {
  const el = $('qrTransBtn');
  if (el && _trans) el.innerHTML = '<i class="ri-translate-2"></i> <span>' + _trans.name + '</span> <i class="ri-arrow-down-s-line"></i>';
}

function setMode(m) {
  _mode = m;
  $('qrModeVerse')?.classList.toggle('active', m === 'verse');
  $('qrModeRead')?.classList.toggle('active', m === 'reading');
  renderContent();
}

function goBack() {
  _currentNum = null;
  $('qrListView').style.display = 'block';
  $('qrReadView').style.display = 'none';
  closeTafsir(); closeTrans();
  window.scrollTo({ top: 0, behavior: 'instant' });
}

function searchVerse(q) {
  if (!q.trim()) { document.querySelectorAll('.qrn-verse').forEach(c => c.style.opacity = '1'); return; }
  const qNum = parseInt(q), isNum = !isNaN(qNum) && /^\d+$/.test(q.trim());
  const qNorm = stripDiac(q).toLowerCase();
  let found = false;
  document.querySelectorAll('.qrn-verse').forEach((card, i) => {
    const ayah = _arAyahs[i], trs = _transAyahs[i];
    const hit = isNum
      ? ayah?.numberInSurah === qNum
      : (stripDiac(ayah?.text || '').toLowerCase().includes(qNorm) || (trs?.text || '').toLowerCase().includes(qNorm));
    card.style.opacity = hit ? '1' : '0.2';
    card.style.transition = 'opacity .2s';
    if (hit && !found) { found = true; setTimeout(() => card.scrollIntoView({ behavior: 'smooth', block: 'center' }), 50); }
  });
}

// ── Page Module ──
const Quran = {
  render(lang) {
    _lang = lang;
    if (!_trans) _trans = defaultTrans(lang);
    const isRTL = lang === 'ar' || lang === 'ur';

    const transListHtml = TRANSLATIONS.map(g =>
      '<div class="qrn-ts-group"><div class="qrn-ts-glabel">' + g.group + '</div>'
      + g.items.map(item =>
        '<div class="qrn-trans-item' + (_trans?.id === item.id ? ' active' : '') + '" data-id="' + item.id + '" data-name="' + item.name + '">'
        + (_trans?.id === item.id ? '<i class="ri-check-line" style="margin-right:6px;color:var(--emerald-600)"></i>' : '<span style="width:22px;display:inline-block"></span>')
        + item.name + '</div>'
      ).join('') + '</div>'
    ).join('');

    return '<div id="qrApp">'

      // ── List view ──
      + '<div id="qrListView">'
      + '<div class="pg-hd"><div class="pg-hd-ic"><i class="ri-book-open-fill"></i></div>'
      + '<h1>' + t('quran.title', lang) + '</h1><p>' + t('quran.sub', lang) + '</p></div>'
      + '<div class="pg-body">'
      + '<div class="qr-search rv"><input type="text" id="qrListSearch" placeholder="' + t('quran.search', lang) + '"></div>'
      + '<div class="qr-grid rv rv-d1" id="qrGrid"></div>'
      + '</div></div>'

      // ── Reader view ──
      + '<div id="qrReadView" style="display:none">'

      // Header bar
      + '<div class="qrn-header">'
      + '<button class="qrn-hbtn" id="qrBackBtn"><i class="' + (isRTL ? 'ri-arrow-right-line' : 'ri-arrow-left-line') + '"></i></button>'
      + '<select class="qrn-hsel" id="qrHeadSel"></select>'
      + '<div class="qrn-hsearch"><i class="ri-search-line"></i><input type="text" id="qrVerseSearch" placeholder="' + t('quran.verse_ph', lang) + '"></div>'
      + '<div class="qrn-modes">'
      + '<button class="qrn-mode active" id="qrModeVerse"><i class="ri-list-check"></i><span>' + t('quran.verse', lang) + '</span></button>'
      + '<button class="qrn-mode" id="qrModeRead"><i class="ri-book-read-line"></i><span>' + t('quran.reading', lang) + '</span></button>'
      + '</div>'
      + '<button class="qrn-trans-btn" id="qrTransBtn">'
      + '<i class="ri-translate-2"></i><span>' + (_trans ? _trans.name : t('quran.translation', lang)) + '</span>'
      + '<i class="ri-arrow-down-s-line"></i></button>'
      + '</div>'

      // Verse content
      + '<div class="qrn-content" id="qrContent"></div>'

      // Translation sidebar
      + '<div class="qrn-trans-sidebar" id="qrTransSidebar">'
      + '<div class="qrn-ts-header"><span>' + t('quran.translations', lang) + '</span>'
      + '<button id="qrTransClose"><i class="ri-close-line"></i></button></div>'
      + '<div class="qrn-ts-list">' + transListHtml + '</div></div>'

      + '</div></div>'

      + '<footer class="ft"><i class="ri-heart-fill"></i> ' + t('common.ummah', lang) + '</footer>';
  },

  init(lang) {
    _lang = lang;
    if (!_trans) _trans = defaultTrans(lang);

    $('qrListSearch')?.addEventListener('input', renderGrid);
    $('qrBackBtn')?.addEventListener('click', goBack);
    $('qrHeadSel')?.addEventListener('change', e => openSurah(parseInt(e.target.value)));
    $('qrModeVerse')?.addEventListener('click', () => setMode('verse'));
    $('qrModeRead')?.addEventListener('click', () => setMode('reading'));
    $('qrTransBtn')?.addEventListener('click', openTrans);
    $('qrTransClose')?.addEventListener('click', closeTrans);
    $('qrTransSidebar')?.addEventListener('click', e => {
      const item = e.target.closest('.qrn-trans-item');
      if (item) selectTrans(item.dataset.id, item.dataset.name);
    });

    let st;
    $('qrVerseSearch')?.addEventListener('input', e => {
      clearTimeout(st);
      st = setTimeout(() => searchVerse(e.target.value), 250);
    });

    // Close translation sidebar on outside click
    window._qrOut = e => {
      const sb = $('qrTransSidebar'), btn = $('qrTransBtn');
      if (sb?.classList.contains('open') && !sb.contains(e.target) && e.target !== btn && !btn?.contains(e.target)) closeTrans();
    };
    document.addEventListener('click', window._qrOut);

    loadList();
  },

  destroy() {
    closeTafsir();
    closeTrans();
    document.body.style.overflow = '';
    if (window._qrOut) { document.removeEventListener('click', window._qrOut); delete window._qrOut; }
  }
};

export default Quran;
