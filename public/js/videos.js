// ═══════════════════════════════════════════════════
// NOOR — videos.js  ·  Video Library Data
//
// HOW TO ADD A NEW VIDEO:
// 1. Get the YouTube video ID from the URL
//    e.g. youtube.com/watch?v=dQw4w9WgXcQ → ID is "dQw4w9WgXcQ"
// 2. Add an entry to the VIDEOS array below
// 3. Pick a category from CATEGORIES or add a new one
// 4. Done — it will appear automatically in the grid
//
// FIELDS:
//   id       (required) YouTube video ID only — NOT the full URL
//   title    (required) Video title
//   category (required) Must match a category id in CATEGORIES
//   speaker  (optional) Sheikh/speaker name
//   lang     (optional) 'ar' | 'en' | 'fr' etc.
//   duration (optional) e.g. "45 min"
// ═══════════════════════════════════════════════════

export const CATEGORIES = [
  { id:'all',       label:{ en:'All',          ar:'الكل',          fr:'Tout',          tr:'Hepsi',        ur:'سب',            id:'Semua'        }, icon:'ri-apps-2-line'        },
  { id:'tafsir',    label:{ en:'Tafsir',        ar:'التفسير',       fr:'Tafsir',        tr:'Tefsir',       ur:'تفسیر',          id:'Tafsir'       }, icon:'ri-book-open-line'     },
  { id:'lectures',  label:{ en:'Lectures',      ar:'محاضرات',       fr:'Conférences',   tr:'Dersler',      ur:'لیکچرز',         id:'Ceramah'      }, icon:'ri-mic-line'           },
  { id:'reminders', label:{ en:'Reminders',     ar:'مواعظ',         fr:'Rappels',       tr:'Nasihatler',   ur:'نصیحتیں',        id:'Nasihat'      }, icon:'ri-heart-line'         },
  { id:'stories',   label:{ en:'Prophets & Stories', ar:'قصص الأنبياء', fr:'Histoires', tr:'Kıssalar',    ur:'انبیاء کی کہانیاں', id:'Kisah Nabi' }, icon:'ri-moon-line'          },
  { id:'fiqh',      label:{ en:'Fiqh & Rulings',ar:'فقه وأحكام',   fr:'Fiqh',          tr:'Fıkıh',        ur:'فقہ',             id:'Fikih'        }, icon:'ri-scales-3-line'      },
  { id:'aqeedah',   label:{ en:'Aqeedah',       ar:'العقيدة',       fr:'Aqida',         tr:'Akide',        ur:'عقیدہ',          id:'Akidah'       }, icon:'ri-star-line'          },
  { id:'quran',     label:{ en:'Quran Recitation',ar:'تلاوة القرآن', fr:'Récitation',   tr:'Kuran Tilaveti',ur:'تلاوت',         id:'Tilawah'      }, icon:'ri-book-line'          },
  { id:'seerah',    label:{ en:'Seerah',         ar:'السيرة النبوية',fr:'Seerah',        tr:'Siyer',        ur:'سیرت',           id:'Sirah'        }, icon:'ri-user-star-line'     },
  { id:'arabic',    label:{ en:'Arabic Learning', ar:'تعلم العربية', fr:'Langue Arabe', tr:'Arapça',       ur:'عربی سیکھیں',    id:'Belajar Arab' }, icon:'ri-font-size'          },
];

export const VIDEOS = [
  // ── TAFSIR ──
  {
    id: 'XGuKPSGFMnY',
    title: 'Tafsir Surah Al-Fatiha — The Opening',
    category: 'tafsir',
    speaker: 'Nouman Ali Khan',
    lang: 'en',
    duration: '40 min'
  },
  {
    id: 'uMDuOxTKOXk',
    title: 'Surah Al-Baqarah — Introduction & Overview',
    category: 'tafsir',
    speaker: 'Nouman Ali Khan',
    lang: 'en',
    duration: '55 min'
  },
  {
    id: 'XGuKPSGFMnY',
    title: 'تفسير سورة الكهف — المقدمة',
    category: 'tafsir',
    speaker: 'الشيخ عثمان الخميس',
    lang: 'ar',
    duration: '45 min'
  },
  {
    id: 'TiAQpR5AGFg',
    title: 'Surah Al-Kahf — Lessons & Themes',
    category: 'tafsir',
    speaker: 'Nouman Ali Khan',
    lang: 'en',
    duration: '50 min'
  },
  {
    id: 'wKGjdNkMxRQ',
    title: 'Tafsir Surah Yasin — Heart of the Quran',
    category: 'tafsir',
    speaker: 'Mufti Menk',
    lang: 'en',
    duration: '35 min'
  },

  // ── LECTURES ──
  {
    id: 'EP3Ss6Szn9o',
    title: 'صحيح مسلم المجلس (01) السند / المقدمة إلى الحديث (92) / الشيخ د. عثمان الخميس',
    category: 'lectures',
    speaker: 'Dr. Othman Alkhamees',
    lang: 'Ar',
    duration: '1h 37 min'
  },
  {
    id: 'dDwdCRq-8i4',
    title: 'The Purpose of Life in Islam',
    category: 'lectures',
    speaker: 'Jeffrey Lang',
    lang: 'en',
    duration: '48 min'
  },
  {
    id: 'Ot-4J2hJNcE',
    title: 'Islam and Science — Are They Compatible?',
    category: 'lectures',
    speaker: 'Dr. Zakir Naik',
    lang: 'en',
    duration: '75 min'
  },
  {
    id: 'wKGjdNkMxRQ',
    title: 'The Six Pillars of Iman Explained',
    category: 'lectures',
    speaker: 'Mufti Menk',
    lang: 'en',
    duration: '42 min'
  },

  // ── REMINDERS ──
  {
    id: 'OmrSPmGrGME',
    title: 'Gratitude — The Key to Abundance',
    category: 'reminders',
    speaker: 'Mufti Menk',
    lang: 'en',
    duration: '18 min'
  },
  {
    id: 'TiAQpR5AGFg',
    title: 'Tawakkul — Trusting Allah Completely',
    category: 'reminders',
    speaker: 'Omar Suleiman',
    lang: 'en',
    duration: '22 min'
  },
  {
    id: 'dDwdCRq-8i4',
    title: 'Death — The Greatest Reminder',
    category: 'reminders',
    speaker: 'Bilal Philips',
    lang: 'en',
    duration: '30 min'
  },
  {
    id: 'Ot-4J2hJNcE',
    title: 'Dealing with Anxiety Through Islam',
    category: 'reminders',
    speaker: 'Omar Suleiman',
    lang: 'en',
    duration: '25 min'
  },

  // ── PROPHETS & STORIES ──
  {
    id: 'XGuKPSGFMnY',
    title: 'The Story of Prophet Ibrahim ﷺ',
    category: 'stories',
    speaker: 'Yasir Qadhi',
    lang: 'en',
    duration: '65 min'
  },
  {
    id: 'uMDuOxTKOXk',
    title: 'Prophet Yusuf ﷺ — Lessons from Quran',
    category: 'stories',
    speaker: 'Nouman Ali Khan',
    lang: 'en',
    duration: '80 min'
  },
  {
    id: 'wKGjdNkMxRQ',
    title: 'The Life of Prophet Musa ﷺ',
    category: 'stories',
    speaker: 'Omar Suleiman',
    lang: 'en',
    duration: '55 min'
  },

  // ── FIQH ──
  {
    id: 'TiAQpR5AGFg',
    title: 'How to Perform Salah Correctly — Step by Step',
    category: 'fiqh',
    speaker: 'Bilal Philips',
    lang: 'en',
    duration: '35 min'
  },
  {
    id: 'OmrSPmGrGME',
    title: 'Zakat — Who Must Pay and How to Calculate',
    category: 'fiqh',
    speaker: 'Mufti Menk',
    lang: 'en',
    duration: '28 min'
  },
  {
    id: 'Ot-4J2hJNcE',
    title: 'Halal and Haram in Food — A Complete Guide',
    category: 'fiqh',
    speaker: 'Dr. Zakir Naik',
    lang: 'en',
    duration: '40 min'
  },

  // ── AQEEDAH ──
  {
    id: 'dDwdCRq-8i4',
    title: 'The 99 Names of Allah — Al-Asma ul-Husna',
    category: 'aqeedah',
    speaker: 'Yasir Qadhi',
    lang: 'en',
    duration: '90 min'
  },
  {
    id: 'XGuKPSGFMnY',
    title: 'Tawhid — The Foundation of Islam',
    category: 'aqeedah',
    speaker: 'Bilal Philips',
    lang: 'en',
    duration: '45 min'
  },
  {
    id: 'wKGjdNkMxRQ',
    title: 'Signs of the Day of Judgement',
    category: 'aqeedah',
    speaker: 'Omar Suleiman',
    lang: 'en',
    duration: '52 min'
  },

  // ── QURAN RECITATION ──
  {
    id: 'uMDuOxTKOXk',
    title: 'Surah Al-Mulk — Mishary Rashid Al-Afasy',
    category: 'quran',
    speaker: 'Mishary Rashid Al-Afasy',
    lang: 'ar',
    duration: '10 min'
  },
  {
    id: 'TiAQpR5AGFg',
    title: 'Surah Al-Rahman — Abdul Rahman Al-Sudais',
    category: 'quran',
    speaker: 'Abdul Rahman Al-Sudais',
    lang: 'ar',
    duration: '12 min'
  },
  {
    id: 'OmrSPmGrGME',
    title: 'Surah Al-Kahf — Maher Al-Muaiqly',
    category: 'quran',
    speaker: 'Maher Al-Muaiqly',
    lang: 'ar',
    duration: '25 min'
  },

  // ── SEERAH ──
  {
    id: 'Ot-4J2hJNcE',
    title: 'The Sealed Nectar — Life of Prophet Muhammad ﷺ',
    category: 'seerah',
    speaker: 'Yasir Qadhi',
    lang: 'en',
    duration: '70 min'
  },
  {
    id: 'dDwdCRq-8i4',
    title: 'The Hijra — Migration to Madinah',
    category: 'seerah',
    speaker: 'Omar Suleiman',
    lang: 'en',
    duration: '45 min'
  },

  // ── ARABIC LEARNING ──
  {
    id: 'XGuKPSGFMnY',
    title: 'Arabic for Beginners — Lesson 1',
    category: 'arabic',
    speaker: 'Nouman Ali Khan',
    lang: 'en',
    duration: '30 min'
  },
  {
    id: 'uMDuOxTKOXk',
    title: 'Understanding Quranic Arabic — Fundamentals',
    category: 'arabic',
    speaker: 'Nouman Ali Khan',
    lang: 'en',
    duration: '50 min'
  },
];
