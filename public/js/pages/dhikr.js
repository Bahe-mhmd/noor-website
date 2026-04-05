// ═══════════════════════════════════════════════════
// NOOR — pages/dhikr.js  (full redesign)
// Data sourced from lifewithallah.com/dhikr-dua
// ═══════════════════════════════════════════════════

let _lang = 'en';

// ── UI Labels ──
const DH_UI = {
  title:     { en:'Dhikr & Duas',         ar:'الأذكار والأدعية',      fr:'Dhikr & Douâs',         tr:'Zikir & Dualar',      ur:'ذکر و دعا',          id:'Dzikir & Doa'         },
  subtitle:  { en:'Authentic remembrances from Quran & Sunnah.', ar:'أذكار وأدعية من القرآن والسنة.', fr:'Rappels authentiques du Coran et de la Sunnah.', tr:'Kuran ve Sünnetten otantik zikirler.', ur:'قرآن و سنت سے مستند اذکار۔', id:'Dzikir dan doa autentik dari Quran & Sunnah.' },
  translation: { en:'Translation',        ar:'الترجمة',               fr:'Traduction',             tr:'Çeviri',              ur:'ترجمہ',              id:'Terjemahan'            },
  transliteration:{ en:'Transliteration', ar:'النطق',                 fr:'Translitération',        tr:'Telaffuz',            ur:'تلفظ',               id:'Transliterasi'         },
  virtue:    { en:'Virtue',               ar:'الفضيلة',               fr:'Vertu',                  tr:'Fazilet',             ur:'فضیلت',              id:'Keutamaan'             },
  explanation:{ en:'Explanation',         ar:'الشرح',                 fr:'Explication',            tr:'Açıklama',            ur:'تشریح',              id:'Penjelasan'            },
  source:    { en:'Source',               ar:'المصدر',                fr:'Source',                 tr:'Kaynak',              ur:'ماخذ',               id:'Sumber'                },
  times:     { en:'times',                ar:'مرات',                  fr:'fois',                   tr:'kez',                 ur:'مرتبہ',              id:'kali'                  },
  ummah:     { en:'Built for the Ummah',  ar:'صُنع للأمة',            fr:"Pour l'Oumma",           tr:'Ümmet için',          ur:'امت کے لیے',        id:'Untuk Umat'            },
  all:       { en:'All',                  ar:'الكل',                  fr:'Tout',                   tr:'Hepsi',               ur:'سب',                 id:'Semua'                 },
  morning:   { en:'Morning',              ar:'الصباح',                fr:'Matin',                  tr:'Sabah',               ur:'صبح',                id:'Pagi'                  },
  evening:   { en:'Evening',              ar:'المساء',                fr:'Soir',                   tr:'Akşam',               ur:'شام',                id:'Sore'                  },
  afterprayer:{ en:'After Prayer',        ar:'بعد الصلاة',            fr:'Après la prière',        tr:'Namazdan sonra',      ur:'نماز کے بعد',        id:'Setelah Shalat'        },
  sleep:     { en:'Sleep',                ar:'النوم',                  fr:'Sommeil',                tr:'Uyku',                ur:'سونا',               id:'Tidur'                 },
  protection:{ en:'Protection',           ar:'الحماية',               fr:'Protection',             tr:'Koruma',              ur:'حفاظت',              id:'Perlindungan'          },
  general:   { en:'General',              ar:'عام',                    fr:'Général',                tr:'Genel',               ur:'عمومی',              id:'Umum'                  },
  quran:     { en:'From Quran',           ar:'من القرآن',              fr:'Du Coran',               tr:'Kuran\'dan',          ur:'قرآن سے',            id:'Dari Quran'            },
  travel:    { en:'Travel',               ar:'السفر',                  fr:'Voyage',                 tr:'Yolculuk',            ur:'سفر',                id:'Perjalanan'            },
  stress:    { en:'Anxiety & Stress',     ar:'القلق والهموم',          fr:'Anxiété',                tr:'Stres',               ur:'پریشانی',            id:'Kecemasan'             },
};
function ui(key) { return DH_UI[key]?.[_lang] || DH_UI[key]?.en || key; }

// ── Categories ──
const CATS = [
  { id:'all',       icon:'ri-apps-2-line'     },
  { id:'morning',   icon:'ri-sun-rise-line'   },
  { id:'evening',   icon:'ri-moon-line'       },
  { id:'afterprayer',icon:'ri-hand-heart-line'},
  { id:'sleep',     icon:'ri-zzz-line'        },
  { id:'protection',icon:'ri-shield-star-line'},
  { id:'quran',     icon:'ri-book-open-line'  },
  { id:'general',   icon:'ri-heart-3-line'    },
  { id:'travel',    icon:'ri-plane-line'      },
  { id:'stress',    icon:'ri-mental-health-line'},
];

// ── Full Dhikr Dataset (from lifewithallah.com) ──
const DHIKR = [
  // ══ MORNING ══
  {
    cat:'morning',
    ar:'اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ النُّشُورُ',
    trans:'Allahumma bika asbahna, wa bika amsayna, wa bika nahya, wa bika namutu, wa ilaikan-nushur',
    meaning:'O Allah, by You we enter the morning, by You we enter the evening, by You we live, by You we die, and to You is the resurrection.',
    count:'1x', source:'Tirmidhi 3391 — Hasan',
    virtue:'This dua acknowledges that all beginnings and endings are with Allah, establishing tawakkul from the first moment of the day.',
    explanation:'Reciting this dhikr in the morning ties your entire day — its start, its actions, and its end — to Allah alone. It is a declaration of total dependence on Him and recognition that life and death are in His hands.'
  },
  {
    cat:'morning',
    ar:'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ',
    trans:'Asbahna wa asbahal-mulku lillah, wal-hamdu lillah, la ilaha illallahu wahdahu la sharika lah',
    meaning:'We have entered the morning, and the dominion belongs to Allah. All praise is for Allah. There is no god worthy of worship except Allah, alone, without partner.',
    count:'1x', source:'Sahih Muslim 2723',
    virtue:'The Prophet ﷺ taught this as a way to start the day with gratitude and tawhid.',
    explanation:'This dhikr begins the morning by affirming that the kingdom of the heavens and earth belongs to Allah. It is an act of submission, recognizing that nothing we see or experience is truly ours — it all belongs to the Creator.'
  },
  {
    cat:'morning',
    ar:'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ',
    trans:'Subhan Allahi wa bihamdihi',
    meaning:'Glory be to Allah and all praise is for Him.',
    count:'100x', source:'Sahih Muslim 2692',
    virtue:'Whoever says this 100 times in the morning will have his sins forgiven, even if they are like the foam of the sea.',
    explanation:'This short yet powerful dhikr carries an enormous reward. The Prophet ﷺ said: "Whoever says \'Subhan Allahi wa bihamdihi\' a hundred times during the day, his sins will be wiped away, even if they are like the foam of the sea." (Sahih Muslim 2692). It is one of the most recommended morning adhkar for its simplicity and immense virtue.'
  },
  {
    cat:'morning',
    ar:'أَعُوذُ بِاللَّهِ السَّمِيعِ الْعَلِيمِ مِنَ الشَّيْطَانِ الرَّجِيمِ',
    trans:'A\'udhu billahis-sami\'il-\'alimi minash-shaytanir-rajim',
    meaning:'I seek refuge with Allah — the All-Hearing, the All-Knowing — from the accursed Shaytan.',
    count:'3x', source:'Tirmidhi 3529 — Hasan',
    virtue:'Whoever reads this three times in the morning and three times in the evening will be protected from Shaytan for the day and night.',
    explanation:'This is a morning protection formula combining refuge in two names of Allah — As-Sami\' (All-Hearing) and Al-Alim (All-Knowing) — against Shaytan. These names are specifically chosen because Allah hears Shaytan\'s whispers and knows all his schemes.'
  },
  {
    cat:'morning',
    ar:'رَضِيتُ بِاللَّهِ رَبًّا، وَبِالإِسْلاَمِ دِينًا، وَبِمُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ نَبِيًّا',
    trans:'Raditu billahi rabban, wa bil-Islami dinan, wa bi-Muhammadin sallallahu \'alayhi wa sallam nabiyyan',
    meaning:'I am pleased with Allah as my Lord, with Islam as my religion, and with Muhammad ﷺ as my Prophet.',
    count:'3x', source:'Abu Dawud 1529, Ibn Majah 925 — Sahih',
    virtue:'Whoever says this three times in the morning and evening, Allah will be pleased with him on the Day of Judgement.',
    explanation:'This is a profound declaration of contentment and iman. It is not merely words — it is a renewal of the covenant between the believer and their Lord every morning. Ibn Qayyim noted that this dhikr combines the three foundations of the deen in a single breath.'
  },
  {
    cat:'morning',
    ar:'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ',
    trans:'Allahumma anta rabbi la ilaha illa ant, khalaqtani wa ana abduk, wa ana ala ahdika wa wa\'dika mastata\'tu, a\'udhu bika min sharri ma sana\'tu, abu\'u laka bini\'matika \'alayya, wa abu\'u bidhanbi faghfir li fa innahu la yaghfirudh-dhunuba illa ant',
    meaning:'O Allah, You are my Lord. There is no god worthy of worship except You. You created me and I am Your servant. I am upon Your covenant and promise to the best of my ability. I seek refuge in You from the evil of what I have done. I acknowledge Your favors upon me, and I acknowledge my sins, so forgive me, for none forgives sins except You.',
    count:'1x', source:'Sahih Bukhari 6306',
    virtue:'This is Sayyid al-Istighfar — the Master of seeking forgiveness. Whoever says it in the morning with certainty and dies that day will enter Paradise.',
    explanation:'Called "Sayyid al-Istighfar" by the Prophet ﷺ, this dua is the most complete act of seeking forgiveness. It contains recognition of Allah\'s lordship, acknowledgment of one\'s own servitude, confession of sins, and total dependence on Allah for forgiveness. A believer should say it with full presence of heart.'
  },
  {
    cat:'morning',
    ar:'اللَّهُمَّ عَافِنِي فِي بَدَنِي، اللَّهُمَّ عَافِنِي فِي سَمْعِي، اللَّهُمَّ عَافِنِي فِي بَصَرِي، لَا إِلَهَ إِلَّا أَنْتَ',
    trans:'Allahumma \'afini fi badani, Allahumma \'afini fi sam\'i, Allahumma \'afini fi basari, la ilaha illa anta',
    meaning:'O Allah, grant me health in my body. O Allah, grant me health in my hearing. O Allah, grant me health in my sight. There is no god worthy of worship except You.',
    count:'3x', source:'Abu Dawud 5090 — Hasan',
    virtue:'Abu Bakr al-Siddiq RA used to say this supplication every morning and evening.',
    explanation:'This beautiful dua asks for the three most essential physical faculties: the body, hearing, and sight. These are three of the greatest gifts of Allah, and asking for their preservation each morning and evening is a practice inherited from Abu Bakr RA, the greatest companion after the Prophets.'
  },

  // ══ EVENING ══
  {
    cat:'evening',
    ar:'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ',
    trans:'Amsayna wa amsal-mulku lillah, wal-hamdu lillah, la ilaha illallahu wahdahu la sharika lah',
    meaning:'We have entered the evening, and the dominion belongs to Allah. All praise is for Allah. There is no god worthy of worship except Allah, alone, without partner.',
    count:'1x', source:'Sahih Muslim 2723',
    virtue:'This is the evening counterpart of the morning dua, closing the day with the same declaration of tawhid.',
    explanation:'Just as the morning began with acknowledging Allah\'s ownership of all dominion, the evening ends with the same declaration. This creates a full circle of remembrance — beginning the day with Allah and ending it with Allah.'
  },
  {
    cat:'evening',
    ar:'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ',
    trans:'A\'udhu bikalimatillahit-tammati min sharri ma khalaq',
    meaning:'I seek refuge in the perfect words of Allah from the evil of what He has created.',
    count:'3x', source:'Sahih Muslim 2708',
    virtue:'Whoever says this three times in the evening will be protected from insect stings that night.',
    explanation:'The "perfect words of Allah" refers to the Quran and all the names and attributes of Allah. This dua is a comprehensive shield against every form of harm from creation, because all of creation is subject to the One whose words we seek refuge in.'
  },
  {
    cat:'evening',
    ar:'اللَّهُمَّ بِكَ أَمْسَيْنَا وَبِكَ أَصْبَحْنَا وَبِكَ نَحْيَا وَبِكَ نَمُوتُ وَإِلَيْكَ الْمَصِيرُ',
    trans:'Allahumma bika amsayna wa bika asbahna wa bika nahya wa bika namutu wa ilaykal-masir',
    meaning:'O Allah, by You we enter the evening and by You we enter the morning, by You we live and by You we die, and to You is the return.',
    count:'1x', source:'Tirmidhi 3391',
    virtue:'The evening version adds "and to You is the return" (al-masir) instead of "the resurrection" (al-nushur), reflecting the transition from day to night.',
    explanation:'This evening dua parallels the morning one but uses "al-masir" (the final return to Allah). The change in wording reflects the deeper reality that the night, with its resemblance to death in sleep, reminds us that our ultimate journey is back to Allah.'
  },
  {
    cat:'evening',
    ar:'اللَّهُمَّ إِنِّي أَمْسَيْتُ أُشْهِدُكَ، وَأُشْهِدُ حَمَلَةَ عَرْشِكَ، وَمَلَائِكَتَكَ، وَجَمِيعَ خَلْقِكَ، أَنَّكَ أَنْتَ اللَّهُ لَا إِلَهَ إِلَّا أَنْتَ وَحْدَكَ لَا شَرِيكَ لَكَ، وَأَنَّ مُحَمَّدًا عَبْدُكَ وَرَسُولُكَ',
    trans:'Allahumma inni amsaytu ushiduka wa ushidu hamalata arshika wa mala\'ikataka wa jami\'a khalqika annaka antallahu la ilaha illa anta wahdaka la sharika lak, wa anna Muhammadan abduka wa rasuluk',
    meaning:'O Allah, I have entered the evening calling You to witness, and calling to witness the bearers of Your throne, Your angels, and all of Your creation, that You are Allah, there is no god worthy of worship except You alone, without partner, and that Muhammad is Your servant and Messenger.',
    count:'4x', source:'Abu Dawud 5069 — Hasan',
    virtue:'Whoever says this 4 times in the morning or evening, Allah will free a quarter of him from the Hellfire for each time.',
    explanation:'This remarkable dhikr calls all of creation as witnesses to one\'s declaration of tawhid and iman. By saying it four times, you have made all of creation — angels, the bearers of Allah\'s throne, and every created thing — witnesses to your faith. Ibn Qayyim called this one of the most comprehensive forms of witnessing.'
  },

  // ══ AFTER PRAYER ══
  {
    cat:'afterprayer',
    ar:'أَسْتَغْفِرُ اللَّهَ',
    trans:'Astaghfirullah',
    meaning:'I seek forgiveness from Allah.',
    count:'3x', source:'Sahih Muslim 591',
    virtue:'The Prophet ﷺ used to say this three times immediately after finishing his prayer before turning to the congregation.',
    explanation:'Even after completing the most perfect form of worship — the prayer — the Prophet ﷺ would immediately seek forgiveness. This teaches us that however good our worship may be, it always falls short of the glory of Allah, and istighfar after prayer polishes the prayer and fills any gaps in it.'
  },
  {
    cat:'afterprayer',
    ar:'اللَّهُمَّ أَنْتَ السَّلَامُ، وَمِنْكَ السَّلَامُ، تَبَارَكْتَ يَا ذَا الْجَلالِ وَالإِكْرَامِ',
    trans:'Allahumma anta as-salam, wa minka as-salam, tabarakta ya dhal-jalali wal-ikram',
    meaning:'O Allah, You are Peace (As-Salam) and from You comes peace. Blessed are You, O Possessor of Majesty and Honor.',
    count:'1x', source:'Sahih Muslim 592',
    virtue:'This is the first dhikr the Prophet ﷺ taught after salah. It contains the name As-Salam and closes with two other majestic names of Allah.',
    explanation:'After salah — which ends with the greeting of peace — we acknowledge that all peace comes from Allah. We then praise Him with two of His most majestic names: Dhul-Jalal (Possessor of Majesty) and Al-Ikram (Generous to His creation). This transitions beautifully from the prayer into the world.'
  },
  {
    cat:'afterprayer',
    ar:'سُبْحَانَ اللَّهِ (٣٣) • الْحَمْدُ لِلَّهِ (٣٣) • اللَّهُ أَكْبَرُ (٣٣)',
    trans:'Subhanallah (33) • Alhamdulillah (33) • Allahu Akbar (33)',
    meaning:'Glory be to Allah (33) • All Praise is for Allah (33) • Allah is the Greatest (33) — then: There is no god but Allah, alone, without partner. To Him belongs the dominion and all praise, and He is powerful over all things.',
    count:'33x each', source:'Sahih Muslim 595, Sahih Bukhari 843',
    virtue:'Whoever glorifies Allah 33 times, praises Him 33 times, and exalts Him 33 times after each prayer — and completes the hundred by saying La ilaha illallah — his sins will be forgiven even if they are like the foam of the sea.',
    explanation:'This three-part tasbih after prayer is one of the most established Sunnah acts. The 33+33+33+1 formula adds up to 100, a complete count. Subhanallah declares Allah\'s freedom from all imperfection; Alhamdulillah declares His perfect worthiness of all praise; Allahu Akbar declares that He is greater than everything we can imagine.'
  },
  {
    cat:'afterprayer',
    ar:'لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
    trans:'La ilaha illallahu wahdahu la sharika lahu, lahul-mulku wa lahul-hamdu wa huwa \'ala kulli shay\'in qadir',
    meaning:'There is no god worthy of worship except Allah, alone, without partner. To Him belongs the dominion and all praise, and He is powerful over all things.',
    count:'10x (after Fajr and Maghrib)', source:'Tirmidhi 3474 — Sahih',
    virtue:'The Prophet ﷺ said: "Whoever says this after Fajr and Maghrib prayers ten times, Allah will write for him ten good deeds, erase ten bad deeds, and raise him ten degrees. It will be like freeing a slave, a protection from Shaytan, and nothing will harm him that day except death."',
    explanation:'This comprehensive declaration of tawhid earns enormous rewards when said specifically after Fajr and Maghrib. The scholars say these two prayers bookend the night — Fajr starts the day and Maghrib ends it — making them spiritually charged moments to renew one\'s tawhid with this powerful formula.'
  },
  {
    cat:'afterprayer',
    ar:'اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ، وَشُكْرِكَ، وَحُسْنِ عِبَادَتِكَ',
    trans:'Allahumma a\'inni \'ala dhikrika, wa shukrika, wa husni \'ibadatik',
    meaning:'O Allah, help me to remember You, to be grateful to You, and to worship You in an excellent manner.',
    count:'1x (after each prayer)', source:'Abu Dawud 1522 — Sahih',
    virtue:'The Prophet ﷺ instructed Mu\'adh ibn Jabal RA: "O Mu\'adh, by Allah I love you, so do not forget to say after every prayer: \'O Allah, help me...\'." (Abu Dawud)',
    explanation:'This dua is remarkable because it asks Allah to help with the very things that help us draw closer to Allah — remembrance, gratitude, and good worship. It is a circle of divine help: we ask Allah to help us remember Him, because only with His help can we truly remember Him.'
  },
  {
    cat:'afterprayer',
    ar:'آيَةُ الْكُرْسِيّ',
    trans:'Ayatul Kursi — Quran 2:255',
    meaning:'Allah! There is no god except Him, the Ever-Living, the Sustainer of all existence. Neither drowsiness nor sleep overtakes Him. To Him belongs whatever is in the heavens and whatever is on the earth...',
    count:'1x (after each obligatory prayer)', source:'Sahih Nasai 1337 — Sahih',
    virtue:'The Prophet ﷺ said: "Whoever recites Ayat al-Kursi after every obligatory prayer — nothing will prevent him from entering Paradise except death."',
    explanation:'Ayat al-Kursi (The Throne Verse) is the greatest verse in the Quran. It is a comprehensive description of Allah\'s attributes: His eternal life, His perfect knowledge, His sovereignty over all creation, and the fact that nothing intercedes with Him except by His permission. Reciting it after each prayer is one of the easiest ways to earn a guaranteed place in Paradise.'
  },

  // ══ SLEEP ══
  {
    cat:'sleep',
    ar:'بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا',
    trans:'Bismika Allahumma amutu wa ahya',
    meaning:'In Your name, O Allah, I die and I live.',
    count:'1x', source:'Sahih Bukhari 6324',
    virtue:'The Prophet ﷺ said this every night before sleeping, using sleep as a metaphor for death — the minor death — to prepare the soul.',
    explanation:'Sleep is called the "minor death" in Islam because the soul leaves the body during sleep and returns upon waking, just as it leaves at death and returns at resurrection. Saying this dua before sleeping is a reminder of our mortality and a way to die with the name of Allah on our lips.'
  },
  {
    cat:'sleep',
    ar:'اللَّهُمَّ قِنِي عَذَابَكَ يَوْمَ تَبْعَثُ عِبَادَكَ',
    trans:'Allahumma qini \'adhabaka yawma tab\'athu \'ibadak',
    meaning:'O Allah, protect me from Your punishment on the Day You resurrect Your servants.',
    count:'3x', source:'Abu Dawud 5045 — Sahih',
    virtue:'The Prophet ﷺ ﷺ recited this three times before sleeping, holding his right cheek.',
    explanation:'As we prepare to enter the state that resembles death, we ask Allah to protect us from what awaits after the true death — the punishment of the Day of Resurrection. This dua keeps the Hereafter present in our hearts even as we close our eyes.'
  },
  {
    cat:'sleep',
    ar:'اللَّهُمَّ أَسْلَمْتُ نَفْسِي إِلَيْكَ، وَوَجَّهْتُ وَجْهِي إِلَيْكَ، وَفَوَّضْتُ أَمْرِي إِلَيْكَ، وَأَلْجَأْتُ ظَهْرِي إِلَيْكَ، رَغْبَةً وَرَهْبَةً إِلَيْكَ، لَا مَلْجَأَ وَلَا مَنْجَا مِنْكَ إِلَّا إِلَيْكَ، اللَّهُمَّ آمَنْتُ بِكِتَابِكَ الَّذِي أَنْزَلْتَ، وَبِنَبِيِّكَ الَّذِي أَرْسَلْتَ',
    trans:'Allahumma aslamtu nafsi ilayk, wa wajjahtu wajhi ilayk, wa fawwadtu amri ilayk, wa alja\'tu zahri ilayk, raghbatan wa rahbatan ilayk, la malja\'a wa la manja minka illa ilayk. Allahumma amantu bikitabikal-ladhi anzalt, wa binabiyyikal-ladhi arsalt',
    meaning:'O Allah, I surrender myself to You, I direct my face to You, I entrust my affairs to You, I press my back against You, out of desire for You and fear of You. There is no refuge and no escape from You except to You. O Allah, I believe in Your Book which You revealed and in Your Prophet whom You sent.',
    count:'1x (before sleeping)', source:'Sahih Bukhari 247',
    virtue:'The Prophet ﷺ said: "If you die tonight, you will die upon the fitrah (natural disposition of Islam). Make these words the last thing you say."',
    explanation:'This dua before sleeping is the ultimate act of surrender. It covers five dimensions of submission: surrendering the self, directing the face, entrusting all affairs, leaning the back (for support), and confirming belief. The Prophet ﷺ instructed that these should be the last words before sleep — because they would also be perfect last words if one were to die.'
  },
  {
    cat:'sleep',
    ar:'الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا، وَكَفَانَا، وَآوَانَا، فَكَمْ مِمَّنْ لَا كَافِيَ لَهُ وَلَا مُؤْوِيَ',
    trans:'Alhamdulillahil-ladhi at\'amana wa saqana, wa kafana, wa awana, fakam mimman la kafiya lahu wa la mu\'wi',
    meaning:'All praise is for Allah who fed us and gave us drink, who has been sufficient for us and has sheltered us. For many there is no one sufficient for them, and no one to shelter them.',
    count:'1x', source:'Sahih Muslim 2715',
    virtue:'This dua cultivates gratitude by contrasting our blessed state with those who are hungry, thirsty, or without shelter.',
    explanation:'Before sleeping, this dua reminds us of four foundational blessings: food, drink, sufficiency, and shelter. The final phrase — acknowledging that many people lack even these basics — is a powerful antidote to ingratitude and a motivator for charity.'
  },
  {
    cat:'sleep',
    ar:'سُبْحَانَ اللَّهِ (٣٣) • الْحَمْدُ لِلَّهِ (٣٣) • اللَّهُ أَكْبَرُ (٣٤)',
    trans:'Subhanallah (33) • Alhamdulillah (33) • Allahu Akbar (34)',
    meaning:'Glory be to Allah (33 times) — All praise is for Allah (33 times) — Allah is the Greatest (34 times)',
    count:'33+33+34', source:'Sahih Bukhari 3113',
    virtue:'The Prophet ﷺ told Fatimah RA when she asked for a servant: "Shall I tell you of something better? When you go to bed, say Subhanallah 33 times, Alhamdulillah 33 times, Allahu Akbar 34 times. That is better for you than a servant."',
    explanation:'Known as the "Tasbih of Fatimah," this nighttime dhikr was given to the Prophet\'s daughter when she asked for household help. The Prophet ﷺ gave her these words instead, teaching that spiritual assistance is greater than material assistance. Many scholars recommend this for those who feel tired at the end of the day.'
  },

  // ══ PROTECTION ══
  {
    cat:'protection',
    ar:'بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ',
    trans:'Bismillahil-ladhi la yadurru ma\'asmihi shay\'un fil-ardi wa la fis-sama\'i wa huwas-sami\'ul-\'alim',
    meaning:'In the name of Allah, with whose name nothing can cause harm on earth or in the heavens, and He is the All-Hearing, the All-Knowing.',
    count:'3x (morning and evening)', source:'Tirmidhi 3388 — Sahih',
    virtue:'Whoever says this three times in the morning and three times in the evening, nothing will harm him.',
    explanation:'This is one of the most powerful protection formulas in Islam. It invokes the name of Allah as a shield — because the name of Allah, when said sincerely, surrounds the believer with divine protection. The two names at the end — As-Sami\' and Al-Alim — assure us that Allah hears our supplication and knows all potential harms before they occur.'
  },
  {
    cat:'protection',
    ar:'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّةِ مِنْ كُلِّ شَيْطَانٍ وَهَامَّةٍ، وَمِنْ كُلِّ عَيْنٍ لَامَّةٍ',
    trans:'A\'udhu bikalimatillahit-tammah min kulli shaytanin wa hammah, wa min kulli \'aynin lammah',
    meaning:'I seek refuge in the perfect words of Allah from every devil and every harmful creature and from every evil eye.',
    count:'Upon entering a new place', source:'Sahih Bukhari 3371',
    virtue:'The Prophet ﷺ used to recite this for Hasan and Husayn, saying: "Your father Ibrahim used to seek protection for Ismail and Isaac with these words."',
    explanation:'This ancient dua has been passed down through the prophets from Ibrahim ﷺ. It is especially recommended when entering a new place, for children, when feeling fear, or when in an unfamiliar environment. The protection of "the perfect words of Allah" is comprehensive — covering jinn, harmful creatures, and the evil eye.'
  },
  {
    cat:'protection',
    ar:'حَسْبِيَ اللَّهُ لَا إِلَهَ إِلَّا هُوَ، عَلَيْهِ تَوَكَّلْتُ، وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ',
    trans:'Hasbiyallahu la ilaha illa huwa, \'alayhi tawakkaltu, wa huwa rabbul-arshil-\'azim',
    meaning:'Allah is sufficient for me. There is no god except Him. In Him I have placed my trust. He is the Lord of the Mighty Throne.',
    count:'7x (morning and evening)', source:'Abu Dawud 5081 — Hasan',
    virtue:'Whoever says this seven times in the morning and evening, Allah will take care of his worries of this world and the Hereafter.',
    explanation:'This dua is taken from the Quran (9:129) and represents the ultimate declaration of sufficiency and trust. "Hasbiyallah" (Allah is enough for me) is a statement that spans the heights of tawakkul. The scholar Ibn Qayyim al-Jawziyyah said that these seven words, when said with true conviction, can drive away the biggest of anxieties.'
  },
  {
    cat:'protection',
    ar:'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْبَرَصِ، وَالْجُنُونِ، وَالْجُذَامِ، وَمِنْ سَيِّئِ الْأَسْقَامِ',
    trans:'Allahumma inni a\'udhu bika minal-baras, wal-junun, wal-judhaam, wa min sayyi\'il-asqam',
    meaning:'O Allah, I seek refuge in You from leprosy, madness, elephantiasis, and evil diseases.',
    count:'1x', source:'Abu Dawud 1554 — Sahih',
    virtue:'The Prophet ﷺ taught this dua as protection from debilitating diseases that remove reason, dignity, or physical wholeness.',
    explanation:'The four conditions mentioned represent four major categories of affliction: skin diseases (leprosy), loss of reason (madness), severe bodily disfigurement (elephantiasis), and all other evil diseases. Seeking refuge from these each day is both a dua for health and a reminder of gratitude for our current state of wellness.'
  },

  // ══ QURAN-BASED ══
  {
    cat:'quran',
    ar:'آيَةُ الْكُرْسِيّ ﴿اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ﴾',
    trans:'Ayat al-Kursi — Al-Baqarah 2:255',
    meaning:'Allah — there is no deity except Him, the Ever-Living, the Sustainer of existence. Neither drowsiness overtakes Him nor sleep. To Him belongs whatever is in the heavens and whatever is on the earth...',
    count:'After every obligatory prayer + before sleep', source:'Al-Baqarah 2:255; Sahih Bukhari 2311',
    virtue:'The greatest verse in the Quran. Whoever recites it after every obligatory prayer, nothing prevents him from entering Paradise except death. Whoever recites it before sleep is protected by Allah until morning.',
    explanation:'Ayat al-Kursi is called the Master of all verses (Sayyid al-Ayat) because it describes Allah\'s attributes in the most comprehensive way: His eternal life, His self-sufficiency, His perfect knowledge, His sovereignty, His intercession system, and His Throne that encompasses all creation. Ibn Taymiyyah described this verse as the greatest description of Allah in all of existence.'
  },
  {
    cat:'quran',
    ar:'قُلْ هُوَ اللَّهُ أَحَدٌ • قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ • قُلْ أَعُوذُ بِرَبِّ النَّاسِ',
    trans:'Al-Ikhlas + Al-Falaq + An-Naas (The Three Quls)',
    meaning:'Say: He is Allah, the One... / Say: I seek refuge in the Lord of Daybreak... / Say: I seek refuge in the Lord of Mankind...',
    count:'3x (morning, evening, before sleep)', source:'Abu Dawud 5082, Tirmidhi 3575 — Sahih',
    virtue:'The Prophet ﷺ said: "Reciting them three times in the morning and evening is sufficient protection from everything." Before sleep, he would recite them and blow into his hands and wipe over his body.',
    explanation:'Al-Ikhlas purifies tawhid (Al-Ikhlas means "sincerity/purity"). Al-Falaq seeks protection from external evils (darkness, magic, envy). An-Naas seeks protection from internal evil (whispering of Shaytan into the chest). Together, the Three Quls form a complete spiritual shield covering the soul from all directions.'
  },
  {
    cat:'quran',
    ar:'لَا إِلَهَ إِلَّا اللَّهُ الْحَلِيمُ الْكَرِيمُ، سُبْحَانَ اللَّهِ رَبِّ الْعَرْشِ الْعَظِيمِ',
    trans:'La ilaha illallahul-halimul-karim, subhanallahi rabbil-arshil-\'azim',
    meaning:'There is no god except Allah, the Forbearing, the Generous. Glory be to Allah, Lord of the Magnificent Throne.',
    count:'Said in times of difficulty', source:'Sahih Bukhari 6346',
    virtue:'The Prophet ﷺ would say this when faced with something serious or distressing.',
    explanation:'Two of Allah\'s names are highlighted in this dhikr during difficulties: Al-Halim (the Forbearing — He does not rush to punish) and Al-Karim (the Generous — He gives without expecting return). Combined with the glorification of the Lord of the Magnificent Throne, this dhikr reminds the believer that the One who controls all things is patient, generous, and magnificent.'
  },
  {
    cat:'quran',
    ar:'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
    trans:'Rabbana atina fid-dunya hasanatan wa fil-akhirati hasanatan wa qina \'adhaban-nar',
    meaning:'Our Lord, give us good in this world and good in the Hereafter, and protect us from the punishment of the Fire.',
    count:'Frequently', source:'Al-Baqarah 2:201; Sahih Bukhari 6389',
    virtue:'Anas ibn Malik RA reported that this was the dua the Prophet ﷺ made most frequently.',
    explanation:'This is described as the most comprehensive dua in existence, because it asks for "good" (hasanah) in both worlds without specifying what that good is — leaving it to Allah to decide what is best. The scholars say that "hasanah" in this world includes health, knowledge, righteous family, wealth, and all other blessings. "Hasanah" in the Hereafter means Paradise and the pleasure of Allah.'
  },

  // ══ GENERAL ══
  {
    cat:'general',
    ar:'لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
    trans:'La ilaha illallahu wahdahu la sharika lahu, lahul-mulku wa lahul-hamdu wa huwa \'ala kulli shay\'in qadir',
    meaning:'There is no god worthy of worship except Allah, alone, without partner. To Him belongs dominion and all praise, and He is powerful over all things.',
    count:'100x daily', source:'Sahih Bukhari 6403',
    virtue:'Whoever says this 100 times: it equals freeing 10 slaves, 100 good deeds are recorded, 100 sins are erased, and it is a protection from Shaytan for the whole day.',
    explanation:'This is the most complete formula of tawhid. It combines three powerful declarations: the negation of all false gods (La ilaha), the affirmation of Allah alone (illallah), the declaration of His absolute sovereignty (lahul-mulk), and the acknowledgment of His all-encompassing power (ala kulli shay\'in qadir). The Prophet ﷺ called it "the best of dhikr."'
  },
  {
    cat:'general',
    ar:'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ، سُبْحَانَ اللَّهِ الْعَظِيمِ',
    trans:'Subhanallahi wa bihamdihi, Subhanallahil-Azim',
    meaning:'Glory and praise be to Allah. Glory be to Allah the Magnificent.',
    count:'Frequently', source:'Sahih Bukhari 6682',
    virtue:'The Prophet ﷺ said: "Two words are light on the tongue, heavy on the scales, and beloved to Ar-Rahman: \'Subhanallahi wa bihamdihi, Subhanallahil-\'Azim.\'"',
    explanation:'These two phrases are among the most beloved words to Allah. Despite being brief, they carry enormous weight on the Scale of Deeds on Judgement Day. The Prophet ﷺ specifically highlighted that Allah loves these words — making them a direct connection between the believer\'s tongue and the love of the Most Merciful.'
  },
  {
    cat:'general',
    ar:'لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ',
    trans:'La hawla wa la quwwata illa billah',
    meaning:'There is no might and no power except with Allah.',
    count:'Frequently', source:'Sahih Bukhari 6384',
    virtue:'The Prophet ﷺ told Abu Musa al-Ash\'ari: "Should I not guide you to a treasure from the treasures of Paradise? It is \'La hawla wa la quwwata illa billah.\'"',
    explanation:'Known as "Al-Hawqala," this short phrase is a treasury of Paradise. It is the ultimate acknowledgment that we have no ability to avoid sin or to do good acts except through the strength given to us by Allah. It is recommended to say it whenever one feels weak, overwhelmed, or in need of help — and the Prophet ﷺ called it a treasure of Paradise.'
  },
  {
    cat:'general',
    ar:'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ',
    trans:'Allahumma salli \'ala Muhammadin wa \'ala ali Muhammadin kama sallayta \'ala Ibrahima wa \'ala ali Ibrahim, innaka Hamidun Majid',
    meaning:'O Allah, send Your blessings upon Muhammad and the family of Muhammad, just as You sent Your blessings upon Ibrahim and the family of Ibrahim. Indeed, You are the Praised and Glorious.',
    count:'Frequently (especially Fridays)', source:'Sahih Bukhari 3370',
    virtue:'Whoever sends one blessing upon the Prophet ﷺ, Allah sends ten blessings upon him. On Fridays, the rewards are multiplied.',
    explanation:'This is the complete Salawat Ibrahim, taught by the Prophet ﷺ himself when the companions asked how to send blessings upon him. Sending Salawat is not just an act of love — it is a direct cause of Allah sending blessings back upon the one who recites it tenfold. Imam al-Busiri devoted an entire masterpiece (Qasida al-Burda) to the love expressed in Salawat.'
  },

  // ══ TRAVEL ══
  {
    cat:'travel',
    ar:'سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ، وَإِنَّا إِلَى رَبِّنَا لَمُنقَلِبُونَ',
    trans:'Subhanal-ladhi sakhkhara lana hadha wa ma kunna lahu muqrinin, wa inna ila rabbina lamunqalibun',
    meaning:'Glory be to Him who has subjected this for us and we were not capable of subduing it. And verily to our Lord we will surely return.',
    count:'1x (when riding or traveling)', source:'Sahih Muslim 1342',
    virtue:'The Prophet ﷺ said this when beginning a journey, and the companions would say Allahu Akbar three times at the start of travel.',
    explanation:'This verse (Quran 43:13-14) reminds travelers that the ability to travel — whether by vehicle, ship, or any means — is a gift from Allah. The creature we ride or the machine we use has been "subjected" to us by divine arrangement, not by our own power. The second line — "to our Lord we return" — keeps the final destination present in mind even during temporary earthly journeys.'
  },
  {
    cat:'travel',
    ar:'اللَّهُمَّ إِنَّا نَسْأَلُكَ فِي سَفَرِنَا هَذَا الْبِرَّ وَالتَّقْوَى، وَمِنَ الْعَمَلِ مَا تَرْضَى، اللَّهُمَّ هَوِّنْ عَلَيْنَا سَفَرَنَا هَذَا وَاطْوِ عَنَّا بُعْدَهُ',
    trans:'Allahumma inna nas\'aluka fi safarina hadhal-birra wat-taqwa, wa minal-\'amali ma tarda, Allahumma hawwin \'alayna safarana hadha wat wi \'anna bu\'dahu',
    meaning:'O Allah, we ask You on this journey for goodness, piety, and deeds that please You. O Allah, make this journey easy for us and shorten its distance for us.',
    count:'1x (when setting out on a journey)', source:'Sahih Muslim 1342',
    virtue:'This comprehensive travel dua covers both the spiritual and physical aspects of the journey: righteousness, piety, pleasing deeds, ease, and shortening of distance.',
    explanation:'This is the complete dua the Prophet ﷺ said when departing for a journey. It asks for three spiritual qualities (birr, taqwa, good deeds) and two practical requests (ease of travel and shortening of distance). The scholars note that when one\'s journey is spiritually sound, the physical journey also becomes easier by divine facilitation.'
  },

  // ══ ANXIETY & STRESS ══
  {
    cat:'stress',
    ar:'اللَّهُمَّ إِنِّي عَبْدُكَ وَابْنُ عَبْدِكَ وَابْنُ أَمَتِكَ، نَاصِيَتِي بِيَدِكَ، مَاضٍ فِيَّ حُكْمُكَ، عَدْلٌ فِيَّ قَضَاؤُكَ، أَسْأَلُكَ بِكُلِّ اسْمٍ هُوَ لَكَ، سَمَّيْتَ بِهِ نَفْسَكَ، أَوْ أَنْزَلْتَهُ فِي كِتَابِكَ، أَوْ عَلَّمْتَهُ أَحَدًا مِنْ خَلْقِكَ، أَوِ اسْتَأْثَرْتَ بِهِ فِي عِلْمِ الْغَيْبِ عِنْدَكَ، أَنْ تَجْعَلَ الْقُرْآنَ رَبِيعَ قَلْبِي، وَنُورَ صَدْرِي، وَجَلَاءَ حُزْنِي، وَذَهَابَ هَمِّي',
    trans:'Allahumma inni \'abduka wabnu \'abdika wabnu amatik, nasiyati biyadik, madin fiyya hukmuk, \'adlun fiyya qada\'uk, as\'aluka bikulli ismin huwa lak, sammayta bihi nafsak, aw anzaltahu fi kitabik, aw \'allamtahu ahadan min khalqik, aw ista\'tharta bihi fi \'ilmil-ghaybi \'indak, an taj\'alal-Qurana rabbi\'a qalbi, wa nura sadri, wa jala\'a huzni, wa dhahaba hammi',
    meaning:'O Allah, I am Your servant, son of Your servant, son of Your maidservant. My forelock is in Your hand. Your decree over me is just. I ask You by every name belonging to You which You named Yourself with, or revealed in Your Book, or taught to any of Your creation, or have preserved in the knowledge of the unseen with You — to make the Quran the spring of my heart, the light of my chest, the banisher of my sadness, and the reliever of my distress.',
    count:'1x (when feeling grief or anxiety)', source:'Ahmed 3712 — Sahih (Ibn Hibban)',
    virtue:'The Prophet ﷺ said: "No one afflicted with anxiety or sadness says this except that Allah will replace their grief with joy." The companions asked: "Should we learn these words?" He said: "Yes, whoever hears them should learn them."',
    explanation:'This is perhaps the most powerful dua for anxiety and depression in the entire Sunnah. It begins with a complete acknowledgment of servitude, then asks with ALL of Allah\'s names — including those we don\'t know — to make the Quran the medicine for the heart. The four requests at the end (spring of heart, light of chest, banisher of sadness, reliever of distress) address every dimension of emotional suffering.'
  },
  {
    cat:'stress',
    ar:'لَا إِلَهَ إِلَّا أَنتَ سُبْحَانَكَ إِنِّي كُنتُ مِنَ الظَّالِمِينَ',
    trans:'La ilaha illa anta subhanaka inni kuntu minaz-zalimin',
    meaning:'There is no god except You. Glory be to You. Indeed, I have been among the wrongdoers.',
    count:'Frequently in difficulty', source:'Al-Anbiya 21:87 — Dua of Yunus ﷺ',
    virtue:'The Prophet ﷺ said: "The supplication of Dhu al-Nun (Yunus) which he said while in the belly of the whale — no Muslim man says it while in distress except that Allah will relieve him."',
    explanation:'This was the dua of Prophet Yunus (Jonah) ﷺ from inside the belly of the whale — the most extreme situation of darkness and isolation imaginable. Three layers of darkness surrounded him: the whale\'s stomach, the depths of the sea, and the darkness of night. Yet this dua of tawhid, glorification, and admission of wrongdoing was answered immediately. The scholars say it is especially powerful because it combines all the elements of a perfect prayer: acknowledgment of Allah\'s oneness, praise of His perfection, and humble admission of one\'s own faults.'
  },
  {
    cat:'stress',
    ar:'حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ',
    trans:'Hasbunallahu wa ni\'mal-wakil',
    meaning:'Allah is sufficient for us, and He is the best Disposer of affairs.',
    count:'Frequently', source:'Al-Imran 3:173; Sahih Bukhari 4563',
    virtue:'The Prophet Ibrahim ﷺ said this when thrown into the fire. The Prophet Muhammad ﷺ and his companions said this at Badr when told a great army was gathering against them.',
    explanation:'This phrase has been the response of prophets and believers to seemingly impossible threats. When Ibrahim ﷺ said it, the fire became "cool and peaceful" for him. When the companions said it facing an overwhelming army, Allah made the battle a great victory. It is a declaration that when Allah is on your side, no worldly force — however great — can overcome you.'
  },
];

const CATS_LIST = ['all','morning','evening','afterprayer','sleep','protection','quran','general','travel','stress'];

function render_dhikr_page(lang) {
  _lang = lang;

  const catHtml = CATS.map(c=>`
    <button class="dh-filter${c.id==='all'?' active':''}" data-cat="${c.id}">
      <i class="${c.icon}"></i> ${ui(c.id)}
    </button>`).join('');

  return `
<div class="pg-hd">
  <div class="pg-hd-ic"><i class="ri-hand-heart-fill"></i></div>
  <h1>${ui('title')}</h1>
  <p>${ui('subtitle')}</p>
</div>
<div class="pg-body">
  <div class="dh-filters rv" id="dhFilters">${catHtml}</div>
  <div class="dh-list rv rv-d1" id="dhList"></div>
</div>
<footer class="ft"><i class="ri-heart-fill"></i> ${ui('ummah')}</footer>`;
}

function renderDhikrCards(cat) {
  const list = cat==='all' ? DHIKR : DHIKR.filter(d=>d.cat===cat);
  const container = document.getElementById('dhList');
  if (!container) return;

  container.innerHTML = list.map((d,i)=>`
    <div class="dhn-card rv${i>0?` rv-d${Math.min(i%5,4)}`:''}">
      <div class="dhn-arabic">${d.ar}</div>
      <div class="dhn-meta">
        <span class="dhn-count"><i class="ri-repeat-line"></i> ${d.count}</span>
        <span class="dhn-src"><i class="ri-book-open-line"></i> ${d.source}</span>
      </div>

      <!-- Transliteration -->
      <div class="dhn-section">
        <button class="dhn-toggle" data-idx="${i}" data-type="trans">
          <i class="ri-text-wrap"></i> ${ui('transliteration')} <i class="ri-arrow-down-s-line dhn-chev"></i>
        </button>
        <div class="dhn-body" id="dhn-trans-${i}" style="display:none">
          <p class="dhn-trans-text">${d.trans}</p>
        </div>
      </div>

      <!-- Translation -->
      <div class="dhn-section">
        <button class="dhn-toggle" data-idx="${i}" data-type="meaning">
          <i class="ri-translate-2"></i> ${ui('translation')} <i class="ri-arrow-down-s-line dhn-chev"></i>
        </button>
        <div class="dhn-body" id="dhn-meaning-${i}" style="display:none">
          <p>${d.meaning}</p>
        </div>
      </div>

      <!-- Virtue -->
      <div class="dhn-section">
        <button class="dhn-toggle" data-idx="${i}" data-type="virtue">
          <i class="ri-award-line"></i> ${ui('virtue')} <i class="ri-arrow-down-s-line dhn-chev"></i>
        </button>
        <div class="dhn-body dhn-virtue" id="dhn-virtue-${i}" style="display:none">
          <p>${d.virtue}</p>
        </div>
      </div>

      <!-- Explanation -->
      <div class="dhn-section">
        <button class="dhn-toggle" data-idx="${i}" data-type="explanation">
          <i class="ri-lightbulb-line"></i> ${ui('explanation')} <i class="ri-arrow-down-s-line dhn-chev"></i>
        </button>
        <div class="dhn-body dhn-explanation" id="dhn-explanation-${i}" style="display:none">
          <p>${d.explanation}</p>
        </div>
      </div>
    </div>`).join('');

  // Wire toggles
  container.querySelectorAll('.dhn-toggle').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const idx  = btn.dataset.idx;
      const type = btn.dataset.type;
      const body = document.getElementById(`dhn-${type}-${idx}`);
      const chev = btn.querySelector('.dhn-chev');
      const open = body.style.display==='block';
      body.style.display = open?'none':'block';
      if(chev) chev.style.transform = open?'':'rotate(180deg)';
      btn.classList.toggle('open',!open);
    });
  });
}

const Dhikr = {
  render(lang) { return render_dhikr_page(lang); },

  init(lang) {
    _lang=lang;
    renderDhikrCards('all');

    document.getElementById('dhFilters')?.addEventListener('click', e=>{
      const btn=e.target.closest('.dh-filter'); if(!btn) return;
      document.querySelectorAll('.dh-filter').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      renderDhikrCards(btn.dataset.cat);
    });
  }
};

export default Dhikr;
