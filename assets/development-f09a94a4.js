import{b as R,a as f,c as T}from"./main-397cca7a.js";function N(e){const t=document.cookie.split(";").map(a=>a.trim());for(const a of t){const[n,i]=a.split("=");if(n===e)return decodeURIComponent(i??"")}return null}function U(){const e=new URLSearchParams(window.location.search),t=parseInt(e.get("page")||"1",10);return Number.isFinite(t)&&t>0?t:1}function A(e){const t=new URLSearchParams(window.location.search);t.set("page",String(e));const a=`${window.location.origin}${window.location.pathname}?${t.toString()}`;window.history.replaceState({},document.title,a)}function p(e){return String(e??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function q(e){return e.endsWith("/")?e:`${e}/`}const g=q(R),S=T;N("outfitpalsToken");const b=N("outfitpalsId"),$=9,x=100;let w=[],h=new Set,v=new Set,M=new Map;const s=document.querySelector(".post");s||console.error("Missing .post container");function F(){s&&(s.innerHTML=`
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
  `)}function H(){return[s==null?void 0:s.querySelector(".post1"),s==null?void 0:s.querySelector(".post2"),s==null?void 0:s.querySelector(".post3")].filter(Boolean)}function O(e){const t=e.imgUrl||"",a=e.user||{},n=a.image||"",i=a.name||"",o=a.height??"",r=a.weight??"",d=e.userId??"",c=e.id??"",u=h.has(Number(c)),l=v.has(Number(c)),m=u?"bi-bookmark-fill icollect":"bi-bookmark",E=l?"bi-heart-fill ilove":"bi-heart";return`
    <div class="col-4">
      <div class="card card1" style="width: 350px; height: 450px;" data-post-id="${p(c)}" data-user-id="${p(d)}">
        <img
          src="${p(t)}"
          style="width: 350px; height: 350px;"
          class="object-fit-cover img"
          loading="lazy"
          alt="post"
          data-action="open-post"
        />
        <div class="card-body dontmove" id="${p(c)}">
          <div class="row">
            <div class="col-8 mt-2 d-flex">
              <div
                class="circle-box others"
                style="width: 50px; height: 50px; background: url('${p(n)}') center center / cover no-repeat;"
                data-action="open-user"
                data-user-id="${p(d)}"
                role="button"
                aria-label="open user"
              ></div>
              <div class="ms-2">
                <strong>${p(i)}</strong>
                <p class="fs-6 text-nowrap" style="opacity: 0.4;">${p(o)}cm ${p(r)}kg</p>
              </div>
            </div>

            <div class="col-1 icon2">
              <p
                class="bi display-6 mt-2 me-3 love ${E}"
                style="position: relative; top: 2px;"
                data-action="toggle-like"
                aria-label="toggle like"
                role="button"
              ></p>
            </div>

            <div class="col-1 ms-3 icon">
              <p
                class="bi display-6 mt-2 collect ${m}"
                data-action="toggle-favorite"
                aria-label="toggle favorite"
                role="button"
              ></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `}function C(e){if(!s)return;const t=H();t.forEach(o=>o.innerHTML="");const a=(e-1)*$,n=w.slice(a,a+$);[n.slice(0,3),n.slice(3,6),n.slice(6,9)].forEach((o,r)=>{const d=t[r];d&&(d.innerHTML=o.map(O).join(""))})}function P(e){if(!s)return;const t=s.querySelector(".page");if(!t)return;const a=Math.min(x,Math.ceil(w.length/$));if(a<=0){t.innerHTML="";return}t.innerHTML=Array.from({length:a},(n,i)=>{const o=i+1;return`<li class="page-item ${o===e?"active":""}"><a href="#" class="page-link border-0" data-action="goto-page" data-page="${o}">${o}</a></li>`}).join("")}async function j(){const e=await f.get(`${g}posts?_expand=user`);return Array.isArray(e.data)?e.data:[]}async function I(e){if(!e)return{favorites:new Set,likes:new Set};const[t,a]=await Promise.all([f.get(`${g}favorites?userId=${encodeURIComponent(e)}`),f.get(`${g}likes?userId=${encodeURIComponent(e)}`)]),n=new Set((t.data||[]).map(o=>Number(o.postId))),i=new Set((a.data||[]).map(o=>Number(o.postId)));return{favorites:n,likes:i}}const k=new Set;function L(e,{onClasses:t,offClasses:a},n){[...t,...a].forEach(i=>e.classList.remove(i)),(n?t:a).forEach(i=>e.classList.add(i))}async function _(e){var i,o;if(!b){alert("請先登入才能收藏");return}const t=`fav:${e}`;if(k.has(t))return;k.add(t);const n=!h.has(e);n?h.add(e):h.delete(e),y(e);try{const r=M.get(e),d=Number((r==null?void 0:r.favoriteCounts)??0),c=Math.max(0,d+(n?1:-1));if(await f.patch(`${g}posts/${e}`,{favoriteCounts:c}),n)await f.post(`${g}favorites`,{userId:Number(b),postId:Number(e)});else{const l=(o=(i=(await f.get(`${g}favorites?postId=${e}&userId=${b}`)).data)==null?void 0:i[0])==null?void 0:o.id;l!=null&&await f.delete(`${g}favorites/${l}`)}r&&(r.favoriteCounts=c)}catch(r){console.error("toggleFavorite failed:",r),n?h.delete(e):h.add(e),y(e),alert("收藏更新失敗，請稍後再試")}finally{k.delete(t)}}async function B(e){var i,o;if(!b){alert("請先登入才能按讚");return}const t=`like:${e}`;if(k.has(t))return;k.add(t);const n=!v.has(e);n?v.add(e):v.delete(e),y(e);try{const r=M.get(e),d=Number((r==null?void 0:r.likeCounts)??0),c=Math.max(0,d+(n?1:-1));if(await f.patch(`${g}posts/${e}`,{likeCounts:c}),n)await f.post(`${g}likes`,{userId:Number(b),postId:Number(e)});else{const l=(o=(i=(await f.get(`${g}likes?postId=${e}&userId=${b}`)).data)==null?void 0:i[0])==null?void 0:o.id;l!=null&&await f.delete(`${g}likes/${l}`)}r&&(r.likeCounts=c)}catch(r){console.error("toggleLike failed:",r),n?v.delete(e):v.add(e),y(e),alert("按讚更新失敗，請稍後再試")}finally{k.delete(t)}}function y(e){if(!s)return;const t=s.querySelector(`.card1[data-post-id="${CSS.escape(String(e))}"]`);if(!t)return;const a=t.querySelector('[data-action="toggle-favorite"]'),n=t.querySelector('[data-action="toggle-like"]');if(a){const i=h.has(Number(e));L(a,{onClasses:["bi-bookmark-fill","icollect"],offClasses:["bi-bookmark"]},i)}if(n){const i=v.has(Number(e));L(n,{onClasses:["bi-heart-fill","ilove"],offClasses:["bi-heart"]},i)}}function G(e){var d,c;const t=e.target;if(!(t instanceof Element))return;const a=t.closest("[data-action]");if(!a)return;e.preventDefault(),e.stopPropagation();const n=a.getAttribute("data-action");if(n==="prev"||n==="next"){const u=Math.min(x,Math.ceil(w.length/$)),l=U(),m=n==="next"?Math.min(u,l+1):Math.max(1,l-1);m!==l&&(A(m),C(m),P(m));return}if(n==="goto-page"){const u=parseInt(a.getAttribute("data-page")||"1",10),l=Math.min(x,Math.ceil(w.length/$)),m=Math.min(l,Math.max(1,u));A(m),C(m),P(m);return}const i=a.closest(".card1"),o=Number(i==null?void 0:i.getAttribute("data-post-id")),r=(d=i==null?void 0:i.getAttribute("data-user-id"))==null?void 0:d.trim();if(Number.isFinite(o)){if(n==="toggle-favorite"){_(o);return}if(n==="toggle-like"){B(o);return}if(n==="open-user"){const u=((c=a.getAttribute("data-user-id"))==null?void 0:c.trim())||r;if(!u)return;String(u)!==String(b)?window.location.href=`${S}/others.html?userId=${encodeURIComponent(u)}&page=1`:window.location.href=`${S}/personal.html?page=1`;return}if(n==="open-post"){window.location.href=`${S}/information.html?postId=${encodeURIComponent(String(o))}`;return}}}async function z(){if(s){F(),s.addEventListener("click",G,{passive:!1});try{const[e,t]=await Promise.all([j(),I(b)]);w=e,M=new Map(w.map(n=>[Number(n.id),n])),h=t.favorites,v=t.likes;const a=U();C(a),P(a)}catch(e){console.error("init failed:",e),s.innerHTML='<div class="alert alert-danger">載入失敗，請稍後再試</div>'}}}z();
