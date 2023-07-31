// select html elements
const dropdownMenuItems = document.querySelectorAll(".dropdown-menu");
const overlayContainer = document.querySelector("#overlay");
const mobileMenuContainer = document.querySelector("#mobile-menu");
const menuMobileButton = document.querySelector("#menuMobileButton");

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
  overlayContainer.classList.add("overlay");
};

// overlay container in close all Show
const closeAllShows = () => {
  mobileMenuContainer.classList.add("-left-[270px]");
  overlayContainer.classList.remove("overlay");
};

// set Events
for (let dropdownMenu of dropdownMenuItems) {
  dropdownMenu.addEventListener("click", dropdownMenuHandler);
}
menuMobileButton.addEventListener("click", showMobileMenuHandler);
document.body.addEventListener("click", closeAllShows);
