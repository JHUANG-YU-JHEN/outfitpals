import { localUrl, apiUrl } from './config.js';
// function handleUserIdParameter() {                               //提前選染url
//     const urlParams = new URLSearchParams(window.location.search);
//     const userId = urlParams.get('userId');
//     // 在這裡可以執行相應的邏輯，例如渲染頁面

// }

// 在頁面加載時執行處理 URL 中的 userId 參數
// window.onload = handleUserIdParameter;

// const apiUrl='http://localhost:3000/';
// const localUrl='http://localhost:5173/outfitpals/pages';
// const apiUrl='https://outfitpals-web-server.onrender.com/';
// const localUrl='https://bftsai.github.io/outfitpals';

const thumbLinks = document.querySelectorAll(".thumb-link");
const thumb = document.querySelectorAll(".thumb");

const othersmain = document.querySelector("#othersmain");
const reserve = document.querySelector("#reserve");
const unopen = document.querySelector("#unopen");


const left = document.querySelector("#left");
const right = document.querySelector("#right");
const months = document.querySelector("#months");

const td = document.querySelectorAll("td");


const checkboxElements = document.querySelectorAll('.checkbox');
const ctn = document.querySelector(".ctn");
const pos = document.querySelector(".pos");
const tim = document.querySelector(".tim");
const tim2 = document.querySelector(".tim2");


const go = document.querySelector("#go");
const doublecheck = document.querySelector(".doublecheck");
const text = document.querySelector(".text");
const ans = document.querySelector(".ans");
const ans3 = document.querySelector(".ans3");


const oc1 = document.querySelector(".oc1");
const mu1 = document.querySelector(".mu1");


const d1 = document.querySelector(".d1");
const d2 = document.querySelector(".d2");
const d3 = document.querySelector(".d3");
const d4 = document.querySelector(".d4");
const usetime = document.querySelector(".usetime");

const bkdep = document.querySelector(".bkdep");     //查看其他人
const unopenname = document.querySelector(".unopenname");

const nologin = document.querySelector('#nologin');
const gologin = document.querySelector('#gologin');
const myModal = new bootstrap.Modal(document.getElementById('myModal'));
const myModa2 = new bootstrap.Modal(document.getElementById('myModa2'));

//個人資料渲染
const other = document.querySelector(".other");
const otherspost = document.querySelector(".otherspost");

const userinfomation = document.querySelector(".userinfomation");


//日期
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
// 填今月日期在TD格子上，從今年今月1日是禮拜幾開始填1~今月天數
days[firstDateDayOfThisMonth + to - 2].setAttribute("id", "current-day");


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
const id = parseInt(location.href.split("=")[1], 10);


axios.get(`${apiUrl}users?id=${id}`)
    .then(function (res) {
        other.innerHTML = `                       
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
                        <div class = "sto">
                        </div>
                    </div>
                    <div class="col-2 d-flex align-items-center">
                        <div class = "sty">
                        </div>
                    </div>`;

        const sty = document.querySelector(".sty");
        const stys = res.data[0].style.split(" ");
        if (stys.length < 2) {
            sty.innerHTML = ` <p class="fs-3 d-flex justify-content-center ms-3">穿衣風格</p>
                           <div class="d-flex justify-content-center">
                               <button type="button" class="btn btn-primary btn-pill  ms-3">${stys[0]}</button>
                           </div>`;

        } else {

            sty.innerHTML = ` <p class="fs-3 d-flex justify-content-center ">穿衣風格</p>
                           <div class="d-flex justify-content-center">
                               <button type="button" class="btn btn-primary btn-pill ms-3">${stys[0]}</button>
                            </div>   
                            <div class="d-flex justify-content-center">       
                                <button type="button" class="btn btn-primary btn-pill mt-3 ms-3">${stys[1]}</button>
                            </div>`;
        }

        const sto = document.querySelector(".sto");
        const stos = res.data[0]["love store"].split(" ");
        if (stos.length < 2) {
            sto.innerHTML = ` <p class="fs-3 d-flex justify-content-center ms-3">愛逛商店</p>
                        <div class="d-flex justify-content-center">
                            <button type="button" class="btn btn-primary btn-pill ms-3">${stos[0]}</button>
                        </div>`;

        } else {

            sto.innerHTML = ` <p class="fs-3 d-flex justify-content-center ms-3">愛逛商店</p>
                        <div class="d-flex justify-content-center">
                            <button type="button" class="btn btn-primary btn-pill ms-5">${stos[0]}</button>
                        </div>       
                        <div class="d-flex justify-content-center"> 
                        <button type="button" class="btn btn-primary btn-pill mt-3 ms-5">${stos[1]}</button>
                        </div>`;

        }

    });


axios.get(`${apiUrl}660/posts?userId=${id}`, {
    headers: {
        "authorization": `Bearer ${storedToken}`
    }
})
    .then(function (res) {
        let postdata = res.data;
        const page = location.href.split("=")[2];
        otherspost.innerHTML = `<div class="row justify-content-center post1">
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
                    `;
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
                    const poid = postdata[i].id;
                    container.innerHTML += `<div class="col-4">
                                                            <div class="card card1" style="width: 350px; height: 450px;" id="${poid}">
                                                                <img src="${imgUrl}" style="width: 350px; height: 450px;" class="object-fit-cover bg-cover" >
                                                            </div>
                                                            </div>`;
                }
            });
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
        r.addEventListener("click", function (event) {
            const urlParams = new URLSearchParams(window.location.search);
            var currentPage = parseInt(urlParams.get('page')) || 1;
            var newPage = currentPage + 1;
            urlParams.set('page', newPage);
            // 构建新的URL
            var newUrl = window.location.origin + window.location.pathname + '?' + urlParams.toString();
            // 通过替换当前页面历史记录来更新地址栏而不刷新页面
            window.history.replaceState({}, document.title, newUrl);
        });
        l.addEventListener("click", function (event) {
            const urlParams = new URLSearchParams(window.location.search);
            var currentPage = parseInt(urlParams.get('page')) || 1;
            if (currentPage > 1) {
                var newPage = currentPage - 1;
                urlParams.set('page', newPage);
                // 构建新的URL
                var newUrl = window.location.origin + window.location.pathname + '?' + urlParams.toString();
                // 通过替换当前页面历史记录来更新地址栏而不刷新页面
                window.history.replaceState({}, document.title, newUrl);
            }

        });

    });


if (storedToken != null) {   //判斷登陸
    axios.get(`${apiUrl}personal?userId=${id}&_expand=user`)
        .then(function (res) {
           
            if (res.data.length == 0) {     //判斷是否第一次登陸
                nologin.addEventListener("click", function () {
                    myModa2.show();
                });
            }
            const isopen = res.data[0].isopen;
            const otherdate = res.data[0].otherdate;
            const okday = res.data[0].okday;
            const userimg = res.data[0].user.image;
            const username = res.data[0].user.name;


            if (isopen === true) {  //判斷是否開預約
                usetime.textContent = `${res.data[0].oktime}`;
                d1.innerHTML = `<label class="form-check-label d4" for="flexCheckDefault">${res.data[0].pos1}</label>`;
                d2.innerHTML = `<label class="form-check-label d4" for="flexCheckDefault">${res.data[0].pos2}</label>`;
                d3.innerHTML = `<label class="form-check-label d4" for="flexCheckDefault">${res.data[0].pos3}</label>`;
                d4.innerHTML = `<label class="form-check-label d4" for="flexCheckDefault">${res.data[0].pos4}</label>`;



                //本月渲染
                for (var i = 1; i <= monthDays[thisMonth]; i++) {
                    var index = firstDateDayOfThisMonth + i - 2;
                    if (index >= 0 && index < days.length) {
                        days[index].innerHTML = i;
                        days[index].setAttribute('data-day', i);

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
                months.innerHTML = `<strong class="fs-2"  id="months">${thisYear}-${seeMonth}月</strong>`;

                let dateInfo = [];  //存取本月
                td.forEach(function (td, index) {
                    const iElement = td.querySelector('i.bi.bi-calendar-x-fill.text-danger');
                    if (iElement) {
                        dateInfo.push({ day: index, hasIcon: true });
                    } else {
                        dateInfo.push({ day: index, hasIcon: false });
                    }
                });
                //向左渲染
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
                                days[index].setAttribute('data-day', i);

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
                                days[index].setAttribute('data-day', i);
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
                //向右渲染
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
                                days[index].setAttribute('data-day', i);

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
                                days[index].setAttribute('data-day', i);
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
                    console.log(td)
                    td.addEventListener("click", function (e) {
                        if (useMonth == seeMonth) {
                            if (td.classList.contains("go")) {
                                td.classList.remove("go");
                                td.innerHTML = originalContents[index];
                                dates.pop();
                            } else {                                
                                dates.push(`${seeMonth}月${e.target.closest('td').getAttribute('data-day')}號`);
                                td.classList.add("go");
                                td.innerHTML = '<i class="bi bi-calendar-plus-fill text-warning d-flex justify-content-center"</i>';
                            }
                        } else {
                            if (td.classList.contains("go")) {
                                td.classList.remove("go");
                                td.innerHTML = originalContents2[index];                             
                                dates.pop();
                            } else {
                                dates.push(`${seeMonth}月${e.target.closest('td').getAttribute('data-day')}號`);
                                td.classList.add("go");
                                td.innerHTML = '<i class="bi bi-calendar-plus-fill text-warning d-flex justify-content-center"</i>';
                            }
                        }

                    });
                });





                //{body 必填}
                text.addEventListener("change", function () {
                    let want = text.value;
                    doublecheck.disabled = (want == "");
                });
                doublecheck.addEventListener("change", function () {
                    go.disabled = !doublecheck.checked;
                });
                //發送預約
                ctn.addEventListener("click", function () {
                    pos.innerHTML = '';
                    ans3.innerHTML = '';
                    text.value = '';
                    tim.innerHTML = `<li>${oc1.value}:${mu1.value}</li>`;
                    tim2.innerHTML = `<li>${oc1.value}:${mu1.value}</li>`;
                    checkboxElements.forEach(function (checkbox, index) {
                        if (checkbox.checked) {
                            var labelElement = document.querySelector('.d' + (index + 1));
                            var labelText = labelElement.innerText.trim();
                            pos.innerHTML += `<li>${labelText}</li>`;
                            ans3.innerHTML += `<li>${labelText}</li>`;
                        }
                    });
                    userinfomation.innerHTML += `<div class="circle-box   ms-3" style="width: 50px; height: 50px;background: url('${userimg}') center center / cover no-repeat;"></div>
                                                <strong class="me-5 mt-2 ms-1">${username}</strong>  `;

                });

                //貼文總覽切換
                for (let i = 0; i < thumbLinks.length; i++) {

                    thumbLinks[i].addEventListener("click", function (event) {
                        event.preventDefault(); // 防止頁面跳轉

                        for (let j = 0; j < thumbLinks.length; j++) {
                            thumbLinks[j].querySelector('.thumb').classList.remove("active");
                        }

                        this.querySelector('.thumb').classList.add("active");

                        if (this.querySelector('.thumb').textContent === "貼文總覽") {
                            othersmain.classList.remove('d-none');
                            reserve.classList.add('d-none');
                            unopen.classList.add('d-none');
                        } else {
                            reserve.classList.remove('d-none');
                            othersmain.classList.add('d-none');
                            unopen.classList.add('d-none');
                        }
                    });
                }

                //push 到 json



                go.addEventListener("click", function () {
                    let location = [];
                    let want = text.value;
                    let postTime = new Date().toUTCString();

                    let reservationTime = `${thisYear}年${dates} ${oc1.value}:${mu1.value}`;
                    checkboxElements.forEach(function (checkbox, index) {
                        if (checkbox.checked) {
                            var labelElement = document.querySelector('.d' + (index + 1));
                            location.push(labelElement.innerText.trim());
                        }
                    });
                    axios.post(`${apiUrl}comments`, {
                        "posterId": Number(id),
                        "userId": Number(userId),
                        "body": want,
                        "reservationTime": reservationTime,
                        "location": location,
                        "state": false,
                        "postTime": postTime
                    });


                    ans.innerHTML = `<p>${want}</p>`;
                });







                //判斷是否開預約
            } else if (isopen !== true) {
                //貼文總覽切換
                for (let i = 0; i < thumbLinks.length; i++) {

                    thumbLinks[i].addEventListener("click", function (event) {
                        event.preventDefault(); // 防止頁面跳轉

                        for (let j = 0; j < thumbLinks.length; j++) {
                            thumbLinks[j].querySelector('.thumb').classList.remove("active");
                        }

                        this.querySelector('.thumb').classList.add("active");

                        if (this.querySelector('.thumb').textContent === "貼文總覽") {
                            othersmain.classList.remove('d-none');
                            unopen.classList.add('d-none');
                        } else {
                            unopen.classList.remove('d-none');
                            othersmain.classList.add('d-none');
                        }
                    });
                }

                unopenname.textContent = `很可惜，${username}尚未成為逛街小精靈 想預約陪逛服務嗎？`;

                bkdep.addEventListener("click", function () {
                    window.location.href = `${localUrl}/development.html`;
                });

            }
        });
    //判斷登陸

} else {

    nologin.addEventListener("click", function () {
        myModal.show();

    });

    gologin.addEventListener("click", function () {
        window.location.href = `${localUrl}/member.html`;
    });

}








