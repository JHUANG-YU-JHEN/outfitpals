# OutfitPals：虛擬穿搭工作室

![OutfitPals Logo](assets/images/logo_white.svg)

OutfitPals 為響應式多頁網站範例，整合穿搭推薦、捐款方案、會員資料與預約頁面，搭配 Bootstrap 5 和自訂 SASS 模組，並以 Vite 作為建構工具與 JSON Server 模擬後端資料，實現整體前端與串接流程。

## 團隊分工
  - [Oria Lin](https://github.com/OriaLin) - index、header、footer、建立貼文  
  - [Eric](https://github.com/ERIC955) - 貼文牆  
  - [BF Tsai](https://github.com/bftsai) - 預約、登入、註冊、會員中心  
  - [Jennifer Jhuang](https://github.com/JHUANG-YU-JHEN) - 贊助我們 

## 主要特色
- 分頁設計：包含首頁、關於、會員、穿搭建立、捐款、預約等多種內容頁面，展示各區塊互動與資料呈現。
- 組件化 SASS：`assets/scss` 裡的 `base`、`components`、`layout`、`pages`、`utils` 模組讓樣式可維護、功能可複用。
- 前後端模擬：`npm run dev` 時同步啟動 Vite 與 `json-server-auth db.json`，透過 `axios` 呼叫暫存資料，模擬會員登入、捐款與預約流程。
- 本地 API 測試：使用 `db.json` 當資料庫，搭配 `json-server` 支援 REST，開發者可自由修改樣本資料。
- 多頁面佈局：`pages/` 中的 `.html` 與 `layout/` 的 `footer.ejs`、`header.ejs` 共享區塊，加速頁面開發。
- 部署：`npm run deploy` 可將靜態檔上傳至 GitHub Pages。

## 開發環境與啟動流程
1. 取得 repo： `git clone https://github.com/jhuang-yu-jhen/outfitpals.git`
2. 切換目錄： `cd outfitpals`
3. 安裝依賴： `npm install`
4. 設定 Vite 基底路徑（若在 subpath 開發）：
   ```powershell
   $env:VITE_BASE_PATH="/outfitpals/"
   ```
5. 本地開發：`npm run dev` 會啟動 Vite 開發伺服器與 JSON Server-Auth 並同時載入 `db.json`。
6. 如果需要啟動後端 express server：`npm start`（會由 `server.js` 啟動，適合直接在伺服器測試）。
7. 編譯與部署：
   - `npm run build`：產生 `dist/`
   - `npm run preview`：本地預覽 `dist`
   - `npm run deploy`：打包後上傳至 `gh-pages` 分支

## 專案架構
- `assets/`
  - `images/`：封面、圖標等靜態素材
  - `js/`：前端互動腳本
  - `scss/`：頁面樣式
- `layout/`：`header.ejs` 與 `footer.ejs` 共用頁尾與導覽
- `pages/`：靜態頁面 HTML，對應各種功能區塊，包括：
  - `about.html`（關於我們）
  - `create.html`, `create_setting.html`（穿搭建立與設定）
  - `development.html`（開發紀錄）
  - `donate.html`, `donate_plan.html`（捐贈相關）
  - `information.html`（資訊中心）
  - `member.html`（會員中心）
  - `others.html`, `personal.html`, `reserve.html`（其他個人與預約頁）
- 根目錄的其他檔案：
  - `main.js`、`middleware.js`：Vite + Express 中介邏輯
  - `server.js`：自訂 express server
  - `vercel.json`：Vercel 部署設定
  - `vite.config.js`：Vite 設定，包含 `vite-plugin-ejs`
  - `db.json`：JSON Server 資料

## Git 規範
- `test`：新增測試或更新測試腳本
- `feat`：加入新功能或頁面元件
- `fix`：修復錯誤
- `chore`：工具、文件、資源整理
- `docs`：修改 README、說明或其他文案
- `refactor`：重構、不改變功能的程式優化
- `style`：格式調整（如 ESLint 自動格式化）
- `ci`：CI/CD 流程更新
- `perf`：效能調整

## 運用技術與工具
- Vite：快速建置與熱重載
- SASS + Bootstrap 5：模組化樣式與響應式元件
- Axios：跨頁請求 `db.json`
- JSON Server + json-server-auth：模擬 REST API + 權限
- Express / server.js：提供自訂伺服器與 middleware
- commitizen + git-cz：統一 commit 格式
- gh-pages：靜態部署

## 設計資源
- Figma 原型：可參考 [Figma 設計稿](https://www.figma.com/file/eTzdW6lOBUheLSbKyFXZol/?mode=design&t=H0iPBFia5wcdIVfY-0) 了解頁面區塊與互動

## 使用素材
- Google Font Icons：免費圖示資源（https://fonts.google.com/icons）
- 專案內使用多款 badges 展示技術標籤：Vite、Bootstrap、Node.js 等

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
