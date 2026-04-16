// ═══════════════════════════════════════════════════
// NOOR — pages/videos.js  ·  Islamic Video Library
// Architecture: VideoGrid + VideoCard + VideoModal + CategoryFilter
// ═══════════════════════════════════════════════════
import { VIDEOS, CATEGORIES } from '../videos.js';
import { t } from '../i18n.js';

let _lang        = 'en';
let _activeCat   = 'all';
let _searchQuery = '';
let _modalEl     = null;   // body-level portal (same fix as tafsir)
let _currentVideo = null;
const LAST_WATCHED_KEY = 'noor_last_video';

// ── Helpers ──
function thumb(id) {
  return 'https://img.youtube.com/vi/' + id + '/hqdefault.jpg';
}
function embedUrl(id) {
  return 'https://www.youtube.com/embed/' + id + '?autoplay=1&rel=0&modestbranding=1';
}
function saveLastWatched(video) {
  try { localStorage.setItem(LAST_WATCHED_KEY, JSON.stringify({ id: video.id, title: video.title, ts: Date.now() })); } catch(e) {}
}
function getLastWatched() {
  try { return JSON.parse(localStorage.getItem(LAST_WATCHED_KEY) || 'null'); } catch(e) { return null; }
}

// ── Filter + search ──
function filteredVideos() {
  const q = _searchQuery.toLowerCase().trim();
  return VIDEOS.filter(v => {
    const catOk = _activeCat === 'all' || v.category === _activeCat;
    if (!catOk) return false;
    if (!q) return true;
    return v.title.toLowerCase().includes(q) ||
      (v.speaker || '').toLowerCase().includes(q) ||
      v.category.toLowerCase().includes(q);
  });
}

// ── VideoCard HTML ──
function VideoCard(v, idx) {
  const cat = CATEGORIES.find(c => c.id === v.category);
  const catLabel = cat ? (cat.label[_lang] || cat.label.en) : v.category;
  return '<div class="vid-card" data-idx="' + idx + '" data-id="' + v.id + '">'
    + '<div class="vid-thumb-wrap">'
    + '<img class="vid-thumb" src="' + thumb(v.id) + '" alt="' + escHtml(v.title) + '" loading="lazy">'
    + '<div class="vid-play-btn"><i class="ri-play-fill"></i></div>'
    + '<div class="vid-duration">' + (v.duration || '') + '</div>'
    + '</div>'
    + '<div class="vid-info">'
    + '<div class="vid-cat-badge"><i class="' + (cat?.icon || 'ri-video-line') + '"></i> ' + catLabel + '</div>'
    + '<div class="vid-title">' + escHtml(v.title) + '</div>'
    + (v.speaker ? '<div class="vid-speaker"><i class="ri-user-voice-line"></i> ' + escHtml(v.speaker) + '</div>' : '')
    + '</div>'
    + '</div>';
}

function escHtml(s) {
  return (s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// ── CategoryFilter HTML ──
function CategoryFilter() {
  return CATEGORIES.map(c =>
    '<button class="vid-cat-btn' + (c.id === _activeCat ? ' active' : '') + '" data-cat="' + c.id + '">'
    + '<i class="' + c.icon + '"></i>'
    + '<span>' + (c.label[_lang] || c.label.en) + '</span>'
    + '</button>'
  ).join('');
}

// ── VideoGrid render ──
function renderGrid() {
  const container = document.getElementById('vidGrid');
  const count = document.getElementById('vidCount');
  if (!container) return;

  const list = filteredVideos();
  if (count) count.textContent = list.length + ' ' + (list.length === 1 ? 'video' : 'videos');

  if (!list.length) {
    container.innerHTML = '<div class="vid-empty">'
      + '<i class="ri-video-off-line"></i>'
      + '<p>' + (_lang === 'ar' ? 'لا توجد مقاطع فيديو مطابقة' : 'No videos found') + '</p>'
      + '</div>';
    return;
  }

  container.innerHTML = list.map((v, i) => VideoCard(v, i)).join('');

  // Wire click handlers
  container.querySelectorAll('.vid-card').forEach((card, i) => {
    card.addEventListener('click', () => openModal(list[i]));
  });
}

// ── VideoModal (body portal — same technique as tafsir fix) ──
function openModal(video) {
  _currentVideo = video;
  saveLastWatched(video);

  // Remove any existing modal
  closeModal();

  const cat = CATEGORIES.find(c => c.id === video.category);
  const catLabel = cat ? (cat.label[_lang] || cat.label.en) : video.category;

  // Build related videos (same category, excluding current)
  const related = VIDEOS.filter(v => v.category === video.category && v.id !== video.id).slice(0, 4);

  const div = document.createElement('div');
  div.id = 'noorVideoPortal';
  div.style.cssText = [
    'position:fixed', 'inset:0', 'width:100vw', 'height:100vh',
    'background:rgba(0,0,0,0.88)', 'z-index:2147483647',
    'display:flex', 'align-items:center', 'justify-content:center',
    'padding:16px', 'box-sizing:border-box', 'overflow-y:auto',
    'animation:vidFadeIn .2s ease'
  ].join(';');

  div.innerHTML = '<div class="vid-modal">'
    // Header
    + '<div class="vid-modal-head">'
    + '<div class="vid-modal-meta">'
    + '<span class="vid-modal-cat"><i class="' + (cat?.icon || 'ri-video-line') + '"></i> ' + catLabel + '</span>'
    + (video.speaker ? '<span class="vid-modal-speaker"><i class="ri-user-voice-line"></i> ' + escHtml(video.speaker) + '</span>' : '')
    + '</div>'
    + '<button class="vid-modal-close" id="vidModalClose"><i class="ri-close-line"></i></button>'
    + '</div>'
    // Player
    + '<div class="vid-player-wrap">'
    + '<iframe class="vid-player" src="' + embedUrl(video.id) + '" title="' + escHtml(video.title) + '" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
    + '</div>'
    // Title
    + '<div class="vid-modal-title">' + escHtml(video.title) + '</div>'
    // Related videos
    + (related.length ? '<div class="vid-related">'
      + '<div class="vid-related-label"><i class="ri-play-list-line"></i> '
      + (_lang === 'ar' ? 'مقاطع ذات صلة' : 'Related Videos') + '</div>'
      + '<div class="vid-related-grid">'
      + related.map(rv => '<div class="vid-related-card" data-id="' + rv.id + '" data-vid=\'' + JSON.stringify(rv).replace(/'/g, '&#39;') + '\'>'
        + '<img src="' + thumb(rv.id) + '" alt="' + escHtml(rv.title) + '" loading="lazy">'
        + '<div class="vid-related-play"><i class="ri-play-fill"></i></div>'
        + '<div class="vid-related-title">' + escHtml(rv.title) + '</div>'
        + '</div>'
      ).join('')
      + '</div></div>' : '')
    + '</div>'; // end vid-modal

  document.body.appendChild(div);
  document.body.style.overflow = 'hidden';
  _modalEl = div;

  // Wire close events
  document.getElementById('vidModalClose')?.addEventListener('click', closeModal);
  div.addEventListener('click', e => { if (e.target === div) closeModal(); });

  // ESC key
  window._vidEsc = e => { if (e.key === 'Escape') closeModal(); };
  document.addEventListener('keydown', window._vidEsc);

  // Related video clicks
  div.querySelectorAll('.vid-related-card').forEach(card => {
    card.addEventListener('click', () => {
      try {
        const v = JSON.parse(card.dataset.vid.replace(/&#39;/g, "'"));
        openModal(v);
      } catch(e) {}
    });
  });
}

function closeModal() {
  if (_modalEl) {
    _modalEl.style.animation = 'vidFadeOut .18s ease forwards';
    setTimeout(() => { _modalEl?.remove(); _modalEl = null; }, 180);
  }
  document.body.style.overflow = '';
  if (window._vidEsc) { document.removeEventListener('keydown', window._vidEsc); delete window._vidEsc; }
  _currentVideo = null;
}

// ── Last Watched Banner ──
function LastWatchedBanner() {
  const lw = getLastWatched();
  if (!lw) return '';
  const v = VIDEOS.find(vid => vid.id === lw.id);
  if (!v) return '';
  const timeAgo = Math.floor((Date.now() - lw.ts) / 60000);
  const timeStr = timeAgo < 60
    ? timeAgo + ' min ago'
    : Math.floor(timeAgo / 60) + ' hr ago';
  return '<div class="vid-last-watched" id="vidLastWatched" data-vid=\'' + JSON.stringify(v).replace(/'/g, '&#39;') + '\'>'
    + '<div class="vid-lw-left">'
    + '<img src="' + thumb(v.id) + '" alt="' + escHtml(v.title) + '" loading="lazy">'
    + '<div class="vid-lw-info">'
    + '<div class="vid-lw-label"><i class="ri-history-line"></i> '
    + (_lang === 'ar' ? 'استمر من حيث توقفت' : 'Continue watching') + ' · <span>' + timeStr + '</span></div>'
    + '<div class="vid-lw-title">' + escHtml(v.title) + '</div>'
    + (v.speaker ? '<div class="vid-lw-speaker">' + escHtml(v.speaker) + '</div>' : '')
    + '</div></div>'
    + '<button class="vid-lw-btn"><i class="ri-play-fill"></i> '
    + (_lang === 'ar' ? 'استمر' : 'Resume') + '</button>'
    + '</div>';
}

// ── Page Module ──
const Videos = {
  render(lang) {
    _lang = lang;
    const isAr = lang === 'ar';
    const totalCount = VIDEOS.length;

    return '<div class="pg-hd">'
      + '<div class="pg-hd-ic"><i class="ri-play-circle-fill"></i></div>'
      + '<h1>' + (isAr ? 'مكتبة الفيديو الإسلامية' : 'Islamic Video Library') + '</h1>'
      + '<p>' + (isAr
        ? 'محاضرات وتلاوات وتفسير ومواعظ من علماء موثوقين'
        : 'Lectures, recitations, tafsir, and reminders from trusted scholars') + '</p>'
      + '</div>'
      + '<div class="pg-body">'

      // Last watched banner
      + LastWatchedBanner()

      // Search bar
      + '<div class="vid-search-wrap">'
      + '<div class="vid-search-bar">'
      + '<i class="ri-search-line"></i>'
      + '<input type="text" id="vidSearch" placeholder="'
      + (isAr ? 'ابحث عن فيديو، مجال، أو شيخ...' : 'Search videos, topics, or speakers...')
      + '">'
      + '<button class="vid-search-clear" id="vidSearchClear" style="display:none"><i class="ri-close-line"></i></button>'
      + '</div>'
      + '<div class="vid-total-count"><span id="vidCount">' + totalCount + ' videos</span></div>'
      + '</div>'

      // Category filter
      + '<div class="vid-cats" id="vidCats">' + CategoryFilter() + '</div>'

      // Video grid
      + '<div class="vid-grid" id="vidGrid"></div>'

      + '</div>'
      + '<footer class="ft"><i class="ri-heart-fill"></i> '
      + (isAr ? 'صُنع للأمة' : 'Built for the Ummah') + '</footer>';
  },

  init(lang) {
    _lang = lang;
    _activeCat = 'all';
    _searchQuery = '';

    // Render grid immediately
    requestAnimationFrame(() => {
      renderGrid();

      // Last watched click
      document.getElementById('vidLastWatched')?.addEventListener('click', function() {
        try {
          const v = JSON.parse(this.dataset.vid.replace(/&#39;/g, "'"));
          openModal(v);
        } catch(e) {}
      });
    });

    // Category filter
    document.getElementById('vidCats')?.addEventListener('click', e => {
      const btn = e.target.closest('.vid-cat-btn');
      if (!btn) return;
      _activeCat = btn.dataset.cat;
      document.querySelectorAll('.vid-cat-btn').forEach(b => b.classList.toggle('active', b.dataset.cat === _activeCat));
      renderGrid();
    });

    // Search
    const searchInput = document.getElementById('vidSearch');
    const clearBtn = document.getElementById('vidSearchClear');
    let searchTimer;
    searchInput?.addEventListener('input', e => {
      _searchQuery = e.target.value;
      clearBtn.style.display = _searchQuery ? 'flex' : 'none';
      clearTimeout(searchTimer);
      searchTimer = setTimeout(renderGrid, 200);
    });
    clearBtn?.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      _searchQuery = '';
      clearBtn.style.display = 'none';
      renderGrid();
    });
  },

  destroy() {
    closeModal();
    document.body.style.overflow = '';
  }
};

export default Videos;
