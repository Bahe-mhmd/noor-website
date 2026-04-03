// ═══════════════════════════════════════════════════
// NOOR — pages/prayer.js: Prayer Times & Qibla
// ═══════════════════════════════════════════════════
import { PRAYER_NAMES_EN, PRAYER_NAMES_AR, PRAYER_ICONS } from '../config.js';

let prayerTimesData = null;
let userLat = null, userLng = null;
let countdownInterval = null;
let sidebarInterval = null;

function calcQibla(lat, lng) {
  const kLat = 21.4225 * Math.PI/180, kLng = 39.8262 * Math.PI/180;
  const uLat = lat * Math.PI/180, uLng = lng * Math.PI/180;
  const d = kLng - uLng;
  const x = Math.sin(d);
  const y = Math.cos(uLat) * Math.tan(kLat) - Math.sin(uLat) * Math.cos(d);
  return ((Math.atan2(x, y) * 180 / Math.PI) + 360) % 360;
}

function gregorianToHijri(gd) {
  const jd = Math.floor((1461*(gd.getFullYear()+4800+Math.floor((gd.getMonth()-13)/12)))/4)+Math.floor((367*(gd.getMonth()-1-12*Math.floor((gd.getMonth()-13)/12)))/12)-Math.floor((3*Math.floor((gd.getFullYear()+4900+Math.floor((gd.getMonth()-13)/12))/100))/4)+gd.getDate()-32075;
  const l=jd-1948440+10632,n=Math.floor((l-1)/10631),ll=l-10631*n+354;
  const j=Math.floor((10985-ll)/5316)*Math.floor((50*ll)/17719)+Math.floor(ll/5670)*Math.floor((43*ll)/15238);
  const lo=ll-Math.floor((30-j)/15)*Math.floor((17719*j)/50)-Math.floor(j/16)*Math.floor((15238*j)/43)+29;
  const m=Math.floor((24*lo)/709),d2=lo-Math.floor((709*m)/24),y=30*n+j-30;
  return {day:d2,month:m,year:y};
}

async function fetchPrayer(lang) {
  try {
    const pos = await new Promise((res, rej) => navigator.geolocation.getCurrentPosition(res, rej, {timeout:10000}));
    userLat = pos.coords.latitude; userLng = pos.coords.longitude;
  } catch(e) { userLat = 21.4225; userLng = 39.8262; }

  const method = document.getElementById('ptMethod')?.value || 3;
  try {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2,'0'), mm = String(today.getMonth()+1).padStart(2,'0'), yyyy = today.getFullYear();
    const r = await fetch(`https://api.aladhan.com/v1/timings/${dd}-${mm}-${yyyy}?latitude=${userLat}&longitude=${userLng}&method=${method}`);
    const d = await r.json();
    const t = d.data.timings;
    prayerTimesData = { Fajr:t.Fajr, Sunrise:t.Sunrise, Dhuhr:t.Dhuhr, Asr:t.Asr, Maghrib:t.Maghrib, Isha:t.Isha };

    const hijri = d.data.date.hijri;
    const hijriEl = document.getElementById('ptHijri');
    if (hijriEl) hijriEl.innerHTML = `<b>${hijri.day} ${hijri.month.en} ${hijri.year}</b> — ${hijri.month.ar}`;

    renderCards(lang);
    updateCountdown(lang);

    const qiblaAngle = calcQibla(userLat, userLng);
    const arrow = document.getElementById('qiblaArrow');
    const label = document.getElementById('qiblaLabel');
    if (arrow) arrow.style.transform = `rotate(${qiblaAngle}deg)`;
    if (label) label.textContent = `${Math.round(qiblaAngle)}° from North`;

    // Show sidebar widget
    const widget = document.getElementById('sbPrayerWidget');
    if (widget) widget.style.display = '';
    updateSidebar(lang);
  } catch(e) { console.error('Prayer API error:', e); }
}

function renderCards(lang) {
  if (!prayerTimesData) return;
  const keys = Object.keys(prayerTimesData);
  const names = lang === 'ar' ? PRAYER_NAMES_AR : PRAYER_NAMES_EN;
  const now = new Date();
  let nextIdx = -1;
  keys.forEach((k, i) => {
    const [h, m] = prayerTimesData[k].split(':').map(Number);
    const pt = new Date(); pt.setHours(h, m, 0, 0);
    if (nextIdx === -1 && pt > now) nextIdx = i;
  });
  if (nextIdx === -1) nextIdx = 0;
  const grid = document.getElementById('ptGrid');
  if (!grid) return;
  grid.innerHTML = keys.map((k, i) => {
    const cls = i === nextIdx ? 'active' : (i < nextIdx ? 'passed' : '');
    const [h, m] = prayerTimesData[k].split(':').map(Number);
    const ampm = h >= 12 ? 'PM' : 'AM', h12 = h%12||12;
    return `<div class="pt-card ${cls}"><div class="pt-card-icon"><i class="${PRAYER_ICONS[i]}"></i></div><div class="pt-card-name">${names[i]}</div><div class="pt-card-time">${h12}:${String(m).padStart(2,'0')} ${ampm}</div></div>`;
  }).join('');
}

function updateCountdown(lang) {
  if (!prayerTimesData) return;
  const now = new Date();
  const keys = Object.keys(prayerTimesData);
  const names = lang === 'ar' ? PRAYER_NAMES_AR : PRAYER_NAMES_EN;
  let nextIdx = -1, nextTime = null, prevTime = null;
  keys.forEach((k, i) => {
    const [h, m] = prayerTimesData[k].split(':').map(Number);
    const pt = new Date(); pt.setHours(h, m, 0, 0);
    if (nextIdx === -1 && pt > now) { nextIdx = i; nextTime = pt; }
    if (pt <= now) prevTime = pt;
  });
  if (nextIdx === -1) {
    nextIdx = 0;
    const [h, m] = prayerTimesData[keys[0]].split(':').map(Number);
    nextTime = new Date(); nextTime.setDate(nextTime.getDate()+1); nextTime.setHours(h, m, 0, 0);
  }
  const diff = nextTime - now;
  const hrs = Math.floor(diff/3600000), mins = Math.floor((diff%3600000)/60000), secs = Math.floor((diff%60000)/1000);
  const cd = `${String(hrs).padStart(2,'0')}:${String(mins).padStart(2,'0')}:${String(secs).padStart(2,'0')}`;
  const nameEl = document.getElementById('ptNextName');
  const cdEl = document.getElementById('ptNextCd');
  if (nameEl) nameEl.textContent = names[nextIdx];
  if (cdEl) cdEl.textContent = cd;
  if (prevTime) {
    const total = nextTime - prevTime, elapsed = now - prevTime;
    const pct = Math.min(100, Math.max(0, (elapsed/total)*100));
    const bar = document.getElementById('ptBarFill');
    if (bar) bar.style.width = pct + '%';
  }
  updateSidebar(lang, names[nextIdx], cd);
  renderCards(lang);
}

function updateSidebar(lang, name, cd) {
  const sbName = document.getElementById('sbPrName');
  const sbCd = document.getElementById('sbPrCd');
  if (name && sbName) sbName.textContent = name;
  if (cd && sbCd) sbCd.textContent = cd;
}

const Prayer = {
  render(lang) {
    const isAr = lang === 'ar';
    return `
<div class="pg-hd">
  <div class="pg-hd-ic"><i class="ri-time-fill"></i></div>
  <h1>${isAr ? 'مواقيت الصلاة' : 'Prayer Times'}</h1>
  <p>${isAr ? 'أوقات الصلاة الدقيقة بناءً على موقعك الجغرافي.' : 'Accurate prayer times based on your location.'}</p>
</div>
<div class="pg-body">
  <div class="pt-next rv">
    <h3>${isAr ? 'الصلاة القادمة' : 'Next Prayer'}</h3>
    <div class="pt-name" id="ptNextName">Loading...</div>
    <div class="pt-countdown" id="ptNextCd">--:--:--</div>
    <div class="pt-bar"><div class="pt-bar-fill" id="ptBarFill" style="width:0%"></div></div>
  </div>
  <div class="pt-hijri rv rv-d1" id="ptHijri">${isAr ? 'جار التحميل...' : 'Loading Hijri date...'}</div>
  <div class="pt-grid rv rv-d2" id="ptGrid">
    ${PRAYER_NAMES_EN.map(n => `<div class="pt-card"><div class="pt-card-name">${n}</div><div class="pt-card-time">--:--</div></div>`).join('')}
  </div>
  <div class="pt-method rv rv-d3">
    <select id="ptMethod" onchange="window.reloadPrayer()">
      <option value="1">Muslim World League</option>
      <option value="2">Islamic Society of North America</option>
      <option value="3" selected>Egyptian General Authority</option>
      <option value="4">Umm Al-Qura University, Makkah</option>
      <option value="5">University of Islamic Sciences, Karachi</option>
    </select>
  </div>
  <div class="pt-qibla rv rv-d4">
    <h3>${isAr ? 'اتجاه القبلة' : 'Qibla Direction'}</h3>
    <div class="qibla-compass">
      <div class="qibla-arrow" id="qiblaArrow">🕋</div>
    </div>
    <div class="qibla-label" id="qiblaLabel">${isAr ? 'جار الحساب...' : 'Calculating...'}</div>
  </div>
</div>
<footer class="ft"><i class="ri-heart-fill"></i> ${isAr ? 'صُنع للأمة' : 'Built for the Ummah'}</footer>`;
  },

  init(lang) {
    clearInterval(countdownInterval);
    fetchPrayer(lang).then(() => {
      countdownInterval = setInterval(() => updateCountdown(lang), 1000);
    });
    window.reloadPrayer = () => { clearInterval(countdownInterval); fetchPrayer(lang).then(() => { countdownInterval = setInterval(() => updateCountdown(lang), 1000); }); };
  },

  destroy() {
    clearInterval(countdownInterval);
    delete window.reloadPrayer;
  },

  // Called from app.js on boot to initialize sidebar widget
  initSidebarWidget() {
    clearInterval(sidebarInterval);
    fetchPrayer('en').then(() => {
      sidebarInterval = setInterval(() => {
        if (!prayerTimesData) return;
        updateCountdown('en');
      }, 1000);
    });
  }
};

export default Prayer;
