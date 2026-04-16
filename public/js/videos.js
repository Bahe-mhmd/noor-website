// ═══════════════════════════════════════════════════
// NOOR — videos.js  ·  Video Library Data
//
// TWO SYSTEMS:
//   VIDEOS    → standalone single videos (existing system)
//   PLAYLISTS → ordered series with playlist sidebar (new)
//
// HOW TO ADD A STANDALONE VIDEO:
//   Add an entry to VIDEOS with a YouTube video ID.
//
// HOW TO ADD A PLAYLIST:
//   Add an entry to PLAYLISTS. Each playlist has a list
//   of {id, title} video objects. Speakers are optional.
//
// HOW TO GET A YOUTUBE VIDEO ID:
//   From: youtube.com/watch?v=dQw4w9WgXcQ
//   ID is: dQw4w9WgXcQ
// ═══════════════════════════════════════════════════

export const CATEGORIES = [
  { id:'all',       label:{ en:'All',              ar:'الكل',             fr:'Tout',          tr:'Hepsi',        ur:'سب',                id:'Semua'         }, icon:'ri-apps-2-line'      },
  { id:'tafsir',    label:{ en:'Tafsir',            ar:'التفسير',          fr:'Tafsir',        tr:'Tefsir',       ur:'تفسیر',              id:'Tafsir'        }, icon:'ri-book-open-line'   },
  { id:'lectures',  label:{ en:'Lectures',          ar:'محاضرات',          fr:'Conférences',   tr:'Dersler',      ur:'لیکچرز',             id:'Ceramah'       }, icon:'ri-mic-line'         },
  { id:'reminders', label:{ en:'Reminders',         ar:'مواعظ',            fr:'Rappels',       tr:'Nasihatler',   ur:'نصیحتیں',            id:'Nasihat'       }, icon:'ri-heart-line'       },
  { id:'stories',   label:{ en:'Prophets & Stories',ar:'قصص الأنبياء',     fr:'Histoires',     tr:'Kıssalar',     ur:'انبیاء کی کہانیاں',   id:'Kisah'         }, icon:'ri-moon-line'        },
  { id:'fiqh',      label:{ en:'Fiqh & Rulings',   ar:'فقه وأحكام',       fr:'Fiqh',          tr:'Fıkıh',        ur:'فقہ',                 id:'Fikih'         }, icon:'ri-scales-3-line'    },
  { id:'aqeedah',   label:{ en:'Aqeedah',           ar:'العقيدة',          fr:'Aqida',         tr:'Akide',        ur:'عقیدہ',              id:'Akidah'        }, icon:'ri-star-line'        },
  { id:'quran',     label:{ en:'Quran Recitation',  ar:'تلاوة القرآن',     fr:'Récitation',    tr:'Tilavet',      ur:'تلاوت',              id:'Tilawah'       }, icon:'ri-book-line'        },
  { id:'seerah',    label:{ en:'Seerah',            ar:'السيرة النبوية',   fr:'Seerah',        tr:'Siyer',        ur:'سیرت',               id:'Sirah'         }, icon:'ri-user-star-line'   },
  { id:'arabic',    label:{ en:'Arabic Learning',   ar:'تعلم العربية',     fr:'Langue Arabe',  tr:'Arapça',       ur:'عربی سیکھیں',        id:'Belajar Arab'  }, icon:'ri-font-size'        },
  { id:'playlist',  label:{ en:'Playlists',         ar:'قوائم التشغيل',    fr:'Playlists',     tr:'Çalma Listeleri',ur:'پلے لسٹ',          id:'Playlist'      }, icon:'ri-play-list-line'   },
];

// ── STANDALONE VIDEOS (existing system) ──
export const VIDEOS = [
  // ── TAFSIR ──
  { id:'XGuKPSGFMnY', title:'Tafsir Surah Al-Fatiha — The Opening',          category:'tafsir',    speaker:'Nouman Ali Khan',       lang:'en', duration:'40 min' },
  { id:'uMDuOxTKOXk', title:'Surah Al-Baqarah — Introduction & Overview',   category:'tafsir',    speaker:'Nouman Ali Khan',       lang:'en', duration:'55 min' },
  { id:'TiAQpR5AGFg', title:'Surah Al-Kahf — Lessons & Themes',             category:'tafsir',    speaker:'Nouman Ali Khan',       lang:'en', duration:'50 min' },
  { id:'wKGjdNkMxRQ', title:'Tafsir Surah Yasin — Heart of the Quran',      category:'tafsir',    speaker:'Mufti Menk',            lang:'en', duration:'35 min' },
  // ── LECTURES ──
  { id:'OmrSPmGrGME', title:'Why Islam? — A Compelling Explanation',        category:'lectures',  speaker:'Hamza Tzortzis',        lang:'en', duration:'60 min' },
  { id:'dDwdCRq-8i4', title:'The Purpose of Life in Islam',                 category:'lectures',  speaker:'Jeffrey Lang',          lang:'en', duration:'48 min' },
  { id:'Ot-4J2hJNcE', title:'Islam and Science — Are They Compatible?',     category:'lectures',  speaker:'Dr. Zakir Naik',        lang:'en', duration:'75 min' },
  // ── REMINDERS ──
  { id:'OmrSPmGrGME', title:'Gratitude — The Key to Abundance',             category:'reminders', speaker:'Mufti Menk',            lang:'en', duration:'18 min' },
  { id:'TiAQpR5AGFg', title:'Tawakkul — Trusting Allah Completely',         category:'reminders', speaker:'Omar Suleiman',         lang:'en', duration:'22 min' },
  { id:'dDwdCRq-8i4', title:'Death — The Greatest Reminder',                category:'reminders', speaker:'Bilal Philips',         lang:'en', duration:'30 min' },
  { id:'Ot-4J2hJNcE', title:'Dealing with Anxiety Through Islam',           category:'reminders', speaker:'Omar Suleiman',         lang:'en', duration:'25 min' },
  // ── PROPHETS & STORIES ──
  { id:'XGuKPSGFMnY', title:'The Story of Prophet Ibrahim ﷺ',               category:'stories',   speaker:'Yasir Qadhi',           lang:'en', duration:'65 min' },
  { id:'uMDuOxTKOXk', title:'Prophet Yusuf ﷺ — Lessons from the Quran',    category:'stories',   speaker:'Nouman Ali Khan',       lang:'en', duration:'80 min' },
  { id:'wKGjdNkMxRQ', title:'The Life of Prophet Musa ﷺ',                  category:'stories',   speaker:'Omar Suleiman',         lang:'en', duration:'55 min' },
  // ── FIQH ──
  { id:'TiAQpR5AGFg', title:'How to Perform Salah Correctly',               category:'fiqh',      speaker:'Bilal Philips',         lang:'en', duration:'35 min' },
  { id:'OmrSPmGrGME', title:'Zakat — Who Must Pay and How to Calculate',   category:'fiqh',      speaker:'Mufti Menk',            lang:'en', duration:'28 min' },
  // ── AQEEDAH ──
  { id:'dDwdCRq-8i4', title:'The 99 Names of Allah — Al-Asma ul-Husna',    category:'aqeedah',   speaker:'Yasir Qadhi',           lang:'en', duration:'90 min' },
  { id:'XGuKPSGFMnY', title:'Tawhid — The Foundation of Islam',            category:'aqeedah',   speaker:'Bilal Philips',         lang:'en', duration:'45 min' },
  { id:'wKGjdNkMxRQ', title:'Signs of the Day of Judgement',               category:'aqeedah',   speaker:'Omar Suleiman',         lang:'en', duration:'52 min' },
  // ── QURAN RECITATION ──
  { id:'uMDuOxTKOXk', title:'Surah Al-Mulk — Mishary Rashid Al-Afasy',     category:'quran',     speaker:'Mishary Rashid Al-Afasy',lang:'ar', duration:'10 min' },
  { id:'TiAQpR5AGFg', title:'Surah Al-Rahman — Abdul Rahman Al-Sudais',    category:'quran',     speaker:'Abdul Rahman Al-Sudais', lang:'ar', duration:'12 min' },
  { id:'OmrSPmGrGME', title:'Surah Al-Kahf — Maher Al-Muaiqly',           category:'quran',     speaker:'Maher Al-Muaiqly',      lang:'ar', duration:'25 min' },
  // ── SEERAH ──
  { id:'Ot-4J2hJNcE', title:'The Sealed Nectar — Life of Prophet ﷺ',       category:'seerah',    speaker:'Yasir Qadhi',           lang:'en', duration:'70 min' },
  { id:'dDwdCRq-8i4', title:'The Hijra — Migration to Madinah',            category:'seerah',    speaker:'Omar Suleiman',         lang:'en', duration:'45 min' },
  // ── ARABIC LEARNING ──
  { id:'XGuKPSGFMnY', title:'Arabic for Beginners — Lesson 1',             category:'arabic',    speaker:'Nouman Ali Khan',       lang:'en', duration:'30 min' },
  { id:'uMDuOxTKOXk', title:'Understanding Quranic Arabic — Fundamentals', category:'arabic',    speaker:'Nouman Ali Khan',       lang:'en', duration:'50 min' },
];

// ── PLAYLISTS (new system) ──
// Each playlist has an id, title, description, thumbnail (optional),
// speaker, category, and an ordered videos array.
export const PLAYLISTS = [
  {
    id: 'PLx3Fh1kiMbrcDYytEoWVt7bHqyP2iNjnn',
    title: 'مجالس صحيح مسلم ( كاملة )',
    description: 'by Dr. Othman Alkamees - الشيخ الدكتور عثمان الخميس',
    speaker: 'Dr Othman Alkhamees',
    category: 'tafsir',
    // Thumbnail auto-generated from first video's ID
    videos: [
      { id:'EP3Ss6Szn9o', title:'صحيح مسلم المجلس (01) السند / المقدمة إلى الحديث (92) / الشيخ د. عثمان الخميس', duration:'1h 37 min' },
      { id:'TYHGfZXRImY', title:'صحيح مسلم المجلس (02) المقدمة إلى الحديث (30) في كتاب الإيمان / الشيخ د. عثمان الخميس', duration:'1h 25 min' },
      { id:'Z36JqmNjilM', title:'صحيح مسلم المجلس (03) كتاب الإيمان من الحديث (31) إلى الحديث (91) / الشيخ د. عثمان الخميس', duration:'1h 30 min' },
      { id:'uuxm6NZwTbw', title:'صحيح مسلم المجلس (04) كتاب الإيمان من الحديث (92) إلى الحديث (139) / الشيخ د. عثمان الخميس', duration:'1h 25 min' },
      { id:'Tj4WALlxaJk', title:'صحيح مسلم المجلس (05) كتاب الإيمان من الحديث (140) إلى الحديث (171) / الشيخ د. عثمان الخميس', duration:'1h 23 min' },
      { id:'meLLExZb3Ps', title:'صحيح مسلم المجلس (06) كتاب الإيمان من الحديث (172) إلى الحديث (201) / الشيخ د. عثمان الخميس', duration:'1h 29 min' },
      { id:'pjH8LDZr0qQ', title:'صحيح مسلم المجلس (07) كتاب الإيمان من الحديث (202) إلى الحديث (261) / الشيخ د. عثمان الخميس', duration:'1h 29 min' },
      { id:'6tnT-K3zexs', title:'صحيح مسلم المجلس (08) كتاب الطهارة من الحديث (203) إلى الحديث (315) / الشيخ د. عثمان الخميس', duration:'1h 33 min' },
      { id:'BCj7hfXFvKo', title:'صحيح مسلم المجلس (09) كتاب الإيمان من الحديث (316) إلى الحديث (376) / الشيخ د. عثمان الخميس', duration:'1h 41 min' },
      { id:'yW9eVDrq6mQ', title:'صحيح مسلم المجلس (10) كتاب الإيمان من الحديث (377) إلى الحديث (421) / الشيخ د. عثمان الخميس', duration:'1h 45 min' },
      { id:'XVMwoZwfMkQ', title:'صحيح مسلم المجلس (11) كتاب الإيمان من الحديث (421) إلى الحديث (498) / الشيخ د. عثمان الخميس', duration:'1h 50 min' },
      { id:'8GFIqrCEzno', title:'صحيح مسلم المجلس (12) كتاب الصلاة من الحديث (499) إلى الحديث (556) / الشيخ د. عثمان الخميس', duration:'1h 48 min' },
      { id:'-gIHdE34yws', title:'صحيح مسلم المجلس (13) كتاب الصلاة من الحديث (556) إلى الحديث (615) / الشيخ د. عثمان الخميس', duration:'1h 49 min' },
      { id:'n5NHfOUQ0Fo', title:'صحيح مسلم المجلس (14) كتاب المساجد ومواضع الصلاة من الحديث (615) إلى (684) / الشيخ د. عثمان الخميس', duration:'1h 59 min' },
      { id:'Oe-tp7muhvE', title:'صحيح مسلم المجلس (15) كتاب صلاة المسافرين وقصرها من الحديث (685) إلى (735) / الشيخ د. عثمان الخميس', duration:'1h 28 min' },
      { id:'GZOTVC_xWrQ', title:'صحيح مسلم المجلس (16) كتاب صلاة المسافرين وقصرها من الحديث (736) إلى (787) / الشيخ د. عثمان الخميس', duration:'1h 29 min' },
]
    ]
  },
  {
    id: 'seerah_omar',
    title: 'The Firsts — Seerah of Prophet Muhammad ﷺ',
    description: 'A comprehensive journey through the life of the Prophet ﷺ.',
    speaker: 'Omar Suleiman',
    category: 'seerah',
    videos: [
      { id:'Ot-4J2hJNcE', title:'Episode 1 — Before the Prophet ﷺ',       duration:'35 min' },
      { id:'dDwdCRq-8i4', title:'Episode 2 — Birth & Early Life',          duration:'40 min' },
      { id:'wKGjdNkMxRQ', title:'Episode 3 — The First Revelation',        duration:'45 min' },
      { id:'XGuKPSGFMnY', title:'Episode 4 — The Early Believers',         duration:'38 min' },
      { id:'uMDuOxTKOXk', title:'Episode 5 — Persecution in Makkah',       duration:'42 min' },
      { id:'TiAQpR5AGFg', title:'Episode 6 — The Hijra to Madinah',        duration:'50 min' },
      { id:'OmrSPmGrGME', title:'Episode 7 — Building the New Society',    duration:'48 min' },
    ]
  },
  {
    id: 'names_of_allah',
    title: 'The Names of Allah — Al-Asma ul-Husna',
    description: 'Explore the 99 names of Allah and their meanings in depth.',
    speaker: 'Yasir Qadhi',
    category: 'aqeedah',
    videos: [
      { id:'dDwdCRq-8i4', title:'Lesson 1 — Introduction to the Names',   duration:'30 min' },
      { id:'XGuKPSGFMnY', title:'Lesson 2 — Al-Rahman & Al-Raheem',       duration:'35 min' },
      { id:'wKGjdNkMxRQ', title:'Lesson 3 — Al-Malik & Al-Quddus',        duration:'32 min' },
      { id:'uMDuOxTKOXk', title:'Lesson 4 — Al-Aziz & Al-Jabbar',         duration:'38 min' },
      { id:'TiAQpR5AGFg', title:'Lesson 5 — Al-Alim & Al-Khabir',         duration:'40 min' },
      { id:'Ot-4J2hJNcE', title:'Lesson 6 — Al-Hayy & Al-Qayyum',         duration:'36 min' },
    ]
  },
  {
    id: 'arabic_bayyinah',
    title: 'Arabic with the Quran — Beginner Series',
    description: 'Learn Quranic Arabic step by step from scratch.',
    speaker: 'Nouman Ali Khan',
    category: 'arabic',
    videos: [
      { id:'XGuKPSGFMnY', title:'Lesson 1 — Arabic Alphabets & Sounds',   duration:'30 min' },
      { id:'uMDuOxTKOXk', title:'Lesson 2 — Nouns in Arabic',              duration:'35 min' },
      { id:'TiAQpR5AGFg', title:'Lesson 3 — Verbs & Their Roots',          duration:'40 min' },
      { id:'OmrSPmGrGME', title:'Lesson 4 — Sentence Structure',           duration:'38 min' },
      { id:'wKGjdNkMxRQ', title:'Lesson 5 — Reading the Quran',            duration:'45 min' },
    ]
  },
  {
    id: 'stories_prophets',
    title: 'Stories of the Prophets — Complete Series',
    description: 'From Adam ﷺ to Muhammad ﷺ — inspiring stories of all the prophets.',
    speaker: 'Omar Suleiman',
    category: 'stories',
    videos: [
      { id:'XGuKPSGFMnY', title:'Prophet Adam ﷺ — The First Human',       duration:'45 min' },
      { id:'uMDuOxTKOXk', title:'Prophet Idris ﷺ',                        duration:'30 min' },
      { id:'TiAQpR5AGFg', title:'Prophet Nuh ﷺ — The Great Flood',        duration:'55 min' },
      { id:'wKGjdNkMxRQ', title:'Prophet Ibrahim ﷺ — Friend of Allah',    duration:'65 min' },
      { id:'OmrSPmGrGME', title:'Prophet Yusuf ﷺ — The Best of Stories',  duration:'80 min' },
      { id:'dDwdCRq-8i4', title:'Prophet Musa ﷺ — Against Pharaoh',       duration:'70 min' },
      { id:'Ot-4J2hJNcE', title:'Prophet Isa ﷺ — Messiah of Allah',       duration:'50 min' },
    ]
  },
];
