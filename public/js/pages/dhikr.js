// ═══════════════════════════════════════════════════
// NOOR — pages/dhikr.js: Dhikr & Duas
// ═══════════════════════════════════════════════════
import { DHIKR_DATA, DHIKR_CATS } from '../config.js';

function renderDhikr(cat, lang) {
  const items = cat === 'all' ? DHIKR_DATA : DHIKR_DATA.filter(d => d.cat === cat);
  const grid = document.getElementById('dhGrid');
  if (!grid) return;
  grid.innerHTML = items.map(d => `
    <div class="dh-card">
      <div class="dh-ar">${d.ar}</div>
      <div class="dh-trans">${d.trans}</div>
      <div class="dh-mean">${d.mean}</div>
      <div class="dh-meta">
        <span><i class="ri-book-open-line"></i>${d.src}</span>
        <span><i class="ri-repeat-line"></i>${d.count}</span>
      </div>
    </div>`).join('');
}

function setFilter(cat, lang, btn) {
  document.querySelectorAll('.dh-filter').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderDhikr(cat, lang);
}

const Dhikr = {
  render(lang) {
    const isAr = lang === 'ar';
    return `
<div class="pg-hd">
  <div class="pg-hd-ic"><i class="ri-hand-heart-fill"></i></div>
  <h1>${isAr ? 'الأذكار والأدعية' : 'Dhikr & Duas'}</h1>
  <p>${isAr ? 'أذكار وأدعية مصحّحة من القرآن والسنة.' : 'Authentic adhkar and duas from the Quran and Sunnah.'}</p>
</div>
<div class="pg-body">
  <div class="dh-filters rv" id="dhFilters">
    ${DHIKR_CATS.map(c => `<button class="dh-filter${c.id === 'all' ? ' active' : ''}" data-cat="${c.id}">${isAr ? c.ar : c.en}</button>`).join('')}
  </div>
  <div class="dh-grid rv rv-d1" id="dhGrid"></div>
</div>
<footer class="ft"><i class="ri-heart-fill"></i> ${isAr ? 'صُنع للأمة' : 'Built for the Ummah'}</footer>`;
  },

  init(lang) {
    renderDhikr('all', lang);
    document.getElementById('dhFilters')?.addEventListener('click', e => {
      const btn = e.target.closest('.dh-filter');
      if (btn) setFilter(btn.dataset.cat, lang, btn);
    });
  }
};

export default Dhikr;
