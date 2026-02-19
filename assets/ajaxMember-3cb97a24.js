import{a as l,b as a,l as r}from"./main-397cca7a.js";function i(s){const e=document.cookie.split(";").find(t=>{if(t.split("=")[0].trim()===s)return t});return e===void 0?void 0:e.split("=")[1]}const o=document.querySelector(".memberSpinner"),m={data:[],async getUserData(s){try{const e=await l.get(`${a}440/users/${s}`,{headers:{authorization:`Bearer ${i("outfitpalsToken")}`}});return this.data=e.data,this.data}catch(e){this.signOut(),console.log(e.response)}},async register(s){try{o.classList.remove("d-none");const e=await l.post(`${a}register`,s);if(e.status===201){console.log(e),document.cookie=`outfitpalsToken=${e.data.accessToken}`,document.cookie=`outfitpalsId=${e.data.user.id}`,document.cookie=`outfitpalsThirdParty=${e.data.user["third party"]}`;const t=Number(i("outfitpalsId")),n=i("outfitpalsToken");await this.patchUsers(t,n,{"sign time":new Date().toUTCString()}),await this.postPersonal(),signUpMail.value=account.value,signUpPwd.value=pwd.value,o.classList.add("d-none"),memberIndex.classList.add("opacity-0"),setTimeout(()=>{account.value="",pwd.value="",memberIndex.classList.add("d-none"),memberSignUpData.classList.remove("d-none"),setTimeout(()=>{memberSignUpData.classList.remove("opacity-0")},0)},400)}}catch(e){console.log(e),memberIndexForm.classList.add("was-validated"),account.classList.add("is-invalid"),account.classList.add("is-invalid-customer"),account.nextElementSibling.textContent=e.response.data,o.classList.add("d-none"),this.signOut()}},async postPersonal(){try{const s=await l.post(`${a}personal`,{isopen:!1,userId:Number(i("outfitpalsId")),otherdate:[],pos1:"請填寫",pos2:"請填寫",pos3:"請填寫",pos4:"請填寫",okday:[],oktime:"12:00~12:00"})}catch(s){console.log(s.response)}},async deleteUser(s){try{o.classList.remove("d-none");const e=await l.delete(`${a}600/users/${s}`,{headers:{authorization:`Bearer ${i("outfitpalsToken")}`}});o.classList.add("d-none"),location.href=`${r}member.html`,document.cookie="outfitpalsToken= ''",document.cookie="outfitpalsId= ''",document.cookie="outfitpalsThirdParty= ''"}catch(e){console.log(e.response)}},async patchUsers(s,e,t){try{o.classList.remove("d-none");const n=await l.patch(`${a}600/users/${s}`,t,{headers:{authorization:`Bearer ${e}`}});o.classList.add("d-none")}catch(n){o.classList.add("d-none"),this.signOut(),console.log(n.response)}},async signIn(s){try{o.classList.remove("d-none");const e=await l.post(`${a}signin`,s);e.status===200&&(document.cookie=`outfitpalsToken=${e.data.accessToken}`,document.cookie=`outfitpalsId=${e.data.user.id}`,document.cookie=`outfitpalsThirdParty=${e.data.user["third party"]}`,this.data=e.data.user,o.classList.add("d-none"),memberIndex.classList.add("opacity-0"),setTimeout(()=>{account.value="",pwd.value="",memberIndex.classList.add("d-none"),memberSignInProfile.classList.remove("d-none"),setTimeout(()=>{memberSignInProfile.classList.remove("opacity-0")},0)},400),location.href=`${r}member.html`)}catch(e){console.log(e.response.data),o.classList.add("d-none"),memberIndexForm.classList.add("was-validated"),e.response.data.includes("user")?(account.classList.add("is-invalid"),account.nextElementSibling.textContent=e.response.data,account.setAttribute("style","border-color: var(--bs-form-invalid-border-color);background-image: url('../assets/images/member/invalid.png');background-repeat: no-repeat;background-position: right calc(0.375em + 0.1875rem) center;background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);")):(pwd.classList.add("is-invalid"),pwd.nextElementSibling.textContent=e.response.data,pwd.setAttribute("style","border-color: var(--bs-form-invalid-border-color);background-image: url('../assets/images/member/invalid.png');background-repeat: no-repeat;background-position: right calc(0.375em + 0.1875rem) center;background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);"))}},async signOut(){o.classList.remove("d-none"),document.cookie="outfitpalsToken= ''",document.cookie="outfitpalsId= ''",document.cookie="outfitpalsThirdParty= ''",o.classList.add("d-none"),location.href=`${r}member.html`},async renderMemberSignInProfileForm(){try{const s=Number(i("outfitpalsId")),e=i("outfitpalsToken");o.classList.remove("d-none"),this.data=(await l.get(`${a}600/users/${s}`,{headers:{authorization:`Bearer ${e}`}})).data,o.classList.add("d-none");let t=`
            <div class="row mb-3 fs-lg-5">
                <div class="col">
                    <div class="mb-3 d-flex flex-column align-items-center">
                        <img class="mb-3" src="${this.data.image}" alt="profile pic" style="width: 80px;height: 80px;border-radius: 50%;">
                    </div>
                </div>
            </div>
            <div class="row justify-content-center align-items-center mb-3 fs-lg-5 fs-lg=5">
                <div class="col-4 col-lg-2">
                    <p>姓名</p>
                </div>
                <div class="col-6 col-lg-4 col-xl-3">
                    <p class="fs-lg-5">${this.data.name}</p>
                </div>
            </div>
            <div class="row justify-content-center align-items-center mb-3 fs-lg-5">
                <div class="col-4 col-lg-2">
                    <p>密碼</p>
                </div>
                <div class="col-6 col-lg-4 col-xl-3">
                    <p class="fs-lg-5">********</p>
                </div>
            </div>
            <div class="row justify-content-center align-items-center mb-3 fs-lg-5">
                <div class="col-4 col-lg-2">
                    <p>暱稱</p>
                </div>
                <div class="col-6 col-lg-4 col-xl-3">
                    <p class="fs-lg-5">${this.data["nick name"]}</p>
                </div>
            </div>
            <div class="row justify-content-center align-items-center mb-3 fs-lg-5">
                <div class="col-4 col-lg-2">
                    <p>生日</p>
                </div>
                <div class="col-6 col-lg-4 col-xl-3">
                    <p class="fs-lg-5">${this.data.birthday}</p>
                </div>
            </div>
            <div class="row justify-content-center align-items-center mb-3 fs-lg-5">
                <div class="col-4 col-lg-2">
                    <p>電子信箱</p>
                </div>
                <div class="col-6 col-lg-4 col-xl-3">
                    <p class="fs-lg-5">${this.data.email}</p>
                </div>
            </div>
            <div class="row justify-content-center align-items-center mb-3 fs-lg-5">
                <div class="col-4 col-lg-2">
                    <p>手機號碼</p>
                </div>
                <div class="col-6 col-lg-4 col-xl-3">
                    <p class="fs-lg-5">${this.data.tel}</p>
                </div>
            </div>
            <div class="row justify-content-center align-items-center mb-3 fs-lg-5">
                <div class="col-4 col-lg-2">
                    <p>性別</p>
                </div>
                <div class="col-6 col-lg-4 col-xl-3">
                    <p class="fs-lg-5">${this.data.sex}</p>
                </div>
            </div>
            <div class="row justify-content-center align-items-center mb-3 fs-lg-5">
                <div class="col-4 col-lg-2">
                    <p>身高</p>
                </div>
                <div class="col-6 col-lg-4 col-xl-3">
                    <p class="fs-lg-5">${this.data.height}</p>
                </div>
            </div>
            <div class="row justify-content-center align-items-center mb-3 fs-lg-5">
                <div class="col-4 col-lg-2">
                    <p>體重</p>
                </div>
                <div class="col-6 col-lg-4 col-xl-3">
                    <p class="fs-lg-5">${this.data.weight}</p>
                </div>
            </div>
            <div class="row justify-content-center align-items-center mb-3 fs-lg-5">
                <div class="col-4 col-lg-2">
                    <p>活動範圍</p>
                </div>
                <div class="col-6 col-lg-4 col-xl-3">
                    <p class="fs-lg-5">${this.data.PopArea}</p>
                </div>
            </div>
            <div class="row justify-content-center align-items-center mb-3 fs-lg-5">
                <div class="col-4 col-lg-2">
                    <p>打扮風格</p>
                </div>
                <div class="col-6 col-lg-4 col-xl-3">
                    <p class="fs-lg-5">${this.data.style}</p>
                </div>
            </div>
            <div class="row justify-content-center align-items-center mb-3 fs-lg-5">
                <div class="col-4 col-lg-2">
                    <p>穿搭價位</p>
                </div>
                <div class="col-6 col-lg-4 col-xl-3">
                    <p class="fs-lg-5">${this.data["outfit price"]}</p>
                </div>
            </div>
            <div class="row justify-content-center align-items-center mb-3 fs-lg-5">
                <div class="col-4 col-lg-2">
                    <p>逛街愛店</p>
                </div>
                <div class="col-6 col-lg-4 col-xl-3">
                    <p class="fs-lg-5">${this.data["love store"]}</p>
                </div>
            </div>
            <div class="row justify-content-center align-items-start mb-3 fs-lg-5">
                <div class="col-4 col-lg-2">
                    <p>自我介紹</p>
                </div>
                <div class="col-6 col-lg-4 col-xl-3">
                    <p class="fs-lg-5">${this.data.introduce}</p>
                </div>
            </div>
            <div class="row justify-content-center py-9 py-lg-13 c-confirm-btn-group">
                <div class="col-6 col-sm-3 d-flex">
                    <button class="btn btn-black18 fs-lg-5 text-primary py-lg-3 px-lg-7 flex-grow-1 memberSignInProfileRevise" type="button">修改</button>
                </div>
            </div>
            <div class="row justify-content-center py-9 py-lg-13 c-confirm-btn-group">
                <div class="col-6 col-sm-3 d-flex">
                    <a href='personal.html?page=1' class="btn btn-black18 fs-lg-5 text-primary py-lg-3 px-lg-7 flex-grow-1 memberMainPage" type="button">我的主頁</a>
                </div>
            </div>
            <div class="row justify-content-center py-9 py-lg-13 c-confirm-btn-group">
                <div class="col-6 col-sm-3 d-flex">
                <button class="btn btn-black18 fs-lg-5 text-primary py-lg-3 px-lg-7 flex-grow-1 memberSignOut" type="button">登出</button>
                </div>
            </div>`;memberSignInProfileForm.innerHTML=t,memberSignInProfileForm.addEventListener("click",c=>{c.target.className.includes("memberSignInProfileRevise")&&(this.renderMemberSignInForm(),memberSignInProfile.classList.add("opacity-0"),setTimeout(()=>{memberSignInProfile.classList.add("d-none"),memberSignInData.classList.remove("d-none"),setTimeout(()=>{memberSignInData.classList.remove("opacity-0")},0)},400))}),document.querySelector(".memberSignOut").addEventListener("click",c=>{c.preventDefault(),this.signOut()})}catch(s){console.log(s.response),this.signOut()}},renderMemberSignInForm(){let s=`
        <div class="row mb-3 fs-lg-5">
            <div class="col">
            <div class="mb-3 d-flex flex-column align-items-center">
                <img class="signInPhoto mb-3" src="${this.data.image}" alt="profile pic" style="width: 80px;height: 80px;border-radius: 50%;">
                <label for="signInImg" class="signInImg form-label text-secondary">選擇大頭貼</label>
                <input class="form-control d-none" type="file" id="signInImg" accept="image/png,image/jpeg,image/gif,image/png">
            </div>
            </div>
        </div>
        <div class="row justify-content-center align-items-center mb-3 fs-lg-5 fs-lg=5">
            <div class="col-lg-2 d-flex align-items-center mb-3 mb-lg-0">
            <span class="material-symbols-outlined fs-lg-5 me-2">
                star
            </span>
            <label for="signInName" class="form-label">姓名</label>
            </div>
            <div class="col-lg-6">
            <input type="name" name="name" class="form-control fs-lg-5 py-lg-3 px-lg-7" id="signInName" placeholder="請輸入姓名" value="${this.data.name}" required>
            <div class="invalid-feedback">
                請輸入姓名
            </div>
            </div>
        </div>
        <div class="row justify-content-center align-items-center mb-3 fs-lg-5">
            <div class="col-lg-2 d-flex align-items-center mb-3 mb-lg-0">
            <span class="material-symbols-outlined fs-lg-5 me-2">
                star
            </span>
            <label for="signInPwd" class="form-label">密碼</label>
            </div>
            <div class="col-lg-6">
            <input type="password" name="pwd" class="form-control fs-lg-5 py-lg-3 px-lg-7" id="signInPwd" placeholder="請輸入密碼" required>
            <div class="invalid-feedback">
                請輸入密碼
            </div>
            </div>
        </div>
        <div class="row justify-content-center align-items-center mb-3 fs-lg-5">
            <div class="col-lg-2 d-flex align-items-center mb-3 mb-lg-0">
            <span class="material-symbols-outlined fs-lg-5 me-2">
                star
            </span>
            <label for="signInNickName" class="form-label">暱稱</label>
            </div>
            <div class="col-lg-6">
            <input type="text" name="nick name" class="form-control fs-lg-5 py-lg-3 px-lg-7" id="signInNickName" placeholder="請輸入暱稱" value="${this.data["nick name"]}" required>
            <div class="invalid-feedback">
                請輸入暱稱
            </div>
            </div>
        </div>
        <div class="row justify-content-center align-items-center mb-3 fs-lg-5">
            <div class="col-lg-2 d-flex align-items-center mb-3 mb-lg-0">
            <span class="material-symbols-outlined fs-lg-5 me-2">
                star
            </span>
            <label for="signInBirth" class="form-label">生日</label>
            </div>
            <div class="col-lg-6">
            <input type="date" name="birthday" class="form-control fs-lg-5 py-lg-3 px-lg-7" id="signInBirth" placeholder="請輸入生日" value="${this.data.birthday}" required>
            <div class="invalid-feedback">
                請輸入生日
            </div>
            </div>
        </div>
        <div class="row justify-content-center align-items-center mb-3 fs-lg-5">
            <div class="col-lg-2 d-flex align-items-center mb-3 mb-lg-0">
            <span class="material-symbols-outlined fs-lg-5 me-2">
                star
            </span>
            <label for="signInMail" class="form-label">電子信箱</label>
            </div>
            <div class="col-lg-6">
            <input type="email" name="email" class="form-control fs-lg-5 py-lg-3 px-lg-7" id="signInMail" placeholder="請輸入電子信箱" value="${this.data.email}" required>
            <div class="invalid-feedback">
                請輸入電子信箱
            </div>
            </div>
        </div>
        <div class="row justify-content-center align-items-center mb-3 fs-lg-5">
            <div class="col-lg-2 d-flex align-items-center mb-3 mb-lg-0">
            <span class="material-symbols-outlined fs-lg-5 me-2">
                star
            </span>
            <label for="signInTel" class="form-label">手機號碼</label>
            </div>
            <div class="col-lg-6">
            <input type="tel" name="tel" class="form-control fs-lg-5 py-lg-3 px-lg-7" id="signInTel" placeholder="請輸入手機號碼" value="${this.data.tel}" required>
            <div class="invalid-feedback">
                請輸入手機號碼
            </div>
            </div>
        </div>
        <div class="row justify-content-center align-items-center mb-3 fs-lg-5">
            <div class="col-lg-2 d-flex align-items-center mb-3 mb-lg-0">
            <span class="material-symbols-outlined fs-lg-5 me-2">
                star
            </span>
            <label for="signInSex" class="form-label">性別</label>
            </div>
            <div class="col-lg-6">
            <input class="form-check-input" type="radio" name="性別" id="signInMale" ${this.data.sex==="Male"?"checked":""}>
            <label class="form-check-label" for="signInMale" required>
                男生
            </label>
            <input class="form-check-input" type="radio" name="性別" id="signInFemale" ${this.data.sex==="Female"?"checked":""}>
            <label class="form-check-label" for="signInFemale">
                女生
            </label>
            <div class="invalid-feedback">
                請選擇性別
            </div>
            </div>
        </div>
        <div class="row justify-content-center align-items-center mb-3 fs-lg-5">
            <div class="col-lg-2 mb-3 mb-lg-0">
            <span class="material-symbols-outlined" style="color: transparent;">
                star
            </span>
            <label for="signInHeight" class="form-label">身高</label>
            </div>
            <div class="col-lg-6">
            <input type="number" class="form-control fs-lg-5 py-lg-3 px-lg-7" id="signInHeight" placeholder="請輸入身高" name="身高" value="${this.data.height}">
            </div>
        </div>
        <div class="row justify-content-center align-items-center mb-3 fs-lg-5">
            <div class="col-lg-2 mb-3 mb-lg-0">
            <span class="material-symbols-outlined" style="color: transparent;">
                star
            </span>
            <label for="signInWeight" class="form-label">體重</label>
            </div>
            <div class="col-lg-6">
            <input type="number" class="form-control fs-lg-5 py-lg-3 px-lg-7" id="signInWeight" placeholder="請輸入體重" name="體重" value="${this.data.weight}">
            </div>
        </div>
        <div class="row justify-content-center align-items-center mb-3 fs-lg-5">
            <div class="col-lg-2 mb-3 mb-lg-0">
            <span class="material-symbols-outlined" style="color: transparent;">
                star
            </span>
            <label for="signInPopArea" class="form-label">活動範圍</label>
            </div>
            <div class="col-lg-6">
            <select class="form-select fs-lg-5 py-lg-3 px-lg-7" id="signInPopArea" name="活動範圍">
                <option value="" disabled>請選擇活動範圍</option>
                <option>台北市</option>
                <option>新北市</option>
                <option>桃園市</option>
                <option>新竹市</option>
                <option>台中市</option>
                <option>苗栗市</option>
                <option>台南市</option>
                <option>高雄市</option>
                <option>屏東市</option>
                <option>宜蘭市</option>
                <option>花蓮市</option>
                <option>台東市</option>
                <option>綠島</option>
                <option>金門</option>
                <option>馬祖</option>
            </select>
            </div>
        </div>
        <div class="row justify-content-center align-items-center mb-3 fs-lg-5">
            <div class="col-lg-2 mb-3 mb-lg-0">
            <span class="material-symbols-outlined" style="color: transparent;">
                star
            </span>
            <label for="signInStyle" class="form-label">打扮風格</label>
            </div>
            <div class="col-lg-6">
            <select class="form-select fs-lg-5 py-lg-3 px-lg-7" id="signInStyle" name="打扮風格">
                <option value="" disabled>請選擇打扮風格</option>
                <option>日系</option>
                <option>韓系</option>
                <option>中國風</option>
                <option>歐系</option>
                <option>美系</option>
            </select>
            </div>
        </div>
        <div class="row justify-content-center align-items-center mb-3 fs-lg-5">
            <div class="col-lg-2 mb-3 mb-lg-0">
            <span class="material-symbols-outlined" style="color: transparent;">
                star
            </span>
            <label for="signInOutfitPrice" class="form-label">穿搭價位</label>
            </div>
            <div class="col-lg-6">
            <select class="form-select fs-lg-5 py-lg-3 px-lg-7" id="signInOutfitPrice" name="穿搭價位">
                <option value="" disabled>請選擇穿搭價位</option>
                <option>$1,000 以下</option>
                <option>$2,001～$3,000</option>
                <option>$3,001～$4,000</option>
                <option>$4,001～$5,000</option>
                <option>$5,001～$6,000</option>
                <option>無上限</option>
            </select>
            </div>
        </div>
        <div class="row justify-content-center align-items-center mb-3 fs-lg-5">
            <div class="col-lg-2 mb-3 mb-lg-0">
            <span class="material-symbols-outlined" style="color: transparent;">
                star
            </span>
            <label for="signInLoveStore" class="form-label">逛街愛店</label>
            </div>
            <div class="col-lg-6">
            <input type="text" class="form-control fs-lg-5 py-lg-3 px-lg-7" id="signInLoveStore" placeholder="請輸入逛街愛店" name="逛街愛店" value="${this.data["love store"]}">
            </div>
        </div>
        <div class="row justify-content-center align-items-start mb-3 fs-lg-5">
            <div class="col-lg-2 mb-3 mb-lg-0">
            <span class="material-symbols-outlined" style="color: transparent;">
                star
            </span>
            <label for="signInIntroduce" class="form-label">自我介紹</label>
            </div>
            <div class="col-lg-6">
            <textarea class="form-control fs-lg-5 py-lg-3 px-lg-7" name="自我介紹" id="signInIntroduce" cols="30" rows="10" placeholder="請輸入自我介紹">${this.data.introduce}</textarea>
            </div>
        </div>
        <div class="row justify-content-center align-items-start fs-lg-5">
            <div class="col-lg-8 d-flex align-items-center">
            <span class="material-symbols-outlined fs-lg-5 me-2">
                star
            </span>
            <span>為必填欄位</p>
            </div>
        </div>
        <div class="row justify-content-center py-9 py-lg-13 c-confirm-btn-group">
            <div class="col-6 col-lg-3 d-flex">
                <button class="btn btn-black18 fs-lg-5 text-primary py-lg-3 px-lg-7 flex-grow-1 memberSignInReviseSubmit" type="submit">修改</button>
            </div>
            <div class="col-6 col-lg-3 d-flex">
                <button class="btn btn-black18 fs-lg-5 text-primary py-lg-3 px-lg-7 flex-grow-1 memberSignInReviseCancel" type="button">取消</button>
            </div>
        </div>`;if(memberSignInForm.innerHTML=s,i("outfitpalsThirdParty")==="google"){const n=document.getElementById("signInPwd"),c=document.getElementById("signInMail");n.value=this.data["g-pwd"],n.setAttribute("disabled",""),c.setAttribute("disabled","")}document.getElementById("signInPopArea").selectedIndex=this.data["PopArea selectedIndex"],document.getElementById("signInStyle").selectedIndex=this.data["style selectedIndex"],document.getElementById("signInOutfitPrice").selectedIndex=this.data["outfit price selectedIndex"];const e=document.getElementById("signInImg"),t=document.querySelector(".signInPhoto");e.addEventListener("change",n=>{let c=new FileReader;c.addEventListener("load",d=>{t.setAttribute("src",d.target.result)}),c.readAsDataURL(n.target.files[0])})},async postPosts(s){try{await this.getUserData(i("outfitpalsId")),s.author=this.data.name,s.postTime=new Date().toUTCString();const e=await l.post(`${a}600/posts`,s,{headers:{authorization:`Bearer ${i("outfitpalsToken")}`}});console.log(e)}catch(e){console.log(e.response),this.signOut()}},async getPosts(){try{return(await l.get(`${a}600/posts?userId=${i("outfitpalsId")}`,{headers:{authorization:`Bearer ${i("outfitpalsToken")}`}})).data}catch(s){console.log(s.response),this.signOut()}},async getPostsById(s){try{return(await l.get(`${a}440/posts?PostId=${s}`,{headers:{authorization:`Bearer ${i("outfitpalsToken")}`}})).data}catch(e){console.log(e.response),this.signOut()}},async deletePosts(s){try{const e=await l.delete(`${a}600/posts/${s}`,{headers:{authorization:`Bearer ${i("outfitpalsToken")}`}});console.log(e)}catch(e){console.log(e.response)}},async postComment(s){try{s.postTime=new Date().toUTCString();const e=await l.post(`${a}600/comments`,s,{headers:{authorization:`Bearer ${i("outfitpalsToken")}`}});console.log(e)}catch(e){console.log(e.response),this.signOut()}},async getComment(s){try{return(await l.get(`${a}440/comments/${s}`,{headers:{authorization:`Bearer ${i("outfitpalsToken")}`}})).data}catch(e){console.log(e.response),this.signOut()}},async deleteComment(s){try{const e=await l.delete(`${a}600/comments/${s}`,{headers:{authorization:`Bearer ${i("outfitpalsToken")}`}});console.log(e)}catch(e){console.log(e.response)}},async patchComment(s,e){try{const t=await l.patch(`${a}660/comments/${s}`,e,{headers:{authorization:`Bearer ${i("outfitpalsToken")}`}});return console.log(t),t}catch(t){console.log(t.response),this.signOut()}},async getAllUserComment(s){try{return(await l.get(`${a}440/comments?userId=${s}`,{headers:{authorization:`Bearer ${i("outfitpalsToken")}`}})).data}catch(e){console.log(e.response),this.signOut()}},async getAllPostComment(s){try{return(await l.get(`${a}440/comments?posterId=${s}`,{headers:{authorization:`Bearer ${i("outfitpalsToken")}`}})).data}catch(e){console.log(e.response),this.signOut()}},async getPostComment(s,e){try{return(await l.get(`${a}440/comments?posterId=${s}&_sort=id&_order=desc&_limit=2&_page=${e}`,{headers:{authorization:`Bearer ${i("outfitpalsToken")}`}})).data}catch(t){console.log(t.response),this.signOut()}},async getUserComment(s,e){try{return(await l.get(`${a}440/comments?userId=${s}&_sort=id&_order=desc&_limit=2&_page=${e}`,{headers:{authorization:`Bearer ${i("outfitpalsToken")}`}})).data}catch(t){console.log(t.response),this.signOut()}},async postProfile(s){try{const e=await l.post(`${a}profile`,s)}catch(e){console.log(e.response),this.signOut()}},async getProfile(){try{const s=(await l.get(`${a}profile`)).data}catch(s){console.log(s.response),this.signOut()}},async deleteProfile(s){try{const e=await l.delete(`${a}600/profile/${s}`,{headers:{authorization:`Bearer ${i("outfitpalsToken")}`}})}catch(e){console.log(e.response)}},async patchPersonalOtherday(s,e){try{const t=(await l.get(`${a}personal?userId=${s}`)).data[0];t.otherdate.push(e);const n=(await l.patch(`${a}personal/${s}`,t)).data;console.log(n)}catch(t){console.log(t.response),this.signOut()}}};export{m as a,i as c};
