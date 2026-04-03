// ═══════════════════════════════════════════════════
// NOOR — pages/names.js: 99 Names of Allah
// ═══════════════════════════════════════════════════
import { NAMES_99 } from '../config.js';

function renderNames(list) {
  const grid = document.getElementById('nmGrid');
  if (!grid) return;
  grid.innerHTML = list.map(n => `
    <div class="nm-card rv">
      <div class="nm-num">${n.n}</div>
      <div class="nm-ar">${n.ar}</div>
      <div class="nm-trans">${n.t}</div>
      <div class="nm-mean">${n.m}</div>
    </div>`).join('');
}

function filterNames(q) {
  if (!q) { renderNames(NAMES_99); return; }
  const f = NAMES_99.filter(n =>
    n.t.toLowerCase().includes(q.toLowerCase()) ||
    n.m.toLowerCase().includes(q.toLowerCase()) ||
    n.ar.includes(q) ||
    n.n.toString() === q
  );
  renderNames(f);
}

const Names = {
  render(lang) {
    const isAr = lang === 'ar';
    return `
<div class="pg-hd">
  <div class="pg-hd-ic"><i class="ri-star-fill"></i></div>
  <h1>${isAr ? 'أسماء الله الحسنى' : '99 Names of Allah'}</h1>
  <p>${isAr ? 'الأسماء الحسنى — أجمل أسماء الله تعالى.' : 'Al-Asma ul-Husna — The Most Beautiful Names of Allah.'}</p>
</div>
<div class="pg-body">
  <div class="nm-search rv">
    <input type="text" id="nmSearch"
      placeholder="${isAr ? 'ابحث عن اسم...' : 'Search names...'}"
      oninput="window.filterNames(this.value)">
  </div>
  <div class="nm-grid rv rv-d1" id="nmGrid"></div>
</div>
<footer class="ft"><i class="ri-heart-fill"></i> ${isAr ? 'صُنع للأمة' : 'Built for the Ummah'}</footer>`;
  },

  init() {
    window.filterNames = filterNames;
    renderNames(NAMES_99);
  },

  destroy() { delete window.filterNames; }
};

export default Names;
