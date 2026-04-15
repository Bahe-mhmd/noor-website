// ═══════════════════════════════════════════════════
// NOOR — pages/dhikr.js  (fixed: morning default, instant render)
//
// ROOT CAUSE FIX: Two bugs caused blank page:
// 1. renderCards('all') was called but 'dhList' had .rv class
//    which keeps opacity:0 until IntersectionObserver fires.
//    The observer sometimes never fires if element is below
//    viewport fold on initial render.
// 2. Default category was 'all' (30+ items), slow to render.
//
// FIX: Remove rv class. Default to 'morning'. Call
//    renderCards inside requestAnimationFrame to guarantee
//    the container is in the DOM before populating it.
// ═══════════════════════════════════════════════════
import { t } from '../i18n.js';

let _lang = 'en';

const CATS = [
  { id:'all',      icon:'ri-apps-2-line'      },
  { id:'morning',  icon:'ri-sun-line'         },
  { id:'evening',  icon:'ri-moon-line'        },
  { id:'after',    icon:'ri-hand-heart-line'  },
  { id:'sleep',    icon:'ri-hotel-bed-line'   },
  { id:'protect',  icon:'ri-shield-star-line' },
  { id:'quran_cat',icon:'ri-book-open-line'   },
  { id:'general',  icon:'ri-heart-3-line'     },
  { id:'travel',   icon:'ri-plane-line'       },
  { id:'stress',   icon:'ri-user-heart-line'  },
];

// i18n key resolver
function catKey(id) {
  if (id === 'quran_cat') return 'dhikr.quran_cat';
  return 'dhikr.' + id;
}

const DHIKR = [
  // ══ MORNING (7) ══
  { cat:'morning',
    ar:'اللَّهُمَّ بِكَ أَصْبَحْنَا وَبِكَ أَمْسَيْنَا وَبِكَ نَحْيَا وَبِكَ نَمُوتُ وَإِلَيْكَ النُّشُورُ',
    trans:'Allahumma bika asbahna wa bika amsayna wa bika nahya wa bika namutu wa ilaikan-nushur',
    meaning:'O Allah, by You we enter the morning, by You we enter the evening, by You we live, by You we die, and to You is the resurrection.',
    count:'1x', source:'Tirmidhi 3391',
    virtue:'This dua acknowledges that all beginnings and endings are with Allah, establishing complete reliance from the first moment of the day.',
    explanation:'Reciting this dhikr ties your entire day to Allah alone. It is a declaration of total dependence — that life and death are in His hands. Ibn Qayyim called this the foundation of the morning adhkar.' },

  { cat:'morning',
    ar:'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ وَالْحَمْدُ لِلَّهِ لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ',
    trans:'Asbahna wa asbahal-mulku lillahi wal-hamdu lillahi la ilaha illallahu wahdahu la sharika lah',
    meaning:'We have entered the morning and the dominion belongs to Allah. All praise is for Allah. There is no god except Allah, alone, without partner.',
    count:'1x', source:'Sahih Muslim 2723',
    virtue:'The Prophet ﷺ taught this as a way to start the day with gratitude and tawhid.',
    explanation:'This dhikr begins the morning by affirming that the kingdom of the heavens and earth belongs to Allah. Nothing we see or experience is truly ours — it all belongs to the Creator.' },

  { cat:'morning',
    ar:'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ',
    trans:'Subhan Allahi wa bihamdihi',
    meaning:'Glory be to Allah and all praise is for Him.',
    count:'100x', source:'Sahih Muslim 2692',
    virtue:'Whoever says this 100 times in the morning will have his sins forgiven, even if they are like the foam of the sea.',
    explanation:'This short yet powerful dhikr carries an enormous reward. Despite its brevity, it is one of the most recommended morning adhkar because its simplicity makes it easy to maintain daily.' },

  { cat:'morning',
    ar:'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ خَلَقْتَنِي وَأَنَا عَبْدُكَ وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي',
    trans:"Allahumma anta rabbi la ilaha illa ant, khalaqtani wa ana abduk, wa ana ala ahdika wa wa'dika mastata'tu, a'udhu bika min sharri ma sana'tu, abu'u laka bini'matika 'alayya, wa abu'u bidhanbi faghfir li",
    meaning:'O Allah, You are my Lord. There is no god except You. You created me and I am Your servant. I am upon Your covenant. I seek refuge in You from the evil of what I have done. I acknowledge Your favors and I acknowledge my sins, so forgive me.',
    count:'1x', source:'Sahih Bukhari 6306',
    virtue:'Sayyid al-Istighfar — the Master of seeking forgiveness. Whoever says it in the morning with certainty and dies that day will enter Paradise.',
    explanation:"Called 'Sayyid al-Istighfar' by the Prophet ﷺ. It contains recognition of Allah's lordship, acknowledgment of servitude, confession of sins, and total dependence on Allah for forgiveness." },

  { cat:'morning',
    ar:'رَضِيتُ بِاللَّهِ رَبًّا وَبِالإِسْلاَمِ دِينًا وَبِمُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ نَبِيًّا',
    trans:"Raditu billahi rabban, wa bil-Islami dinan, wa bi-Muhammadin sallallahu 'alayhi wa sallam nabiyyan",
    meaning:'I am pleased with Allah as my Lord, with Islam as my religion, and with Muhammad ﷺ as my Prophet.',
    count:'3x', source:'Abu Dawud 1529',
    virtue:'Whoever says this three times in the morning and evening, Allah will be pleased with him on the Day of Judgement.',
    explanation:'A profound declaration of contentment and iman. It combines the three foundations of the deen in a single breath — a renewal of covenant with Allah every morning.' },

  { cat:'morning',
    ar:'اللَّهُمَّ عَافِنِي فِي بَدَنِي اللَّهُمَّ عَافِنِي فِي سَمْعِي اللَّهُمَّ عَافِنِي فِي بَصَرِي لَا إِلَهَ إِلَّا أَنْتَ',
    trans:"Allahumma 'afini fi badani, Allahumma 'afini fi sam'i, Allahumma 'afini fi basari, la ilaha illa anta",
    meaning:'O Allah, grant me health in my body. O Allah, grant me health in my hearing. O Allah, grant me health in my sight. There is no god except You.',
    count:'3x', source:'Abu Dawud 5090',
    virtue:'Abu Bakr al-Siddiq RA used to say this supplication every morning and evening.',
    explanation:'This dua asks for the three most essential physical faculties: body, hearing, and sight. These are three of the greatest gifts of Allah — asking for their preservation is a practice inherited from the greatest companion.' },

  { cat:'morning',
    ar:'اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي الدُّنْيَا وَالآخِرَةِ',
    trans:"Allahumma inni as'alukal-'afwa wal-'afiyata fid-dunya wal-akhirah",
    meaning:'O Allah, I ask You for pardon and well-being in this world and the Hereafter.',
    count:'1x', source:'Ibn Majah 3871',
    virtue:"The Prophet ﷺ said: 'No one is granted anything better than health and well-being.'",
    explanation:"Seeking 'afiyah (well-being) in both worlds is the comprehensive supplication — because well-being encompasses health, safety, sound religion, and protection from all harm." },

  // ══ EVENING (4) ══
  { cat:'evening',
    ar:'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ وَالْحَمْدُ لِلَّهِ لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ',
    trans:'Amsayna wa amsal-mulku lillahi wal-hamdu lillahi la ilaha illallahu wahdahu la sharika lah',
    meaning:'We have entered the evening and the dominion belongs to Allah. All praise is for Allah. There is no god except Allah, alone, without partner.',
    count:'1x', source:'Sahih Muslim 2723',
    virtue:'This is the evening counterpart of the morning dua, closing the day with the same declaration of tawhid.',
    explanation:'Just as the morning began with acknowledging Allah\'s ownership of all dominion, the evening ends with the same declaration — a full circle of remembrance.' },

  { cat:'evening',
    ar:'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ',
    trans:"A'udhu bikalimatillahit-tammati min sharri ma khalaq",
    meaning:'I seek refuge in the perfect words of Allah from the evil of what He has created.',
    count:'3x', source:'Sahih Muslim 2708',
    virtue:'Whoever says this three times in the evening will be protected from insect stings that night.',
    explanation:"The 'perfect words of Allah' refers to the Quran and all the names and attributes of Allah. This dua is a comprehensive shield against every form of harm from creation." },

  { cat:'evening',
    ar:'اللَّهُمَّ إِنِّي أَمْسَيْتُ أُشْهِدُكَ وَأُشْهِدُ حَمَلَةَ عَرْشِكَ وَمَلَائِكَتَكَ وَجَمِيعَ خَلْقِكَ أَنَّكَ أَنْتَ اللَّهُ لَا إِلَهَ إِلَّا أَنْتَ وَحْدَكَ لَا شَرِيكَ لَكَ',
    trans:"Allahumma inni amsaytu ushiduka wa ushidu hamalata arshika wa mala'ikataka wa jami'a khalqika annaka antallahu la ilaha illa anta wahdaka la sharika lak",
    meaning:'O Allah, I have entered the evening calling You to witness, and calling to witness the bearers of Your throne, Your angels, and all of Your creation, that You are Allah, there is no god except You alone, without partner.',
    count:'4x', source:'Abu Dawud 5069',
    virtue:'Whoever says this 4 times in the morning or evening, Allah will free a quarter of him from the Hellfire for each time.',
    explanation:'This remarkable dhikr calls all of creation as witnesses to your declaration of tawhid and iman. By saying it four times, all of creation — angels, bearers of the Throne — witness your faith.' },

  { cat:'evening',
    ar:'اللَّهُمَّ بِكَ أَمْسَيْنَا وَبِكَ أَصْبَحْنَا وَبِكَ نَحْيَا وَبِكَ نَمُوتُ وَإِلَيْكَ الْمَصِيرُ',
    trans:'Allahumma bika amsayna wa bika asbahna wa bika nahya wa bika namutu wa ilaykal-masir',
    meaning:'O Allah, by You we enter the evening and by You we enter the morning, by You we live and by You we die, and to You is the final return.',
    count:'1x', source:'Tirmidhi 3391',
    virtue:'The evening version adds "and to You is the return" (al-masir) instead of "the resurrection."',
    explanation:'The change in wording reflects the deeper reality that the night, with its resemblance to death in sleep, reminds us that our ultimate journey is back to Allah.' },

  // ══ AFTER PRAYER (5) ══
  { cat:'after',
    ar:'أَسْتَغْفِرُ اللَّهَ',
    trans:'Astaghfirullah',
    meaning:'I seek forgiveness from Allah.',
    count:'3x', source:'Sahih Muslim 591',
    virtue:'The Prophet ﷺ used to say this three times immediately after finishing his prayer.',
    explanation:'Even after the most perfect worship, the Prophet ﷺ immediately sought forgiveness. Istighfar after prayer polishes it and fills any shortcomings.' },

  { cat:'after',
    ar:'اللَّهُمَّ أَنْتَ السَّلَامُ وَمِنْكَ السَّلَامُ تَبَارَكْتَ يَا ذَا الْجَلالِ وَالإِكْرَامِ',
    trans:'Allahumma anta as-salam wa minka as-salam tabarakta ya dhal-jalali wal-ikram',
    meaning:'O Allah, You are Peace and from You comes peace. Blessed are You, O Possessor of Majesty and Honor.',
    count:'1x', source:'Sahih Muslim 592',
    virtue:'This is the first dhikr the Prophet ﷺ taught after salah.',
    explanation:'After salah ends with the greeting of peace, we acknowledge that all peace comes from Allah — then praise Him with two of His most majestic names.' },

  { cat:'after',
    ar:'لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
    trans:"La ilaha illallahu wahdahu la sharika lahu, lahul-mulku wa lahul-hamdu wa huwa 'ala kulli shay'in qadir",
    meaning:'There is no god except Allah, alone, without partner. To Him belongs dominion and all praise, and He is powerful over all things.',
    count:'10x after Fajr & Maghrib', source:'Tirmidhi 3474',
    virtue:"The Prophet ﷺ said: 'Whoever says this 10 times after Fajr and Maghrib — Allah writes 10 good deeds, erases 10 bad deeds, raises him 10 degrees, and protects him from Shaytan all day.'",
    explanation:'This comprehensive declaration of tawhid earns enormous rewards specifically after the two prayers that bookend the night.' },

  { cat:'after',
    ar:'اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ',
    trans:"Allahumma a'inni 'ala dhikrika wa shukrika wa husni 'ibadatik",
    meaning:'O Allah, help me to remember You, to be grateful to You, and to worship You in an excellent manner.',
    count:'After each prayer', source:'Abu Dawud 1522',
    virtue:"The Prophet ﷺ told Mu'adh ibn Jabal: 'O Mu'adh, by Allah I love you, so do not forget to say after every prayer...'",
    explanation:'This dua asks Allah to help with the very things that help us draw closer to Him — a circle of divine help.' },

  { cat:'after',
    ar:'سُبْحَانَ اللَّهِ ثَلَاثًا وَثَلَاثِينَ وَالْحَمْدُ لِلَّهِ ثَلَاثًا وَثَلَاثِينَ وَاللَّهُ أَكْبَرُ ثَلَاثًا وَثَلَاثِينَ',
    trans:"Subhanallah (33) — Alhamdulillah (33) — Allahu Akbar (33), then: La ilaha illallahu wahdahu la sharika lahu lahul-mulku wa lahul-hamdu wa huwa 'ala kulli shay'in qadir",
    meaning:'Glory be to Allah 33 times — All praise is for Allah 33 times — Allah is the Greatest 33 times — then the tahlil once.',
    count:'33+33+33+1', source:'Sahih Muslim 595',
    virtue:'Whoever glorifies, praises, and exalts Allah 33 times each after prayer and completes the hundred — his sins will be forgiven even if like the foam of the sea.',
    explanation:'This three-part tasbih is one of the most established Sunnah acts after prayer, covering glorification, gratitude, and declaration of Allah\'s greatness.' },

  // ══ SLEEP (4) ══
  { cat:'sleep',
    ar:'بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا',
    trans:'Bismika Allahumma amutu wa ahya',
    meaning:'In Your name, O Allah, I die and I live.',
    count:'1x', source:'Sahih Bukhari 6324',
    virtue:'The Prophet ﷺ said this every night before sleeping, using sleep as a metaphor for death.',
    explanation:"Sleep is called the 'minor death' in Islam. Saying this dua is a reminder of our mortality and a way to begin the night with Allah's name on our lips." },

  { cat:'sleep',
    ar:'اللَّهُمَّ أَسْلَمْتُ نَفْسِي إِلَيْكَ وَوَجَّهْتُ وَجْهِي إِلَيْكَ وَفَوَّضْتُ أَمْرِي إِلَيْكَ وَأَلْجَأْتُ ظَهْرِي إِلَيْكَ رَغْبَةً وَرَهْبَةً إِلَيْكَ اللَّهُمَّ آمَنْتُ بِكِتَابِكَ الَّذِي أَنْزَلْتَ وَبِنَبِيِّكَ الَّذِي أَرْسَلْتَ',
    trans:"Allahumma aslamtu nafsi ilayk, wa wajjahtu wajhi ilayk, wa fawwadtu amri ilayk, wa alja'tu zahri ilayk. Allahumma amantu bikitabikal-ladhi anzalt wa binabiyyikal-ladhi arsalt",
    meaning:'O Allah, I surrender myself to You, I direct my face to You, I entrust my affairs to You, and I press my back against You. O Allah, I believe in Your Book and in Your Prophet.',
    count:'1x', source:'Sahih Bukhari 247',
    virtue:"The Prophet ﷺ said: 'If you die tonight, you will die upon the fitrah. Make these words the last thing you say.'",
    explanation:'The ultimate act of surrender before sleep — covering five dimensions of submission. The Prophet ﷺ instructed these should be the last words before sleep.' },

  { cat:'sleep',
    ar:'سُبْحَانَ اللَّهِ (٣٣) الْحَمْدُ لِلَّهِ (٣٣) اللَّهُ أَكْبَرُ (٣٤)',
    trans:'Subhanallah (33) — Alhamdulillah (33) — Allahu Akbar (34)',
    meaning:'Glory be to Allah 33 times — All praise is for Allah 33 times — Allah is the Greatest 34 times.',
    count:'33+33+34', source:'Sahih Bukhari 3113',
    virtue:"The Prophet ﷺ gave this to Fatimah RA when she asked for a servant: 'This is better for you than a servant.'",
    explanation:"Known as the 'Tasbih of Fatimah,' given by the Prophet ﷺ to his beloved daughter. Scholars recommend it especially for those who feel tired at the end of the day." },

  { cat:'sleep',
    ar:'اللَّهُمَّ قِنِي عَذَابَكَ يَوْمَ تَبْعَثُ عِبَادَكَ',
    trans:"Allahumma qini 'adhabaka yawma tab'athu 'ibadak",
    meaning:'O Allah, protect me from Your punishment on the Day You resurrect Your servants.',
    count:'3x', source:'Abu Dawud 5045',
    virtue:'The Prophet ﷺ recited this three times before sleeping.',
    explanation:'As we prepare to enter the state that resembles death, we ask Allah to protect us from what awaits after the true death — the punishment of the Day of Resurrection.' },

  // ══ PROTECTION (3) ══
  { cat:'protect',
    ar:'بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ',
    trans:"Bismillahil-ladhi la yadurru ma'asmihi shay'un fil-ardi wa la fis-sama'i wa huwas-sami'ul-'alim",
    meaning:'In the name of Allah, with whose name nothing can cause harm on earth or in the heavens, and He is the All-Hearing, the All-Knowing.',
    count:'3x morning and evening', source:'Tirmidhi 3388',
    virtue:'Whoever says this three times in the morning and evening, nothing will harm him.',
    explanation:'One of the most powerful protection formulas in Islam. The name of Allah, when said sincerely, surrounds the believer with divine protection.' },

  { cat:'protect',
    ar:'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّةِ مِنْ كُلِّ شَيْطَانٍ وَهَامَّةٍ وَمِنْ كُلِّ عَيْنٍ لَامَّةٍ',
    trans:"A'udhu bikalimatillahit-tammah min kulli shaytanin wa hammah, wa min kulli 'aynin lammah",
    meaning:'I seek refuge in the perfect words of Allah from every devil and every harmful creature and from every evil eye.',
    count:'When entering a new place', source:'Sahih Bukhari 3371',
    virtue:"The Prophet ﷺ recited this for Hasan and Husayn: 'Your father Ibrahim used to seek protection for Ismail and Isaac with these words.'",
    explanation:'This ancient dua has been passed down through the prophets from Ibrahim ﷺ. Recommended when entering new places, for children, when feeling fear.' },

  { cat:'protect',
    ar:'حَسْبِيَ اللَّهُ لَا إِلَهَ إِلَّا هُوَ عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ',
    trans:"Hasbiyallahu la ilaha illa huwa, 'alayhi tawakkaltu, wa huwa rabbul-arshil-'azim",
    meaning:'Allah is sufficient for me. There is no god except Him. In Him I have placed my trust. He is the Lord of the Mighty Throne.',
    count:'7x morning and evening', source:'Abu Dawud 5081',
    virtue:'Whoever says this seven times in the morning and evening, Allah will take care of his worries of this world and the Hereafter.',
    explanation:"This dua from Quran 9:129 represents the ultimate declaration of sufficiency and trust. Ibn Qayyim said these words, when said with conviction, can drive away the greatest anxieties." },

  // ══ FROM QURAN (4) ══
  { cat:'quran_cat',
    ar:'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ — آيَةُ الْكُرْسِيّ',
    trans:'Ayat al-Kursi — Al-Baqarah 2:255',
    meaning:"Allah — there is no deity except Him, the Ever-Living, the Sustainer of existence. Neither drowsiness overtakes Him nor sleep. To Him belongs whatever is in the heavens and on the earth...",
    count:'After every prayer + before sleep', source:'Al-Baqarah 2:255; Sahih Bukhari 2311',
    virtue:"Whoever recites Ayat al-Kursi after every obligatory prayer — nothing prevents him from entering Paradise except death.",
    explanation:"Called the 'Master of all verses,' Ayat al-Kursi describes Allah's attributes most comprehensively: His eternal life, self-sufficiency, perfect knowledge, and sovereignty." },

  { cat:'quran_cat',
    ar:'قُلْ هُوَ اللَّهُ أَحَدٌ — Al-Ikhlas + Al-Falaq + An-Naas (Three Quls)',
    trans:'Al-Ikhlas (112) + Al-Falaq (113) + An-Naas (114)',
    meaning:'Say: He is Allah, the One... / Say: I seek refuge in the Lord of Daybreak... / Say: I seek refuge in the Lord of Mankind...',
    count:'3x morning, evening, before sleep', source:'Abu Dawud 5082, Tirmidhi 3575',
    virtue:"The Prophet ﷺ said: 'Reciting them three times in the morning and evening is sufficient protection from everything.'",
    explanation:'Al-Ikhlas purifies tawhid. Al-Falaq protects from external evils. An-Naas protects from internal evil. Together they form a complete spiritual shield.' },

  { cat:'quran_cat',
    ar:'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
    trans:"Rabbana atina fid-dunya hasanatan wa fil-akhirati hasanatan wa qina 'adhaban-nar",
    meaning:'Our Lord, give us good in this world and good in the Hereafter, and protect us from the punishment of the Fire.',
    count:'Frequently', source:'Al-Baqarah 2:201; Sahih Bukhari 6389',
    virtue:'Anas ibn Malik RA reported that this was the dua the Prophet ﷺ made most frequently.',
    explanation:"The most comprehensive dua — asks for 'good' in both worlds without specifying, leaving it to Allah to decide what is best." },

  { cat:'quran_cat',
    ar:'رَبِّ زِدْنِي عِلْمًا',
    trans:"Rabbi zidni 'ilma",
    meaning:'My Lord, increase me in knowledge.',
    count:'Frequently', source:'Ta-Ha 20:114',
    virtue:"This is the only thing Allah commanded the Prophet ﷺ to ask for increase of — knowledge.",
    explanation:"Of all things, Allah specifically commanded only one increase: knowledge. The shortest yet most impactful dua for seekers of knowledge." },

  // ══ GENERAL (6) ══
  { cat:'general',
    ar:'لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
    trans:"La ilaha illallahu wahdahu la sharika lahu, lahul-mulku wa lahul-hamdu wa huwa 'ala kulli shay'in qadir",
    meaning:'There is no god except Allah, alone, without partner. To Him belongs dominion and all praise, and He is powerful over all things.',
    count:'100x daily', source:'Sahih Bukhari 6403',
    virtue:'100 times: equals freeing 10 slaves, 100 good deeds recorded, 100 sins erased, protection from Shaytan all day.',
    explanation:"The Prophet ﷺ called this 'the best of dhikr.' It combines negation of false gods, affirmation of Allah alone, His sovereignty, and His all-encompassing power." },

  { cat:'general',
    ar:'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ سُبْحَانَ اللَّهِ الْعَظِيمِ',
    trans:'Subhanallahi wa bihamdihi, Subhanallahil-Azim',
    meaning:'Glory and praise be to Allah. Glory be to Allah the Magnificent.',
    count:'Frequently', source:'Sahih Bukhari 6682',
    virtue:"The Prophet ﷺ said: 'Two words are light on the tongue, heavy on the scales, and beloved to Ar-Rahman.'",
    explanation:'Despite being brief, these phrases carry enormous weight on the Scale of Deeds — a direct connection between the tongue and the love of the Most Merciful.' },

  { cat:'general',
    ar:'لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ',
    trans:'La hawla wa la quwwata illa billah',
    meaning:'There is no might and no power except with Allah.',
    count:'Frequently', source:'Sahih Bukhari 6384',
    virtue:"The Prophet ﷺ told Abu Musa al-Ash'ari: 'Shall I not guide you to a treasure from the treasures of Paradise?'",
    explanation:"Known as 'Al-Hawqala,' this short phrase is a treasury of Paradise. The ultimate acknowledgment that we have no ability except through the strength given to us by Allah." },

  { cat:'general',
    ar:'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ',
    trans:"Allahumma salli 'ala Muhammadin wa 'ala ali Muhammadin kama sallayta 'ala Ibrahima wa 'ala ali Ibrahim, innaka Hamidun Majid",
    meaning:'O Allah, send Your blessings upon Muhammad and the family of Muhammad, just as You sent Your blessings upon Ibrahim and the family of Ibrahim.',
    count:'Frequently (especially Fridays)', source:'Sahih Bukhari 3370',
    virtue:'Whoever sends one blessing upon the Prophet ﷺ, Allah sends ten blessings upon him.',
    explanation:'The complete Salawat Ibrahim, taught by the Prophet ﷺ himself. Sending Salawat causes Allah to send ten blessings back upon the reciter.' },

  { cat:'general',
    ar:'الْحَمْدُ لِلَّهِ حَمْدًا كَثِيرًا طَيِّبًا مُبَارَكًا فِيهِ',
    trans:'Alhamdulillahi hamdan kathiran tayyiban mubarakan fih',
    meaning:'All praise is for Allah, much praise, good and blessed.',
    count:'Frequently', source:'Sahih Bukhari 799',
    virtue:'An angel told the Prophet ﷺ that these words fill what is between the heavens and the earth.',
    explanation:'A companion said this in prayer and the Prophet ﷺ confirmed that the angels were uncertain how to record it because of its immensity.' },

  { cat:'general',
    ar:'سُبْحَانَ اللَّهِ عَدَدَ خَلْقِهِ سُبْحَانَ اللَّهِ رِضَا نَفْسِهِ سُبْحَانَ اللَّهِ زِنَةَ عَرْشِهِ سُبْحَانَ اللَّهِ مِدَادَ كَلِمَاتِهِ',
    trans:"Subhanallahi 'adada khalqihi, subhanallahi rida nafsihi, subhanallahi zinata 'arshihi, subhanallahi midada kalimatihi",
    meaning:'Glory be to Allah as much as His creation, Glory be to Allah to His own pleasure, Glory be to Allah to the weight of His Throne, Glory be to Allah as much as the ink of His words.',
    count:'3x in the morning', source:'Sahih Muslim 2726',
    virtue:"The Prophet ﷺ said these phrases outweigh all other forms of glorification. Juwairiya RA was found saying them when the Prophet ﷺ left for Fajr and returned hours later — he said: 'You have said something that outweighs what I said.'",
    explanation:'These four formulas of tasbeeh are unlimited in scope — they glorify Allah to the extent of His entire creation, His pleasure, the weight of His Throne, and the ink of His words. Nothing can exceed these in scope.' },

  // ══ TRAVEL (3) ══
  { cat:'travel',
    ar:'سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَى رَبِّنَا لَمُنقَلِبُونَ',
    trans:'Subhanal-ladhi sakhkhara lana hadha wa ma kunna lahu muqrinin, wa inna ila rabbina lamunqalibun',
    meaning:'Glory be to Him who has subjected this for us and we were not capable of subduing it. And verily to our Lord we will surely return.',
    count:'1x when traveling', source:'Sahih Muslim 1342',
    virtue:'The Prophet ﷺ said this when beginning a journey.',
    explanation:"This verse (Quran 43:13-14) reminds travelers that the ability to travel is a gift from Allah — subjected to us by divine arrangement, not our own power." },

  { cat:'travel',
    ar:'اللَّهُمَّ إِنَّا نَسْأَلُكَ فِي سَفَرِنَا هَذَا الْبِرَّ وَالتَّقْوَى وَمِنَ الْعَمَلِ مَا تَرْضَى اللَّهُمَّ هَوِّنْ عَلَيْنَا سَفَرَنَا هَذَا وَاطْوِ عَنَّا بُعْدَهُ',
    trans:"Allahumma inna nas'aluka fi safarina hadhal-birra wat-taqwa, wa minal-'amali ma tarda, Allahumma hawwin 'alayna safarana hadha wat wi 'anna bu'dahu",
    meaning:'O Allah, we ask You on this journey for goodness, piety, and deeds that please You. O Allah, make this journey easy for us and shorten its distance.',
    count:'1x when setting out', source:'Sahih Muslim 1342',
    virtue:'This comprehensive travel dua covers both the spiritual and physical aspects of the journey.',
    explanation:"Asks for three spiritual qualities (birr, taqwa, good deeds) and two practical requests (ease and shortening of distance)." },

  { cat:'travel',
    ar:'اللَّهُمَّ أَنْتَ الصَّاحِبُ فِي السَّفَرِ وَالْخَلِيفَةُ فِي الأَهْلِ',
    trans:"Allahumma antas-sahibu fis-safari wal-khalifatu fil-ahl",
    meaning:'O Allah, You are the Companion in travel and the Successor over the family.',
    count:'1x when traveling', source:'Sahih Muslim 1342',
    virtue:"The Prophet ﷺ used to ask Allah to be both his companion during the journey and the guardian of his family left behind.",
    explanation:"Travel separates a person from their family. This dua asks Allah to fill both roles: companion to the traveler, and protector of those at home." },

  // ══ ANXIETY (4) ══
  { cat:'stress',
    ar:'اللَّهُمَّ إِنِّي عَبْدُكَ ابْنُ عَبْدِكَ ابْنُ أَمَتِكَ نَاصِيَتِي بِيَدِكَ أَسْأَلُكَ بِكُلِّ اسْمٍ هُوَ لَكَ أَنْ تَجْعَلَ الْقُرْآنَ رَبِيعَ قَلْبِي وَنُورَ صَدْرِي وَجَلَاءَ حُزْنِي وَذَهَابَ هَمِّي',
    trans:"Allahumma inni 'abduka wabnu 'abdika wabnu amatik, nasiyati biyadik, as'aluka bikulli ismin huwa lak, an taj'alal-Qurana rabbi'a qalbi, wa nura sadri, wa jala'a huzni, wa dhahaba hammi",
    meaning:'O Allah, I am Your servant. My forelock is in Your hand. I ask You by every name belonging to You — to make the Quran the spring of my heart, the light of my chest, the banisher of my sadness, and the reliever of my distress.',
    count:'When feeling grief or anxiety', source:'Ahmed 3712, Ibn Hibban (Sahih)',
    virtue:"The Prophet ﷺ said: 'No one afflicted with anxiety says this except that Allah will replace their grief with joy.'",
    explanation:"Perhaps the most powerful dua for anxiety in the Sunnah. It asks with ALL of Allah's names to make the Quran the medicine for every dimension of emotional suffering." },

  { cat:'stress',
    ar:'لَا إِلَهَ إِلَّا أَنتَ سُبْحَانَكَ إِنِّي كُنتُ مِنَ الظَّالِمِينَ',
    trans:'La ilaha illa anta subhanaka inni kuntu minaz-zalimin',
    meaning:'There is no god except You. Glory be to You. Indeed, I have been among the wrongdoers.',
    count:'Frequently in difficulty', source:'Al-Anbiya 21:87 — Dua of Yunus ﷺ',
    virtue:"The Prophet ﷺ said: 'No Muslim says it while in distress except that Allah will relieve him.'",
    explanation:"The dua of Prophet Yunus ﷺ from inside the belly of the whale — three layers of darkness. It combines tawhid, praise, and humble admission of fault — all elements of a perfect prayer." },

  { cat:'stress',
    ar:'حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ',
    trans:"Hasbunallahu wa ni'mal-wakil",
    meaning:'Allah is sufficient for us, and He is the best Disposer of affairs.',
    count:'Frequently', source:'Al-Imran 3:173; Sahih Bukhari 4563',
    virtue:"Ibrahim ﷺ said this when thrown into fire. The companions said it facing an overwhelming army. Both times Allah granted relief.",
    explanation:'When Ibrahim said it, the fire became "cool and peaceful." When the companions said it, Allah granted victory. No worldly force can overcome you when Allah is on your side.' },

  { cat:'stress',
    ar:'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ وَأَعُوذُ بِكَ مِنَ الْعَجْزِ وَالْكَسَلِ وَأَعُوذُ بِكَ مِنَ الْجُبْنِ وَالْبُخْلِ وَأَعُوذُ بِكَ مِنْ غَلَبَةِ الدَّيْنِ وَقَهْرِ الرِّجَالِ',
    trans:"Allahumma inni a'udhu bika minal-hammi wal-hazan, wa a'udhu bika minal-'ajzi wal-kasal, wa a'udhu bika minal-jubni wal-bukhl, wa a'udhu bika min ghalabatid-dayni wa qahrir-rijal",
    meaning:'O Allah, I seek refuge in You from anxiety and sorrow, weakness and laziness, cowardice and miserliness, and from being overpowered by debt and from the oppression of people.',
    count:'Frequently', source:'Sahih Bukhari 6369',
    virtue:'The Prophet ﷺ used to seek refuge from these eight things — the most common causes of human suffering and failure.',
    explanation:"Addresses four pairs of afflictions: anxiety & sorrow, weakness & laziness, cowardice & miserliness, debt & oppression. A shield against the most common causes of human suffering." },
];

// ── Render dhikr cards ──
function renderCards(cat) {
  const container = document.getElementById('dhList');
  if (!container) return;

  const list = cat === 'all' ? DHIKR : DHIKR.filter(d => d.cat === cat);
  if (!list.length) {
    container.innerHTML = '<p style="text-align:center;color:var(--text-3);padding:60px;font-size:15px">No dhikr found.</p>';
    return;
  }

  // Update active filter button
  document.querySelectorAll('.dh-filter').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.cat === cat);
  });

  let html = '';
  for (let i = 0; i < list.length; i++) {
    const d = list[i];
    const bid = cat + '_' + i;
    html += '<div class="dhn-card">'
      // Arabic text
      + '<div class="dhn-arabic">' + d.ar + '</div>'
      // Meta row
      + '<div class="dhn-meta">'
      + '<span class="dhn-count"><i class="ri-repeat-line"></i> ' + d.count + '</span>'
      + '<span class="dhn-src"><i class="ri-book-open-line"></i> ' + d.source + '</span>'
      + '</div>'
      // Transliteration
      + '<div class="dhn-section">'
      + '<button class="dhn-toggle" data-body="dhn-tr-' + bid + '"><i class="ri-text-wrap"></i> ' + t('dhikr.translit', _lang) + ' <i class="ri-arrow-down-s-line dhn-chev"></i></button>'
      + '<div class="dhn-body" id="dhn-tr-' + bid + '" style="display:none"><p class="dhn-trans-text">' + d.trans + '</p></div>'
      + '</div>'
      // Translation
      + '<div class="dhn-section">'
      + '<button class="dhn-toggle" data-body="dhn-me-' + bid + '"><i class="ri-translate-2"></i> ' + t('dhikr.meaning', _lang) + ' <i class="ri-arrow-down-s-line dhn-chev"></i></button>'
      + '<div class="dhn-body" id="dhn-me-' + bid + '" style="display:none"><p>' + d.meaning + '</p></div>'
      + '</div>'
      // Virtue
      + '<div class="dhn-section">'
      + '<button class="dhn-toggle" data-body="dhn-vt-' + bid + '"><i class="ri-award-line"></i> ' + t('dhikr.virtue', _lang) + ' <i class="ri-arrow-down-s-line dhn-chev"></i></button>'
      + '<div class="dhn-body dhn-virtue" id="dhn-vt-' + bid + '" style="display:none"><p>' + d.virtue + '</p></div>'
      + '</div>'
      // Explanation
      + '<div class="dhn-section">'
      + '<button class="dhn-toggle" data-body="dhn-ex-' + bid + '"><i class="ri-lightbulb-line"></i> ' + t('dhikr.explain', _lang) + ' <i class="ri-arrow-down-s-line dhn-chev"></i></button>'
      + '<div class="dhn-body dhn-explanation" id="dhn-ex-' + bid + '" style="display:none"><p>' + d.explanation + '</p></div>'
      + '</div>'
      + '</div>';
  }

  container.innerHTML = html;

  // Wire accordion toggles
  container.querySelectorAll('.dhn-toggle').forEach(btn => {
    btn.addEventListener('click', function() {
      const body = document.getElementById(btn.dataset.body);
      const chev = btn.querySelector('.dhn-chev');
      if (!body) return;
      const isOpen = body.style.display === 'block';
      body.style.display = isOpen ? 'none' : 'block';
      if (chev) chev.style.transform = isOpen ? '' : 'rotate(180deg)';
      btn.classList.toggle('open', !isOpen);
    });
  });
}

// ── Page Module ──
const Dhikr = {
  render(lang) {
    _lang = lang;
    let catHtml = '';
    for (let i = 0; i < CATS.length; i++) {
      const c = CATS[i];
      catHtml += '<button class="dh-filter' + (c.id === 'morning' ? ' active' : '') + '" data-cat="' + c.id + '">'
        + '<i class="' + c.icon + '"></i> ' + t(catKey(c.id), lang) + '</button>';
    }

    return '<div class="pg-hd">'
      + '<div class="pg-hd-ic"><i class="ri-hand-heart-fill"></i></div>'
      + '<h1>' + t('dhikr.title', lang) + '</h1>'
      + '<p>' + t('dhikr.sub', lang) + '</p>'
      + '</div>'
      + '<div class="pg-body">'
      // ← NO rv class on filters or list — renders immediately
      + '<div class="dh-filters" id="dhFilters">' + catHtml + '</div>'
      + '<div class="dh-list" id="dhList"></div>'
      + '</div>'
      + '<footer class="ft"><i class="ri-heart-fill"></i> ' + t('common.ummah', lang) + '</footer>';
  },

  init(lang) {
    _lang = lang;

    // ← KEY FIX: requestAnimationFrame guarantees the DOM from
    //   render() is fully inserted before we query getElementById.
    //   Default category is 'morning' (not 'all') for fast load.
    requestAnimationFrame(() => {
      renderCards('morning');
    });

    const filters = document.getElementById('dhFilters');
    if (filters) {
      filters.addEventListener('click', e => {
        const btn = e.target.closest('.dh-filter');
        if (btn) renderCards(btn.dataset.cat);
      });
    }
  }
};

export default Dhikr;
