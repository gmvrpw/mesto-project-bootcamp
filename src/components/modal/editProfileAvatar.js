const editProfileAvatarPopup = document.querySelector("#edit-profile-avatar-popup");
const editProfileAvatarPopupForm = editProfileAvatarPopup.querySelector(".form");
const editProfileAvatarPopupLinkInput = editProfileAvatarPopupForm.elements.link;

export const getProfileAvatarFromEditProfileAvatarForm = () => {
  return editProfileAvatarPopupLinkInput.value
}

export const resetEditProfileAvatarForm = () => {
  editProfileAvatarPopupForm.reset();
}