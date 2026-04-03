// ═══════════════════════════════════════════════════
// NOOR — pages/halal.js: Halal Food Checker
// ═══════════════════════════════════════════════════
import { HALAL_DB } from '../config.js';

let _lang = 'en';

function showResult(status, name, reason) {
  const el = document.getElementById('hlResult');
  const statusEl = document.getElementById('hlStatus');
  const reasonEl = document.getElementById('hlReason');
  if (!el) return;
  const labels = {
    halal:    { en: '✅ Halal', ar: '✅ حلال', cls: 'halal-s' },
    haram:    { en: '❌ Haram', ar: '❌ حرام', cls: 'haram-s' },
    doubtful: { en: '⚠️ Doubtful (Mashbooh)', ar: '⚠️ مشتبه', cls: 'doubtful-s' }
  };
  const lb = labels[status] || labels.doubtful;
  el.className = `hl-result show ${status}`;
  statusEl.className = `hl-status ${lb.cls}`;
  statusEl.innerHTML = `${_lang === 'ar' ? lb.ar : lb.en} — ${name}`;
  reasonEl.textContent = reason;
}

async function checkHalal() {
  const input = document.getElementById('hlInput')?.value.trim().toLowerCase();
  if (!input) return;
  const el = document.getElementById('hlResult');
  const statusEl = document.getElementById('hlStatus');
  const reasonEl = document.getElementById('hlReason');
  if (!el) return;

  // Check local DB first
  const match = HALAL_DB[input] || HALAL_DB[input.replace(/\s+/g,'-')] || HALAL_DB[input.replace(/^e\s*/i,'e')];
  if (match) { showResult(match.s, match.n, match.r); return; }

  // Fall back to AI
  statusEl.innerHTML = '<i class="ri-loader-4-line" style="animation:lSpin 1s linear infinite"></i> Checking...';
  reasonEl.textContent = '';
  el.className = 'hl-result show doubtful';

  try {
    const resp = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: `Is "${input}" halal, haram, or doubtful (mashbooh) in Islam? Answer in this exact format:\nSTATUS: [halal/haram/doubtful]\nNAME: [ingredient name]\nREASON: [brief explanation with Islamic ruling, 2-3 sentences max]` })
    });
    const data = await resp.json();
    if (data.response) {
      const txt = data.response;
      const statusMatch = txt.match(/STATUS:\s*(halal|haram|doubtful)/i);
      const nameMatch = txt.match(/NAME:\s*(.+)/i);
      const reasonMatch = txt.match(/REASON:\s*([\s\S]+?)(?:SOURCES:|$)/i);
      showResult(
        statusMatch ? statusMatch[1].toLowerCase() : 'doubtful',
        nameMatch ? nameMatch[1].trim() : input,
        reasonMatch ? reasonMatch[1].trim() : 'Could not determine. Please consult a scholar.'
      );
    } else {
      showResult('doubtful', input, 'Could not check this ingredient. Please consult a scholar. والله أعلم');
    }
  } catch(e) {
    showResult('doubtful', input, 'Connection error. Please try again.');
  }
}

const QUICK_ITEMS = ['Gelatin','Carmine','Vanilla Extract','MSG','Rennet','E471','Alcohol','Lard','Carrageenan','Whey'];

const Halal = {
  render(lang) {
    const isAr = lang === 'ar';
    _lang = lang;
    return `
<div class="pg-hd">
  <div class="pg-hd-ic"><i class="ri-restaurant-fill"></i></div>
  <h1>${isAr ? 'فحص الحلال' : 'Halal Checker'}</h1>
  <p>${isAr ? 'تحقق من المكونات والإضافات الغذائية — قاعدة بيانات + ذكاء اصطناعي.' : 'Check food ingredients and E-numbers — database + AI fallback.'}</p>
</div>
<div class="pg-body">
  <div class="hl-input-row rv">
    <input type="text" id="hlInput"
      placeholder="${isAr ? 'أدخل مكوناً أو رقم E (مثل: Gelatin, E441)' : 'Enter ingredient or E-number (e.g. Gelatin, E441)'}"
      onkeydown="if(event.key==='Enter')window.checkHalal()">
    <button class="hl-btn" onclick="window.checkHalal()">${isAr ? 'فحص' : 'Check'}</button>
  </div>

  <div class="hl-quick rv rv-d1">
    ${QUICK_ITEMS.map(item => `<button class="hl-qbtn" onclick="window.quickCheck('${item}')">${item}</button>`).join('')}
  </div>

  <div class="hl-result" id="hlResult">
    <div class="hl-status" id="hlStatus"></div>
    <div class="hl-reason" id="hlReason"></div>
  </div>

  <div class="hl-info rv rv-d2">
    <i class="ri-information-line" style="color:var(--gold-500);margin-right:6px"></i>
    ${isAr
      ? 'هذه الأداة مرجعية فقط. استشر عالماً مؤهلاً أو هيئة حلال معتمدة لإصدار الحكم النهائي.'
      : 'This tool is a reference only. Consult a qualified scholar or certified halal authority for a definitive ruling. والله أعلم'}
  </div>
</div>
<footer class="ft"><i class="ri-heart-fill"></i> ${isAr ? 'صُنع للأمة' : 'Built for the Ummah'}</footer>`;
  },

  init(lang) {
    _lang = lang;
    window.checkHalal = checkHalal;
    window.quickCheck = (item) => {
      const input = document.getElementById('hlInput');
      if (input) { input.value = item; checkHalal(); }
    };
  },

  destroy() {
    delete window.checkHalal;
    delete window.quickCheck;
  }
};

export default Halal;
