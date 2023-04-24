import { validateForm } from "../validation";
import addPlaceFormValidation from "../validation/addPlaceForm";

const addPlacePopup = document.querySelector("#add-place-popup");
const addPlacePopupForm = addPlacePopup.querySelector(".form");
const addPlacePopupNameInput = addPlacePopupForm.elements.name;
const addPlacePopupLinkInput = addPlacePopupForm.elements.link;

export const getPlaceFromAddPlacePopup = () => {
  return {
    name: addPlacePopupNameInput.value,
    link: addPlacePopupLinkInput.value
  }
}

export const resetAddPlaceForm = () => {
  addPlacePopupForm.reset();
}