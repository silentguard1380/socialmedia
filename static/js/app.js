// select html elements
const dropdownMenuItems = document.querySelectorAll(".dropdown-menu");
const overlayContainer = document.querySelector("#overlay");
const mobileMenuContainer = document.querySelector("#mobile-menu");
const menuMobileButton = document.querySelector("#menuMobileButton");
const chooseAudienceBtn = document.querySelector("#chooseAudienceBtn");
const chooseAudienceModal = document.querySelector("#chooseAudienceModal");
const replyModalBtn = document.querySelector("#replyModalBtn");
const replyModalContainer = document.querySelector("#replyModal");

// show handler dropdown menu item
const dropdownMenuHandler = (event) => {
  const mainMenuItemDetail =
    event.currentTarget.lastChild.previousElementSibling;

  const mainMenuItemIcon =
    event.currentTarget.firstChild.nextElementSibling.lastChild
      .previousElementSibling;

  mainMenuItemIcon.classList.toggle("dropdown-icon__active");
  mainMenuItemDetail.classList.toggle("-mt-8");
  mainMenuItemDetail.classList.toggle("invisible");
};

//show mobile menu
const showMobileMenuHandler = (event) => {
  event.stopPropagation();
  mobileMenuContainer.classList.remove("-left-[270px]");
  mobileMenuContainer.classList.add("left-0");
  overlayContainer.classList.add("overlay");
};

// click body container in close all Show
const closeAllShows = () => {
  mobileMenuContainer.classList.add("-left-[270px]");
  mobileMenuContainer.classList.remove("left-0");
  chooseAudienceModal.classList.add("invisible");
  chooseAudienceModal.classList.add("opacity-0");
  replyModalContainer.classList.add("invisible");
  replyModalContainer.classList.add("opacity-0");
  overlayContainer.classList.remove("overlay");
};

// click chose audience btn in show chooseAudienceModal
const chooseAudienceBtnHandler = (event) => {
  event.stopPropagation();
  chooseAudienceModal.classList.toggle("invisible");
  chooseAudienceModal.classList.toggle("opacity-0");
};

const replyModalHandler = (event) => {
  event.stopPropagation();
  replyModalContainer.classList.toggle("invisible");
  replyModalContainer.classList.toggle("opacity-0");
};

// set Events
for (let dropdownMenu of dropdownMenuItems) {
  dropdownMenu.addEventListener("click", dropdownMenuHandler);
}
menuMobileButton.addEventListener("click", showMobileMenuHandler);
document.body.addEventListener("click", closeAllShows);
chooseAudienceBtn.addEventListener("click", chooseAudienceBtnHandler);
replyModalBtn.addEventListener("click", replyModalHandler);
