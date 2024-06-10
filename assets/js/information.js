import { localUrl, apiUrl } from './config.js';
//axios
import axios from 'axios';

// https://outfitpals-web-server.onrender.com/
// // https://bftsai.github.io/outfitpals
// const apiUrl='https://outfitpals-web-server.onrender.com/';
// const localUrl='https://bftsai.github.io/outfitpals';
// const apiUrl='http://localhost:3000/';
// const localUrl='http://localhost:5173/outfitpals/pages';


const posterNickName = document.querySelector(".posterNickName");
const posterIntroduce = document.querySelector(".posterIntroduce");
const outfitStyle = document.querySelector(".outfitStyle");
const brands = document.querySelector(".brands");
const postImg = document.querySelector(".postImg");
const postTitle = document.querySelector(".postTitle");
const postContent = document.querySelector(".postContent");
const posterInfo = document.querySelector(".posterInfo");
const posterMore = document.querySelector(".posterMore");
const posterOther = document.querySelector(".posterOther");
const myModa2 = new bootstrap.Modal(document.getElementById('myModa2'));
const likecount = document.querySelector(".likecount")
const collectcount = document.querySelector(".collectcount")
const like = document.querySelector(".like");
const favorite = document.querySelector(".favorite");



function getCookie(name) {  
    const cookies = document.cookie.split(';').map(cookie => cookie.trim());
    for (const cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split('=');
        if (cookieName === name) {
            return decodeURIComponent(cookieValue);
        }
    }

    return null;
}



const userId = getCookie("outfitpalsId");
    const storedToken = getCookie("outfitpalsToken");
    const postrId = location.href.split("=")[1];
        axios.get(`${apiUrl}posts/${postrId}?_expand=user`)
        .then(res => {
            let userid =res.data.user.id
            posterNickName.textContent = res.data.user.name;
            posterIntroduce.textContent = res.data.user.introduce;
            posterInfo.innerHTML = `<p class="posts__user__height ps-3 fs-9 fs-lg-7">${res.data.user.height}cm ${res.data.user.weight}kg</p>`;
            outfitStyle.textContent = res.data.outfitStyle;
            postImg.innerHTML = `<img src=${res.data.imgUrl} style="width: 500px; height: 440px;"
            class="postImg object-fit-cover">`;
            postTitle.textContent = res.data.title;
            postContent.textContent = res.data.body;
            posterMore.innerHTML = `<button type="button" class=" btn btn-primary fs-3 arrowBtn2">看更多${res.data.user.name}的穿搭</button>`
            posterOther.innerHTML = `<h2 class="text-center ">查看${res.data.user.name}的其他搭配</h2>`
            likecount.innerHTML = `${res.data.likeCounts}`
            collectcount.innerHTML = `${res.data.favoriteCounts}`
            const sty = document.querySelector(".sty")
            const stys = res.data.brands.split(new RegExp('[\x20\b]'));
               if(stys.length <2){
                   sty.innerHTML =` <p class="fs-3 d-flex justify-content-center ms-3">服飾品牌</p>
                   <div class="d-flex justify-content-center">
                       <button type="button" class="btn btn-primary btn-pill  ms-3">${stys[0]}</button>
                   </div>`
                   
               }else{
                   
                   sty.innerHTML = ` <p class="fs-3 d-flex justify-content-center ms-3">服飾品牌</p>
                   <div class="d-flex justify-content-center">
                       <button type="button" class="btn btn-primary btn-pill ms-3">${stys[0]}</button>
                   </div>        
                   <button type="button" class="btn btn-primary btn-pill mt-3 ms-3">${stys[1]}</button>`
   
               }
               let user = res.data.userId
               const reserve = document.querySelector(".reserve")
              
                if (storedToken !== "" || storedToken !==  null) {
                    reserve.addEventListener("click",function(){
                        if(userId != user){
                            window.location.href = `${localUrl}/others.html?userId=` + user + "&page=1";
                        }else{
                            window.location.href = `${localUrl}/personal.html?page=1`
                        }
                        
                    })
                }else{

                    reserve.addEventListener("click",function(){
                        myModa2.show();
                    })
                }
                if(storedToken !== "" || storedToken !==  null){
                    posterMore.addEventListener("click",function(){
                        window.location.href = `${localUrl}/others.html?userId=` + user + "&page=1";
                    }) 
                }else{
                    posterMore.addEventListener("click",function(){
                        window.location.href = `${localUrl}/member.html`;
                    })

                }




 
               const more = document.querySelector(".more")
               more.innerHTML = `
                                    <div class="container d-flex justify-content-center  ">
                                        <div class=" post row justify-content-around ">

                                        </div>
                                    </div>
                                
                                `
                axios.get(`${apiUrl}posts?userId=${userid}`)   
                .then(res =>{
                    
                    const post = document.querySelector(".post")
                    if(res.data.length==1){
                        for (let i = 0; i < 1; i++) {
                            post.innerHTML += `<div class="col-4 my-4">
                                                            <a  >
                                                                <div class="card card1" style="width: 350px; height: 450px;" id="${res.data[i].id}">
                                                                    <img src="${res.data[i].imgUrl}" style="width: 350px; height: 450px;" class="object-fit-cover img">
                                                                </div>
                                                            </a>
                                                        </div>`
                            
                        }
                    }else if(res.data.length==2){
                        for (let i = 0; i < 2; i++) {
                            post.innerHTML += `<div class="col-4 my-4">
                                                            <a  >
                                                                <div class="card card1" style="width: 350px; height: 450px;" id="${res.data[i].id}">
                                                                    <img src="${res.data[i].imgUrl}" style="width: 350px; height: 450px;" class="object-fit-cover img">
                                                                </div>
                                                            </a>
                                                        </div>`
                            
                        }
                    }else{
                        for (let i = 0; i < 3; i++) {
                            post.innerHTML += `<div class="col-4 my-4">
                                                            <a  >
                                                                <div class="card card1" style="width: 350px; height: 450px;" id="${res.data[i].id}">
                                                                    <img src="${res.data[i].imgUrl}" style="width: 350px; height: 450px;" class="object-fit-cover img">
                                                                </div>
                                                            </a>
                                                        </div>`
                            
                        }
                    }

                    
                    const card1List = document.querySelectorAll(".card1");

                    card1List.forEach(function(card, index) {
                        let id = card.getAttribute("id").trim();
                        card.addEventListener("click", function(e) {
                            e.stopPropagation();
                            e.preventDefault();
                            window.location.href = `${localUrl}/information.html?postId=` + id;
                        });
                    });


                            
                })
                
               
            


        })  


        



