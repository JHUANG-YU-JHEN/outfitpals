import { localUrl, apiUrl } from './config.js';
// function handleUserIdParameter() {                               //提前選染url
//     const urlParams = new URLSearchParams(window.location.search);

// }

// // 在頁面加載時執行處理 URL 中的 userId 參數
// window.onload = handleUserIdParameter;

// const apiUrl='http://localhost:3000/';
// const localUrl='http://localhost:5173/outfitpals/pages';
// const apiUrl='https://outfitpals-web-server.onrender.com/';
// const localUrl='https://bftsai.github.io/outfitpals';

//兩頁換頁
const thumbLinks = document.querySelectorAll(".thumb-link");
const thumb = document.querySelectorAll(".thumb");

const personalMain = document.querySelector("#personalmain");
const reserve = document.querySelector("#reserve");

const personalnav = document.querySelector("#personalnav")
const personalselect = document.querySelector("#personalselect")
const collect = document.querySelector("#collect")
const noopen = document.querySelector("#noopen")
const nopost = document.querySelector("#nopost")

//按鈕
const setting = document.querySelector(".setting");

//日期
const left = document.querySelector("#left");
const right = document.querySelector("#right");
const months = document.querySelector("#months");

const td = document.querySelectorAll("td");

//開啟預約按鈕
const open = document.querySelector("#open");
const close = document.querySelector(".close");

//時間地點


const p1 = document.querySelector(".p1");
const p2 = document.querySelector(".p2");
const p3 = document.querySelector(".p3");
const p4 = document.querySelector(".p4");
const t1 = document.querySelector(".t1");
const m1 = document.querySelector(".m1");
const t2 = document.querySelector(".t2");
const m2 = document.querySelector(".m2");

//個人資料渲染
const personal = document.querySelector(".personal");
const otherspost = document.querySelector(".otherspost");
const collectpost = document.querySelector(".collectpost");




//時間
let days = document.getElementsByTagName("td"); //將td標籤放入days物件集合中
var today = new Date();
var useMonth = today.getMonth() + 1;
var thisMonth = today.getMonth();
var seeMonth = thisMonth + 1;
var thisYear = today.getFullYear();
var firstDateOfThisMonth = new Date(thisYear, thisMonth, 1); //建立今年今月1日的 Date日期物件
var firstDateDayOfThisMonth = firstDateOfThisMonth.getDay(); //取得今年今月1日是禮拜幾
var monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; //儲存每月的天數，其中2月為28或29
if ((thisYear % 4 == 0 && thisYear % 100 != 0) || (thisYear % 400 == 0)) monthDays[1] = 29; //若是閏年，2月設為29日
let to = today.getDate();
days[firstDateDayOfThisMonth + to - 2].setAttribute("id", "current-day"); //今天日期




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


axios.get(`${apiUrl}640/users?id=${userId}`, {
    headers: {
        "authorization": `Bearer ${storedToken}`
    }
})
    .then(function (res) {

        personal.innerHTML = `
                        <div class="col-2  d-flex"> <div class="circle-box" style="width: 150px; height: 150px;background: url('${res.data[0].image}') center center / cover no-repeat;"></div></div>
                        <div class="col-6  d-flex">
                       
                            <div class="d-flex position-relative ">
                                <div class="ms-2">
                                    <div class="row ms-5 align-items-center" >
                                        <div class="col">
                                            <strong class="display-6 text-nowrap">${res.data[0].name}</strong>
                                            </div>
                                            <div class="col">
                                            <p class="fs-4 mt-3 text-nowrap" style="opacity: 0.4;">${res.data[0].height}cm ${res.data[0].weight}kg</p>
                                            </div>
                                    </div>
                                    <p class="ms-5 mt-5">${res.data[0].introduce}</p>
                                    <div class="d-flex">
                                        <p class="ms-5">活動範圍 :</p>
                                        <p>${res.data[0].PopArea}</p>
                                    </div>
                                    <div class="d-flex">
                                        <p class="ms-5">穿搭價位 :</p>
                                        <p>${res.data[0]["outfit price"]}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    <div class="col-2 d-flex align-items-center">
                        <div class = "sty">
                        
                        </div>
                    </div>
                    <div class="col-2 d-flex align-items-center mt-3">
                    <button type="button" class="btn btn-primary fs-5 " id="reservebtn">我的收藏</button> 
                    </div> 
                    `;

        const sty = document.querySelector(".sty");
        const stys = res.data[0].style.split(" ");
        if (stys.length < 2) {
            sty.innerHTML = ` <p class="fs-3 d-flex justify-content-center ms-3">穿衣風格</p>
                <div class="d-flex justify-content-center">
                    <button type="button" class="btn btn-primary btn-pill  ms-3">${stys[0]}</button>
                </div>`;

        } else {

            sty.innerHTML = ` <p class="fs-3 d-flex justify-content-center ms-3">穿衣風格</p>
                <div class="d-flex justify-content-center">
                    <button type="button" class="btn btn-primary btn-pill ms-3">${stys[0]}</button>
                </div>        
                <button type="button" class="btn btn-primary btn-pill mt-3 ms-3">${stys[1]}</button>`;

        }


            const reservebtn = document.querySelector("#reservebtn")
            reservebtn.addEventListener("click",function(){
                personalnav.classList.add("d-none")
                personalselect.classList.add("d-none")
                reserve.classList.add('d-none')
                personalMain.classList.add('d-none')
                nopost.classList.add('d-none')
                noopen.classList.add('d-none')
                collect.classList.remove('d-none')

            collect.innerHTML = `
                <div class="container ">
                    <div class="row my-6 align-items-center" >
                            <div class="col-6 d-flex justify-content-center">
                                <div class="d-flex align-items-center ">
                                    <div class="circle-box" style="width: 100px; height: 100px;background: url('${res.data[0].image}') center center / cover no-repeat;"></div>
                                    <strong class="display-6 ms-3 text-nowrap">${res.data[0].name}</strong>
                                </div>
                            </div>
                            <div class="col-6 d-flex justify-content-center">
                                <button type="submit" class="btn btn-primary ps-5 ms-5" id="goback">返回我的主頁</button> 
                            </div>
                    </div>                        
                </div>
                 <hr class="m-1">
                 <br>`;

            //收藏
            collect.innerHTML += `<div class="container mb-5 ">
                    <div class="row justify-content-between mt-4 ms-5 coll">

                    </div>
                </div> `
                 const goback = document.querySelector("#goback")
                 goback.addEventListener("click",function(){
                    collect.classList.add('d-none')
                    nopost.classList.add('d-none')
                    personalnav.classList.remove("d-none")
                    personalselect.classList.remove("d-none")
                    personalMain.classList.remove('d-none')
                })
                //收藏渲染
                const coll = document.querySelector(".coll")
                axios.get(`${apiUrl}favorites?_expand=post&userId=${userId}`)
                .then(function(res){
                    console.log(res.data)
                    coll.innerHTML += `<div class="container mb-5 ">
                    <div class="row justify-content-center mt-4  coll" id="cardRow"></div>
                    </div>` ;
                    const cardRow = document.getElementById('cardRow');
                    for (let i = 0; i < res.data.length; i++) {
                        cardRow.innerHTML += `<div class="col-lg-4 col-md-6">
                                                <div class="card card1" style="width: 350px; height: 450px;" id="${res.data[i].post.id}">
                                                    <img src="${res.data[i].post.imgUrl}" style="width: 350px; height: 400px;" class="object-fit-cover bg-cover" >
                                                    <div class="card-body dontmove">                                                                                                 
                                                    </div>
                                                </div>
                                            </div>`;
                    }
                    const card1List = document.querySelectorAll(".card1");

                    card1List.forEach(function (card, index) {
                        let id = card.getAttribute("id").trim();
                        card.addEventListener("click", function (e) {
                            e.stopPropagation();
                            e.preventDefault();
                            window.location.href = `${localUrl}/information.html?postId=` + id;
                        });
                    });





                });

        });

    });



axios.get(`${apiUrl}440/posts?userId=${userId}`, {
    headers: {
        "authorization": `Bearer ${storedToken}`
    }
})
    .then(function (res) {

    let postdata =res.data
    console.log(postdata.length)
    const page = location.href.split("=")[1];
    if(postdata.length !== 0){
                        otherspost.innerHTML =`<div class="row justify-content-center post1">
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

                            // 換頁
                            // for (let pageNum = page; pageNum <= Math.ceil(postdata.length / postsPerPage); pageNum++) {
                                const startIndex = (page - 1) * postsPerPage;
                                
                                // // 清空所有容器，只需要在分页循环外清空一次
                                // postContainers.forEach(containerClass => {
                                //     const container = document.querySelector(containerClass);
                                //     container.innerHTML = '';
                                // });
                                const endIndex = startIndex + postsPerPage;
                                for (let i = startIndex; i < endIndex && i < postdata.length; i++) {
                                    const postIndex = i % postsPerPage;
                                
                                    // 通过嵌套循环，将每个容器的生成逻辑移到循环内部
                                    postContainers.forEach((containerClass, index) => {                                
                                        if (postIndex >= index * (postsPerPage / postContainers.length) &&
                                            postIndex < (index + 1) * (postsPerPage / postContainers.length)) {
                                            const container = document.querySelector(containerClass);
                                            const imgUrl = postdata[i].imgUrl;
                                            const poid = postdata[i].id
                                            container.innerHTML += `<div class="col-4">
                                                                        <div class="card card1" style="width: 350px; height: 450px;" id="${poid}">
                                                                            <img src="${imgUrl}" style="width: 350px; height: 450px;" class="object-fit-cover bg-cover" >
                                                                        </div>
                                                                    </div>`;
                                        }
                                    });
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
                            // }
                            const one = document.querySelector(".page"); 
                            let maxPages = 100; 
                            if (postdata.length > 0) {
                            for (let i = 1; i <= Math.min(maxPages, Math.ceil(postdata.length / 8)); i++) {
                            one.innerHTML += `<li class="page-item"><a href="#" class="page-link border-0">${i}</a></li>`;
                            }
                            }
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
    }else{
        
        nopost.classList.remove('d-none')
        collect.classList.add('d-none')
        noopen.classList.add('d-none')

    }




    });





if (storedToken != null) {     //判斷登入
    function fetchData() {
        try {
            axios.get(`${apiUrl}personal?userId=${userId}`)
                .then(function (res) {


                    const isopen = res.data[0].isopen;
                    const [startHour, startMinute, endHour, endMinute] = res.data[0].oktime.split(/[~:]/);
                    const otherdate = res.data[0].otherdate;
                    const okday = res.data[0].okday;
                    const dataid = res.data[0].id;



                    if (isopen === true) {
                        //渲染
                        p1.placeholder = JSON.stringify(res.data[0].pos1).replace(/"/g, '');
                        p2.placeholder = JSON.stringify(res.data[0].pos2).replace(/"/g, '');
                        p3.placeholder = JSON.stringify(res.data[0].pos3).replace(/"/g, '');
                        p4.placeholder = JSON.stringify(res.data[0].pos4).replace(/"/g, '');
                        t1.placeholder = startHour;
                        m1.placeholder = startMinute;
                        t2.placeholder = endHour;
                        m2.placeholder = endMinute;
                        //日曆
                        for (var i = 1; i <= monthDays[thisMonth]; i++) {
                            var index = firstDateDayOfThisMonth + i - 2;
                            if (index >= 0 && index < days.length) {
                                days[index].innerHTML = i;

                                okday.forEach(function (a) {  //可預約
                                    let useday = a.split("/")[1];
                                    let useMonth = a.split("/")[0];
                                    if (parseInt(useday) === i && seeMonth === parseInt(useMonth)) { // 注意這裡使用 parseInt 將 useday 轉換為數字
                                        days[index].innerHTML = '<i class="bi bi-calendar2-check-fill d-flex justify-content-center text-info">';
                                    }
                                });
                                otherdate.forEach(function (a) {  //被預約


                                    let usedays = a.split("/")[1];
                                    let useMonths = a.split("/")[0];

                                    if (parseInt(usedays) === i && seeMonth === parseInt(useMonths)) { // 注意這裡使用 parseInt 將 useday 轉換為數字
                                        days[index].innerHTML = '<i class="bi bi-calendar-x-fill d-flex justify-content-center text-danger"></i>';
                                    }
                                });
                            }

                        }
                        let dateInfo = [];  //存取本月
                        td.forEach(function (td, index) {
                            const iElement = td.querySelector('i.bi.bi-calendar-x-fill.text-danger');
                            if (iElement) {
                                dateInfo.push({ day: index, hasIcon: true });
                            } else {
                                dateInfo.push({ day: index, hasIcon: false });
                            }
                        });
                        months.innerHTML = `<strong class="fs-2"  id="months">${thisYear}-${seeMonth}月</strong>`;


                        left.addEventListener("click", function () {
                            td.forEach(function (td, index) {
                                td.innerHTML = "　";
                            });
                            ////////////////////////////
                            var currentDayElement = document.getElementById("current-day");
                            if (currentDayElement) {
                                currentDayElement.removeAttribute("id");
                            }
                            ////////////////////////////
                            if (seeMonth > 1) {
                                seeMonth -= 1;
                                thisMonth -= 1;
                            } else if (seeMonth === 1) {
                                seeMonth = 12;
                                thisMonth = 11;
                                thisYear -= 1;
                            }
                            ////////////////////////////
                            var firstDateOfThisMonth = new Date(thisYear, thisMonth, 1);
                            var firstDateDayOfThisMonth = firstDateOfThisMonth.getDay();

                            if (firstDateDayOfThisMonth === 0) {
                                firstDateDayOfThisMonth = 7; // 將星期日（0）轉換為星期七（7）
                            }
                            if ((thisYear % 4 == 0 && thisYear % 100 != 0) || (thisYear % 400 == 0)) monthDays[1] = 29;
                            for (var i = 1; i <= monthDays[thisMonth]; i++) {    //渲染
                                var index = firstDateDayOfThisMonth + i - 2;

                                if (index >= 0 && index < days.length) {
                                    if (seeMonth == useMonth) {
                                        days[index].innerHTML = i;

                                        okday.forEach(function (a) {  //可預約
                                            let useday = a.split("/")[1];
                                            let useMonth = a.split("/")[0];
                                            if (parseInt(useday) === i && seeMonth === parseInt(useMonth)) { // 注意這裡使用 parseInt 將 useday 轉換為數字
                                                days[index].innerHTML = '<i class="bi bi-calendar2-check-fill d-flex justify-content-center text-info">';
                                            }
                                        });
                                        otherdate.forEach(function (a) {  //被預約

                                            let usedays = a.split("/")[1];
                                            let useMonths = a.split("/")[0];

                                            if (parseInt(usedays) === i && seeMonth === parseInt(useMonths)) { // 注意這裡使用 parseInt 將 useday 轉換為數字
                                                days[index].innerHTML = '<i class="bi bi-calendar-x-fill d-flex justify-content-center text-danger"></i>';
                                            }
                                        });
                                    } else {
                                        days[index].innerHTML = i;
                                        originalContents2[index] = i; //保存原有html 確保切換icon不會跑掉

                                        okday.forEach(function (a) {  //可預約
                                            let useday = a.split("/")[1];
                                            let useMonth = a.split("/")[0];
                                            if (parseInt(useday) === i && seeMonth === parseInt(useMonth)) { // 注意這裡使用 parseInt 將 useday 轉換為數字
                                                days[index].innerHTML = '<i class="bi bi-calendar2-check-fill d-flex justify-content-center text-info">';
                                            }
                                        });
                                        otherdate.forEach(function (a) {  //被預約
                                            let usedays = a.split("/")[1];
                                            let useMonths = a.split("/")[0];

                                            if (parseInt(usedays) === i && seeMonth === parseInt(useMonths)) { // 注意這裡使用 parseInt 將 useday 轉換為數字
                                                days[index].innerHTML = '<i class="bi bi-calendar-x-fill d-flex justify-content-center text-danger"></i>';
                                            }
                                        });
                                    }
                                }
                            }
                            // updateDates();
                            months.innerHTML = `<strong class="fs-2"  id="months">${thisYear}-${seeMonth}月</strong>`;

                            if (seeMonth == useMonth) {//今天日期
                                let newCurrentDayElement = days[firstDateDayOfThisMonth + to - 2];
                                newCurrentDayElement.setAttribute("id", "current-day");
                            }

                        });

                        right.addEventListener("click", function () {
                            td.forEach(function (td, index) {
                                td.innerHTML = "　";
                            });
                            //////////////////////////////////
                            var currentDayElement = document.getElementById("current-day");
                            if (currentDayElement) {
                                currentDayElement.removeAttribute("id");
                            }
                            ////////////////////////////
                            if (seeMonth < 12) {
                                seeMonth += 1;
                                thisMonth += 1;
                            } else if (seeMonth === 12) {
                                seeMonth = 1;
                                thisMonth = 0;
                                thisYear += 1;
                            }

                            var firstDateOfThisMonth = new Date(thisYear, thisMonth, 1);
                            var firstDateDayOfThisMonth = firstDateOfThisMonth.getDay();
                            if (firstDateDayOfThisMonth === 0) {
                                firstDateDayOfThisMonth = 7; // 將星期日（0）轉換為星期七（7）
                            }

                            if ((thisYear % 4 == 0 && thisYear % 100 != 0) || (thisYear % 400 == 0)) monthDays[1] = 29;
                            for (var i = 1; i <= monthDays[thisMonth]; i++) {

                                var index = firstDateDayOfThisMonth + i - 2;

                                if (index >= 0 && index < days.length) {
                                    if (seeMonth == useMonth) {
                                        days[index].innerHTML = i;

                                        okday.forEach(function (a) {  //可預約
                                            let useday = a.split("/")[1];
                                            let useMonth = a.split("/")[0];
                                            if (parseInt(useday) === i && seeMonth === parseInt(useMonth)) { // 注意這裡使用 parseInt 將 useday 轉換為數字
                                                days[index].innerHTML = '<i class="bi bi-calendar2-check-fill d-flex justify-content-center text-info">';
                                            }
                                        });
                                        otherdate.forEach(function (a) {  //被預約
                                            let usedays = a.split("/")[1];
                                            let useMonths = a.split("/")[0];

                                            if (parseInt(usedays) === i && seeMonth === parseInt(useMonths)) { // 注意這裡使用 parseInt 將 useday 轉換為數字
                                                days[index].innerHTML = '<i class="bi bi-calendar-x-fill d-flex justify-content-center text-danger"></i>';
                                            }
                                        });
                                    } else {
                                        days[index].innerHTML = i;
                                        originalContents2[index] = i; //保存原有html 確保切換icon不會跑掉

                                        okday.forEach(function (a) {  //可預約
                                            let useday = a.split("/")[1];
                                            let useMonth = a.split("/")[0];
                                            if (parseInt(useday) === i && seeMonth === parseInt(useMonth)) { // 注意這裡使用 parseInt 將 useday 轉換為數字
                                                days[index].innerHTML = '<i class="bi bi-calendar2-check-fill d-flex justify-content-center text-info">';
                                            }
                                        });
                                        otherdate.forEach(function (a) {  //被預約

                                            let usedays = a.split("/")[1];
                                            let useMonths = a.split("/")[0];

                                            if (parseInt(usedays) === i && seeMonth === parseInt(useMonths)) { // 注意這裡使用 parseInt 將 useday 轉換為數字
                                                days[index].innerHTML = '<i class="bi bi-calendar-x-fill d-flex justify-content-center text-danger"></i>';
                                            }
                                        });
                                    }
                                }
                            }
                            // updateDates();
                            months.innerHTML = `<strong class="fs-2"  id="months">${thisYear}-${seeMonth}月</strong>`;

                            if (seeMonth == useMonth) { //今天日期
                                let newCurrentDayElement = days[firstDateDayOfThisMonth + to - 2];
                                newCurrentDayElement.setAttribute("id", "current-day");
                            }
                        });

                        let dates = []; //push 要用的資料
                        const originalContents = [];
                        const originalContents2 = [];


                        //icon切換
                        td.forEach(function (td, index) {
                            originalContents[index] = td.innerHTML;

                            td.addEventListener("click", function (e) {
                                if (useMonth == seeMonth) {
                                    if (td.classList.contains("go")) {
                                        td.classList.remove("go");
                                        td.innerHTML = originalContents[index];
                                        dates.pop();
                                    } else {
                                        dates.push(`${seeMonth}/${e.target.textContent}`);
                                        td.classList.add("go");
                                        td.innerHTML = '<i class="bi bi-calendar2-check-fill text-info d-flex justify-content-center "></i>';
                                    }
                                } else {
                                    if (td.classList.contains("go")) {
                                        td.classList.remove("go");
                                        td.innerHTML = originalContents2[index];
                                        dates.pop();


                                    } else {
                                        dates.push(`${seeMonth}/${e.target.textContent}`);
                                        td.classList.add("go");
                                        td.innerHTML = '<i class="bi bi-calendar2-check-fill text-info d-flex justify-content-center "></i>';
                                    }
                                }

                            });
                        });



                        //貼文切換
                        for (let i = 0; i < thumbLinks.length; i++) {
                            thumbLinks[i].addEventListener("click", function (event) {
                                event.preventDefault(); // 防止頁面跳轉

                                for (let j = 0; j < thumbLinks.length; j++) {
                                    thumbLinks[j].querySelector('.thumb').classList.remove("active");
                                }

                                this.querySelector('.thumb').classList.add("active");

                                if (this.querySelector('.thumb').textContent === "貼文總覽") {
                                    personalMain.classList.remove('d-none')
                                    reserve.classList.add('d-none')
                                    noopen.classList.add('d-none')
                                    nopost.classList.add('d-none')
                                } else {
                                    noopen.classList.add('d-none')
                                    reserve.classList.remove('d-none')
                                    personalMain.classList.add('d-none')
                                    nopost.classList.add('d-none')
                                }
                            });
                        }

                        //修改資料
                        setting.addEventListener("click", function () {
                            let t1Value = t1.value || t1.placeholder;
                            let m1Value = m1.value || m1.placeholder;
                            let t2Value = t2.value || t2.placeholder;
                            let m2Value = m2.value || m2.placeholder;
                            ////////////////////////////////////////
                            let pos1 = p1.value || p1.placeholder;
                            let pos2 = p2.value || p2.placeholder;
                            let pos3 = p3.value || p3.placeholder;
                            let pos4 = p4.value || p4.placeholder;
                            let oktim = `${t1Value}:${m1Value}~${t2Value}:${m2Value}`;
                            axios.patch(`${apiUrl}personal/${dataid}`, {
                                "pos1": pos1,
                                "pos2": pos2,
                                "pos3": pos3,
                                "pos4": pos4,
                                "okday": dates,
                                "oktime": oktim,

                            });
                        });
                        //關閉預約功能
                        close.addEventListener("click", function () {
                            axios.patch(`${apiUrl}personal/${dataid}`, {
                                "isopen": false,
                            })
                                .then(function (response) {
                                    noopen.classList.remove('d-none');
                                    reserve.classList.add('d-none');
                                    nopost.classList.add('d-none')
                                    location.reload();
                                });
                        });





                    } else if (isopen !== true) {
                        //貼文切換
                        for (let i = 0; i < thumbLinks.length; i++) {

                            thumbLinks[i].addEventListener("click", function (event) {
                                event.preventDefault(); // 防止頁面跳轉

                                for (let j = 0; j < thumbLinks.length; j++) {
                                    thumbLinks[j].querySelector('.thumb').classList.remove("active");
                                }

                                this.querySelector('.thumb').classList.add("active");

                                if (this.querySelector('.thumb').textContent === "貼文總覽") {
                                    personalMain.classList.remove('d-none')
                                    noopen.classList.add('d-none')
                                    nopost.classList.add('d-none')
                                } else {
                                    noopen.classList.remove('d-none')
                                    personalMain.classList.add('d-none')
                                    nopost.classList.add('d-none')
                                }
                            });
                        }
                        //為使用者開啟 預約功能
                        open.addEventListener("click", function () {
                            axios.patch(`${apiUrl}personal/${dataid}`,{
                                    "isopen": true,
                            })
                            .then(function () {
                                // 这里添加你的其他逻辑，包括 noopen.classList.add('d-none')
                                noopen.classList.add('d-none');
                                reserve.classList.remove('d-none')
                                nopost.classList.add('d-none')
                                location.reload();
                            })
                                .then(function () {
                                    // 这里添加你的其他逻辑，包括 noopen.classList.add('d-none')
                                    noopen.classList.add('d-none');
                                    reserve.classList.remove('d-none');
                                    location.reload();
                                });
                        });
                    }


                });



        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }
    fetchData();







}



















