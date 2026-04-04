// ═══════════════════════════════════════════════════
// NOOR — pages/mirath.js  (fixed render)
// ═══════════════════════════════════════════════════

function calcMirath({ estate, debts, heirs }) {
  const net = Math.max(0, estate - debts);
  const results = [];
  let remaining = 1.0;

  const has = k => (heirs[k]||0) > 0;
  const num = k => heirs[k]||0;
  const hasSons = has('sons'), hasDaughters = has('daughters');

  // Husband: 1/4 (with children) or 1/2 (without)
  if (has('husband')) {
    const f = (hasSons||hasDaughters) ? [1,4] : [1,2];
    results.push({ heir:'husband', label_en:'Husband', label_ar:'الزوج', count:1, frac:f, ref:'Quran 4:12' });
    remaining -= f[0]/f[1];
  }

  // Wives: 1/8 (with children) or 1/4 (without) — shared equally
  if (has('wives')) {
    const f = (hasSons||hasDaughters) ? [1,8] : [1,4];
    results.push({ heir:'wives', label_en:`Wife${num('wives')>1?`/Wives (×${num('wives')})`:``}`, label_ar:'الزوجة/الزوجات', count:num('wives'), frac:f, ref:'Quran 4:12', note_en:`divided among ${num('wives')} wife${num('wives')>1?'ves':''}` });
    remaining -= f[0]/f[1];
  }

  // Daughters only (no sons): 1/2 (one) or 2/3 (two+)
  if (!hasSons && hasDaughters) {
    const f = num('daughters')===1 ? [1,2] : [2,3];
    results.push({ heir:'daughters', label_en:`Daughter${num('daughters')>1?'s':''}`, label_ar:'البنات', count:num('daughters'), frac:f, ref:'Quran 4:11' });
    remaining -= f[0]/f[1];
  }

  // Mother: 1/3 (no children & <2 siblings) or 1/6
  if (has('mother')) {
    const f = (!hasSons && !hasDaughters && num('brothers')<2) ? [1,3] : [1,6];
    results.push({ heir:'mother', label_en:'Mother', label_ar:'الأم', count:1, frac:f, ref:'Quran 4:11' });
    remaining -= f[0]/f[1];
  }

  // Father with children: 1/6 (fixed) + possible asabah residue
  if (has('father')) {
    if (hasSons || hasDaughters) {
      results.push({ heir:'father_fixed', label_en:'Father (fixed)', label_ar:'الأب (الفرض)', count:1, frac:[1,6], ref:'Quran 4:11' });
      remaining -= 1/6;
      // After daughters take their share, father also gets residue
      if (!hasSons && hasDaughters && remaining > 0.001) {
        results.push({ heir:'father_asabah', label_en:'Father (residue)', label_ar:'الأب (التعصيب)', count:1, residue:remaining, ref:'Classical fiqh' });
        remaining = 0;
      }
    }
  }

  // Sons + daughters (asabah, 2:1 ratio)
  if (hasSons && remaining > 0.001) {
    const totalParts = num('sons')*2 + (hasDaughters ? num('daughters') : 0);
    if (hasDaughters) {
      const sonShare  = (remaining * 2 / totalParts) * num('sons');
      const dauShare  = (remaining * 1 / totalParts) * num('daughters');
      results.push({ heir:'sons',  label_en:`Son${num('sons')>1?'s':''}`,      label_ar:'الأبناء', count:num('sons'),      residue:sonShare, ref:'Quran 4:11' });
      results.push({ heir:'daughters_s', label_en:`Daughter${num('daughters')>1?'s':''} (with sons)`, label_ar:'البنات (مع الأبناء)', count:num('daughters'), residue:dauShare, ref:'Quran 4:11' });
    } else {
      results.push({ heir:'sons', label_en:`Son${num('sons')>1?'s':''}`, label_ar:'الأبناء', count:num('sons'), residue:remaining, ref:'Quran 4:11' });
    }
    remaining = 0;
  }

  // Father asabah (no children)
  if (has('father') && !hasSons && !hasDaughters && remaining > 0.001) {
    results.push({ heir:'father_asabah2', label_en:'Father', label_ar:'الأب', count:1, residue:remaining, ref:'Classical fiqh (Asabah)' });
    remaining = 0;
  }

  // Radd: redistribute leftover proportionally
  if (remaining > 0.005) {
    const fixedSum = results.filter(r=>r.frac).reduce((s,r)=>s+r.frac[0]/r.frac[1],0);
    if (fixedSum>0) results.filter(r=>r.frac).forEach(r=>{ r._radd=(r.frac[0]/r.frac[1]/fixedSum)*remaining; });
  }

  // Compute amounts
  return results.map(r => {
    let fracStr, amount;
    if (r.residue!=null) {
      fracStr = `${(r.residue*100).toFixed(1)}%`;
      amount  = net * r.residue;
    } else {
      const base = r.frac[0]/r.frac[1];
      const extra = r._radd || 0;
      fracStr = extra>0.005 ? `${r.frac[0]}/${r.frac[1]} + Radd` : `${r.frac[0]}/${r.frac[1]}`;
      amount  = net*(base+extra);
    }
    return {...r, fracStr, amount};
  });
}

const Mirath = {
  render(lang) {
    const isAr = lang==='ar';
    const label = (en,ar,fr,tr,ur,id) => ({en,ar,fr,tr,ur,id}[lang]||en);

    return `
<div class="pg-hd">
  <div class="pg-hd-ic"><i class="ri-scales-3-fill"></i></div>
  <h1>${label('Inheritance (Mirath)','المواريث','Héritage Islamique','Miras Hesabı','وراثت (میراث)','Warisan Islam')}</h1>
  <p>${label('Calculate Islamic inheritance based on Quran 4:11-12 and 4:176.','احسب الميراث الإسلامي بناءً على القرآن الكريم.','Calculez l\'héritage islamique selon le Coran.','Kuran\'a göre miras hesabı.','قرآن کریم کے مطابق وراثت کا حساب۔','Hitung warisan Islam berdasarkan Quran.')}</p>
</div>
<div class="pg-body">

  <div class="mirath-form rv">
    <div class="zk-row">
      <label>${label('Currency','العملة','Devise','Para Birimi','کرنسی','Mata Uang')}</label>
      <select id="mCurrency" style="width:100%;padding:12px;border:1px solid var(--border-1);border-radius:var(--r-sm);background:var(--bg-sunk);color:var(--text-1);font-family:var(--font)">
        <option value="$">USD ($)</option><option value="€">EUR (€)</option><option value="£">GBP (£)</option>
        <option value="TND ">TND (د.ت)</option><option value="SAR ">SAR (﷼)</option>
        <option value="TRY ">TRY (₺)</option><option value="PKR ">PKR (₨)</option>
        <option value="IDR ">IDR (Rp)</option><option value="EGP ">EGP (ج.م)</option>
        <option value="MAD ">MAD (د.م)</option>
      </select>
    </div>
    <div class="zk-row">
      <label>${label('Total Estate Value','إجمالي قيمة التركة','Valeur totale de la succession','Toplam miras değeri','کل ترکہ','Total harta warisan')}</label>
      <input type="number" id="mEstate" placeholder="0" min="0" style="width:100%;padding:12px;border:1px solid var(--border-1);border-radius:var(--r-sm);background:var(--bg-sunk);color:var(--text-1);font-family:var(--font);font-size:15px">
    </div>
    <div class="zk-row">
      <label>${label('Debts & Funeral Expenses (deducted first)','الديون ومصاريف الجنازة (تُطرح أولاً)','Dettes et frais funéraires','Borçlar','قرضے','Hutang & biaya pemakaman')}</label>
      <input type="number" id="mDebts" placeholder="0" min="0" style="width:100%;padding:12px;border:1px solid var(--border-1);border-radius:var(--r-sm);background:var(--bg-sunk);color:var(--text-1);font-family:var(--font);font-size:15px">
    </div>

    <div class="mirath-heirs-label">${label('Select Heirs','حدد الورثة','Sélectionner les héritiers','Varisleri seçin','وارثین منتخب کریں','Pilih ahli waris')}</div>
    <div class="mirath-heirs-grid">
      <label class="mirath-heir-check"><input type="checkbox" id="mHusband"> ${label('Husband','الزوج','Mari','Koca','شوہر','Suami')}</label>
      <label class="mirath-heir-check"><input type="checkbox" id="mFather">  ${label('Father','الأب','Père','Baba','والد','Ayah')}</label>
      <label class="mirath-heir-check"><input type="checkbox" id="mMother">  ${label('Mother','الأم','Mère','Anne','والدہ','Ibu')}</label>
      <label class="mirath-heir-num">
        ${label('Wives','الزوجات','Épouses','Eşler','بیویاں','Istri')}
        <input type="number" id="mWives" min="0" max="4" value="0" style="width:70px;padding:8px;border:1px solid var(--border-1);border-radius:8px;background:var(--bg-sunk);color:var(--text-1);font-family:var(--font)">
      </label>
      <label class="mirath-heir-num">
        ${label('Sons','الأبناء','Fils','Oğullar','بیٹے','Anak L.')}
        <input type="number" id="mSons" min="0" value="0" style="width:70px;padding:8px;border:1px solid var(--border-1);border-radius:8px;background:var(--bg-sunk);color:var(--text-1);font-family:var(--font)">
      </label>
      <label class="mirath-heir-num">
        ${label('Daughters','البنات','Filles','Kızlar','بیٹیاں','Anak P.')}
        <input type="number" id="mDaughters" min="0" value="0" style="width:70px;padding:8px;border:1px solid var(--border-1);border-radius:8px;background:var(--bg-sunk);color:var(--text-1);font-family:var(--font)">
      </label>
      <label class="mirath-heir-num">
        ${label('Brothers (blocking)','الإخوة (للحجب)','Frères','Erkek kardeş','بھائی','Saudara L.')}
        <input type="number" id="mBrothers" min="0" value="0" style="width:70px;padding:8px;border:1px solid var(--border-1);border-radius:8px;background:var(--bg-sunk);color:var(--text-1);font-family:var(--font)">
      </label>
    </div>
    <button class="zk-btn" id="mirathCalcBtn">${label('Calculate','احسب','Calculer','Hesapla','حساب کریں','Hitung')}</button>
  </div>

  <div id="mirathResult" style="display:none;margin-top:20px"></div>

  <div class="mirath-quran rv rv-d2">
    <div class="mirath-quran-title"><i class="ri-book-open-line"></i> ${label('Quranic Basis','الأساس القرآني','Base coranique','Kuran Referansı','قرآنی بنیاد','Dasar Quran')}</div>
    <div class="mirath-quran-ar">يُوصِيكُمُ اللَّهُ فِي أَوْلَادِكُمْ ۖ لِلذَّكَرِ مِثْلُ حَظِّ الْأُنثَيَيْنِ</div>
    <div class="mirath-quran-ref">An-Nisa 4:11</div>
    <div class="mirath-quran-en">Allah instructs you concerning your children: for the male, what is equal to the share of two females.</div>
  </div>

</div>
<footer class="ft"><i class="ri-heart-fill"></i> ${isAr?'صُنع للأمة':'Built for the Ummah'}</footer>`;
  },

  init(lang) {
    const isAr = lang==='ar';

    document.getElementById('mirathCalcBtn')?.addEventListener('click', () => {
      const v = id => parseFloat(document.getElementById(id)?.value)||0;
      const b = id => document.getElementById(id)?.checked||false;

      const heirs = {
        husband:   b('mHusband')?1:0,
        wives:     v('mWives'),
        sons:      v('mSons'),
        daughters: v('mDaughters'),
        father:    b('mFather')?1:0,
        mother:    b('mMother')?1:0,
        brothers:  v('mBrothers'),
      };

      const results = calcMirath({ estate:v('mEstate'), debts:v('mDebts'), heirs });
      const cur = document.getElementById('mCurrency')?.value||'$';
      const net = Math.max(0, v('mEstate') - v('mDebts'));

      const resEl = document.getElementById('mirathResult');
      if (!resEl) return;

      if (results.length===0) {
        resEl.style.display='block';
        resEl.innerHTML=`<div class="mirath-quran" style="text-align:center;padding:20px;color:var(--text-3)">${isAr?'يرجى تحديد الورثة أولاً':'Please select at least one heir.'}</div>`;
        return;
      }

      resEl.style.display='block';
      resEl.innerHTML=`
        <div class="mirath-net">
          <div class="mirath-net-label">${isAr?'صافي التركة':'Net Estate'}</div>
          <div class="mirath-net-val">${cur}${net.toLocaleString()}</div>
          <div class="mirath-net-sub">${isAr?'بعد خصم الديون':'After deducting debts'}</div>
        </div>
        <div class="mirath-table-wrap">
          <table class="mirath-table">
            <thead>
              <tr>
                <th>${isAr?'الوارث':'Heir'}</th>
                <th>${isAr?'النصيب':'Share'}</th>
                <th>${isAr?'المبلغ':'Amount'}</th>
                <th>${isAr?'المرجع':'Reference'}</th>
              </tr>
            </thead>
            <tbody>
              ${results.map(r=>`
                <tr>
                  <td><strong>${isAr?r.label_ar:r.label_en}</strong> ${r.note_en&&!isAr?`<br><small style="color:var(--text-3)">${r.note_en}</small>`:''}</td>
                  <td><span class="mirath-frac">${r.fracStr}</span></td>
                  <td><strong>${cur}${r.amount.toLocaleString(undefined,{maximumFractionDigits:2})}</strong></td>
                  <td><small class="mirath-ref">${r.ref}</small></td>
                </tr>`).join('')}
            </tbody>
          </table>
        </div>
        <div class="mirath-disclaimer">
          <i class="ri-information-line"></i>
          ${isAr?'هذه الحاسبة للمرجعية فقط. استشر عالماً مؤهلاً متخصصاً في علم المواريث. والله أعلم':'This calculator is for reference only. Consult a qualified Islamic scholar for a binding ruling. والله أعلم'}
        </div>`;
    });
  }
};

export default Mirath;
