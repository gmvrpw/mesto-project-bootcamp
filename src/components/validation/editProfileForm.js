const editProfilePopup = document.querySelector("#edit-profile-popup");
const editProfilePopupForm = editProfilePopup.querySelector(".form");
const editProfilePopupNameInput = editProfilePopupForm.elements.name;
const editProfilePopupNameInputError = editProfilePopupForm.querySelector("#profile-name-input-error");
const editProfilePopupDescriptionInput = editProfilePopupForm.elements.description;
const editProfilePopupDescriptionInputError = editProfilePopupForm.querySelector("#profile-description-input-error");
const editProfilePopupSubmitButton = editProfilePopupForm.querySelector(".form__submit");

const editProfileFormValidation = {
  element: editProfilePopupForm,
  inputs: {
    name: {
      element: editProfilePopupNameInput,
      modifiers: {
        invalid: "form__text-input_invalid"
      },
      error: {
        element: editProfilePopupNameInputError,
        modifiers: {
          hidden: "form__text-input-error_hidden"
        }
      }
    },
    description: {
      element: editProfilePopupDescriptionInput,
      modifiers: {
        invalid: "form__text-input_invalid"
      },
      error: {
        element: editProfilePopupDescriptionInputError,
        modifiers: {
          hidden: "form__text-input-error_hidden"
        }
      }
    }
  },
  submit: {
    element: editProfilePopupSubmitButton,
    modifiers: {
      disabled: "form__submit_disabled"
    }
  }
}

export default editProfileFormValidation