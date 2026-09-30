from pathlib import Path

from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

PUBLIC_DIR = Path(__file__).resolve().parent / "public"

if not (PUBLIC_DIR / "index.html").is_file():
    raise RuntimeError(f"Static site entry point not found: {PUBLIC_DIR / 'index.html'}")

app = FastAPI(title="WebUI Lab")
app.mount(
    "/",
    StaticFiles(directory=str(PUBLIC_DIR), html=True),
    name="public",
)
