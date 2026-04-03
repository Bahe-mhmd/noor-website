// ═══════════════════════════════════════════════════
// NOOR — pages/categories.js
// ═══════════════════════════════════════════════════

const Categories = {
  render(lang) {
    const isAr = lang === 'ar';
    const cats = [
      { id:'prayer', icon:'ri-building-line', cls:'c1', en:'Prayer', ar:'الصلاة', sub_en:'Salah · Times · Rules', sub_ar:'الصلاة · المواقيت · الأحكام' },
      { id:'quran', icon:'ri-book-open-line', cls:'c2', en:'Quran', ar:'القرآن', sub_en:'Tafseer · Recitation', sub_ar:'التفسير · التلاوة' },
      { id:'hadith', icon:'ri-file-text-line', cls:'c3', en:'Hadith', ar:'الحديث', sub_en:'Prophetic Traditions', sub_ar:'الأحاديث النبوية' },
      { id:'fiqh', icon:'ri-scales-3-line', cls:'c4', en:'Fiqh', ar:'الفقه', sub_en:'All Four Madhahib', sub_ar:'المذاهب الأربعة' },
      { id:'dua', icon:'ri-hand-heart-line', cls:'c5', en:'Duas', ar:'الأدعية', sub_en:'Supplications · Adhkar', sub_ar:'الأدعية · الأذكار' },
      { id:'seerah', icon:'ri-moon-line', cls:'c6', en:'Seerah', ar:'السيرة', sub_en:"Prophet's Life ﷺ", sub_ar:'حياة النبي ﷺ' },
      { id:'intro', icon:'ri-question-line', cls:'c7', en:'New to Islam', ar:'جديد في الإسلام', sub_en:'Learn the Basics', sub_ar:'تعلّم الأساسيات' },
      { id:'finance', icon:'ri-money-dollar-circle-line', cls:'c8', en:'Finance', ar:'المالية', sub_en:'Halal · Zakat · Riba', sub_ar:'حلال · زكاة · ربا' },
    ];
    return `
<div class="pg-hd">
  <div class="pg-hd-ic"><i class="ri-apps-2-fill"></i></div>
  <h1>${isAr ? 'تصفح الأقسام' : 'Browse Categories'}</h1>
  <p>${isAr ? 'استكشف المعرفة الإسلامية حسب الموضوع مع آراء علمية متعددة من جميع المذاهب.' : 'Explore Islamic knowledge by topic with multiple scholarly views across all madhahib.'}</p>
</div>
<div class="pg-body">
  <div class="cat-grid">
    ${cats.map((c, i) => `
    <div class="cat rv${i>0?` rv-d${Math.min(i,7)}`:''}" data-cat="${c.id}">
      <div class="cat-ic ${c.cls}"><i class="${c.icon}"></i></div>
      <div class="cat-nm">${isAr ? c.ar : c.en}</div>
      <div class="cat-sub">${isAr ? c.sub_ar : c.sub_en}</div>
    </div>`).join('')}
  </div>
</div>
<footer class="ft"><i class="ri-heart-fill"></i> ${isAr ? 'صُنع للأمة ولكل الباحثين عن الحق' : 'Built for the Ummah & all seekers of truth'}</footer>`;
  },

  init(lang) {
    document.querySelectorAll('.cat').forEach(el => {
      el.addEventListener('click', () => {
        const cat = el.dataset.cat;
        import('./home.js').then(m => m.askCat(cat, lang));
      });
    });
  }
};

export default Categories;
