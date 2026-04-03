// ═══════════════════════════════════════════════════
// NOOR — pages/zakat.js: Zakat Calculator
// ═══════════════════════════════════════════════════

function calcZakat() {
  const v = id => parseFloat(document.getElementById(id)?.value) || 0;
  const cash=v('zkCash'), gold=v('zkGold'), silver=v('zkSilver'), stocks=v('zkStocks'), biz=v('zkBusiness'), debt=v('zkDebt');
  const total = cash + gold + silver + stocks + biz - debt;
  const zakat = total > 0 ? total * 0.025 : 0;
  const cur = document.getElementById('zkCurrency')?.value || '$';
  const amtEl = document.getElementById('zkAmount');
  const detailEl = document.getElementById('zkDetail');
  if (amtEl) amtEl.textContent = `${cur}${zakat.toFixed(2)}`;
  if (detailEl) detailEl.textContent = `Total zakatable assets: ${cur}${total.toFixed(2)}`;
}

const Zakat = {
  render(lang) {
    const isAr = lang === 'ar';
    const label = (en, ar) => isAr ? ar : en;
    return `
<div class="pg-hd">
  <div class="pg-hd-ic"><i class="ri-money-dollar-circle-fill"></i></div>
  <h1>${label('Zakat Calculator','حاسبة الزكاة')}</h1>
  <p>${label('Calculate your annual Zakat based on all assets. Nisab: 85g gold or 595g silver.','احسب زكاتك السنوية بناءً على جميع أصولك. النصاب: 85 جرام ذهب أو 595 جرام فضة.')}</p>
</div>
<div class="pg-body">
  <div class="zk-form rv">
    <div class="zk-row">
      <label><i class="ri-money-dollar-circle-line"></i> ${label('Currency','العملة')}</label>
      <select id="zkCurrency" style="width:100%;padding:12px 16px;border:1px solid var(--border-1);border-radius:var(--r-sm);background:var(--bg-sunk);color:var(--text-1);font-family:var(--font);font-size:15px;">
        <option value="$">USD ($)</option><option value="€">EUR (€)</option><option value="£">GBP (£)</option>
        <option value="SAR ">SAR (﷼)</option><option value="EGP ">EGP (ج.م)</option><option value="TND ">TND (د.ت)</option>
      </select>
    </div>
    <div class="zk-row"><label><i class="ri-bank-card-line"></i> ${label('Cash & Bank Savings','النقد والمدخرات')}</label><input type="number" id="zkCash" placeholder="0" min="0"></div>
    <div class="zk-row"><label><i class="ri-coins-line"></i> ${label('Gold Value','قيمة الذهب')}</label><input type="number" id="zkGold" placeholder="0" min="0"></div>
    <div class="zk-row"><label><i class="ri-coins-line"></i> ${label('Silver Value','قيمة الفضة')}</label><input type="number" id="zkSilver" placeholder="0" min="0"></div>
    <div class="zk-row"><label><i class="ri-stock-line"></i> ${label('Stocks & Investments','الأسهم والاستثمارات')}</label><input type="number" id="zkStocks" placeholder="0" min="0"></div>
    <div class="zk-row"><label><i class="ri-store-line"></i> ${label('Business Assets','أصول الأعمال')}</label><input type="number" id="zkBusiness" placeholder="0" min="0"></div>
    <div class="zk-row"><label><i class="ri-subtract-line"></i> ${label('Debts (deducted)','الديون (تُطرح)')}</label><input type="number" id="zkDebt" placeholder="0" min="0"></div>
    <button class="zk-btn" onclick="window.calcZakat()">${label('Calculate Zakat','احسب الزكاة')}</button>
  </div>
  <div class="zk-result rv rv-d1">
    <h3>${label('Zakat Due','الزكاة الواجبة')}</h3>
    <div class="zk-amount" id="zkAmount">$0.00</div>
    <div class="zk-detail" id="zkDetail">${label('Enter your assets above to calculate','أدخل أصولك أعلاه للحساب')}</div>
  </div>
  <div class="zk-info rv rv-d2">
    <i class="ri-information-line" style="color:var(--gold-500);margin-right:6px"></i>
    ${label('Zakat is 2.5% of total zakatable wealth held for one lunar year (hawl) above the nisab threshold. Consult a qualified scholar for your specific situation.','الزكاة 2.5% من إجمالي الثروة الزكوية المحتفظ بها لمدة حول قمري (حول) فوق النصاب. استشر عالماً مؤهلاً لحالتك الخاصة.')}
  </div>
</div>
<footer class="ft"><i class="ri-heart-fill"></i> ${isAr ? 'صُنع للأمة' : 'Built for the Ummah'}</footer>`;
  },

  init() { window.calcZakat = calcZakat; },
  destroy() { delete window.calcZakat; }
};

export default Zakat;
