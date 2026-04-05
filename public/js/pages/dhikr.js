// ═══════════════════════════════════════════════════
// NOOR — pages/dhikr.js  (fixed — no nested templates)
// ═══════════════════════════════════════════════════

let _lang = 'en';

const LABELS = {
  title:    { en:'Dhikr & Duas',      ar:'الأذكار والأدعية',     fr:'Dhikr & Douâs',      tr:'Zikir & Dualar',    ur:'ذکر و دعا',        id:'Dzikir & Doa'       },
  sub:      { en:'Authentic supplications from the Quran & Sunnah.', ar:'أذكار وأدعية من القرآن والسنة.', fr:'Du Coran et de la Sunnah.', tr:'Kuran ve Sunnetten.', ur:'قرآن و سنت سے مستند اذکار۔', id:'Dari Quran & Sunnah.' },
  translit: { en:'Transliteration',   ar:'النطق',                fr:'Translitération',     tr:'Telaffuz',          ur:'تلفظ',             id:'Transliterasi'      },
  meaning:  { en:'Translation',       ar:'الترجمة',              fr:'Traduction',          tr:'Çeviri',            ur:'ترجمہ',            id:'Terjemahan'         },
  virtue:   { en:'Virtue',            ar:'الفضيلة',              fr:'Vertu',               tr:'Fazilet',           ur:'فضیلت',            id:'Keutamaan'          },
  explain:  { en:'Explanation',       ar:'الشرح',                fr:'Explication',         tr:'Açıklama',          ur:'تشریح',            id:'Penjelasan'         },
  ummah:    { en:'Built for the Ummah', ar:'صُنع للأمة',         fr:"Pour l'Oumma",       tr:'Ümmet için',        ur:'امت کے لیے',      id:'Untuk Umat'         },
  all:      { en:'All',               ar:'الكل',                  fr:'Tout',               tr:'Hepsi',             ur:'سب',               id:'Semua'              },
  morning:  { en:'Morning',           ar:'الصباح',               fr:'Matin',               tr:'Sabah',             ur:'صبح',              id:'Pagi'               },
  evening:  { en:'Evening',           ar:'المساء',               fr:'Soir',                tr:'Akşam',             ur:'شام',              id:'Sore'               },
  after:    { en:'After Prayer',      ar:'بعد الصلاة',           fr:'Après prière',        tr:'Namazdan sonra',    ur:'نماز کے بعد',     id:'Setelah Shalat'     },
  sleep:    { en:'Sleep',             ar:'النوم',                 fr:'Sommeil',             tr:'Uyku',              ur:'سونا',             id:'Tidur'              },
  protect:  { en:'Protection',        ar:'الحماية',              fr:'Protection',          tr:'Koruma',            ur:'حفاظت',            id:'Perlindungan'       },
  quran:    { en:'From Quran',        ar:'من القرآن',             fr:'Du Coran',            tr:"Kuran'dan",         ur:'قرآن سے',         id:'Dari Quran'         },
  general:  { en:'General',           ar:'عام',                   fr:'Général',             tr:'Genel',             ur:'عمومی',            id:'Umum'               },
  travel:   { en:'Travel',            ar:'السفر',                 fr:'Voyage',              tr:'Yolculuk',          ur:'سفر',              id:'Perjalanan'         },
  stress:   { en:'Anxiety',           ar:'القلق',                 fr:'Anxiété',             tr:'Stres',             ur:'پریشانی',          id:'Kecemasan'          },
};
function L(k) { return (LABELS[k] && (LABELS[k][_lang] || LABELS[k].en)) || k; }

const CATS = [
  { id:'all',     key:'all',     icon:'ri-apps-2-line'        },
  { id:'morning', key:'morning', icon:'ri-sun-line'           },
  { id:'evening', key:'evening', icon:'ri-moon-line'          },
  { id:'after',   key:'after',   icon:'ri-hand-heart-line'    },
  { id:'sleep',   key:'sleep',   icon:'ri-hotel-bed-line'     },
  { id:'protect', key:'protect', icon:'ri-shield-star-line'   },
  { id:'quran',   key:'quran',   icon:'ri-book-open-line'     },
  { id:'general', key:'general', icon:'ri-heart-3-line'       },
  { id:'travel',  key:'travel',  icon:'ri-plane-line'         },
  { id:'stress',  key:'stress',  icon:'ri-user-heart-line'    },
];

// Each dhikr has: cat, ar, trans, meaning, count, source, virtue, explanation
const DHIKR = [
  // ══ MORNING ══
  { cat:'morning',
    ar:'اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ النُّشُورُ',
    trans:'Allahumma bika asbahna, wa bika amsayna, wa bika nahya, wa bika namutu, wa ilaykan-nushur',
    meaning:'O Allah, by You we enter the morning, by You we enter the evening, by You we live, by You we die, and to You is the resurrection.',
    count:'1x', source:'Tirmidhi 3391',
    virtue:'This dua acknowledges that all beginnings and endings are with Allah, establishing complete reliance from the very first moment of the day.',
    explanation:'Reciting this dhikr ties your entire day to Allah alone. It is a declaration of total dependence — that life and death are in His hands alone. The great scholar Ibn Qayyim said this dua is the foundation of the morning adhkar.' },

  { cat:'morning',
    ar:'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ',
    trans:'Asbahna wa asbahal-mulku lillah, wal-hamdu lillah, la ilaha illallahu wahdahu la sharika lah',
    meaning:'We have entered the morning, and the dominion belongs to Allah. All praise is for Allah. There is no god worthy of worship except Allah, alone, without partner.',
    count:'1x', source:'Sahih Muslim 2723',
    virtue:'The Prophet (peace be upon him) taught this as a way to start the day with gratitude and tawhid.',
    explanation:'This dhikr begins the morning by affirming that the kingdom of the heavens and earth belongs to Allah. It is an act of submission, recognizing that nothing we see or experience is truly ours — it all belongs to the Creator.' },

  { cat:'morning',
    ar:'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ',
    trans:'Subhan Allahi wa bihamdihi',
    meaning:'Glory be to Allah and all praise is for Him.',
    count:'100x', source:'Sahih Muslim 2692',
    virtue:'Whoever says this 100 times in the morning will have his sins forgiven, even if they are like the foam of the sea.',
    explanation:'This short yet powerful dhikr carries an enormous reward. The Prophet (peace be upon him) said: "Whoever says this a hundred times during the day, his sins will be wiped away, even if they are like the foam of the sea." It is one of the most recommended morning adhkar for its simplicity and immense virtue.' },

  { cat:'morning',
    ar:'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ',
    trans:'Allahumma anta rabbi la ilaha illa ant, khalaqtani wa ana abduk, wa ana ala ahdika wa wa\'dika mastata\'tu, a\'udhu bika min sharri ma sana\'tu, abu\'u laka bini\'matika \'alayya, wa abu\'u bidhanbi faghfir li',
    meaning:'O Allah, You are my Lord. There is no god except You. You created me and I am Your servant. I am upon Your covenant and promise. I seek refuge in You from the evil of what I have done. I acknowledge Your favors upon me and I acknowledge my sins, so forgive me.',
    count:'1x', source:'Sahih Bukhari 6306',
    virtue:'This is Sayyid al-Istighfar — the Master of seeking forgiveness. Whoever says it in the morning with certainty and dies that day will enter Paradise.',
    explanation:'Called "Sayyid al-Istighfar" by the Prophet (peace be upon him), this dua is the most complete act of seeking forgiveness. It contains recognition of Allah\'s lordship, acknowledgment of servitude, confession of sins, and total dependence on Allah for forgiveness.' },

  { cat:'morning',
    ar:'رَضِيتُ بِاللَّهِ رَبًّا، وَبِالإِسْلاَمِ دِينًا، وَبِمُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ نَبِيًّا',
    trans:'Raditu billahi rabban, wa bil-Islami dinan, wa bi-Muhammadin sallallahu \'alayhi wa sallam nabiyyan',
    meaning:'I am pleased with Allah as my Lord, with Islam as my religion, and with Muhammad (peace be upon him) as my Prophet.',
    count:'3x', source:'Abu Dawud 1529, Ibn Majah 925',
    virtue:'Whoever says this three times in the morning and evening, Allah will be pleased with him on the Day of Judgement.',
    explanation:'This is a profound declaration of contentment and iman. It is a renewal of the covenant between the believer and their Lord every morning. It combines the three foundations of the deen in a single breath.' },

  // ══ EVENING ══
  { cat:'evening',
    ar:'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ',
    trans:'Amsayna wa amsal-mulku lillah, wal-hamdu lillah, la ilaha illallahu wahdahu la sharika lah',
    meaning:'We have entered the evening, and the dominion belongs to Allah. All praise is for Allah. There is no god worthy of worship except Allah, alone, without partner.',
    count:'1x', source:'Sahih Muslim 2723',
    virtue:'This is the evening counterpart of the morning dua, closing the day with the same declaration of tawhid.',
    explanation:'Just as the morning began with acknowledging Allah\'s ownership of all dominion, the evening ends with the same declaration. This creates a full circle of remembrance — beginning the day with Allah and ending it with Allah.' },

  { cat:'evening',
    ar:'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ',
    trans:"A'udhu bikalimatillahit-tammati min sharri ma khalaq",
    meaning:'I seek refuge in the perfect words of Allah from the evil of what He has created.',
    count:'3x', source:'Sahih Muslim 2708',
    virtue:'Whoever says this three times in the evening will be protected from insect stings that night.',
    explanation:'The "perfect words of Allah" refers to the Quran and all the names and attributes of Allah. This dua is a comprehensive shield against every form of harm from creation.' },

  { cat:'evening',
    ar:'اللَّهُمَّ إِنِّي أَمْسَيْتُ أُشْهِدُكَ، وَأُشْهِدُ حَمَلَةَ عَرْشِكَ، وَمَلَائِكَتَكَ، وَجَمِيعَ خَلْقِكَ، أَنَّكَ أَنْتَ اللَّهُ لَا إِلَهَ إِلَّا أَنْتَ وَحْدَكَ لَا شَرِيكَ لَكَ',
    trans:'Allahumma inni amsaytu ushiduka wa ushidu hamalata arshika wa mala\'ikataka wa jami\'a khalqika annaka antallahu la ilaha illa anta wahdaka la sharika lak',
    meaning:'O Allah, I have entered the evening calling You to witness, and calling to witness the bearers of Your throne, Your angels, and all of Your creation, that You are Allah, there is no god worthy of worship except You alone, without partner.',
    count:'4x', source:'Abu Dawud 5069',
    virtue:'Whoever says this 4 times in the morning or evening, Allah will free a quarter of him from the Hellfire for each time.',
    explanation:'This remarkable dhikr calls all of creation as witnesses to one\'s declaration of tawhid and iman. By saying it four times, you have made all of creation — angels, the bearers of Allah\'s throne, and every created thing — witnesses to your faith.' },

  // ══ AFTER PRAYER ══
  { cat:'after',
    ar:'أَسْتَغْفِرُ اللَّهَ',
    trans:'Astaghfirullah',
    meaning:'I seek forgiveness from Allah.',
    count:'3x', source:'Sahih Muslim 591',
    virtue:'The Prophet (peace be upon him) used to say this three times immediately after finishing his prayer.',
    explanation:'Even after completing the most perfect form of worship, the Prophet (peace be upon him) would immediately seek forgiveness. This teaches us that however good our worship may be, it always falls short of the glory of Allah, and istighfar after prayer polishes the prayer and fills any gaps.' },

  { cat:'after',
    ar:'اللَّهُمَّ أَنْتَ السَّلَامُ، وَمِنْكَ السَّلَامُ، تَبَارَكْتَ يَا ذَا الْجَلالِ وَالإِكْرَامِ',
    trans:'Allahumma anta as-salam, wa minka as-salam, tabarakta ya dhal-jalali wal-ikram',
    meaning:'O Allah, You are Peace (As-Salam) and from You comes peace. Blessed are You, O Possessor of Majesty and Honor.',
    count:'1x', source:'Sahih Muslim 592',
    virtue:'This is the first dhikr the Prophet (peace be upon him) taught after salah.',
    explanation:'After salah — which ends with the greeting of peace — we acknowledge that all peace comes from Allah. We then praise Him with two of His most majestic names: Dhul-Jalal (Possessor of Majesty) and Al-Ikram (Generous to His creation).' },

  { cat:'after',
    ar:'سُبْحَانَ اللَّهِ (٣٣) • الْحَمْدُ لِلَّهِ (٣٣) • اللَّهُ أَكْبَرُ (٣٣)',
    trans:'Subhanallah (33) • Alhamdulillah (33) • Allahu Akbar (33)',
    meaning:'Glory be to Allah 33 times — All Praise is for Allah 33 times — Allah is the Greatest 33 times, then complete with: La ilaha illallah wahdahu la sharika lah, lahul-mulku wa lahul-hamdu wa huwa ala kulli shay\'in qadir.',
    count:'33x each + 1', source:'Sahih Muslim 595',
    virtue:'Whoever glorifies Allah, praises Him, and exalts Him 33 times each after prayer — and completes the hundred — his sins will be forgiven even if they are like the foam of the sea.',
    explanation:'This three-part tasbih is one of the most established Sunnah acts after prayer. Subhanallah declares Allah\'s freedom from imperfection; Alhamdulillah declares His perfect worthiness of all praise; Allahu Akbar declares that He is greater than everything we can imagine.' },

  { cat:'after',
    ar:'اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ، وَشُكْرِكَ، وَحُسْنِ عِبَادَتِكَ',
    trans:'Allahumma a\'inni \'ala dhikrika, wa shukrika, wa husni \'ibadatik',
    meaning:'O Allah, help me to remember You, to be grateful to You, and to worship You in an excellent manner.',
    count:'1x', source:'Abu Dawud 1522',
    virtue:'The Prophet (peace be upon him) instructed Mu\'adh ibn Jabal: "O Mu\'adh, by Allah I love you, so do not forget to say after every prayer..." (Abu Dawud)',
    explanation:'This dua asks Allah to help with the very things that help us draw closer to Allah — remembrance, gratitude, and good worship. It is a circle of divine help: we ask Allah to help us remember Him, because only with His help can we truly do so.' },

  // ══ SLEEP ══
  { cat:'sleep',
    ar:'بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا',
    trans:'Bismika Allahumma amutu wa ahya',
    meaning:'In Your name, O Allah, I die and I live.',
    count:'1x', source:'Sahih Bukhari 6324',
    virtue:'The Prophet (peace be upon him) said this every night before sleeping, using sleep as a metaphor for death to prepare the soul.',
    explanation:'Sleep is called the "minor death" in Islam. The soul leaves the body during sleep and returns upon waking, just as it leaves at death and returns at resurrection. Saying this dua is a reminder of our mortality.' },

  { cat:'sleep',
    ar:'اللَّهُمَّ أَسْلَمْتُ نَفْسِي إِلَيْكَ، وَوَجَّهْتُ وَجْهِي إِلَيْكَ، وَفَوَّضْتُ أَمْرِي إِلَيْكَ، وَأَلْجَأْتُ ظَهْرِي إِلَيْكَ، رَغْبَةً وَرَهْبَةً إِلَيْكَ، اللَّهُمَّ آمَنْتُ بِكِتَابِكَ الَّذِي أَنْزَلْتَ وَبِنَبِيِّكَ الَّذِي أَرْسَلْتَ',
    trans:'Allahumma aslamtu nafsi ilayk, wa wajjahtu wajhi ilayk, wa fawwadtu amri ilayk, wa alja\'tu zahri ilayk, raghbatan wa rahbatan ilayk, Allahumma amantu bikitabikal-ladhi anzalt wa binabiyyikal-ladhi arsalt',
    meaning:'O Allah, I surrender myself to You, I direct my face to You, I entrust my affairs to You, I press my back against You out of desire and fear. O Allah, I believe in Your Book which You revealed and in Your Prophet whom You sent.',
    count:'1x', source:'Sahih Bukhari 247',
    virtue:'The Prophet (peace be upon him) said: "If you die tonight, you will die upon the fitrah. Make these words the last thing you say."',
    explanation:'This dua before sleeping is the ultimate act of surrender. It covers five dimensions of submission: surrendering the self, directing the face, entrusting all affairs, leaning on Allah for support, and confirming belief in the Book and Prophet.' },

  { cat:'sleep',
    ar:'سُبْحَانَ اللَّهِ (٣٣) • الْحَمْدُ لِلَّهِ (٣٣) • اللَّهُ أَكْبَرُ (٣٤)',
    trans:'Subhanallah (33) • Alhamdulillah (33) • Allahu Akbar (34)',
    meaning:'Glory be to Allah 33 times — All praise is for Allah 33 times — Allah is the Greatest 34 times.',
    count:'33+33+34', source:'Sahih Bukhari 3113',
    virtue:'The Prophet (peace be upon him) gave this to Fatimah (RA) when she asked for a servant: "This is better for you than a servant."',
    explanation:'Known as the "Tasbih of Fatimah," this nighttime dhikr was given by the Prophet to his beloved daughter. The scholars recommend it especially for those who feel tired at the end of the day, as it fills the night with the remembrance of Allah.' },

  // ══ PROTECTION ══
  { cat:'protect',
    ar:'بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ',
    trans:'Bismillahil-ladhi la yadurru ma\'asmihi shay\'un fil-ardi wa la fis-sama\'i wa huwas-sami\'ul-\'alim',
    meaning:'In the name of Allah, with whose name nothing can cause harm on earth or in the heavens, and He is the All-Hearing, the All-Knowing.',
    count:'3x morning and evening', source:'Tirmidhi 3388',
    virtue:'Whoever says this three times in the morning and three times in the evening, nothing will harm him.',
    explanation:'This is one of the most powerful protection formulas in Islam. It invokes the name of Allah as a shield — because the name of Allah, when said sincerely, surrounds the believer with divine protection.' },

  { cat:'protect',
    ar:'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّةِ مِنْ كُلِّ شَيْطَانٍ وَهَامَّةٍ، وَمِنْ كُلِّ عَيْنٍ لَامَّةٍ',
    trans:"A'udhu bikalimatillahit-tammah min kulli shaytanin wa hammah, wa min kulli 'aynin lammah",
    meaning:'I seek refuge in the perfect words of Allah from every devil and every harmful creature and from every evil eye.',
    count:'When entering a new place', source:'Sahih Bukhari 3371',
    virtue:'The Prophet (peace be upon him) used to recite this for Hasan and Husayn, saying: "Your father Ibrahim used to seek protection for Ismail and Isaac with these words."',
    explanation:'This ancient dua has been passed down through the prophets from Ibrahim (peace be upon him). It is especially recommended when entering a new place, for children, when feeling fear, or when in an unfamiliar environment.' },

  { cat:'protect',
    ar:'حَسْبِيَ اللَّهُ لَا إِلَهَ إِلَّا هُوَ، عَلَيْهِ تَوَكَّلْتُ، وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ',
    trans:'Hasbiyallahu la ilaha illa huwa, \'alayhi tawakkaltu, wa huwa rabbul-arshil-\'azim',
    meaning:'Allah is sufficient for me. There is no god except Him. In Him I have placed my trust. He is the Lord of the Mighty Throne.',
    count:'7x morning and evening', source:'Abu Dawud 5081',
    virtue:'Whoever says this seven times in the morning and evening, Allah will take care of his worries of this world and the Hereafter.',
    explanation:'This dua (from Quran 9:129) represents the ultimate declaration of sufficiency and trust. "Hasbiyallah" is a statement that spans the heights of tawakkul. Ibn Qayyim said that these words, when said with true conviction, can drive away the greatest of anxieties.' },

  // ══ FROM QURAN ══
  { cat:'quran',
    ar:'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ — آيَةُ الْكُرْسِيّ',
    trans:'Allahu la ilaha illa huwal-hayyul-qayyum... (Ayat al-Kursi)',
    meaning:'Allah — there is no deity except Him, the Ever-Living, the Sustainer of existence. Neither drowsiness overtakes Him nor sleep. To Him belongs whatever is in the heavens and on the earth...',
    count:'After every prayer + before sleep', source:'Al-Baqarah 2:255; Sahih Bukhari 2311',
    virtue:'Whoever recites Ayat al-Kursi after every obligatory prayer — nothing prevents him from entering Paradise except death. Whoever recites it before sleep is protected by Allah until morning.',
    explanation:'Called the "Master of all verses," Ayat al-Kursi describes Allah\'s attributes most comprehensively: His eternal life, self-sufficiency, perfect knowledge, sovereignty, and His Throne that encompasses all creation. Ibn Taymiyyah described this verse as the greatest description of Allah in all existence.' },

  { cat:'quran',
    ar:'قُلْ هُوَ اللَّهُ أَحَدٌ — Al-Ikhlas • قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ — Al-Falaq • قُلْ أَعُوذُ بِرَبِّ النَّاسِ — An-Naas',
    trans:'The Three Quls: Al-Ikhlas + Al-Falaq + An-Naas',
    meaning:'Say: He is Allah, the One... / Say: I seek refuge in the Lord of Daybreak... / Say: I seek refuge in the Lord of Mankind...',
    count:'3x morning, evening, before sleep', source:'Abu Dawud 5082, Tirmidhi 3575',
    virtue:'The Prophet (peace be upon him) said: "Reciting them three times in the morning and evening is sufficient protection from everything."',
    explanation:'Al-Ikhlas purifies tawhid. Al-Falaq seeks protection from external evils (darkness, magic, envy). An-Naas seeks protection from internal evil (whispering of Shaytan). Together, the Three Quls form a complete spiritual shield covering the soul from all directions.' },

  { cat:'quran',
    ar:'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
    trans:'Rabbana atina fid-dunya hasanatan wa fil-akhirati hasanatan wa qina \'adhaban-nar',
    meaning:'Our Lord, give us good in this world and good in the Hereafter, and protect us from the punishment of the Fire.',
    count:'Frequently', source:'Al-Baqarah 2:201; Sahih Bukhari 6389',
    virtue:'Anas ibn Malik (RA) reported that this was the dua the Prophet (peace be upon him) made most frequently.',
    explanation:'This is described as the most comprehensive dua in existence, because it asks for "good" (hasanah) in both worlds without specifying — leaving it to Allah to decide what is best. The scholars say "hasanah" in this world includes health, knowledge, family, and all blessings.' },

  // ══ GENERAL ══
  { cat:'general',
    ar:'لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
    trans:'La ilaha illallahu wahdahu la sharika lahu, lahul-mulku wa lahul-hamdu wa huwa \'ala kulli shay\'in qadir',
    meaning:'There is no god worthy of worship except Allah, alone, without partner. To Him belongs dominion and all praise, and He is powerful over all things.',
    count:'100x daily', source:'Sahih Bukhari 6403',
    virtue:'Whoever says this 100 times: it equals freeing 10 slaves, 100 good deeds are recorded, 100 sins are erased, and it is a protection from Shaytan for the whole day.',
    explanation:'The Prophet (peace be upon him) called this "the best of dhikr." It combines the negation of all false gods, the affirmation of Allah alone, His absolute sovereignty, and His all-encompassing power in one formula.' },

  { cat:'general',
    ar:'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ، سُبْحَانَ اللَّهِ الْعَظِيمِ',
    trans:'Subhanallahi wa bihamdihi, Subhanallahil-Azim',
    meaning:'Glory and praise be to Allah. Glory be to Allah the Magnificent.',
    count:'Frequently', source:'Sahih Bukhari 6682',
    virtue:'The Prophet (peace be upon him) said: "Two words are light on the tongue, heavy on the scales, and beloved to Ar-Rahman."',
    explanation:'Despite being brief, these phrases carry enormous weight on the Scale of Deeds on Judgement Day. The Prophet (peace be upon him) specifically highlighted that Allah loves these words — making them a direct connection between the believer\'s tongue and the love of the Most Merciful.' },

  { cat:'general',
    ar:'لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ',
    trans:'La hawla wa la quwwata illa billah',
    meaning:'There is no might and no power except with Allah.',
    count:'Frequently', source:'Sahih Bukhari 6384',
    virtue:'The Prophet (peace be upon him) told Abu Musa al-Ash\'ari: "Shall I not guide you to a treasure from the treasures of Paradise?"',
    explanation:'Known as "Al-Hawqala," this short phrase is a treasury of Paradise. It is the ultimate acknowledgment that we have no ability to avoid sin or do good except through the strength given to us by Allah. Recommended whenever one feels weak or overwhelmed.' },

  { cat:'general',
    ar:'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ',
    trans:'Allahumma salli \'ala Muhammadin wa \'ala ali Muhammadin kama sallayta \'ala Ibrahima wa \'ala ali Ibrahim, innaka Hamidun Majid',
    meaning:'O Allah, send Your blessings upon Muhammad and the family of Muhammad, just as You sent Your blessings upon Ibrahim and the family of Ibrahim. Indeed, You are the Praised and Glorious.',
    count:'Frequently (especially Fridays)', source:'Sahih Bukhari 3370',
    virtue:'Whoever sends one blessing upon the Prophet (peace be upon him), Allah sends ten blessings upon him.',
    explanation:'This is the complete Salawat Ibrahim, taught by the Prophet (peace be upon him) himself. Sending Salawat is not just love — it is a direct cause of Allah sending blessings back upon the reciter tenfold.' },

  // ══ TRAVEL ══
  { cat:'travel',
    ar:'سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ، وَإِنَّا إِلَى رَبِّنَا لَمُنقَلِبُونَ',
    trans:'Subhanal-ladhi sakhkhara lana hadha wa ma kunna lahu muqrinin, wa inna ila rabbina lamunqalibun',
    meaning:'Glory be to Him who has subjected this for us and we were not capable of subduing it. And verily to our Lord we will surely return.',
    count:'1x when traveling', source:'Sahih Muslim 1342',
    virtue:'The Prophet (peace be upon him) said this when beginning a journey.',
    explanation:'This verse (Quran 43:13-14) reminds travelers that the ability to travel is a gift from Allah. The creature or machine we use has been "subjected" to us by divine arrangement, not by our own power. The second line keeps the final destination present: our return to Allah.' },

  { cat:'travel',
    ar:'اللَّهُمَّ إِنَّا نَسْأَلُكَ فِي سَفَرِنَا هَذَا الْبِرَّ وَالتَّقْوَى، وَمِنَ الْعَمَلِ مَا تَرْضَى، اللَّهُمَّ هَوِّنْ عَلَيْنَا سَفَرَنَا هَذَا',
    trans:'Allahumma inna nas\'aluka fi safarina hadhal-birra wat-taqwa, wa minal-\'amali ma tarda, Allahumma hawwin \'alayna safarana hadha',
    meaning:'O Allah, we ask You on this journey for goodness, piety, and deeds that please You. O Allah, make this journey easy for us.',
    count:'1x when setting out', source:'Sahih Muslim 1342',
    virtue:'This comprehensive travel dua covers both the spiritual and physical aspects of the journey.',
    explanation:'This is the complete dua the Prophet (peace be upon him) said when departing for a journey. It asks for three spiritual qualities (birr, taqwa, good deeds) and practical requests (ease of travel). When one\'s journey is spiritually sound, the physical journey also becomes easier by divine facilitation.' },

  // ══ ANXIETY ══
  { cat:'stress',
    ar:'اللَّهُمَّ إِنِّي عَبْدُكَ ابْنُ عَبْدِكَ ابْنُ أَمَتِكَ، نَاصِيَتِي بِيَدِكَ، أَسْأَلُكَ بِكُلِّ اسْمٍ هُوَ لَكَ، أَنْ تَجْعَلَ الْقُرْآنَ رَبِيعَ قَلْبِي، وَنُورَ صَدْرِي، وَجَلَاءَ حُزْنِي، وَذَهَابَ هَمِّي',
    trans:'Allahumma inni \'abduka wabnu \'abdika wabnu amatik, nasiyati biyadik, as\'aluka bikulli ismin huwa lak, an taj\'alal-Qurana rabbi\'a qalbi, wa nura sadri, wa jala\'a huzni, wa dhahaba hammi',
    meaning:'O Allah, I am Your servant, son of Your servant, son of Your maidservant. My forelock is in Your hand. I ask You by every name belonging to You — to make the Quran the spring of my heart, the light of my chest, the banisher of my sadness, and the reliever of my distress.',
    count:'When feeling grief or anxiety', source:'Ahmed 3712, Ibn Hibban (Sahih)',
    virtue:'The Prophet (peace be upon him) said: "No one afflicted with anxiety says this except that Allah will replace their grief with joy."',
    explanation:'Perhaps the most powerful dua for anxiety in the entire Sunnah. It begins with a complete acknowledgment of servitude, then asks with ALL of Allah\'s names to make the Quran the medicine for the heart. The four requests address every dimension of emotional suffering.' },

  { cat:'stress',
    ar:'لَا إِلَهَ إِلَّا أَنتَ سُبْحَانَكَ إِنِّي كُنتُ مِنَ الظَّالِمِينَ',
    trans:'La ilaha illa anta subhanaka inni kuntu minaz-zalimin',
    meaning:'There is no god except You. Glory be to You. Indeed, I have been among the wrongdoers.',
    count:'Frequently in difficulty', source:'Al-Anbiya 21:87 (Dua of Yunus)',
    virtue:'The Prophet (peace be upon him) said: "No Muslim says it while in distress except that Allah will relieve him."',
    explanation:'This was the dua of Prophet Yunus (Jonah) from inside the belly of the whale — surrounded by three layers of darkness. This dua of tawhid, glorification, and admission of fault was answered immediately. It combines all elements of a perfect prayer: acknowledgment of Allah\'s oneness, praise of His perfection, and humble admission of one\'s own faults.' },

  { cat:'stress',
    ar:'حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ',
    trans:'Hasbunallahu wa ni\'mal-wakil',
    meaning:'Allah is sufficient for us, and He is the best Disposer of affairs.',
    count:'Frequently', source:'Al-Imran 3:173; Sahih Bukhari 4563',
    virtue:'Ibrahim (peace be upon him) said this when thrown into the fire. The companions said it when told a great army was gathering against them.',
    explanation:'This phrase has been the response of prophets to impossible threats. When Ibrahim said it, the fire became "cool and peaceful." When the companions said it facing an overwhelming army, Allah granted them victory. It declares that when Allah is on your side, no worldly force can overcome you.' },
];

function renderCards(cat) {
  const container = document.getElementById('dhList');
  if (!container) return;
  const list = (cat === 'all') ? DHIKR : DHIKR.filter(function(d){ return d.cat === cat; });
  if (!list.length) { container.innerHTML = '<p style="text-align:center;color:var(--text-3);padding:40px">No dhikr found for this category.</p>'; return; }

  var html = '';
  for (var i = 0; i < list.length; i++) {
    var d = list[i];
    html += '<div class="dhn-card">';
    html += '<div class="dhn-arabic">'+d.ar+'</div>';
    html += '<div class="dhn-meta">';
    html += '<span class="dhn-count"><i class="ri-repeat-line"></i> '+d.count+'</span>';
    html += '<span class="dhn-src"><i class="ri-book-open-line"></i> '+d.source+'</span>';
    html += '</div>';
    // Transliteration
    html += '<div class="dhn-section">';
    html += '<button class="dhn-toggle" data-body="dhn-tr-'+i+'"><i class="ri-text-wrap"></i> '+L('translit')+' <i class="ri-arrow-down-s-line dhn-chev"></i></button>';
    html += '<div class="dhn-body" id="dhn-tr-'+i+'" style="display:none"><p class="dhn-trans-text">'+d.trans+'</p></div>';
    html += '</div>';
    // Translation
    html += '<div class="dhn-section">';
    html += '<button class="dhn-toggle" data-body="dhn-me-'+i+'"><i class="ri-translate-2"></i> '+L('meaning')+' <i class="ri-arrow-down-s-line dhn-chev"></i></button>';
    html += '<div class="dhn-body" id="dhn-me-'+i+'" style="display:none"><p>'+d.meaning+'</p></div>';
    html += '</div>';
    // Virtue
    html += '<div class="dhn-section">';
    html += '<button class="dhn-toggle" data-body="dhn-vt-'+i+'"><i class="ri-award-line"></i> '+L('virtue')+' <i class="ri-arrow-down-s-line dhn-chev"></i></button>';
    html += '<div class="dhn-body dhn-virtue" id="dhn-vt-'+i+'" style="display:none"><p>'+d.virtue+'</p></div>';
    html += '</div>';
    // Explanation
    html += '<div class="dhn-section">';
    html += '<button class="dhn-toggle" data-body="dhn-ex-'+i+'"><i class="ri-lightbulb-line"></i> '+L('explain')+' <i class="ri-arrow-down-s-line dhn-chev"></i></button>';
    html += '<div class="dhn-body dhn-explanation" id="dhn-ex-'+i+'" style="display:none"><p>'+d.explanation+'</p></div>';
    html += '</div>';
    html += '</div>';
  }
  container.innerHTML = html;

  // Wire accordion toggles
  container.querySelectorAll('.dhn-toggle').forEach(function(btn){
    btn.addEventListener('click', function(){
      var bodyId = btn.dataset.body;
      var body = document.getElementById(bodyId);
      var chev = btn.querySelector('.dhn-chev');
      if (!body) return;
      var isOpen = body.style.display === 'block';
      body.style.display = isOpen ? 'none' : 'block';
      if (chev) chev.style.transform = isOpen ? '' : 'rotate(180deg)';
      btn.classList.toggle('open', !isOpen);
    });
  });
}

const Dhikr = {
  render(lang) {
    _lang = lang;
    var catHtml = '';
    for (var i = 0; i < CATS.length; i++) {
      var c = CATS[i];
      catHtml += '<button class="dh-filter'+(c.id==='all'?' active':'')+'" data-cat="'+c.id+'">';
      catHtml += '<i class="'+c.icon+'"></i> '+L(c.key);
      catHtml += '</button>';
    }
    return '<div class="pg-hd">'
      +'<div class="pg-hd-ic"><i class="ri-hand-heart-fill"></i></div>'
      +'<h1>'+L('title')+'</h1>'
      +'<p>'+L('sub')+'</p></div>'
      +'<div class="pg-body">'
      +'<div class="dh-filters rv" id="dhFilters">'+catHtml+'</div>'
      +'<div class="dh-list rv rv-d1" id="dhList"></div>'
      +'</div>'
      +'<footer class="ft"><i class="ri-heart-fill"></i> '+L('ummah')+'</footer>';
  },

  init(lang) {
    _lang = lang;
    renderCards('all');
    var filters = document.getElementById('dhFilters');
    if (filters) {
      filters.addEventListener('click', function(e){
        var btn = e.target.closest('.dh-filter');
        if (!btn) return;
        filters.querySelectorAll('.dh-filter').forEach(function(b){ b.classList.remove('active'); });
        btn.classList.add('active');
        renderCards(btn.dataset.cat);
      });
    }
  }
};

export default Dhikr;
