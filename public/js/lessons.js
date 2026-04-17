// ═══════════════════════════════════════════════════
// NOOR — lessons.js  ·  Islamic Lessons Data
//
// COMPLETELY SEPARATE from videos.js — do NOT import
// this file into the video system or mix state.
//
// HOW TO ADD A NEW LESSON SERIES:
//   1. Add an entry to LESSONS array below
//   2. Give it a unique id (no spaces)
//   3. Add videos array with YouTube IDs and titles
//   4. It appears automatically in the Lessons page
//
// HOW TO GET A YOUTUBE VIDEO ID:
//   youtube.com/watch?v=EP3Ss6Szn9o  →  ID: EP3Ss6Szn9o
//
// FIELDS:
//   id         (required) Unique string identifier
//   title      (required) Series name
//   speaker    (required) Scholar/teacher name
//   category   (required) e.g. 'hadith' | 'tafsir' | 'aqeedah' | 'fiqh' | 'seerah' | 'arabic'
//   level      (optional) 'beginner' | 'intermediate' | 'advanced'
//   lang       (optional) 'ar' | 'en' | 'fr'
//   description(optional) Short description shown on card
//   playlistId (optional) YouTube playlist ID for reference only
//   videos     (required) Ordered array of lesson episodes
// ═══════════════════════════════════════════════════

export const LESSON_CATEGORIES = [
  { id:'all',          label:{ en:'All Lessons',   ar:'كل الدروس',     fr:'Tous',           tr:'Hepsi',       ur:'سب'              }, icon:'ri-apps-2-line'      },
  { id:'hadith',       label:{ en:'Hadith',        ar:'الحديث',        fr:'Hadith',         tr:'Hadis',       ur:'حدیث'            }, icon:'ri-book-marked-line' },
  { id:'tafsir',       label:{ en:'Tafsir',        ar:'التفسير',       fr:'Tafsir',         tr:'Tefsir',      ur:'تفسیر'           }, icon:'ri-book-open-line'   },
  { id:'aqeedah',      label:{ en:'Aqeedah',       ar:'العقيدة',       fr:'Aqida',          tr:'Akide',       ur:'عقیدہ'           }, icon:'ri-star-line'        },
  { id:'fiqh',         label:{ en:'Fiqh',          ar:'الفقه',         fr:'Fiqh',           tr:'Fıkıh',       ur:'فقہ'             }, icon:'ri-scales-3-line'    },
  { id:'seerah',       label:{ en:'Seerah',        ar:'السيرة',        fr:'Seerah',         tr:'Siyer',       ur:'سیرت'            }, icon:'ri-user-star-line'   },
  { id:'arabic',       label:{ en:'Arabic',        ar:'اللغة العربية', fr:'Arabe',          tr:'Arapça',      ur:'عربی'            }, icon:'ri-font-size'        },
];

export const LESSONS = [
  // ──────────────────────────────────────────────
  // HADITH SERIES
  // ──────────────────────────────────────────────
{
    id: 'arbaeen_nawawi',
    title: 'The 40 Hadith of Imam Al-Nawawi',
    speaker: 'Yasir Qadhi',
    category: 'hadith',
    level: 'beginner',
    lang: 'en',
    description: "A detailed explanation of the 40 foundational hadith compiled by Imam Nawawi — essential knowledge for every Muslim.",
    videos: [
      { id:'dDwdCRq-8i4', title:'Introduction — Who was Imam Nawawi?',                  duration:'28 min' },
      { id:'XGuKPSGFMnY', title:'Hadith 1 — Actions are by Intentions',                 duration:'45 min' },
      { id:'TiAQpR5AGFg', title:'Hadith 2 — Islam, Iman, and Ihsan',                   duration:'52 min' },
      { id:'wKGjdNkMxRQ', title:'Hadith 3 — The Pillars of Islam',                     duration:'40 min' },
      { id:'OmrSPmGrGME', title:'Hadith 5 — Innovations in Religion',                  duration:'38 min' },
      { id:'Ot-4J2hJNcE', title:'Hadith 6 — Halal and Haram are Clear',               duration:'42 min' },
      { id:'EP3Ss6Szn9o', title:'Hadith 9 — Avoiding What You Are Prohibited',         duration:'35 min' },
      { id:'uMDuOxTKOXk', title:'Hadith 12 — Leaving What Does Not Concern You',       duration:'33 min' },
      { id:'dDwdCRq-8i4', title:'Hadith 17 — Allah Wrote Down Good and Evil Deeds',   duration:'48 min' },
      { id:'XGuKPSGFMnY', title:'Hadith 19 — Be Mindful of Allah',                    duration:'44 min' },
      { id:'TiAQpR5AGFg', title:'Hadith 29 — Actions That Help You Enter Paradise',   duration:'50 min' },
      { id:'wKGjdNkMxRQ', title:'Hadith 42 — The Width of Allah\'s Forgiveness',      duration:'55 min' },
    ]
  },
  {
    id: 'arbaeen_nawawi',
    title: 'The 40 Hadith of Imam Al-Nawawi',
    speaker: 'Yasir Qadhi',
    category: 'hadith',
    level: 'beginner',
    lang: 'en',
    description: "A detailed explanation of the 40 foundational hadith compiled by Imam Nawawi — essential knowledge for every Muslim.",
    videos: [
      { id:'dDwdCRq-8i4', title:'Introduction — Who was Imam Nawawi?',                  duration:'28 min' },
      { id:'XGuKPSGFMnY', title:'Hadith 1 — Actions are by Intentions',                 duration:'45 min' },
      { id:'TiAQpR5AGFg', title:'Hadith 2 — Islam, Iman, and Ihsan',                   duration:'52 min' },
      { id:'wKGjdNkMxRQ', title:'Hadith 3 — The Pillars of Islam',                     duration:'40 min' },
      { id:'OmrSPmGrGME', title:'Hadith 5 — Innovations in Religion',                  duration:'38 min' },
      { id:'Ot-4J2hJNcE', title:'Hadith 6 — Halal and Haram are Clear',               duration:'42 min' },
      { id:'EP3Ss6Szn9o', title:'Hadith 9 — Avoiding What You Are Prohibited',         duration:'35 min' },
      { id:'uMDuOxTKOXk', title:'Hadith 12 — Leaving What Does Not Concern You',       duration:'33 min' },
      { id:'dDwdCRq-8i4', title:'Hadith 17 — Allah Wrote Down Good and Evil Deeds',   duration:'48 min' },
      { id:'XGuKPSGFMnY', title:'Hadith 19 — Be Mindful of Allah',                    duration:'44 min' },
      { id:'TiAQpR5AGFg', title:'Hadith 29 — Actions That Help You Enter Paradise',   duration:'50 min' },
      { id:'wKGjdNkMxRQ', title:'Hadith 42 — The Width of Allah\'s Forgiveness',      duration:'55 min' },
    ]
  },

  // ──────────────────────────────────────────────
  // TAFSIR SERIES
  // ──────────────────────────────────────────────
  {
    id: 'tafsir_juz_amma',
    title: "Tafsir Juz' Amma — Complete",
    speaker: 'Nouman Ali Khan',
    category: 'tafsir',
    level: 'beginner',
    lang: 'en',
    description: "A beautiful explanation of the last Juz' of the Quran — the surahs most memorized and recited in daily prayers.",
    videos: [
      { id:'EP3Ss6Szn9o', title:"Introduction to Juz' Amma",                           duration:'32 min' },
      { id:'uMDuOxTKOXk', title:'Surah An-Naba (78) — The Great Tidings',              duration:'45 min' },
      { id:'XGuKPSGFMnY', title:'Surah An-Nazi\'at (79) — Those Who Pull Out',        duration:'38 min' },
      { id:'TiAQpR5AGFg', title:'Surah Al-Infitar (82) — The Cleaving',               duration:'28 min' },
      { id:'wKGjdNkMxRQ', title:'Surah Al-Inshiqaq (84) — The Splitting',             duration:'30 min' },
      { id:'OmrSPmGrGME', title:'Surah Al-Ghashiyah (88) — The Overwhelming',        duration:'35 min' },
      { id:'dDwdCRq-8i4', title:'Surah Al-Fajr (89) — The Dawn',                     duration:'42 min' },
      { id:'Ot-4J2hJNcE', title:"Surah Al-Sharh (94) — The Relief",                  duration:'25 min' },
      { id:'EP3Ss6Szn9o', title:'Surah Al-Qadr (97) — The Night of Power',            duration:'40 min' },
      { id:'uMDuOxTKOXk', title:'Surah Al-Adiyat (100) — The Coursers',               duration:'22 min' },
      { id:'XGuKPSGFMnY', title:'Surah Al-Asr (103) — Time',                          duration:'35 min' },
      { id:'TiAQpR5AGFg', title:'Surah Al-Ikhlas (112) — Sincerity',                  duration:'48 min' },
      { id:'wKGjdNkMxRQ', title:'Surah Al-Falaq & An-Naas (113-114)',                duration:'50 min' },
    ]
  },
  {
    id: 'tafsir_yaseen_series',
    title: 'Surah Yasin — In-Depth Study',
    speaker: 'Omar Suleiman',
    category: 'tafsir',
    level: 'intermediate',
    lang: 'en',
    description: "An in-depth lesson-by-lesson study of the heart of the Quran — Surah Yasin — covering its themes of resurrection, prophethood, and divine power.",
    videos: [
      { id:'OmrSPmGrGME', title:'Lesson 1 — Why Is Yasin Called the Heart of the Quran?', duration:'38 min' },
      { id:'dDwdCRq-8i4', title:'Lesson 2 — Verses 1-12: The Sealed Hearts',          duration:'42 min' },
      { id:'Ot-4J2hJNcE', title:'Lesson 3 — Verses 13-27: The Companions of the Town', duration:'45 min' },
      { id:'EP3Ss6Szn9o', title:'Lesson 4 — Verses 28-50: Signs of Creation',         duration:'40 min' },
      { id:'uMDuOxTKOXk', title:'Lesson 5 — Verses 51-83: The Day of Resurrection',  duration:'52 min' },
    ]
  },

  // ──────────────────────────────────────────────
  // AQEEDAH SERIES
  // ──────────────────────────────────────────────
  {
    id: 'aqeedah_tahawiyyah',
    title: 'Al-Aqeedah Al-Tahawiyyah — Creed of Islam',
    speaker: 'Bilal Philips',
    category: 'aqeedah',
    level: 'advanced',
    lang: 'en',
    description: "A systematic study of one of the most important classical texts on Islamic theology — the creed of Imam Al-Tahawi.",
    videos: [
      { id:'XGuKPSGFMnY', title:'Lesson 1 — Introduction to Islamic Creed',           duration:'55 min' },
      { id:'TiAQpR5AGFg', title:'Lesson 2 — The Essence of Allah',                   duration:'48 min' },
      { id:'wKGjdNkMxRQ', title:'Lesson 3 — The Attributes of Allah',                duration:'60 min' },
      { id:'OmrSPmGrGME', title:'Lesson 4 — The Quran: Word of Allah',               duration:'45 min' },
      { id:'dDwdCRq-8i4', title:'Lesson 5 — Prophethood and Its Conditions',         duration:'52 min' },
      { id:'Ot-4J2hJNcE', title:'Lesson 6 — The Signs Before Day of Judgement',     duration:'58 min' },
      { id:'EP3Ss6Szn9o', title:'Lesson 7 — Qadar: Divine Decree',                  duration:'50 min' },
      { id:'uMDuOxTKOXk', title:'Lesson 8 — The Intercession & the Hereafter',      duration:'65 min' },
    ]
  },

  // ──────────────────────────────────────────────
  // FIQH SERIES
  // ──────────────────────────────────────────────
  {
    id: 'fiqh_purification_prayer',
    title: 'Purification & Prayer — Complete Fiqh',
    speaker: 'Mufti Menk',
    category: 'fiqh',
    level: 'beginner',
    lang: 'en',
    description: "A beginner-friendly, complete guide to the fiqh of purification (taharah) and prayer (salah) according to the four madhahib.",
    videos: [
      { id:'XGuKPSGFMnY', title:'Lesson 1 — What is Fiqh?',                          duration:'28 min' },
      { id:'TiAQpR5AGFg', title:'Lesson 2 — Types of Water for Purification',        duration:'32 min' },
      { id:'wKGjdNkMxRQ', title:'Lesson 3 — Wudu: Step by Step',                    duration:'40 min' },
      { id:'OmrSPmGrGME', title:'Lesson 4 — Nullifiers of Wudu',                   duration:'35 min' },
      { id:'dDwdCRq-8i4', title:'Lesson 5 — Ghusl: Ritual Bath',                   duration:'38 min' },
      { id:'Ot-4J2hJNcE', title:'Lesson 6 — Tayammum: Dry Purification',           duration:'30 min' },
      { id:'EP3Ss6Szn9o', title:'Lesson 7 — The Conditions of Salah',               duration:'42 min' },
      { id:'uMDuOxTKOXk', title:'Lesson 8 — How to Perform the Prayer',            duration:'55 min' },
      { id:'XGuKPSGFMnY', title:'Lesson 9 — Prayer Times & Making Up Missed Prayers',duration:'45 min' },
      { id:'TiAQpR5AGFg', title:'Lesson 10 — Friday Prayer & Congregation',        duration:'48 min' },
    ]
  },

  // ──────────────────────────────────────────────
  // SEERAH SERIES
  // ──────────────────────────────────────────────
  {
    id: 'seerah_complete_yasir',
    title: 'The Sealed Nectar — Seerah of the Prophet ﷺ',
    speaker: 'Yasir Qadhi',
    category: 'seerah',
    level: 'intermediate',
    lang: 'en',
    description: "The most comprehensive Seerah series in English — covering the entire life of Prophet Muhammad ﷺ from birth to his final days.",
    videos: [
      { id:'dDwdCRq-8i4', title:'Episode 1 — The Arabian Peninsula Before Islam',     duration:'60 min' },
      { id:'Ot-4J2hJNcE', title:'Episode 2 — The Birth of the Prophet ﷺ',            duration:'55 min' },
      { id:'EP3Ss6Szn9o', title:'Episode 3 — Childhood & Youth of the Prophet ﷺ',   duration:'58 min' },
      { id:'uMDuOxTKOXk', title:'Episode 4 — The First Revelation in Cave Hira',    duration:'65 min' },
      { id:'XGuKPSGFMnY', title:'Episode 5 — The Early Believers',                   duration:'62 min' },
      { id:'TiAQpR5AGFg', title:'Episode 6 — Years of Persecution in Makkah',       duration:'70 min' },
      { id:'wKGjdNkMxRQ', title:'Episode 7 — The Night Journey (Isra & Miraj)',     duration:'75 min' },
      { id:'OmrSPmGrGME', title:'Episode 8 — The Hijra to Madinah',                 duration:'68 min' },
      { id:'dDwdCRq-8i4', title:'Episode 9 — Building the Islamic State in Madinah',duration:'72 min' },
      { id:'Ot-4J2hJNcE', title:'Episode 10 — The Battle of Badr',                  duration:'80 min' },
      { id:'EP3Ss6Szn9o', title:'Episode 11 — The Battle of Uhud & Its Lessons',    duration:'78 min' },
      { id:'uMDuOxTKOXk', title:'Episode 12 — The Conquest of Makkah',              duration:'85 min' },
      { id:'XGuKPSGFMnY', title:'Episode 13 — The Final Sermon & Farewell',         duration:'90 min' },
    ]
  },

  // ──────────────────────────────────────────────
  // ARABIC LANGUAGE SERIES
  // ──────────────────────────────────────────────
  {
    id: 'PLWl0zRDk50wKM4WZAZEx_gwUDFKwe2ObX',
    title: 'Arabic from the Beginning — Beginner Series',
    description: 'I am appealing to you today to please click on the link below to my charity appeal and make a donation to help me complete the project of building an educational Resources Centre and a public library in my hometown Ogbomosho south western Nigeria, This is an eighteen-lesson course for absolute beginners wishing to learn Arabic, The course as a whole is based on the book ARABIC FROM THE BEGINNING by Dr. Imran Hamza.',
    speaker: 'Imran Alawiye',
    category: 'arabic',
    videos: [
  { id:'Qwdyx9kAPlU', title:'Lesson 1 Arabic from the Beginning', category:'arabic', speaker:'Imran Alawiye', lang:'en', duration:'28 min' },
  { id:'A25GzzfmSvo', title:'Lesson 2 Arabic from the Beginning', category:'arabic', speaker:'Imran Alawiye', lang:'en', duration:'26 min' },
  { id:'OU2e74KaIrU', title:'Lesson 3 Arabic from the Beginning', category:'arabic', speaker:'Imran Alawiye', lang:'en', duration:'33 min' },
  { id:'PSB1i3Z3Uec', title:'Lesson 4 Arabic from the Beginning', category:'arabic', speaker:'Imran Alawiye', lang:'en', duration:'24 min' },
  { id:'HSR6R2fTw2k', title:'Lesson 5 Arabic from the Beginning', category:'arabic', speaker:'Imran Alawiye', lang:'en', duration:'27 min' },
  { id:'e4OCP3XK9_8', title:'Lesson 6 Arabic from the Beginning', category:'arabic', speaker:'Imran Alawiye', lang:'en', duration:'24 min' },
  { id:'i652aJDINSw', title:'Lesson 7 Arabic from the Beginning', category:'arabic', speaker:'Imran Alawiye', lang:'en', duration:'29 min' },
  { id:'FGzEfbommsA', title:'Lesson 8 Arabic from the Beginning', category:'arabic', speaker:'Imran Alawiye', lang:'en', duration:'30 min' },
  { id:'JV3Qhz14Cuc', title:'Lesson 9 Arabic from the Beginning', category:'arabic', speaker:'Imran Alawiye', lang:'en', duration:'30 min' },
  { id:'Mxjpe3dnH7E', title:'Lesson 10 Arabic from the Beginning', category:'arabic', speaker:'Imran Alawiye', lang:'en', duration:'29 min' },
  { id:'OQ1KXU-Jh8w', title:'Lesson 11 Arabic from the Beginning', category:'arabic', speaker:'Imran Alawiye', lang:'en', duration:'27 min' },
  { id:'P5Xjl5R4X3k', title:'Lesson 12, Arabic from the Beginning', category:'arabic', speaker:'Imran Alawiye', lang:'en', duration:'30 min' },
  { id:'Ps5eOnWvW2I', title:'Lesson 13 Arabic from the Beginning', category:'arabic', speaker:'Imran Alawiye', lang:'en', duration:'29 min' },
  { id:'3l48XGNIkNw', title:'Lesson 14 Arabic from the Beginning', category:'arabic', speaker:'Imran Alawiye', lang:'en', duration:'38 min' },
  { id:'Gtou9se_Mhc', title:'Lesson 15 Arabic from the Beginning', category:'arabic', speaker:'Imran Alawiye', lang:'en', duration:'33 min' },
  { id:'loK_NjFeOkY', title:'Lesson 16 Arabic from the Beginning', category:'arabic', speaker:'Imran Alawiye', lang:'en', duration:'27 min' },
  { id:'KVJnCIfhR1A', title:'Lesson 17 Arabic from the Beginning', category:'arabic', speaker:'Imran Alawiye', lang:'en', duration:'27 min' },
  { id:'OnxdNiPWfbc', title:'Lesson 18 Arabic from the Beginning', category:'arabic', speaker:'Imran Alawiye', lang:'en', duration:'22 min' },
  { id:'r888L92pRL0', title:'Gateway to Arabic Flashcard Set One:       Arabic Alphabet: Pronounciation Practice', category:'arabic', speaker:'Imran Alawiye', lang:'en', duration:'39 min' },
  { id:'9cGvNyqLsSI', title:'An Appeal by Dr Imran Alawiye on behalf of Helping Hands for Education charity', category:'arabic', speaker:'Imran Alawiye', lang:'en', duration:'3 min' },
    ]
  },
  {
    id: 'PLWl0zRDk50wKAYJp0jZrNhCOUI9eemIq7',
    title: 'Lets Speak Arabic — Unit One',
    description: 'The ‘Let’s Speak Arabic’ series is subdivided into units. This unit, Unit One, teaches Arabic greetings; various ways of saying ‘hello’ and ‘goodbye’; introducing oneself; asking about someone’s health and appropriate responses; asking after someone’s marital status, nationality, occupation, and whether he/she has children; as well as general points of etiquette.',
    speaker: 'Imran Alawiye',
    category: 'arabic',
    videos: [
  { id:'Ea_wpXWr0jo', title:'Let\'s Speak Arabic, Unit One Lesson One', category:'arabic', speaker:'Imran Alawiye', lang:'en', duration:'25 min' },
  { id:'OLX6Y4HxlJc', title:'Let\'s Speak Arabic, Unit One, Lesson Two', category:'arabic', speaker:'Imran Alawiye', lang:'en', duration:'5 min' },
  { id:'qS9etClx3Q0', title:'Let\'s Speak Arabic, Unit One Lesson Three', category:'arabic', speaker:'Imran Alawiye', lang:'en', duration:'9 min' },
  { id:'GwmeuP2FkOA', title:'Let\'s Speak Arabic, Unit One Lesson Four', category:'arabic', speaker:'Imran Alawiye', lang:'en', duration:'8 min' },
  { id:'45CGPEkAKcI', title:'Let\'s Speak Arabic, Unit One Lesson Five', category:'arabic', speaker:'Imran Alawiye', lang:'en', duration:'8 min' },
  { id:'_sunOxBeRCM', title:'Let\'s Speak Arabic, Unit One Lesson Six', category:'arabic', speaker:'Imran Alawiye', lang:'en', duration:'11 min' },
  { id:'lCr2vZDUta8', title:'Let\'s Speak Arabic, Unit One Lesson Seven', category:'arabic', speaker:'Imran Alawiye', lang:'en', duration:'8 min' },
  { id:'zKFglEpDUEc', title:'Let\'s Speak Arabic, Unit One Lesson Eight', category:'arabic', speaker:'Imran Alawiye', lang:'en', duration:'16 min' },
  { id:'dMMGBgsdLVQ', title:'Let\'s Speak Arabic, Unit One Lesson Eleven', category:'arabic', speaker:'Imran Alawiye', lang:'en', duration:'7 min' },
  { id:'GDA1w5u6370', title:'Let\'s Speak Arabic, Unit One Lesson Nine', category:'arabic', speaker:'Imran Alawiye', lang:'en', duration:'9 min' },
  { id:'l2TTLHalcV0', title:'Let\'s Speak Arabic, Unit One Lesson Ten', category:'arabic', speaker:'Imran Alawiye', lang:'en', duration:'8 min' },
  { id:'xt34zP1EvUo', title:'Let\'s Speak Arabic, Unit One Lesson Twelve', category:'arabic', speaker:'Imran Alawiye', lang:'en', duration:'21 min' },
  { id:'dtYBCRIPV9E', title:'Let\'s Speak Arabic, Unit One Lesson Thirteen', category:'arabic', speaker:'Imran Alawiye', lang:'en', duration:'12 min' },
  { id:'8jp4fk7QFvs', title:'Let\'s Speak Arabic, Unit One Lesson Fourteen', category:'arabic', speaker:'Imran Alawiye', lang:'en', duration:'11 min' },
  { id:'siHYuuJRgRg', title:'Let\'s Speak Arabic Unit One, Lesson Fifteen', category:'arabic', speaker:'Imran Alawiye', lang:'en', duration:'12 min' },
  { id:'sVgDTmNspg8', title:'Let\'s Speak Arabic Unit One, Lesson Sixteen', category:'arabic', speaker:'Imran Alawiye', lang:'en', duration:'10 min' },
  { id:'kkQ6fZJOgUI', title:'Let\'s Speak Arabic Unit One, Lesson Seventeen', category:'arabic', speaker:'Imran Alawiye', lang:'en', duration:'12 min' },
  { id:'cCENhZRQIwA', title:'Let\'s Speak Arabic Unit One, Lesson Eighteen', category:'arabic', speaker:'Imran Alawiye', lang:'en', duration:'12 min' },
  { id:'xuJLUE_IOxE', title:'Let\'s Speak Arabic Unit One, Lesson Nineteen', category:'arabic', speaker:'Imran Alawiye', lang:'en', duration:'11 min' },
  { id:'pCez2hBDvBs', title:'Let\'s Speak Arabic Unit One, Lesson Twenty', category:'arabic', speaker:'Imran Alawiye', lang:'en', duration:'13 min' },
  { id:'xiVTciB3eMo', title:'Let\'s Speak Arabic Unit One, Lesson Twenty One', category:'arabic', speaker:'Imran Alawiye', lang:'en', duration:'12 min' },
  { id:'KVVdACl-wZ4', title:'Let\'s Speak Arabic Unit One, Lesson Twenty-Two', category:'arabic', speaker:'Imran Alawiye', lang:'en', duration:'9 min' },
  { id:'AAAwJ01nGw4', title:'Let\'s Speak Arabic Unit One, Lesson Twenty Three', category:'arabic', speaker:'Imran Alawiye', lang:'en', duration:'11 min' },
  { id:'r888L92pRL0', title:'Gateway to Arabic Flashcard Set One:       Arabic Alphabet: Pronounciation Practice', category:'arabic', speaker:'Imran Alawiye', lang:'en', duration:'39 min' },
    ]
  },  
  {
    id: 'PLWl0zRDk50wJZwK9FgMdozgWQPgVJqFWr',
    title: 'Lets Speak Arabic — Book Two',
    description: 'This is the introductory lesson of the second Arabic course by Dr. Imran Hamza Alawiye. It is aimed at those who have completed the eighteen lessons of the first series entitled ‘Arabic from the Beginning: Part One’ and have gained competence in reading and writing the Arabic script. In this first short lesson, you will revise some of the conversational phrases taught in the first course and build upon them through the addition of new vocabulary',
    speaker: 'Imran Alawiye',
    category: 'arabic',
    videos: [
  { id:'uZBjtZEMZd4', title:'The Key to Arabic Book Two Lesson One', category:'arabic', speaker:'Imran Alawiye', lang:'en', duration:'9 min' },
  { id:'COcxIStIQ-I', title:'The Key to Arabic Book Two Lesson Three', category:'arabic', speaker:'Imran Alawiye', lang:'en', duration:'30 min' },
  { id:'kCaJDAUIeWc', title:'The Key to Arabic Two, Lesson Two', category:'arabic', speaker:'Imran Alawiye', lang:'en', duration:'7 min' },
  { id:'j_Qk8wG11yM', title:'The Key to Arabic Book Two, Lesson Four', category:'arabic', speaker:'Imran Alawiye', lang:'en', duration:'17 min' },
  { id:'L23Yz97KM2w', title:'The Key to Arabic Book Two, Lesson Five', category:'arabic', speaker:'Imran Alawiye', lang:'en', duration:'13 min' },
  { id:'44cTudjWGTE', title:'The Key to Arabic Book Two, Lesson Six', category:'arabic', speaker:'Imran Alawiye', lang:'en', duration:'6 min' },
  { id:'FdmOwN_38Ko', title:'The Key to Arabic Book Two, Lesson Seven', category:'arabic', speaker:'Imran Alawiye', lang:'en', duration:'8 min' },
  { id:'xW2i4p010GA', title:'The Key to Arabic Book Two, Lesson Eight', category:'arabic', speaker:'Imran Alawiye', lang:'en', duration:'18 min' },
  { id:'hmRDRVGFz-o', title:'The Key to Arabic Book Two, Lesson Nine', category:'arabic', speaker:'Imran Alawiye', lang:'en', duration:'20 min' },
  { id:'Dsq9brbZ6do', title:'The Key to Arabic Book Two, Lesson Ten', category:'arabic', speaker:'Imran Alawiye', lang:'en', duration:'18 min' },
  { id:'jg1WX-nIcsY', title:'The Key to Arabic Book Two, Lesson Eleven', category:'arabic', speaker:'Imran Alawiye', lang:'en', duration:'8 min' },
  { id:'lVbQlJN8QlA', title:'The Key to Arabic, Lesson Twelve', category:'arabic', speaker:'Imran Alawiye', lang:'en', duration:'6 min' },
  { id:'Sv-VwDO4NNg', title:'Key to Arabic Book Two, Lesson Thirteen', category:'arabic', speaker:'Imran Alawiye', lang:'en', duration:'15 min' },
  { id:'112RNfO-wmI', title:'Key to Arabic Book Two, Lesson Fourteen', category:'arabic', speaker:'Imran Alawiye', lang:'en', duration:'12 min' },
  { id:'5e-0Tkb4gZA', title:'The Key to Arabic Book Two, Lesson Fifteen', category:'arabic', speaker:'Imran Alawiye', lang:'en', duration:'6 min' },
  { id:'ViOs8WmH_SM', title:'The Key to Arabic Book Two, Lesson Sixteen', category:'arabic', speaker:'Imran Alawiye', lang:'en', duration:'9 min' },
  { id:'umt9cT5d-G4', title:'The Key to Arabic Book Two, Lesson Seventeen', category:'arabic', speaker:'Imran Alawiye', lang:'en', duration:'22 min' },
  { id:'AF1nSOPDMh0', title:'The Key to Arabic Book Two, Lesson Eighteen', category:'arabic', speaker:'Imran Alawiye', lang:'en', duration:'29 min' },
  { id:'9F_U3fMlNsU', title:'The Key to Arabic Book Two, Lesson Nineteen', category:'arabic', speaker:'Imran Alawiye', lang:'en', duration:'16 min' },
  { id:'9xdfyLCNU40', title:'The Key to Arabic Book Two, Lesson Twenty', category:'arabic', speaker:'Imran Alawiye', lang:'en', duration:'13 min' },
  { id:'VYAh-nZGJ4Y', title:'The Key to Arabic Book Two, Lesson Twenty One', category:'arabic', speaker:'Imran Alawiye', lang:'en', duration:'7 min' },
  { id:'hagH8oL-j38', title:'The Key to Arabic Book Two, Lesson Twenty Two', category:'arabic', speaker:'Imran Alawiye', lang:'en', duration:'10 min' },
  { id:'Fm2mBXgNypQ', title:'The Key to Arabic Book Two, Lesson Twenty Three', category:'arabic', speaker:'Imran Alawiye', lang:'en', duration:'22 min' },
  { id:'9oZGmcODaH0', title:'The Key to Arabic Book Two, Lesson Twenty Four', category:'arabic', speaker:'Imran Alawiye', lang:'en', duration:'8 min' },
  { id:'wp_KRTWJom4', title:'The Key to Arabic Book Two, Lesson Twenty Five', category:'arabic', speaker:'Imran Alawiye', lang:'en', duration:'6 min' },
  { id:'qZ52Q4_E6FA', title:'The Key to Arabic Book Two, Lesson Twenty Six', category:'arabic', speaker:'Imran Alawiye', lang:'en', duration:'14 min' },
  { id:'UXD_VQU7ae0', title:'The Key to Arabic Book Two, Lesson Twenty-Seven', category:'arabic', speaker:'Imran Alawiye', lang:'en', duration:'11 min' },
  { id:'r888L92pRL0', title:'Gateway to Arabic Flashcard Set One:       Arabic Alphabet: Pronounciation Practice', category:'arabic', speaker:'Imran Alawiye', lang:'en', duration:'39 min' },
    ]
  },  
];
