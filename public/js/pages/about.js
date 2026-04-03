// ═══════════════════════════════════════════════════
// NOOR — pages/about.js: About Noor
// ═══════════════════════════════════════════════════

const About = {
  render(lang) {
    const isAr = lang === 'ar';
    const features = [
      { icon:'ri-shield-check-fill', cls:'a1', en:'Source-Verified', ar:'مصادر موثّقة', desc_en:'Every answer backed by specific scholars and books', desc_ar:'كل إجابة مدعومة بعلماء وكتب محددة' },
      { icon:'ri-scales-3-fill', cls:'a2', en:'Multi-Madhab', ar:'تعدد المذاهب', desc_en:'Presents all four madhahib when scholars differ', desc_ar:'يعرض المذاهب الأربعة عند اختلاف العلماء' },
      { icon:'ri-translate-2', cls:'a3', en:'Bilingual', ar:'ثنائي اللغة', desc_en:'Full Arabic & English support', desc_ar:'دعم كامل للعربية والإنجليزية' },
      { icon:'ri-robot-fill', cls:'a4', en:'AI-Powered', ar:'مدعوم بالذكاء الاصطناعي', desc_en:'Groq + Llama 3 for scholarly responses', desc_ar:'Groq + Llama 3 للردود العلمية' },
      { icon:'ri-tools-fill', cls:'a5', en:'8+ Islamic Tools', ar:'+8 أدوات إسلامية', desc_en:'Prayer, Quran, Zakat, Tasbih and more', desc_ar:'صلاة، قرآن، زكاة، تسبيح والمزيد' },
    ];
    const audience = [
      { icon:'ri-user-heart-fill', color:'var(--emerald-600)', en:'For Muslims', ar:'للمسلمين', desc_en:'Find rulings on everyday fiqh questions, duas, and Islamic practices.', desc_ar:'ابحث عن أحكام الفقه اليومي والأدعية والممارسات الإسلامية.' },
      { icon:'ri-earth-fill', color:'var(--gold-600)', en:'For Non-Muslims', ar:'لغير المسلمين', desc_en:'Learn about Islam with patience, respect, and verified information.', desc_ar:'تعلّم عن الإسلام بصبر واحترام ومعلومات موثّقة.' },
    ];
    return `
<div class="pg-hd">
  <div class="pg-hd-ic"><i class="ri-lightbulb-fill"></i></div>
  <h1>${isAr ? 'عن نور' : 'About Noor'}</h1>
  <p>${isAr ? 'مساعد المعرفة الإسلامية — بالنور نهتدي.' : 'Your Islamic Knowledge Assistant — guided by light.'}</p>
</div>
<div class="pg-body">
  <div class="mission rv">
    <h2>${isAr ? 'مهمتنا' : 'Our Mission'}</h2>
    <p>${isAr
      ? 'نور (نور) مُصمَّم لمساعدة الجميع — المسلمين وغير المسلمين — على الوصول إلى المعرفة الإسلامية الأصيلة بسهولة. كل إجابة مبنية على مصادر موثّقة من العلماء.'
      : 'Noor (نور — meaning Light) is designed to help everyone — Muslims and non-Muslims — access authentic Islamic knowledge easily. Every answer is built on verified scholarly sources, never invented opinions.'
    }</p>
  </div>

  <div class="section-label rv">${isAr ? 'لمن هو نور؟' : 'Who is Noor for?'}</div>
  <div class="audience-grid rv rv-d1">
    ${audience.map(a => `
      <div class="audience-card">
        <i class="${a.icon}" style="color:${a.color}"></i>
        <h3>${isAr ? a.ar : a.en}</h3>
        <p>${isAr ? a.desc_ar : a.desc_en}</p>
      </div>`).join('')}
  </div>

  <div class="section-label rv rv-d2">${isAr ? 'المميزات الرئيسية' : 'Key Features'}</div>
  <div class="ab-grid rv rv-d3">
    ${features.map(f => `
      <div class="ab-card">
        <div class="ab-ic ${f.cls}"><i class="${f.icon}"></i></div>
        <h3>${isAr ? f.ar : f.en}</h3>
        <p>${isAr ? f.desc_ar : f.desc_en}</p>
      </div>`).join('')}
  </div>

  <div class="trust rv rv-d4">
    <div class="trust-ic"><i class="ri-information-fill"></i></div>
    <div>
      <h3>${isAr ? 'تنبيه مهم' : 'Important Notice'}</h3>
      <p>${isAr
        ? 'نور مساعد مرجعي وليس مفتياً. لا يُصدر فتاوى ملزمة. دائماً استشر عالماً مؤهلاً لأسئلتك الشخصية.'
        : 'Noor is a reference assistant, not a mufti. It does not issue binding fatwas. Always consult a qualified scholar for your personal questions. والله أعلم'
      }</p>
    </div>
  </div>

  <div style="text-align:center;padding:32px 0;color:var(--text-3);font-size:13px;">
    <div style="font-family:var(--font-arabic);font-size:22px;color:var(--gold-500);margin-bottom:8px">نور</div>
    ${isAr ? 'صُنع بمحبة للأمة الإسلامية وكل الباحثين عن الحق' : 'Made with love for the Ummah and all seekers of truth'}
    <div style="margin-top:8px;font-size:12px">v2.0 — Restructured for scale</div>
  </div>
</div>
<footer class="ft"><i class="ri-heart-fill"></i> ${isAr ? 'صُنع للأمة' : 'Built for the Ummah'}</footer>`;
  },

  init() {}
};

export default About;
