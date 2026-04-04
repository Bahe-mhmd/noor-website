// ═══════════════════════════════════════════════════
// NOOR — pages/prayer.js  (fixed sidebar time)
// ═══════════════════════════════════════════════════
import { PRAYER_NAMES_EN, PRAYER_NAMES_AR, PRAYER_ICONS } from '../config.js';

let prayerTimesData = null;
let userLat = null, userLng = null;
let countdownInterval = null;

function fmt12(timeStr) {
  const [h, m] = timeStr.split(':').map(Number);
  const ampm = h >= 12 ? 'PM' : 'AM', h12 = h % 12 || 12;
  return `${h12}:${String(m).padStart(2,'0')} ${ampm}`;
}

function calcQibla(lat, lng) {
  const kLat=21.4225*Math.PI/180, kLng=39.8262*Math.PI/180;
  const uLat=lat*Math.PI/180, uLng=lng*Math.PI/180;
  const d=kLng-uLng;
  return ((Math.atan2(Math.sin(d), Math.cos(uLat)*Math.tan(kLat)-Math.sin(uLat)*Math.cos(d))*180/Math.PI)+360)%360;
}

async function fetchPrayer(lang) {
  if (!userLat) {
    try {
      const pos = await new Promise((res,rej) => navigator.geolocation.getCurrentPosition(res,rej,{timeout:8000}));
      userLat = pos.coords.latitude; userLng = pos.coords.longitude;
    } catch(e) { userLat = 21.4225; userLng = 39.8262; }
  }
  const method = document.getElementById('ptMethod')?.value || 3;
  try {
    const today = new Date();
    const dd=String(today.getDate()).padStart(2,'0'), mm=String(today.getMonth()+1).padStart(2,'0'), yyyy=today.getFullYear();
    const r = await fetch(`https://api.aladhan.com/v1/timings/${dd}-${mm}-${yyyy}?latitude=${userLat}&longitude=${userLng}&method=${method}`);
    const d = await r.json();
    const t = d.data.timings;
    prayerTimesData = { Fajr:t.Fajr, Sunrise:t.Sunrise, Dhuhr:t.Dhuhr, Asr:t.Asr, Maghrib:t.Maghrib, Isha:t.Isha };
    const hijri = d.data.date.hijri;
    const el = document.getElementById('ptHijri');
    if (el) el.innerHTML = `<b>${hijri.day} ${hijri.month.en} ${hijri.year}</b> — ${hijri.month.ar}`;
    const qAngle = calcQibla(userLat, userLng);
    const arrow = document.getElementById('qiblaArrow');
    const label = document.getElementById('qiblaLabel');
    if (arrow) arrow.style.transform = `rotate(${qAngle}deg)`;
    if (label) label.textContent = `${Math.round(qAngle)}° from North`;
  } catch(e) { console.error('Prayer fetch error', e); }
}

function getNext() {
  if (!prayerTimesData) return null;
  const keys = Object.keys(prayerTimesData);
  const now = new Date();
  let nextIdx=-1, nextTime=null, prevTime=null;
  keys.forEach((k,i) => {
    const [h,m] = prayerTimesData[k].split(':').map(Number);
    const pt = new Date(); pt.setHours(h,m,0,0);
    if (nextIdx===-1 && pt>now) { nextIdx=i; nextTime=pt; }
    if (pt<=now) prevTime=pt;
  });
  if (nextIdx===-1) {
    nextIdx=0;
    const [h,m] = prayerTimesData[keys[0]].split(':').map(Number);
    nextTime=new Date(); nextTime.setDate(nextTime.getDate()+1); nextTime.setHours(h,m,0,0);
  }
  return { nextIdx, nextTime, prevTime, keys };
}

function updateAll(lang) {
  if (!prayerTimesData) return;
  const info = getNext(); if (!info) return;
  const { nextIdx, nextTime, prevTime, keys } = info;
  const names = lang==='ar' ? PRAYER_NAMES_AR : PRAYER_NAMES_EN;
  const now = new Date();
  const diff = nextTime - now;
  const hrs=Math.floor(diff/3600000), mins=Math.floor((diff%3600000)/60000), secs=Math.floor((diff%60000)/1000);
  const cd = `${String(hrs).padStart(2,'0')}:${String(mins).padStart(2,'0')}:${String(secs).padStart(2,'0')}`;
  const actualTime = fmt12(prayerTimesData[keys[nextIdx]]);

  // Page elements
  const nameEl=document.getElementById('ptNextName'), cdEl=document.getElementById('ptNextCd');
  if (nameEl) nameEl.textContent = names[nextIdx];
  if (cdEl)   cdEl.textContent   = cd;
  if (prevTime) {
    const pct=Math.min(100,Math.max(0,((now-prevTime)/(nextTime-prevTime))*100));
    const bar=document.getElementById('ptBarFill'); if(bar) bar.style.width=pct+'%';
  }

  // Cards
  const grid=document.getElementById('ptGrid');
  if (grid) {
    grid.innerHTML = keys.map((k,i) => {
      const cls = i===nextIdx?'active':(i<nextIdx?'passed':'');
      return `<div class="pt-card ${cls}"><div class="pt-card-icon"><i class="${PRAYER_ICONS[i]}"></i></div><div class="pt-card-name">${names[i]}</div><div class="pt-card-time">${fmt12(prayerTimesData[k])}</div></div>`;
    }).join('');
  }

  // ── SIDEBAR: name + actual time + countdown ──
  const sbName=document.getElementById('sbPrName');
  const sbTime=document.getElementById('sbPrTime');
  const sbCd  =document.getElementById('sbPrCd');
  const widget=document.getElementById('sbPrayerWidget');
  if (sbName) sbName.textContent = names[nextIdx];
  if (sbTime) sbTime.textContent = actualTime;     // ← fixed: shows real time
  if (sbCd)   sbCd.textContent   = cd;
  if (widget)  widget.style.display = '';
}

const Prayer = {
  render(lang) {
    const isAr = lang==='ar';
    return `
<div class="pg-hd">
  <div class="pg-hd-ic"><i class="ri-time-fill"></i></div>
  <h1>${isAr?'مواقيت الصلاة':'Prayer Times'}</h1>
  <p>${isAr?'أوقات الصلاة الدقيقة بناءً على موقعك.':'Accurate prayer times based on your GPS location.'}</p>
</div>
<div class="pg-body">
  <div class="pt-next rv">
    <h3>${isAr?'الصلاة القادمة':'Next Prayer'}</h3>
    <div class="pt-name" id="ptNextName">${isAr?'جار التحميل...':'Loading...'}</div>
    <div class="pt-countdown" id="ptNextCd">--:--:--</div>
    <div class="pt-bar"><div class="pt-bar-fill" id="ptBarFill" style="width:0%"></div></div>
  </div>
  <div class="pt-hijri rv rv-d1" id="ptHijri">${isAr?'جار التحميل...':'Loading Hijri date...'}</div>
  <div class="pt-grid rv rv-d2" id="ptGrid">
    ${PRAYER_NAMES_EN.map(n=>`<div class="pt-card"><div class="pt-card-name">${n}</div><div class="pt-card-time">--:--</div></div>`).join('')}
  </div>
  <div class="pt-method rv rv-d3">
    <select id="ptMethod" onchange="window.reloadPrayer()">
      <option value="1">Muslim World League</option>
      <option value="2">ISNA</option>
      <option value="3" selected>Egyptian General Authority</option>
      <option value="4">Umm Al-Qura, Makkah</option>
      <option value="5">University of Islamic Sciences, Karachi</option>
    </select>
  </div>
  <div class="pt-qibla rv rv-d4">
    <h3>${isAr?'اتجاه القبلة':'Qibla Direction'}</h3>
    <div class="qibla-compass"><div class="qibla-arrow" id="qiblaArrow">🕋</div></div>
    <div class="qibla-label" id="qiblaLabel">${isAr?'جار الحساب...':'Calculating...'}</div>
  </div>
</div>
<footer class="ft"><i class="ri-heart-fill"></i> ${isAr?'صُنع للأمة':'Built for the Ummah'}</footer>`;
  },

  init(lang) {
    clearInterval(countdownInterval);
    fetchPrayer(lang).then(() => {
      updateAll(lang);
      countdownInterval = setInterval(() => updateAll(lang), 1000);
    });
    window.reloadPrayer = () => {
      clearInterval(countdownInterval);
      prayerTimesData = null;
      fetchPrayer(lang).then(() => {
        updateAll(lang);
        countdownInterval = setInterval(() => updateAll(lang), 1000);
      });
    };
  },

  destroy() { clearInterval(countdownInterval); delete window.reloadPrayer; },

  initSidebarWidget() {
    const boot = async () => {
      if (!userLat) {
        try {
          const pos = await new Promise((res,rej)=>navigator.geolocation.getCurrentPosition(res,rej,{timeout:8000}));
          userLat=pos.coords.latitude; userLng=pos.coords.longitude;
        } catch(e) { userLat=21.4225; userLng=39.8262; }
        const today=new Date();
        const dd=String(today.getDate()).padStart(2,'0'), mm=String(today.getMonth()+1).padStart(2,'0'), yyyy=today.getFullYear();
        try {
          const r=await fetch(`https://api.aladhan.com/v1/timings/${dd}-${mm}-${yyyy}?latitude=${userLat}&longitude=${userLng}&method=3`);
          const d=await r.json(); const t=d.data.timings;
          prayerTimesData={Fajr:t.Fajr,Sunrise:t.Sunrise,Dhuhr:t.Dhuhr,Asr:t.Asr,Maghrib:t.Maghrib,Isha:t.Isha};
        } catch(e) {}
      }
      updateAll('en');
    };
    boot();
    setInterval(()=>updateAll('en'), 1000);
  }
};

export default Prayer;
