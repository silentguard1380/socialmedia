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
const emailInputElem = document.querySelector("#emailInput");
const passwordInputElem = document.querySelector("#passwordInput");
const emailValidationMessage = document.querySelector(
  "#emailValidationMessage"
);
const passwordValidationMessage = document.querySelector(
  "#passwordValidationMessage"
);

// regex rule
const emailRegex = /(?!.*\.\.)\w[\w.]{3,25}@(gmail|yahoo)\.com/;
const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[#?!@$ %^&*-]).{8,16}/;

// function resubale generate option element select box
const renderOptionElementToDom = (arrays, elementContainer) => {
  arrays?.map((item, index) => {
    elementContainer.insertAdjacentHTML(
      "beforeend",
      `<option class="bg-[rgb(0,0,0)]" value="${index + 1}">${item}</option>`
    );
  });
};

// function resubale validations inputs
function InputValidationStatus(
  regexRule,
  mainInputElem,
  mainInputValidationMessage
) {
  const resultValidation = regexRule.test(mainInputElem.value);

  if (resultValidation) {
    mainInputElem.style.borderColor = "rgb(29,155,240)";
    mainInputValidationMessage.classList.add("hidden");
  } else {
    mainInputElem.style.borderColor = "rgb(244, 33, 46)";
    mainInputValidationMessage.classList.remove("hidden");
  }
}

// function IIFE
(function () {
  renderOptionElementToDom(months, monthSelectBox);
  renderOptionElementToDom(days, daySelectBox);
  for (let i = 1900; i <= 2023; i++) years.push(i);
  renderOptionElementToDom(years, yearsSelectBox);
})();

emailInputElem.addEventListener("keyup", () =>
  InputValidationStatus(emailRegex, emailInputElem, emailValidationMessage)
);
passwordInputElem.addEventListener("keyup", () =>
  InputValidationStatus(
    passwordRegex,
    passwordInputElem,
    passwordValidationMessage
  )
);
