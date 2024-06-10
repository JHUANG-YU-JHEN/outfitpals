import { localUrl, apiUrl } from './config.js';
// const thumb = document.querySelectorAll(".thumb")
// const thumbLinks = document.querySelectorAll(".thumb-link");
// const search = document.querySelector(".search")
// const body = document.querySelector(".bodys")
// const header = document.querySelector("header")
// const toggle = document.querySelector("#toggle")
// const row = document.querySelector(".rows")

// https://outfitpals-web-server.onrender.com/
// https://bftsai.github.io/outfitpals
import axios from "axios";
import { data } from "jquery";
// const apiUrl='https://outfitpals-web-server.onrender.com/';
// const localUrl='https://bftsai.github.io/outfitpals';
// const apiUrl='http://localhost:3000/';
// const localUrl='http://localhost:5173/outfitpals/pages';
// // 當 search 元素被點擊時，防止事件冒泡
// search.addEventListener("click", function (event) {
//     event.stopPropagation();
// });



// for (let i = 0; i < thumbLinks.length; i++) {
//     thumbLinks[i].addEventListener("click", function (event) {

//         event.preventDefault(); // 防止頁面跳轉
//         for (let j = 0; j < thumbLinks.length; j++) {
//             thumbLinks[j].querySelector('.thumb').classList.remove("active");
//         }
//         this.querySelector('.thumb').classList.add("active");
//     });
// }



//     search.addEventListener('click', ()=>{
//         // event.preventDefault();
//         header.classList.toggle('sidebar-toggled');
//         const clickedElement = event.target;
        
//         // 如果點擊事件發生在 search 元素以外的地方
//         if (search.contains(clickedElement)) {
//             // 隱藏 search 元素
//             search.classList.add('d-none');
//             row.classList.remove('d-none')
//         }

//     })
//     body.addEventListener("click",function(){
//         const clickedElement = event.target;
//         if (!search.contains(clickedElement)) {
//             // 隱藏 search 元素
//             header.classList.remove('sidebar-toggled');
//             search.classList.remove('d-none');
//             row.classList.add('d-none')
//         }
        
    //}


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
    
    const storedToken = getCookie("outfitpalsToken");
    const userId = getCookie("outfitpalsId");




//貼文牆
        axios.get(`${apiUrl}posts?_expand=user`)
        .then(function(res){
            let postdata =res.data
            let userImage;
            let username ;
            let height;
            let weight;
            let uid;
            let postid;
            const page = location.href.split("=")[1];
            document.querySelector(".post").innerHTML=`<div class="row justify-content-center post1">
                                                        </div>
                                                        <div class="row justify-content-center mt-5 post2">
                                                        </div>
                                                        <div class="row justify-content-center mt-5 post3">
                                                        </div>
                                                        <div class="pe-5 me-5 mt-5">
                                                        <nav aria-label="Page navigation example">
                                                        <ul class="pagination justify-content-lg-center my-3">
                                                            <li class="page-item"><a href="" class="page-link border-0 l"><i class="bi bi-chevron-left "></i></a></li>
                                                            <div class = "page d-flex">

                                                            </div>
                                                            <li class="page-item"><a href="" class="page-link border-0 r"><i class="bi bi-chevron-right"></i></a></li>
                                                        </ul>
                                                        </nav>
                                                        </div>
                                                    `


            const postsPerPage = 9;
            const postContainers = [".post1", ".post2", ".post3"];

            const startIndex = (page - 1) * postsPerPage;
                            
            // 清空所有容器，只需要在分页循环外清空一次
            postContainers.forEach(containerClass => {
                const container = document.querySelector(containerClass);
                container.innerHTML = '';
            });
            const endIndex = startIndex + postsPerPage;
            for (let i = startIndex; i < endIndex && i < postdata.length; i++) {
                const postIndex = i % postsPerPage;
            
                // 通过嵌套循环，将每个容器的生成逻辑移到循环内部
                postContainers.forEach((containerClass, index) => {                                
                    if (postIndex >= index * (postsPerPage / postContainers.length) &&
                        postIndex < (index + 1) * (postsPerPage / postContainers.length)) {
                        const container = document.querySelector(containerClass);
                        const imgUrl = postdata[i].imgUrl;

                        if (postdata[i].hasOwnProperty('user') && postdata[i].user.hasOwnProperty('image')) {
                            userImage = postdata[i].user.image;
                            username = postdata[i].user.name;
                            height = postdata[i].user.height
                            weight = postdata[i].user.weight
                            uid = postdata[i].userId
                            postid = postdata[i].id
                            
                          }
                        // console.log(`postIndex: ${postIndex}, index * (postsPerPage / postContainers.length): ${index * (postsPerPage / postContainers.length)}, (index + 1) * (postsPerPage / postContainers.length): ${(index + 1) * (postsPerPage / postContainers.length)}`);
                        container.innerHTML += `<div class="col-4">
                                                    
                                                        <div class="card card1" style="width: 350px; height: 450px;">
                                                            <img src="${imgUrl}" style="width: 350px; height: 350px;" class="object-fit-cover img">
                                                                <div class="card-body dontmove" id="${postid}">
                                                                    <div class="row">
                                                                        <div class="col-8 mt-2 d-flex ">
                                                                            <div class="circle-box others" id=" ${uid}" style="width: 50px; height: 50px;background: url('${userImage}') center center / cover no-repeat;"></div>
                                                                            <div class="ms-2">
                                                                                <strong>${username}</strong>
                                                                                <p class="fs-6  text-nowrap" style="opacity: 0.4;">${height}cm ${weight}kg</p>
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-1  icon2">
                                                                            
                                                                        </div>
                                                                        <div class="col-1 ms-3 icon">
                                                                            
                                                                        </div>

                                                                    </div>
                                                                </div>
                                                                </div>
                                                        </div>                                                   
                                                    </div>`;}
     
                });

            }


            //頁數渲染
            const one = document.querySelector(".page"); 
            let maxPages = 100; 
            if (postdata.length > 0) {
            one.innerHTML = '';
                for (let i = 1; i <= Math.min(maxPages, Math.ceil(postdata.length / 8)); i++) {
                    one.innerHTML += `<li class="page-item"><a href="#" class="page-link border-0">${i}</a></li>`;
                }
            }

            //換頁
            const l = document.querySelector(".l"); 
            const r = document.querySelector(".r"); 
            r.addEventListener("click", function(event) {
                const urlParams = new URLSearchParams(window.location.search);
                var currentPage = parseInt(urlParams.get('page')) || 1;
                var newPage = currentPage + 1;
                urlParams.set('page', newPage);
                // 构建新的URL
                var newUrl = window.location.origin + window.location.pathname + '?' + urlParams.toString();      
                // 通过替换当前页面历史记录来更新地址栏而不刷新页面
                window.history.replaceState({}, document.title, newUrl);
            });
            l.addEventListener("click", function(event) {
                const urlParams = new URLSearchParams(window.location.search);
                var currentPage = parseInt(urlParams.get('page')) || 1;
                if(currentPage > 1 ){
                    var newPage = currentPage - 1;
                    urlParams.set('page', newPage);
                    // 构建新的URL
                    var newUrl = window.location.origin + window.location.pathname + '?' + urlParams.toString();      
                    // 通过替换当前页面历史记录来更新地址栏而不刷新页面
                    window.history.replaceState({}, document.title, newUrl);
                }
    
            });
            
            //cardboy 不跳轉 
            const card = document.querySelectorAll(".card1"); 
          
            card.forEach(function(c,index) {
                c.addEventListener("click", function(e) {
                    e.stopPropagation();
                    e.preventDefault();
                })

                
                const dontmove = c.querySelector(".dontmove"); 
                const others = c.querySelector(".others"); 
                const img = c.querySelector(".img"); 
                let id = others.getAttribute("id").trim();  //使用者id                      使用 trim() 移除空格 
                let poid = dontmove.getAttribute("id").trim();  //post 的 id

                const icon = c.querySelector('.icon');
                const icon2 = c.querySelector('.icon2');

                let isProcessing = false;
                let originalLikeCounts;  // 将 originalLikeCounts 移到全局作用域
                let originalCollectCounts;

                let thisid

                // 收藏選染
                axios.get(`${apiUrl}favorites?userId=${userId}`)
                .then(function(res){
                    
                    let collectposts = []
                    res.data.forEach(async function(collect) {
                        collectposts.push(collect.postId)
                    })
                    collectposts.forEach(function(l,index){                          
                        if(icon.children.length === 0){     
                            if(collectposts[index] ==poid){
                                icon.innerHTML +=`<p class="bi display-6 mt-2 collect bi-bookmark-fill icollect"></p>` 
                            }
                        }   
                    })
                    if(icon.children.length === 0){
                        if(collectposts[index] !=poid){
                            icon.innerHTML +=`<p class="bi bi-bookmark display-6 mt-2 collect" ></p>`
                        }
                    }    
                    const collect = c.querySelector('.collect');     
                    collect.addEventListener('click', async function(e) {
                            if (isProcessing) {
                                return;  // 如果正在处理点击事件，则直接返回，防止重复点击
                            }
                        
                            isProcessing = true;  // 设置标志位，表示开始处理点击事件
    
                            try {
                                collect.classList.toggle("bi-bookmark");
                                collect.classList.toggle("bi-bookmark-fill");
                                collect.classList.toggle("icollect");
    
                                const currentPost = postdata.find(post => post.id == poid);
                                originalCollectCounts = currentPost.favoriteCounts;  
    
                                // await new Promise(resolve => setTimeout(resolve, 500));  // 等待3秒钟
                                let CC = parseInt(originalCollectCounts);
                                if (collect.classList.contains("icollect")) {
                                    CC ++
                                    axios.patch(`${apiUrl}posts/${poid}`, {
                                        "favoriteCounts": CC,
                                    });
                                    axios.post(`${apiUrl}favorites`,{
                                                "userId":Number(userId),
                                                "postId":Number(poid)
                                            })
                                } else {
                                    CC --
                                     axios.patch(`${apiUrl}posts/${poid}`, {
                                        "favoriteCounts":CC,
                                    });
                                    
                                    axios.get(`${apiUrl}favorites?postId=${poid}&userId=${userId}`)
                                    .then(r=>{
                                        let d = (r.data[0].id)
                                        axios.delete(`${apiUrl}favorites/${d}`)
                                        .then(response => {
                                            // 处理响应
                                          })
                                          .catch(error => {
                                            console.error('Delete request error:', error);
                                            if (error.response) {
                                              console.error('Server responded with:', error.response.data);
                                            }
                                          });
                                    })
                                }
    
                            }catch (error) {
                                console.error("Error:", error);
                            } finally {
                                isProcessing = false;  // 点击事件处理完成，重置标志位
                            }
    
                        
                    });

                })

                //喜歡選染
                axios.get(`${apiUrl}likes?userId=${userId}`)
                .then(function(res){
                    let liketposts = []
                    res.data.forEach(async function(like) {
                        liketposts.push(like.postId)
                    })
                    
                    liketposts.forEach(function(l,index){                          
                        if(icon2.children.length === 0){     
                            if(liketposts[index] ==poid){
                                    icon2.innerHTML +=`<p class="bi display-6 mt-2 me-3 love bi-heart-fill ilove" style="position: relative; top: 2px;"></p>`
                            }
                        }   
                    })
                    if(icon2.children.length === 0){
                        if(liketposts[index] !=poid){
                        icon2.innerHTML +=`<p class="bi bi-heart display-6 mt-2 me-3 love" style="position: relative; top: 2px;" ></p>`
                        }
                    }
                    const loveElement = c.querySelector('.love');
                    //喜歡與收藏
                    loveElement.addEventListener('click', async function(e) {
                        if (isProcessing) {
                            return;  // 如果正在处理点击事件，则直接返回，防止重复点击
                        }
                    
                        isProcessing = true;  // 设置标志位，表示开始处理点击事件
                    
                        try {
                            // 切换样式
                            loveElement.classList.toggle("bi-heart");
                            loveElement.classList.toggle("bi-heart-fill"); 
                            loveElement.classList.toggle("ilove");
                            
                            const currentPost = postdata.find(post => post.id == poid);

                            originalLikeCounts = currentPost.likeCounts;  // 更新 originalLikeCounts 的值
                            // await new Promise(resolve => setTimeout(resolve, 500));  // 等待3秒钟
                            let like = parseInt(originalLikeCounts);
                    
                            if (loveElement.classList.contains("ilove")) {
                                like ++ 
                                axios.patch(`${apiUrl}posts/${poid}`, {
                                    "likeCounts": like,
                                });

                                axios.post(`${apiUrl}likes`,{
                                    "userId":Number(userId),
                                    "postId":Number(poid)
                                })
                            } else {
                                like --
                                 axios.patch(`${apiUrl}posts/${poid}`, {
                                    "likeCounts": like,
                                });

                                axios.get(`${apiUrl}likes?postId=${poid}&userId=${userId}`)
                                .then(r=>{
                                    let d = (r.data[0].id)
                                    console.log(r.data)
                                    axios.delete(`${apiUrl}likes/${d}`)
                                })
                            }
                        } catch (error) {
                            console.error("Error:", error);
                        } 
    
                    });

                })
                //頭像跳轉
                others.addEventListener("click", function() {
                    if(id != userId){
                        window.location.href = `${localUrl}/others.html?userId=` + id + "&page=1";
                    }else{
                        window.location.href = `${localUrl}/personal.html?page=1`
                    }
                    
                });
                //照片跳轉
                img.addEventListener("click",function(){
                    window.location.href = `${localUrl}/information.html?postId=` + poid;
                })
            });






        
        })





//         axios.post(`${apiUrl}favorites`,{
//             "userId":Number(4),
//             "postId":Number(4)
//         })
// .then(function(res) {
// })
// .catch(function(err) {
//     console.error("GET 请求失败:", err);
// });