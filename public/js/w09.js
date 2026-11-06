const loginForm = document.querySelector("#demoLoginForm");
const emailInput = document.querySelector("#demoEmail");
const passwordInput = document.querySelector("#demoPassword");
const emailError = document.querySelector("#demoEmailError");
const passwordError = document.querySelector("#demoPasswordError");
const loginStatus = document.querySelector("#demoLoginStatus");
const demoToken = document.querySelector("#demoToken");
const googleDemoButton = document.querySelector("#googleDemoButton");
const logoutButton = document.querySelector("#demoLogoutButton");

const demoCredential = "DEMO-ONLY-NOT-A-REAL-TOKEN";

function setFieldError(input, errorElement, message) {
  errorElement.textContent = message;
  input.setAttribute("aria-invalid", String(Boolean(message)));
}

function clearDemoLogin() {
  demoToken.textContent = "目前沒有示範憑證。";
  logoutButton.disabled = true;
}

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const emailIsValid = emailInput.validity.valid;
  const passwordIsValid =
    passwordInput.value.length >= Number(passwordInput.minLength);

  setFieldError(
    emailInput,
    emailError,
    emailIsValid ? "" : "請輸入有效的 Email 格式。",
  );
  setFieldError(
    passwordInput,
    passwordError,
    passwordIsValid ? "" : "密碼至少需要 8 個字元。",
  );

  if (!emailIsValid || !passwordIsValid) {
    clearDemoLogin();
    loginStatus.textContent = "欄位格式不符合練習要求，尚未進入模擬登入狀態。";
    loginStatus.classList.add("is-error");
    const firstInvalidInput = emailIsValid ? passwordInput : emailInput;
    firstInvalidInput.focus();
    return;
  }

  passwordInput.value = "";
  loginStatus.classList.remove("is-error");
  loginStatus.textContent =
    "模擬登入狀態已開啟（未驗證任何帳號；這不是真正的登入）。";
  demoToken.textContent = demoCredential;
  logoutButton.disabled = false;
});

googleDemoButton.addEventListener("click", () => {
  passwordInput.value = "";
  clearDemoLogin();
  loginStatus.classList.remove("is-error");
  loginStatus.textContent =
    "這只是 Google 登入按鈕的 UI 示範；本專案沒有連接 Google OAuth/OIDC。";
});

logoutButton.addEventListener("click", () => {
  passwordInput.value = "";
  clearDemoLogin();
  loginStatus.classList.remove("is-error");
  loginStatus.textContent = "示範登入狀態已清除。";
});

for (const input of [emailInput, passwordInput]) {
  input.addEventListener("input", () => {
    clearDemoLogin();
    loginStatus.classList.remove("is-error");
    loginStatus.textContent = "輸入內容不會送出或保存。";
  });
}
