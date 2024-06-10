import { locationUrl, apiUrl } from './config.js';
//axios
import axios from 'axios';

const addTitle = document.querySelector('.addTitle')
const addBody = document.querySelector('.addBody')
const addOutfitStyle = document.querySelector('.addOutfitStyle')
const addBrands = document.querySelector('.addBrands')
const createPost = document.querySelector('.createPost')
const userAvatar = document.querySelector('.userAvatar')
const userName = document.querySelector('.userName')
console.log(userName);


const outfitpalsId = getCookie('outfitpalsId')

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

// 渲染avatar,name
function getUserInfo(){

    axios.get(`${apiUrl}users?id=${outfitpalsId}`)
    .then(res => {
        let userAvatarUrl = res.data[0].image
        let userNameData = res.data[0]['nick name']
        renderUserInfo(userAvatarUrl,userNameData)
        
    })
    .catch(err =>(
        console.log(err.response)
        
    ))
}
// 根據userInfo渲染
function renderUserInfo(userAvatarUrl,userNameData) {
    userAvatar.innerHTML = `<img src="${userAvatarUrl}" alt="userAvatar">`
    userName.textContent = userNameData
}

getUserInfo()
//upload pic
const upLoadImg=document.getElementById('upLoadImg'); //input btn
let upLoadPhoto=document.querySelector('.upLoadPhoto'); //image

upLoadImg.addEventListener('change',e=>{  
    let reader=new FileReader();
    reader.addEventListener('load',e=>{
        upLoadPhoto.setAttribute('src',e.target.result);    
        console.log(upLoadPhoto.getAttribute('src'));
    });
    reader.readAsDataURL(e.target.files[0]);
    
});


createPost.addEventListener('click',function(e){
    let obj = {
        "title": addTitle.value,
        "body": addBody.value,
        "imgUrl": upLoadPhoto.getAttribute('src'),
        "userId": outfitpalsId,
        "postTime": new Date().toUTCString(),
        "likeCounts": 0,
        "favoriteCounts": 0,
        "outfitStyle": addOutfitStyle.value,
        "brands": addBrands.value
    }
    createPosts(obj)
})
// 建立貼文後，跳轉至info新建貼文的頁面，尚未完成
function createPosts(obj){

    axios.post(`${apiUrl}posts`, obj)
    .then(res => {
        console.log(`建立貼文成功`);
        console.log(res.data);
        let newPost = res.data
        let postId = newPost.id;
        location.href=`${locationUrl}information.html?postId=${postId}`;
    })
    .catch(error => {
        console.log(error.response);
    });
}

function gotoinfo(){
    location.href = `${locationUrl}information.html`

}