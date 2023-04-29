import {validateInput, validateSubmit} from "../validation";
import editProfileFormValidation from "../validation/editProfileForm";

const editProfilePopup = document.querySelector("#edit-profile-popup");
const editProfilePopupForm = editProfilePopup.querySelector(".form");
const editProfilePopupNameInput = editProfilePopupForm.elements.name;
const editProfilePopupAboutInput = editProfilePopupForm.elements.about;
const editProfilePopupSubmitButton = editProfilePopupForm.querySelector(".form__submit");

export const setProfileToEditProfileForm = ({name, about}) => {
  editProfilePopupNameInput.value = name;
  validateInput(editProfilePopupNameInput, editProfilePopupForm, editProfileFormValidation);
  editProfilePopupAboutInput.value = about;
  validateInput(editProfilePopupAboutInput, editProfilePopupForm, editProfileFormValidation);
  validateSubmit(
    editProfilePopupSubmitButton,
    [editProfilePopupNameInput, editProfilePopupAboutInput],
    editProfileFormValidation.inactiveButtonClass
  )
}

export const getProfileFromEditProfileForm = () => {
  return {
    name: editProfilePopupNameInput.value,
    about: editProfilePopupAboutInput.value,
  }
}