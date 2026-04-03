// ═══════════════════════════════════════════════════
// NOOR — pages/home.js: AI Chat Assistant
// ═══════════════════════════════════════════════════
import { SOURCE_URLS } from '../config.js';

let isProcessing = false;

const disclaimerEN = `<div class="research-note"><i class="ri-information-line"></i><span><b>This answer is based on scholarly sources and is not a personal fatwa.</b> We encourage you to continue researching. As our Prophet ﷺ said: <em>"Seeking knowledge is an obligation upon every Muslim."</em> (Ibn Majah). May Allah guide us all to the truth.</span></div>`;
const disclaimerAR = `<div class="research-note"><i class="ri-information-line"></i><span><b>هذه الإجابة مبنية على مصادر علمية وليست فتوى شخصية.</b> نشجعك على مواصلة البحث. كما قال نبينا ﷺ: <em>«طلب العلم فريضة على كل مسلم»</em> (ابن ماجه). نسأل الله أن يهدينا جميعاً إلى الحق.</span></div>`;

const MANIP = [/ignore.*(previous|above|all|your).*instructions/i,/forget.*(rules|instructions|prompt)/i,/pretend.*(you are|to be)/i,/you are now/i,/jailbreak/i,/bypass/i,/system prompt/i,/reveal.*prompt/i,/write.*(code|script|program|python|javascript)/i,/hack/i,/role.?play/i,/DAN/i,/do anything now/i,/unlimited mode/i,/developer mode/i,/sudo/i,/override/i];

const MANIP_EN = `<div class="opinion"><div class="opinion-scholar"><i class="ri-shield-check-line"></i> Noor — Islamic Knowledge Assistant</div>I am Noor, an Islamic knowledge assistant. I can only help with questions related to Islam — Quran, Hadith, Fiqh, Seerah, and Islamic guidance.<br><br>May Allah bless you. 🤲</div>`;
const MANIP_AR = `<div class="opinion"><div class="opinion-scholar"><i class="ri-shield-check-line"></i> نور — مساعد المعرفة الإسلامية</div>أنا نور، مساعد المعرفة الإسلامية. يمكنني فقط المساعدة في الأسئلة المتعلقة بالإسلام.<br><br>بارك الله فيك. 🤲</div>`;

const ERRS = {
  en: {
    RATE_LIMIT: `<div class="opinion"><div class="opinion-scholar"><i class="ri-time-line"></i> Rate Limit</div>Too many requests. Please wait a moment and try again. May Allah reward your patience. 🤲</div>`,
    API_KEY: `<div class="opinion"><div class="opinion-scholar"><i class="ri-error-warning-line"></i> Configuration Error</div>API key issue. Please check your setup.</div>`,
    NETWORK: `<div class="opinion"><div class="opinion-scholar"><i class="ri-wifi-off-line"></i> Connection Error</div>Unable to connect. Please check your internet and try again.</div>`,
    DEFAULT: `<div class="opinion"><div class="opinion-scholar"><i class="ri-error-warning-line"></i> Error</div>Something went wrong. Please try again.</div>`
  },
  ar: {
    RATE_LIMIT: `<div class="opinion"><div class="opinion-scholar"><i class="ri-time-line"></i> الحد الأقصى</div>طلبات كثيرة. يرجى الانتظار والمحاولة مرة أخرى. جزاكم الله خيرًا على صبركم. 🤲</div>`,
    API_KEY: `<div class="opinion"><div class="opinion-scholar"><i class="ri-error-warning-line"></i> خطأ</div>مشكلة في مفتاح API.</div>`,
    NETWORK: `<div class="opinion"><div class="opinion-scholar"><i class="ri-wifi-off-line"></i> خطأ اتصال</div>تعذر الاتصال. تحقق من الإنترنت.</div>`,
    DEFAULT: `<div class="opinion"><div class="opinion-scholar"><i class="ri-error-warning-line"></i> خطأ</div>حدث خطأ. يرجى المحاولة مرة أخرى.</div>`
  }
};

function isManip(t) { return MANIP.some(p => p.test(t)); }

function detectSources(text) {
  const found = new Map();
  const terms = [
    ['Sunnah.com','Sunnah.com'],['sunnah.com','Sunnah.com'],
    ['IslamQA','IslamQA'],['islamqa','IslamQA'],
    ['IslamWeb','IslamWeb'],['islamweb','IslamWeb'],
    ['Bin Baz','Bin Baz'],['Ibn Baz','Bin Baz'],['ابن باز','Bin Baz'],
    ['Ibn Uthaymin','Ibn Uthaymin'],['ابن عثيمين','Ibn Uthaymin'],
    ['Dorar','Dorar.net'],['الدرر','Dorar.net'],
    ['Kalamullah','Kalamullah'],['MuslimMatters','MuslimMatters'],
    ['Sahih Bukhari','Sahih Bukhari'],['البخاري','Sahih Bukhari'],
    ['Sahih Muslim','Sahih Muslim'],['صحيح مسلم','Sahih Muslim'],
    ['Abu Dawud','Abu Dawud'],['Tirmidhi','Tirmidhi'],
    ['Ibn Majah','Ibn Majah'],['Ibn Kathir','Ibn Kathir'],['ابن كثير','Ibn Kathir'],
    ['Quran','Quran'],['القرآن','Quran'],['سورة','Quran'],
    ['MTafsir','MTafsir'],['IslamWay','IslamWay']
  ];
  const lt = text.toLowerCase();
  terms.forEach(([t, d]) => { if (lt.includes(t.toLowerCase())) found.set(d, true); });
  return [...found.keys()];
}

function extractSourcesLine(text) {
  const m = text.match(/SOURCES:\s*(.+)/i);
  if (m) return { text: text.replace(/SOURCES:\s*(.+)/i, '').trim(), explicitSources: m[1].split(',').map(s => s.trim()).filter(Boolean) };
  return { text, explicitSources: [] };
}

function formatResponse(text) {
  let h = text.replace(/```html\n?/gi, '').replace(/```\n?/g, '');
  if (h.includes('class="opinion"')) return h;
  h = h.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
  h = h.replace(/^###\s+(.+)$/gm, '<b>$1</b>');
  h = h.replace(/^##\s+(.+)$/gm, '<b>$1</b>');
  h = h.replace(/^\s*[-*]\s+/gm, '• ');
  h = h.replace(/\n\n/g, '<br><br>');
  h = h.replace(/\n/g, '<br>');
  return h;
}

// ── Render HTML ──
const Home = {
  render(lang) {
    const isAr = lang === 'ar';
    return `
<div class="home">
  <div class="hero" id="hero">
    <div class="hero-ar">بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</div>
    <h1 class="hero-h1">
      ${isAr ? 'ابحث عن إجابات من<br><span class="hl">العلماء الموثوقين</span>' : 'Find Answers from<br><span class="hl">Trusted Scholars</span>'}
    </h1>
    <p class="hero-p">
      ${isAr ? 'نساعد المسلمين وغير المسلمين في إيجاد إجابات إسلامية أصيلة بالأدلة والمراجع وشرح العلماء.' : 'Helping Muslims and non-Muslims find authentic Islamic answers with proof, references, and scholarly explanations.'}
    </p>
    <div class="hero-divider">
      <span class="hero-divider-line"></span>
      <i class="ri-star-s-fill hero-divider-star"></i>
      <span class="hero-divider-line"></span>
    </div>
    <div class="stats-bar">
      <div class="stat"><div class="stat-num">12+</div><div class="stat-lbl">${isAr ? 'مصدر' : 'Sources'}</div></div>
      <div class="stat"><div class="stat-num">4</div><div class="stat-lbl">${isAr ? 'مذاهب' : 'Madhahib'}</div></div>
      <div class="stat"><div class="stat-num">2</div><div class="stat-lbl">${isAr ? 'لغات' : 'Languages'}</div></div>
    </div>
  </div>

  <div class="sugs" id="sugs">
    <div class="sug rv rv-d1" data-q="${isAr ? 'كيف أصلي أثناء السفر؟' : 'How do I pray when traveling?'}">
      <div class="sug-top"><div class="sug-ic g"><i class="ri-building-line"></i></div><i class="ri-arrow-right-up-line sug-arr"></i></div>
      <div class="sug-t">${isAr ? 'صلاة المسافر' : "Traveler's Prayer"}</div>
      <div class="sug-d">${isAr ? 'كيف أصلي أثناء السفر؟' : 'How do I pray when traveling?'}</div>
    </div>
    <div class="sug rv rv-d2" data-q="${isAr ? 'ما معنى سورة الكهف؟' : 'What is the meaning of Surah Al-Kahf?'}">
      <div class="sug-top"><div class="sug-ic a"><i class="ri-book-open-line"></i></div><i class="ri-arrow-right-up-line sug-arr"></i></div>
      <div class="sug-t">${isAr ? 'سورة الكهف' : 'Surah Al-Kahf'}</div>
      <div class="sug-d">${isAr ? 'ما معنى سورة الكهف؟' : 'What is the meaning of Surah Al-Kahf?'}</div>
    </div>
    <div class="sug rv rv-d3" data-q="${isAr ? 'ما هو الإسلام؟ مقدمة بسيطة' : 'What is Islam? A simple introduction'}">
      <div class="sug-top"><div class="sug-ic g"><i class="ri-question-line"></i></div><i class="ri-arrow-right-up-line sug-arr"></i></div>
      <div class="sug-t">${isAr ? 'ما هو الإسلام؟' : 'What is Islam?'}</div>
      <div class="sug-d">${isAr ? 'مقدمة بسيطة للجميع' : 'A simple introduction for everyone'}</div>
    </div>
    <div class="sug rv rv-d4" data-q="${isAr ? 'هل الدفع ببطاقة الائتمان جائز؟' : 'Is paying with a credit card permissible?'}">
      <div class="sug-top"><div class="sug-ic a"><i class="ri-scales-3-line"></i></div><i class="ri-arrow-right-up-line sug-arr"></i></div>
      <div class="sug-t">${isAr ? 'بطاقات الائتمان' : 'Credit Cards'}</div>
      <div class="sug-d">${isAr ? 'هل الدفع ببطاقة الائتمان جائز؟' : 'Is paying with a credit card permissible?'}</div>
    </div>
  </div>

  <div class="chat" id="chatArea"></div>

  <div class="src-strip">
    <span class="src-strip-lbl">${isAr ? 'مصادر' : 'Sources'}</span>
    <a href="https://sunnah.com" target="_blank" class="src-chip"><span class="src-chip-dot"></span>Sunnah.com</a>
    <a href="https://islamqa.info" target="_blank" class="src-chip"><span class="src-chip-dot"></span>IslamQA</a>
    <a href="https://islamweb.net" target="_blank" class="src-chip"><span class="src-chip-dot"></span>IslamWeb</a>
    <a href="https://binbaz.org.sa" target="_blank" class="src-chip"><span class="src-chip-dot"></span>Bin Baz</a>
    <a href="https://dorar.net" target="_blank" class="src-chip"><span class="src-chip-dot"></span>Dorar.net</a>
    <a href="https://kalamullah.com" target="_blank" class="src-chip"><span class="src-chip-dot"></span>Kalamullah</a>
  </div>

  <div class="inp-wrap">
    <div class="inp-bar">
      <input type="text" id="qInput"
        placeholder="${isAr ? 'اسأل سؤالاً إسلامياً...' : 'Ask an Islamic question...'}"
        onkeydown="if(event.key==='Enter')window.sendMsg()">
      <button class="send" id="sendBtn" onclick="window.sendMsg()">
        <i class="ri-send-plane-2-fill"></i>
      </button>
    </div>
    <div class="inp-note">
      <i class="ri-shield-check-line"></i>
      ${isAr ? 'يستشهد بالعلماء — لا يصدر فتاوى. يشمل جميع المذاهب.' : 'References scholars — does not issue fatwas. Covers all madhahib.'}
    </div>
  </div>
</div>`;
  },

  init(lang) {
    // Wire suggestion clicks
    document.querySelectorAll('.sug').forEach(sug => {
      sug.addEventListener('click', () => {
        const q = sug.dataset.q;
        if (q) { document.getElementById('qInput').value = q; sendMsg(lang); }
      });
    });

    // Expose sendMsg globally
    window.sendMsg = () => sendMsg(lang);
  },

  destroy() {
    isProcessing = false;
  }
};

// ── Chat Functions ──
function addMsg(role, text, srcs, lang) {
  const area = document.getElementById('chatArea');
  if (!area) return;
  const d = document.createElement('div');
  d.className = `msg ${role}`;
  let suffix = '';
  if (role === 'assistant' && srcs?.length > 0) {
    suffix = '<div class="src-tags">' + srcs.map(x => {
      const url = SOURCE_URLS[x] || '#';
      return `<a href="${url}" target="_blank" rel="noopener" class="src-t"><i class="ri-link"></i>${x}<i class="ri-external-link-line" style="font-size:11px;opacity:0.7"></i></a>`;
    }).join('') + '</div>';
  }
  if (role === 'assistant') suffix += (lang === 'ar' ? disclaimerAR : disclaimerEN);
  const av = role === 'user'
    ? '<i class="ri-user-3-fill"></i>'
    : '<img src="./favicon.png" alt="Noor" style="width:20px;height:20px;object-fit:contain;">';
  d.innerHTML = `<div class="msg-av">${av}</div><div class="msg-body">${text}${suffix}</div>`;
  area.appendChild(d);
  d.scrollIntoView({ behavior: 'smooth', block: 'end' });
}

function showTyping() {
  const area = document.getElementById('chatArea');
  if (!area) return;
  const d = document.createElement('div');
  d.className = 'msg assistant';
  d.id = 'typI';
  d.innerHTML = `<div class="msg-av"><img src="./favicon.png" alt="Noor" style="width:20px;height:20px;object-fit:contain;"></div><div class="msg-body"><div class="typ"><span></span><span></span><span></span></div></div>`;
  area.appendChild(d);
  d.scrollIntoView({ behavior: 'smooth', block: 'end' });
}

function hideTyping() { document.getElementById('typI')?.remove(); }

async function sendMsg(lang) {
  if (isProcessing) return;
  const input = document.getElementById('qInput');
  const text = input?.value.trim();
  if (!text) return;

  // Hide hero and suggestions
  document.getElementById('hero')?.classList.add('hidden');
  document.getElementById('sugs')?.classList.add('hidden');

  addMsg('user', text, [], lang);
  input.value = '';

  if (isManip(text)) {
    showTyping();
    setTimeout(() => { hideTyping(); addMsg('assistant', lang === 'ar' ? MANIP_AR : MANIP_EN, [], lang); }, 800);
    return;
  }

  isProcessing = true;
  const sendBtn = document.getElementById('sendBtn');
  if (sendBtn) sendBtn.disabled = true;
  showTyping();

  try {
    const resp = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: text })
    });
    const data = await resp.json();
    hideTyping();

    if (data.error) {
      const typeMap = { RATE_LIMIT: 'RATE_LIMIT', API_KEY_INVALID: 'API_KEY', SAFETY_BLOCKED: 'DEFAULT', EMPTY_RESPONSE: 'DEFAULT' };
      const type = typeMap[data.error] || 'DEFAULT';
      addMsg('assistant', (ERRS[lang] || ERRS.en)[type] || ERRS.en.DEFAULT, [], lang);
      return;
    }

    const { text: cleaned, explicitSources } = extractSourcesLine(data.response);
    const formatted = formatResponse(cleaned);
    const detected = detectSources(data.response);
    const allSrcs = [...new Set([...explicitSources, ...detected])].slice(0, 6);
    addMsg('assistant', formatted, allSrcs, lang);

  } catch (err) {
    hideTyping();
    const type = err.message?.includes('Failed to fetch') ? 'NETWORK' : 'DEFAULT';
    addMsg('assistant', (ERRS[lang] || ERRS.en)[type], [], lang);
  } finally {
    isProcessing = false;
    const btn = document.getElementById('sendBtn');
    if (btn) btn.disabled = false;
  }
}

// ── askCat: called from categories page ──
export function askCat(cat, lang) {
  window.goTo('home');
  setTimeout(() => {
    const questions = {
      en: { prayer:'What are the rules of the five daily prayers?', quran:'Tell me about the Quran — its meaning and virtues', hadith:'What is the science of Hadith?', fiqh:'Explain the four madhahib in Islamic jurisprudence', dua:'What are the most important daily duas from the Sunnah?', seerah:'Tell me about the life of Prophet Muhammad ﷺ', intro:'What is Islam? Explain it simply', finance:'What are the principles of Islamic finance?' },
      ar: { prayer:'ما هي أحكام الصلوات الخمس؟', quran:'أخبرني عن القرآن الكريم', hadith:'ما هو علم الحديث؟', fiqh:'اشرح المذاهب الأربعة', dua:'ما هي أهم الأدعية اليومية من السنة؟', seerah:'أخبرني عن حياة النبي محمد ﷺ', intro:'ما هو الإسلام؟', finance:'ما هي مبادئ التمويل الإسلامي؟' }
    };
    const q = (questions[lang] || questions.en)[cat] || '';
    const input = document.getElementById('qInput');
    if (input && q) { input.value = q; sendMsg(lang); }
  }, 400);
}

export default Home;
