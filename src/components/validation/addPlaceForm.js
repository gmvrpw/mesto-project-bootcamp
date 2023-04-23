const addPlacePopup = document.querySelector("#add-place-popup");
const addPlacePopupForm = addPlacePopup.querySelector(".form");
const addPlacePopupNameInput = addPlacePopupForm.elements.name;
const addPlacePopupNameInputError = addPlacePopupForm.querySelector("#place-name-input-error");
const addPlacePopupLinkInput = addPlacePopupForm.elements.link;
const addPlacePopupLinkInputError = addPlacePopupForm.querySelector("#place-link-input-error");
const addPlacePopupSubmitButton = addPlacePopupForm.querySelector(".form__submit");

const addPlaceFormValidation = {
  element: addPlacePopupForm,
  inputs: {
    name: {
      element: addPlacePopupNameInput,
      modifiers: {
        invalid: "form__text-input_invalid"
      },
      error: {
        element: addPlacePopupNameInputError,
        modifiers: {
          hidden: "form__text-input-error_hidden"
        }
      }
    },
    description: {
      element: addPlacePopupLinkInput,
      modifiers: {
        invalid: "form__text-input_invalid"
      },
      error: {
        element: addPlacePopupLinkInputError,
        modifiers: {
          hidden: "form__text-input-error_hidden"
        }
      }
    }
  },
  submit: {
    element: addPlacePopupSubmitButton,
    modifiers: {
      disabled: "form__submit_disabled"
    }
  }
}

export default addPlaceFormValidation