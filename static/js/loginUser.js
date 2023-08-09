// select element in dom
const loginPasswordInput = document.querySelector("#loginPasswordInput");
const loginPasswordValidationMessage = document.querySelector(
  "#loginPasswordValidationMessage"
);
// regex rule
const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[#?!@$ %^&*-]).{8,16}/;

const loginPasswordInputValidationHandler = () => {
  const resultValidation = passwordRegex.test(loginPasswordInput.value);

  if (!resultValidation) {
    loginPasswordValidationMessage.classList.remove("hidden");
    loginPasswordInput.style.borderColor = "rgb(244, 33, 46)";
  } else {
    loginPasswordValidationMessage.classList.add("hidden");
    loginPasswordInput.style.borderColor = "rgb(29,155,240)";
  }
};

// set events
loginPasswordInput.addEventListener(
  "keyup",
  loginPasswordInputValidationHandler
);
