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

## W1：環境與 Git

首頁提供 W1 課程入口，或直接開啟 `public/w01.html`。教材整理 VS Code、Node.js、Git 和 GitHub
各自負責的工作，並說明終端機檢查、PATH、`.gitignore`、本機 commit 與遠端 push 的差別。
本機預覽命令如下，服務只綁定 `127.0.0.1`：

```powershell
npx.cmd http-server public -p 3000 -a 127.0.0.1
```

```text
http://127.0.0.1:3000/
```

按 `Ctrl+C` 停止服務。不要為了方便就把開發預覽公開到網路。

## W2：Web UI and HTML

首頁提供 W2 課程入口，或直接開啟 `public/w02.html`。教材介紹頁面區域、語意化 HTML 標籤
（如 `header`、`nav`、`main`、`aside`、`section`、`form`），並用 Problem、Target Users、
Core Features、Data、Security / Privacy 和 MVP 練習規劃網站。

```text
http://127.0.0.1:7777/w02.html
```

## W3：從本機開發到公開部署

首頁提供 W3 課程入口，或直接開啟 `public/w03.html`。教材說明 ASGI、Uvicorn、FastAPI 靜態檔案服務，
以及 IIS URL Rewrite / ARR 反向代理的角色。它也區分本機可用與公開部署驗收；本專案已驗證本機服務，
但 IIS 子路徑和公開網址仍須依授課環境實測。

使用 Python 3.10 以上版本，在 repo 根目錄執行：

```powershell
py -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
uvicorn server:app --reload --host 127.0.0.1 --port 7777
```

```text
http://127.0.0.1:7777/
```

若 PowerShell 阻擋虛擬環境啟動，可在目前終端機暫時執行：

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
.\.venv\Scripts\Activate.ps1
```

公開部署須依授課老師提供的子路徑、網路及防火牆設定操作；未經授權不要以 `0.0.0.0` 對外公開開發伺服器。

## W4：CSS 版面與 RWD

首頁提供 W4 課程入口，或直接開啟 `public/w04.html`。教材整理 Box Model、Grid 與 Flexbox
的用途、CSS 變數和深色模式，以及從手機版開始設計並檢查不同螢幕的 RWD 方法。

```text
http://127.0.0.1:7777/w04.html
```

## W5：JavaScript DOM 與事件處理

首頁提供 W5 課程入口，或直接開啟 `public/w05.html`。教材包含 `app.js` top-down 閱讀、
Event → Function → DOM 心智模型、互動示範、AI Prompt、Debugging 和 Code Review。
頁面使用相對資產路徑，支援網域根目錄或 GitHub Pages 專案子路徑。

```text
http://127.0.0.1:7777/w05.html
```

## W6：Fetch API / AJAX

首頁提供 W6 課程入口，或直接開啟 `public/w06.html`。課程整理 Fetch/AJAX、HTTP 狀態、
API Key 與 OAuth、前端 Secret 安全、CORS / Preflight 和 AI Coding Review。
互動練習只 fetch repo 的範例 JSON，並以不存在的路徑練習 HTTP 404；不呼叫 Google API，
也不包含 OAuth 登入或任何憑證。

```text
http://127.0.0.1:7777/w06.html
```

## W7：Fetch API、API 與 DOM

首頁側邊導覽和摘要卡片共用 `GET /api/root` 的虛構資料；點選分類後，前端呼叫
`GET /api/root/co/{cid}`，並將回應資料的前四個欄位顯示在表格。這是本機端到端練習，
不連接真實校務資料或外部 API。

```text
http://127.0.0.1:7777/w07.html
```

可在瀏覽器 Network 面板觀察請求，再依序檢查 HTTP status、JSON 和 DOM。

## W8：表單與輸入驗證

`public/w08.html` 提供姓名、Email 和密碼欄位的前端驗證練習，使用 `textContent` 安全顯示輸入。
表單只在瀏覽器中驗證，不會送出或保存資料；實際產品仍須由後端再次驗證。

```text
http://127.0.0.1:7777/w08.html
```

## W9：OAuth、使用者登入與 Token

`public/w09.html` 說明 Authentication / Authorization、OAuth 2.0 / OIDC、Token、JWT 與資料最小化，
並提供純前端登入狀態示範。示範不連接 Google、不驗證帳號、不傳送或保存密碼，也不會建立可呼叫 API 的 Token；
不要輸入真實帳密。實際登入與 API 權限檢查必須由後端實作。

```text
http://127.0.0.1:7777/w09.html
```

## 專案結構

```text
public/
├── index.html
├── css/
│   ├── style.css
│   ├── w05.css
│   ├── w06.css
│   ├── w07.css
│   ├── w08.css
│   └── w09.css
├── js/
│   ├── app.js
│   ├── w05.js
│   ├── w06.js
│   ├── w08.js
│   └── w09.js
├── w01.html
├── w02.html
├── w03.html
├── w04.html
├── w05.html
├── w06.html
├── w07.html
├── w08.html
├── w09.html
└── json/
    ├── teacher_ops.json
    └── dashboard_cards.json
server.py
requirements.txt
```

## GitHub 隱私提醒

請勿將學號、密碼、token、憑證、真實教務資料或其他個人資料提交到 repo。前端 HTML、CSS、JavaScript 與 JSON 都可被網站訪客讀取。
