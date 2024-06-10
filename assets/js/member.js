//member pages
const memberIndex=document.querySelector('.member-index');
const memberIndexForm=document.querySelector('.memberIndexForm');
const memberSignUpData=document.querySelector('.member-signUpData');
const memberSignUpForm=document.querySelector('.memberSignUpForm');
const memberSignInProfile=document.querySelector('.member-signInProfile');
const memberSignInProfileForm=document.querySelector('.memberSignInProfileForm');
const memberSignInData=document.querySelector('.member-signInData');
const memberSignInForm=document.querySelector('.memberSignInForm');
//signIn signUp Btn
const signInBtn=document.querySelector('.signInBtn');
const signUpBtn=document.querySelector('.signUpBtn');
const gmailSignIn=document.querySelector('.gmailSignIn');
const gmailSignUp=document.querySelector('.gmailSignUp');
//member index input
const account=document.getElementById('account');
const pwd=document.getElementById('pwd');
//member signUp input
const signUpImg=document.getElementById('signUpImg'); //input
let signUpPhoto=document.querySelector('.signUpPhoto'); //image
const signUpPwd=document.getElementById('signUpPwd');
const signUpMail=document.getElementById('signUpMail');
const signUpName=document.getElementById('signUpName');
const signUpNickName=document.getElementById('signUpNickName');
const signUpBirth=document.getElementById('signUpBirth');
const signUpTel=document.getElementById('signUpTel');
const signUpMale=document.getElementById('signUpMale');
const signUpFemale=document.getElementById('signUpFemale');
const signUpHeight=document.getElementById('signUpHeight');
const signUpWeight=document.getElementById('signUpWeight');
const signUpPopArea=document.getElementById('signUpPopArea');
const signUpStyle=document.getElementById('signUpStyle');
const signUpOutfitPrice=document.getElementById('signUpOutfitPrice');
const signUpLoveStore=document.getElementById('signUpLoveStore');
const signUpIntroduce=document.getElementById('signUpIntroduce');

//submit 
const memberIndexSubmit=document.querySelector('.memberIndexSubmit');
const memberIndexCancel=document.querySelector('.memberIndexCancel');
const memberSignUpSubmit=document.querySelector('.memberSignUpSubmit');

import { checkSign, signUpValidation } from './formValidation.js';
import { ajaxMember, cookieValue } from './ajaxMember.js';
import { locationUrl, apiUrl } from "./config.js";
import axios from 'axios';
//init
// if(cookieValue('outfitpalsThirdParty')!==undefined){
//     if(cookieValue('outfitpalsThirdParty')==='false'||cookieValue('outfitpalsThirdParty')==='google'){
//         if(cookieValue('outfitpalsToken')&&cookieValue('outfitpalsId')){
//             memberIndex.classList.add('opacity-0');
//             account.value='';
//             pwd.value='';
//             ajaxMember.renderMemberSignInProfileForm();
//             memberIndex.classList.add('d-none');
//             memberSignInProfile.classList.remove('d-none');
//             memberSignInProfile.classList.remove('opacity-0');
//         }
//     }
// }
if(cookieValue('outfitpalsThirdParty')==='false'||cookieValue('outfitpalsThirdParty')==='google'||cookieValue('outfitpalsThirdParty')===undefined){
    if(cookieValue('outfitpalsToken')&&cookieValue('outfitpalsId')){
        memberIndex.classList.add('opacity-0');
        account.value='';
        pwd.value='';
        ajaxMember.renderMemberSignInProfileForm();
        memberIndex.classList.add('d-none');
        memberSignInProfile.classList.remove('d-none');
        memberSignInProfile.classList.remove('opacity-0');
    }
}
//sign index
signInBtn.addEventListener('click',e=>{
    [...e.target.offsetParent.children].forEach(item=>{
        item.classList.remove('active');
    });
    account.value='';
    pwd.value='';
    memberIndexSubmit.textContent='登入';  
    memberIndexForm.classList.remove('was-validated');
    account.classList.remove('is-invalid');
    account.classList.remove('is-valid-customer');
    account.classList.remove('is-invalid-customer');
    account.setAttribute("style","");
    pwd.classList.remove('is-invalid');
    pwd.classList.remove('is-valid-customer');
    pwd.classList.remove('is-invalid-customer');
    pwd.setAttribute("style","");  

    e.target.classList.add('active');
    gmailSignUp.classList.add('opacity-0');
    memberIndexForm.classList.add('opacity-0');
    setTimeout(()=>{
        gmailSignUp.classList.add('d-none');
        gmailSignIn.classList.remove('d-none');
        setTimeout(() => {
            gmailSignIn.classList.remove('opacity-0');
            memberIndexForm.classList.remove('opacity-0');
        }, 0);
    },400);
});
signUpBtn.addEventListener('click',e=>{
    [...e.target.offsetParent.children].forEach(item=>{
        item.classList.remove('active');
    });
    account.value='';
    pwd.value='';
    memberIndexSubmit.textContent='註冊';
    memberIndexForm.classList.remove('was-validated');
    account.classList.remove('is-invalid');
    account.setAttribute("style","");
    pwd.classList.remove('is-invalid');
    pwd.setAttribute("style","");
    

    e.target.classList.add('active');
    gmailSignIn.classList.add('opacity-0');
    memberIndexForm.classList.add('opacity-0');
    setTimeout(()=>{
        gmailSignIn.classList.add('d-none');
        gmailSignUp.classList.remove('d-none');
        setTimeout(() => {
            gmailSignUp.classList.remove('opacity-0');
            memberIndexForm.classList.remove('opacity-0');
        }, 0);
    },400);
    
});
memberIndexSubmit.addEventListener('click',e=>{
    e.preventDefault();
    e.stopPropagation();
    memberIndexForm.classList.add('was-validated');

    checkSign.checkAccount(account,account.value);
    checkSign.checkSignUpIndexPwd(pwd,pwd.value);
    account.addEventListener('keyup',e=>{
        checkSign.checkAccount(e.target,e.target.value);
    });
    account.addEventListener('paste',e=>{
        checkSign.checkAccount(e.target,e.target.value);
    });
    pwd.addEventListener('keyup',e=>{
        checkSign.checkSignUpIndexPwd(e.target,e.target.value);
    });
    pwd.addEventListener('paste',e=>{
        checkSign.checkSignUpIndexPwd(e.target,e.target.value);
    });
    
    if(checkSign.checkAccount(account,account.value)&&checkSign.checkSignUpIndexPwd(pwd,pwd.value)){
        let obj={};
        obj.email=account.value;
        obj.password=pwd.value;
        obj['third party']='false';

        if(signInBtn.className.includes('active')){
            ajaxMember.signIn(obj);
        }else{
            ajaxMember.register(obj);
        }
    }
});
memberIndexCancel.addEventListener('click',e=>{
    account.value='';
    pwd.value='';
});

//signUp
//upload pic
signUpImg.addEventListener('change',e=>{
    console.log(e);
    let reader=new FileReader();
    
    reader.addEventListener('load',e=>{
        signUpPhoto.setAttribute('src',e.target.result);
    });
    // 第二種寫法
    // reader.onload=(e)=>{
    //     signUpPhoto.setAttribute("src",e.target.result);
    // };
    reader.readAsDataURL(e.target.files[0]);
});

//if customer don't set profile photo can use this transform to Data photo
function signUpPhotoTransformToData(url) {  
    let image=new Image();
    let imgType=url.match(/\.jpg/)? 'image/jpeg':'image/png';
    return new Promise((resolve,reject)=>{
        image.onload = function () {
            let canvas = document.createElement('canvas');
            canvas.width = this.naturalWidth;
            canvas.height = this.naturalHeight;
            canvas.getContext('2d').drawImage(this, 0, 0);
            resolve(canvas.toDataURL(imgType,1.0));
        };
        image.onerror = function () {
            reject('Error: Image load failed');
        };
        image.src = url;
    });
};
memberSignUpSubmit.addEventListener('click',async e=>{
    e.preventDefault();
    e.stopPropagation();

    if(cookieValue('outfitpalsThirdParty')==='false'){
        await signUpPhotoTransformToData(signUpPhoto.getAttribute('src'))
        .then(res=>{
            signUpPhoto.src=res;
        })
        .catch(err=>{
            console.log(err);
        })
    }
    
    signUpValidation(signUpPhoto,signUpName,signUpPwd,signUpNickName,signUpBirth,signUpMail,signUpTel,signUpMale,signUpFemale,signUpHeight,signUpWeight,signUpPopArea,signUpStyle,signUpOutfitPrice,signUpLoveStore,signUpIntroduce,memberSignUpForm);
});

memberSignInForm.addEventListener('click',e=>{
    const signInImg=document.getElementById('signInImg');
    const signInPhoto=document.querySelector('.signInPhoto');
    const signInPwd=document.getElementById('signInPwd');
    const signInMail=document.getElementById('signInMail');
    const signInName=document.getElementById('signInName');
    const signInNickName=document.getElementById('signInNickName');
    const signInBirth=document.getElementById('signInBirth');
    const signInTel=document.getElementById('signInTel');
    const signInMale=document.getElementById('signInMale');
    const signInFemale=document.getElementById('signInFemale');
    const signInHeight=document.getElementById('signInHeight');
    const signInWeight=document.getElementById('signInWeight');
    const signInPopArea=document.getElementById('signInPopArea');
    const signInStyle=document.getElementById('signInStyle');
    const signInOutfitPrice=document.getElementById('signInOutfitPrice');
    const signInLoveStore=document.getElementById('signInLoveStore');
    const signInIntroduce=document.getElementById('signInIntroduce');
    
    if(e.target.className.includes('memberSignInReviseSubmit')){
        e.preventDefault();
        e.stopPropagation();

        signUpValidation(signInPhoto,signInName,signInPwd,signInNickName,signInBirth,signInMail,signInTel,signInMale,signInFemale,signInHeight,signInWeight,signInPopArea,signInStyle,signInOutfitPrice,signInLoveStore,signInIntroduce,memberSignInForm);
    }else if(e.target.className.includes('memberSignInReviseCancel')){
        location.href=`${locationUrl}member.html`;
    }
},false);

// ajaxMember.deleteUser(6)

// axios.get(`${apiUrl}users`)
//     .then(res=>{
//         console.log(res);
//     })

// ajaxMember.getComments();

let postObj={
    "title": "title five",
    "body": "body bla bla bla bla bla bla bla bla ",
    "userId" : Number(cookieValue('outfitpalsId'))
};

// ajaxMember.postPosts(postObj)
// ajaxMember.deletePosts(2)

let commentObj={
    "posterId": 2,
    "userId": Number(cookieValue('outfitpalsId')),
    "body": "你好，我想跟你約4月27日晚上七點，在新埔站碰面，可以嗎？",
    "reservationTime": '113年4月27號 19:00',
    "location": '新埔捷運站1號出口',
    "state": false
}
// let commentObj={
//     "postId": 5,
//     "userId": Number(cookieValue('outfitpalsId')),
//     "body": "你好，我想跟你約1月12日下午三點，在西門碰面，可以嗎？",
//     "reservationTime": '113年1月12號 15:00',
//     "location": '西門捷運站1號出口',
//     "state": false,
//     "checked": false //accept、reject、wait
// }
// ajaxMember.postComment(commentObj)
// ajaxMember.deleteComment(11)

async function deleteFavorToZero(id) {  
    try {
        const resultLength=(await axios.get(`${apiUrl}likes`)).data.length;
        const result=(await axios.delete(`${apiUrl}favorites/${id}`));
            console.log(result);
    } catch (err) {
        console.log(err);
    }
}
// deleteFavorToZero(7)
async function deleteLikesToZero(id) {  
    try {
        const resultLength=(await axios.get(`${apiUrl}likes`)).data.length;
        const result=(await axios.delete(`${apiUrl}likes/${id}`));
            console.log(result);
    } catch (err) {
        console.log(err);
    }
}
// deleteLikesToZero(21)

async function patchFaverToZero() {  
    try {
        const resultLength=(await axios.get(`${apiUrl}posts`)).data.length;
        for(let i=1;i<=resultLength;i++){
            const obj={
                favoriteCounts:0,
                likeCounts:0
            }
            const result=await axios.patch(`${apiUrl}posts/${i}`,obj);
            console.log(result);
        }
    } catch (err) {
        console.log(err);
    }
}
// patchFaverToZero()
