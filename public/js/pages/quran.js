// ═══════════════════════════════════════════════════
// NOOR — pages/quran.js  (fixed scroll + added tafsir)
// ═══════════════════════════════════════════════════

let surahsList = [];
let _lang = 'en';

// Brief theme summaries for all 114 surahs
const SURAH_THEMES = {
  1:'The opening prayer of Islam — praising Allah and asking for guidance on the straight path.',
  2:'The longest surah, covering faith, law, stories of earlier prophets, and comprehensive guidance for believers.',
  3:'Family of Imran — discusses the birth of Maryam, Jesus (Isa), and the Battle of Uhud.',
  4:'Women — detailed laws on family, inheritance, marriage, justice, and social relations.',
  5:'The Table Spread — dietary laws, covenants with Allah, stories of Jesus and Moses.',
  6:'Cattle — monotheism, rejecting polytheism, dietary laws, and the signs of Allah in creation.',
  7:'The Heights — stories of Adam, Noah, Hud, Salih, Lot, Shu\'ayb, and Moses.',
  8:'The Spoils of War — lessons from the Battle of Badr, ethics of warfare, and trust in Allah.',
  9:'Repentance — declaring disassociation from treaty-breakers, call to sincere faith, and jihad.',
  10:'Jonah — Allah\'s signs in creation, the story of Yunus, and the nature of divine guidance.',
  11:'Hud — stories of Noah, Hud, Salih, Abraham, Lot, Shu\'ayb, and Moses as warnings and lessons.',
  12:'Joseph — "the best of stories" — a complete narrative of Prophet Yusuf\'s life and patience.',
  13:'Thunder — signs of Allah in nature, the power of divine knowledge, and truth of revelation.',
  14:'Abraham — Ibrahim\'s prayer for Makkah, gratitude, and the nature of disbelief and belief.',
  15:'The Rocky Tract — the people of Thamud, signs of creation, and comfort for the Prophet ﷺ.',
  16:'The Bee — Allah\'s countless blessings, the honey bee, and guidance through creation.',
  17:'The Night Journey — Isra\' of the Prophet ﷺ, commandments, and the Quran as guidance.',
  18:'The Cave — four stories: the Sleepers, the Two Gardens, Moses and Khidr, Dhul-Qarnayn.',
  19:'Mary — stories of Zakariyya, Yahya, and Maryam giving birth to Isa (Jesus).',
  20:'Ta-Ha — the story of Moses in detail, lessons of patience, and remembrance of Allah.',
  21:'The Prophets — mentions of 18 prophets and the universal message of monotheism.',
  22:'The Pilgrimage — Hajj, sacrifice, the Day of Judgement, and spiritual struggle.',
  23:'The Believers — qualities of successful believers, stories of prophets, and resurrection.',
  24:'The Light — laws of modesty, slander, the Light verse (Ayat al-Nur), and social ethics.',
  25:'The Criterion — distinguishing truth from falsehood, qualities of servants of the Most Merciful.',
  26:'The Poets — stories of Moses, Ibrahim, Noah, Hud, Salih, Lot, and Shu\'ayb.',
  27:'The Ant — Solomon and the Queen of Sheba, the miracle of knowledge and prophethood.',
  28:'The Story — Moses\'s life in detail from birth through prophethood.',
  29:'The Spider — the frailty of worldly attachments, stories of earlier prophets, and steadfastness.',
  30:'The Romans — Byzantine victory prophecy, signs in creation, and the nature of time.',
  31:'Luqman — wisdom of Luqman, gratitude, obedience to parents, and trust in Allah.',
  32:'The Prostration — creation of the universe and humans, the Hereafter, and revelation.',
  33:'The Clans — Battle of the Trench, social laws for the Prophet\'s household, hijab.',
  34:'Saba — story of Sheba\'s prosperity and downfall, gratitude, and the reality of wealth.',
  35:'The Originator — Allah as the Creator of all, the diversity of creation, and His mercy.',
  36:'Ya-Sin — the "heart of the Quran" — resurrection, monotheism, and the power of Allah.',
  37:'Those Who Set the Ranks — angels, Ibrahim\'s willingness to sacrifice Ismail, and paradise.',
  38:'Sad — stories of David (Dawud), Solomon (Sulayman), Job (Ayyub), and warnings to disbelievers.',
  39:'The Groups — sincere worship, the Quran as healing, and the gathering on Judgement Day.',
  40:'The Forgiver — Allah\'s forgiveness, the story of the believer among Pharaoh\'s people.',
  41:'Explained in Detail — the Quran as clear guidance, consequences of denying truth.',
  42:'Consultation — Shura (consultation) in governance, Allah\'s mercy, and unity of revelation.',
  43:'Ornaments of Gold — Ibrahim rejecting idolatry, Jesus as a sign, and eternal blessings.',
  44:'The Smoke — warning of divine punishment, the story of Pharaoh, and the Day of Decision.',
  45:'The Crouching — signs of Allah in creation, accountability, and the arrogance of disbelievers.',
  46:'The Wind-Curved Sandhills — Hud and the people of Aad, sincere worship, and patience.',
  47:'Muhammad — jihad, the treatment of prisoners, and the qualities of true believers.',
  48:'The Victory — Treaty of Hudaybiyyah, the great victory (Fath Makkah), and believers\' qualities.',
  49:'The Inner Apartments — etiquette with the Prophet ﷺ, backbiting, and brotherhood.',
  50:'Qaf — the reality of resurrection, the Quran as a reminder, and accountability.',
  51:'The Winnowing Winds — divine promises, stories of Ibrahim and earlier peoples, creation signs.',
  52:'The Mount — the reality of the afterlife, the Quran\'s challenge, and patience.',
  53:'The Star — the Prophet\'s direct vision of revelation, monotheism, and divine authority.',
  54:'The Moon — the splitting of the moon, stories of Nuh and earlier peoples, and warnings.',
  55:'The Most Merciful — the 31 divine blessings repeated: "Which of the favors of your Lord will you deny?"',
  56:'The Inevitable Event — three groups on the Day of Judgement and their destinies.',
  57:'The Iron — spending in Allah\'s cause, the light of faith, and the nature of worldly life.',
  58:'The Pleading Woman — divorce laws (zihar), secret conspiracies, and true friendship.',
  59:'The Exile — expulsion of Banu Nadir, division of spoils, and the names of Allah.',
  60:'She Who Is Tested — loyalty to Allah over family, treatment of believing women migrants.',
  61:'The Row — importance of unity and steadfastness, Jesus\'s prophecy of Muhammad ﷺ.',
  62:'Friday — obligation of Jumu\'ah prayer, not abandoning worship for commerce.',
  63:'The Hypocrites — describing the traits of hypocrites and warning against their behavior.',
  64:'Mutual Disillusion — the Day when truths are revealed, spending for Allah, and trust.',
  65:'Divorce — detailed laws of divorce, waiting periods, and responsibility toward family.',
  66:'The Prohibition — lessons from the Prophet\'s household, obedience to Allah.',
  67:'The Sovereignty — Allah\'s dominion, the purpose of life as a test, and the Hereafter.',
  68:'The Pen — defending the Prophet\'s character, the story of the owners of the garden.',
  69:'The Reality — the Day of Judgement, the fate of earlier civilizations, and the Quran.',
  70:'The Ascending Stairways — patience in adversity, qualities of believers, and the Day of Reckoning.',
  71:'Noah — the complete story of Prophet Nuh\'s centuries-long mission.',
  72:'The Jinn — jinn accepting Islam after hearing the Quran, and monotheism.',
  73:'The Enshrouded One — command for night prayer (Tahajjud) and patience.',
  74:'The Cloaked One — command to warn, the number 19, and accountability.',
  75:'The Resurrection — certainty of resurrection, the dying moments, and Judgement Day.',
  76:'Man — creation of humans, gratitude, the rewards of the righteous, and patience.',
  77:'The Emissaries — a series of reminders about the Day of Judgement and divine warnings.',
  78:'The Great News — the certainty of resurrection and Judgement Day.',
  79:'Those Who Drag Forth — the angels at death, story of Moses and Pharaoh, and resurrection.',
  80:'He Frowned — the Prophet\'s interaction with Ibn Umm Maktum and divine revelation.',
  81:'The Folding Up — vivid description of the Day of Judgement and the Quran\'s truth.',
  82:'The Cleaving — stars falling, heavens splitting, and the Book of Deeds.',
  83:'The Defrauding — warning to those who cheat in weights and measures.',
  84:'The Splitting Asunder — the sky splitting, returning to Allah, and the Hereafter.',
  85:'The Mansions of the Stars — the People of the Ditch, Allah\'s forgiveness and power.',
  86:'The Night Visitant — the piercing star, the Quran as a decisive word.',
  87:'The Most High — glorifying Allah, the Prophet\'s mission, and the afterlife.',
  88:'The Overwhelming Event — the Day of Judgement and the two different fates.',
  89:'The Dawn — lessons from Aad, Thamud, and Pharaoh, and the content soul.',
  90:'The City — the struggles of human life, the two paths, and freeing slaves.',
  91:'The Sun — the story of Thamud and the she-camel, purifying the soul.',
  92:'The Night — two paths: generosity vs stinginess, and working toward righteousness.',
  93:'The Morning Hours — comfort to the Prophet ﷺ: Allah has not forsaken you.',
  94:'The Relief — opening of the chest, with every hardship comes ease.',
  95:'The Fig — the dignity of humans, accountability, and divine justice.',
  96:'The Clot — the first revelation, Allah taught by the pen, and prostration.',
  97:'The Night of Power — Laylatul Qadr is better than a thousand months.',
  98:'The Clear Proof — the People of the Book, mushrikeen, and sincere worship.',
  99:'The Earthquake — the earth shaking on Judgement Day and accountability.',
  100:'The Coursers — the human inclination toward ingratitude and love of wealth.',
  101:'The Calamity — the Day of Judgement and the weighing of deeds.',
  102:'Rivalry in World Increase — the distraction of accumulating wealth until death.',
  103:'Time — humanity is in loss except those who believe, do good, and encourage truth and patience.',
  104:'The Slanderer — destruction of those who slander and hoard wealth.',
  105:'The Elephant — Allah\'s protection of the Kaaba from Abraha\'s army.',
  106:'Quraysh — Allah\'s blessings on the Quraysh and their duty of worship.',
  107:'Small Kindnesses — the one who neglects prayer and refuses small help.',
  108:'Abundance — Allah\'s gift of Kawthar and the command for sacrifice.',
  109:'The Disbelievers — clear declaration: "To you your religion, to me mine."',
  110:'The Divine Support — the coming of Allah\'s help and mass conversions.',
  111:'The Palm Fiber — Abu Lahab and his wife, enemies of the Prophet ﷺ.',
  112:'Sincerity — the purest declaration of Allah\'s absolute Oneness.',
  113:'The Daybreak — seeking refuge in Allah from the evils of creation and darkness.',
  114:'Mankind — seeking refuge in the Lord of mankind from whispering evil.'
};

async function loadSurahs() {
  try {
    const r = await fetch('https://api.alquran.cloud/v1/surah');
    const d = await r.json();
    surahsList = d.data;
    renderSurahs(surahsList, _lang);
  } catch(e) {
    const grid = document.getElementById('qrGrid');
    if (grid) grid.innerHTML = '<p style="color:var(--text-3);padding:20px">Failed to load. Check your connection.</p>';
  }
}

function renderSurahs(list, lang) {
  const grid = document.getElementById('qrGrid');
  if (!grid) return;
  grid.innerHTML = list.map(s => {
    const type = s.revelationType==='Meccan' ? 'Meccan' : 'Medinan';
    const typeAr = s.revelationType==='Meccan' ? 'مكية' : 'مدنية';
    return `<div class="qr-card" data-num="${s.number}">
      <div class="qr-num">${s.number}</div>
      <div class="qr-ar">${s.name}</div>
      <div class="qr-en">${s.englishName}</div>
      <div class="qr-info">${s.numberOfAyahs} ${lang==='ar'?'آية':'verses'} · ${lang==='ar'?typeAr:type}</div>
    </div>`;
  }).join('');
  grid.querySelectorAll('.qr-card').forEach(card => {
    card.addEventListener('click', () => openSurah(parseInt(card.dataset.num), lang));
  });
}

async function openSurah(num, lang) {
  const listEl    = document.getElementById('qrList');
  const readingEl = document.getElementById('qrReading');
  const contentEl = document.getElementById('qrContent');
  if (!listEl || !readingEl || !contentEl) return;

  listEl.classList.add('hide');
  readingEl.classList.add('show');

  // ← FIXED: scroll to TOP of page when surah opens
  window.scrollTo({ top: 0, behavior: 'smooth' });

  contentEl.innerHTML = '<div class="qr-loading"><i class="ri-loader-4-line" style="animation:lSpin 1s linear infinite"></i> Loading surah...</div>';

  try {
    const [arRes, enRes] = await Promise.all([
      fetch(`https://api.alquran.cloud/v1/surah/${num}/ar.alafasy`),
      fetch(`https://api.alquran.cloud/v1/surah/${num}/en.asad`)
    ]);
    const ar = await arRes.json(), en = await enRes.json();
    const arAyahs = ar.data.ayahs, enAyahs = en.data.ayahs;
    const surah = surahsList.find(s => s.number === num);

    // Surah overview header
    const theme = SURAH_THEMES[num] || '';
    let html = `
      <div class="qr-surah-header">
        <div class="qr-surah-name-ar">${ar.data.name}</div>
        <div class="qr-surah-meta">
          <span><i class="ri-map-pin-line"></i> ${ar.data.revelationType}</span>
          <span><i class="ri-list-ordered"></i> ${arAyahs.length} ${lang==='ar'?'آية':'verses'}</span>
        </div>
        ${theme ? `<div class="qr-surah-theme"><i class="ri-lightbulb-line"></i> ${theme}</div>` : ''}
      </div>`;

    if (num !== 1 && num !== 9) {
      html += '<div class="qr-bismillah">بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</div>';
    }

    // Verses with tafsir toggle
    html += arAyahs.map((a, i) => `
      <div class="qr-verse" id="verse-${num}-${a.numberInSurah}">
        <div class="qr-verse-num">${a.numberInSurah}</div>
        <div class="qr-verse-ar">${a.text}</div>
        <div class="qr-verse-en">${enAyahs[i]?.text || ''}</div>
        <button class="qr-tafsir-btn" onclick="window.toggleTafsir(${num}, ${a.numberInSurah}, this)">
          <i class="ri-book-2-line"></i> ${lang==='ar'?'التفسير':'Tafsir'}
        </button>
        <div class="qr-tafsir-content" id="tafsir-${num}-${a.numberInSurah}" style="display:none"></div>
      </div>`).join('');

    contentEl.innerHTML = html;

  } catch(e) {
    contentEl.innerHTML = '<p style="color:var(--text-3);padding:20px">Failed to load surah. Please try again.</p>';
  }
}

async function toggleTafsir(surahNum, ayahNum, btn) {
  const tafsirEl = document.getElementById(`tafsir-${surahNum}-${ayahNum}`);
  if (!tafsirEl) return;

  // Toggle off
  if (tafsirEl.style.display !== 'none') {
    tafsirEl.style.display = 'none';
    btn.innerHTML = `<i class="ri-book-2-line"></i> Tafsir`;
    return;
  }

  // Already loaded
  if (tafsirEl.dataset.loaded) {
    tafsirEl.style.display = 'block';
    btn.innerHTML = `<i class="ri-eye-off-line"></i> Hide`;
    return;
  }

  // Fetch tafsir
  btn.innerHTML = `<i class="ri-loader-4-line" style="animation:lSpin 1s linear infinite"></i> Loading...`;
  btn.disabled = true;

  try {
    const r = await fetch(`https://api.alquran.cloud/v1/ayah/${surahNum}:${ayahNum}/en.maududi`);
    const d = await r.json();
    const text = d.data?.text || '';
    if (text) {
      tafsirEl.innerHTML = `<div class="qr-tafsir-text"><strong>Maududi:</strong> ${text}</div>`;
      tafsirEl.dataset.loaded = '1';
      tafsirEl.style.display = 'block';
      btn.innerHTML = `<i class="ri-eye-off-line"></i> Hide`;
    } else {
      tafsirEl.innerHTML = '<div class="qr-tafsir-text" style="color:var(--text-3)">Tafsir not available for this verse.</div>';
      tafsirEl.dataset.loaded = '1';
      tafsirEl.style.display = 'block';
      btn.innerHTML = `<i class="ri-eye-off-line"></i> Hide`;
    }
  } catch(e) {
    btn.innerHTML = `<i class="ri-book-2-line"></i> Tafsir`;
  }
  btn.disabled = false;
}

function closeSurah() {
  document.getElementById('qrList')?.classList.remove('hide');
  document.getElementById('qrReading')?.classList.remove('show');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function filterSurahs(q, lang) {
  if (!q) { renderSurahs(surahsList, lang); return; }
  const f = surahsList.filter(s =>
    s.englishName.toLowerCase().includes(q.toLowerCase()) ||
    s.name.includes(q) ||
    s.number.toString()===q ||
    s.englishNameTranslation.toLowerCase().includes(q.toLowerCase())
  );
  renderSurahs(f, lang);
}

const Quran = {
  render(lang) {
    _lang = lang;
    const isAr = lang==='ar';
    return `
<div class="pg-hd">
  <div class="pg-hd-ic"><i class="ri-book-open-fill"></i></div>
  <h1>${isAr?'القرآن الكريم':'Quran Reader'}</h1>
  <p>${isAr?'تصفح السور مع الترجمة والتفسير':'Browse all 114 surahs with translation and tafsir.'}</p>
</div>
<div class="pg-body">
  <div id="qrList">
    <div class="qr-search rv">
      <input type="text" id="qrSearch" placeholder="${isAr?'ابحث عن سورة...':'Search surah by name or number...'}" oninput="window.qrFilter(this.value)">
    </div>
    <div class="qr-grid rv rv-d1" id="qrGrid">
      <div class="qr-loading"><i class="ri-loader-4-line" style="animation:lSpin 1s linear infinite"></i> ${isAr?'جار التحميل...':'Loading surahs...'}</div>
    </div>
  </div>
  <div class="qr-reading" id="qrReading">
    <button class="qr-back" onclick="window.closeSurah()"><i class="ri-arrow-left-line"></i> ${isAr?'العودة':'Back to Surahs'}</button>
    <div id="qrContent"></div>
  </div>
</div>
<footer class="ft"><i class="ri-heart-fill"></i> ${isAr?'صُنع للأمة':'Built for the Ummah'}</footer>`;
  },

  init(lang) {
    _lang = lang;
    window.qrFilter    = (q) => filterSurahs(q, lang);
    window.closeSurah  = closeSurah;
    window.toggleTafsir = toggleTafsir;
    loadSurahs();
  },

  destroy() {
    delete window.qrFilter;
    delete window.closeSurah;
    delete window.toggleTafsir;
  }
};

export default Quran;
