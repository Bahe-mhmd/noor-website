// ═══════════════════════════════════════════════════
// NOOR — pages/ramadan.js: Ramadan Tracker
// ═══════════════════════════════════════════════════
import { t } from '../i18n.js';

// Approximate Hijri calculator
function gregorianToHijri(date) {
  const jd = Math.floor((1461*(date.getFullYear()+4800+Math.floor((date.getMonth()-13)/12)))/4)
    + Math.floor((367*(date.getMonth()-1-12*Math.floor((date.getMonth()-13)/12)))/12)
    - Math.floor((3*Math.floor((date.getFullYear()+4900+Math.floor((date.getMonth()-13)/12))/100))/4)
    + date.getDate() - 32075;
  const l=jd-1948440+10632, n=Math.floor((l-1)/10631), ll=l-10631*n+354;
  const j=Math.floor((10985-ll)/5316)*Math.floor((50*ll)/17719)+Math.floor(ll/5670)*Math.floor((43*ll)/15238);
  const lo=ll-Math.floor((30-j)/15)*Math.floor((17719*j)/50)-Math.floor(j/16)*Math.floor((15238*j)/43)+29;
  const m=Math.floor((24*lo)/709), d=lo-Math.floor((709*m)/24), y=30*n+j-30;
  return { day:d, month:m, year:y };
}

// Get fasting log from localStorage
function getFastingLog() {
  try { return JSON.parse(localStorage.getItem('noor_fasting_log') || '{}'); }
  catch(e) { return {}; }
}

function saveFastingLog(log) {
  try { localStorage.setItem('noor_fasting_log', JSON.stringify(log)); }
  catch(e) {}
}

function getTodayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;
}

let _lang = 'en';
let prayerTimesData = null;

async function fetchTimes() {
  try {
    const pos = await new Promise((res,rej) => navigator.geolocation.getCurrentPosition(res,rej,{timeout:8000}));
    const lat = pos.coords.latitude, lng = pos.coords.longitude;
    const d = new Date();
    const dd = String(d.getDate()).padStart(2,'0'), mm = String(d.getMonth()+1).padStart(2,'0'), yyyy = d.getFullYear();
    const r = await fetch(`https://api.aladhan.com/v1/timings/${dd}-${mm}-${yyyy}?latitude=${lat}&longitude=${lng}&method=3`);
    const data = await r.json();
    prayerTimesData = data.data.timings;
    renderTimes();
  } catch(e) {
    const sEl = document.getElementById('rmSuhoor');
    const iEl = document.getElementById('rmIftar');
    if (sEl) sEl.textContent = '--:--';
    if (iEl) iEl.textContent = '--:--';
  }
}

function renderTimes() {
  if (!prayerTimesData) return;
  const fajr = prayerTimesData.Fajr, maghrib = prayerTimesData.Maghrib;
  const fmt = time => {
    const [h, m] = time.split(':').map(Number);
    const ampm = h >= 12 ? 'PM' : 'AM', h12 = h%12||12;
    return `${h12}:${String(m).padStart(2,'0')} ${ampm}`;
  };
  const sEl = document.getElementById('rmSuhoor');
  const iEl = document.getElementById('rmIftar');
  if (sEl) sEl.textContent = fmt(fajr);
  if (iEl) iEl.textContent = fmt(maghrib);
}

function getRamadanStatus() {
  const today = new Date();
  const hijri = gregorianToHijri(today);

  // Ramadan is month 9
  if (hijri.month === 9) {
    return { status: 'active', day: hijri.day, year: hijri.year };
  }

  // Calculate days until next Ramadan
  // Find approximate date of next Ramadan 1st
  // Hijri year is ~354 days. Approximate next Ramadan start.
  let daysUntil = 0;
  for (let i = 1; i <= 365; i++) {
    const future = new Date(today);
    future.setDate(today.getDate() + i);
    const h = gregorianToHijri(future);
    if (h.month === 9 && h.day === 1) {
      daysUntil = i;
      break;
    }
  }
  return { status: 'countdown', daysUntil, year: hijri.year };
}

function logFasting(fasted) {
  const log = getFastingLog();
  const key = getTodayKey();
  log[key] = fasted;
  saveFastingLog(log);
  renderFastingLog();
  updateLogButtons();
}

function renderFastingLog() {
  const log = getFastingLog();
  const status = getRamadanStatus();
  if (status.status !== 'active') return;

  // Count fasted days this Ramadan
  const fastedCount = Object.values(log).filter(v => v === true).length;
  const totalLogged = Object.values(log).length;
  const el = document.getElementById('rmFastedCount');
  if (el) el.textContent = `${fastedCount} / ${totalLogged}`;

  // Render mini calendar (up to today's day in Ramadan)
  const calEl = document.getElementById('rmCal');
  if (!calEl || !status.day) return;
  let html = '';
  for (let d = 1; d <= status.day; d++) {
    const dateKey = getDayKey(d, status.year);
    const v = log[dateKey];
    const cls = v === true ? 'fasted' : v === false ? 'not-fasted' : 'unlogged';
    html += `<div class="rm-day ${cls}" title="${t('ramadan.day_of', _lang)} ${d}">
      <span class="rm-day-num">${d}</span>
      <span class="rm-day-icon">${v === true ? '✅' : v === false ? '❌' : '○'}</span>
    </div>`;
  }
  calEl.innerHTML = html;
}

function getDayKey(ramadanDay, hijriYear) {
  // Approximate — find gregorian date for Ramadan day N
  const today = new Date();
  const hijri = gregorianToHijri(today);
  if (hijri.month === 9) {
    const offset = ramadanDay - hijri.day;
    const d = new Date(today);
    d.setDate(today.getDate() + offset);
    return `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;
  }
  return `ramadan-${hijriYear}-${ramadanDay}`;
}

function updateLogButtons() {
  const log = getFastingLog();
  const key = getTodayKey();
  const todayLogged = log[key];
  const fastedBtn = document.getElementById('rmFastedBtn');
  const notBtn = document.getElementById('rmNotFastedBtn');
  if (fastedBtn) fastedBtn.classList.toggle('active-btn', todayLogged === true);
  if (notBtn) notBtn.classList.toggle('active-btn', todayLogged === false);
}

const Ramadan = {
  render(lang) {
    _lang = lang;
    const status = getRamadanStatus();
    const isAr = lang === 'ar';

    const progressBar = status.status === 'active'
      ? `<div class="rm-progress-wrap">
           <div class="rm-progress-bar">
             <div class="rm-progress-fill" style="width:${Math.round((status.day/30)*100)}%"></div>
           </div>
           <div class="rm-progress-label">${t('ramadan.day_of',lang)} ${status.day} / 30</div>
         </div>`
      : '';

    const countdownCard = status.status === 'countdown'
      ? `<div class="rm-countdown rv">
           <div class="rm-moon">🌙</div>
           <div class="rm-countdown-num">${status.daysUntil}</div>
           <div class="rm-countdown-label">${t('ramadan.countdown', lang)}</div>
         </div>`
      : `<div class="rm-active-banner rv">
           <div class="rm-active-icon">🌙</div>
           <div class="rm-active-text">${t('ramadan.in_progress', lang)}</div>
           ${progressBar}
         </div>`;

    const fastingSection = status.status === 'active' ? `
      <div class="rm-section rv rv-d1">
        <div class="rm-section-title"><i class="ri-calendar-check-line"></i> ${t('ramadan.log', lang)}</div>
        <div class="rm-log-btns">
          <button class="rm-log-btn fasted" id="rmFastedBtn" onclick="window.rmLog(true)">${t('ramadan.fasted_btn', lang)}</button>
          <button class="rm-log-btn not-fasted" id="rmNotFastedBtn" onclick="window.rmLog(false)">${t('ramadan.not_fasted', lang)}</button>
        </div>
        <div class="rm-fasted-count">
          <i class="ri-award-line"></i>
          ${t('ramadan.fasted', lang)}: <strong id="rmFastedCount">0 / 0</strong>
        </div>
        <div class="rm-cal" id="rmCal"></div>
      </div>` : '';

    const last10 = status.status === 'active' && status.day >= 20
      ? `<div class="rm-laylatul rv rv-d3">
           <div class="rm-laylatul-icon">✨</div>
           <div class="rm-laylatul-text">${t('ramadan.laylatul', lang)}</div>
           <div class="rm-laylatul-desc">${t('ramadan.last10', lang)}</div>
         </div>` : '';

    return `
<div class="pg-hd">
  <div class="pg-hd-ic"><i class="ri-moon-fill"></i></div>
  <h1>${t('ramadan.title', lang)}</h1>
  <p>${t('ramadan.desc', lang)}</p>
</div>
<div class="pg-body">
  ${countdownCard}

  <div class="rm-times-row rv rv-d1">
    <div class="rm-time-card suhoor">
      <div class="rm-time-icon">🌅</div>
      <div class="rm-time-label">${t('ramadan.suhoor', lang)}</div>
      <div class="rm-time-val" id="rmSuhoor"><span class="rm-loading">...</span></div>
    </div>
    <div class="rm-time-card iftar">
      <div class="rm-time-icon">🌇</div>
      <div class="rm-time-label">${t('ramadan.iftar', lang)}</div>
      <div class="rm-time-val" id="rmIftar"><span class="rm-loading">...</span></div>
    </div>
  </div>

  ${fastingSection}
  ${last10}

  <div class="rm-dua-section rv rv-d2">
    <div class="rm-section-title"><i class="ri-hand-heart-line"></i> ${isAr ? 'دعاء الإفطار' : 'Iftar Dua'}</div>
    <div class="rm-dua-ar">اللَّهُمَّ لَكَ صُمْتُ وَعَلَى رِزْقِكَ أَفْطَرْتُ</div>
    <div class="rm-dua-trans">Allahumma laka sumtu wa 'ala rizqika aftartu</div>
    <div class="rm-dua-mean">${isAr ? 'اللهم لك صمت وعلى رزقك أفطرت' : 'O Allah, for You I fasted and upon Your provision I break my fast.'}</div>
    <div class="rm-dua-src">Abu Dawud 2358</div>
  </div>
</div>
<footer class="ft"><i class="ri-heart-fill"></i> ${t('common.ummah', lang)}</footer>`;
  },

  init(lang) {
    _lang = lang;
    fetchTimes();
    window.rmLog = (fasted) => { logFasting(fasted); };

    const status = getRamadanStatus();
    if (status.status === 'active') {
      renderFastingLog();
      updateLogButtons();
    }
  },

  destroy() {
    delete window.rmLog;
    prayerTimesData = null;
  }
};

export default Ramadan;
