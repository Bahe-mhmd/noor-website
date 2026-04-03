// ═══════════════════════════════════════════════════
// NOOR — pages/daily.js: Verse & Hadith of the Day
// ═══════════════════════════════════════════════════
import { t } from '../i18n.js';

// Curated daily hadith collection (30 — cycles monthly)
const DAILY_HADITHS = [
  { ar:'إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ', trans:'Innamal a\'malu binniyyat', meaning:'Actions are judged by their intentions.', source:'Sahih Bukhari 1', narrator:'Umar ibn al-Khattab RA' },
  { ar:'الدِّينُ النَّصِيحَةُ', trans:'Ad-dinu an-nasiha', meaning:'The religion is sincere counsel.', source:'Sahih Muslim 55', narrator:'Tamim al-Dari RA' },
  { ar:'مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الآخِرِ فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ', trans:'Man kana yu\'minu billahi wal yawmil akhiri falyaqul khayran aw liyasmut', meaning:'Whoever believes in Allah and the Last Day should speak good or remain silent.', source:'Sahih Bukhari 6018', narrator:'Abu Hurairah RA' },
  { ar:'لَا يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لِأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ', trans:'La yu\'minu ahadukum hatta yuhibba li-akhihi ma yuhibbu linafsihi', meaning:'None of you truly believes until he loves for his brother what he loves for himself.', source:'Sahih Bukhari 13', narrator:'Anas RA' },
  { ar:'أَفْضَلُ الصِّيَامِ بَعْدَ رَمَضَانَ شَهْرُ اللَّهِ الْمُحَرَّمُ', trans:'Afdal as-siyami ba\'da Ramadan shahr Allahil Muharram', meaning:'The best fasting after Ramadan is the month of Allah — Muharram.', source:'Sahih Muslim 1163', narrator:'Abu Hurairah RA' },
  { ar:'خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ', trans:'Khayrukum man ta\'allamal Qurana wa \'allamah', meaning:'The best of you are those who learn the Quran and teach it.', source:'Sahih Bukhari 5027', narrator:'Uthman RA' },
  { ar:'طَلَبُ الْعِلْمِ فَرِيضَةٌ عَلَى كُلِّ مُسْلِمٍ', trans:'Talabul \'ilmi faridatun \'ala kulli Muslim', meaning:'Seeking knowledge is an obligation upon every Muslim.', source:'Ibn Majah 224', narrator:'Anas RA' },
  { ar:'الصَّلَوَاتُ الخَمْسُ وَالجُمُعَةُ إِلَى الجُمُعَةِ كَفَّارَةٌ لِمَا بَيْنَهُنَّ', trans:'As-salawat al-khams wal-jumu\'ah ilal jumu\'ah kaffaratun lima baynahunna', meaning:'The five prayers and one Friday prayer to the next are expiation for what is between them.', source:'Sahih Muslim 233', narrator:'Abu Hurairah RA' },
  { ar:'اتَّقِ اللَّهَ حَيْثُمَا كُنْتَ وَأَتْبِعِ السَّيِّئَةَ الحَسَنَةَ تَمْحُهَا', trans:'Ittaqillaha haythuma kunta wa atbi\'is-sayyi\'atal hasanata tamhuha', meaning:'Fear Allah wherever you are, and follow a bad deed with a good deed, for it will erase it.', source:'Tirmidhi 1987', narrator:'Abu Dharr RA' },
  { ar:'مَنْ صَلَّى عَلَيَّ وَاحِدَةً صَلَّى اللَّهُ عَلَيْهِ عَشْرًا', trans:'Man salla \'alayya wahidatan sallallahu \'alayhi \'ashran', meaning:'Whoever sends one blessing upon me, Allah sends ten blessings upon him.', source:'Sahih Muslim 408', narrator:'Abu Hurairah RA' },
  { ar:'الْمُسْلِمُ مَنْ سَلِمَ المُسْلِمُونَ مِنْ لِسَانِهِ وَيَدِهِ', trans:'Al-muslimu man salimal muslimuna min lisanihi wa yadihi', meaning:'A Muslim is one from whose tongue and hand the Muslims are safe.', source:'Sahih Bukhari 10', narrator:'Abdullah ibn Amr RA' },
  { ar:'مَثَلُ الْمُؤْمِنِينَ فِي تَوَادِّهِمْ كَمَثَلِ الْجَسَدِ الْوَاحِدِ', trans:'Mathalul mu\'minina fi tawaduddihim ka-mathalil jasadil wahid', meaning:'The example of the believers in their mutual love is like the example of one body.', source:'Sahih Muslim 2586', narrator:'Nu\'man ibn Bashir RA' },
  { ar:'إِنَّ اللَّهَ لَا يَنْظُرُ إِلَى صُوَرِكُمْ وَأَمْوَالِكُمْ وَلَكِنْ يَنْظُرُ إِلَى قُلُوبِكُمْ وَأَعْمَالِكُمْ', trans:'Innallaha la yanthuru ila suwarikum wa amwalikum walakin yanthuru ila qulubikum wa a\'malikum', meaning:'Allah does not look at your forms or wealth, but He looks at your hearts and deeds.', source:'Sahih Muslim 2564', narrator:'Abu Hurairah RA' },
  { ar:'الصَّدَقَةُ تُطْفِئُ الخَطِيئَةَ كَمَا يُطْفِئُ المَاءُ النَّارَ', trans:'As-sadaqatu tutfi\'ul khati\'ata kama yutfi\'ul ma\'un nar', meaning:'Charity extinguishes sin as water extinguishes fire.', source:'Tirmidhi 2616', narrator:'Muadh ibn Jabal RA' },
  { ar:'كُلُّ مَعْرُوفٍ صَدَقَةٌ', trans:'Kullu ma\'rufin sadaqah', meaning:'Every act of kindness is charity.', source:'Sahih Bukhari 6021', narrator:'Jabir RA' },
  { ar:'مَنْ لَا يَشْكُرُ النَّاسَ لَا يَشْكُرُ اللَّهَ', trans:'Man la yashkurun-nasa la yashkurullaha', meaning:'Whoever does not thank people does not thank Allah.', source:'Abu Dawud 4811', narrator:'Abu Hurairah RA' },
  { ar:'إِنَّ مِنْ أَحَبِّكُمْ إِلَيَّ وَأَقْرَبِكُمْ مِنِّي مَجْلِسًا يَوْمَ القِيَامَةِ أَحَاسِنَكُمْ أَخْلَاقًا', trans:'Inna min ahabbiykum ilayya wa aqrabiykum minni majlisan yawmal qiyamah ahasinakum akhlaqan', meaning:'The most beloved to me and closest in the Hereafter are those of the best character.', source:'Tirmidhi 2018', narrator:'Jabir RA' },
  { ar:'ازْهَدْ فِي الدُّنْيَا يُحِبَّكَ اللَّهُ', trans:'Izhad fid-dunya yuhabbakallah', meaning:'Renounce the world and Allah will love you.', source:'Ibn Majah 4102', narrator:'Sahl ibn Sa\'d RA' },
  { ar:'مَا مَلَأَ آدَمِيٌّ وِعَاءً شَرًّا مِنْ بَطْنٍ', trans:'Ma mala adamiyyun wi\'a\'an sharran min batn', meaning:'No human fills a vessel worse than his stomach.', source:'Tirmidhi 2380', narrator:'Miqdam ibn Ma\'d RA' },
  { ar:'إِنَّ اللَّهَ رَفِيقٌ يُحِبُّ الرِّفْقَ', trans:'Innallaha rafiqun yuhibbur-rifq', meaning:'Allah is gentle and loves gentleness.', source:'Sahih Bukhari 6927', narrator:'Aisha RA' },
  { ar:'أَحَبُّ الأَعْمَالِ إِلَى اللَّهِ أَدْوَمُهَا وَإِنْ قَلَّ', trans:'Ahabbal a\'mali ilallahi adwamuha wa in qall', meaning:'The most beloved deeds to Allah are those done consistently, even if small.', source:'Sahih Bukhari 6465', narrator:'Aisha RA' },
  { ar:'إِذَا مَاتَ الإِنْسَانُ انْقَطَعَ عَنْهُ عَمَلُهُ إِلَّا مِنْ ثَلَاثَةٍ', trans:'Idha matal insanu inqata\'a \'anhu \'amaluhu illa min thalatha', meaning:'When a person dies, his deeds end except for three: ongoing charity, beneficial knowledge, a righteous child who prays for him.', source:'Sahih Muslim 1631', narrator:'Abu Hurairah RA' },
  { ar:'لَيْسَ الغِنَى عَنْ كَثْرَةِ العَرَضِ وَلَكِنَّ الغِنَى غِنَى النَّفْسِ', trans:'Laysal ghina \'an kathratil \'arad walakinnalghina ghinan-nafs', meaning:'Richness is not in having many possessions, but richness is the richness of the soul.', source:'Sahih Bukhari 6446', narrator:'Abu Hurairah RA' },
  { ar:'اللَّهُمَّ لَا سَهْلَ إِلَّا مَا جَعَلْتَهُ سَهْلًا', trans:'Allahumma la sahla illa ma ja\'altahu sahla', meaning:'O Allah, there is no ease except what You make easy.', source:'Ibn Hibban', narrator:'Anas RA' },
  { ar:'حُسْنُ الخُلُقِ يُذِيبُ الخَطَايَا كَمَا يُذِيبُ المَاءُ الجَلِيدَ', trans:'Husnul khuluqi yudhhibul khata\'ya kama yudhhibul ma\'ul jalid', meaning:'Good character melts away sins just as water melts ice.', source:'Kanz al-Ummal', narrator:'Abdullah RA' },
  { ar:'مَنْ كَانَ آخِرُ كَلَامِهِ لَا إِلَهَ إِلَّا اللَّهُ دَخَلَ الجَنَّةَ', trans:'Man kana akhiru kalamin la ilaha illallah dakhalal jannah', meaning:'Whoever\'s last words are La ilaha illallah will enter Paradise.', source:'Abu Dawud 3116', narrator:'Muadh ibn Jabal RA' },
  { ar:'بَشِّرُوا وَلَا تُنَفِّرُوا وَيَسِّرُوا وَلَا تُعَسِّرُوا', trans:'Bashshiru wa la tunaffiru wa yassiru wa la tu\'assiru', meaning:'Give glad tidings and do not repel; make things easy and do not make them difficult.', source:'Sahih Bukhari 69', narrator:'Anas RA' },
  { ar:'الكَلِمَةُ الطَّيِّبَةُ صَدَقَةٌ', trans:'Al-kalimatut-tayyibatu sadaqah', meaning:'A kind word is charity.', source:'Sahih Bukhari 2989', narrator:'Abu Hurairah RA' },
  { ar:'رَحِمَ اللَّهُ عَبْدًا قَالَ خَيْرًا فَغَنِمَ أَوْ سَكَتَ فَسَلِمَ', trans:'Rahimallahu \'abdan qala khayran faghaniama aw sakata fasalim', meaning:'May Allah have mercy on a person who says something good and benefits, or stays silent and is safe.', source:'Ibn Hibban', narrator:'Ibn Mas\'ud RA' },
  { ar:'تَبَسُّمُكَ فِي وَجْهِ أَخِيكَ صَدَقَةٌ', trans:'Tabasumuka fi wajhi akhika sadaqah', meaning:'Your smile in the face of your brother is charity.', source:'Tirmidhi 1956', narrator:'Abu Dharr RA' },
];

// Curated verse list (surah:ayah pairs)
const DAILY_VERSES = [
  {s:2,a:255,ar:'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ',en:'Allah — there is no deity except Him, the Ever-Living, the Sustainer of existence.',ref:'Al-Baqarah 2:255 (Ayatul Kursi)'},
  {s:94,a:5,ar:'فَإِنَّ مَعَ الْعُسْرِ يُسْرًا',en:'For indeed, with hardship will be ease.',ref:'Ash-Sharh 94:5'},
  {s:2,a:286,ar:'لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا',en:'Allah does not burden a soul beyond that it can bear.',ref:'Al-Baqarah 2:286'},
  {s:3,a:160,ar:'إِن يَنصُرْكُمُ اللَّهُ فَلَا غَالِبَ لَكُمْ',en:'If Allah should aid you, no one can overcome you.',ref:'Ali \'Imran 3:160'},
  {s:65,a:3,ar:'وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ',en:'And whoever relies upon Allah — then He is sufficient for him.',ref:'At-Talaq 65:3'},
  {s:13,a:28,ar:'أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ',en:'Verily, in the remembrance of Allah do hearts find rest.',ref:'Ar-Ra\'d 13:28'},
  {s:2,a:152,ar:'فَاذْكُرُونِي أَذْكُرْكُمْ',en:'Remember Me, I will remember you.',ref:'Al-Baqarah 2:152'},
  {s:39,a:53,ar:'لَا تَقْنَطُوا مِن رَّحْمَةِ اللَّهِ',en:'Do not despair of the mercy of Allah.',ref:'Az-Zumar 39:53'},
  {s:17,a:80,ar:'رَّبِّ أَدْخِلْنِي مُدْخَلَ صِدْقٍ وَأَخْرِجْنِي مُخْرَجَ صِدْقٍ',en:'My Lord, cause me to enter a sound entrance and cause me to exit a sound exit.',ref:'Al-Isra 17:80'},
  {s:2,a:45,ar:'وَاسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ',en:'And seek help through patience and prayer.',ref:'Al-Baqarah 2:45'},
  {s:112,a:1,ar:'قُلْ هُوَ اللَّهُ أَحَدٌ',en:'Say: He is Allah, the One.',ref:'Al-Ikhlas 112:1'},
  {s:49,a:13,ar:'إِنَّ أَكْرَمَكُمْ عِندَ اللَّهِ أَتْقَاكُمْ',en:'Indeed, the most noble of you in the sight of Allah is the most righteous of you.',ref:'Al-Hujurat 49:13'},
  {s:33,a:41,ar:'يَا أَيُّهَا الَّذِينَ آمَنُوا اذْكُرُوا اللَّهَ ذِكْرًا كَثِيرًا',en:'O you who have believed, remember Allah with much remembrance.',ref:'Al-Ahzab 33:41'},
  {s:76,a:9,ar:'إِنَّمَا نُطْعِمُكُمْ لِوَجْهِ اللَّهِ لَا نُرِيدُ مِنكُمْ جَزَاءً وَلَا شُكُورًا',en:'We feed you only for the countenance of Allah. We wish not from you reward or gratitude.',ref:'Al-Insan 76:9'},
  {s:55,a:13,ar:'فَبِأَيِّ آلَاءِ رَبِّكُمَا تُكَذِّبَانِ',en:'So which of the favors of your Lord would you deny?',ref:'Ar-Rahman 55:13'},
  {s:2,a:177,ar:'وَلَٰكِنَّ الْبِرَّ مَنْ آمَنَ بِاللَّهِ',en:'Righteousness is one who believes in Allah.',ref:'Al-Baqarah 2:177'},
  {s:9,a:51,ar:'قُل لَّن يُصِيبَنَا إِلَّا مَا كَتَبَ اللَّهُ لَنَا',en:'Say: Nothing will ever befall us except what Allah has decreed for us.',ref:'At-Tawbah 9:51'},
  {s:14,a:7,ar:'لَئِن شَكَرْتُمْ لَأَزِيدَنَّكُمْ',en:'If you are grateful, I will surely increase you.',ref:'Ibrahim 14:7'},
  {s:4,a:36,ar:'وَاعْبُدُوا اللَّهَ وَلَا تُشْرِكُوا بِهِ شَيْئًا',en:'Worship Allah and associate nothing with Him.',ref:'An-Nisa 4:36'},
  {s:67,a:2,ar:'الَّذِي خَلَقَ الْمَوْتَ وَالْحَيَاةَ لِيَبْلُوَكُمْ أَيُّكُمْ أَحْسَنُ عَمَلًا',en:'Who created death and life to test you as to which of you is best in deed.',ref:'Al-Mulk 67:2'},
  {s:29,a:69,ar:'وَالَّذِينَ جَاهَدُوا فِينَا لَنَهْدِيَنَّهُمْ سُبُلَنَا',en:'Those who strive for Us — We will surely guide them to Our paths.',ref:'Al-Ankabut 29:69'},
  {s:40,a:60,ar:'ادْعُونِي أَسْتَجِبْ لَكُمْ',en:'Call upon Me; I will respond to you.',ref:'Ghafir 40:60'},
  {s:57,a:4,ar:'وَهُوَ مَعَكُمْ أَيْنَ مَا كُنتُمْ',en:'And He is with you wherever you are.',ref:'Al-Hadid 57:4'},
  {s:3,a:173,ar:'حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ',en:'Sufficient for us is Allah, and He is the best Disposer of affairs.',ref:'Ali \'Imran 3:173'},
  {s:18,a:10,ar:'رَبَّنَا آتِنَا مِن لَّدُنكَ رَحْمَةً وَهَيِّئْ لَنَا مِنْ أَمْرِنَا رَشَدًا',en:'Our Lord, grant us mercy from Yourself and prepare for us from our affair right guidance.',ref:'Al-Kahf 18:10'},
  {s:23,a:97,ar:'رَّبِّ أَعُوذُ بِكَ مِنْ هَمَزَاتِ الشَّيَاطِينِ',en:'My Lord, I seek refuge in You from the incitements of the devils.',ref:'Al-Mu\'minun 23:97'},
  {s:3,a:8,ar:'رَبَّنَا لَا تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا',en:'Our Lord, let not our hearts deviate after You have guided us.',ref:'Ali \'Imran 3:8'},
  {s:20,a:114,ar:'رَّبِّ زِدْنِي عِلْمًا',en:'My Lord, increase me in knowledge.',ref:'Ta-Ha 20:114'},
  {s:7,a:23,ar:'رَبَّنَا ظَلَمْنَا أَنفُسَنَا وَإِن لَّمْ تَغْفِرْ لَنَا وَتَرْحَمْنَا لَنَكُونَنَّ مِنَ الْخَاسِرِينَ',en:'Our Lord, we have wronged ourselves, and if You do not forgive us and have mercy upon us, we will surely be among the losers.',ref:'Al-A\'raf 7:23'},
  {s:25,a:74,ar:'رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ',en:'Our Lord, grant us from among our wives and offspring comfort to our eyes.',ref:'Al-Furqan 25:74'},
];

// Get today's index based on day of year
function getDayIndex(arrayLength) {
  const d = new Date();
  const start = new Date(d.getFullYear(), 0, 0);
  const diff = d - start;
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
  return dayOfYear % arrayLength;
}

function getReflection(verse, lang) {
  const reflections = {
    en: {
      'Al-Baqarah 2:255 (Ayatul Kursi)': 'Ayatul Kursi is the greatest verse in the Quran. Recite it after every prayer for protection.',
      'Ash-Sharh 94:5': 'Every hardship you face carries within it the seed of ease. Trust Allah\'s timing.',
      'Al-Baqarah 2:286': 'Allah knows your limits better than you do. He will never burden you beyond your capacity.',
      default: 'Reflect on this verse throughout your day. Let it guide your actions and intentions.'
    },
    ar: {
      default: 'تأمل في هذه الآية طوال يومك. دعها توجه أعمالك ونواياك.'
    },
    fr: { default: 'Méditez sur ce verset tout au long de votre journée.' },
    tr: { default: 'Bu ayeti gün boyunca düşünün. Eylemlerinize ve niyetlerinize rehberlik etmesine izin verin.' },
    ur: { default: 'اس آیت پر پورے دن غور کریں۔ اسے اپنے اعمال اور نیتوں کی رہنمائی کرنے دیں۔' },
    id: { default: 'Renungkan ayat ini sepanjang hari Anda. Biarkan ia membimbing tindakan dan niat Anda.' }
  };
  const r = reflections[lang] || reflections.en;
  return r[verse.ref] || r.default;
}

const Daily = {
  render(lang) {
    const verseIdx = getDayIndex(DAILY_VERSES.length);
    const hadithIdx = getDayIndex(DAILY_HADITHS.length);
    const verse = DAILY_VERSES[verseIdx];
    const hadith = DAILY_HADITHS[hadithIdx];
    const today = new Date().toLocaleDateString(lang === 'ar' ? 'ar-SA' : 'en-US', { weekday:'long', year:'numeric', month:'long', day:'numeric' });
    const reflection = getReflection(verse, lang);

    return `
<div class="pg-hd">
  <div class="pg-hd-ic"><i class="ri-sparkling-2-fill"></i></div>
  <h1>${t('daily.title', lang)}</h1>
  <p>${t('daily.desc', lang)}</p>
</div>
<div class="pg-body">

  <div class="daily-date rv">${today}</div>

  <!-- Verse of the Day -->
  <div class="daily-card verse-card rv rv-d1">
    <div class="daily-card-header">
      <div class="daily-card-icon"><i class="ri-book-open-fill"></i></div>
      <div class="daily-card-label">${t('daily.verse', lang)}</div>
      <div class="daily-card-ref">${verse.ref}</div>
    </div>
    <div class="daily-arabic">${verse.ar}</div>
    <div class="daily-translation">${verse.en}</div>
    <div class="daily-reflection">
      <i class="ri-lightbulb-line"></i>
      <span>${reflection}</span>
    </div>
    <div class="daily-actions">
      <button class="daily-action-btn" onclick="window.copyText('${verse.ar}\\n\\n${verse.en}\\n\\n${verse.ref}')">
        <i class="ri-file-copy-line"></i> ${t('common.copy', lang)}
      </button>
      <button class="daily-action-btn" onclick="window.shareDaily('verse', '${verse.ref}')">
        <i class="ri-share-line"></i> ${t('common.share', lang)}
      </button>
    </div>
  </div>

  <!-- Hadith of the Day -->
  <div class="daily-card hadith-card rv rv-d2">
    <div class="daily-card-header">
      <div class="daily-card-icon hadith-ic"><i class="ri-quill-pen-fill"></i></div>
      <div class="daily-card-label">${t('daily.hadith', lang)}</div>
      <div class="daily-card-ref">${hadith.source}</div>
    </div>
    <div class="daily-arabic">${hadith.ar}</div>
    <div class="daily-transliteration">${hadith.trans}</div>
    <div class="daily-translation">${hadith.meaning}</div>
    <div class="daily-narrator"><i class="ri-user-star-line"></i> ${hadith.narrator}</div>
    <div class="daily-actions">
      <button class="daily-action-btn" onclick="window.copyText('${hadith.ar}\\n\\n${hadith.meaning}\\n\\n${hadith.source}')">
        <i class="ri-file-copy-line"></i> ${t('common.copy', lang)}
      </button>
      <button class="daily-action-btn" onclick="window.shareDaily('hadith', '${hadith.source}')">
        <i class="ri-share-line"></i> ${t('common.share', lang)}
      </button>
    </div>
  </div>

  <div class="daily-note rv rv-d3">
    <i class="ri-time-line"></i> ${t('daily.new', lang)}
  </div>

</div>
<footer class="ft"><i class="ri-heart-fill"></i> ${t('common.ummah', lang)}</footer>`;
  },

  init(lang) {
    window.copyText = (text) => {
      navigator.clipboard.writeText(text).then(() => {
        const btns = document.querySelectorAll('.daily-action-btn');
        btns.forEach(b => { if (b.textContent.includes(t('common.copy', lang))) { const orig = b.innerHTML; b.innerHTML = '<i class="ri-check-line"></i> ✓'; setTimeout(() => { b.innerHTML = orig; }, 1500); } });
      }).catch(() => {});
    };
    window.shareDaily = (type, ref) => {
      const url = window.location.href;
      const text = `🕌 Noor Islamic Knowledge\n${type === 'verse' ? '📖' : '📜'} ${ref}\n\n${url}`;
      if (navigator.share) { navigator.share({ title: 'Noor — Islamic Knowledge', text }); }
      else { navigator.clipboard.writeText(text); }
    };
  },

  destroy() {
    delete window.copyText;
    delete window.shareDaily;
  }
};

export default Daily;
