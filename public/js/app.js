// ═══════════════════════════════════════════════════
// NOOR — app.js: Router, State, Theme, Language v2
// ═══════════════════════════════════════════════════
import { LANGUAGES, isRTL, getFontFamily } from './i18n.js';

const state = { lang: 'en', dark: false, currentPage: 'home', pageCache: {} };

const PAGES = {
  'home':       () => import('./pages/home.js'),
  'categories': () => import('./pages/categories.js'),
  'prayer':     () => import('./pages/prayer.js'),
  'quran':      () => import('./pages/quran.js'),
  'dhikr':      () => import('./pages/dhikr.js'),
  'calendar':   () => import('./pages/calendar.js'),
  'zakat':      () => import('./pages/zakat.js'),
  'tasbih':     () => import('./pages/tasbih.js'),
  'names':      () => import('./pages/names.js'),
  'halal':      () => import('./pages/halal.js'),
  'ramadan':    () => import('./pages/ramadan.js'),
  'daily':      () => import('./pages/daily.js'),
  'duagen':     () => import('./pages/dua-gen.js'),
  'mirath':     () => import('./pages/mirath.js'),
  'sources':    () => import('./pages/sources.js'),
  'about':      () => import('./pages/about.js'),
};

let revealObserver;
function initReveal() {
  revealObserver = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('show'); });
  }, { threshold: 0.08 });
}
function observeReveal() {
  document.querySelectorAll('.rv:not(.show)').forEach(el => revealObserver?.observe(el));
}

export async function goTo(pageId, btn) {
  if (!PAGES[pageId]) return;
  document.querySelectorAll('.sb-item').forEach(n => n.classList.remove('active'));
  if (btn) { btn.classList.add('active'); }
  else { document.querySelector('[data-pg="'+pageId+'"]')?.classList.add('active'); }

  let mod = state.pageCache[pageId];
  if (!mod) {
    try { const i = await PAGES[pageId](); mod = i.default; state.pageCache[pageId] = mod; }
    catch(e) { console.error('Page load failed:', pageId, e); return; }
  }

  const prevMod = state.pageCache[state.currentPage];
  if (prevMod?.destroy && state.currentPage !== pageId) prevMod.destroy();

  const container = document.getElementById('pageContainer');
  container.innerHTML = '<div class="page active" id="pg-'+pageId+'">'+mod.render(state.lang)+'</div>';

  requestAnimationFrame(() => requestAnimationFrame(() => {
    document.getElementById('pg-'+pageId)?.classList.add('visible');
    observeReveal();
  }));

  if (mod.init) mod.init(state.lang);
  state.currentPage = pageId;
  window.scrollTo({ top: 0, behavior: 'smooth' });
  closeSidebarMobile();
}

export function setLang(code) {
  state.lang = code;
  document.documentElement.lang = code;
  document.documentElement.dir = isRTL(code) ? 'rtl' : 'ltr';
  document.body.style.fontFamily = getFontFamily(code);
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('on', btn.dataset.lang === code);
  });
  state.pageCache = {};
  goTo(state.currentPage);
}

export function toggleTheme() {
  state.dark = !state.dark;
  document.documentElement.setAttribute('data-theme', state.dark ? 'dark' : '');
  const btn = document.getElementById('tBtn');
  if (btn) btn.innerHTML = state.dark ? '<i class="ri-sun-line"></i>' : '<i class="ri-moon-line"></i>';
}

function closeSidebarMobile() {
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
  if (btn) { btn.style.opacity = opening ? '0' : '1'; btn.style.pointerEvents = opening ? 'none' : 'auto'; }
}

function initParticles() {
  const c = document.getElementById('particles');
  if (!c) return;
  for (let i = 0; i < 18; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const s = 2 + Math.random() * 4, gold = Math.random() > 0.65;
    p.style.cssText = 'width:'+s+'px;height:'+s+'px;left:'+Math.random()*100+'%;background:'+(gold?'var(--gold-400)':'var(--emerald-500)')+';opacity:'+(0.1+Math.random()*0.18)+';animation-duration:'+(18+Math.random()*28)+'s;animation-delay:'+(Math.random()*18)+'s;';
    c.appendChild(p);
  }
}

function buildLangSwitcher() {
  const grid = document.getElementById('sbLangGrid');
  if (!grid) return;
  grid.innerHTML = LANGUAGES.map(l =>
    '<button class="lang-btn'+(l.code===state.lang?' on':'')+'" data-lang="'+l.code+'" title="'+l.label+'">'+l.flag+' '+l.native+'</button>'
  ).join('');
  grid.addEventListener('click', e => {
    const btn = e.target.closest('.lang-btn');
    if (btn) setLang(btn.dataset.lang);
  });
}

window.addEventListener('load', () => {
  initParticles();
  initReveal();
  window.goTo = goTo;
  window.setLang = setLang;
  window.toggleTheme = toggleTheme;
  window.toggleSB = toggleSB;

  setTimeout(() => {
    document.getElementById('loader')?.classList.add('hide');
    document.getElementById('app')?.classList.add('visible');
    buildLangSwitcher();
    goTo('home');
    setTimeout(() => {
      import('./pages/prayer.js').then(m => { if (m.default.initSidebarWidget) m.default.initSidebarWidget(); });
    }, 1500);
  }, 2800);
});
