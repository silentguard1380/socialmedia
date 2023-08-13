// select element in dom
const loginFormContainer = document.querySelector("#loginForm");
const loginPasswordInput = document.querySelector("#loginPasswordInput");
const loginPasswordValidationMessage = document.querySelector(
  "#loginPasswordValidationMessage"
);
const loginButton = document.querySelector("#loginButton");
const eyePasswordLogin = document.querySelector("#eyePasswordLogin");
const loginPasswordIcon = document.querySelector("#loginPasswordIcon");
// regex rule
const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[#?!@$ %^&*-]).{8,16}/;

const loginPasswordInputValidationHandler = () => {
  const resultValidation = passwordRegex.test(loginPasswordInput.value);

  if (!resultValidation) {
    loginPasswordValidationMessage.classList.remove("hidden");
    loginPasswordInput.style.borderColor = "rgb(244, 33, 46)";
    loginButton.classList.add("mt-14");
  } else {
    loginPasswordValidationMessage.classList.add("hidden");
    loginPasswordInput.style.borderColor = "rgb(29,155,240)";
    loginButton.classList.remove("mt-14");
  }
};

// set events
loginFormContainer.addEventListener("submit", (event) =>
  event.preventDefault()
);
loginPasswordInput.addEventListener(
  "keyup",
  loginPasswordInputValidationHandler
);
eyePasswordLogin.addEventListener("click", () => {
  if (loginPasswordInput.type === "password") {
    loginPasswordInput.type = "text";
    loginPasswordIcon.innerHTML = "";
    loginPasswordIcon.innerHTML = `  <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />`;
  } else {
    loginPasswordInput.type = "password";
    loginPasswordIcon.innerHTML = "";
    loginPasswordIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
`;
  }
});
