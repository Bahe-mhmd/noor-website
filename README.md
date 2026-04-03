# نور · Noor — Islamic Knowledge Assistant v2.0

> **Restructured for scale.** Clean multi-file architecture ready for 35+ features.

---

## 📁 Project Structure

```
noor/
├── api/
│   └── chat.js                  ← Groq AI backend (unchanged)
├── public/
│   ├── index.html               ← Shell: sidebar + app container only
│   ├── favicon.png
│   ├── logo.png
│   ├── fonts/
│   │   ├── Al_Mushaf_Quran.ttf
│   │   ├── Harmattan-Regular.ttf
│   │   ├── Harmattan-SemiBold.ttf
│   │   └── Harmattan-Bold.ttf
│   ├── css/
│   │   ├── base.css             ← Variables, reset, loader, animations, fonts
│   │   ├── layout.css           ← Sidebar, content area, responsive breakpoints
│   │   ├── components.css       ← Chat, cards, buttons, source tags, inputs
│   │   └── pages.css            ← Prayer, Quran, Dhikr, Zakat, Tasbih, Names, Halal
│   └── js/
│       ├── app.js               ← Router, state, theme, language, boot sequence
│       ├── config.js            ← All static data (DHIKR_DATA, NAMES_99, HALAL_DB…)
│       └── pages/
│           ├── home.js          ← AI chat assistant
│           ├── categories.js    ← Category browser
│           ├── prayer.js        ← Prayer times + Qibla
│           ├── quran.js         ← Quran reader
│           ├── dhikr.js         ← Dhikr & Duas
│           ├── calendar.js      ← Islamic calendar
│           ├── zakat.js         ← Zakat calculator
│           ├── tasbih.js        ← Tasbih counter
│           ├── names.js         ← 99 Names of Allah
│           ├── halal.js         ← Halal food checker
│           ├── sources.js       ← Trusted sources
│           └── about.js         ← About page
├── package.json
└── vercel.json
```

---

## 🚀 Deployment

```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Set your environment variable
vercel env add GROQ_API_KEY

# 3. Deploy
vercel --prod
```

Your site deploys to `https://your-project.vercel.app`

---

## ➕ How to Add a New Feature (e.g. Ramadan Tracker)

Adding a new page takes **3 steps**:

### Step 1 — Create the page module
Create `public/js/pages/ramadan.js`:

```js
// public/js/pages/ramadan.js
const Ramadan = {
  render(lang) {
    const isAr = lang === 'ar';
    return `
      <div class="pg-hd">
        <div class="pg-hd-ic"><i class="ri-moon-fill"></i></div>
        <h1>${isAr ? 'تتبع رمضان' : 'Ramadan Tracker'}</h1>
        <p>Your description here.</p>
      </div>
      <div class="pg-body">
        <!-- Your HTML here -->
      </div>`;
  },

  init(lang) {
    // Your JavaScript logic here
    // Wire up events, fetch data, etc.
  },

  destroy() {
    // Clean up timers, global functions, etc.
  }
};

export default Ramadan;
```

### Step 2 — Register the page in `app.js`
Add one line to the `PAGES` object:

```js
const PAGES = {
  // ...existing pages...
  'ramadan': () => import('./pages/ramadan.js'),  // ← add this
};
```

### Step 3 — Add sidebar link in `index.html`
```html
<button class="sb-item" data-pg="ramadan" onclick="goTo('ramadan',this)">
  <i class="ri-moon-line"></i>
  <span data-en="Ramadan Tracker" data-ar="تتبع رمضان">Ramadan Tracker</span>
</button>
```

**That's it!** The router handles lazy-loading, transitions, language, and cleanup automatically.

---

## 🗺️ Planned Features Roadmap

### 🔴 Priority 1 — Tools
| Feature | Page ID | Status |
|---|---|---|
| Ramadan Tracker | `ramadan` | Planned |
| Inheritance Calculator (Mirath) | `mirath` | Planned |
| Audio Quran | `audio-quran` | Planned |
| Verse/Hadith of the Day | `daily` | Planned |
| AI Dua Generator | `dua-gen` | Planned |

### 🟡 Priority 2 — Content
| Feature | Page ID | Status |
|---|---|---|
| Tafseer Viewer | `tafseer` | Planned |
| Hadith Search | `hadith` | Planned |
| Dream Interpretation | `dreams` | Planned |
| Sermon Generator | `sermon` | Planned |
| Arabic Learning | `arabic` | Planned |

### 🟢 Priority 3 — Enhancements
| Feature | Notes | Status |
|---|---|---|
| Multi-language (French, Turkish, Urdu) | Extend `setLang()` in app.js | Planned |
| 99 Names Audio | Add audio player to names.js | Planned |
| Qibla Compass (device sensor) | Extend prayer.js | Planned |
| Chat History | localStorage in home.js | Planned |
| PWA / Offline Mode | Add service worker | Planned |

---

## 🧩 Architecture Patterns

### Page Module Interface
Every page module exports a default object with:
```js
{
  render(lang): string   // Returns HTML string — REQUIRED
  init(lang): void       // Called after render — optional
  destroy(): void        // Called before leaving page — optional
}
```

### Global State (in app.js)
```js
state = {
  lang: 'en' | 'ar',
  dark: boolean,
  currentPage: string,
  pageCache: {}   // Modules cached after first load
}
```

### Adding Static Data
All large data arrays live in `config.js`. Import what you need:
```js
import { NAMES_99, HALAL_DB, DHIKR_DATA } from '../config.js';
```

### Calling the AI Backend
```js
const resp = await fetch('/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ question: 'Your question here' })
});
const data = await resp.json();
// data.response = AI text
// data.model = model used
```

---

## 🎨 CSS Variables Reference

| Variable | Value (Light) | Use |
|---|---|---|
| `--emerald-600` | `#059669` | Primary green |
| `--gold-500` | `#F59E0B` | Accent gold |
| `--bg` | `#F6F4EC` | Page background |
| `--bg-el` | `#FFFFFF` | Card background |
| `--text-1` | `#1A1A14` | Primary text |
| `--primary-glow` | `rgba(5,150,105,0.12)` | Focus rings, hovers |
| `--font-arabic` | `'Al Mushaf'` | Quranic text |
| `--font-ar` | `'Harmattan'` | Arabic UI text |

---

## 📝 Notes

- **No build step required** — ES modules load natively in modern browsers
- **Lazy loading** — each page module only loads when first visited
- **Font files** — kept local for offline reliability
- **API key** — stored in Vercel environment variables, never in frontend code
- **RTL support** — fully automatic via `document.dir` toggle in `setLang()`
