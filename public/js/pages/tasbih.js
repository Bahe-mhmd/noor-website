// ═══════════════════════════════════════════════════
// NOOR — pages/tasbih.js: Tasbih Counter
// ═══════════════════════════════════════════════════

let tbCount = 0, tbTarget = 33;

const DHIKRS = [
  { ar: 'سُبْحَانَ اللَّهِ', trans: 'Subhan Allah' },
  { ar: 'الْحَمْدُ لِلَّهِ', trans: 'Alhamdulillah' },
  { ar: 'اللَّهُ أَكْبَرُ', trans: 'Allahu Akbar' },
  { ar: 'لَا إِلَٰهَ إِلَّا اللَّهُ', trans: 'La ilaha illallah' },
  { ar: 'أَسْتَغْفِرُ اللَّهَ', trans: 'Astaghfirullah' },
];

let activeDhikr = DHIKRS[0];

function tap() {
  tbCount++;
  const countEl = document.getElementById('tbCount');
  if (countEl) { countEl.textContent = tbCount; countEl.classList.add('bump'); setTimeout(() => countEl.classList.remove('bump'), 100); }
  if (tbTarget > 0) {
    const pct = Math.min(100, (tbCount / tbTarget) * 100);
    const fill = document.getElementById('tbProgressFill');
    if (fill) fill.style.width = pct + '%';
    if (tbCount === tbTarget) {
      const tapBtn = document.getElementById('tbTap');
      if (tapBtn) { tapBtn.style.boxShadow = '0 0 0 12px rgba(245,158,11,0.3),0 8px 32px rgba(5,150,105,0.3)'; setTimeout(() => { tapBtn.style.boxShadow = ''; }, 1500); }
    }
  }
}

function setTarget(n, btn) {
  tbTarget = n; tbCount = 0;
  const countEl = document.getElementById('tbCount');
  const fill = document.getElementById('tbProgressFill');
  if (countEl) countEl.textContent = '0';
  if (fill) fill.style.width = '0%';
  document.querySelectorAll('.tb-preset').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
}

function setDhikr(dhikr, btn) {
  activeDhikr = dhikr;
  tbCount = 0;
  const nameEl = document.getElementById('tbDhikrName');
  const transEl = document.getElementById('tbDhikrTrans');
  const countEl = document.getElementById('tbCount');
  const fill = document.getElementById('tbProgressFill');
  if (nameEl) nameEl.textContent = dhikr.ar;
  if (transEl) transEl.textContent = dhikr.trans;
  if (countEl) countEl.textContent = '0';
  if (fill) fill.style.width = '0%';
  document.querySelectorAll('.tb-dhikr').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
}

function reset() {
  tbCount = 0;
  const countEl = document.getElementById('tbCount');
  const fill = document.getElementById('tbProgressFill');
  if (countEl) countEl.textContent = '0';
  if (fill) fill.style.width = '0%';
}

const Tasbih = {
  render(lang) {
    const isAr = lang === 'ar';
    return `
<div class="pg-hd">
  <div class="pg-hd-ic"><i class="ri-refresh-fill"></i></div>
  <h1>${isAr ? 'عداد التسبيح' : 'Tasbih Counter'}</h1>
  <p>${isAr ? 'عدّ أذكارك الرقمية.' : 'Count your dhikr digitally with target tracking.'}</p>
</div>
<div class="pg-body">
  <div class="tb-wrap rv">
    <div class="tb-dhikr-name" id="tbDhikrName">${DHIKRS[0].ar}</div>
    <div class="tb-dhikr-trans" id="tbDhikrTrans">${DHIKRS[0].trans}</div>
    <div class="tb-count" id="tbCount">0</div>
    <button class="tb-tap" id="tbTap" onclick="window.tbTap()">
      ${isAr ? 'اضغط' : 'Tap'}
    </button>
    <div class="tb-progress rv"><div class="tb-progress-fill" id="tbProgressFill"></div></div>

    <div class="tb-target-btns rv rv-d1">
      <button class="tb-preset" onclick="window.tbSetTarget(33,this)">33</button>
      <button class="tb-preset active" onclick="window.tbSetTarget(100,this)">100</button>
      <button class="tb-preset" onclick="window.tbSetTarget(1000,this)">1000</button>
      <button class="tb-preset" onclick="window.tbSetTarget(0,this)">∞ ${isAr ? 'حر' : 'Free'}</button>
    </div>

    <div class="tb-dhikr-select rv rv-d2">
      ${DHIKRS.map((d, i) => `<button class="tb-dhikr${i===0?' active':''}" data-idx="${i}">${d.ar}</button>`).join('')}
    </div>

    <div class="tb-controls rv rv-d3">
      <button class="tb-ctrl-btn" onclick="window.tbReset()">
        <i class="ri-restart-line"></i> ${isAr ? 'إعادة' : 'Reset'}
      </button>
    </div>
  </div>
</div>
<footer class="ft"><i class="ri-heart-fill"></i> ${isAr ? 'صُنع للأمة' : 'Built for the Ummah'}</footer>`;
  },

  init() {
    tbCount = 0; tbTarget = 33; activeDhikr = DHIKRS[0];
    window.tbTap = tap;
    window.tbSetTarget = setTarget;
    window.tbReset = reset;

    // Wire dhikr buttons
    document.querySelectorAll('.tb-dhikr').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.idx);
        setDhikr(DHIKRS[idx], btn);
      });
    });

    // Default target highlight
    const presets = document.querySelectorAll('.tb-preset');
    if (presets[0]) presets[0].classList.add('active');
    setTarget(33, presets[0]);
  },

  destroy() {
    delete window.tbTap;
    delete window.tbSetTarget;
    delete window.tbReset;
  }
};

export default Tasbih;
