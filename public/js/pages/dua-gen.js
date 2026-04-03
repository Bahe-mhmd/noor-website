// ═══════════════════════════════════════════════════
// NOOR — pages/dua-gen.js: AI Dua Generator
// ═══════════════════════════════════════════════════
import { t } from '../i18n.js';

let _lang = 'en';

const DUA_CATEGORIES = [
  { icon:'📚', en:'Exams & Study',    ar:'الامتحانات والدراسة', fr:'Examens',        tr:'Sınav & Ders',    ur:'امتحان اور تعلیم', id:'Ujian & Belajar'   },
  { icon:'💼', en:'Work & Provision', ar:'العمل والرزق',        fr:'Travail & Rizq', tr:'İş & Rızık',      ur:'کام اور رزق',      id:'Pekerjaan & Rezeki'},
  { icon:'❤️', en:'Family & Marriage',ar:'الأسرة والزواج',     fr:'Famille',        tr:'Aile & Evlilik',  ur:'خاندان اور شادی',  id:'Keluarga & Nikah'  },
  { icon:'🏥', en:'Health & Healing', ar:'الصحة والشفاء',       fr:'Santé',          tr:'Sağlık',          ur:'صحت اور شفاء',     id:'Kesehatan'         },
  { icon:'✈️', en:'Travel & Safety',  ar:'السفر والأمان',       fr:'Voyage',         tr:'Seyahat',         ur:'سفر اور حفاظت',    id:'Perjalanan'        },
  { icon:'🤲', en:'Forgiveness',      ar:'الاستغفار والتوبة',   fr:'Pardon',         tr:'Tövbe & Af',      ur:'توبہ اور مغفرت',   id:'Taubat & Ampunan'  },
  { icon:'😔', en:'Anxiety & Stress', ar:'القلق والهموم',       fr:'Anxiété',        tr:'Kaygı & Stres',   ur:'پریشانی اور تناؤ', id:'Kecemasan'         },
  { icon:'🕌', en:'Guidance & Tawbah',ar:'الهداية والتوبة',     fr:'Guidance',       tr:'Hidayet',         ur:'ہدایت',            id:'Hidayah'           },
];

const DUA_SYSTEM_PROMPT = `You are a knowledgeable Islamic scholar assistant specializing in authentic duas (supplications). 
The user will describe their situation or need. Your task is to provide:
1. An authentic dua from the Quran or Sunnah that fits their situation (or a scholarly-approved general dua if no specific one exists)
2. The Arabic text
3. Transliteration (Latin letters)
4. Complete meaning/translation
5. Source reference (hadith number or Quran verse)
6. A brief explanation of why this dua is appropriate

Format your response EXACTLY like this:
ARABIC: [Arabic dua text]
TRANSLITERATION: [Latin transliteration]
MEANING: [Full English meaning]
SOURCE: [Exact reference - e.g., Sahih Bukhari 5672, or Quran 2:286]
EXPLANATION: [2-3 sentences why this dua fits and its virtues]

CRITICAL RULES:
- Only use duas from Quran or authentic hadith (Bukhari, Muslim, Abu Dawud, Tirmidhi, Ibn Majah, Nasa'i)
- NEVER fabricate hadiths or duas
- If no specific dua exists for the situation, use a general authentic dua and explain it
- If the user writes in Arabic, respond with Arabic explanation too
- Always end with والله أعلم`;

async function generateDua(description, lang) {
  const resultEl = document.getElementById('duaResult');
  const loadingEl = document.getElementById('duaLoading');
  const generateBtn = document.getElementById('duaGenerateBtn');
  if (!resultEl || !loadingEl) return;

  resultEl.style.display = 'none';
  loadingEl.style.display = 'flex';
  if (generateBtn) generateBtn.disabled = true;

  const prompt = lang === 'ar'
    ? `أحتاج دعاءً مناسباً لهذه الحالة: ${description}`
    : `I need an authentic Islamic dua for this situation: ${description}. Please provide the dua with Arabic text, transliteration, meaning, and source reference.`;

  try {
    const resp = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: prompt + '\n\nSystem context: ' + DUA_SYSTEM_PROMPT.substring(0, 500) })
    });
    const data = await resp.json();
    loadingEl.style.display = 'none';
    if (generateBtn) generateBtn.disabled = false;

    if (data.response) {
      displayDua(data.response, lang);
    } else {
      resultEl.style.display = 'block';
      resultEl.innerHTML = `<div class="dua-error"><i class="ri-error-warning-line"></i> ${t('common.error', lang)}</div>`;
    }
  } catch(e) {
    loadingEl.style.display = 'none';
    if (generateBtn) generateBtn.disabled = false;
    resultEl.style.display = 'block';
    resultEl.innerHTML = `<div class="dua-error"><i class="ri-wifi-off-line"></i> ${t('common.error', lang)}</div>`;
  }
}

function displayDua(text, lang) {
  const resultEl = document.getElementById('duaResult');
  if (!resultEl) return;

  // Parse structured response
  const arabic = text.match(/ARABIC:\s*([\s\S]+?)(?=TRANSLITERATION:|$)/i)?.[1]?.trim() || '';
  const trans = text.match(/TRANSLITERATION:\s*([\s\S]+?)(?=MEANING:|$)/i)?.[1]?.trim() || '';
  const meaning = text.match(/MEANING:\s*([\s\S]+?)(?=SOURCE:|$)/i)?.[1]?.trim() || '';
  const source = text.match(/SOURCE:\s*([\s\S]+?)(?=EXPLANATION:|$)/i)?.[1]?.trim() || '';
  const explanation = text.match(/EXPLANATION:\s*([\s\S]+?)(?=$)/i)?.[1]?.trim() || '';

  // If parsing failed, show raw formatted response
  if (!arabic) {
    resultEl.style.display = 'block';
    resultEl.innerHTML = `<div class="dua-raw">${text.replace(/\n/g, '<br>')}</div>`;
    return;
  }

  resultEl.style.display = 'block';
  resultEl.innerHTML = `
    <div class="dua-result-card">
      <div class="dua-ar">${arabic}</div>
      ${trans ? `<div class="dua-trans"><span class="dua-label">${t('dua.transliteration', lang)}</span>${trans}</div>` : ''}
      ${meaning ? `<div class="dua-meaning"><span class="dua-label">${t('dua.meaning', lang)}</span>${meaning}</div>` : ''}
      ${source ? `<div class="dua-source"><i class="ri-book-open-line"></i> <span class="dua-label">${t('dua.source', lang)}</span>${source}</div>` : ''}
      ${explanation ? `<div class="dua-explanation"><i class="ri-lightbulb-line"></i>${explanation}</div>` : ''}
      <div class="dua-result-actions">
        <button class="daily-action-btn" onclick="window.copyDua()">
          <i class="ri-file-copy-line"></i> ${t('common.copy', lang)}
        </button>
      </div>
    </div>
    <div class="dua-disclaimer">
      <i class="ri-information-line"></i> ${t('dua.disclaimer', lang)}
    </div>`;

  window.copyDua = () => {
    navigator.clipboard.writeText(`${arabic}\n\n${trans}\n\n${meaning}\n\n${source}`).catch(() => {});
  };
}

const DuaGen = {
  render(lang) {
    _lang = lang;
    return `
<div class="pg-hd">
  <div class="pg-hd-ic"><i class="ri-sparkling-fill"></i></div>
  <h1>${t('dua.title', lang)}</h1>
  <p>${t('dua.desc', lang)}</p>
</div>
<div class="pg-body">

  <div class="dua-input-section rv">
    <textarea id="duaInput" class="dua-textarea"
      placeholder="${t('dua.placeholder', lang)}"
      rows="4"></textarea>
    <button class="dua-generate-btn" id="duaGenerateBtn" onclick="window.generateDua()">
      <i class="ri-sparkling-2-line"></i> ${t('common.generate', lang)}
    </button>
  </div>

  <div class="dua-cats rv rv-d1">
    <div class="dua-cats-label">${t('dua.categories', lang)}</div>
    <div class="dua-cats-grid">
      ${DUA_CATEGORIES.map(c => `
        <button class="dua-cat-btn" data-en="${c.en}" data-ar="${c.ar}" data-fr="${c.fr}" data-tr="${c.tr}" data-ur="${c.ur}" data-id="${c.id}">
          ${c.icon} ${c[lang] || c.en}
        </button>`).join('')}
    </div>
  </div>

  <div class="dua-loading" id="duaLoading" style="display:none">
    <div class="typ"><span></span><span></span><span></span></div>
    <span>${t('dua.generating', lang)}</span>
  </div>

  <div class="dua-result" id="duaResult" style="display:none"></div>

</div>
<footer class="ft"><i class="ri-heart-fill"></i> ${t('common.ummah', lang)}</footer>`;
  },

  init(lang) {
    _lang = lang;
    window.generateDua = () => {
      const input = document.getElementById('duaInput')?.value.trim();
      if (!input) return;
      generateDua(input, lang);
    };

    // Category quick-fill
    document.querySelectorAll('.dua-cat-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const text = btn.getAttribute(`data-${lang}`) || btn.dataset.en;
        const textarea = document.getElementById('duaInput');
        if (textarea) { textarea.value = text; textarea.focus(); }
      });
    });

    // Enter key on textarea (Ctrl+Enter)
    document.getElementById('duaInput')?.addEventListener('keydown', e => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') { e.preventDefault(); window.generateDua(); }
    });
  },

  destroy() {
    delete window.generateDua;
    delete window.copyDua;
  }
};

export default DuaGen;
