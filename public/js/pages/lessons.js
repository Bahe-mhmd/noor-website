// ═══════════════════════════════════════════════════
// NOOR — pages/lessons.js
//
// ARCHITECTURE — Four logical components:
//   LessonCard(lesson)         → card in the grid
//   CategoryFilter()           → tab filter bar
//   LessonViewer(lesson, idx)  → full viewer (replaces grid)
//   LessonSidebar(lesson, idx) → scrollable episode list
//
// STATE — completely isolated from videos.js:
//   _activeCat      currently selected category tab
//   _activeLessonId currently open lesson series (null = grid view)
//   _activeEpIdx    currently playing episode index
//   _lang           current UI language
//
// AUDIO BUG FIX:
//   stopLessonAudio() sets iframe src='' before every
//   video switch and viewer close, which destroys the
//   iframe's browsing context and kills the audio stream
//   immediately — the only cross-browser reliable method.
// ═══════════════════════════════════════════════════
import { LESSONS, LESSON_CATEGORIES } from '../lessons.js';
import { t } from '../i18n.js';

// ── Isolated state (never shared with videos.js) ──
let _lang          = 'en';
let _activeCat     = 'all';
let _activeLessonId = null;   // null = grid; string = viewer open
let _activeEpIdx   = 0;

// ══════════════════════════════════════════════════
// AUDIO BUG FIX
// Sets src='' on the lesson iframe BEFORE any switch.
// This destroys the browsing context and kills audio.
// ══════════════════════════════════════════════════
function stopLessonAudio() {
  const frame = document.getElementById('lessonPlayerFrame');
  if (frame) frame.src = '';
}

// ── Embed URL ──
function embedUrl(videoId) {
  return 'https://www.youtube.com/embed/' + videoId + '?autoplay=1&rel=0&modestbranding=1';
}
function thumbUrl(videoId) {
  return 'https://img.youtube.com/vi/' + videoId + '/hqdefault.jpg';
}
function escHtml(s) {
  return (s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// ── Level badge helper ──
function levelBadge(level, lang) {
  const map = {
    beginner:     { en:'Beginner',     ar:'مبتدئ',       fr:'Débutant',    color:'#16a34a' },
    intermediate: { en:'Intermediate', ar:'متوسط',        fr:'Intermédiaire',color:'#d97706' },
    advanced:     { en:'Advanced',     ar:'متقدم',        fr:'Avancé',      color:'#dc2626' },
  };
  const info = map[level];
  if (!info) return '';
  return '<span class="ls-level" style="--lc:' + info.color + '">' + (info[lang] || info.en) + '</span>';
}

// ══════════════════════════════════════════════════
// COMPONENT: LessonCard
// ══════════════════════════════════════════════════
function LessonCard(lesson) {
  const cat = LESSON_CATEGORIES.find(c => c.id === lesson.category);
  const catLabel = cat ? (cat.label[_lang] || cat.label.en) : lesson.category;
  const firstThumb = lesson.videos?.[0]?.id ? thumbUrl(lesson.videos[0].id) : '';
  const count = lesson.videos?.length || 0;
  const langFlag = lesson.lang === 'ar' ? '🇸🇦' : lesson.lang === 'fr' ? '🇫🇷' : '🇬🇧';

  return '<div class="ls-card" data-lid="' + lesson.id + '">'
    // Thumbnail
    + '<div class="ls-card-thumb">'
    + (firstThumb
      ? '<img src="' + firstThumb + '" alt="' + escHtml(lesson.title) + '" loading="lazy">'
      : '<div class="ls-card-thumb-placeholder"><i class="ri-play-circle-line"></i></div>')
    + '<div class="ls-card-count-badge"><i class="ri-list-ordered"></i> ' + count + '</div>'
    + '</div>'
    // Body
    + '<div class="ls-card-body">'
    + '<div class="ls-card-meta">'
    + '<span class="ls-card-cat"><i class="' + (cat?.icon || 'ri-book-line') + '"></i> ' + catLabel + '</span>'
    + (lesson.level ? levelBadge(lesson.level, _lang) : '')
    + '<span class="ls-card-lang">' + langFlag + '</span>'
    + '</div>'
    + '<h3 class="ls-card-title">' + escHtml(lesson.title) + '</h3>'
    + '<div class="ls-card-speaker"><i class="ri-user-voice-line"></i> ' + escHtml(lesson.speaker) + '</div>'
    + (lesson.description ? '<p class="ls-card-desc">' + escHtml(lesson.description) + '</p>' : '')
    + '<div class="ls-card-footer">'
    + '<span class="ls-card-episodes"><i class="ri-play-list-2-line"></i> '
    + count + ' ' + (_lang === 'ar' ? 'درس' : count === 1 ? 'lesson' : 'lessons')
    + '</span>'
    + '<span class="ls-start-btn"><i class="ri-play-fill"></i> '
    + (_lang === 'ar' ? 'ابدأ التعلم' : 'Start Learning')
    + '</span>'
    + '</div>'
    + '</div>'
    + '</div>';
}

// ══════════════════════════════════════════════════
// COMPONENT: CategoryFilter
// ══════════════════════════════════════════════════
function CategoryFilter() {
  return LESSON_CATEGORIES.map(c =>
    '<button class="ls-cat-btn' + (c.id === _activeCat ? ' active' : '') + '" data-cat="' + c.id + '">'
    + '<i class="' + c.icon + '"></i>'
    + '<span>' + (c.label[_lang] || c.label.en) + '</span>'
    + '</button>'
  ).join('');
}

// ══════════════════════════════════════════════════
// COMPONENT: LessonSidebar (episode list)
// ══════════════════════════════════════════════════
function LessonSidebar(lesson, activeIdx) {
  return '<div class="ls-sidebar">'
    + '<div class="ls-sidebar-header">'
    + '<i class="ri-list-ordered"></i>'
    + (_lang === 'ar' ? ' قائمة الدروس' : ' Lessons')
    + '<span class="ls-sidebar-count">'
    + lesson.videos.length + ' ' + (_lang === 'ar' ? 'درس' : 'lessons')
    + '</span>'
    + '</div>'
    + '<div class="ls-sidebar-list" id="lsSidebarList">'
    + lesson.videos.map((ep, i) =>
        '<div class="ls-ep-item' + (i === activeIdx ? ' active' : '') + '" data-epidx="' + i + '">'
        + '<div class="ls-ep-thumb-wrap">'
        + '<img src="' + thumbUrl(ep.id) + '" alt="' + escHtml(ep.title) + '" loading="lazy">'
        + (i === activeIdx
          ? '<div class="ls-ep-playing"><span></span><span></span><span></span></div>'
          : '<div class="ls-ep-play-icon"><i class="ri-play-fill"></i></div>')
        + '</div>'
        + '<div class="ls-ep-info">'
        + '<div class="ls-ep-num">' + (_lang === 'ar' ? 'درس' : 'Lesson') + ' ' + (i + 1) + '</div>'
        + '<div class="ls-ep-title">' + escHtml(ep.title) + '</div>'
        + (ep.duration ? '<div class="ls-ep-dur"><i class="ri-time-line"></i> ' + ep.duration + '</div>' : '')
        + '</div>'
        + '</div>'
    ).join('')
    + '</div>'
    + '</div>';
}

// ══════════════════════════════════════════════════
// COMPONENT: LessonViewer (replaces grid — full page)
// ══════════════════════════════════════════════════
function LessonViewer(lesson, activeIdx) {
  const ep = lesson.videos[activeIdx];
  const cat = LESSON_CATEGORIES.find(c => c.id === lesson.category);
  const catLabel = cat ? (cat.label[_lang] || cat.label.en) : lesson.category;
  const isAr = _lang === 'ar';

  return '<div class="ls-viewer" id="lsViewer">'
    // Viewer header
    + '<div class="ls-viewer-head">'
    + '<button class="ls-back-btn" id="lsBackBtn">'
    + '<i class="' + (isAr ? 'ri-arrow-right-line' : 'ri-arrow-left-line') + '"></i> '
    + (isAr ? 'العودة إلى الدروس' : 'Back to Lessons')
    + '</button>'
    + '<div class="ls-viewer-breadcrumb">'
    + '<span class="ls-viewer-cat"><i class="' + (cat?.icon || 'ri-book-line') + '"></i> ' + catLabel + '</span>'
    + '<i class="ri-arrow-right-s-line" style="opacity:.4"></i>'
    + '<span class="ls-viewer-series-title">' + escHtml(lesson.title) + '</span>'
    + '</div>'
    + '<div class="ls-viewer-speaker"><i class="ri-user-voice-line"></i> ' + escHtml(lesson.speaker) + '</div>'
    + '</div>'
    // Viewer body: player + sidebar
    + '<div class="ls-viewer-body">'

    // ── PLAYER PANEL ──
    + '<div class="ls-player-panel">'
    + '<div class="ls-player-wrap">'
    + '<iframe id="lessonPlayerFrame" class="ls-player-iframe" src="' + embedUrl(ep.id) + '" title="' + escHtml(ep.title) + '" frameborder="0" allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture" allowfullscreen></iframe>'
    + '</div>'
    // Now playing
    + '<div class="ls-now-playing">'
    + '<div class="ls-now-label"><i class="ri-play-circle-fill"></i> '
    + (isAr ? 'يتم تشغيله الآن' : 'Now Playing') + ' — '
    + (isAr ? 'درس ' : 'Lesson ') + '<span id="lsNowIdx">' + (activeIdx + 1) + '</span> / ' + lesson.videos.length
    + '</div>'
    + '<div class="ls-now-title" id="lsNowTitle">' + escHtml(ep.title) + '</div>'
    + (ep.duration ? '<div class="ls-now-dur"><i class="ri-time-line"></i> ' + ep.duration + '</div>' : '')
    + '</div>'
    // Controls
    + '<div class="ls-controls">'
    + '<button class="ls-ctrl-btn" id="lsPrevBtn" ' + (activeIdx === 0 ? 'disabled' : '') + '>'
    + '<i class="' + (isAr ? 'ri-skip-forward-line' : 'ri-skip-back-line') + '"></i> '
    + (isAr ? 'السابق' : 'Previous')
    + '</button>'
    + '<div class="ls-progress-dots" id="lsProgressDots">'
    + lesson.videos.map((_, i) =>
        '<span class="ls-dot' + (i === activeIdx ? ' active' : (i < activeIdx ? ' done' : '')) + '"></span>'
    ).join('')
    + '</div>'
    + '<button class="ls-ctrl-btn primary" id="lsNextBtn" ' + (activeIdx === lesson.videos.length - 1 ? 'disabled' : '') + '>'
    + (isAr ? 'التالي' : 'Next') + ' '
    + '<i class="' + (isAr ? 'ri-skip-back-line' : 'ri-skip-forward-line') + '"></i>'
    + '</button>'
    + '</div>'
    + '</div>'

    // ── SIDEBAR ──
    + LessonSidebar(lesson, activeIdx)

    + '</div>' // end ls-viewer-body
    + '</div>'; // end ls-viewer
}

// ══════════════════════════════════════════════════
// LESSONS GRID PAGE
// ══════════════════════════════════════════════════
function renderGrid() {
  const container = document.getElementById('lsGrid');
  const countEl   = document.getElementById('lsCount');
  if (!container) return;

  const list = LESSONS.filter(l => _activeCat === 'all' || l.category === _activeCat);
  if (countEl) {
    countEl.textContent = list.length + ' ' + (_lang === 'ar' ? 'سلسلة' : list.length === 1 ? 'series' : 'series');
  }

  if (!list.length) {
    container.innerHTML = '<div class="ls-empty"><i class="ri-book-2-line"></i><p>'
      + (_lang === 'ar' ? 'لا توجد دروس في هذا القسم' : 'No lessons in this category') + '</p></div>';
    return;
  }

  container.innerHTML = list.map(l => LessonCard(l)).join('');

  container.querySelectorAll('.ls-card').forEach(card => {
    card.addEventListener('click', () => {
      const lesson = LESSONS.find(l => l.id === card.dataset.lid);
      if (lesson) openViewer(lesson, 0);
    });
  });
}

// ══════════════════════════════════════════════════
// OPEN / CLOSE VIEWER
// ══════════════════════════════════════════════════
function openViewer(lesson, startIdx) {
  stopLessonAudio(); // kill any existing audio first
  _activeLessonId = lesson.id;
  _activeEpIdx    = startIdx;

  const gridEl   = document.getElementById('lsGridSection');
  const viewerEl = document.getElementById('lsViewerSection');
  if (!gridEl || !viewerEl) return;

  gridEl.style.display   = 'none';
  viewerEl.style.display = 'block';
  viewerEl.innerHTML     = LessonViewer(lesson, startIdx);

  window.scrollTo({ top: 0, behavior: 'instant' });
  wireViewerEvents(lesson);
}

function closeViewer() {
  stopLessonAudio(); // ← AUDIO BUG FIX: kill audio before removing iframe
  _activeLessonId = null;
  _activeEpIdx    = 0;

  const gridEl   = document.getElementById('lsGridSection');
  const viewerEl = document.getElementById('lsViewerSection');
  if (!gridEl || !viewerEl) return;

  viewerEl.style.display = 'none';
  viewerEl.innerHTML     = '';
  gridEl.style.display   = 'block';
  window.scrollTo({ top: 0, behavior: 'instant' });
}

// ══════════════════════════════════════════════════
// SWITCH EPISODE — Audio bug fix applied here
// ══════════════════════════════════════════════════
function switchEpisode(lesson, newIdx) {
  if (newIdx < 0 || newIdx >= lesson.videos.length) return;

  // ── AUDIO BUG FIX: zero src FIRST, then set new src in next frame ──
  const frame = document.getElementById('lessonPlayerFrame');
  if (frame) {
    frame.src = ''; // terminates audio stream immediately
    requestAnimationFrame(() => {
      frame.src = embedUrl(lesson.videos[newIdx].id); // load new episode
    });
  }

  _activeEpIdx = newIdx;
  const ep = lesson.videos[newIdx];

  // Update now-playing
  const nowTitle = document.getElementById('lsNowTitle');
  const nowIdx   = document.getElementById('lsNowIdx');
  if (nowTitle) nowTitle.textContent = ep.title;
  if (nowIdx)   nowIdx.textContent   = newIdx + 1;

  // Update controls
  const prevBtn = document.getElementById('lsPrevBtn');
  const nextBtn = document.getElementById('lsNextBtn');
  if (prevBtn) prevBtn.disabled = newIdx === 0;
  if (nextBtn) nextBtn.disabled = newIdx === lesson.videos.length - 1;

  // Update progress dots
  const dots = document.getElementById('lsProgressDots');
  if (dots) {
    dots.querySelectorAll('.ls-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === newIdx);
      dot.classList.toggle('done',   i < newIdx);
    });
  }

  // Update sidebar items (no full rebuild — just class toggles)
  const sidebar = document.getElementById('lsSidebarList');
  if (sidebar) {
    sidebar.querySelectorAll('.ls-ep-item').forEach((item, i) => {
      const isActive = i === newIdx;
      item.classList.toggle('active', isActive);

      // Playing animation / play icon
      const thumbWrap = item.querySelector('.ls-ep-thumb-wrap');
      if (thumbWrap) {
        const oldPlaying = thumbWrap.querySelector('.ls-ep-playing');
        const oldPlay    = thumbWrap.querySelector('.ls-ep-play-icon');
        if (isActive && !oldPlaying) {
          if (oldPlay) oldPlay.remove();
          const anim = document.createElement('div');
          anim.className = 'ls-ep-playing';
          anim.innerHTML = '<span></span><span></span><span></span>';
          thumbWrap.appendChild(anim);
        } else if (!isActive && oldPlaying) {
          oldPlaying.remove();
          if (!thumbWrap.querySelector('.ls-ep-play-icon')) {
            const play = document.createElement('div');
            play.className = 'ls-ep-play-icon';
            play.innerHTML = '<i class="ri-play-fill"></i>';
            thumbWrap.appendChild(play);
          }
        }
      }

      // Scroll into view
      if (isActive) {
        item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  }
}

// ── Wire viewer events ──
function wireViewerEvents(lesson) {
  document.getElementById('lsBackBtn')?.addEventListener('click', closeViewer);

  document.getElementById('lsPrevBtn')?.addEventListener('click', () => {
    switchEpisode(lesson, _activeEpIdx - 1);
  });
  document.getElementById('lsNextBtn')?.addEventListener('click', () => {
    switchEpisode(lesson, _activeEpIdx + 1);
  });

  document.getElementById('lsSidebarList')?.addEventListener('click', e => {
    const item = e.target.closest('.ls-ep-item');
    if (!item) return;
    const idx = parseInt(item.dataset.epidx);
    if (!isNaN(idx) && idx !== _activeEpIdx) {
      switchEpisode(lesson, idx);
    }
  });
}

// ══════════════════════════════════════════════════
// PAGE MODULE
// ══════════════════════════════════════════════════
const Lessons = {
  render(lang) {
    _lang = lang;
    const isAr = lang === 'ar';
    const total = LESSONS.length;

    return '<div class="pg-hd">'
      + '<div class="pg-hd-ic"><i class="ri-graduation-cap-fill"></i></div>'
      + '<h1>' + (isAr ? 'دروس علمية إسلامية' : 'Islamic Lessons') + '</h1>'
      + '<p>' + (isAr
        ? 'سلاسل تعليمية منظمة من علماء موثوقين — تعلّم بشكل منهجي'
        : 'Structured learning series from trusted scholars — study systematically') + '</p>'
      + '</div>'
      + '<div class="pg-body">'

      // ── GRID SECTION ──
      + '<div id="lsGridSection">'

      // Category filter
      + '<div class="ls-cats" id="lsCats">' + CategoryFilter() + '</div>'

      // Count + grid
      + '<div class="ls-grid-header">'
      + '<span class="ls-total-count" id="lsCount">' + total + ' series</span>'
      + '</div>'
      + '<div class="ls-grid" id="lsGrid"></div>'

      + '</div>' // end lsGridSection

      // ── VIEWER SECTION (hidden by default) ──
      + '<div id="lsViewerSection" style="display:none"></div>'

      + '</div>'
      + '<footer class="ft"><i class="ri-heart-fill"></i> '
      + (isAr ? 'صُنع للأمة' : 'Built for the Ummah') + '</footer>';
  },

  init(lang) {
    _lang = lang;
    _activeLessonId = null;
    _activeEpIdx    = 0;

    // Render grid immediately (no rv class, no observer delay)
    requestAnimationFrame(() => {
      renderGrid();
    });

    // Category filter clicks
    document.getElementById('lsCats')?.addEventListener('click', e => {
      const btn = e.target.closest('.ls-cat-btn');
      if (!btn) return;
      _activeCat = btn.dataset.cat;
      document.querySelectorAll('.ls-cat-btn').forEach(b => b.classList.toggle('active', b.dataset.cat === _activeCat));
      renderGrid();
    });
  },

  destroy() {
    // Guaranteed cleanup when navigating away
    stopLessonAudio();
    _activeLessonId = null;
    _activeEpIdx    = 0;
    document.body.style.overflow = '';
  }
};

export default Lessons;
