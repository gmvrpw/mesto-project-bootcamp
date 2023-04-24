import {validateInput, validateSubmit} from "../validation";
import editProfileFormValidation from "../validation/editProfileForm";

const editProfilePopup = document.querySelector("#edit-profile-popup");
const editProfilePopupForm = editProfilePopup.querySelector(".form");
const editProfilePopupNameInput = editProfilePopupForm.elements.name;
const editProfilePopupDescriptionInput = editProfilePopupForm.elements.description;
const editProfilePopupSubmitButton = editProfilePopupForm.querySelector(".form__submit");

export const setProfileToEditProfileForm = ({name, description}) => {
  editProfilePopupNameInput.value = name;
  validateInput(editProfilePopupNameInput, editProfilePopupForm, editProfileFormValidation);
  editProfilePopupDescriptionInput.value = description;
  validateInput(editProfilePopupDescriptionInput, editProfilePopupForm, editProfileFormValidation);
  validateSubmit(
    editProfilePopupSubmitButton,
    [editProfilePopupNameInput, editProfilePopupDescriptionInput],
    editProfileFormValidation.inactiveButtonClass
  )
}

export const getProfileFromEditProfileForm = () => {
  return {
    name: editProfilePopupNameInput.value,
    description: editProfilePopupDescriptionInput.value,
  }
}