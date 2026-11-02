const form = document.querySelector("#registerForm");
const usernameInput = document.querySelector("#username");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const formResult = document.querySelector("#formResult");

const fields = [
  {
    input: usernameInput,
    error: document.querySelector("#usernameError"),
    validate: (value) => (value.length < 2 ? "姓名至少需要 2 個字元。" : ""),
  },
  {
    input: emailInput,
    error: document.querySelector("#emailError"),
    validate: (_, input) => (input.validity.valid ? "" : "請輸入有效的 Email 格式。"),
  },
  {
    input: passwordInput,
    error: document.querySelector("#passwordError"),
    validate: (value) => (value.length < 8 ? "密碼至少需要 8 個字元。" : ""),
  },
];

function validateField(field) {
  const value = field.input.value.trim();
  const message = field.validate(value, field.input);
  field.error.textContent = message;
  field.input.setAttribute("aria-invalid", String(Boolean(message)));
  return !message;
}

for (const field of fields) {
  field.input.addEventListener("input", () => {
    validateField(field);
    formResult.textContent = "正在編輯表單。";
    formResult.classList.remove("is-error");
  });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const isValid = fields.map(validateField).every(Boolean);

  if (!isValid) {
    formResult.textContent = "請修正欄位錯誤後再試一次。";
    formResult.classList.add("is-error");
    const firstInvalidField = fields.find(
      (field) => field.input.getAttribute("aria-invalid") === "true",
    );
    firstInvalidField?.input.focus();
    return;
  }

  formResult.classList.remove("is-error");
  formResult.replaceChildren();
  const message = document.createElement("span");
  message.textContent = `表單驗證成功。你好，${usernameInput.value.trim()}！本練習沒有傳送或保存資料。`;
  formResult.append(message);
});
