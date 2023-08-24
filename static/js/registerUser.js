const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const days = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30, 31,
];

const years = [];

//select elements
const monthSelectBox = document.querySelector("#monthSelectBox");
const daySelectBox = document.querySelector("#daySelectBox");
const yearsSelectBox = document.querySelector("#yearsSelectBox");
const registerFormContainer = document.querySelector("#registerForm");
const emailInputElem = document.querySelector("#emailInput");
const passwordInputElem = document.querySelector("#passwordInput");
const emailValidationMessage = document.querySelector(
  "#emailValidationMessage"
);
const passwordValidationMessage = document.querySelector(
  "#passwordValidationMessage"
);
const registerButton = document.querySelector("#registerButton");
const eyePasswordRegister = document.querySelector("#eyePasswordRegister");
const eyePasswordRegisterIcon = document.querySelector(
  "#eyePasswordRegisterIcon"
);

let statusEmailValidation = null;
let statusPasswordValidation = null;
// regex rule
const emailRegex = /(?!.*\.\.)\w[\w.]{3,25}@(gmail|yahoo)\.com/;
const passwordRegex = /(?=.*?[a-z])(?=.*?[#?!@$ %^&*-]).{8,16}/;
// /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[#?!@$ %^&*-]).{8,16}/;

// function resubale generate option element select box
const renderOptionElementToDom = (arrays, elementContainer) => {
  arrays?.map((item, index) => {
    elementContainer.insertAdjacentHTML(
      "beforeend",
      `<option class="bg-[rgb(0,0,0)]" value="${index + 1}">${item}</option>`
    );
  });
};

// function rusable validations inputs
function InputValidationStatus(
  regexRule,
  mainInputElem,
  mainInputValidationMessage
) {
  const resultValidation = regexRule.test(mainInputElem.value);

  if (resultValidation) {
    mainInputElem.style.borderColor = "rgb(29,155,240)";
    mainInputValidationMessage.classList.add("hidden");
    registerButton.classList.remove("!mt-14");
    return resultValidation;
  } else {
    mainInputElem.style.borderColor = "rgb(244, 33, 46)";
    mainInputValidationMessage.classList.remove("hidden");
    registerButton.classList.add("!mt-14");
    return resultValidation;
  }
}

// function IIFE
(function () {
  renderOptionElementToDom(months, monthSelectBox);
  renderOptionElementToDom(days, daySelectBox);
  for (let i = 1900; i <= 2023; i++) years.push(i);
  renderOptionElementToDom(years, yearsSelectBox);
})();

// Set Events
registerFormContainer.addEventListener("submit", (event) => {
  if (!statusEmailValidation || !statusPasswordValidation) {
    event.preventDefault();
  }
});
emailInputElem.addEventListener(
  "keyup",
  () =>
    (statusEmailValidation = InputValidationStatus(
      emailRegex,
      emailInputElem,
      emailValidationMessage
    ))
);
passwordInputElem.addEventListener(
  "keyup",
  () =>
    (statusPasswordValidation = InputValidationStatus(
      passwordRegex,
      passwordInputElem,
      passwordValidationMessage
    ))
);
eyePasswordRegister.addEventListener("click", (event) => {
  event.preventDefault();
  if (passwordInputElem.type === "password") {
    passwordInputElem.type = "text";
    eyePasswordRegisterIcon.innerHTML = "";
    eyePasswordRegisterIcon.innerHTML = `
  <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
`;
  } else {
    passwordInputElem.type = "password";
    eyePasswordRegisterIcon.innerHTML = "";
    eyePasswordRegisterIcon.innerHTML = `
<path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
`;
  }
});