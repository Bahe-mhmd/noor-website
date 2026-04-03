// ═══════════════════════════════════════════════════
// NOOR — pages/mirath.js: Islamic Inheritance Calculator
// Based on Quran 4:11-12, 4:176 and classical fiqh
// ═══════════════════════════════════════════════════
import { t } from '../i18n.js';

/**
 * Core Mirath Engine
 * Implements the primary shares (Fard) and residual (Asabah) system
 * Reference: Quran 4:11-12, 4:176; Radd & Awl adjustments included
 */
function calculateMirath({ estate, debts, heirs }) {
  const net = Math.max(0, estate - debts);
  const results = [];
  let remaining = 1; // fraction of estate

  const has = (key) => heirs[key] > 0;
  const num = (key) => heirs[key] || 0;

  // ── Determine fixed shares (Fard) ──
  // Husband: 1/4 if there are children, 1/2 if no children (Quran 4:12)
  if (has('husband')) {
    const share = (has('sons') || has('daughters')) ? { n:1, d:4 } : { n:1, d:2 };
    results.push({ heir: 'husband', count: 1, fraction: share, ref: 'Quran 4:12' });
    remaining -= share.n / share.d;
  }

  // Wife/Wives: 1/8 if there are children, 1/4 if no children (Quran 4:12)
  if (has('wives')) {
    const total = (has('sons') || has('daughters')) ? { n:1, d:8 } : { n:1, d:4 };
    results.push({ heir: 'wives', count: num('wives'), fraction: total, ref: 'Quran 4:12', note: 'divided equally among wives' });
    remaining -= total.n / total.d;
  }

  // Daughters only (no sons): 1/2 for one, 2/3 for two or more (Quran 4:11)
  const hasSons = has('sons'), hasDaughters = has('daughters');
  const sonCount = num('sons'), daughterCount = num('daughters');

  if (!hasSons && hasDaughters) {
    const share = daughterCount === 1 ? { n:1, d:2 } : { n:2, d:3 };
    results.push({ heir: 'daughters', count: daughterCount, fraction: share, ref: 'Quran 4:11' });
    remaining -= share.n / share.d;
  }

  // Mother: 1/3 if no children and no 2+ brothers/sisters, else 1/6 (Quran 4:11)
  if (has('mother')) {
    const hasChildren = hasSons || hasDaughters;
    const blockedByBrothers = num('brothers') >= 2;
    const share = (!hasChildren && !blockedByBrothers) ? { n:1, d:3 } : { n:1, d:6 };
    results.push({ heir: 'mother', count: 1, fraction: share, ref: 'Quran 4:11' });
    remaining -= share.n / share.d;
  }

  // Father: 1/6 if there are children (Quran 4:11); asabah if no children
  if (has('father')) {
    if (hasSons || hasDaughters) {
      results.push({ heir: 'father', count: 1, fraction: { n:1, d:6 }, ref: 'Quran 4:11' });
      remaining -= 1 / 6;
      // Father also gets asabah after daughters take their share
      if (!hasSons && hasDaughters) {
        // father gets residue
        if (remaining > 0) {
          results.push({ heir: 'father_asabah', count: 1, fraction: { residue: true, val: remaining }, ref: 'Residue (Asabah)', note: 'Residual after daughters' share' });
          remaining = 0;
        }
      }
    }
  }

  // ── Residual heirs (Asabah) ──
  // Sons (and daughters share with sons 2:1 ratio) — Quran 4:11
  if (hasSons) {
    const totalParts = sonCount * 2 + daughterCount;
    if (remaining > 0) {
      if (hasDaughters) {
        const sonShare = (remaining * 2) / totalParts;
        const dauShare = remaining / totalParts;
        results.push({ heir: 'sons', count: sonCount, fraction: { residue: true, val: sonShare * sonCount }, ref: 'Quran 4:11 (Asabah)' });
        results.push({ heir: 'daughters_with_sons', count: daughterCount, fraction: { residue: true, val: dauShare * daughterCount }, ref: 'Quran 4:11 (with sons)' });
      } else {
        results.push({ heir: 'sons', count: sonCount, fraction: { residue: true, val: remaining }, ref: 'Quran 4:11 (Asabah)' });
      }
      remaining = 0;
    }
  }

  // Father asabah (if no children)
  if (has('father') && !hasSons && !hasDaughters && remaining > 0) {
    results.push({ heir: 'father', count: 1, fraction: { residue: true, val: remaining }, ref: 'Quran 4:11 (Asabah)' });
    remaining = 0;
  }

  // ── Radd (return): if remaining > 0, redistribute back to fixed-share heirs proportionally ──
  if (remaining > 0.001) {
    const fardTotal = results.reduce((sum, r) => {
      if (!r.fraction.residue) return sum + r.fraction.n / r.fraction.d;
      return sum;
    }, 0);
    if (fardTotal > 0) {
      results.forEach(r => {
        if (!r.fraction.residue) r.fraction._radd = r.fraction.n / r.fraction.d / fardTotal * remaining;
      });
    }
  }

  // ── Calculate monetary amounts ──
  const formatted = results.map(r => {
    let fraction_str, amount;
    if (r.fraction.residue) {
      fraction_str = `${(r.fraction.val * 100).toFixed(1)}%`;
      amount = net * r.fraction.val;
    } else {
      const base = r.fraction.n / r.fraction.d;
      const extra = r.fraction._radd || 0;
      const total_frac = base + extra;
      fraction_str = extra > 0.001
        ? `${r.fraction.n}/${r.fraction.d} + Radd`
        : `${r.fraction.n}/${r.fraction.d}`;
      amount = net * total_frac;
    }
    return { ...r, fraction_str, amount };
  });

  return { net, results: formatted, remaining };
}

const HEIR_LABELS = {
  en: { husband:'Husband', wives:'Wife / Wives', sons:'Sons', daughters:'Daughters', father:'Father', mother:'Mother', father_asabah:'Father (Residue)', daughters_with_sons:'Daughters (with Sons)' },
  ar: { husband:'الزوج', wives:'الزوجة/الزوجات', sons:'الأبناء', daughters:'البنات', father:'الأب', mother:'الأم', father_asabah:'الأب (التعصيب)', daughters_with_sons:'البنات (مع الأبناء)' },
  fr: { husband:'Mari', wives:'Femme(s)', sons:'Fils', daughters:'Filles', father:'Père', mother:'Mère', father_asabah:'Père (résidu)', daughters_with_sons:'Filles (avec fils)' },
  tr: { husband:'Koca', wives:'Eş(ler)', sons:'Oğullar', daughters:'Kızlar', father:'Baba', mother:'Anne', father_asabah:'Baba (kalan)', daughters_with_sons:'Kızlar (oğullarla)' },
  ur: { husband:'شوہر', wives:'بیوی/بیویاں', sons:'بیٹے', daughters:'بیٹیاں', father:'والد', mother:'والدہ', father_asabah:'والد (بقیہ)', daughters_with_sons:'بیٹیاں (بیٹوں کے ساتھ)' },
  id: { husband:'Suami', wives:'Istri', sons:'Anak laki-laki', daughters:'Anak perempuan', father:'Ayah', mother:'Ibu', father_asabah:'Ayah (sisa)', daughters_with_sons:'Anak perempuan (dgn laki-laki)' }
};

let _lang = 'en';

function doCalculate(lang) {
  const v = id => parseFloat(document.getElementById(id)?.value) || 0;
  const b = id => document.getElementById(id)?.checked || false;

  const heirs = {
    husband: b('mHusband') ? 1 : 0,
    wives: v('mWives'),
    sons: v('mSons'),
    daughters: v('mDaughters'),
    father: b('mFather') ? 1 : 0,
    mother: b('mMother') ? 1 : 0,
    brothers: v('mBrothers'),
  };

  const result = calculateMirath({ estate: v('mEstate'), debts: v('mDebts'), heirs });
  const labels = HEIR_LABELS[lang] || HEIR_LABELS.en;
  const cur = document.getElementById('mCurrency')?.value || '$';

  const resEl = document.getElementById('mirathResult');
  if (!resEl) return;

  resEl.style.display = 'block';
  resEl.innerHTML = `
    <div class="mirath-net">
      <div class="mirath-net-label">${t('mirath.result', lang)}</div>
      <div class="mirath-net-val">${cur}${result.net.toLocaleString()}</div>
      <div class="mirath-net-sub">${t('mirath.estate', lang)} after ${t('mirath.debts', lang)}</div>
    </div>
    <div class="mirath-table-wrap">
      <table class="mirath-table">
        <thead>
          <tr>
            <th>${t('mirath.share', lang)}</th>
            <th>${t('mirath.fraction', lang)}</th>
            <th>${t('mirath.amount', lang)}</th>
            <th>${t('mirath.reference', lang)}</th>
          </tr>
        </thead>
        <tbody>
          ${result.results.map(r => `
            <tr>
              <td><strong>${labels[r.heir] || r.heir}</strong> ${r.count > 1 ? `(×${r.count})` : ''} ${r.note ? `<br><small>${r.note}</small>` : ''}</td>
              <td><span class="mirath-frac">${r.fraction_str}</span></td>
              <td><strong>${cur}${r.amount.toLocaleString(undefined, {maximumFractionDigits:2})}</strong></td>
              <td><small class="mirath-ref">${r.ref}</small></td>
            </tr>`).join('')}
        </tbody>
      </table>
    </div>
    <div class="mirath-disclaimer">
      <i class="ri-information-line"></i>
      ${lang === 'ar'
        ? 'هذه الحاسبة للمرجعية فقط. استشر عالماً مؤهلاً متخصصاً في علم المواريث لإصدار الحكم النهائي. والله أعلم'
        : 'This calculator is for reference only. Consult a qualified Islamic scholar specializing in Mirath for a binding ruling. والله أعلم'}
    </div>`;
}

const Mirath = {
  render(lang) {
    _lang = lang;
    return `
<div class="pg-hd">
  <div class="pg-hd-ic"><i class="ri-scales-3-fill"></i></div>
  <h1>${t('mirath.title', lang)}</h1>
  <p>${t('mirath.desc', lang)}</p>
</div>
<div class="pg-body">

  <div class="mirath-form rv">
    <div class="zk-row">
      <label>${t('mirath.estate', lang)}</label>
      <div style="display:flex;gap:8px">
        <select id="mCurrency" style="width:90px;padding:12px;border:1px solid var(--border-1);border-radius:var(--r-sm);background:var(--bg-sunk);color:var(--text-1);font-family:var(--font)">
          <option>$</option><option>€</option><option>£</option><option value="SAR ">﷼</option><option value="TRY ">₺</option>
          <option value="PKR ">₨</option><option value="IDR ">Rp</option><option value="EGP ">ج.م</option>
        </select>
        <input type="number" id="mEstate" placeholder="0" min="0" style="flex:1;padding:12px;border:1px solid var(--border-1);border-radius:var(--r-sm);background:var(--bg-sunk);color:var(--text-1);font-family:var(--font);font-size:15px">
      </div>
    </div>
    <div class="zk-row">
      <label>${t('mirath.debts', lang)}</label>
      <input type="number" id="mDebts" placeholder="0" min="0" style="width:100%;padding:12px;border:1px solid var(--border-1);border-radius:var(--r-sm);background:var(--bg-sunk);color:var(--text-1);font-family:var(--font);font-size:15px">
    </div>

    <div class="mirath-heirs-label">${t('mirath.heirs', lang)}</div>
    <div class="mirath-heirs-grid">
      <label class="mirath-heir-check"><input type="checkbox" id="mHusband"> ${t('mirath.husband', lang)}</label>
      <label class="mirath-heir-check"><input type="checkbox" id="mFather"> ${t('mirath.father', lang)}</label>
      <label class="mirath-heir-check"><input type="checkbox" id="mMother"> ${t('mirath.mother', lang)}</label>

      <label class="mirath-heir-num">
        ${t('mirath.wife', lang)}
        <input type="number" id="mWives" min="0" max="4" value="0" style="width:70px;padding:8px;border:1px solid var(--border-1);border-radius:8px;background:var(--bg-sunk);color:var(--text-1);font-family:var(--font)">
      </label>
      <label class="mirath-heir-num">
        ${t('mirath.sons', lang)}
        <input type="number" id="mSons" min="0" value="0" style="width:70px;padding:8px;border:1px solid var(--border-1);border-radius:8px;background:var(--bg-sunk);color:var(--text-1);font-family:var(--font)">
      </label>
      <label class="mirath-heir-num">
        ${t('mirath.daughters', lang)}
        <input type="number" id="mDaughters" min="0" value="0" style="width:70px;padding:8px;border:1px solid var(--border-1);border-radius:8px;background:var(--bg-sunk);color:var(--text-1);font-family:var(--font)">
      </label>
      <label class="mirath-heir-num">
        ${lang === 'ar' ? 'الإخوة' : 'Brothers (for blocking)'}
        <input type="number" id="mBrothers" min="0" value="0" style="width:70px;padding:8px;border:1px solid var(--border-1);border-radius:8px;background:var(--bg-sunk);color:var(--text-1);font-family:var(--font)">
      </label>
    </div>
    <button class="zk-btn" onclick="window.mirathCalc()">${t('common.calculate', lang)}</button>
  </div>

  <div id="mirathResult" style="display:none;margin-top:20px"></div>

  <div class="mirath-quran rv rv-d2">
    <div class="mirath-quran-title"><i class="ri-book-open-line"></i> ${lang === 'ar' ? 'الآيات الكريمة' : 'Quranic Basis'}</div>
    <div class="mirath-quran-ar">يُوصِيكُمُ اللَّهُ فِي أَوْلَادِكُمْ ۖ لِلذَّكَرِ مِثْلُ حَظِّ الْأُنثَيَيْنِ</div>
    <div class="mirath-quran-ref">An-Nisa 4:11</div>
    <div class="mirath-quran-en">Allah instructs you concerning your children: for the male, what is equal to the share of two females.</div>
  </div>

</div>
<footer class="ft"><i class="ri-heart-fill"></i> ${t('common.ummah', lang)}</footer>`;
  },

  init(lang) {
    _lang = lang;
    window.mirathCalc = () => doCalculate(lang);
  },

  destroy() {
    delete window.mirathCalc;
  }
};

export default Mirath;
