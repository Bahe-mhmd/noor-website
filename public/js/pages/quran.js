// ═══════════════════════════════════════════════════
// NOOR — pages/quran.js  (v3 — all fixes applied)
// ═══════════════════════════════════════════════════

let _surahs      = [];
let _arAyahs     = [];
let _transAyahs  = [];
let _currentNum  = null;
let _currentData = null;
let _mode        = 'verse';
let _trans       = null;
let _tafsirIdx   = 0;
let _tafsirEd    = 'ar.muyassar';
let _tafsirCache = {};
let _lang        = 'en';

// ── Arabic diacritic/tashkeel normalizer ──
function normalizeAr(text) {
  if (!text) return '';
  return text
    // strip all tashkeel / diacritics
    .replace(/[\u064B-\u065F\u0610-\u061A\u06D6-\u06DC\u06DF-\u06E8\u06EA-\u06ED\u0670]/g, '')
    // normalize alef variants → ا
    .replace(/[أإآٱ]/g, 'ا')
    // normalize tah marbuta
    .replace(/ة/g, 'ه')
    // normalize ya variants
    .replace(/ى/g, 'ي')
    // collapse multiple spaces
    .replace(/\s+/g, ' ')
    .trim();
}

// ── Translations ──
const TRANSLATIONS = [
  { group:'None',      items:[{ id:'none',         name:'Arabic Only'          }] },
  { group:'English',   items:[
    { id:'en.asad',      name:'Muhammad Asad'        },
    { id:'en.pickthall', name:'Pickthall'            },
    { id:'en.yusufali',  name:'Yusuf Ali'            },
    { id:'en.sahih',     name:'Saheeh International' },
  ]},
  { group:'Français',  items:[{ id:'fr.hamidullah', name:'Hamidullah (FR)'     }] },
  { group:'Türkçe',    items:[{ id:'tr.ates',       name:'Suat Ateş (TR)'      }] },
  { group:'اردو',      items:[{ id:'ur.maududi',    name:'مودودی (اردو)'        }] },
  { group:'Indonesia', items:[{ id:'id.indonesian', name:'Kemenag RI (ID)'     }] },
];

// ── Tafsirs ──
const TAFSIRS = [
  { id:'ar.muyassar', name:'الميسّر',           dir:'rtl' },
  { id:'ar.jalalayn', name:'الجلالين',          dir:'rtl' },
  { id:'ar.katheer',  name:'ابن كثير',          dir:'rtl' },
  { id:'ar.saadi',    name:'السعدي',            dir:'rtl' },
  { id:'ar.baghawy',  name:'البغوي',            dir:'rtl' },
  { id:'ar.tabari',   name:'الطبري',            dir:'rtl' },
  { id:'ar.qurtubi',  name:'القرطبي',           dir:'rtl' },
  { id:'ar.waseet',   name:'الوسيط (الطنطاوي)', dir:'rtl' },
  { id:'en.maududi',  name:'Maududi (EN)',      dir:'ltr' },
];

// ── UI labels per language ──
const QR_UI = {
  title:      { en:'Quran Reader',     ar:'القرآن الكريم',    fr:'Lecteur Coran',      tr:'Kuran',          ur:'قرآن کریم',      id:'Quran'             },
  subtitle:   { en:'114 surahs with translation and tafsir.', ar:'١١٤ سورة مع الترجمة والتفسير.', fr:'114 sourates avec traduction et tafsir.', tr:'Çeviri ve tefsirle 114 sure.', ur:'ترجمہ اور تفسیر کے ساتھ ۱۱۴ سورتیں۔', id:'114 surah dengan terjemahan dan tafsir.' },
  search:     { en:'Search by name or number...', ar:'ابحث بالاسم أو الرقم...', fr:'Rechercher...', tr:'Ara...', ur:'تلاش کریں...', id:'Cari...' },
  back:       { en:'Back',             ar:'عودة',             fr:'Retour',             tr:'Geri',           ur:'واپس',           id:'Kembali'           },
  verse_lbl:  { en:'Verse by Verse',   ar:'آية آية',          fr:'Verset',             tr:'Ayet Ayet',      ur:'آیت آیت',        id:'Per Ayat'          },
  read_lbl:   { en:'Reading',          ar:'قراءة',            fr:'Lecture',            tr:'Okuma',          ur:'پڑھنا',          id:'Baca'              },
  tafsir:     { en:'Tafsir',           ar:'التفسير',          fr:'Tafsir',             tr:'Tefsir',         ur:'تفسیر',          id:'Tafsir'            },
  trans_lbl:  { en:'Translation',      ar:'الترجمة',          fr:'Traduction',         tr:'Çeviri',         ur:'ترجمہ',          id:'Terjemahan'        },
  verse_ph:   { en:'Verse no...',      ar:'رقم الآية...',     fr:'N° verset...',       tr:'Ayet no...',     ur:'آیت نمبر...',    id:'No. ayat...'       },
  meccan:     { en:'Meccan',           ar:'مكية',             fr:'Mecquoise',          tr:'Mekki',          ur:'مکی',            id:'Makkiyah'          },
  medinan:    { en:'Medinan',          ar:'مدنية',            fr:'Médinoise',          tr:'Medeni',         ur:'مدنی',           id:'Madaniyah'         },
  verses:     { en:'verses',           ar:'آية',              fr:'versets',            tr:'ayet',           ur:'آیات',           id:'ayat'              },
  loading:    { en:'Loading...',       ar:'جار التحميل...',   fr:'Chargement...',      tr:'Yükleniyor...',  ur:'لوڈ ہو رہا ہے...',id:'Memuat...'        },
  choose_trans:{ en:'Translations',   ar:'الترجمات',         fr:'Traductions',        tr:'Çeviriler',      ur:'ترجمے',          id:'Terjemahan'        },
  hide:       { en:'Hide',            ar:'إخفاء',             fr:'Masquer',            tr:'Gizle',          ur:'چھپائیں',        id:'Sembunyikan'       },
  ummah:      { en:'Built for the Ummah', ar:'صُنع للأمة',   fr:"Pour l'Oumma",      tr:'Ümmet için',     ur:'امت کے لیے',    id:'Untuk Umat'        },
};
function ui(key) { return QR_UI[key]?.[_lang] || QR_UI[key]?.en || key; }

function defaultTrans(lang) {
  const map = { en:'en.asad', fr:'fr.hamidullah', tr:'tr.ates', ur:'ur.maududi', id:'id.indonesian', ar:'none' };
  const id = map[lang] || 'en.asad';
  for (const g of TRANSLATIONS) { const f = g.items.find(i=>i.id===id); if(f) return f; }
  return TRANSLATIONS[1].items[0];
}

const $ = id => document.getElementById(id);

function surahOptions() {
  return _surahs.map(s => `<option value="${s.number}">${s.number}. ${s.englishName} — ${s.name}</option>`).join('');
}
function syncSelects() {
  ['qrHeadSel','qrTafSel'].forEach(id => {
    const el=$(id); if(!el||!_surahs.length) return;
    if(!el.dataset.filled){ el.innerHTML=surahOptions(); el.dataset.filled='1'; }
    if(_currentNum) el.value=_currentNum;
  });
}

// ── Load list ──
async function loadList() {
  if (_surahs.length) { renderGrid(); return; }
  const grid = $('qrGrid');
  if (!grid) return;
  grid.innerHTML = `<div style="text-align:center;padding:60px;grid-column:1/-1;color:var(--text-3)"><i class="ri-loader-4-line" style="font-size:28px;animation:lSpin 1s linear infinite;color:var(--emerald-600)"></i><div style="margin-top:12px">${ui('loading')}</div></div>`;
  try {
    const r = await fetch('https://api.alquran.cloud/v1/surah');
    _surahs = (await r.json()).data;
    renderGrid();
    syncSelects();
  } catch(e) {
    if (grid) grid.innerHTML = `<p style="color:var(--text-3);text-align:center;padding:40px;grid-column:1/-1">Failed to load. Check connection.</p>`;
  }
}

function renderGrid() {
  const grid=$('qrGrid'); if(!grid) return;
  const q=($('qrListSearch')?.value||'').toLowerCase();
  const norm = normalizeAr(q);
  const list = q ? _surahs.filter(s=>
    s.englishName.toLowerCase().includes(q)||
    s.name.includes(q)||
    normalizeAr(s.name).includes(norm)||
    s.number.toString()===q||
    s.englishNameTranslation.toLowerCase().includes(q)
  ) : _surahs;

  grid.innerHTML = list.map(s => {
    const type = s.revelationType==='Meccan' ? ui('meccan') : ui('medinan');
    return `<div class="qr-card" data-num="${s.number}">
      <div class="qr-num">${s.number}</div>
      <div class="qr-ar">${s.name}</div>
      <div class="qr-en">${s.englishName}</div>
      <div class="qr-info">${s.numberOfAyahs} ${ui('verses')} · ${type}</div>
    </div>`;
  }).join('');

  grid.querySelectorAll('.qr-card').forEach(c=>{
    c.addEventListener('click',()=>openSurah(parseInt(c.dataset.num)));
  });
}

// ── Open surah ──
async function openSurah(num) {
  _currentNum=num; _arAyahs=[]; _transAyahs=[]; _tafsirCache={};
  closeTafsir(); closeTrans();
  $('qrListView').style.display='none';
  $('qrReadView').style.display='block';
  window.scrollTo({top:0,behavior:'instant'});

  $('qrContent').innerHTML=`<div style="text-align:center;padding:120px 20px;color:var(--text-3)"><i class="ri-loader-4-line" style="font-size:36px;animation:lSpin 1s linear infinite;color:var(--emerald-600)"></i><div style="margin-top:16px">${ui('loading')}</div></div>`;
  syncSelects();

  try {
    _currentData=_surahs.find(s=>s.number===num)||null;
    const arR=await fetch(`https://api.alquran.cloud/v1/surah/${num}/ar.alafasy`);
    _arAyahs=(await arR.json()).data.ayahs;

    if (_trans && _trans.id!=='none') {
      try {
        const tR=await fetch(`https://api.alquran.cloud/v1/surah/${num}/${_trans.id}`);
        _transAyahs=(await tR.json()).data.ayahs;
      } catch { _transAyahs=[]; }
    }
    renderContent();
    updateTransBtn();
  } catch(e) {
    $('qrContent').innerHTML=`<p style="color:var(--text-3);text-align:center;padding:40px">Failed to load surah.</p>`;
  }
}

function renderContent() {
  window.scrollTo({top:0,behavior:'instant'});
  _mode==='reading' ? renderReading() : renderVerse();
}

function renderVerse() {
  const content=$('qrContent'); if(!content||!_arAyahs.length) return;
  const hasTrans=_transAyahs.length>0;

  let html=`
    <div class="qrn-banner">
      <div class="qrn-banner-ar">${_currentData?.name||''}</div>
      <div class="qrn-banner-en">${_currentData?.englishName||''} — ${_currentData?.englishNameTranslation||''}</div>
      <div class="qrn-banner-meta">
        <span><i class="ri-map-pin-2-line"></i> ${_currentData?.revelationType===_lang==='ar'?'مكية':'Meccan'? ui('meccan') : ui('medinan')}</span>
        <span><i class="ri-list-ordered"></i> ${_arAyahs.length} ${ui('verses')}</span>
      </div>
    </div>`;

  if (_currentNum!==1&&_currentNum!==9) {
    html+=`<div class="qrn-bismillah">بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</div>`;
  }

  html+=_arAyahs.map((a,i)=>`
    <div class="qrn-verse" id="qrnV${i}" data-idx="${i}">
      <div class="qrn-verse-top">
        <span class="qrn-verse-ref">${_currentNum}:${a.numberInSurah}</span>
      </div>
      <div class="qrn-arabic">${a.text}</div>
      ${hasTrans&&_transAyahs[i]?`<div class="qrn-trans">${_transAyahs[i].text}</div>`:''}
      <div class="qrn-actions">
        <button class="qrn-tafsir-btn" data-idx="${i}">
          <i class="ri-book-2-line"></i> ${ui('tafsir')}
        </button>
      </div>
    </div>`).join('');

  content.innerHTML=html;
  content.querySelectorAll('.qrn-tafsir-btn').forEach(btn=>{
    btn.addEventListener('click',()=>openTafsir(parseInt(btn.dataset.idx)));
  });
}

function renderReading() {
  const content=$('qrContent'); if(!content||!_arAyahs.length) return;
  const hasTrans=_transAyahs.length>0;
  let html=`
    <div class="qrn-banner">
      <div class="qrn-banner-ar">${_currentData?.name||''}</div>
      <div class="qrn-banner-en">${_currentData?.englishName||''}</div>
      <div class="qrn-banner-meta">
        <span>${_currentData?.revelationType||''}</span>
        <span>${_arAyahs.length} ${ui('verses')}</span>
      </div>
    </div>`;
  if (_currentNum!==1&&_currentNum!==9) html+=`<div class="qrn-bismillah">بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</div>`;
  html+=`<div class="qrn-reading-block">${_arAyahs.map(a=>`${a.text} <span class="qrn-vmarker">${a.numberInSurah}</span>`).join(' ')}</div>`;
  if (hasTrans) {
    html+=`<div class="qrn-reading-trans"><div class="qrn-rt-label">${_trans?.name||ui('trans_lbl')}</div>${_transAyahs.map((t,i)=>`<span class="qrn-rt-verse"><strong>${_arAyahs[i]?.numberInSurah}.</strong> ${t.text} </span>`).join('')}</div>`;
  }
  content.innerHTML=html;
}

// ── Tafsir Modal ──
function openTafsir(idx) {
  _tafsirIdx=idx;
  const overlay=$('qrTafsirOverlay');
  if (!overlay) return;

  // ← FIX: scroll body to top FIRST, then show modal
  window.scrollTo({top:0,behavior:'instant'});
  document.body.style.overflow='hidden'; // prevent background scroll

  overlay.style.display='flex';
  // Reset scroll inside modal text area
  const textEl=$('qrTafText');
  if (textEl) textEl.scrollTop=0;

  updateTafsirHeader();
  loadTafsir(_tafsirEd,idx);
}

function closeTafsir() {
  const el=$('qrTafsirOverlay');
  if(el) el.style.display='none';
  document.body.style.overflow=''; // restore scroll
}

function updateTafsirHeader() {
  const ayah=_arAyahs[_tafsirIdx]; if(!ayah) return;
  const refEl=$('qrTafRef'), verseEl=$('qrTafVerse'), prevBtn=$('qrTafPrev'), nextBtn=$('qrTafNext');
  if(refEl)   refEl.textContent=`${_currentNum}:${ayah.numberInSurah}`;
  if(verseEl) verseEl.textContent=ayah.text;
  if(prevBtn) prevBtn.disabled=_tafsirIdx===0;
  if(nextBtn) nextBtn.disabled=_tafsirIdx===_arAyahs.length-1;
  // Reset tafsir text scroll
  const textEl=$('qrTafText'); if(textEl) textEl.scrollTop=0;
  syncSelects();
}

async function loadTafsir(edition,idx) {
  _tafsirEd=edition;
  document.querySelectorAll('.qrn-taf-tab').forEach(t=>t.classList.toggle('active',t.dataset.ed===edition));
  const textEl=$('qrTafText'); if(!textEl) return;
  const ayah=_arAyahs[idx]; if(!ayah) return;
  const cacheKey=`${edition}:${_currentNum}:${ayah.numberInSurah}`;
  if (_tafsirCache[cacheKey]) { showTafsirText(_tafsirCache[cacheKey],edition); return; }

  textEl.innerHTML=`<div style="text-align:center;padding:60px;color:var(--text-3)"><i class="ri-loader-4-line" style="font-size:24px;animation:lSpin 1s linear infinite"></i></div>`;
  textEl.scrollTop=0;

  try {
    const r=await fetch(`https://api.alquran.cloud/v1/ayah/${_currentNum}:${ayah.numberInSurah}/${edition}`);
    const d=await r.json();
    const text=d.data?.text||'';
    if(text){ _tafsirCache[cacheKey]=text; showTafsirText(text,edition); }
    else textEl.innerHTML=`<p style="color:var(--text-3);padding:30px;text-align:center">Not available for this verse in this edition.</p>`;
  } catch {
    textEl.innerHTML=`<p style="color:var(--text-3);padding:30px;text-align:center">Failed to load. Check connection.</p>`;
  }
}

function showTafsirText(text,edition) {
  const el=$('qrTafText');
  const info=TAFSIRS.find(t=>t.id===edition);
  if(el){ el.innerHTML=`<div class="qrn-taf-body" dir="${info?.dir||'rtl'}">${text}</div>`; el.scrollTop=0; }
}

// ── Translation Sidebar ──
function openTrans()  { $('qrTransSidebar')?.classList.add('open'); }
function closeTrans() { $('qrTransSidebar')?.classList.remove('open'); }

function selectTrans(id,name) {
  _trans={id,name};
  document.querySelectorAll('.qrn-trans-item').forEach(item=>item.classList.toggle('active',item.dataset.id===id));
  updateTransBtn();
  if(_currentNum) openSurah(_currentNum);
  closeTrans();
}

function updateTransBtn() {
  const el=$('qrTransBtn');
  if(el&&_trans) el.innerHTML=`<i class="ri-translate-2"></i> <span>${_trans.name}</span> <i class="ri-arrow-down-s-line"></i>`;
}

// ── Mode ──
function setMode(m) {
  _mode=m;
  $('qrModeVerse')?.classList.toggle('active',m==='verse');
  $('qrModeRead')?.classList.toggle('active',m==='reading');
  renderContent();
}

// ── Back ──
function goBack() {
  _currentNum=null;
  $('qrListView').style.display='block';
  $('qrReadView').style.display='none';
  closeTafsir(); closeTrans();
  window.scrollTo({top:0,behavior:'instant'});
}

// ── Verse search (fixed) ──
function searchVerse(q) {
  if (!q.trim()) {
    document.querySelectorAll('.qrn-verse').forEach(c=>{c.style.opacity='1';c.style.order='';});
    return;
  }

  const qTrim    = q.trim();
  const qNum     = parseInt(qTrim);
  const qNorm    = normalizeAr(qTrim).toLowerCase();
  const isNum    = !isNaN(qNum) && qTrim.match(/^\d+$/);

  let found = false;
  document.querySelectorAll('.qrn-verse').forEach((card,i)=>{
    const ayah    = _arAyahs[i];
    const trs     = _transAyahs[i];
    const arNorm  = normalizeAr(ayah?.text||'').toLowerCase();
    const trNorm  = (trs?.text||'').toLowerCase();

    let hit = false;
    if (isNum) {
      hit = ayah?.numberInSurah === qNum;
    } else {
      hit = arNorm.includes(qNorm) || trNorm.includes(qNorm);
    }

    card.style.opacity = hit ? '1' : '0.2';
    card.style.transition = 'opacity .25s';

    if (hit && !found) {
      found = true;
      // ← FIX: use a small delay so DOM updates first, then scroll
      setTimeout(()=>{
        card.scrollIntoView({behavior:'smooth',block:'center'});
      }, 50);
    }
  });
}

// ── Page Module ──
const Quran = {
  render(lang) {
    _lang=lang;
    if(!_trans) _trans=defaultTrans(lang);
    const isRTL = lang==='ar'||lang==='ur';

    const transListHtml=TRANSLATIONS.map(g=>`
      <div class="qrn-ts-group">
        <div class="qrn-ts-glabel">${g.group}</div>
        ${g.items.map(item=>`
          <div class="qrn-trans-item${_trans?.id===item.id?' active':''}" data-id="${item.id}" data-name="${item.name}">
            ${_trans?.id===item.id?'<i class="ri-check-line" style="margin-right:6px;color:var(--emerald-600)"></i>':'<span style="width:22px;display:inline-block"></span>'}
            ${item.name}
          </div>`).join('')}
      </div>`).join('');

    const tafsirTabsHtml=TAFSIRS.map(t=>`
      <button class="qrn-taf-tab${t.id===_tafsirEd?' active':''}" data-ed="${t.id}">${t.name}</button>`).join('');

    return `
<div id="qrApp">

  <!-- ══ SURAH LIST ══ -->
  <div id="qrListView">
    <div class="pg-hd">
      <div class="pg-hd-ic"><i class="ri-book-open-fill"></i></div>
      <h1>${ui('title')}</h1>
      <p>${ui('subtitle')}</p>
    </div>
    <div class="pg-body">
      <div class="qr-search rv">
        <input type="text" id="qrListSearch" placeholder="${ui('search')}">
      </div>
      <div class="qr-grid rv rv-d1" id="qrGrid"></div>
    </div>
  </div>

  <!-- ══ READER VIEW ══ -->
  <div id="qrReadView" style="display:none">

    <!-- Sticky header -->
    <div class="qrn-header">
      <button class="qrn-hbtn" id="qrBackBtn">
        <i class="${isRTL?'ri-arrow-right-line':'ri-arrow-left-line'}"></i>
      </button>

      <select class="qrn-hsel" id="qrHeadSel"></select>

      <div class="qrn-hsearch">
        <i class="ri-search-line"></i>
        <input type="text" id="qrVerseSearch" placeholder="${ui('verse_ph')}">
      </div>

      <div class="qrn-modes">
        <button class="qrn-mode active" id="qrModeVerse">
          <i class="ri-list-check"></i><span>${ui('verse_lbl')}</span>
        </button>
        <button class="qrn-mode" id="qrModeRead">
          <i class="ri-book-read-line"></i><span>${ui('read_lbl')}</span>
        </button>
      </div>

      <button class="qrn-trans-btn" id="qrTransBtn">
        <i class="ri-translate-2"></i>
        <span>${_trans?.name||ui('trans_lbl')}</span>
        <i class="ri-arrow-down-s-line"></i>
      </button>
    </div>

    <!-- Verse content -->
    <div class="qrn-content" id="qrContent"></div>

    <!-- Translation Sidebar -->
    <div class="qrn-trans-sidebar" id="qrTransSidebar">
      <div class="qrn-ts-header">
        <span>${ui('choose_trans')}</span>
        <button id="qrTransClose"><i class="ri-close-line"></i></button>
      </div>
      <div class="qrn-ts-list">${transListHtml}</div>
    </div>

    <!-- ══ TAFSIR MODAL ══ -->
    <div class="qrn-taf-overlay" id="qrTafsirOverlay" style="display:none">
      <div class="qrn-taf-modal">

        <div class="qrn-taf-mhead">
          <select class="qrn-hsel" id="qrTafSel" style="max-width:200px;font-size:13px"></select>
          <div class="qrn-taf-nav">
            <button class="qrn-taf-navbtn" id="qrTafPrev">
              <i class="${isRTL?'ri-arrow-right-s-line':'ri-arrow-left-s-line'}"></i>
            </button>
            <span class="qrn-taf-ref" id="qrTafRef">—</span>
            <button class="qrn-taf-navbtn" id="qrTafNext">
              <i class="${isRTL?'ri-arrow-left-s-line':'ri-arrow-right-s-line'}"></i>
            </button>
          </div>
          <button class="qrn-taf-closebtn" id="qrTafClose"><i class="ri-close-line"></i></button>
        </div>

        <div class="qrn-taf-verse" id="qrTafVerse"></div>
        <div class="qrn-taf-tabs" id="qrTafTabs">${tafsirTabsHtml}</div>
        <div class="qrn-taf-text" id="qrTafText">
          <div style="color:var(--text-3);text-align:center;padding:60px">
            <i class="ri-book-2-line" style="font-size:32px;opacity:.4;display:block;margin-bottom:12px"></i>
            ${ui('tafsir')}
          </div>
        </div>

      </div>
    </div>

  </div>
</div>
<footer class="ft"><i class="ri-heart-fill"></i> ${ui('ummah')}</footer>`;
  },

  init(lang) {
    _lang=lang;
    if(!_trans) _trans=defaultTrans(lang);

    $('qrListSearch')?.addEventListener('input', renderGrid);
    $('qrBackBtn')?.addEventListener('click', goBack);
    $('qrHeadSel')?.addEventListener('change', e=>openSurah(parseInt(e.target.value)));
    $('qrTafSel')?.addEventListener('change',  e=>{ closeTafsir(); openSurah(parseInt(e.target.value)); });
    $('qrModeVerse')?.addEventListener('click', ()=>setMode('verse'));
    $('qrModeRead')?.addEventListener('click',  ()=>setMode('reading'));
    $('qrTransBtn')?.addEventListener('click', openTrans);
    $('qrTransClose')?.addEventListener('click', closeTrans);

    $('qrTransSidebar')?.addEventListener('click', e=>{
      const item=e.target.closest('.qrn-trans-item');
      if(item) selectTrans(item.dataset.id,item.dataset.name);
    });

    $('qrTafClose')?.addEventListener('click', closeTafsir);
    $('qrTafsirOverlay')?.addEventListener('click', e=>{
      if(e.target===$('qrTafsirOverlay')) closeTafsir();
    });

    $('qrTafPrev')?.addEventListener('click', ()=>{
      if(_tafsirIdx>0){ _tafsirIdx--; updateTafsirHeader(); loadTafsir(_tafsirEd,_tafsirIdx); }
    });
    $('qrTafNext')?.addEventListener('click', ()=>{
      if(_tafsirIdx<_arAyahs.length-1){ _tafsirIdx++; updateTafsirHeader(); loadTafsir(_tafsirEd,_tafsirIdx); }
    });

    $('qrTafTabs')?.addEventListener('click', e=>{
      const tab=e.target.closest('.qrn-taf-tab');
      if(tab) loadTafsir(tab.dataset.ed,_tafsirIdx);
    });

    // Verse search with debounce
    let searchTimer;
    $('qrVerseSearch')?.addEventListener('input', e=>{
      clearTimeout(searchTimer);
      searchTimer=setTimeout(()=>searchVerse(e.target.value), 300);
    });

    // Close trans sidebar on outside click
    window._qrOutsideClick = e=>{
      const sidebar=$('qrTransSidebar');
      const btn=$('qrTransBtn');
      if(sidebar?.classList.contains('open')&&!sidebar.contains(e.target)&&e.target!==btn&&!btn?.contains(e.target)){
        closeTrans();
      }
    };
    document.addEventListener('click', window._qrOutsideClick);

    loadList();
  },

  destroy() {
    closeTafsir();
    closeTrans();
    document.body.style.overflow='';
    if(window._qrOutsideClick){ document.removeEventListener('click',window._qrOutsideClick); delete window._qrOutsideClick; }
  }
};

export default Quran;
