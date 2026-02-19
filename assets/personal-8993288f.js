import{a as E,b as Z,c as wt}from"./main-397cca7a.js";const R=Z.endsWith("/")?Z:`${Z}/`,vt=wt;function ht(t){const e=document.cookie.split(";").map(n=>n.trim());for(const n of e){const[c,o]=n.split("=");if(c===t)return decodeURIComponent(o??"")}return null}function s(t,e=document){return e.querySelector(t)}function gt(t,e=document){return Array.from(e.querySelectorAll(t))}function u(t){return String(t??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function yt(){const t=new URLSearchParams(window.location.search),e=parseInt(t.get("page")||"1",10);return Number.isFinite(e)&&e>0?e:1}function xt(t){const e=new URLSearchParams(window.location.search);e.set("page",String(t));const n=`${window.location.origin}${window.location.pathname}?${e.toString()}`;window.history.replaceState({},document.title,n)}const tt=ht("outfitpalsToken"),N=ht("outfitpalsId"),dt=gt(".thumb-link"),m=s("#personalmain"),g=s("#reserve"),B=s("#personalnav"),q=s("#personalselect"),w=s("#collect"),p=s("#noopen"),l=s("#nopost"),O=s(".setting"),et=s("#left"),nt=s("#right"),ut=s("#months"),W=s("#open"),G=s(".close"),$=s(".p1"),k=s(".p2"),S=s(".p3"),A=s(".p4"),M=s(".t1"),I=s(".m1"),T=s(".t2"),P=s(".m2"),st=s(".personal"),$t=s(".otherspost"),K=gt("td"),U=new Date;let J=U.getFullYear(),L=U.getMonth();const kt=U.getMonth(),St=U.getFullYear(),At=U.getDate();function Mt(t){return t%4===0&&t%100!==0||t%400===0}function It(t,e){return[31,Mt(t)?29:28,31,30,31,30,31,31,30,31,30,31][e]}function Tt(t,e){let n=new Date(t,e,1).getDay();return n===0?7:n}let i=null,it=new Set,ct=new Set,C=new Set;function Pt(t){if(!st)return;st.innerHTML=`
    <div class="col-2 d-flex">
      <div class="circle-box" style="width: 150px; height: 150px;background: url('${u(t.image)}') center center / cover no-repeat;"></div>
    </div>

    <div class="col-6 d-flex">
      <div class="d-flex position-relative">
        <div class="ms-2">
          <div class="row ms-5 align-items-center">
            <div class="col">
              <strong class="display-6 text-nowrap">${u(t.name)}</strong>
            </div>
            <div class="col">
              <p class="fs-4 mt-3 text-nowrap" style="opacity: 0.4;">${u(t.height)}cm ${u(t.weight)}kg</p>
            </div>
          </div>

          <p class="ms-5 mt-5">${u(t.introduce)}</p>

          <div class="d-flex">
            <p class="ms-5">活動範圍 :</p>
            <p>${u(t.PopArea)}</p>
          </div>

          <div class="d-flex">
            <p class="ms-5">穿搭價位 :</p>
            <p>${u(t["outfit price"])}</p>
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
  `;const e=s(".sty",st),n=String(t.style||"").trim().split(/\s+/).filter(Boolean);e&&(n.length<=1?e.innerHTML=`
        <p class="fs-3 d-flex justify-content-center ms-3">穿衣風格</p>
        <div class="d-flex justify-content-center">
          <button type="button" class="btn btn-primary btn-pill ms-3">${u(n[0]||"")}</button>
        </div>`:e.innerHTML=`
        <p class="fs-3 d-flex justify-content-center ms-3">穿衣風格</p>
        <div class="d-flex justify-content-center">
          <button type="button" class="btn btn-primary btn-pill ms-3">${u(n[0])}</button>
        </div>
        <button type="button" class="btn btn-primary btn-pill mt-3 ms-3">${u(n[1])}</button>`)}const X=9,ft=100;function bt(t,e,n){if(!t)return;t.innerHTML=`
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
  `;const c=s(".post1",t),o=s(".post2",t),d=s(".post3",t),r=s(".page",t),v=Math.min(ft,Math.ceil(e.length/X)),f=Math.min(v||1,Math.max(1,n)),j=(f-1)*X,V=e.slice(j,j+X),F=[V.slice(0,3),V.slice(3,6),V.slice(6,9)],Y=a=>`
    <div class="col-4">
      <div class="card card1" style="width: 350px; height: 450px;" data-post-id="${u(a.id)}">
        <img src="${u(a.imgUrl)}" style="width: 350px; height: 450px;" class="object-fit-cover bg-cover" loading="lazy" alt="post">
      </div>
    </div>`;if(c&&(c.innerHTML=F[0].map(Y).join("")),o&&(o.innerHTML=F[1].map(Y).join("")),d&&(d.innerHTML=F[2].map(Y).join("")),r){r.innerHTML="";for(let a=1;a<=v;a++)r.innerHTML+=`
        <li class="page-item ${a===f?"active":""}">
          <a href="#" class="page-link border-0" data-action="goto" data-page="${a}">${a}</a>
        </li>`}t.onclick=a=>{var _;const y=a.target;if(!(y instanceof Element))return;const x=y.closest("[data-action]"),H=y.closest(".card1");if(x){a.preventDefault();const b=x.getAttribute("data-action"),z=Math.min(ft,Math.ceil(e.length/X));let h=yt();if(b==="prev")h=Math.max(1,h-1);else if(b==="next")h=Math.min(z||1,h+1);else if(b==="goto")h=parseInt(x.getAttribute("data-page")||"1",10),h=Math.min(z||1,Math.max(1,h));else return;xt(h),bt(t,e,h);return}if(H){a.preventDefault();const b=(_=H.getAttribute("data-post-id"))==null?void 0:_.trim();b&&(window.location.href=`${vt}/information.html?postId=${encodeURIComponent(b)}`)}}}function jt(t){var n;if(!w)return;B==null||B.classList.add("d-none"),q==null||q.classList.add("d-none"),g==null||g.classList.add("d-none"),m==null||m.classList.add("d-none"),l==null||l.classList.add("d-none"),p==null||p.classList.add("d-none"),w.classList.remove("d-none"),w.innerHTML=`
    <div class="container">
      <div class="row my-6 align-items-center">
        <div class="col-6 d-flex justify-content-center">
          <div class="d-flex align-items-center">
            <div class="circle-box" style="width: 100px; height: 100px;background: url('${u(t.image)}') center center / cover no-repeat;"></div>
            <strong class="display-6 ms-3 text-nowrap">${u(t.name)}</strong>
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
  `,(n=s("#goback",w))==null||n.addEventListener("click",()=>{w.classList.add("d-none"),B==null||B.classList.remove("d-none"),q==null||q.classList.remove("d-none"),m==null||m.classList.remove("d-none")},{once:!0});const e=s("#cardRow",w);e&&(e.innerHTML='<div class="text-center my-5">載入收藏中...</div>',E.get(`${R}favorites?_expand=post&userId=${encodeURIComponent(N)}`).then(c=>{const o=Array.isArray(c.data)?c.data:[];if(o.length===0){e.innerHTML='<div class="text-center my-5">目前沒有收藏</div>';return}e.innerHTML=o.map(d=>{const r=d.post;return r?`
            <div class="col-lg-4 col-md-6">
              <div class="card card1" style="width: 350px; height: 450px;" data-post-id="${u(r.id)}">
                <img src="${u(r.imgUrl)}" style="width: 350px; height: 400px;" class="object-fit-cover bg-cover" loading="lazy" alt="favorite">
                <div class="card-body dontmove"></div>
              </div>
            </div>`:""}).join(""),e.onclick=d=>{var j;const r=d.target;if(!(r instanceof Element))return;const v=r.closest(".card1");if(!v)return;const f=(j=v.getAttribute("data-post-id"))==null?void 0:j.trim();f&&(window.location.href=`${vt}/information.html?postId=${encodeURIComponent(f)}`)}}).catch(c=>{console.error("favorites fetch failed:",c),e.innerHTML='<div class="alert alert-danger">收藏載入失敗，請稍後再試</div>'}))}let mt=!1,pt=!1;function Ht(){for(let e=0;e<K.length;e++){const n=K[e];n.classList.remove("go"),n.removeAttribute("data-day"),n.innerHTML="　"}const t=document.getElementById("current-day");t&&t.removeAttribute("id")}function D(){if(!ut)return;Ht();const t=L,e=J,n=Tt(e,t),c=It(e,t);for(let o=1;o<=c;o++){const d=n+o-2;if(d<0||d>=K.length)continue;const r=`${t+1}/${o}`,v=K[d];v.setAttribute("data-day",String(o));let f=String(o);it.has(r)&&(f='<i class="bi bi-calendar2-check-fill d-flex justify-content-center text-info"></i>'),ct.has(r)&&(f='<i class="bi bi-calendar-x-fill d-flex justify-content-center text-danger"></i>'),C.has(r)&&(v.classList.add("go"),f='<i class="bi bi-calendar2-check-fill text-info d-flex justify-content-center"></i>'),v.innerHTML=f,e===St&&t===kt&&o===At&&v.setAttribute("id","current-day")}ut.innerHTML=`<strong class="fs-2" id="months">${e}-${t+1}月</strong>`}function Et(t){if(!t)return;const e=t.getAttribute("data-day"),n=parseInt(e||"",10);if(!Number.isFinite(n)||n<=0)return;const c=`${L+1}/${n}`;ct.has(c)||(C.has(c)?C.delete(c):C.add(c),D())}function at(){m==null||m.classList.remove("d-none"),g==null||g.classList.add("d-none"),p==null||p.classList.add("d-none"),l==null||l.classList.add("d-none")}function ot(t){t?(g==null||g.classList.remove("d-none"),m==null||m.classList.add("d-none"),p==null||p.classList.add("d-none"),l==null||l.classList.add("d-none")):(p==null||p.classList.remove("d-none"),m==null||m.classList.add("d-none"),g==null||g.classList.add("d-none"),l==null||l.classList.add("d-none"))}function Rt(t){dt.forEach(e=>{e.dataset.bound!=="1"&&(e.dataset.bound="1",e.addEventListener("click",n=>{var o,d,r;n.preventDefault(),dt.forEach(v=>{var f;return(f=v.querySelector(".thumb"))==null?void 0:f.classList.remove("active")}),(o=e.querySelector(".thumb"))==null||o.classList.add("active"),((r=(d=e.querySelector(".thumb"))==null?void 0:d.textContent)==null?void 0:r.trim())==="貼文總覽"?at():ot(!!t())}))})}async function Ct(){var t,e;if(!tt||!N){console.warn("Not logged in");return}try{const[n,c,o]=await Promise.all([E.get(`${R}640/users?id=${encodeURIComponent(N)}`,{headers:{authorization:`Bearer ${tt}`}}),E.get(`${R}440/posts?userId=${encodeURIComponent(N)}`,{headers:{authorization:`Bearer ${tt}`}}),E.get(`${R}personal?userId=${encodeURIComponent(N)}`)]),d=(t=n.data)==null?void 0:t[0],r=Array.isArray(c.data)?c.data:[],v=Array.isArray(o.data)?o.data:[];d&&(Pt(d),(e=s("#reservebtn"))==null||e.addEventListener("click",()=>{jt(d)},{once:!0}));const f=yt();if(r.length>0?(l==null||l.classList.add("d-none"),bt($t,r,f)):(l==null||l.classList.remove("d-none"),w==null||w.classList.add("d-none"),p==null||p.classList.add("d-none")),i=v[0]||null,Rt(()=>!!(i!=null&&i.isopen)),!i){at();return}const[j,V,F,Y]=String(i.oktime||"00:00~00:00").split(/[~:]/);if($&&($.placeholder=String(i.pos1??"")),k&&(k.placeholder=String(i.pos2??"")),S&&(S.placeholder=String(i.pos3??"")),A&&(A.placeholder=String(i.pos4??"")),M&&(M.placeholder=j??""),I&&(I.placeholder=V??""),T&&(T.placeholder=F??""),P&&(P.placeholder=Y??""),it=new Set((i.okday||[]).map(String)),ct=new Set((i.otherdate||[]).map(String)),C=new Set,J=U.getFullYear(),L=U.getMonth(),D(),pt||(pt=!0,et==null||et.addEventListener("click",()=>{L>0?L-=1:(L=11,J-=1),D()}),nt==null||nt.addEventListener("click",()=>{L<11?L+=1:(L=0,J+=1),D()})),!mt){mt=!0;const a=s("table");a==null||a.addEventListener("click",y=>{const x=y.target;if(!(x instanceof Element))return;const H=x.closest("td");H&&Et(H)})}O&&O.dataset.bound!=="1"&&(O.dataset.bound="1",O.addEventListener("click",async()=>{const a=i==null?void 0:i.id;if(!a)return;const y=((M==null?void 0:M.value)||(M==null?void 0:M.placeholder)||"").trim(),x=((I==null?void 0:I.value)||(I==null?void 0:I.placeholder)||"").trim(),H=((T==null?void 0:T.value)||(T==null?void 0:T.placeholder)||"").trim(),_=((P==null?void 0:P.value)||(P==null?void 0:P.placeholder)||"").trim(),b=(($==null?void 0:$.value)||($==null?void 0:$.placeholder)||"").trim(),z=((k==null?void 0:k.value)||(k==null?void 0:k.placeholder)||"").trim(),h=((S==null?void 0:S.value)||(S==null?void 0:S.placeholder)||"").trim(),rt=((A==null?void 0:A.value)||(A==null?void 0:A.placeholder)||"").trim(),lt=`${y}:${x}~${H}:${_}`,Q=Array.from(C);try{await E.patch(`${R}personal/${a}`,{pos1:b,pos2:z,pos3:h,pos4:rt,okday:Q,oktime:lt}),i.pos1=b,i.pos2=z,i.pos3=h,i.pos4=rt,i.oktime=lt,i.okday=Q,it=new Set(Q),C.clear(),D()}catch(Lt){console.error("patch personal failed:",Lt),alert("儲存失敗，請稍後再試")}})),G&&G.dataset.bound!=="1"&&(G.dataset.bound="1",G.addEventListener("click",async()=>{const a=i==null?void 0:i.id;if(a)try{await E.patch(`${R}personal/${a}`,{isopen:!1}),i.isopen=!1,ot(!1)}catch(y){console.error("close reservation failed:",y),alert("關閉失敗，請稍後再試")}})),W&&W.dataset.bound!=="1"&&(W.dataset.bound="1",W.addEventListener("click",async()=>{const a=i==null?void 0:i.id;if(a)try{await E.patch(`${R}personal/${a}`,{isopen:!0}),i.isopen=!0,ot(!0),D()}catch(y){console.error("open reservation failed:",y),alert("開啟失敗，請稍後再試")}})),at()}catch(n){console.error("Init failed:",n)}}Ct();
