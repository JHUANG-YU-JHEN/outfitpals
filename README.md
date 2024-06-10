# JS 直播班 ![Alt text](assets/images/logo_white.svg)  

* [GitHub](https://github.com/bftsai/outfitpals/tree/master)  
* [gh-pages](https://bftsai.github.io/outfitpals/)  

## 🕺💃&ensp;作者
  - [Oria Lin](https://github.com/OriaLin) - index、header、footer、建立貼文  
  - [Eric](https://github.com/ERIC955) - 貼文牆  
  - [BF Tsai](https://github.com/bftsai) - 預約、登入、註冊、會員中心  
  - [Jennifer Jhuang](https://github.com/JHUANG-YU-JHEN) - 贊助我們  

## 🖥&ensp;下載專案
> clone 專案  
```
git clone https://github.com/bftsai/outfitpals.git  
```

> 移至專案資料夾  
```
cd localFolder/outfitpals  
```

> 安裝套件  
```
npm install  
```

> 啟動專案  
```
npm run dev  
```

## 📂&ensp;資料夾結構
|-- assets  
|&emsp;&emsp;&emsp;|-- images  
|&emsp;&emsp;&emsp;|&emsp;&emsp;&emsp;|- components  
|&emsp;&emsp;&emsp;|&emsp;&emsp;&emsp;|- create  
|&emsp;&emsp;&emsp;|&emsp;&emsp;&emsp;|- donate  
|&emsp;&emsp;&emsp;|&emsp;&emsp;&emsp;|- index  
|&emsp;&emsp;&emsp;|&emsp;&emsp;&emsp;|- member  
|&emsp;&emsp;&emsp;|&emsp;&emsp;&emsp;|- reserve  
|&emsp;&emsp;&emsp;|-- &emsp;&ensp;js  
|&emsp;&emsp;&emsp;|&emsp;&emsp;&emsp;|- ajaxMember.js   
|&emsp;&emsp;&emsp;|&emsp;&emsp;&emsp;|- componentPagination.js  
|&emsp;&emsp;&emsp;|&emsp;&emsp;&emsp;|- create.js  
|&emsp;&emsp;&emsp;|&emsp;&emsp;&emsp;|- development.js  
|&emsp;&emsp;&emsp;|&emsp;&emsp;&emsp;|- donate.js  
|&emsp;&emsp;&emsp;|&emsp;&emsp;&emsp;|- formValidation.js  
|&emsp;&emsp;&emsp;|&emsp;&emsp;&emsp;|- header.js  
|&emsp;&emsp;&emsp;|&emsp;&emsp;&emsp;|- index.js  
|&emsp;&emsp;&emsp;|&emsp;&emsp;&emsp;|- information.js  
|&emsp;&emsp;&emsp;|&emsp;&emsp;&emsp;|- member_googleAPI.js  
|&emsp;&emsp;&emsp;|&emsp;&emsp;&emsp;|- member.js  
|&emsp;&emsp;&emsp;|&emsp;&emsp;&emsp;|- others.js  
|&emsp;&emsp;&emsp;|&emsp;&emsp;&emsp;|- personal.js  
|&emsp;&emsp;&emsp;|&emsp;&emsp;&emsp;|- reserve.js  
|&emsp;&emsp;&emsp;|-- scss  
|&emsp;&emsp;&emsp;|&emsp;&emsp;&emsp;|- base  
|&emsp;&emsp;&emsp;|&emsp;&emsp;&emsp;|&emsp;&emsp;|- _reboot.scss  
|&emsp;&emsp;&emsp;|&emsp;&emsp;&emsp;|&emsp;&emsp;|- _root.scss  
|&emsp;&emsp;&emsp;|&emsp;&emsp;&emsp;|- components  
|&emsp;&emsp;&emsp;|&emsp;&emsp;&emsp;|&emsp;&emsp;|- _arrowBtn.scss  
|&emsp;&emsp;&emsp;|&emsp;&emsp;&emsp;|&emsp;&emsp;|- _confirmBtnGroup.scss  
|&emsp;&emsp;&emsp;|&emsp;&emsp;&emsp;|&emsp;&emsp;|- _faq.scss  
|&emsp;&emsp;&emsp;|&emsp;&emsp;&emsp;|&emsp;&emsp;|- _pagination.scss  
|&emsp;&emsp;&emsp;|&emsp;&emsp;&emsp;|&emsp;&emsp;|- _switchBtnGroup.scss  
|&emsp;&emsp;&emsp;|&emsp;&emsp;&emsp;|- helpers  
|&emsp;&emsp;&emsp;|&emsp;&emsp;&emsp;|&emsp;&emsp;|- _helper.scss  
|&emsp;&emsp;&emsp;|&emsp;&emsp;&emsp;|&emsp;&emsp;|- _variables-dark.scss  
|&emsp;&emsp;&emsp;|&emsp;&emsp;&emsp;|&emsp;&emsp;|- _variables.scss  
|&emsp;&emsp;&emsp;|&emsp;&emsp;&emsp;|- layout  
|&emsp;&emsp;&emsp;|&emsp;&emsp;&emsp;|&emsp;&emsp;|- _footer.scss  
|&emsp;&emsp;&emsp;|&emsp;&emsp;&emsp;|&emsp;&emsp;|- _header.scss  
|&emsp;&emsp;&emsp;|&emsp;&emsp;&emsp;|- pages  
|&emsp;&emsp;&emsp;|&emsp;&emsp;&emsp;|&emsp;&emsp;|- _create.scss  
|&emsp;&emsp;&emsp;|&emsp;&emsp;&emsp;|&emsp;&emsp;|- _development.scss  
|&emsp;&emsp;&emsp;|&emsp;&emsp;&emsp;|&emsp;&emsp;|- _donate_plan.scss  
|&emsp;&emsp;&emsp;|&emsp;&emsp;&emsp;|&emsp;&emsp;|- _donate.scss  
|&emsp;&emsp;&emsp;|&emsp;&emsp;&emsp;|&emsp;&emsp;|- _index.scss  
|&emsp;&emsp;&emsp;|&emsp;&emsp;&emsp;|&emsp;&emsp;|- _information.scss  
|&emsp;&emsp;&emsp;|&emsp;&emsp;&emsp;|&emsp;&emsp;|- _member.scss  
|&emsp;&emsp;&emsp;|&emsp;&emsp;&emsp;|&emsp;&emsp;|- _reserve.scss  
|&emsp;&emsp;&emsp;|&emsp;&emsp;&emsp;|- utils  
|&emsp;&emsp;&emsp;|&emsp;&emsp;&emsp;|&emsp;&emsp;|- _mixin.scss  
|&emsp;&emsp;&emsp;|&emsp;&emsp;&emsp;|&emsp;&emsp;|- _utilities.scss  
|&emsp;&emsp;&emsp;|&emsp;&emsp;&emsp;|- all.scss  
|-- layout  
|&emsp;&emsp;&emsp;|-- footer.ejs  
|&emsp;&emsp;&emsp;|-- header.ejs  
|-- pages  
|&emsp;&emsp;&emsp;|-- about.html  
|&emsp;&emsp;&emsp;|-- create_setting.html  
|&emsp;&emsp;&emsp;|-- create.html  
|&emsp;&emsp;&emsp;|-- development.html  
|&emsp;&emsp;&emsp;|-- donate_plan.html  
|&emsp;&emsp;&emsp;|-- donate.html  
|&emsp;&emsp;&emsp;|-- index.html  
|&emsp;&emsp;&emsp;|-- information.html  
|&emsp;&emsp;&emsp;|-- member.html  
|&emsp;&emsp;&emsp;|-- others.html  
|&emsp;&emsp;&emsp;|-- personal.html  
|&emsp;&emsp;&emsp;|-- reserve.html  
|-- .gitignore  
|-- changelog-config.cjs  
|-- db.json    
|-- LICENSE  
|-- main.js  
|-- middleware.js  
|-- package-lock.json  
|-- package.json  
|-- README.md  
|-- server.js  
|-- vercel.json  
|-- vite.config.js  

## ![Git](https://img.shields.io/badge/Git-F05032?logo=git&labelColor=000)&ensp;Git 規範  
|-- 💍 test: 增加測試功能 (when adding missing tests)  
|-- 🎸 feat: 新增/修改功能 (Feature)  
|-- 🐛 fix: 修正 Bug (bug fix)  
|-- 🤖 chore: 增加或修改第三方套件(輔助工具)等 (maintain)  
|-- ✏️ docs: 修改/新增文件 (documentation)  
|-- 💡 refactor: 重構 or 優化，不屬於 bug 也不屬於新增功能等  
|-- 💄 style: 修改程式碼格式或風格，不影響原有運作，例如 ESLint (formatting missing semi colons, …)  
|-- 🎡 ci: CI 相關更動(Continuous Integration)  
|-- ⚡️ perf: 提高效能的程式碼修正  

## 🧑‍💻&ensp;前端
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-5C2D91?logo=Visual%20Studio%20Code&labelColor=000)
![Static Badge](https://img.shields.io/badge/HTML5-E34F26?logo=HTML5&logoColor=fff&labelColor=2c2a2a)
![Static Badge](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=fff&labelColor=2c2a2a)
![Static Badge](https://img.shields.io/badge/SASS-CC6699?logo=sass&logoColor=fff&labelColor=2c2a2a)
![Static Badge](https://img.shields.io/badge/Bootstrap_5-7952B3?logo=Bootstrap&logoColor=fff&labelColor=2c2a2a)
![JavaScript](https://img.shields.io/badge/javascript-F7DF1E?logo=javascript&labelColor=000)
![NPM](https://img.shields.io/badge/NPM-CB3837?logo=npm&labelColor=000)
![NodeJS](https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&labelColor=000)
![AXIOS](https://img.shields.io/badge/Axios-5A29E4?logo=axios&labelColor=000)
![JSON](https://img.shields.io/badge/JSON-000000?logo=json&labelColor=000)


## 🎭&ensp;美術  
![Figma](https://img.shields.io/badge/figma-F24E1E?logo=figma&labelColor=000)    

## 🤝&ensp;協作  
![Git](https://img.shields.io/badge/Git-F05032?logo=git&labelColor=000)
![GitHub](https://img.shields.io/badge/Github-181717?logo=github&labelColor=000)
![Github Pages](https://img.shields.io/badge/Github%20pages-222222?logo=githubpages&labelColor=000)
![Discord](https://img.shields.io/badge/Discord-5865F2?logo=discord&labelColor=000)  

## ![Alt text](assets/images/hexschool-icon.png)&ensp;六角學院協助架構
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&labelColor=000)  
### 特別感謝 - 作品指導  
  - 六角學院 / 穎旻老師  
    
### 特別感謝 - 設計協作
  - 六角學院 / 合作設計師  
  - [設計稿](https://www.figma.com/file/eTzdW6lOBUheLSbKyFXZol/六角｜%233----穿搭小精靈預約服務?type=design&node-id=23-132&mode=design&t=H0iPBFia5wcdIVfY-0)  

## 🌄&ensp;圖片素材來源  
- [Google font icon](https://fonts.google.com/icons)  