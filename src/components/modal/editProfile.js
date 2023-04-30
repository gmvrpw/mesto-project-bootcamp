import {validateInput, validateSubmit, validationObject} from "../validation";

const editProfilePopup = document.querySelector("#edit-profile-popup");
const editProfilePopupForm = editProfilePopup.querySelector(".form");
const editProfilePopupNameInput = editProfilePopupForm.elements.name;
const editProfilePopupAboutInput = editProfilePopupForm.elements.about;
const editProfilePopupSubmitButton = editProfilePopupForm.querySelector(".form__submit");

export const setProfileToEditProfileForm = ({name, about}) => {
  editProfilePopupNameInput.value = name;
  validateInput(editProfilePopupNameInput, editProfilePopupForm, validationObject);
  editProfilePopupAboutInput.value = about;
  validateInput(editProfilePopupAboutInput, editProfilePopupForm, validationObject);
  validateSubmit(
    editProfilePopupSubmitButton,
    [editProfilePopupNameInput, editProfilePopupAboutInput],
    validationObject.inactiveButtonClass
  )
}

export const getProfileFromEditProfileForm = () => {
  return {
    name: editProfilePopupNameInput.value,
    about: editProfilePopupAboutInput.value,
  }
}