const nav = document.querySelector("#sidebar-nav");
const pageTitle = document.querySelector("#page-title");
const cardsContainer = document.querySelector("#dashboard-cards");
const statusMessage = document.querySelector("#status-message");
const themeToggle = document.querySelector("#theme-toggle");
const loginButton = document.querySelector("#login-button");

async function loadJson(path) {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`載入 ${path} 失敗：HTTP ${response.status}`);
  }
  return response.json();
}

function renderCards(cards) {
  cardsContainer.replaceChildren();

  if (cards.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.textContent = "目前沒有可顯示的資料。";
    cardsContainer.append(emptyMessage);
    return;
  }

  for (const card of cards) {
    const article = document.createElement("article");
    article.className = "card";

    const title = document.createElement("h2");
    title.textContent = card.title;

    const description = document.createElement("p");
    description.textContent = card.description;

    const value = document.createElement("p");
    value.className = "card-value";
    value.textContent = card.value;

    article.append(title, description, value);
    cardsContainer.append(article);
  }
}

function selectPage(item, cardsByPage) {
  pageTitle.textContent = item.label;

  for (const button of nav.querySelectorAll("button")) {
    const selected = button.dataset.pageId === item.id;
    button.classList.toggle("is-active", selected);
    if (selected) {
      button.setAttribute("aria-current", "page");
    } else {
      button.removeAttribute("aria-current");
    }
  }

  renderCards(cardsByPage[item.id] ?? []);
}

async function initialize() {
  try {
    const [operations, cardsByPage] = await Promise.all([
      loadJson("json/teacher_ops.json"),
      loadJson("json/dashboard_cards.json"),
    ]);

    if (!Array.isArray(operations.items) || operations.items.length === 0) {
      throw new Error("teacher_ops.json 必須包含至少一個功能項目。");
    }

    for (const item of operations.items) {
      if (typeof item.id !== "string" || typeof item.label !== "string") {
        throw new Error("功能項目必須包含字串 id 與 label。");
      }

      const button = document.createElement("button");
      button.className = "nav-button";
      button.type = "button";
      button.textContent = item.label;
      button.dataset.pageId = item.id;
      button.addEventListener("click", () => selectPage(item, cardsByPage));
      nav.append(button);
    }

    const defaultPage =
      operations.items.find((item) => item.id === "dashboard") ?? operations.items[0];
    selectPage(defaultPage, cardsByPage);
  } catch (error) {
    console.error(error);
    statusMessage.textContent =
      "頁面資料載入失敗，請確認 JSON 路徑與格式，並查看開發者工具。";
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
