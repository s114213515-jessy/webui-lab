# WebUI Lab

Web Programming 課程實作專案。

## 專案說明

練習 HTML、CSS、JavaScript、Git、GitHub 與 FastAPI 靜態網站部署的教務儀表板原型。畫面使用虛構範例資料，尚未連接登入或真實教務資料。

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
