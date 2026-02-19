import{a as m,b as f,c as s}from"./main-397cca7a.js";const b=document.querySelector(".posterNickName"),v=document.querySelector(".posterIntroduce"),x=document.querySelector(".outfitStyle");document.querySelector(".brands");const $=document.querySelector(".postImg"),w=document.querySelector(".postTitle"),S=document.querySelector(".postContent"),k=document.querySelector(".posterInfo"),d=document.querySelector(".posterMore"),q=document.querySelector(".posterOther"),L=new bootstrap.Modal(document.getElementById("myModa2")),I=document.querySelector(".likecount"),M=document.querySelector(".collectcount");document.querySelector(".like");document.querySelector(".favorite");function y(t){const a=document.cookie.split(";").map(n=>n.trim());for(const n of a){const[c,i]=n.split("=");if(c===t)return decodeURIComponent(i)}return null}const T=y("outfitpalsId"),r=y("outfitpalsToken"),H=location.href.split("=")[1];m.get(`${f}posts/${H}?_expand=user`).then(t=>{let a=t.data.user.id;b.textContent=t.data.user.name,v.textContent=t.data.user.introduce,k.innerHTML=`<p class="posts__user__height ps-3 fs-9 fs-lg-7">${t.data.user.height}cm ${t.data.user.weight}kg</p>`,x.textContent=t.data.outfitStyle,$.innerHTML=`<img src=${t.data.imgUrl} style="width: 500px; height: 440px;"
            class="postImg object-fit-cover">`,w.textContent=t.data.title,S.textContent=t.data.body,d.innerHTML=`<button type="button" class=" btn btn-primary fs-3 arrowBtn2">看更多${t.data.user.name}的穿搭</button>`,q.innerHTML=`<h2 class="text-center ">查看${t.data.user.name}的其他搭配</h2>`,I.innerHTML=`${t.data.likeCounts}`,M.innerHTML=`${t.data.favoriteCounts}`;const n=document.querySelector(".sty"),c=t.data.brands.split(new RegExp("[ \b]"));c.length<2?n.innerHTML=` <p class="fs-3 d-flex justify-content-center ms-3">服飾品牌</p>
                   <div class="d-flex justify-content-center">
                       <button type="button" class="btn btn-primary btn-pill  ms-3">${c[0]}</button>
                   </div>`:n.innerHTML=` <p class="fs-3 d-flex justify-content-center ms-3">服飾品牌</p>
                   <div class="d-flex justify-content-center">
                       <button type="button" class="btn btn-primary btn-pill ms-3">${c[0]}</button>
                   </div>        
                   <button type="button" class="btn btn-primary btn-pill mt-3 ms-3">${c[1]}</button>`;let i=t.data.userId;const u=document.querySelector(".reserve");r!==""||r!==null?u.addEventListener("click",function(){T!=i?window.location.href=`${s}/others.html?userId=`+i+"&page=1":window.location.href=`${s}/personal.html?page=1`}):u.addEventListener("click",function(){L.show()}),r!==""||r!==null?d.addEventListener("click",function(){window.location.href=`${s}/others.html?userId=`+i+"&page=1"}):d.addEventListener("click",function(){window.location.href=`${s}/member.html`});const h=document.querySelector(".more");h.innerHTML=`
                                    <div class="container d-flex justify-content-center  ">
                                        <div class=" post row justify-content-around ">

                                        </div>
                                    </div>
                                
                                `,m.get(`${f}posts?userId=${a}`).then(o=>{const l=document.querySelector(".post");if(o.data.length==1)for(let e=0;e<1;e++)l.innerHTML+=`<div class="col-4 my-4">
                                                            <a  >
                                                                <div class="card card1" style="width: 350px; height: 450px;" id="${o.data[e].id}">
                                                                    <img src="${o.data[e].imgUrl}" style="width: 350px; height: 450px;" class="object-fit-cover img">
                                                                </div>
                                                            </a>
                                                        </div>`;else if(o.data.length==2)for(let e=0;e<2;e++)l.innerHTML+=`<div class="col-4 my-4">
                                                            <a  >
                                                                <div class="card card1" style="width: 350px; height: 450px;" id="${o.data[e].id}">
                                                                    <img src="${o.data[e].imgUrl}" style="width: 350px; height: 450px;" class="object-fit-cover img">
                                                                </div>
                                                            </a>
                                                        </div>`;else for(let e=0;e<3;e++)l.innerHTML+=`<div class="col-4 my-4">
                                                            <a  >
                                                                <div class="card card1" style="width: 350px; height: 450px;" id="${o.data[e].id}">
                                                                    <img src="${o.data[e].imgUrl}" style="width: 350px; height: 450px;" class="object-fit-cover img">
                                                                </div>
                                                            </a>
                                                        </div>`;document.querySelectorAll(".card1").forEach(function(e,j){let g=e.getAttribute("id").trim();e.addEventListener("click",function(p){p.stopPropagation(),p.preventDefault(),window.location.href=`${s}/information.html?postId=`+g})})})});
