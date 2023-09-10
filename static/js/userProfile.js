// select html elements
const overlayContainer = document.querySelector("#overlay");
const editProfileBtn = document.querySelector("#editProfileBtn");
const editProfileModal = document.querySelector("#editProfileModal");
const editProfileCloseBtn = document.querySelector("#editProfileCloseBtn");

// show Modal Edit User Profile
const editProfileModalHandler = () => {
  editProfileModal.classList.remove("opacity-0", "invisible");
  overlayContainer.classList.add("overlay");
};

const editProfileModalClose = () => {
  editProfileModal.classList.add("opacity-0", "invisible");
  overlayContainer.classList.remove("overlay");
};

// set events
editProfileBtn.addEventListener("click", editProfileModalHandler);
editProfileCloseBtn.addEventListener("click", editProfileModalClose);
