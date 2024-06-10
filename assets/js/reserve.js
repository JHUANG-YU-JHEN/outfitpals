//axios
import axios from 'axios';
//jQuery
import $ from "jquery";
//customer function
import { ajaxMember,cookieValue } from "./ajaxMember.js";
import { locationUrl, apiUrl } from './config.js';
//bootstrap
import 'bootstrap/dist/js/bootstrap.min.js';

//spinner
const spinner=document.querySelector('.memberSpinner');
//switch reserveMyDiscuss reserveManageAppointments
function prohibitShortClick(callback) {  
    prohibitShortClick.property.init(callback);
};
prohibitShortClick.property={
    canClick:true,
    init(callback){
        if(this.canClick){
            this.canClick=false;
            callback();
            setTimeout(function(){
                this.canClick=true;
            }.bind(this), 2000);
        }else{
            alert('請不要重複點擊');
        }
    }
};

$(document).ready(function () {
    $('.btn-group.reserveBtnSwitch .btn').click(function (e) { 
        e.preventDefault();
        prohibitShortClick( ()=> {  
            spinner.classList.remove('d-none');
            reserveContent.classList.add('opacity-0');
            setTimeout(() => {
                reserveContent.innerHTML='';
                $(this).siblings().removeClass('active');
                $(this).addClass('active');
                reserveComponent.init(1);
                reserveContent.classList.remove('opacity-0')
            }, 400);
        });
    });
});

const unLogin=document.querySelector('.unLogin');
const reserve=document.querySelector('.reserve');
const reserveBtnGroup=document.querySelector('.c-switch-btn-group');
const reserveContent=document.querySelector('.reserve-content');
const backToReserveAll=[...document.querySelectorAll('.backToReserve')];
//my discuss
const reserveMyDiscuss=document.querySelector('.reserve-myDiscuss');
const reserveMyDiscussRadioForm=document.querySelector('.reserve-myDiscuss-Radio-Form');
const reserveMyDiscussRadioCancel=document.getElementById('reserve-myDiscussCancel');
const reserveMyDiscussConfirmGroup=document.querySelector('.reserveMyDiscussConfirmGroup');
const reserveMyDiscussConfirmSubmit=document.querySelector('.reserveMyDiscussConfirmSubmit');
const reserveMyDiscussConfirmCancel=document.querySelector('.reserveMyDiscussConfirmCancel');
//manage appointment
const reserveManageAppointments=document.querySelector('.reserve-manageAppointments');
const reserveManageAppointmentsRadioForm=document.querySelector('.reserve-manageAppointments-Radio-Form')
const reserveManageAppointmentsRadioCheck=document.getElementById('reserve-manageAppointmentsApprove');
const reserveManageAppointmentsRadioCancel=document.getElementById('reserve-manageAppointmentsCancel');
const reserveManageAppointmentsConfirmGroup=document.querySelector('.reserveManageAppointmentsConfirmGroup');
const reserveManageAppointmentsConfirmSubmit=document.querySelector('.reserveManageAppointmentsConfirmSubmit');
const reserveManageAppointmentsConfirmCancel=document.querySelector('.reserveManageAppointmentsConfirmCancel');
//pagination
const paginationArea=document.querySelector('.paginationArea');
const pagination=document.querySelector('.pagination');
const paginationPrev=document.querySelector('.pagination .prev');
const paginationNext=document.querySelector('.pagination .next');

const reserveComponent={
    data:{},
    async init(){
        if(cookieValue('outfitpalsId')===undefined||cookieValue('outfitpalsToken')===undefined||cookieValue('outfitpalsThirdParty')===undefined){
            unLogin.classList.remove('d-none');
            reserve.classList.remove('pb-9');
            reserve.classList.remove('pb-lg-13');
            reserveBtnGroup.classList.add('d-none');
            reserveContent.classList.add('d-none');
            paginationArea.classList.add('d-none');
            
        }else if(cookieValue('outfitpalsId')==="''"&&cookieValue('outfitpalsToken')==="''"&&cookieValue('outfitpalsThirdParty')==="''"){
            unLogin.classList.remove('d-none');
            reserve.classList.remove('pb-9');
            reserve.classList.remove('pb-lg-13');
            reserveBtnGroup.classList.add('d-none');
            reserveContent.classList.add('d-none');
            paginationArea.classList.add('d-none');
        }else{
            unLogin.classList.add('d-none');
            reserve.classList.add('pb-9');
            reserve.classList.add('pb-lg-13');
            reserveBtnGroup.classList.remove('d-none');
            reserveContent.classList.remove('d-none');
            await this.render(1);
            await this.renderPagination();
        }
    },
    getPostArr(){
        const postArr=ajaxMember.getPosts();
        return postArr;
    },
    getCommentPostArr(id){
        const postArr=ajaxMember.getPostsById(id);
        this.data=postArr;
        return postArr;
    },
    getCommentObj(id){
        const commentsArr=ajaxMember.getComment(id);
        this.data=commentsArr;
        return commentsArr;
    },
    getAllUserComment(id){ //取得我的預約
        const commentsArr=ajaxMember.getAllUserComment(id);
        return commentsArr;
    },
    getAllPostComment(id){ //取得預約管理
        const commentsArr=ajaxMember.getAllPostComment(id);
        return commentsArr;
    },
    getPostCommentArr(id,page){ //取得預約管理
        const commentsArr=ajaxMember.getPostComment(id,page);
        return commentsArr;
    },
    getUserComment(id,page){ //取得我的預約
        const commentsArr=ajaxMember.getUserComment(id,page);
        return commentsArr;
    },
    getUserData(id){
        const commentUser=ajaxMember.getUserData(id);
        return commentUser;
    },
    async render(page){
        try {
            spinner.classList.remove('d-none');
            paginationArea.classList.add('d-none');
            const commentArr=await this.getUserComment(cookieValue('outfitpalsId'),page); //取得我的預約
            const postArr=await this.getPostCommentArr(cookieValue('outfitpalsId'),page); //取得預約管理
            const stateDom=[...reserveBtnGroup.children[0].children[0].children[0].children].find(item=>{
                if(item.className.includes('active')){
                    return item;
                }
            });
            
            reserveContent.classList.add('opacity-0');
            setTimeout(async() => {
                reserveContent.classList.remove('opacity-0');

                if(stateDom.textContent==='我的預約'){
                    reserveContent.innerHTML='';
                    if(commentArr.length!==0){
                        //render comment
                        commentArr.forEach(async (item,index)=>{
                            const posterData=await this.getUserData(item.posterId);
                            const time=new Date(item.postTime).toLocaleString('chinese',{hour12:false}).split(' ')[0];

                            const li=document.createElement('li');
                            li.className='row justify-content-between justify-content-lg-center align-items-center py-7 border border-grey1D';
                            li.setAttribute('data-id',item.id);
                            reserveContent.appendChild(li);
                            const col3=document.createElement('div');
                            col3.className='col-3 col-lg-2';
                            li.appendChild(col3);
                            const img=document.createElement('img');
                            img.className='object-fit-cover rounded-circle d-block mx-auto';
                            img.src=posterData.image;
                            img.alt='personal pic';
                            col3.appendChild(img);
        
                            const col5=document.createElement('div');
                            col5.className='col-5 col-sm-6 col-lg-8';
                            li.appendChild(col5);
                            const cardBody=document.createElement('div');
                            cardBody.className='card-body position-relative';
                            col5.appendChild(cardBody);
                            const cardTitle=document.createElement('p');
                            cardTitle.className='card-title fs-5 fs-lg-3 fw-bold';
                            cardTitle.textContent=posterData.name;
                            let cardText=document.createElement('p');
                            cardText.className='card-text multiline-ellipsis';
                            cardText.textContent=item.body;
                            const badge=document.createElement('span');
                            badge.className='badge rounded-pill text-bg-greyE9 text-grey66 position-absolute fs-lg-8 top-10 start-100 start-sm-75 start-md-50 start-lg-30';
                            badge.textContent=item.state===false? '預約中':(badge.textContent=item.state==='accept'? '預約成功':(badge.textContent=item.state==='reject'? '已拒絕':'已取消'));
                            cardBody.appendChild(cardTitle);
                            cardBody.appendChild(cardText);
                            cardBody.appendChild(badge);
        
                            const col4=document.createElement('div');
                            col4.className='col-4 col-sm-3 col-lg-2';
                            li.appendChild(col4);
                            cardText=document.createElement('p');
                            cardText.className='card-text text-grey9F fs-8 text-end text-md-center';
                            cardText.textContent=time;
                            col4.appendChild(cardText);

                            paginationArea.classList.remove('d-none');

                            spinner.classList.add('d-none');
                            
                            li.addEventListener('click',async e=>{
                                spinner.classList.remove('d-none');
                                reserveBtnGroup.classList.add('opacity-0');
                                reserveContent.classList.add('opacity-0');
                                pagination.classList.add('opacity-0');
                                setTimeout(() => {
                                    reserveBtnGroup.classList.add('d-none');
                                    reserveContent.classList.add('d-none');
                                    pagination.classList.add('d-none');
                                    reserveMyDiscuss.classList.remove('d-none');
                                    setTimeout(() => {
                                        reserveMyDiscuss.classList.remove('opacity-0');
                                        spinner.classList.add('d-none');
                                    }, 500);
                                }, 500);
        
                                const commentId=e.target.closest('li').getAttribute('data-id');
                                reserveMyDiscuss.setAttribute('data-id',commentId);
                                const comment=await reserveComponent.getCommentObj(commentId);
                                const time=new Date(comment.postTime).toLocaleString('chinese',{hour12:false}).split(' ')[0];
                                const posterData=await reserveComponent.getUserData(comment.posterId);
                                
                                if(comment.state==='accept'||comment.state==='reject'||comment.state==='cancel'){
                                    reserveMyDiscussRadioForm.classList.add('d-none');
                                    reserveMyDiscussConfirmGroup.classList.add('d-none');
                                }else if(comment.state===false){
                                    reserveMyDiscussRadioForm.classList.remove('d-none');
                                    reserveMyDiscussConfirmGroup.classList.remove('d-none');
                                }
        
                                const image=document.querySelector('.reserve-myDiscuss .image');
                                const name=document.querySelector('.reserve-myDiscuss .name');
                                const date=document.querySelector('.reserve-myDiscuss .date');
                                const reservationTime=document.querySelector('.reserve-myDiscuss .reservationTime');
                                const location=document.querySelector('.reserve-myDiscuss .location');
                                const state=document.querySelector('.reserve-myDiscuss .state');
                                const commentBody=document.querySelector('.reserve-myDiscuss .commentBody');
        
                                image.src=posterData.image;
                                name.textContent=posterData.name;
                                date.textContent=time;
                                reservationTime.textContent=comment.reservationTime;
                                location.textContent=comment.location;
                                location.href=`https://www.google.com.tw/maps?q=${comment.location}`;
                                state.textContent=comment.state===false? '預約中':(comment.state==='accept'?'預約成功':(comment.state==='reject'?'已拒絕':'已取消'));
                                commentBody.textContent=comment.body;
                            });
                        });
                    }else{
                        const li=document.createElement('li');
                        li.className='row justify-content-between justify-content-lg-center align-items-center py-7 py-lg-23';
                        reserveContent.appendChild(li);
                        const col3=document.createElement('div');
                        col3.className='col-3 col-lg-2';
                        li.appendChild(col3);
                        const p=document.createElement('p');
                        p.className=`card-title fs-5 fs-lg-3 fw-bold text-danger`
                        p.textContent=`目前尚無預約`;
                        col3.appendChild(p);

                        paginationArea.classList.add('d-none');

                        spinner.classList.add('d-none');
                    }
                }else if(stateDom.textContent==='預約管理'){
                    reserveContent.innerHTML='';
                    if(postArr.length!==0){
                        
                        postArr.forEach(async item=>{
                            const userData=await this.getUserData(item.userId) //取得所有回覆留言者的資訊
                            
                            const time=new Date(item.postTime).toLocaleString('chinese',{hour12:false}).split(' ')[0];
        
                            const li=document.createElement('li');
                            li.className='row justify-content-between justify-content-lg-center align-items-center py-7 border border-grey1D';
                            li.setAttribute('data-id',item.id);
                            reserveContent.appendChild(li);
        
                            const col3=document.createElement('div');
                            col3.className='col-3 col-lg-2';
                            li.appendChild(col3);
                            const img=document.createElement('img');
                            img.className='object-fit-cover rounded-circle d-block mx-auto';
                            img.src=userData.image;
                            img.alt='personal pic';
                            col3.appendChild(img);
        
                            const col5=document.createElement('div');
                            col5.className='col-5 col-sm-6 col-lg-8';
                            li.appendChild(col5);
        
                            const cardBody=document.createElement('div');
                            cardBody.className='card-body position-relative';
                            col5.appendChild(cardBody);
        
                            const cardTitle=document.createElement('p');
                            cardTitle.className='card-title fs-5 fs-lg-3 fw-bold';
                            cardTitle.textContent=userData.name;
                            let cardText=document.createElement('p');
                            cardText.className='card-text multiline-ellipsis';
                            cardText.textContent=item.body;
                            const badge=document.createElement('span');
                            badge.className='badge rounded-pill text-bg-greyE9 text-grey66 position-absolute fs-lg-8 top-10 start-100 start-sm-75 start-md-50 start-lg-30';
                            badge.textContent=item.state===false? '預約中':(badge.textContent=item.state==='accept'? '預約成功':(badge.textContent=item.state==='reject'? '已拒絕':'已取消'));
                            cardBody.appendChild(cardTitle);
                            cardBody.appendChild(cardText);
                            cardBody.appendChild(badge);
        
                            const col4=document.createElement('div');
                            col4.className='col-4 col-sm-3 col-lg-2';
                            li.appendChild(col4);
                            cardText=document.createElement('p');
                            cardText.className='card-text text-grey9F fs-8 text-end text-md-center';
                            cardText.textContent=time;
                            col4.appendChild(cardText);

                            paginationArea.classList.remove('d-none');

                            spinner.classList.add('d-none');
        
                            //reserve into reserveManageAppointments
                            li.addEventListener('click',async e=>{
                                spinner.classList.remove('d-none');
                                reserveBtnGroup.classList.add('opacity-0');
                                reserveContent.classList.add('opacity-0');
                                pagination.classList.add('opacity-0');
                                setTimeout(() => {
                                    reserveBtnGroup.classList.add('d-none');
                                    reserveContent.classList.add('d-none');
                                    pagination.classList.add('d-none');
                                    reserveManageAppointments.classList.remove('d-none');
                                    setTimeout(() => {
                                        reserveManageAppointments.classList.remove('opacity-0');
                                        spinner.classList.add('d-none');
                                    }, 500);
                                }, 500);
    
                                const commentId=e.target.closest('li').getAttribute('data-id');
                                reserveManageAppointments.setAttribute('data-id',commentId);
                                const comment=await reserveComponent.getCommentObj(commentId);
                                const time=new Date(comment.postTime).toLocaleString('chinese',{hour12:false}).split(' ')[0];
                                const commenterData=await reserveComponent.getUserData(comment.userId);
    
                                if(comment.state==='accept'||comment.state==='reject'||comment.state==='cancel'){
                                    reserveManageAppointmentsRadioForm.classList.add('d-none');
                                    reserveManageAppointmentsConfirmGroup.classList.add('d-none');
                                }else if(comment.state===false){
                                    reserveManageAppointmentsRadioForm.classList.remove('d-none');
                                    reserveManageAppointmentsConfirmGroup.classList.remove('d-none');
                                }
    
                                const image=document.querySelector('.reserve-manageAppointments .image');
                                const name=document.querySelector('.reserve-manageAppointments .name');
                                const date=document.querySelector('.reserve-manageAppointments .date');
                                const reservationTime=document.querySelector('.reserve-manageAppointments .reservationTime');
                                const tel=document.querySelector('.reserve-manageAppointments .tel');
                                const location=document.querySelector('.reserve-manageAppointments .location');
                                const state=document.querySelector('.reserve-manageAppointments .state');
                                const commentBody=document.querySelector('.reserve-manageAppointments .commentBody');
                                
                                image.src=commenterData.image;
                                name.textContent=commenterData.name;
                                date.textContent=time;
                                reservationTime.textContent=comment.reservationTime;
                                tel.textContent=commenterData.tel;
                                tel.href=`tel:${commenterData.tel}`;
                                location.textContent=comment.location;
                                location.href=`https://www.google.com.tw/maps?q=${comment.location}`;
                                state.textContent=comment.state===false? '預約中':(comment.state==='accept'? '預約成功':(comment.state==='reject'? '已拒絕':'已取消'));
                                commentBody.textContent=comment.body;
                            });
                        });
                    }else{
                        const li=document.createElement('li');
                        li.className='row justify-content-between justify-content-lg-center align-items-center py-7 py-lg-23';
                        reserveContent.appendChild(li);
                        const col3=document.createElement('div');
                        col3.className='col-3 col-lg-2';
                        li.appendChild(col3);
                        const p=document.createElement('p');
                        p.className=`card-title fs-5 fs-lg-3 fw-bold text-danger`
                        p.textContent=`目前尚無預約`;
                        col3.appendChild(p);

                        paginationArea.classList.add('d-none');

                        spinner.classList.add('d-none');
                    }
                }
                
            }, 400);
        } catch (err) {
            console.log(err);
            spinner.classList.add('d-none');
            location.href=`${locationUrl}member.html`;
        }
    },
    async renderPagination(){
        try {
            const stateDom=[...reserveBtnGroup.children[0].children[0].children[0].children].find(item=>{
                if(item.className.includes('active')){
                    return item;
                }
            });
            let paginationLength=0;
            if(stateDom.textContent==='我的預約'){
                paginationLength=(await this.getAllUserComment(cookieValue('outfitpalsId'))).length;
            }else{
                paginationLength=(await this.getAllPostComment(cookieValue('outfitpalsId'))).length;
            }
            
            const countPageDelete=pagination.childElementCount-1;
            for (let i = 1; i < countPageDelete; i++) {
                pagination.removeChild(pagination.children[1]);
            }
    
            //render pagination
            for(let i=1;i<=Number((paginationLength/2).toFixed(0));i++){
                if(i===1){
                    const li=document.createElement('li');
                    li.className='page-item';
                    paginationPrev.parentNode.insertBefore(li,paginationPrev.nextSibling);
    
                    const a=document.createElement('a');
                    a.className='page-link page-num py-lg-3 px-lg-7 border-black18 bg-black fs-6 fs-lg-5 active';
                    a.href='#';
                    a.textContent=i;
                    li.appendChild(a);
                }else{
                    const li=document.createElement('li');
                    li.className='page-item';
                    paginationNext.parentNode.insertBefore(li,pagination.children[i]);
                    //paginationNext
                    const a=document.createElement('a');
                    a.className='page-link page-num py-lg-3 px-lg-7 border-black18 bg-black fs-6 fs-lg-5';
                    a.href='#';
                    a.textContent=i;
                    li.appendChild(a);
                }
            };
            
            if(paginationLength>0){
                paginationArea.classList.remove('d-none');
            }
        } catch (err) {
            console.log(err);
            location.href=`${locationUrl}member.html`;
        }
    }
};

reserveComponent.init();

//pagination
pagination.addEventListener('click',e=>{
    if((e.target.nodeName!=='LI')&&(e.target.nodeName!=='A')&&(e.target.nodeName!=='IMG')){
        return
    }
    if((e.target.nodeName==='LI'||e.target.nodeName==='A')&&e.target.closest('a').className.includes('page-num')){
        reserveComponent.render(Number(e.target.textContent));
    }else{
        [...pagination.children].forEach(item=>{
            if(item.children[0].className.includes('active')){
                reserveComponent.render(Number(item.children[0].textContent));
            }
        })
    }
});
reserveBtnGroup.addEventListener('click',e=>{
    if(pagination.childElementCount>2){
        [...pagination.children].forEach((item,index)=>{
            item.children[0].classList.remove('active');
            if(index===1){
                item.children[0].classList.add('active');
            }
        });
    }
});

//reserve my discuss
reserveMyDiscussRadioCancel.addEventListener('click',e=>{
    if(reserveMyDiscussRadioCancel.checked===true){
        reserveMyDiscussConfirmSubmit.disabled=false;
    }
});
reserveMyDiscussConfirmSubmit.addEventListener('click',async e=>{
    e.preventDefault();
    spinner.classList.remove('d-none');
    try {
        let obj={}
        if(reserveMyDiscussRadioCancel.checked===true){
            const id=reserveMyDiscuss.getAttribute('data-id');
            obj.state='cancel';
            
            await ajaxMember.patchComment(id,obj);

            spinner.classList.add('d-none');
            location.href=`${locationUrl}reserve.html`;
        }
    } catch (err) {
        console.log(err);
        spinner.classList.add('d-none');
    }
})
reserveMyDiscussConfirmCancel.addEventListener('click',e=>{
    reserveMyDiscussRadioCancel.checked=false;
    reserveMyDiscussConfirmSubmit.disabled=true;
    reserveMyDiscuss.classList.add('opacity-0');
    setTimeout(() => {
        reserveBtnGroup.classList.remove('d-none');
        reserveContent.classList.remove('d-none');
        pagination.classList.remove('d-none');
        reserveMyDiscuss.classList.add('d-none');
        setTimeout(() => {
            reserveBtnGroup.classList.remove('opacity-0');
            reserveContent.classList.remove('opacity-0');
            pagination.classList.remove('opacity-0');
        }, 0);
    }, 400);
});
//reserveMyDiscuss back to reserve
backToReserveAll[0].addEventListener('click',e=>{
    spinner.classList.remove('d-none');
    reserveMyDiscussRadioCancel.checked=false;
    reserveMyDiscussConfirmSubmit.disabled=true;
    reserveMyDiscuss.classList.add('opacity-0');
    setTimeout(() => {
        reserveBtnGroup.classList.remove('d-none');
        reserveContent.classList.remove('d-none');
        pagination.classList.remove('d-none');
        reserveMyDiscuss.classList.add('d-none');
        setTimeout(() => {
            reserveBtnGroup.classList.remove('opacity-0');
            reserveContent.classList.remove('opacity-0');
            pagination.classList.remove('opacity-0');
            spinner.classList.add('d-none');
        }, 0);
    }, 400);
});

//reserve manage appointment
document.querySelector('.reserve-manageAppointments .row:nth-child(3)').addEventListener('click',e=>{
    if(reserveManageAppointmentsRadioCheck.checked===true||reserveManageAppointmentsRadioCancel.checked===true){
        reserveManageAppointmentsConfirmSubmit.disabled=false;
    }
});

reserveManageAppointmentsConfirmSubmit.addEventListener('click',async e=>{
    e.preventDefault();
    try {
        spinner.classList.remove('d-none');
        let obj={}
        const id=reserveManageAppointments.getAttribute('data-id');
        
        if(reserveManageAppointmentsRadioCheck.checked===true){
            obj.state='accept';
            await ajaxMember.patchComment(id,obj);

            const personalId=(await reserveComponent.getCommentObj(id)).posterId;
            const reservationTime=document.querySelector('.reserve-manageAppointments .reservationTime');
            const month=reservationTime.textContent.split(' ')[0].split(new RegExp('[^\\d]'))[1];
            const day=reservationTime.textContent.split(' ')[0].split(new RegExp('[^\\d]'))[2];
            console.log(id,personalId);
            await ajaxMember.patchPersonalOtherday(personalId,`${month}/${day}`);

            spinner.classList.add('d-none');
        }else if(reserveManageAppointmentsRadioCancel.checked===true){
            obj.state='reject';
            await ajaxMember.patchComment(id,obj);
            spinner.classList.add('d-none');
        }
        location.href=`${locationUrl}reserve.html`;
    } catch (err) {
        console.log(err);
        spinner.classList.add('d-none');
    }
});

reserveManageAppointmentsConfirmCancel.addEventListener('click',e=>{
    spinner.classList.remove('d-none');
    reserveManageAppointmentsRadioCheck.checked=false;
    reserveManageAppointmentsRadioCancel.checked=false;
    reserveManageAppointmentsConfirmSubmit.disabled=true;
    reserveManageAppointments.classList.add('opacity-0');
    setTimeout(() => {
        reserveBtnGroup.classList.remove('d-none');
        reserveContent.classList.remove('d-none');
        pagination.classList.remove('d-none');
        reserveManageAppointments.classList.add('d-none');
        setTimeout(() => {
            reserveBtnGroup.classList.remove('opacity-0');
            reserveContent.classList.remove('opacity-0');
            pagination.classList.remove('opacity-0');
            spinner.classList.add('d-none');
        }, 0);
    }, 400);
});
//reserveManageAppointments back to reserve
backToReserveAll[1].addEventListener('click',e=>{
    spinner.classList.remove('d-none');
    reserveManageAppointmentsRadioCheck.checked=false;
    reserveManageAppointmentsRadioCancel.checked=false;
    reserveManageAppointmentsConfirmSubmit.disabled=true;
    reserveManageAppointments.classList.add('opacity-0');
    setTimeout(() => {
        reserveBtnGroup.classList.remove('d-none');
        reserveContent.classList.remove('d-none');
        pagination.classList.remove('d-none');
        reserveManageAppointments.classList.add('d-none');
        setTimeout(() => {
            reserveBtnGroup.classList.remove('opacity-0');
            reserveContent.classList.remove('opacity-0');
            pagination.classList.remove('opacity-0');
            spinner.classList.add('d-none');
        }, 0);
    }, 400);
});


let obj={}
obj.state=false;
function patchComment(id,obj) {  
    ajaxMember.patchComment(id,obj);
}
// patchComment(12,obj)

// ajaxMember.patchPersonalOtherday(12,'12/1')
async function editPersonalOthers(id){
    try {
        const result=await axios.patch(`${apiUrl}personal/${id}`,{
            otherdate:[]
        });
        console.log(result);
    } catch (err) {
        console.log(err.response);
    }
}
// editPersonalOthers(11)

async function deletePost(id) {  
    try {
        const result=axios.delete(`${apiUrl}posts/${id}`);
        console.log(result);
    } catch (err) {
        console.log(err.response);
    }
}
// deletePost(17)

function getFav() {  
    axios.get(`${apiUrl}favorites`)
        .then(res=>{
            console.log(res.data);
        })
        .catch(err=>{
            console.log(err.response);
        })
}
// getFav();
