import axios from 'axios';
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
  // Convert Sunday(0) to 7 to match your table starting from Mon
  let d = new Date(year, monthIndex, 1).getDay();
  return d === 0 ? 7 : d;
}

/* ----------------------------- UI State ----------------------------- */

let personalData = null; // /personal record
let selectableDates = new Set(); // okday as "M/D"
let blockedDates = new Set(); // otherdate as "M/D"
let selectedDates = new Set(); // user clicks (to save)

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
          <li class="page-item"><a href="#" class="page-link border-0" data-action="prev"><i class="bi bi-chevron-left"></i></a></li>
          <div class="page d-flex"></div>
          <li class="page-item"><a href="#" class="page-link border-0" data-action="next"><i class="bi bi-chevron-right"></i></a></li>
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
      pageEl.innerHTML += `
        <li class="page-item ${i === safePage ? 'active' : ''}">
          <a href="#" class="page-link border-0" data-action="goto" data-page="${i}">${i}</a>
        </li>`;
    }
  }

  // Delegate once (overwrite OK because we re-render whole wall anyway)
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

      if (action === 'prev') current = Math.max(1, current - 1);
      else if (action === 'next') current = Math.min(total || 1, current + 1);
      else if (action === 'goto') {
        current = parseInt(actionEl.getAttribute('data-page') || '1', 10);
        current = Math.min(total || 1, Math.max(1, current));
      } else return;

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

  qs('#goback', collect)?.addEventListener(
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
  if (!cardRow) return;

  cardRow.innerHTML = `<div class="text-center my-5">載入收藏中...</div>`;
  // Favorites fetch once
  axios
    .get(`${API}favorites?_expand=post&userId=${encodeURIComponent(userId)}`)
    .then((res) => {
      const items = Array.isArray(res.data) ? res.data : [];
      if (items.length === 0) {
        cardRow.innerHTML = `<div class="text-center my-5">目前沒有收藏</div>`;
        return;
      }

      cardRow.innerHTML = items
        .map((it) => {
          const p = it.post;
          if (!p) return '';
          return `
            <div class="col-lg-4 col-md-6">
              <div class="card card1" style="width: 350px; height: 450px;" data-post-id="${escapeHtml(p.id)}">
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
      cardRow.innerHTML = `<div class="alert alert-danger">收藏載入失敗，請稍後再試</div>`;
    });
}

/* ----------------------------- Calendar Rendering ----------------------------- */

let calendarBound = false;
let navBound = false;

function clearCalendarCells() {
  for (let i = 0; i < tdList.length; i++) {
    const td = tdList[i];
    td.classList.remove('go');
    td.removeAttribute('data-day');
    td.innerHTML = '　';
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
    const index = firstDay + day - 2; // align with your original
    if (index < 0 || index >= tdList.length) continue;

    const key = `${month + 1}/${day}`;
    const td = tdList[index];

    td.setAttribute('data-day', String(day));

    // baseline number
    let html = String(day);

    // server state icons
    if (selectableDates.has(key)) {
      html = '<i class="bi bi-calendar2-check-fill d-flex justify-content-center text-info"></i>';
    }
    if (blockedDates.has(key)) {
      html = '<i class="bi bi-calendar-x-fill d-flex justify-content-center text-danger"></i>';
    }

    // user selected (overrides)
    if (selectedDates.has(key)) {
      td.classList.add('go');
      html = '<i class="bi bi-calendar2-check-fill text-info d-flex justify-content-center"></i>';
    }

    td.innerHTML = html;

    // mark today
    if (year === currentYear && month === currentMonthIndex && day === currentDay) {
      td.setAttribute('id', 'current-day');
    }
  }

  monthsEl.innerHTML = `<strong class="fs-2" id="months">${year}-${month + 1}月</strong>`;
}

function toggleDateSelectionByCell(cell) {
  if (!cell) return;

  const dayStr = cell.getAttribute('data-day');
  const day = parseInt(dayStr || '', 10);
  if (!Number.isFinite(day) || day <= 0) return;

  const key = `${viewMonthIndex + 1}/${day}`;

  // blocked not selectable
  if (blockedDates.has(key)) return;

  if (selectedDates.has(key)) {
    selectedDates.delete(key);
  } else {
    selectedDates.add(key);
  }
  renderCalendar();
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
  thumbLinks.forEach((link) => {
    if (link.dataset.bound === '1') return;
    link.dataset.bound = '1';

    link.addEventListener('click', (event) => {
      event.preventDefault();
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
    console.warn('Not logged in');
    return;
  }

  try {
    // parallel fetch
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
      qs('#reservebtn')?.addEventListener(
        'click',
        () => {
          showCollectView(user);
        },
        { once: true }
      );
    }

    // posts
    const page = getPageFromUrl();
    if (myPosts.length > 0) {
      nopost?.classList.add('d-none');
      renderPostWall(otherspostEl, myPosts, page);
    } else {
      nopost?.classList.remove('d-none');
      collect?.classList.add('d-none');
      noopen?.classList.add('d-none');
    }

    // personal
    personalData = personalArr[0] || null;

    // tabs bind once
    bindTabsOnce(() => Boolean(personalData?.isopen));

    if (!personalData) {
      // no personal record => closed
      showPostsView();
      return;
    }

    // placeholders
    const [startHour, startMinute, endHour, endMinute] = String(personalData.oktime || '00:00~00:00').split(/[~:]/);

    if (p1) p1.placeholder = String(personalData.pos1 ?? '');
    if (p2) p2.placeholder = String(personalData.pos2 ?? '');
    if (p3) p3.placeholder = String(personalData.pos3 ?? '');
    if (p4) p4.placeholder = String(personalData.pos4 ?? '');

    if (t1) t1.placeholder = startHour ?? '';
    if (m1) m1.placeholder = startMinute ?? '';
    if (t2) t2.placeholder = endHour ?? '';
    if (m2) m2.placeholder = endMinute ?? '';

    selectableDates = new Set((personalData.okday || []).map(String));
    blockedDates = new Set((personalData.otherdate || []).map(String));
    selectedDates = new Set();

    // initial render calendar
    viewYear = today.getFullYear();
    viewMonthIndex = today.getMonth();
    renderCalendar();

    // calendar navigation bind once
    if (!navBound) {
      navBound = true;

      leftBtn?.addEventListener('click', () => {
        if (viewMonthIndex > 0) viewMonthIndex -= 1;
        else {
          viewMonthIndex = 11;
          viewYear -= 1;
        }
        renderCalendar();
      });

      rightBtn?.addEventListener('click', () => {
        if (viewMonthIndex < 11) viewMonthIndex += 1;
        else {
          viewMonthIndex = 0;
          viewYear += 1;
        }
        renderCalendar();
      });
    }

    // calendar click bind once (delegation)
    if (!calendarBound) {
      calendarBound = true;

      // Delegate on table body (or document) to avoid 35 listeners
      const table = qs('table');
      table?.addEventListener('click', (e) => {
        const target = e.target;
        if (!(target instanceof Element)) return;

        const td = target.closest('td');
        if (!td) return;
        toggleDateSelectionByCell(td);
      });
    }

    // save patch bind once
    if (settingBtn && settingBtn.dataset.bound !== '1') {
      settingBtn.dataset.bound = '1';

      settingBtn.addEventListener('click', async () => {
        const dataid = personalData?.id;
        if (!dataid) return;

        const t1Value = (t1?.value || t1?.placeholder || '').trim();
        const m1Value = (m1?.value || m1?.placeholder || '').trim();
        const t2Value = (t2?.value || t2?.placeholder || '').trim();
        const m2Value = (m2?.value || m2?.placeholder || '').trim();

        const pos1 = (p1?.value || p1?.placeholder || '').trim();
        const pos2 = (p2?.value || p2?.placeholder || '').trim();
        const pos3 = (p3?.value || p3?.placeholder || '').trim();
        const pos4 = (p4?.value || p4?.placeholder || '').trim();

        const oktime = `${t1Value}:${m1Value}~${t2Value}:${m2Value}`;

        const okday = Array.from(selectedDates);

        try {
          await axios.patch(`${API}personal/${dataid}`, {
            pos1,
            pos2,
            pos3,
            pos4,
            okday,
            oktime,
          });

          // update cache
          personalData.pos1 = pos1;
          personalData.pos2 = pos2;
          personalData.pos3 = pos3;
          personalData.pos4 = pos4;
          personalData.oktime = oktime;
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

    // close reservation bind once
    if (closeBtn && closeBtn.dataset.bound !== '1') {
      closeBtn.dataset.bound = '1';
      closeBtn.addEventListener('click', async () => {
        const dataid = personalData?.id;
        if (!dataid) return;

        try {
          await axios.patch(`${API}personal/${dataid}`, { isopen: false });
          personalData.isopen = false;
          // 只在切到預約資訊 tab 時顯示 noopen；這裡不 reload
          showReserveView(false);
        } catch (err) {
          console.error('close reservation failed:', err);
          alert('關閉失敗，請稍後再試');
        }
      });
    }

    // open reservation bind once
    if (openBtn && openBtn.dataset.bound !== '1') {
      openBtn.dataset.bound = '1';
      openBtn.addEventListener('click', async () => {
        const dataid = personalData?.id;
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

    // initial view (same as your original: default show posts)
    showPostsView();
  } catch (err) {
    console.error('Init failed:', err);
  }
}

init();
