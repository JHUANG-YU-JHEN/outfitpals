import { localUrl, apiUrl } from './config.js';

/* ----------------------------- Helpers ----------------------------- */

const API = apiUrl.endsWith('/') ? apiUrl : `${apiUrl}/`;
const LOCAL = localUrl;

function getCookie(name) {
  const cookies = document.cookie.split(';').map((c) => c.trim());
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split('=');
    if (cookieName === name) return decodeURIComponent(cookieValue ?? '');
  }
  return null;
}

function qs(sel, root = document) {
  return root.querySelector(sel);
}
function qsa(sel, root = document) {
  return Array.from(root.querySelectorAll(sel));
}

function escapeHtml(str) {
  return String(str ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
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

/* ----------------------------- Auth ----------------------------- */

const storedToken = getCookie('outfitpalsToken');
const userId = getCookie('outfitpalsId');

/* ----------------------------- DOM Cache ----------------------------- */

// Tabs
const thumbLinks = qsa('.thumb-link');

// Sections
const personalMain = qs('#personalmain');
const reserve = qs('#reserve');
const personalnav = qs('#personalnav');
const personalselect = qs('#personalselect');
const collect = qs('#collect');
const noopen = qs('#noopen');
const nopost = qs('#nopost');

// Buttons
const settingBtn = qs('.setting');
const leftBtn = qs('#left');
const rightBtn = qs('#right');
const monthsEl = qs('#months');
const openBtn = qs('#open');
const closeBtn = qs('.close');

// Inputs
const p1 = qs('.p1');
const p2 = qs('.p2');
const p3 = qs('.p3');
const p4 = qs('.p4');
const t1 = qs('.t1');
const m1 = qs('.m1');
const t2 = qs('.t2');
const m2 = qs('.m2');

// Containers
const personalEl = qs('.personal');
const otherspostEl = qs('.otherspost');
const collectpostEl = qs('.collectpost'); // (not used in original; kept)

/* ----------------------------- Calendar State ----------------------------- */

const tdList = qsa('td'); // calendar cells
const today = new Date();
let viewYear = today.getFullYear();
let viewMonthIndex = today.getMonth(); // 0-11

const currentMonthIndex = today.getMonth();
const currentYear = today.getFullYear();
const currentDay = today.getDate();

function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}
function daysInMonth(year, monthIndex) {
  const monthDays = [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  return monthDays[monthIndex];
}
function firstWeekday(year, monthIndex) {
  // 0=Sunday..6=Saturday, but your original treats Sunday as 7
  let d = new Date(year, monthIndex, 1).getDay();
  return d === 0 ? 7 : d;
}

/* ----------------------------- UI State ----------------------------- */

let personalData = null; // /personal record
let selectableDates = new Set(); // okday as "M/D"
let blockedDates = new Set(); // otherdate as "M/D"
let selectedDates = new Set(); // user clicks, to patch back
let originalCellContent = new Array(tdList.length).fill('　'); // cached

/* ----------------------------- Render: Profile ----------------------------- */

function renderProfile(user) {
  if (!personalEl) return;

  personalEl.innerHTML = `
    <div class="col-2 d-flex">
      <div class="circle-box" style="width: 150px; height: 150px;background: url('${escapeHtml(
        user.image
      )}') center center / cover no-repeat;"></div>
    </div>

    <div class="col-6 d-flex">
      <div class="d-flex position-relative">
        <div class="ms-2">
          <div class="row ms-5 align-items-center">
            <div class="col">
              <strong class="display-6 text-nowrap">${escapeHtml(user.name)}</strong>
            </div>
            <div class="col">
              <p class="fs-4 mt-3 text-nowrap" style="opacity: 0.4;">${escapeHtml(
                user.height
              )}cm ${escapeHtml(user.weight)}kg</p>
            </div>
          </div>

          <p class="ms-5 mt-5">${escapeHtml(user.introduce)}</p>

          <div class="d-flex">
            <p class="ms-5">活動範圍 :</p>
            <p>${escapeHtml(user.PopArea)}</p>
          </div>

          <div class="d-flex">
            <p class="ms-5">穿搭價位 :</p>
            <p>${escapeHtml(user['outfit price'])}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="col-2 d-flex align-items-center">
      <div class="sty"></div>
    </div>

    <div class="col-2 d-flex align-items-center mt-3">
      <button type="button" class="btn btn-primary fs-5" id="reservebtn">我的收藏</button>
    </div>
  `;

  // Style chips
  const sty = qs('.sty', personalEl);
  const stys = String(user.style || '').trim().split(/\s+/).filter(Boolean);

  if (sty) {
    if (stys.length <= 1) {
      sty.innerHTML = `
        <p class="fs-3 d-flex justify-content-center ms-3">穿衣風格</p>
        <div class="d-flex justify-content-center">
          <button type="button" class="btn btn-primary btn-pill ms-3">${escapeHtml(stys[0] || '')}</button>
        </div>`;
    } else {
      sty.innerHTML = `
        <p class="fs-3 d-flex justify-content-center ms-3">穿衣風格</p>
        <div class="d-flex justify-content-center">
          <button type="button" class="btn btn-primary btn-pill ms-3">${escapeHtml(stys[0])}</button>
        </div>
        <button type="button" class="btn btn-primary btn-pill mt-3 ms-3">${escapeHtml(stys[1])}</button>`;
    }
  }
}

/* ----------------------------- Render: Posts Grid ----------------------------- */

const POSTS_PER_PAGE = 9;
const MAX_PAGES = 100;

function renderPostWall(containerEl, postdata, page) {
  if (!containerEl) return;

  // Skeleton once
  containerEl.innerHTML = `
    <div class="row justify-content-center post1"></div>
    <div class="row justify-content-center mt-5 post2"></div>
    <div class="row justify-content-center mt-5 post3"></div>
    <div class="pe-5 me-5 mt-5">
      <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-lg-center my-3">
          <li class="page-item"><a href="#" class="page-link border-0 l" data-action="prev"><i class="bi bi-chevron-left"></i></a></li>
          <div class="page d-flex"></div>
          <li class="page-item"><a href="#" class="page-link border-0 r" data-action="next"><i class="bi bi-chevron-right"></i></a></li>
        </ul>
      </nav>
    </div>
  `;

  const row1 = qs('.post1', containerEl);
  const row2 = qs('.post2', containerEl);
  const row3 = qs('.post3', containerEl);
  const pageEl = qs('.page', containerEl);

  const totalPages = Math.min(MAX_PAGES, Math.ceil(postdata.length / POSTS_PER_PAGE));
  const safePage = Math.min(totalPages || 1, Math.max(1, page));
  const start = (safePage - 1) * POSTS_PER_PAGE;
  const pagePosts = postdata.slice(start, start + POSTS_PER_PAGE);

  const chunks = [pagePosts.slice(0, 3), pagePosts.slice(3, 6), pagePosts.slice(6, 9)];

  const buildCard = (p) => `
    <div class="col-4">
      <div class="card card1" style="width: 350px; height: 450px;" data-post-id="${escapeHtml(p.id)}">
        <img src="${escapeHtml(p.imgUrl)}" style="width: 350px; height: 450px;" class="object-fit-cover bg-cover" loading="lazy" alt="post">
      </div>
    </div>`;

  if (row1) row1.innerHTML = chunks[0].map(buildCard).join('');
  if (row2) row2.innerHTML = chunks[1].map(buildCard).join('');
  if (row3) row3.innerHTML = chunks[2].map(buildCard).join('');

  // Pagination render
  if (pageEl) {
    pageEl.innerHTML = '';
    for (let i = 1; i <= totalPages; i++) {
      pageEl.innerHTML += `<li class="page-item ${i === safePage ? 'active' : ''}">
        <a href="#" class="page-link border-0" data-action="goto" data-page="${i}">${i}</a>
      </li>`;
    }
  }

  // Event delegation: bind once per container
  containerEl.onclick = (e) => {
    const target = e.target;
    if (!(target instanceof Element)) return;

    const actionEl = target.closest('[data-action]');
    const cardEl = target.closest('.card1');

    if (actionEl) {
      e.preventDefault();
      const action = actionEl.getAttribute('data-action');
      const total = Math.min(MAX_PAGES, Math.ceil(postdata.length / POSTS_PER_PAGE));
      let current = getPageFromUrl();

      if (action === 'prev') {
        current = Math.max(1, current - 1);
      } else if (action === 'next') {
        current = Math.min(total || 1, current + 1);
      } else if (action === 'goto') {
        current = parseInt(actionEl.getAttribute('data-page') || '1', 10);
        current = Math.min(total || 1, Math.max(1, current));
      } else {
        return;
      }

      setPageToUrl(current);
      renderPostWall(containerEl, postdata, current);
      return;
    }

    if (cardEl) {
      e.preventDefault();
      const id = cardEl.getAttribute('data-post-id')?.trim();
      if (id) window.location.href = `${LOCAL}/information.html?postId=${encodeURIComponent(id)}`;
    }
  };
}

/* ----------------------------- Render: Favorites Page ----------------------------- */

function showCollectView(user) {
  if (!collect) return;

  // Hide other sections
  personalnav?.classList.add('d-none');
  personalselect?.classList.add('d-none');
  reserve?.classList.add('d-none');
  personalMain?.classList.add('d-none');
  nopost?.classList.add('d-none');
  noopen?.classList.add('d-none');
  collect.classList.remove('d-none');

  collect.innerHTML = `
    <div class="container">
      <div class="row my-6 align-items-center">
        <div class="col-6 d-flex justify-content-center">
          <div class="d-flex align-items-center">
            <div class="circle-box" style="width: 100px; height: 100px;background: url('${escapeHtml(
              user.image
            )}') center center / cover no-repeat;"></div>
            <strong class="display-6 ms-3 text-nowrap">${escapeHtml(user.name)}</strong>
          </div>
        </div>
        <div class="col-6 d-flex justify-content-center">
          <button type="button" class="btn btn-primary ps-5 ms-5" id="goback">返回我的主頁</button>
        </div>
      </div>
    </div>
    <hr class="m-1">
    <br>
    <div class="container mb-5">
      <div class="row justify-content-center mt-4" id="cardRow"></div>
    </div>
  `;

  const goback = qs('#goback', collect);
  goback?.addEventListener(
    'click',
    () => {
      collect.classList.add('d-none');
      personalnav?.classList.remove('d-none');
      personalselect?.classList.remove('d-none');
      personalMain?.classList.remove('d-none');
    },
    { once: true }
  );

  const cardRow = qs('#cardRow', collect);

  // Favorites fetch once
  axios
    .get(`${API}favorites?_expand=post&userId=${encodeURIComponent(userId)}`)
    .then((res) => {
      const items = Array.isArray(res.data) ? res.data : [];
      if (!cardRow) return;

      cardRow.innerHTML = items
        .map((it) => {
          const p = it.post;
          if (!p) return '';
          return `
            <div class="col-lg-4 col-md-6">
              <div class="card card1" style="width: 350px; height: 450px;" data-post-id="${escapeHtml(
                p.id
              )}">
                <img src="${escapeHtml(p.imgUrl)}" style="width: 350px; height: 400px;" class="object-fit-cover bg-cover" loading="lazy" alt="favorite">
                <div class="card-body dontmove"></div>
              </div>
            </div>`;
        })
        .join('');

      // Delegate clicks
      cardRow.onclick = (e) => {
        const target = e.target;
        if (!(target instanceof Element)) return;
        const card = target.closest('.card1');
        if (!card) return;
        const pid = card.getAttribute('data-post-id')?.trim();
        if (pid) window.location.href = `${LOCAL}/information.html?postId=${encodeURIComponent(pid)}`;
      };
    })
    .catch((err) => {
      console.error('favorites fetch failed:', err);
      if (cardRow) cardRow.innerHTML = `<div class="alert alert-danger">收藏載入失敗，請稍後再試</div>`;
    });
}

/* ----------------------------- Calendar Rendering ----------------------------- */

function clearCalendarCells() {
  // Avoid repeated DOM writes: only set when needed
  for (let i = 0; i < tdList.length; i++) {
    tdList[i].classList.remove('go');
    tdList[i].innerHTML = '　';
  }
  const current = document.getElementById('current-day');
  if (current) current.removeAttribute('id');
}

function renderCalendar() {
  if (!monthsEl) return;

  clearCalendarCells();

  const month = viewMonthIndex; // 0-11
  const year = viewYear;

  const firstDay = firstWeekday(year, month); // 1..7
  const dim = daysInMonth(year, month);

  // Fill day numbers / icons
  for (let day = 1; day <= dim; day++) {
    const index = firstDay + day - 2; // align with your original logic
    if (index < 0 || index >= tdList.length) continue;

    const key = `${month + 1}/${day}`;

    // base number
    tdList[index].innerHTML = String(day);

    // overlay icons based on server state
    if (selectableDates.has(key)) {
      tdList[index].innerHTML =
        '<i class="bi bi-calendar2-check-fill d-flex justify-content-center text-info"></i>';
    }
    if (blockedDates.has(key)) {
      tdList[index].innerHTML =
        '<i class="bi bi-calendar-x-fill d-flex justify-content-center text-danger"></i>';
    }

    // Selected (user click) overrides to check icon
    if (selectedDates.has(key)) {
      tdList[index].classList.add('go');
      tdList[index].innerHTML =
        '<i class="bi bi-calendar2-check-fill text-info d-flex justify-content-center"></i>';
    }

    // cache original cell content for toggle
    originalCellContent[index] = tdList[index].innerHTML;

    // mark today only if viewing current month/year
    if (year === currentYear && month === currentMonthIndex && day === currentDay) {
      tdList[index].setAttribute('id', 'current-day');
    }
  }

  monthsEl.innerHTML = `<strong class="fs-2" id="months">${year}-${month + 1}月</strong>`;
}

function toggleDateSelection(cellIndex) {
  const cell = tdList[cellIndex];
  if (!cell) return;

  // Determine day number:
  // - If cell contains number text, use it.
  // - If it contains icon, it might have no number; ignore clicks on non-date cells.
  const text = cell.textContent?.trim();
  const day = parseInt(text || '', 10);
  if (!Number.isFinite(day) || day <= 0) return;

  const key = `${viewMonthIndex + 1}/${day}`;

  // If blocked date, do not allow toggling (optional; matches typical UX)
  if (blockedDates.has(key)) return;

  if (selectedDates.has(key)) {
    selectedDates.delete(key);
    cell.classList.remove('go');
    // revert to server state icon/number
    cell.innerHTML = originalCellContent[cellIndex];
  } else {
    selectedDates.add(key);
    cell.classList.add('go');
    cell.innerHTML = '<i class="bi bi-calendar2-check-fill text-info d-flex justify-content-center"></i>';
  }
}

/* ----------------------------- Reservation / Tabs ----------------------------- */

function showPostsView() {
  personalMain?.classList.remove('d-none');
  reserve?.classList.add('d-none');
  noopen?.classList.add('d-none');
  nopost?.classList.add('d-none');
}

function showReserveView(isOpen) {
  if (isOpen) {
    reserve?.classList.remove('d-none');
    personalMain?.classList.add('d-none');
    noopen?.classList.add('d-none');
    nopost?.classList.add('d-none');
  } else {
    noopen?.classList.remove('d-none');
    personalMain?.classList.add('d-none');
    reserve?.classList.add('d-none');
    nopost?.classList.add('d-none');
  }
}

function bindTabsOnce(isOpenProvider) {
  // Bind once only; no per-state duplicate listeners
  thumbLinks.forEach((link) => {
    if (link.__bound) return;
    link.__bound = true;

    link.addEventListener('click', (event) => {
      event.preventDefault();

      // active class toggle
      thumbLinks.forEach((l) => l.querySelector('.thumb')?.classList.remove('active'));
      link.querySelector('.thumb')?.classList.add('active');

      const text = link.querySelector('.thumb')?.textContent?.trim();
      if (text === '貼文總覽') {
        showPostsView();
      } else {
        showReserveView(Boolean(isOpenProvider()));
      }
    });
  });
}

/* ----------------------------- Data Fetching / Init ----------------------------- */

async function init() {
  if (!storedToken || !userId) {
    // not logged in: you can redirect or show a message
    console.warn('Not logged in');
    return;
  }

  try {
    // Fetch user + posts + personal in parallel (faster)
    const [userRes, postsRes, personalRes] = await Promise.all([
      axios.get(`${API}640/users?id=${encodeURIComponent(userId)}`, {
        headers: { authorization: `Bearer ${storedToken}` },
      }),
      axios.get(`${API}440/posts?userId=${encodeURIComponent(userId)}`, {
        headers: { authorization: `Bearer ${storedToken}` },
      }),
      axios.get(`${API}personal?userId=${encodeURIComponent(userId)}`),
    ]);

    const user = userRes.data?.[0];
    const myPosts = Array.isArray(postsRes.data) ? postsRes.data : [];
    const personalArr = Array.isArray(personalRes.data) ? personalRes.data : [];

    if (user) {
      renderProfile(user);

      // Bind "我的收藏" button once (event delegation could also be used)
      const reserveBtn = qs('#reservebtn');
      reserveBtn?.addEventListener(
        'click',
        () => {
          showCollectView(user);
        },
        { once: true }
      );
    }

    // Posts section
    const page = getPageFromUrl();
    if (myPosts.length > 0) {
      nopost?.classList.add('d-none');
      renderPostWall(otherspostEl, myPosts, page);
    } else {
      nopost?.classList.remove('d-none');
      collect?.classList.add('d-none');
      noopen?.classList.add('d-none');
    }

    // Personal reservation section
    personalData = personalArr[0] || null;
    const isOpen = Boolean(personalData?.isopen);

    // Bind tabs once with live isOpen state
    bindTabsOnce(() => Boolean(personalData?.isopen));

    if (!personalData) {
      // If no personal record exists, treat as closed
      showReserveView(false);
      return;
    }

    // Fill placeholders (no repeated stringifying)
    const [startHour, startMinute, endHour, endMinute] = String(personalData.oktime || '00:00~00:00').split(/[~:]/);
    p1.placeholder = String(personalData.pos1 ?? '').replaceAll('"', '');
    p2.placeholder = String(personalData.pos2 ?? '').replaceAll('"', '');
    p3.placeholder = String(personalData.pos3 ?? '').replaceAll('"', '');
    p4.placeholder = String(personalData.pos4 ?? '').replaceAll('"', '');
    t1.placeholder = startHour ?? '';
    m1.placeholder = startMinute ?? '';
    t2.placeholder = endHour ?? '';
    m2.placeholder = endMinute ?? '';

    // Build sets for O(1) lookup
    selectableDates = new Set((personalData.okday || []).map(String));
    blockedDates = new Set((personalData.otherdate || []).map(String));
    selectedDates = new Set(); // fresh selection per session

    // Initial calendar render
    viewYear = today.getFullYear();
    viewMonthIndex = today.getMonth();
    renderCalendar();

    // Calendar navigation: bind once
    if (leftBtn && !leftBtn.__bound) {
      leftBtn.__bound = true;
      leftBtn.addEventListener('click', () => {
        if (viewMonthIndex > 0) viewMonthIndex -= 1;
        else {
          viewMonthIndex = 11;
          viewYear -= 1;
        }
        renderCalendar();
      });
    }

    if (rightBtn && !rightBtn.__bound) {
      rightBtn.__bound = true;
      rightBtn.addEventListener('click', () => {
        if (viewMonthIndex < 11) viewMonthIndex += 1;
        else {
          viewMonthIndex = 0;
          viewYear += 1;
        }
        renderCalendar();
      });
    }

    // Calendar cell click: single delegated handler
    if (!tdList.__bound) {
      tdList.__bound = true;
      tdList.forEach((cell, idx) => {
        cell.addEventListener('click', () => toggleDateSelection(idx));
      });
    }

    // Setting patch: bind once
    if (settingBtn && !settingBtn.__bound) {
      settingBtn.__bound = true;
      settingBtn.addEventListener('click', async () => {
        const dataid = personalData.id;
        if (!dataid) return;

        const t1Value = t1.value || t1.placeholder;
        const m1Value = m1.value || m1.placeholder;
        const t2Value = t2.value || t2.placeholder;
        const m2Value = m2.value || m2.placeholder;

        const pos1 = p1.value || p1.placeholder;
        const pos2 = p2.value || p2.placeholder;
        const pos3 = p3.value || p3.placeholder;
        const pos4 = p4.value || p4.placeholder;

        const oktim = `${t1Value}:${m1Value}~${t2Value}:${m2Value}`;

        // Merge: keep existing okday plus newly selected, or overwrite entirely?
        // Original code overwrote with `dates` only. We'll overwrite with selectedDates only (same behavior).
        const okday = Array.from(selectedDates);

        try {
          await axios.patch(`${API}personal/${dataid}`, {
            pos1,
            pos2,
            pos3,
            pos4,
            okday,
            oktime: oktim,
          });

          // Update local cache & sets to reflect saved state
          personalData.pos1 = pos1;
          personalData.pos2 = pos2;
          personalData.pos3 = pos3;
          personalData.pos4 = pos4;
          personalData.oktime = oktim;
          personalData.okday = okday;

          selectableDates = new Set(okday);
          selectedDates.clear();
          renderCalendar();
        } catch (err) {
          console.error('patch personal failed:', err);
          alert('儲存失敗，請稍後再試');
        }
      });
    }

    // Close reservation: bind once
    if (closeBtn && !closeBtn.__bound) {
      closeBtn.__bound = true;
      closeBtn.addEventListener('click', async () => {
        const dataid = personalData.id;
        if (!dataid) return;

        try {
          await axios.patch(`${API}personal/${dataid}`, { isopen: false });
          personalData.isopen = false;
          showReserveView(false);
        } catch (err) {
          console.error('close reservation failed:', err);
          alert('關閉失敗，請稍後再試');
        }
      });
    }

    // Open reservation: bind once
    if (openBtn && !openBtn.__bound) {
      openBtn.__bound = true;
      openBtn.addEventListener('click', async () => {
        const dataid = personalData.id;
        if (!dataid) return;

        try {
          await axios.patch(`${API}personal/${dataid}`, { isopen: true });
          personalData.isopen = true;
          showReserveView(true);
          renderCalendar();
        } catch (err) {
          console.error('open reservation failed:', err);
          alert('開啟失敗，請稍後再試');
        }
      });
    }

    // Initial view based on isopen
    showPostsView();
    // Reserve view toggled when user clicks tab; keep initial as posts like your original
    if (!isOpen) {
      // noopen is shown only when user clicks reserve tab; keep hidden now
      noopen?.classList.add('d-none');
    }
  } catch (err) {
    console.error('Init failed:', err);
  }
}

init();
