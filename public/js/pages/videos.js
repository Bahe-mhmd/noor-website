// ═══════════════════════════════════════════════════
// NOOR — pages/videos.js  (v2)
//
// TWO SYSTEMS COEXIST:
//   System A: Standalone video grid + single-video modal
//   System B: Playlist cards + playlist modal with sidebar
//
// AUDIO BUG FIX (Critical):
//   Root cause: YouTube iframes keep playing audio even
//   after the DOM node is removed, because the browser
//   holds a reference to the audio stream until the
//   browsing context is destroyed.
//
//   Fix: Before removing ANY iframe, set its src to ''
//   first. This immediately terminates the stream.
//   We do this in stopAllVideo() called by every
//   close/switch function.
// ═══════════════════════════════════════════════════
import { VIDEOS, PLAYLISTS, CATEGORIES } from '../videos.js';
import { t } from '../i18n.js';

// ── State ──
let _lang         = 'en';
let _activeCat    = 'all';
let _searchQuery  = '';
let _singleModal  = null;   // body portal for single video
let _playlistModal = null;  // body portal for playlist
let _activePlaylistIdx = 0; // currently playing index in playlist
const LAST_WATCHED_KEY = 'noor_last_video';

// ══════════════════════════════════════════════════
// AUDIO BUG FIX — Kill ALL active iframes
// Must be called before EVERY modal close or switch
// ══════════════════════════════════════════════════
function stopAllVideo() {
  // Find every YouTube iframe in any portal and zero its src
  // This is the ONLY reliable way to stop audio across all browsers
  ['noorVideoPortal', 'noorPlaylistPortal'].forEach(portalId => {
    const portal = document.getElementById(portalId);
    if (!portal) return;
    portal.querySelectorAll('iframe').forEach(iframe => {
      iframe.src = ''; // ← terminates audio stream immediately
    });
  });
}

// ── Shared helpers ──
const thumb = id => 'https://img.youtube.com/vi/' + id + '/hqdefault.jpg';
const embed  = id => 'https://www.youtube.com/embed/' + id + '?autoplay=1&rel=0&modestbranding=1';

function escHtml(s) {
  return (s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function saveLastWatched(video) {
  try { localStorage.setItem(LAST_WATCHED_KEY, JSON.stringify({ id: video.id, title: video.title, ts: Date.now() })); } catch(e) {}
}
function getLastWatched() {
  try { return JSON.parse(localStorage.getItem(LAST_WATCHED_KEY) || 'null'); } catch(e) { return null; }
}

// ESC key handler shared
function attachEsc(closeFn) {
  const handler = e => { if (e.key === 'Escape') closeFn(); };
  document.addEventListener('keydown', handler);
  return handler;
}

// ══════════════════════════════════════════════════
// SYSTEM A — SINGLE VIDEO MODAL
// ══════════════════════════════════════════════════
function openSingleModal(video) {
  // Always stop before opening new modal (handles any stale audio)
  stopAllVideo();
  closeSingleModal(true);   // true = skip the stopAllVideo inside (already done)
  closePlaylistModal(true);

  saveLastWatched(video);

  const cat = CATEGORIES.find(c => c.id === video.category);
  const catLabel = cat ? (cat.label[_lang] || cat.label.en) : video.category;
  const related = VIDEOS.filter(v => v.category === video.category && v.id !== video.id).slice(0, 4);

  const portal = document.createElement('div');
  portal.id = 'noorVideoPortal';
  portal.setAttribute('style', [
    'position:fixed','inset:0','width:100vw','height:100vh',
    'background:rgba(0,0,0,0.88)','z-index:2147483647',
    'display:flex','align-items:center','justify-content:center',
    'padding:16px','box-sizing:border-box','overflow-y:auto',
    'animation:vidFadeIn .2s ease'
  ].join(';'));

  portal.innerHTML =
    '<div class="vid-modal">'
    // Header
    + '<div class="vid-modal-head">'
    + '<div class="vid-modal-meta">'
    + '<span class="vid-modal-cat"><i class="' + (cat?.icon || 'ri-video-line') + '"></i> ' + catLabel + '</span>'
    + (video.speaker ? '<span class="vid-modal-speaker"><i class="ri-user-voice-line"></i> ' + escHtml(video.speaker) + '</span>' : '')
    + '</div>'
    + '<button class="vid-modal-close" id="singleModalClose"><i class="ri-close-line"></i></button>'
    + '</div>'
    // Player
    + '<div class="vid-player-wrap">'
    + '<iframe id="singlePlayerFrame" class="vid-player" src="' + embed(video.id) + '" title="' + escHtml(video.title) + '" frameborder="0" allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture" allowfullscreen></iframe>'
    + '</div>'
    // Title
    + '<div class="vid-modal-title">' + escHtml(video.title) + '</div>'
    // Related
    + (related.length
      ? '<div class="vid-related"><div class="vid-related-label"><i class="ri-play-list-line"></i> '
        + (_lang === 'ar' ? 'مقاطع ذات صلة' : 'Related Videos')
        + '</div><div class="vid-related-grid">'
        + related.map(rv =>
            '<div class="vid-related-card" data-rv=\'' + JSON.stringify(rv).replace(/'/g,"&#39;") + '\'>'
            + '<img src="' + thumb(rv.id) + '" alt="' + escHtml(rv.title) + '" loading="lazy">'
            + '<div class="vid-related-play"><i class="ri-play-fill"></i></div>'
            + '<div class="vid-related-title">' + escHtml(rv.title) + '</div>'
            + '</div>'
          ).join('')
        + '</div></div>'
      : '')
    + '</div>'; // end vid-modal

  document.body.appendChild(portal);
  document.body.style.overflow = 'hidden';
  _singleModal = portal;

  // Close events
  document.getElementById('singleModalClose')?.addEventListener('click', () => closeSingleModal());
  portal.addEventListener('click', e => { if (e.target === portal) closeSingleModal(); });

  const escHandler = attachEsc(closeSingleModal);
  portal._escHandler = escHandler;

  // Related video clicks
  portal.querySelectorAll('.vid-related-card').forEach(card => {
    card.addEventListener('click', () => {
      try { openSingleModal(JSON.parse(card.dataset.rv.replace(/&#39;/g, "'"))); } catch(e) {}
    });
  });
}

function closeSingleModal(skipStop = false) {
  if (!skipStop) stopAllVideo(); // ← AUDIO BUG FIX
  if (!_singleModal) return;
  if (_singleModal._escHandler) document.removeEventListener('keydown', _singleModal._escHandler);
  _singleModal.style.animation = 'vidFadeOut .18s ease forwards';
  const el = _singleModal;
  _singleModal = null;
  setTimeout(() => { el.remove(); document.body.style.overflow = ''; }, 180);
}

// ══════════════════════════════════════════════════
// SYSTEM B — PLAYLIST MODAL (new feature)
// ══════════════════════════════════════════════════
function openPlaylistModal(playlist) {
  stopAllVideo();
  closeSingleModal(true);
  closePlaylistModal(true);

  _activePlaylistIdx = 0;
  const firstVideo = playlist.videos[0];
  saveLastWatched({ id: firstVideo.id, title: firstVideo.title });

  const portal = buildPlaylistPortal(playlist, 0);
  document.body.appendChild(portal);
  document.body.style.overflow = 'hidden';
  _playlistModal = portal;

  const escHandler = attachEsc(closePlaylistModal);
  portal._escHandler = escHandler;
  portal._playlist = playlist;

  wirePlaylistEvents(portal, playlist);
}

function buildPlaylistPortal(playlist, activeIdx) {
  const portal = document.createElement('div');
  portal.id = 'noorPlaylistPortal';
  portal.setAttribute('style', [
    'position:fixed','inset:0','width:100vw','height:100vh',
    'background:rgba(0,0,0,0.92)','z-index:2147483647',
    'display:flex','align-items:center','justify-content:center',
    'padding:16px','box-sizing:border-box',
    'animation:vidFadeIn .2s ease'
  ].join(';'));

  const cat = CATEGORIES.find(c => c.id === playlist.category);
  const catLabel = cat ? (cat.label[_lang] || cat.label.en) : playlist.category;
  const video = playlist.videos[activeIdx];
  const isAr = _lang === 'ar';

  portal.innerHTML =
    '<div class="pl-modal">'
    // Modal header
    + '<div class="pl-modal-head">'
    + '<div class="pl-head-left">'
    + '<span class="vid-modal-cat"><i class="' + (cat?.icon || 'ri-play-list-line') + '"></i> ' + catLabel + '</span>'
    + '<h3 class="pl-modal-title">' + escHtml(playlist.title) + '</h3>'
    + (playlist.speaker ? '<span class="vid-modal-speaker"><i class="ri-user-voice-line"></i> ' + escHtml(playlist.speaker) + '</span>' : '')
    + '</div>'
    + '<button class="vid-modal-close" id="playlistModalClose"><i class="ri-close-line"></i></button>'
    + '</div>'
    // Body: player + sidebar
    + '<div class="pl-modal-body">'
    // Player panel
    + '<div class="pl-player-panel">'
    + '<div class="vid-player-wrap">'
    + '<iframe id="plPlayerFrame" class="vid-player" src="' + embed(video.id) + '" title="' + escHtml(video.title) + '" frameborder="0" allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture" allowfullscreen></iframe>'
    + '</div>'
    + '<div class="pl-now-playing">'
    + '<div class="pl-now-label"><i class="ri-play-fill"></i> '
    + (isAr ? 'قيد التشغيل' : 'Now playing') + ' — '
    + '<span id="plNowIdx">' + (activeIdx + 1) + '</span> / ' + playlist.videos.length
    + '</div>'
    + '<div class="pl-now-title" id="plNowTitle">' + escHtml(video.title) + '</div>'
    + '</div>'
    // Prev/Next controls
    + '<div class="pl-controls">'
    + '<button class="pl-ctrl-btn" id="plPrevBtn" ' + (activeIdx === 0 ? 'disabled' : '') + '>'
    + '<i class="' + (isAr ? 'ri-skip-forward-line' : 'ri-skip-back-line') + '"></i> '
    + (isAr ? 'السابق' : 'Previous')
    + '</button>'
    + '<button class="pl-ctrl-btn primary" id="plNextBtn" ' + (activeIdx === playlist.videos.length - 1 ? 'disabled' : '') + '>'
    + (isAr ? 'التالي' : 'Next') + ' '
    + '<i class="' + (isAr ? 'ri-skip-back-line' : 'ri-skip-forward-line') + '"></i>'
    + '</button>'
    + '</div>'
    + '</div>'
    // Sidebar
    + '<div class="pl-sidebar">'
    + '<div class="pl-sidebar-header">'
    + '<i class="ri-play-list-2-line"></i> '
    + (isAr ? 'قائمة التشغيل' : 'Playlist')
    + ' <span class="pl-sidebar-count">' + playlist.videos.length + ' '
    + (isAr ? 'مقاطع' : 'videos') + '</span>'
    + '</div>'
    + '<div class="pl-sidebar-list" id="plSidebarList">'
    + playlist.videos.map((v, i) =>
        '<div class="pl-sidebar-item' + (i === activeIdx ? ' active' : '') + '" data-idx="' + i + '">'
        + '<div class="pl-sidebar-thumb-wrap">'
        + '<img src="' + thumb(v.id) + '" alt="' + escHtml(v.title) + '" loading="lazy">'
        + '<div class="pl-sidebar-play"><i class="ri-play-fill"></i></div>'
        + (i === activeIdx ? '<div class="pl-sidebar-playing-anim"><span></span><span></span><span></span></div>' : '')
        + '</div>'
        + '<div class="pl-sidebar-info">'
        + '<div class="pl-sidebar-num">' + (i + 1) + '</div>'
        + '<div class="pl-sidebar-vtitle">' + escHtml(v.title) + '</div>'
        + (v.duration ? '<div class="pl-sidebar-dur"><i class="ri-time-line"></i>' + v.duration + '</div>' : '')
        + '</div>'
        + '</div>'
    ).join('')
    + '</div>'
    + '</div>'
    + '</div>' // end pl-modal-body
    + '</div>'; // end pl-modal

  return portal;
}

function switchPlaylistVideo(playlist, idx) {
  if (idx < 0 || idx >= playlist.videos.length) return;
  _activePlaylistIdx = idx;
  const video = playlist.videos[idx];
  saveLastWatched({ id: video.id, title: video.title });

  // ── AUDIO BUG FIX: zero src BEFORE setting new src ──
  const frame = document.getElementById('plPlayerFrame');
  if (frame) {
    frame.src = '';                     // kill audio immediately
    requestAnimationFrame(() => {
      frame.src = embed(video.id);     // then load new video
    });
  }

  // Update now-playing text
  const nowTitle = document.getElementById('plNowTitle');
  const nowIdx   = document.getElementById('plNowIdx');
  if (nowTitle) nowTitle.textContent = video.title;
  if (nowIdx)   nowIdx.textContent   = idx + 1;

  // Update prev/next buttons
  const prevBtn = document.getElementById('plPrevBtn');
  const nextBtn = document.getElementById('plNextBtn');
  if (prevBtn) prevBtn.disabled = idx === 0;
  if (nextBtn) nextBtn.disabled = idx === playlist.videos.length - 1;

  // Rebuild sidebar items (lightweight — just innerHTML of the list)
  const sidebar = document.getElementById('plSidebarList');
  if (sidebar) {
    sidebar.querySelectorAll('.pl-sidebar-item').forEach((item, i) => {
      const isActive = i === idx;
      item.classList.toggle('active', isActive);
      // Add/remove playing animation
      const existingAnim = item.querySelector('.pl-sidebar-playing-anim');
      if (isActive && !existingAnim) {
        const anim = document.createElement('div');
        anim.className = 'pl-sidebar-playing-anim';
        anim.innerHTML = '<span></span><span></span><span></span>';
        item.querySelector('.pl-sidebar-thumb-wrap')?.appendChild(anim);
      } else if (!isActive && existingAnim) {
        existingAnim.remove();
      }
      // Scroll active item into view
      if (isActive) {
        item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  }
}

function wirePlaylistEvents(portal, playlist) {
  // Close
  document.getElementById('playlistModalClose')?.addEventListener('click', () => closePlaylistModal());
  portal.addEventListener('click', e => { if (e.target === portal) closePlaylistModal(); });

  // Prev / Next
  document.getElementById('plPrevBtn')?.addEventListener('click', () => {
    switchPlaylistVideo(playlist, _activePlaylistIdx - 1);
  });
  document.getElementById('plNextBtn')?.addEventListener('click', () => {
    switchPlaylistVideo(playlist, _activePlaylistIdx + 1);
  });

  // Sidebar item clicks
  document.getElementById('plSidebarList')?.addEventListener('click', e => {
    const item = e.target.closest('.pl-sidebar-item');
    if (!item) return;
    const idx = parseInt(item.dataset.idx);
    if (!isNaN(idx) && idx !== _activePlaylistIdx) {
      switchPlaylistVideo(playlist, idx);
    }
  });
}

function closePlaylistModal(skipStop = false) {
  if (!skipStop) stopAllVideo(); // ← AUDIO BUG FIX
  if (!_playlistModal) return;
  if (_playlistModal._escHandler) document.removeEventListener('keydown', _playlistModal._escHandler);
  _playlistModal.style.animation = 'vidFadeOut .18s ease forwards';
  const el = _playlistModal;
  _playlistModal = null;
  setTimeout(() => { el.remove(); document.body.style.overflow = ''; }, 180);
}

// ══════════════════════════════════════════════════
// PLAYLIST CARD (for the grid)
// ══════════════════════════════════════════════════
function PlaylistCard(pl) {
  const cat = CATEGORIES.find(c => c.id === pl.category);
  const catLabel = cat ? (cat.label[_lang] || cat.label.en) : pl.category;
  const firstId = pl.videos[0]?.id || '';
  const count = pl.videos.length;
  return '<div class="pl-card" data-plid="' + pl.id + '">'
    + '<div class="pl-card-thumb-wrap">'
    + '<img class="vid-thumb" src="' + thumb(firstId) + '" alt="' + escHtml(pl.title) + '" loading="lazy">'
    + '<div class="pl-card-overlay">'
    + '<div class="pl-card-count"><i class="ri-play-list-2-line"></i> ' + count + ' ' + (_lang === 'ar' ? 'مقاطع' : 'videos') + '</div>'
    + '<div class="pl-card-play-btn"><i class="ri-play-fill"></i></div>'
    + '</div>'
    // Stack effect
    + '<div class="pl-card-stack-1"></div>'
    + '<div class="pl-card-stack-2"></div>'
    + '</div>'
    + '<div class="vid-info">'
    + '<div class="vid-cat-badge"><i class="ri-play-list-line"></i> ' + (_lang === 'ar' ? 'سلسلة' : 'Series') + ' · ' + catLabel + '</div>'
    + '<div class="vid-title">' + escHtml(pl.title) + '</div>'
    + (pl.speaker ? '<div class="vid-speaker"><i class="ri-user-voice-line"></i> ' + escHtml(pl.speaker) + '</div>' : '')
    + '</div>'
    + '</div>';
}

// ── Single VideoCard ──
function VideoCard(v) {
  const cat = CATEGORIES.find(c => c.id === v.category);
  const catLabel = cat ? (cat.label[_lang] || cat.label.en) : v.category;
  return '<div class="vid-card" data-id="' + v.id + '">'
    + '<div class="vid-thumb-wrap">'
    + '<img class="vid-thumb" src="' + thumb(v.id) + '" alt="' + escHtml(v.title) + '" loading="lazy">'
    + '<div class="vid-play-btn"><i class="ri-play-fill"></i></div>'
    + (v.duration ? '<div class="vid-duration">' + v.duration + '</div>' : '')
    + '</div>'
    + '<div class="vid-info">'
    + '<div class="vid-cat-badge"><i class="' + (cat?.icon || 'ri-video-line') + '"></i> ' + catLabel + '</div>'
    + '<div class="vid-title">' + escHtml(v.title) + '</div>'
    + (v.speaker ? '<div class="vid-speaker"><i class="ri-user-voice-line"></i> ' + escHtml(v.speaker) + '</div>' : '')
    + '</div>'
    + '</div>';
}

// ── Last Watched Banner ──
function LastWatchedBanner() {
  const lw = getLastWatched();
  if (!lw) return '';
  const v = VIDEOS.find(vid => vid.id === lw.id);
  if (!v) return '';
  const mins = Math.floor((Date.now() - lw.ts) / 60000);
  const timeStr = mins < 60 ? mins + ' min ago' : Math.floor(mins / 60) + ' hr ago';
  return '<div class="vid-last-watched" id="vidLastWatched" data-lv=\'' + JSON.stringify(v).replace(/'/g,"&#39;") + '\'>'
    + '<div class="vid-lw-left">'
    + '<img src="' + thumb(v.id) + '" alt="" loading="lazy">'
    + '<div class="vid-lw-info">'
    + '<div class="vid-lw-label"><i class="ri-history-line"></i> '
    + (_lang === 'ar' ? 'استمر من حيث توقفت' : 'Continue watching')
    + ' · <span>' + timeStr + '</span></div>'
    + '<div class="vid-lw-title">' + escHtml(v.title) + '</div>'
    + (v.speaker ? '<div class="vid-lw-speaker">' + escHtml(v.speaker) + '</div>' : '')
    + '</div></div>'
    + '<button class="vid-lw-btn"><i class="ri-play-fill"></i> '
    + (_lang === 'ar' ? 'استمر' : 'Resume') + '</button>'
    + '</div>';
}

// ── Category filter ──
function CategoryFilter() {
  return CATEGORIES.map(c =>
    '<button class="vid-cat-btn' + (c.id === _activeCat ? ' active' : '') + '" data-cat="' + c.id + '">'
    + '<i class="' + c.icon + '"></i>'
    + '<span>' + (c.label[_lang] || c.label.en) + '</span>'
    + '</button>'
  ).join('');
}

// ── Render grid (both systems) ──
function renderGrid() {
  const container = document.getElementById('vidGrid');
  const countEl   = document.getElementById('vidCount');
  if (!container) return;

  const q = _searchQuery.toLowerCase().trim();
  const showPlaylists = _activeCat === 'all' || _activeCat === 'playlist';
  const showVideos    = _activeCat !== 'playlist';

  // Filter standalone videos
  const filteredVideos = showVideos ? VIDEOS.filter(v => {
    const catOk = _activeCat === 'all' || v.category === _activeCat;
    if (!catOk) return false;
    if (!q) return true;
    return v.title.toLowerCase().includes(q) || (v.speaker || '').toLowerCase().includes(q);
  }) : [];

  // Filter playlists
  const filteredPlaylists = showPlaylists ? PLAYLISTS.filter(pl => {
    if (_activeCat === 'playlist') return !q || pl.title.toLowerCase().includes(q) || (pl.speaker || '').toLowerCase().includes(q);
    if (_activeCat !== 'all') return false;
    return !q || pl.title.toLowerCase().includes(q) || (pl.speaker || '').toLowerCase().includes(q);
  }) : [];

  const total = filteredVideos.length + filteredPlaylists.length;
  if (countEl) countEl.textContent = total + ' ' + (_lang === 'ar' ? 'مقطع' : (total === 1 ? 'video' : 'videos'));

  if (!total) {
    container.innerHTML = '<div class="vid-empty"><i class="ri-video-off-line"></i><p>'
      + (_lang === 'ar' ? 'لا توجد نتائج' : 'No videos found') + '</p></div>';
    return;
  }

  let html = '';

  // Playlists section
  if (filteredPlaylists.length) {
    html += '<div class="vid-section-label"><i class="ri-play-list-2-line"></i> '
      + (_lang === 'ar' ? 'السلاسل والقوائم' : 'Series & Playlists')
      + ' <span class="vid-section-count">' + filteredPlaylists.length + '</span></div>';
    html += filteredPlaylists.map(pl => PlaylistCard(pl)).join('');
  }

  // Standalone videos section
  if (filteredVideos.length) {
    if (filteredPlaylists.length) {
      html += '<div class="vid-section-label"><i class="ri-play-circle-line"></i> '
        + (_lang === 'ar' ? 'مقاطع فردية' : 'Individual Videos')
        + ' <span class="vid-section-count">' + filteredVideos.length + '</span></div>';
    }
    html += filteredVideos.map(v => VideoCard(v)).join('');
  }

  container.innerHTML = html;

  // Wire playlist card clicks
  container.querySelectorAll('.pl-card').forEach(card => {
    const pl = PLAYLISTS.find(p => p.id === card.dataset.plid);
    if (pl) card.addEventListener('click', () => openPlaylistModal(pl));
  });

  // Wire single video card clicks
  container.querySelectorAll('.vid-card').forEach(card => {
    const v = VIDEOS.find(vid => vid.id === card.dataset.id);
    if (v) card.addEventListener('click', () => openSingleModal(v));
  });
}

// ── Page Module ──
const Videos = {
  render(lang) {
    _lang = lang;
    const isAr = lang === 'ar';
    const total = VIDEOS.length + PLAYLISTS.length;

    return '<div class="pg-hd">'
      + '<div class="pg-hd-ic"><i class="ri-play-circle-fill"></i></div>'
      + '<h1>' + (isAr ? 'مكتبة الفيديو الإسلامية' : 'Islamic Video Library') + '</h1>'
      + '<p>' + (isAr
        ? 'محاضرات وسلاسل تعليمية وتلاوات من علماء موثوقين'
        : 'Lectures, series, recitations, and reminders from trusted scholars') + '</p>'
      + '</div>'
      + '<div class="pg-body">'

      + LastWatchedBanner()

      // Search
      + '<div class="vid-search-wrap">'
      + '<div class="vid-search-bar">'
      + '<i class="ri-search-line"></i>'
      + '<input type="text" id="vidSearch" placeholder="'
      + (isAr ? 'ابحث عن فيديو أو سلسلة أو شيخ...' : 'Search videos, series, or speakers...')
      + '">'
      + '<button class="vid-search-clear" id="vidSearchClear" style="display:none"><i class="ri-close-line"></i></button>'
      + '</div>'
      + '<div class="vid-total-count"><span id="vidCount">' + total + ' videos</span></div>'
      + '</div>'

      // Category filter
      + '<div class="vid-cats" id="vidCats">' + CategoryFilter() + '</div>'

      // Grid
      + '<div class="vid-grid" id="vidGrid"></div>'

      + '</div>'
      + '<footer class="ft"><i class="ri-heart-fill"></i> '
      + (isAr ? 'صُنع للأمة' : 'Built for the Ummah') + '</footer>';
  },

  init(lang) {
    _lang = lang;
    _activeCat = 'all';
    _searchQuery = '';

    requestAnimationFrame(() => {
      renderGrid();

      // Last watched
      document.getElementById('vidLastWatched')?.addEventListener('click', function() {
        try {
          const v = JSON.parse(this.dataset.lv.replace(/&#39;/g, "'"));
          openSingleModal(v);
        } catch(e) {}
      });
    });

    // Category filter clicks
    document.getElementById('vidCats')?.addEventListener('click', e => {
      const btn = e.target.closest('.vid-cat-btn');
      if (!btn) return;
      _activeCat = btn.dataset.cat;
      document.querySelectorAll('.vid-cat-btn').forEach(b => b.classList.toggle('active', b.dataset.cat === _activeCat));
      renderGrid();
    });

    // Search
    const searchInput = document.getElementById('vidSearch');
    const clearBtn    = document.getElementById('vidSearchClear');
    let searchTimer;
    searchInput?.addEventListener('input', e => {
      _searchQuery = e.target.value;
      if (clearBtn) clearBtn.style.display = _searchQuery ? 'flex' : 'none';
      clearTimeout(searchTimer);
      searchTimer = setTimeout(renderGrid, 220);
    });
    clearBtn?.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      _searchQuery = '';
      if (clearBtn) clearBtn.style.display = 'none';
      renderGrid();
    });
  },

  destroy() {
    // Guaranteed cleanup — stops all audio on page navigation
    stopAllVideo();
    closeSingleModal(true);
    closePlaylistModal(true);
    document.body.style.overflow = '';
  }
};

export default Videos;
