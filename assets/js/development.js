import { localUrl, apiUrl } from './config.js';
import axios from 'axios';

/* ----------------------------- Utilities ----------------------------- */

function getCookie(name) {
  const cookies = document.cookie.split(';').map((c) => c.trim());
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split('=');
    if (cookieName === name) return decodeURIComponent(cookieValue ?? '');
  }
  return null;
}

function getPageFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  const p = parseInt(urlParams.get('page') || '1', 10);
  return Number.isFinite(p) && p > 0 ? p : 1;
}

function setPageToUrl(page) {
  const urlParams = new URLSearchParams(window.location.search);
  urlParams.set('page', String(page));
  const newUrl = `${window.location.origin}${window.location.pathname}?${urlParams.toString()}`;
  window.history.replaceState({}, document.title, newUrl);
}

function escapeHtml(str) {
  // Prevent accidental HTML injection when data comes from API
  return String(str ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function ensureTrailingSlash(url) {
  return url.endsWith('/') ? url : `${url}/`;
}

const API = ensureTrailingSlash(apiUrl);
const LOCAL = localUrl; // assuming localUrl already suitable in your project

/* ----------------------------- State ----------------------------- */

const storedToken = getCookie('outfitpalsToken');
const userId = getCookie('outfitpalsId'); // can be null if not logged in

const POSTS_PER_PAGE = 9;
const MAX_PAGES = 100;

let posts = [];
let favoritesSet = new Set(); // postId liked by user
let likesSet = new Set(); // postId favorited by user

// For fast access when toggling (avoid find() cost)
let postById = new Map();

/* ----------------------------- DOM ----------------------------- */

const root = document.querySelector('.post');
if (!root) {
  console.error('Missing .post container');
}

function renderSkeleton() {
  if (!root) return;

  root.innerHTML = `
    <div class="row justify-content-center post1"></div>
    <div class="row justify-content-center mt-5 post2"></div>
    <div class="row justify-content-center mt-5 post3"></div>
    <div class="pe-5 me-5 mt-5">
      <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-lg-center my-3">
          <li class="page-item">
            <a href="#" class="page-link border-0 l" data-action="prev">
              <i class="bi bi-chevron-left"></i>
            </a>
          </li>
          <div class="page d-flex"></div>
          <li class="page-item">
            <a href="#" class="page-link border-0 r" data-action="next">
              <i class="bi bi-chevron-right"></i>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  `;
}

function getPostContainers() {
  return [
    root?.querySelector('.post1'),
    root?.querySelector('.post2'),
    root?.querySelector('.post3'),
  ].filter(Boolean);
}

function buildCardHtml(post) {
  const imgUrl = post.imgUrl || '';
  const user = post.user || {};
  const userImage = user.image || '';
  const username = user.name || '';
  const height = user.height ?? '';
  const weight = user.weight ?? '';
  const uid = post.userId ?? '';
  const postid = post.id ?? '';

  const isFav = favoritesSet.has(Number(postid));
  const isLike = likesSet.has(Number(postid));

  const collectCls = isFav ? 'bi-bookmark-fill icollect' : 'bi-bookmark';
  const loveCls = isLike ? 'bi-heart-fill ilove' : 'bi-heart';

  // Use data-* so event delegation can handle actions.
  return `
    <div class="col-4">
      <div class="card card1" style="width: 350px; height: 450px;" data-post-id="${escapeHtml(postid)}" data-user-id="${escapeHtml(uid)}">
        <img
          src="${escapeHtml(imgUrl)}"
          style="width: 350px; height: 350px;"
          class="object-fit-cover img"
          loading="lazy"
          alt="post"
          data-action="open-post"
        />
        <div class="card-body dontmove" id="${escapeHtml(postid)}">
          <div class="row">
            <div class="col-8 mt-2 d-flex">
              <div
                class="circle-box others"
                style="width: 50px; height: 50px; background: url('${escapeHtml(userImage)}') center center / cover no-repeat;"
                data-action="open-user"
                data-user-id="${escapeHtml(uid)}"
                role="button"
                aria-label="open user"
              ></div>
              <div class="ms-2">
                <strong>${escapeHtml(username)}</strong>
                <p class="fs-6 text-nowrap" style="opacity: 0.4;">${escapeHtml(height)}cm ${escapeHtml(weight)}kg</p>
              </div>
            </div>

            <div class="col-1 icon2">
              <p
                class="bi display-6 mt-2 me-3 love ${loveCls}"
                style="position: relative; top: 2px;"
                data-action="toggle-like"
                aria-label="toggle like"
                role="button"
              ></p>
            </div>

            <div class="col-1 ms-3 icon">
              <p
                class="bi display-6 mt-2 collect ${collectCls}"
                data-action="toggle-favorite"
                aria-label="toggle favorite"
                role="button"
              ></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderPosts(page) {
  if (!root) return;
  const containers = getPostContainers();
  containers.forEach((c) => (c.innerHTML = ''));

  const startIndex = (page - 1) * POSTS_PER_PAGE;
  const pagePosts = posts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  // Split into 3 rows (3 cards each)
  const chunks = [pagePosts.slice(0, 3), pagePosts.slice(3, 6), pagePosts.slice(6, 9)];

  chunks.forEach((chunk, idx) => {
    const container = containers[idx];
    if (!container) return;
    container.innerHTML = chunk.map(buildCardHtml).join('');
  });
}

function renderPagination(page) {
  if (!root) return;

  const pageEl = root.querySelector('.page');
  if (!pageEl) return;

  const totalPages = Math.min(MAX_PAGES, Math.ceil(posts.length / POSTS_PER_PAGE));
  if (totalPages <= 0) {
    pageEl.innerHTML = '';
    return;
  }

  // Simple pagination (1..N). If you need windowed pagination later, we can optimize.
  pageEl.innerHTML = Array.from({ length: totalPages }, (_, i) => {
    const p = i + 1;
    const active = p === page ? 'active' : '';
    return `<li class="page-item ${active}"><a href="#" class="page-link border-0" data-action="goto-page" data-page="${p}">${p}</a></li>`;
  }).join('');
}

/* ----------------------------- Data Fetching ----------------------------- */

async function fetchPosts() {
  // NOTE: This still fetches all posts. Best would be server-side pagination:
  // GET /posts?_expand=user&_page=1&_limit=9
  // But to keep compatibility, we refactor performance on the frontend first.
  const res = await axios.get(`${API}posts?_expand=user`);
  return Array.isArray(res.data) ? res.data : [];
}

async function fetchFavoritesAndLikes(userIdValue) {
  // If not logged in, just return empty sets
  if (!userIdValue) {
    return { favorites: new Set(), likes: new Set() };
  }

  const [favRes, likeRes] = await Promise.all([
    axios.get(`${API}favorites?userId=${encodeURIComponent(userIdValue)}`),
    axios.get(`${API}likes?userId=${encodeURIComponent(userIdValue)}`),
  ]);

  const favorites = new Set((favRes.data || []).map((x) => Number(x.postId)));
  const likes = new Set((likeRes.data || []).map((x) => Number(x.postId)));

  return { favorites, likes };
}

/* ----------------------------- Mutations (Like/Favorite) ----------------------------- */

const inFlight = new Set(); // prevent double click per post/action

function toggleIcon(el, { onClasses, offClasses }, turnOn) {
  // Remove both sets first (stable)
  [...onClasses, ...offClasses].forEach((c) => el.classList.remove(c));
  // Add new set
  (turnOn ? onClasses : offClasses).forEach((c) => el.classList.add(c));
}

async function toggleFavorite(postId) {
  if (!userId) {
    alert('請先登入才能收藏');
    return;
  }

  const key = `fav:${postId}`;
  if (inFlight.has(key)) return;
  inFlight.add(key);

  const isOn = favoritesSet.has(postId);
  const nextOn = !isOn;

  // Optimistic update
  if (nextOn) favoritesSet.add(postId);
  else favoritesSet.delete(postId);
  updateCardIcons(postId);

  try {
    // Update counts optimistically; fall back if missing
    const post = postById.get(postId);
    const currentCount = Number(post?.favoriteCounts ?? 0);
    const nextCount = Math.max(0, currentCount + (nextOn ? 1 : -1));

    // Patch post count (fire & forget is possible, but keep await for correctness)
    await axios.patch(`${API}posts/${postId}`, { favoriteCounts: nextCount });

    if (nextOn) {
      await axios.post(`${API}favorites`, { userId: Number(userId), postId: Number(postId) });
    } else {
      // Need record id to delete (json-server pattern)
      const r = await axios.get(`${API}favorites?postId=${postId}&userId=${userId}`);
      const recId = r.data?.[0]?.id;
      if (recId != null) await axios.delete(`${API}favorites/${recId}`);
    }

    // Keep local cache consistent
    if (post) post.favoriteCounts = nextCount;
  } catch (err) {
    console.error('toggleFavorite failed:', err);

    // Revert optimistic update
    if (nextOn) favoritesSet.delete(postId);
    else favoritesSet.add(postId);
    updateCardIcons(postId);
    alert('收藏更新失敗，請稍後再試');
  } finally {
    inFlight.delete(key);
  }
}

async function toggleLike(postId) {
  if (!userId) {
    alert('請先登入才能按讚');
    return;
  }

  const key = `like:${postId}`;
  if (inFlight.has(key)) return;
  inFlight.add(key);

  const isOn = likesSet.has(postId);
  const nextOn = !isOn;

  // Optimistic update
  if (nextOn) likesSet.add(postId);
  else likesSet.delete(postId);
  updateCardIcons(postId);

  try {
    const post = postById.get(postId);
    const currentCount = Number(post?.likeCounts ?? 0);
    const nextCount = Math.max(0, currentCount + (nextOn ? 1 : -1));

    await axios.patch(`${API}posts/${postId}`, { likeCounts: nextCount });

    if (nextOn) {
      await axios.post(`${API}likes`, { userId: Number(userId), postId: Number(postId) });
    } else {
      const r = await axios.get(`${API}likes?postId=${postId}&userId=${userId}`);
      const recId = r.data?.[0]?.id;
      if (recId != null) await axios.delete(`${API}likes/${recId}`);
    }

    if (post) post.likeCounts = nextCount;
  } catch (err) {
    console.error('toggleLike failed:', err);

    // Revert optimistic update
    if (nextOn) likesSet.delete(postId);
    else likesSet.add(postId);
    updateCardIcons(postId);
    alert('按讚更新失敗，請稍後再試');
  } finally {
    inFlight.delete(key);
  }
}

/* ----------------------------- UI Updates ----------------------------- */

function updateCardIcons(postId) {
  if (!root) return;
  const card = root.querySelector(`.card1[data-post-id="${CSS.escape(String(postId))}"]`);
  if (!card) return;

  const favEl = card.querySelector('[data-action="toggle-favorite"]');
  const likeEl = card.querySelector('[data-action="toggle-like"]');

  if (favEl) {
    const on = favoritesSet.has(Number(postId));
    toggleIcon(
      favEl,
      {
        onClasses: ['bi-bookmark-fill', 'icollect'],
        offClasses: ['bi-bookmark'],
      },
      on
    );
  }

  if (likeEl) {
    const on = likesSet.has(Number(postId));
    toggleIcon(
      likeEl,
      {
        onClasses: ['bi-heart-fill', 'ilove'],
        offClasses: ['bi-heart'],
      },
      on
    );
  }
}

/* ----------------------------- Events (Delegation) ----------------------------- */

function handleRootClick(e) {
  const target = e.target;
  if (!(target instanceof Element)) return;

  const actionEl = target.closest('[data-action]');
  if (!actionEl) return;

  e.preventDefault();
  e.stopPropagation();

  const action = actionEl.getAttribute('data-action');

  // Pagination
  if (action === 'prev' || action === 'next') {
    const totalPages = Math.min(MAX_PAGES, Math.ceil(posts.length / POSTS_PER_PAGE));
    const current = getPageFromUrl();
    const nextPage = action === 'next' ? Math.min(totalPages, current + 1) : Math.max(1, current - 1);
    if (nextPage !== current) {
      setPageToUrl(nextPage);
      renderPosts(nextPage);
      renderPagination(nextPage);
    }
    return;
  }

  if (action === 'goto-page') {
    const p = parseInt(actionEl.getAttribute('data-page') || '1', 10);
    const totalPages = Math.min(MAX_PAGES, Math.ceil(posts.length / POSTS_PER_PAGE));
    const nextPage = Math.min(totalPages, Math.max(1, p));
    setPageToUrl(nextPage);
    renderPosts(nextPage);
    renderPagination(nextPage);
    return;
  }

  // Post interactions
  const card = actionEl.closest('.card1');
  const postId = Number(card?.getAttribute('data-post-id'));
  const uid = card?.getAttribute('data-user-id')?.trim();

  if (!Number.isFinite(postId)) return;

  if (action === 'toggle-favorite') {
    toggleFavorite(postId);
    return;
  }

  if (action === 'toggle-like') {
    toggleLike(postId);
    return;
  }

  if (action === 'open-user') {
    const targetUid = actionEl.getAttribute('data-user-id')?.trim() || uid;
    if (!targetUid) return;

    if (String(targetUid) !== String(userId)) {
      window.location.href = `${LOCAL}/others.html?userId=${encodeURIComponent(targetUid)}&page=1`;
    } else {
      window.location.href = `${LOCAL}/personal.html?page=1`;
    }
    return;
  }

  if (action === 'open-post') {
    window.location.href = `${LOCAL}/information.html?postId=${encodeURIComponent(String(postId))}`;
    return;
  }
}

/* ----------------------------- Boot ----------------------------- */

async function init() {
  if (!root) return;

  renderSkeleton();

  // Attach ONE listener only
  root.addEventListener('click', handleRootClick, { passive: false });

  try {
    // Fetch posts + user interactions in parallel (fastest)
    const [allPosts, userMeta] = await Promise.all([
      fetchPosts(),
      fetchFavoritesAndLikes(userId),
    ]);

    posts = allPosts;
    postById = new Map(posts.map((p) => [Number(p.id), p]));

    favoritesSet = userMeta.favorites;
    likesSet = userMeta.likes;

    const page = getPageFromUrl();
    renderPosts(page);
    renderPagination(page);
  } catch (err) {
    console.error('init failed:', err);
    root.innerHTML = `<div class="alert alert-danger">載入失敗，請稍後再試</div>`;
  }
}

init();
