// ═══════════════════════════════════════════════════
// NOOR — pages/calendar.js: Islamic Calendar
// ═══════════════════════════════════════════════════
import { HIJRI_MONTHS, ISLAMIC_EVENTS } from '../config.js';

function gregorianToHijri(gd) {
  const jd=Math.floor((1461*(gd.getFullYear()+4800+Math.floor((gd.getMonth()-13)/12)))/4)+Math.floor((367*(gd.getMonth()-1-12*Math.floor((gd.getMonth()-13)/12)))/12)-Math.floor((3*Math.floor((gd.getFullYear()+4900+Math.floor((gd.getMonth()-13)/12))/100))/4)+gd.getDate()-32075;
  const l=jd-1948440+10632,n=Math.floor((l-1)/10631),ll=l-10631*n+354;
  const j=Math.floor((10985-ll)/5316)*Math.floor((50*ll)/17719)+Math.floor(ll/5670)*Math.floor((43*ll)/15238);
  const lo=ll-Math.floor((30-j)/15)*Math.floor((17719*j)/50)-Math.floor(j/16)*Math.floor((15238*j)/43)+29;
  const m=Math.floor((24*lo)/709),d=lo-Math.floor((709*m)/24),y=30*n+j-30;
  return {day:d,month:m,year:y};
}

async function loadCalendar(lang) {
  const today = new Date();
  let hijri, currentHMonth = 1;

  try {
    const dd = String(today.getDate()).padStart(2,'0'), mm = String(today.getMonth()+1).padStart(2,'0'), yyyy = today.getFullYear();
    const r = await fetch(`https://api.aladhan.com/v1/gpiToH?date=${dd}-${mm}-${yyyy}`);
    const d = await r.json();
    if (d.code === 200 && d.data?.hijri) {
      hijri = d.data.hijri;
      currentHMonth = parseInt(hijri.month?.number) || 1;
    } else { hijri = null; }
  } catch(e) { hijri = null; }

  const hApprox = gregorianToHijri(today);
  if (!hijri) currentHMonth = hApprox.month;

  const dayEl = document.getElementById('calDay');
  const monthEl = document.getElementById('calMonth');
  const yearEl = document.getElementById('calYear');
  const gregEl = document.getElementById('calGreg');
  const monthsEl = document.getElementById('calMonths');
  const eventsEl = document.getElementById('calEvents');

  if (dayEl) dayEl.textContent = hijri ? hijri.day : hApprox.day;
  if (monthEl) monthEl.textContent = hijri ? (hijri.month.ar || hijri.month.en) : (HIJRI_MONTHS[hApprox.month - 1]?.ar || '');
  if (yearEl) yearEl.textContent = (hijri ? hijri.year : hApprox.year) + ' هـ';
  if (gregEl) gregEl.textContent = today.toLocaleDateString('en-US', { weekday:'long', year:'numeric', month:'long', day:'numeric' });
  if (monthsEl) monthsEl.innerHTML = HIJRI_MONTHS.map(m => `
    <div class="cal-month${m.num === currentHMonth ? ' current' : ''}">
      <div class="cal-m-num">${m.num}</div>
      <div class="cal-m-ar">${m.ar}</div>
      <div class="cal-m-en">${m.en}</div>
    </div>`).join('');
  if (eventsEl) eventsEl.innerHTML = ISLAMIC_EVENTS.map(e => `
    <div class="cal-event">
      <div class="cal-event-ic"><i class="${e.icon}"></i></div>
      <div>
        <h4>${lang === 'ar' ? e.name_ar : e.name_en}</h4>
        <p>${HIJRI_MONTHS[e.month-1]?.en || ''} ${e.day}</p>
      </div>
    </div>`).join('');
}

const Calendar = {
  render(lang) {
    const isAr = lang === 'ar';
    return `
<div class="pg-hd">
  <div class="pg-hd-ic"><i class="ri-calendar-fill"></i></div>
  <h1>${isAr ? 'التقويم الهجري' : 'Islamic Calendar'}</h1>
  <p>${isAr ? 'التاريخ الهجري اليوم والأحداث الإسلامية.' : "Today's Hijri date, Islamic events, and all 12 Hijri months."}</p>
</div>
<div class="pg-body">
  <div class="cal-today rv">
    <div class="cal-hijri-day" id="calDay">—</div>
    <div class="cal-hijri-month" id="calMonth">—</div>
    <div class="cal-hijri-year" id="calYear">—</div>
    <div class="cal-greg" id="calGreg">—</div>
  </div>
  <div class="section-label rv rv-d1">${isAr ? 'الأحداث الإسلامية' : 'Islamic Events'}</div>
  <div class="cal-events rv rv-d2" id="calEvents"></div>
  <div class="section-label rv rv-d3">${isAr ? 'الأشهر الهجرية' : 'Hijri Months'}</div>
  <div class="cal-months rv rv-d4" id="calMonths"></div>
</div>
<footer class="ft"><i class="ri-heart-fill"></i> ${isAr ? 'صُنع للأمة' : 'Built for the Ummah'}</footer>`;
  },

  init(lang) { loadCalendar(lang); }
};

export default Calendar;
