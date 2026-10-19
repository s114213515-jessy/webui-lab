const requestScenario = document.querySelector("#requestScenario");
const fetchDemoButton = document.querySelector("#fetchDemoButton");
const requestPath = document.querySelector("#requestPath");
const fetchStatus = document.querySelector("#fetchStatus");
const fetchResults = document.querySelector("#fetchResults");

const requestPaths = {
  success: "json/dashboard_cards.json",
  "not-found": "json/w06-missing-demo.json",
};

function setRequestScenario() {
  const path = requestPaths[requestScenario.value];
  requestPath.textContent = `GET ${path}`;
}

function renderCards(cards) {
  fetchResults.replaceChildren();

  for (const card of cards) {
    const article = document.createElement("article");
    article.className = "w06-result-card";

    const title = document.createElement("h3");
    title.textContent = card.title;

    const description = document.createElement("p");
    description.textContent = card.description;

    const value = document.createElement("p");
    value.className = "w06-result-value";
    value.textContent = card.value;

    article.append(title, description, value);
    fetchResults.append(article);
  }
}

async function loadDemoData() {
  const path = requestPaths[requestScenario.value];
  fetchDemoButton.disabled = true;
  fetchResults.replaceChildren();
  fetchStatus.classList.remove("is-error");
  fetchStatus.textContent = "正在送出請求…";
  fetchResults.setAttribute("aria-busy", "true");

  try {
    const response = await fetch(new URL(path, document.baseURI));
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    if (!Array.isArray(data.dashboard)) {
      throw new Error("Response JSON 缺少 dashboard 卡片陣列。");
    }

    renderCards(data.dashboard);
    fetchStatus.textContent =
      `HTTP ${response.status}：成功取得 ${data.dashboard.length} 張範例卡片，並更新 DOM。`;
  } catch (error) {
    console.error("W6 Fetch 練習失敗：", error);
    fetchStatus.classList.add("is-error");
    fetchStatus.textContent =
      `載入失敗：${error.message}。請查看 Network 與 Console，判斷 HTTP、Network 或 JSON 問題。`;
  } finally {
    fetchDemoButton.disabled = false;
    fetchResults.setAttribute("aria-busy", "false");
  }
}

requestScenario.addEventListener("change", setRequestScenario);
fetchDemoButton.addEventListener("click", loadDemoData);
setRequestScenario();
