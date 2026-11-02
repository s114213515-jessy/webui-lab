# WebUI Lab

Web Programming 課程實作專案。

## 專案說明

練習 HTML、CSS、JavaScript、Git、GitHub 與 FastAPI 靜態網站部署的教務儀表板原型。畫面使用虛構範例資料，尚未連接登入或真實教務資料。

## 專案規劃

- **問題**：教務工作需要快速查看常用功能與摘要；本專案用儀表板原型練習資訊分區與導覽。
- **目標使用者**：課程展示情境中的教師或教務人員；尚未進行實際使用者訪談。
- **核心功能**：切換儀表板功能、查看範例摘要卡片、切換深色模式。
- **資料**：`public/json/` 的虛構 W6 範例資料，以及 W7 FastAPI 提供的虛構分類 API。
- **外部 API**：目前沒有；W7 API 是本機示範端點，不連接真實校務資料或外部服務。
- **安全與隱私**：目前沒有真正的登入，也不存放真實師生資料；公開網站中的前端與 JSON 資料皆可被訪客讀取。
- **MVP 範圍**：完成響應式靜態儀表板與範例資料展示；資料庫、真實帳號驗證與教務系統整合不在目前範圍。

## W2：Web UI and HTML

首頁提供 W2 課程入口，或直接開啟 `public/w02.html`。教材介紹頁面區域、語意化 HTML 標籤
（如 `header`、`nav`、`main`、`aside`、`section`、`form`），並用 Problem、Target Users、
Core Features、Data、Security / Privacy 和 MVP 練習規劃網站。

```text
http://127.0.0.1:7777/w02.html
```

## W4：CSS 版面與 RWD

首頁提供 W4 課程入口，或直接開啟 `public/w04.html`。教材整理 Box Model、Grid 與 Flexbox
的用途、CSS 變數和深色模式，以及從手機版開始設計並檢查不同螢幕的 RWD 方法。

```text
http://127.0.0.1:7777/w04.html
```

## W5：JavaScript DOM 與事件處理

首頁提供 W5 課程入口，或直接開啟 `public/w05.html`。教材包含本週目標、`app.js` top-down
閱讀方式、Event → Function → DOM 心智模型、互動示範、AI Prompt 範本、DOM/Event
速查、Debugging 步驟、練習和 Code Review 清單。

本機啟動 FastAPI 後可瀏覽：

```text
http://127.0.0.1:7777/w05.html
```

W5 示範頁使用相對資產路徑，支援將 repo 部署在網域根目錄或 GitHub Pages 專案子路徑。

## W6：Fetch API / AJAX

首頁提供 W6 課程入口，或直接開啟 `public/w06.html`。課程整理 Fetch/AJAX、
HTTP 狀態處理、API Key 與 OAuth、前端 Secret 安全、CORS / Preflight、
Google API 設定檢查與 AI Coding Review。頁面中的互動練習會 fetch 本 repo 的範例 JSON；
「HTTP 404」選項用來練習 HTTP 錯誤處理。這是前端教學示範，不會呼叫 Google API，
也不包含 OAuth 登入或任何憑證。

本機啟動 FastAPI 後可瀏覽：

```text
http://127.0.0.1:7777/w06.html
```

## W7：Fetch API、API 與 DOM

首頁的側邊導覽和摘要卡片共用 `GET /api/root` 的虛構資料；點選分類後，前端呼叫
`GET /api/root/co/{cid}`，再將回應資料的前四個欄位顯示在表格。這是同一來源資料的
端到端練習，不連接真實校務資料或外部 API。

教材頁：

```text
http://127.0.0.1:7777/w07.html
```

可在瀏覽器開發者工具的 Network 面板觀察請求，再依序檢查 HTTP status、JSON 和 DOM。

## W8：表單與輸入驗證

`w08.html` 提供姓名、Email 和密碼欄位的前端驗證練習，並以 `textContent` 安全顯示使用者輸入。
表單只在瀏覽器中驗證，不會送出或保存資料；實際產品仍須由後端再次驗證。

教材頁：

```text
http://127.0.0.1:7777/w08.html
```

## W1：本機預覽

先確認已安裝 Node.js 與 Git。在 repo 根目錄的 PowerShell 執行：

```powershell
npx.cmd http-server public -p 3000 -a 127.0.0.1
```

瀏覽 http://127.0.0.1:3000/。按 `Ctrl+C` 停止伺服器。此設定只供本機預覽，不對區域網路公開。

## W3：FastAPI 本機執行

使用 Python 3.10 以上版本。在 repo 根目錄建立虛擬環境並安裝依賴：

```powershell
py -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
uvicorn server:app --reload --host 127.0.0.1 --port 7777
```

瀏覽 http://127.0.0.1:7777/。若 PowerShell 阻擋虛擬環境啟動，可在目前終端機暫時執行：

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
.\.venv\Scripts\Activate.ps1
```

課程 IIS 部署請依授課老師提供的子路徑、網路及防火牆設定操作。不要未經授權就以 `0.0.0.0` 對外公開開發伺服器。

## 專案結構

```text
public/
├── index.html
├── css/
│   ├── style.css
│   ├── w05.css
│   ├── w06.css
│   ├── w07.css
│   └── w08.css
├── js/
│   ├── app.js
│   ├── w05.js
│   ├── w06.js
│   └── w08.js
├── w02.html
├── w04.html
├── w05.html
├── w06.html
├── w07.html
├── w08.html
└── json/
    ├── teacher_ops.json
    └── dashboard_cards.json
server.py
requirements.txt
```

## GitHub 隱私提醒

請勿將學號、密碼、token、憑證、真實教務資料或其他個人資料提交到 repo。前端 HTML、CSS、JavaScript 與 JSON 都可被網站訪客讀取。
