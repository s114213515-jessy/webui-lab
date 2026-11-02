from pathlib import Path

from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles

PUBLIC_DIR = Path(__file__).resolve().parent / "public"

if not (PUBLIC_DIR / "index.html").is_file():
    raise RuntimeError(f"Static site entry point not found: {PUBLIC_DIR / 'index.html'}")

app = FastAPI(title="WebUI Lab")

ROOT_ITEMS = [
    {"cid": 1, "name": "Department", "n": 3},
    {"cid": 2, "name": "Semester", "n": 2},
    {"cid": 3, "name": "Course", "n": 3},
    {"cid": 4, "name": "Member", "n": 4},
    {"cid": 5, "name": "Section", "n": 3},
]

ROOT_OBJECTS = {
    1: [
        {"code": "CSIE", "name": "資訊工程學系", "college": "科技學院", "status": "開設中"},
        {"code": "IM", "name": "資訊管理學系", "college": "管理學院", "status": "開設中"},
        {"code": "EE", "name": "電機工程學系", "college": "科技學院", "status": "開設中"},
    ],
    2: [
        {"code": "2026-F", "name": "2026 秋季學期", "year": "2026", "status": "進行中"},
        {"code": "2027-S", "name": "2027 春季學期", "year": "2027", "status": "規劃中"},
    ],
    3: [
        {"code": "CS101", "name": "程式設計入門", "department": "資訊工程學系", "credits": 3},
        {"code": "IM205", "name": "資料庫系統", "department": "資訊管理學系", "credits": 3},
        {"code": "CS220", "name": "網頁程式設計", "department": "資訊工程學系", "credits": 3},
    ],
    4: [
        {"code": "T001", "name": "王老師", "role": "教師", "department": "資訊工程學系"},
        {"code": "T002", "name": "林老師", "role": "教師", "department": "資訊管理學系"},
        {"code": "S001", "name": "陳同學", "role": "學生", "department": "資訊工程學系"},
        {"code": "S002", "name": "李同學", "role": "學生", "department": "資訊管理學系"},
    ],
    5: [
        {"code": "CS101-A", "name": "程式設計入門（一）", "course": "CS101", "capacity": 40},
        {"code": "IM205-A", "name": "資料庫系統（一）", "course": "IM205", "capacity": 45},
        {"code": "CS220-A", "name": "網頁程式設計（一）", "course": "CS220", "capacity": 35},
    ],
}


@app.get("/api/root")
def get_root_items():
    return ROOT_ITEMS


@app.get("/api/root/co/{cid}")
def get_root_objects(cid: int):
    if cid not in ROOT_OBJECTS:
        raise HTTPException(status_code=404, detail="找不到這個分類。")
    return ROOT_OBJECTS[cid]


app.mount(
    "/",
    StaticFiles(directory=str(PUBLIC_DIR), html=True),
    name="public",
)
