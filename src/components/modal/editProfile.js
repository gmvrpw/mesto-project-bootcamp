import { validateForm } from "../validation";
import editProfileFormValidation from "../validation/editProfileForm";

const editProfilePopup = document.querySelector("#edit-profile-popup");
const editProfilePopupForm = editProfilePopup.querySelector(".form");
const editProfilePopupNameInput = editProfilePopupForm.elements.name;
const editProfilePopupDescriptionInput = editProfilePopupForm.elements.description;

export const setProfileToEditProfileForm = ({name, description}) => {
  editProfilePopupNameInput.value = name;
  editProfilePopupDescriptionInput.value = description;
  validateForm(editProfileFormValidation);
}

export const getProfileFromEditProfileForm = () => {
  return {
    name: editProfilePopupNameInput.value,
    description: editProfilePopupDescriptionInput.value,
  }
}