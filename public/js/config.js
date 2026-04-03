// ═══════════════════════════════════════════════════
// NOOR — config.js: All Static Data & Constants
// Add new data here, import it in any page module.
// ═══════════════════════════════════════════════════

export const PRAYER_NAMES_EN = ['Fajr','Sunrise','Dhuhr','Asr','Maghrib','Isha'];
export const PRAYER_NAMES_AR = ['الفجر','الشروق','الظهر','العصر','المغرب','العشاء'];
export const PRAYER_ICONS = ['ri-sun-foggy-line','ri-sun-line','ri-sun-line','ri-sun-cloudy-line','ri-moon-cloudy-line','ri-moon-line'];

export const HIJRI_MONTHS = [
  {num:1,ar:'مُحَرَّم',en:'Muharram',mean:'Sacred'},
  {num:2,ar:'صَفَر',en:'Safar',mean:'Void'},
  {num:3,ar:'رَبِيع الأَوَّل',en:'Rabi al-Awwal',mean:'First Spring'},
  {num:4,ar:'رَبِيع الثَّانِي',en:'Rabi al-Thani',mean:'Second Spring'},
  {num:5,ar:'جُمَادَى الأُولَى',en:'Jumada al-Ula',mean:'First Dry'},
  {num:6,ar:'جُمَادَى الثَّانِيَة',en:'Jumada al-Thani',mean:'Second Dry'},
  {num:7,ar:'رَجَب',en:'Rajab',mean:'Respect'},
  {num:8,ar:'شَعْبَان',en:"Sha'ban",mean:'Scattered'},
  {num:9,ar:'رَمَضَان',en:'Ramadan',mean:'Burning Heat'},
  {num:10,ar:'شَوَّال',en:'Shawwal',mean:'Raised'},
  {num:11,ar:'ذُو القَعْدَة',en:"Dhul Qi'dah",mean:'Sitting'},
  {num:12,ar:'ذُو الحِجَّة',en:'Dhul Hijjah',mean:'Pilgrimage'}
];

export const ISLAMIC_EVENTS = [
  {name_en:'Ramadan',name_ar:'رمضان',month:9,day:1,icon:'ri-moon-line'},
  {name_en:'Eid al-Fitr',name_ar:'عيد الفطر',month:10,day:1,icon:'ri-gift-line'},
  {name_en:'Day of Arafah',name_ar:'يوم عرفة',month:12,day:9,icon:'ri-map-pin-line'},
  {name_en:'Eid al-Adha',name_ar:'عيد الأضحى',month:12,day:10,icon:'ri-gift-line'},
  {name_en:'Islamic New Year',name_ar:'رأس السنة الهجرية',month:1,day:1,icon:'ri-calendar-line'},
  {name_en:'Mawlid al-Nabi',name_ar:'المولد النبوي',month:3,day:12,icon:'ri-star-line'},
  {name_en:"Laylat al-Qadr",name_ar:'ليلة القدر',month:9,day:27,icon:'ri-sparkling-2-line'},
  {name_en:'Ashura',name_ar:'عاشوراء',month:1,day:10,icon:'ri-drop-line'}
];

export const DHIKR_DATA = [
  {cat:'morning',ar:'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ',trans:"Asbahna wa asbahal mulku lillah",mean:"We have reached the morning and at this very time the kingdom belongs to Allah.",src:"Sahih Muslim 2723",count:"1x"},
  {cat:'morning',ar:'اللَّهُمَّ بِكَ أَصْبَحْنَا وَبِكَ أَمْسَيْنَا وَبِكَ نَحْيَا وَبِكَ نَمُوتُ',trans:"Allahumma bika asbahna wa bika amsayna",mean:"O Allah, by Your leave we have reached the morning, by Your leave we live and die.",src:"Tirmidhi 3391",count:"1x"},
  {cat:'morning',ar:'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ',trans:"Subhan Allahi wa bihamdihi",mean:"Glory and praise be to Allah.",src:"Sahih Muslim 2692",count:"100x"},
  {cat:'evening',ar:'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ',trans:"Amsayna wa amsal mulku lillah",mean:"We have reached the evening and the kingdom belongs to Allah.",src:"Sahih Muslim 2723",count:"1x"},
  {cat:'evening',ar:'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ',trans:"A'udhu bikalimatillahit-tammati min sharri ma khalaq",mean:"I seek refuge in the perfect words of Allah from the evil of what He has created.",src:"Sahih Muslim 2708",count:"3x"},
  {cat:'afterprayer',ar:'أَسْتَغْفِرُ اللَّهَ',trans:"Astaghfirullah",mean:"I seek forgiveness from Allah.",src:"Sahih Muslim 591",count:"3x"},
  {cat:'afterprayer',ar:'اللَّهُمَّ أَنْتَ السَّلَامُ وَمِنْكَ السَّلَامُ تَبَارَكْتَ يَا ذَا الْجَلَالِ وَالْإِكْرَامِ',trans:"Allahumma antas-salamu wa minkas-salam",mean:"O Allah, You are Peace and from You comes peace. Blessed are You, O Owner of Majesty and Honor.",src:"Sahih Muslim 592",count:"1x"},
  {cat:'afterprayer',ar:'سُبْحَانَ اللَّهِ وَالْحَمْدُ لِلَّهِ وَاللَّهُ أَكْبَرُ',trans:"Subhan Allah, Alhamdulillah, Allahu Akbar",mean:"Glory be to Allah, Praise be to Allah, Allah is the Greatest.",src:"Sahih Muslim 595",count:"33x each"},
  {cat:'sleep',ar:'بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا',trans:"Bismika Allahumma amutu wa ahya",mean:"In Your name, O Allah, I die and I live.",src:"Sahih Bukhari 6324",count:"1x"},
  {cat:'sleep',ar:'اللَّهُمَّ قِنِي عَذَابَكَ يَوْمَ تَبْعَثُ عِبَادَكَ',trans:"Allahumma qini 'adhabaka yawma tab'athu 'ibadak",mean:"O Allah, protect me from Your punishment on the Day You resurrect Your servants.",src:"Abu Dawud 5045",count:"1x"},
  {cat:'protection',ar:'بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ',trans:"Bismillahil-ladhi la yadurru ma'asmihi shay'un fil-ardi wa la fis-sama'",mean:"In the name of Allah with whose name nothing on earth or heaven can cause harm.",src:"Tirmidhi 3388",count:"3x"},
  {cat:'protection',ar:'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّةِ مِنْ كُلِّ شَيْطَانٍ وَهَامَّةٍ',trans:"A'udhu bikalimatillahi at-tammah min kulli shaytanin wa hammah",mean:"I seek refuge in the perfect words of Allah from every devil and harmful creature.",src:"Sahih Bukhari 3371",count:"As needed"},
  {cat:'general',ar:'لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ',trans:"La ilaha illallahu wahdahu la sharika lah",mean:"There is no god but Allah alone, with no partner.",src:"Sahih Bukhari 6403",count:"100x"},
  {cat:'general',ar:'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ سُبْحَانَ اللَّهِ الْعَظِيمِ',trans:"Subhan Allahi wa bihamdihi, Subhan Allahil-Azim",mean:"Glory and praise be to Allah, Glory be to Allah the Almighty.",src:"Sahih Bukhari 6682",count:"Frequently"},
  {cat:'general',ar:'لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ',trans:"La hawla wa la quwwata illa billah",mean:"There is no power and no strength except with Allah.",src:"Sahih Bukhari 6384",count:"Frequently"}
];

export const DHIKR_CATS = [
  {id:'all',en:'All',ar:'الكل'},
  {id:'morning',en:'Morning',ar:'الصباح'},
  {id:'evening',en:'Evening',ar:'المساء'},
  {id:'afterprayer',en:'After Prayer',ar:'بعد الصلاة'},
  {id:'sleep',en:'Sleep',ar:'النوم'},
  {id:'protection',en:'Protection',ar:'الحماية'},
  {id:'general',en:'General',ar:'عام'}
];

export const NAMES_99 = [
  {n:1,ar:'الرَّحْمَنُ',t:'Ar-Rahman',m:'The Most Merciful'},{n:2,ar:'الرَّحِيمُ',t:'Ar-Raheem',m:'The Most Compassionate'},{n:3,ar:'المَلِكُ',t:'Al-Malik',m:'The King'},{n:4,ar:'القُدُّوسُ',t:'Al-Quddus',m:'The Most Holy'},{n:5,ar:'السَّلَامُ',t:'As-Salam',m:'The Source of Peace'},
  {n:6,ar:'المُؤْمِنُ',t:"Al-Mu'min",m:'The Guardian of Faith'},{n:7,ar:'المُهَيْمِنُ',t:'Al-Muhaymin',m:'The Protector'},{n:8,ar:'العَزِيزُ',t:'Al-Aziz',m:'The Almighty'},{n:9,ar:'الجَبَّارُ',t:'Al-Jabbar',m:'The Compeller'},{n:10,ar:'المُتَكَبِّرُ',t:'Al-Mutakabbir',m:'The Supreme'},
  {n:11,ar:'الخَالِقُ',t:'Al-Khaliq',m:'The Creator'},{n:12,ar:'البَارِئُ',t:'Al-Bari',m:'The Originator'},{n:13,ar:'المُصَوِّرُ',t:'Al-Musawwir',m:'The Fashioner'},{n:14,ar:'الغَفَّارُ',t:'Al-Ghaffar',m:'The Forgiver'},{n:15,ar:'القَهَّارُ',t:'Al-Qahhar',m:'The Subduer'},
  {n:16,ar:'الوَهَّابُ',t:'Al-Wahhab',m:'The Bestower'},{n:17,ar:'الرَّزَّاقُ',t:'Ar-Razzaq',m:'The Provider'},{n:18,ar:'الفَتَّاحُ',t:'Al-Fattah',m:'The Opener'},{n:19,ar:'العَلِيمُ',t:'Al-Aleem',m:'The All-Knowing'},{n:20,ar:'القَابِضُ',t:'Al-Qabid',m:'The Withholder'},
  {n:21,ar:'البَاسِطُ',t:'Al-Basit',m:'The Expander'},{n:22,ar:'الخَافِضُ',t:'Al-Khafid',m:'The Abaser'},{n:23,ar:'الرَّافِعُ',t:'Ar-Rafi',m:'The Exalter'},{n:24,ar:'المُعِزُّ',t:"Al-Mu'izz",m:'The Bestower of Honor'},{n:25,ar:'المُذِلُّ',t:'Al-Mudhill',m:'The Humiliator'},
  {n:26,ar:'السَّمِيعُ',t:'As-Sami',m:'The All-Hearing'},{n:27,ar:'البَصِيرُ',t:'Al-Basir',m:'The All-Seeing'},{n:28,ar:'الحَكَمُ',t:'Al-Hakam',m:'The Judge'},{n:29,ar:'العَدْلُ',t:'Al-Adl',m:'The Just'},{n:30,ar:'اللَّطِيفُ',t:'Al-Latif',m:'The Subtle'},
  {n:31,ar:'الخَبِيرُ',t:'Al-Khabir',m:'The All-Aware'},{n:32,ar:'الحَلِيمُ',t:'Al-Halim',m:'The Forbearing'},{n:33,ar:'العَظِيمُ',t:'Al-Azim',m:'The Magnificent'},{n:34,ar:'الغَفُورُ',t:'Al-Ghafur',m:'The Most Forgiving'},{n:35,ar:'الشَّكُورُ',t:'Ash-Shakur',m:'The Appreciative'},
  {n:36,ar:'العَلِيُّ',t:'Al-Ali',m:'The Most High'},{n:37,ar:'الكَبِيرُ',t:'Al-Kabir',m:'The Greatest'},{n:38,ar:'الحَفِيظُ',t:'Al-Hafiz',m:'The Preserver'},{n:39,ar:'المُقِيتُ',t:'Al-Muqit',m:'The Sustainer'},{n:40,ar:'الحَسِيبُ',t:'Al-Hasib',m:'The Reckoner'},
  {n:41,ar:'الجَلِيلُ',t:'Al-Jalil',m:'The Majestic'},{n:42,ar:'الكَرِيمُ',t:'Al-Karim',m:'The Generous'},{n:43,ar:'الرَّقِيبُ',t:'Ar-Raqib',m:'The Watchful'},{n:44,ar:'المُجِيبُ',t:'Al-Mujib',m:'The Responsive'},{n:45,ar:'الوَاسِعُ',t:'Al-Wasi',m:'The All-Encompassing'},
  {n:46,ar:'الحَكِيمُ',t:'Al-Hakim',m:'The All-Wise'},{n:47,ar:'الوَدُودُ',t:'Al-Wadud',m:'The Most Loving'},{n:48,ar:'المَجِيدُ',t:'Al-Majid',m:'The Glorious'},{n:49,ar:'البَاعِثُ',t:"Al-Ba'ith",m:'The Resurrector'},{n:50,ar:'الشَّهِيدُ',t:'Ash-Shahid',m:'The Witness'},
  {n:51,ar:'الحَقُّ',t:'Al-Haqq',m:'The Truth'},{n:52,ar:'الوَكِيلُ',t:'Al-Wakil',m:'The Trustee'},{n:53,ar:'القَوِيُّ',t:'Al-Qawiyy',m:'The Strong'},{n:54,ar:'المَتِينُ',t:'Al-Matin',m:'The Firm'},{n:55,ar:'الوَلِيُّ',t:'Al-Waliyy',m:'The Protecting Friend'},
  {n:56,ar:'الحَمِيدُ',t:'Al-Hamid',m:'The Praiseworthy'},{n:57,ar:'المُحْصِي',t:'Al-Muhsi',m:'The Counter'},{n:58,ar:'المُبْدِئُ',t:'Al-Mubdi',m:'The Originator'},{n:59,ar:'المُعِيدُ',t:"Al-Mu'id",m:'The Restorer'},{n:60,ar:'المُحْيِي',t:'Al-Muhyi',m:'The Giver of Life'},
  {n:61,ar:'المُمِيتُ',t:'Al-Mumit',m:'The Taker of Life'},{n:62,ar:'الحَيُّ',t:'Al-Hayy',m:'The Ever-Living'},{n:63,ar:'القَيُّومُ',t:'Al-Qayyum',m:'The Self-Subsisting'},{n:64,ar:'الوَاجِدُ',t:'Al-Wajid',m:'The Finder'},{n:65,ar:'المَاجِدُ',t:'Al-Majid',m:'The Noble'},
  {n:66,ar:'الوَاحِدُ',t:'Al-Wahid',m:'The One'},{n:67,ar:'الصَّمَدُ',t:'As-Samad',m:'The Eternal Refuge'},{n:68,ar:'القَادِرُ',t:'Al-Qadir',m:'The Able'},{n:69,ar:'المُقْتَدِرُ',t:'Al-Muqtadir',m:'The Powerful'},{n:70,ar:'المُقَدِّمُ',t:'Al-Muqaddim',m:'The Expediter'},
  {n:71,ar:'المُؤَخِّرُ',t:"Al-Mu'akhkhir",m:'The Delayer'},{n:72,ar:'الأَوَّلُ',t:'Al-Awwal',m:'The First'},{n:73,ar:'الآخِرُ',t:'Al-Akhir',m:'The Last'},{n:74,ar:'الظَّاهِرُ',t:'Az-Zahir',m:'The Manifest'},{n:75,ar:'البَاطِنُ',t:'Al-Batin',m:'The Hidden'},
  {n:76,ar:'الوَالِي',t:'Al-Wali',m:'The Governor'},{n:77,ar:'المُتَعَالِي',t:"Al-Muta'ali",m:'The Most Exalted'},{n:78,ar:'البَرُّ',t:'Al-Barr',m:'The Source of Goodness'},{n:79,ar:'التَّوَّابُ',t:'At-Tawwab',m:'The Acceptor of Repentance'},{n:80,ar:'المُنْتَقِمُ',t:'Al-Muntaqim',m:'The Avenger'},
  {n:81,ar:'العَفُوُّ',t:'Al-Afuww',m:'The Pardoner'},{n:82,ar:'الرَّؤُوفُ',t:"Ar-Ra'uf",m:'The Compassionate'},{n:83,ar:'مَالِكُ المُلْكِ',t:'Malik-ul-Mulk',m:'Owner of Sovereignty'},{n:84,ar:'ذُو الجَلَالِ وَالإِكْرَامِ',t:'Dhul-Jalali wal-Ikram',m:'Lord of Majesty & Generosity'},{n:85,ar:'المُقْسِطُ',t:'Al-Muqsit',m:'The Equitable'},
  {n:86,ar:'الجَامِعُ',t:'Al-Jami',m:'The Gatherer'},{n:87,ar:'الغَنِيُّ',t:'Al-Ghaniyy',m:'The Self-Sufficient'},{n:88,ar:'المُغْنِي',t:'Al-Mughni',m:'The Enricher'},{n:89,ar:'المَانِعُ',t:'Al-Mani',m:'The Preventer'},{n:90,ar:'الضَّارُّ',t:'Ad-Darr',m:'The Distresser'},
  {n:91,ar:'النَّافِعُ',t:'An-Nafi',m:'The Benefactor'},{n:92,ar:'النُّورُ',t:'An-Nur',m:'The Light'},{n:93,ar:'الهَادِي',t:'Al-Hadi',m:'The Guide'},{n:94,ar:'البَدِيعُ',t:'Al-Badi',m:'The Originator'},{n:95,ar:'البَاقِي',t:'Al-Baqi',m:'The Everlasting'},
  {n:96,ar:'الوَارِثُ',t:'Al-Warith',m:'The Inheritor'},{n:97,ar:'الرَّشِيدُ',t:'Ar-Rashid',m:'The Guide to the Right Path'},{n:98,ar:'الصَّبُورُ',t:'As-Sabur',m:'The Patient'},{n:99,ar:'اللَّهُ',t:'Allah',m:'God — The Greatest Name'}
];

export const HALAL_DB = {
  'e100':{s:'halal',n:'Curcumin/Turmeric',r:'Plant-based coloring from turmeric. Halal.'},
  'e120':{s:'haram',n:'Carmine/Cochineal',r:'Red dye extracted from crushed cochineal insects. Considered haram by majority of scholars.'},
  'e133':{s:'halal',n:'Brilliant Blue',r:'Synthetic color. Halal.'},
  'e160a':{s:'halal',n:'Carotene',r:'Plant-based orange color. Halal.'},
  'e170':{s:'halal',n:'Calcium Carbonate',r:'Mineral-based. Halal.'},
  'e200':{s:'halal',n:'Sorbic Acid',r:'Synthetic preservative. Halal.'},
  'e252':{s:'doubtful',n:'Potassium Nitrate',r:'Chemical preservative. Halal in itself, but often used in non-halal meat processing.'},
  'e322':{s:'halal',n:'Lecithin',r:'Usually from soy or sunflower. Halal. If from animal source, check if halal-slaughtered.'},
  'e330':{s:'halal',n:'Citric Acid',r:'Naturally found in citrus fruits. Halal.'},
  'e407':{s:'halal',n:'Carrageenan',r:'Seaweed extract. Halal.'},
  'e422':{s:'halal',n:'Glycerol',r:'Can be plant or animal-based. Plant-based glycerol is halal.'},
  'e441':{s:'haram',n:'Gelatin',r:'Usually derived from pig skin or bones. Haram unless certified from halal-slaughtered animals or fish.'},
  'e471':{s:'doubtful',n:'Mono & Diglycerides',r:'Can be plant or animal-based. If from plant (soy, palm), halal. If from animal fat, potentially haram.'},
  'e472':{s:'doubtful',n:'Esters of Mono/Diglycerides',r:'Same ruling as E471 — depends on the source.'},
  'e476':{s:'doubtful',n:'Polyglycerol',r:'Can be from plant or animal fat. Need to verify source with manufacturer.'},
  'e542':{s:'haram',n:'Bone Phosphate',r:'Derived from animal bones, often pork. Haram.'},
  'e621':{s:'halal',n:'Monosodium Glutamate (MSG)',r:'Synthetic flavor enhancer. Halal in itself.'},
  'e631':{s:'doubtful',n:'Sodium Inosinate',r:'Can be from animal or plant source. Often from sardines or yeast.'},
  'e904':{s:'doubtful',n:'Shellac',r:'Resin secreted by lac bugs. Scholars differ — some permit it, others consider it doubtful.'},
  'gelatin':{s:'haram',n:'Gelatin',r:'Usually from pig skin/bones. Haram unless certified halal (from halal-slaughtered animals or fish gelatin).'},
  'pork':{s:'haram',n:'Pork/Pig derivatives',r:'All pork products are clearly haram by Quran (Surah Al-Baqarah 2:173).'},
  'lard':{s:'haram',n:'Lard',r:'Pig fat. Clearly haram.'},
  'carmine':{s:'haram',n:'Carmine (E120)',r:'Red dye from crushed insects. Majority of scholars consider it haram.'},
  'alcohol':{s:'haram',n:'Alcohol/Ethanol',r:'Intoxicating alcohol is haram as a beverage. Trace amounts from natural fermentation in food are generally considered permissible.'},
  'ethanol':{s:'haram',n:'Ethanol',r:'If used as intoxicant or present in significant amounts, haram. Trace amounts in food processing may be excused by some scholars.'},
  'rennet':{s:'doubtful',n:'Rennet',r:'Enzyme used in cheese-making. If from halal-slaughtered animal or microbial/plant source, halal. Pork rennet is haram.'},
  'whey':{s:'halal',n:'Whey',r:'Dairy by-product. Halal in itself.'},
  'vanilla extract':{s:'doubtful',n:'Vanilla Extract',r:'Contains trace alcohol from extraction process. Many scholars permit it. Pure vanilla powder is safer.'},
  'pepsin':{s:'haram',n:'Pepsin',r:'Enzyme usually from pig stomach lining. Haram unless from halal source.'},
  'mono-diglycerides':{s:'doubtful',n:'Mono & Diglycerides',r:'Same as E471. Could be plant or animal origin.'},
  'l-cysteine':{s:'doubtful',n:'L-Cysteine',r:'Amino acid sometimes derived from human hair or duck feathers. If synthetic or plant-based, halal.'},
  'collagen':{s:'doubtful',n:'Collagen',r:'Usually from animal skin/bones. If from halal-slaughtered animal or fish, halal. If from pig, haram.'},
  'tallow':{s:'haram',n:'Tallow',r:'Animal fat, often from beef or pork. Beef tallow from halal source is halal. Pork tallow is haram.'}
};

// Source URL mapping for clickable source tags
export const SOURCE_URLS = {
  'Sunnah.com': 'https://sunnah.com',
  'IslamQA': 'https://islamqa.info',
  'IslamWeb': 'https://islamweb.net',
  'Bin Baz': 'https://binbaz.org.sa',
  'Ibn Uthaymin': 'https://binothaimeen.net',
  'Dorar.net': 'https://dorar.net',
  'Kalamullah': 'https://kalamullah.com',
  'MuslimMatters': 'https://muslimmatters.org',
  'Sahih Bukhari': 'https://sunnah.com/bukhari',
  'Sahih Muslim': 'https://sunnah.com/muslim',
  'Abu Dawud': 'https://sunnah.com/abudawud',
  'Tirmidhi': 'https://sunnah.com/tirmidhi',
  'Ibn Majah': 'https://sunnah.com/ibnmajah',
  'Ibn Kathir': 'https://quran.com',
  'Quran': 'https://quran.com',
  'MTafsir': 'https://mtafsir.net',
  'IslamWay': 'https://ar.islamway.net'
};
