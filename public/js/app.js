// ═══════════════════════════════════════════════════
// NOOR — app.js  (full i18n language switching)
// ═══════════════════════════════════════════════════
import { LANGUAGES, isRTL, getFontFamily, t } from './i18n.js';

const state = { lang:'en', dark:false, currentPage:'home', pageCache:{} };

const PAGES = {
  'home':       ()=>import('./pages/home.js'),
  'categories': ()=>import('./pages/categories.js'),
  'prayer':     ()=>import('./pages/prayer.js'),
  'quran':      ()=>import('./pages/quran.js'),
  'dhikr':      ()=>import('./pages/dhikr.js'),
  'calendar':   ()=>import('./pages/calendar.js'),
  'zakat':      ()=>import('./pages/zakat.js'),
  'tasbih':     ()=>import('./pages/tasbih.js'),
  'names':      ()=>import('./pages/names.js'),
  'halal':      ()=>import('./pages/halal.js'),
  'ramadan':    ()=>import('./pages/ramadan.js'),
  'daily':      ()=>import('./pages/daily.js'),
  'duagen':     ()=>import('./pages/dua-gen.js'),
  'mirath':     ()=>import('./pages/mirath.js'),
  'sources':    ()=>import('./pages/sources.js'),
  'about':      ()=>import('./pages/about.js'),
};

// Sidebar nav items: [data-pg, i18n key]
const NAV_ITEMS = [
  ['home','nav.home'],['categories','nav.categories'],
  ['prayer','nav.prayer'],['quran','nav.quran'],['dhikr','nav.dhikr'],
  ['calendar','nav.calendar'],['zakat','nav.zakat'],['tasbih','nav.tasbih'],
  ['names','nav.names'],['halal','nav.halal'],
  ['ramadan','nav.ramadan'],['daily','nav.daily'],['duagen','nav.duagen'],['mirath','nav.mirath'],
  ['sources','nav.sources'],['about','nav.about'],
];
const SECTION_LBLS = [
  ['lbl-main','nav.main'],['lbl-tools','nav.tools'],
  ['lbl-new','nav.new'],['lbl-resources','nav.resources'],
];

function translateSidebar(lang) {
  // Section labels
  SECTION_LBLS.forEach(([id, key])=>{
    const el = document.querySelector('[data-nav-lbl="'+id+'"]');
    if (el) el.textContent = t(key, lang);
  });
  // Nav item spans
  NAV_ITEMS.forEach(([pg, key])=>{
    const btn = document.querySelector('.sb-item[data-pg="'+pg+'"]');
    if (!btn) return;
    const span = btn.querySelector('span:first-of-type');
    if (span) span.textContent = t(key, lang);
  });
  // Prayer widget label
  const prLabel = document.querySelector('.sb-pr-label');
  if (prLabel) prLabel.textContent = t('common.next_prayer', lang);
  // Theme button
  const tBtn = document.getElementById('tBtn');
  if (tBtn) {
    const icon = state.dark ? '<i class="ri-sun-line"></i>' : '<i class="ri-moon-line"></i>';
    tBtn.innerHTML = icon + ' ' + t('common.theme', lang);
  }
}

let revObs;
function initReveal() {
  revObs = new IntersectionObserver(entries=>{
    entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('show'); });
  },{threshold:0.08});
}
function doReveal() {
  document.querySelectorAll('.rv:not(.show)').forEach(el=>revObs?.observe(el));
}

export async function goTo(pageId, btn) {
  if (!PAGES[pageId]) return;
  document.querySelectorAll('.sb-item').forEach(n=>n.classList.remove('active'));
  (btn || document.querySelector('[data-pg="'+pageId+'"]'))?.classList.add('active');

  let mod = state.pageCache[pageId];
  if (!mod) {
    try { mod = (await PAGES[pageId]()).default; state.pageCache[pageId] = mod; }
    catch(e) { console.error('Page load failed:', pageId, e); return; }
  }

  const prev = state.pageCache[state.currentPage];
  if (prev?.destroy && state.currentPage !== pageId) prev.destroy();

  const container = document.getElementById('pageContainer');
  let html = '';
  try { html = mod.render(state.lang); } catch(e) { console.error('Render error:', e); return; }
  container.innerHTML = '<div class="page active" id="pg-'+pageId+'">'+html+'</div>';

  requestAnimationFrame(()=>requestAnimationFrame(()=>{
    document.getElementById('pg-'+pageId)?.classList.add('visible');
    doReveal();
  }));

  try { if (mod.init) mod.init(state.lang); } catch(e) { console.error('Init error:', e); }
  state.currentPage = pageId;
  window.scrollTo({top:0,behavior:'smooth'});
  closeMobile();
}

export function setLang(code) {
  state.lang = code;
  document.documentElement.lang = code;
  document.documentElement.dir = isRTL(code) ? 'rtl' : 'ltr';
  document.body.style.fontFamily = getFontFamily(code);

  // Update lang buttons
  document.querySelectorAll('.lang-btn').forEach(btn=>{
    btn.classList.toggle('on', btn.dataset.lang === code);
  });

  // Translate ALL sidebar labels immediately
  translateSidebar(code);

  // Flush cache so all pages re-render in new language
  state.pageCache = {};

  // Re-render current page
  goTo(state.currentPage);
}

export function toggleTheme() {
  state.dark = !state.dark;
  document.documentElement.setAttribute('data-theme', state.dark ? 'dark' : '');
  const tBtn = document.getElementById('tBtn');
  if (tBtn) {
    const icon = state.dark ? '<i class="ri-sun-line"></i>' : '<i class="ri-moon-line"></i>';
    tBtn.innerHTML = icon + ' ' + t('common.theme', state.lang);
  }
}

function closeMobile() {
  if (window.innerWidth > 768) return;
  document.getElementById('sidebar')?.classList.remove('open');
  document.getElementById('sbOv')?.classList.remove('show');
  document.querySelector('.content')?.classList.remove('blurred');
  const mb = document.querySelector('.mob-btn');
  if (mb) { mb.style.opacity = '1'; mb.style.pointerEvents = 'auto'; }
}

export function toggleSB() {
  const sb = document.getElementById('sidebar');
  const ov = document.getElementById('sbOv');
  const ct = document.querySelector('.content');
  const btn = document.querySelector('.mob-btn');
  const opening = !sb.classList.contains('open');
  sb.classList.toggle('open');
  ov.classList.toggle('show');
  ct.classList.toggle('blurred');
  if (btn) { btn.style.opacity = opening?'0':'1'; btn.style.pointerEvents = opening?'none':'auto'; }
}

function initParticles() {
  const c = document.getElementById('particles'); if (!c) return;
  for (let i = 0; i < 18; i++) {
    const p = document.createElement('div'); p.className = 'particle';
    const s = 2 + Math.random()*4, gold = Math.random() > .65;
    p.style.cssText = 'width:'+s+'px;height:'+s+'px;left:'+Math.random()*100+'%;background:'+(gold?'var(--gold-400)':'var(--emerald-500)')+';opacity:'+(0.1+Math.random()*0.18)+';animation-duration:'+(18+Math.random()*28)+'s;animation-delay:'+(Math.random()*18)+'s;';
    c.appendChild(p);
  }
}

function buildLangSwitcher() {
  const grid = document.getElementById('sbLangGrid'); if (!grid) return;
  grid.innerHTML = LANGUAGES.map(l=>'<button class="lang-btn'+(l.code===state.lang?' on':'')+'" data-lang="'+l.code+'" title="'+l.label+'">'+l.flag+' '+l.native+'</button>').join('');
  grid.addEventListener('click', e=>{
    const btn = e.target.closest('.lang-btn');
    if (btn) setLang(btn.dataset.lang);
  });
}

window.addEventListener('load', ()=>{
  initParticles();
  initReveal();
  window.goTo = goTo;
  window.setLang = setLang;
  window.toggleTheme = toggleTheme;
  window.toggleSB = toggleSB;

  setTimeout(()=>{
    document.getElementById('loader')?.classList.add('hide');
    document.getElementById('app')?.classList.add('visible');
    buildLangSwitcher();
    translateSidebar(state.lang);
    goTo('home');
    setTimeout(()=>{
      import('./pages/prayer.js').then(m=>{ if(m.default.initSidebarWidget) m.default.initSidebarWidget(); });
    }, 1500);
  }, 2800);
});
