const nav = document.querySelector("#sidebar-nav");
const pageTitle = document.querySelector("#page-title");
const cardsContainer = document.querySelector("#dashboard-cards");
const statusMessage = document.querySelector("#status-message");
const themeToggle = document.querySelector("#theme-toggle");
const loginButton = document.querySelector("#login-button");
const categoryLabels = {
  Department: "系所",
  Semester: "學期",
  Course: "課程",
  Member: "教職員生",
  Section: "開設班級",
};

async function requestJson(path) {
  const response = await fetch(new URL(path, document.baseURI), {
    headers: { Accept: "application/json" },
  });
  if (!response.ok) {
    throw new Error(`載入 ${path} 失敗：HTTP ${response.status}`);
  }
  return response.json();
}

function renderRootCards(items) {
  cardsContainer.replaceChildren();

  if (items.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.textContent = "目前沒有可顯示的分類。";
    cardsContainer.append(emptyMessage);
    return;
  }

  for (const item of items) {
    const article = document.createElement("article");
    article.className = "card";

    const title = document.createElement("h2");
    title.textContent = categoryLabels[item.name] ?? item.name;

    const description = document.createElement("p");
    description.textContent = "從 API 載入的分類摘要";

    const value = document.createElement("p");
    value.className = "card-value";
    value.textContent = String(item.n);

    const detailButton = document.createElement("button");
    detailButton.className = "card-action";
    detailButton.type = "button";
    detailButton.textContent = "查看詳情";
    detailButton.addEventListener("click", () => loadCategory(item));

    article.append(title, description, value, detailButton);
    cardsContainer.append(article);
  }
}

function renderObjects(objects) {
  cardsContainer.replaceChildren();

  if (objects.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.textContent = "這個分類目前沒有資料。";
    cardsContainer.append(emptyMessage);
    return;
  }

  const table = document.createElement("table");
  table.className = "object-table";
  const header = document.createElement("thead");
  const headerRow = document.createElement("tr");
  const columns = Object.keys(objects[0]).slice(0, 4);

  for (const column of columns) {
    const cell = document.createElement("th");
    cell.scope = "col";
    cell.textContent = column;
    headerRow.append(cell);
  }
  header.append(headerRow);

  const body = document.createElement("tbody");
  for (const object of objects) {
    const row = document.createElement("tr");
    for (const value of Object.values(object).slice(0, 4)) {
      const cell = document.createElement("td");
      cell.textContent = String(value ?? "");
      row.append(cell);
    }
    body.append(row);
  }

  table.append(header, body);
  const wrapper = document.createElement("div");
  wrapper.className = "table-scroll";
  wrapper.append(table);
  cardsContainer.append(wrapper);
}

function setActiveCategory(cid) {
  for (const button of nav.querySelectorAll("button")) {
    const selected = button.dataset.cid === String(cid);
    button.classList.toggle("is-active", selected);
    if (selected) {
      button.setAttribute("aria-current", "page");
    } else {
      button.removeAttribute("aria-current");
    }
  }
}

async function loadCategory(item) {
  pageTitle.textContent = categoryLabels[item.name] ?? item.name;
  statusMessage.textContent = "正在載入分類資料…";
  setActiveCategory(item.cid);

  try {
    const objects = await requestJson(
      `api/root/co/${encodeURIComponent(item.cid)}`,
    );
    if (!Array.isArray(objects)) {
      throw new Error("分類 API 回應格式不是陣列。");
    }
    renderObjects(objects);
    statusMessage.textContent = `已載入 ${objects.length} 筆${pageTitle.textContent}範例資料。`;
  } catch (error) {
    console.error("分類資料載入失敗：", error);
    statusMessage.textContent = `載入失敗：${error.message}`;
  }
}

async function initialize() {
  try {
    const items = await requestJson("api/root");
    if (!Array.isArray(items) || items.length === 0) {
      throw new Error("/api/root 必須回傳至少一個分類。");
    }

    for (const item of items) {
      if (
        !Number.isInteger(item.cid) ||
        typeof item.name !== "string" ||
        !Number.isFinite(item.n)
      ) {
        throw new Error("/api/root 分類必須包含 cid、name 與 n。");
      }

      const button = document.createElement("button");
      button.className = "nav-button";
      button.type = "button";
      button.textContent = categoryLabels[item.name] ?? item.name;
      button.dataset.cid = String(item.cid);
      button.addEventListener("click", () => loadCategory(item));
      nav.append(button);
    }

    renderRootCards(items);
    pageTitle.textContent = "儀表板";
    statusMessage.textContent = "分類摘要已由 /api/root 載入。";
  } catch (error) {
    console.error(error);
    statusMessage.textContent =
      `頁面資料載入失敗：${error.message}`;
  }
}

themeToggle.addEventListener("click", () => {
  const isDark = document.body.classList.toggle("theme-dark");
  themeToggle.setAttribute("aria-pressed", String(isDark));
  themeToggle.textContent = isDark ? "切換淺色模式" : "切換深色模式";
});

loginButton.addEventListener("click", () => {
  statusMessage.textContent = "目前為前端展示頁，尚未串接登入服務。";
});

initialize();
