import { ajaxMember, cookieValue } from "./ajaxMember.js";
import { locationUrl } from "./config.js";

//check validation tool
export const checkSign={
    regexp:new RegExp(''),
    checkAccount(input,str){
        this.regexp=new RegExp('^[\\w\\d-]+\\@[\\d\\w]{3,}\\.[\\d\\w]{3,}(\\.[\\d\\w]{2,})?$');
        if(str===''){
            input.classList.remove('is-valid-customer');
            input.classList.add('is-invalid');
            input.classList.add('is-invalid-customer');
            input.nextElementSibling.textContent=`請輸入電子郵件`;
            return false;
        }else if(!(this.regexp.test(str))){
            input.classList.remove('is-valid-customer');
            input.classList.add('is-invalid');
            input.classList.add('is-invalid-customer');
            input.nextElementSibling.textContent=`格式錯誤，電子郵件不包含特殊字元（如：!、#、$、%、^）`;
            return false;
        }else{
            input.classList.remove('is-invalid');
            input.classList.remove('is-invalid-customer');
            input.classList.add('is-valid-customer');
            return true;
        }
    },
    checkSignUpIndexPwd(input,str){
        this.regexp=new RegExp('^[A-Z][\\d\\w]{7,}$');
        if(str===''){
            input.classList.remove('is-valid-customer');
            input.classList.add('is-invalid');
            input.classList.add('is-invalid-customer');
            input.nextElementSibling.textContent=`請輸入密碼`;
            return false;
        }else if(!(this.regexp.test(str))){
            input.classList.remove('is-valid-customer');
            input.classList.add('is-invalid');
            input.classList.add('is-invalid-customer');
            return false;
        }else{
            input.classList.remove('is-invalid');
            input.classList.remove('is-invalid-customer');
            input.classList.add('is-valid-customer');
            return true;
        }
    },
    checkMail(input,str){
        this.regexp=new RegExp('^[\\w\\d-]+\\@[\\d\\w]{3,}\\.[\\d\\w]{3,}(\\.[\\d\\w]{2,})?$');
        if(str===''){
            input.nextElementSibling.textContent=`請輸入電子郵件`;
            return false;
        }else if(!(this.regexp.test(str))){
            input.classList.remove('is-valid-customer');
            input.classList.add('is-invalid');
            input.classList.add('is-invalid-customer');
            input.nextElementSibling.textContent=`格式錯誤，電子郵件不包含特殊字元（如：!、#、$、%、^）`;
            return false;
        }else{
            input.classList.remove('is-invalid');
            input.classList.remove('is-invalid-customer');
            input.classList.add('is-valid-customer');
            return true;
        }
    },
    checkName(input,str){
        this.regexp=new RegExp('^[\u4e00-\u9fa5_a-zA-Z\x20]{2,}$');
        if(str===''){
            input.nextElementSibling.textContent=`請輸入姓名`;
            return false;
        }else if(!(this.regexp.test(str))){
            input.classList.remove('is-valid-customer');
            input.classList.add('is-invalid');
            input.classList.add('is-invalid-customer');
            input.nextElementSibling.textContent=`格式錯誤，姓名不包含數字或特殊字元（如：!、@、#、$、%、^）`;
            return false;
        }else{
            input.classList.remove('is-invalid');
            input.classList.remove('is-invalid-customer');
            input.classList.add('is-valid-customer');
            return true;
        }
    },
    checkPwd(input,str){
        this.regexp=new RegExp('^[A-Z][\\d\\w]{7,}$');
        if(str===''){
            input.nextElementSibling.textContent=`請輸入密碼`;
            return false;
        }else if(!(this.regexp.test(str))){
            input.classList.remove('is-valid-customer');
            input.classList.add('is-invalid');
            input.classList.add('is-invalid-customer');
            input.nextElementSibling.textContent=`格式錯誤，密碼第一個為大寫英文，不包含特殊字元（如：!、@、#、$、%、^），最少 8 位英數字`;
            return false;
        }else{
            input.classList.remove('is-invalid');
            input.classList.remove('is-invalid-customer');
            input.classList.add('is-valid-customer');
            return true;
        }
    },
    checkNickName(input,str){
        this.regexp=new RegExp('^[\u4e00-\u9fa5_a-zA-Z\\d\x20]{1,}$');
        if(str===''){
            input.nextElementSibling.textContent=`請輸入暱稱`;
            return false;
        }else if(!(this.regexp.test(str))){
            input.classList.remove('is-valid-customer');
            input.classList.add('is-invalid');
            input.classList.add('is-invalid-customer');
            input.nextElementSibling.textContent=`格式錯誤，暱稱最少三個英數字，不包含特殊字元（如：!、@、#、$、%、^）`;
            return false;
        }else{
            input.classList.remove('is-invalid');
            input.classList.remove('is-invalid-customer');
            input.classList.add('is-valid-customer');
            return true;
        }
    },
    checkBirth(input,str){
        this.regexp=new RegExp('^[\\d]{4}-[\\d]{2}-[\\d]{2}$');
        if(str===''){
            input.nextElementSibling.textContent=`請輸入生日`;
            return false;
        }else if(!(this.regexp.test(str))){
            input.classList.remove('is-valid-customer');
            input.classList.add('is-invalid');
            input.classList.add('is-invalid-customer');
            input.nextElementSibling.textContent=`格式錯誤，請輸入西元年/月/日`;
            return false;
        }else{
            input.classList.remove('is-invalid');
            input.classList.remove('is-invalid-customer');
            input.classList.add('is-valid-customer');
            return true;
        }
    },
    checkTel(input,str){
        this.regexp=new RegExp('^09[\\d]{8}$');
        if(str===''){
            input.nextElementSibling.textContent=`請輸入手機號碼`;
            return false;
        }else if(!(this.regexp.test(str))){
            input.classList.remove('is-valid-customer');
            input.classList.add('is-invalid');
            input.classList.add('is-invalid-customer');
            input.nextElementSibling.textContent=`格式錯誤，格式為0912345678`;
            return false;
        }else{
            input.classList.remove('is-invalid');
            input.classList.remove('is-invalid-customer');
            input.classList.add('is-valid-customer');
            return true;
        }
    },
};
//signUp validation
export async function signUpValidation(imgSrc,name,pwd,nickName,birth,email,tel,male,female,height,weight,popArea,style,price,loveStore,introduce,memberForm) {  

    memberForm.classList.add('was-validated');

    name.addEventListener('keyup',e=>{
        checkSign.checkName(e.target,e.target.value);
    });
    name.addEventListener('paste',e=>{
        checkSign.checkName(e.target,e.target.value);
    });

    pwd.addEventListener('keyup',e=>{
        checkSign.checkPwd(e.target,e.target.value);
    });
    pwd.addEventListener('paste',e=>{
        checkSign.checkPwd(e.target,e.target.value);
    });

    nickName.addEventListener('keyup',e=>{
        checkSign.checkNickName(e.target,e.target.value);
    });
    nickName.addEventListener('paste',e=>{
        checkSign.checkNickName(e.target,e.target.value);
    });

    birth.addEventListener('keyup',e=>{
        checkSign.checkBirth(e.target,e.target.value);
    });
    birth.addEventListener('paste',e=>{
        checkSign.checkBirth(e.target,e.target.value);
    });

    email.addEventListener('keyup',e=>{
        checkSign.checkMail(e.target,e.target.value);
    });
    email.addEventListener('paste',e=>{
        checkSign.checkMail(e.target,e.target.value);
    });

    tel.addEventListener('keyup',e=>{
        checkSign.checkTel(e.target,e.target.value);
    });
    tel.addEventListener('paste',e=>{
        checkSign.checkTel(e.target,e.target.value);
    });
    
    if(checkSign.checkName(name,name.value)&&checkSign.checkPwd(pwd,pwd.value)&&checkSign.checkNickName(nickName,nickName.value)&&checkSign.checkBirth(birth,birth.value)&&checkSign.checkTel(tel,tel.value)&&memberForm.checkValidity()){
        let userObj={};

        userObj.image=imgSrc.getAttribute('src');
        userObj.name=name.value;
        userObj.password=pwd.value;
        userObj['nick name']=nickName.value;
        userObj.birthday=birth.value;
        userObj.tel=tel.value;
        userObj.email=email.value;
        userObj.height=height.value ? height.value:"";
        userObj.weight=weight.value ? weight.value:"";
        userObj.PopArea=popArea.value;
        userObj['PopArea selectedIndex']=popArea.selectedIndex;
        userObj.style=style.value;
        userObj['style selectedIndex']=style.selectedIndex;
        userObj['outfit price']=price.value;
        userObj['outfit price selectedIndex']=price.selectedIndex;
        userObj['love store']=loveStore.value ? loveStore.value:"";
        userObj.introduce=introduce.value ? introduce.value:"";
        if(male.checked===true){
            userObj.sex='Male';
        }else{
            userObj.sex='Female';
        }
        const outfitpalsId=Number(cookieValue('outfitpalsId'));
        const outfitpalsToken=cookieValue('outfitpalsToken');

        await ajaxMember.patchUsers(outfitpalsId,outfitpalsToken,userObj);
        location.href=`${locationUrl}member.html`;
        signUpPhoto.src=imgSrc.getAttribute('src');
        name.value='';
        pwd.value='';
        nickName.value='';
        birth.value='';
        tel.value='';
        email.value='';
        height.value='';
        weight.value='';
        popArea.selectedIndex=0;
        style.selectedIndex=0;
        price.selectedIndex=0;
        loveStore.value='';
        introduce.value='';
    }else{
        console.log('all false');
    }
};