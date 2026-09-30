# WebUI Lab

Web Programming 課程實作專案。

## 專案說明

練習 HTML、CSS、JavaScript、Git、GitHub 與 FastAPI 靜態網站部署的教務儀表板原型。畫面使用虛構範例資料，尚未連接登入或真實教務資料。

## 專案規劃

- **問題**：教務工作需要快速查看常用功能與摘要；本專案用儀表板原型練習資訊分區與導覽。
- **目標使用者**：課程展示情境中的教師或教務人員；尚未進行實際使用者訪談。
- **核心功能**：切換儀表板功能、查看範例摘要卡片、切換深色模式。
- **資料**：`public/json/` 中的虛構導覽項目與摘要資料。
- **外部 API**：目前沒有；資料由靜態 JSON 提供。
- **安全與隱私**：目前沒有真正的登入，也不存放真實師生資料；公開網站中的前端與 JSON 資料皆可被訪客讀取。
- **MVP 範圍**：完成響應式靜態儀表板與範例資料展示；資料庫、真實帳號驗證與教務系統整合不在目前範圍。

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
├── css/style.css
├── js/app.js
└── json/
    ├── teacher_ops.json
    └── dashboard_cards.json
server.py
requirements.txt
```

## GitHub 隱私提醒

請勿將學號、密碼、token、憑證、真實教務資料或其他個人資料提交到 repo。前端 HTML、CSS、JavaScript 與 JSON 都可被網站訪客讀取。
