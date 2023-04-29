const showError = (inputElement, formElement, errorMessage, {inputErrorClass, errorClass}) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
  inputElement.classList.add(inputErrorClass);
  errorElement.classList.add(errorClass);
}

const hideError = (inputElement, formElement, {inputErrorClass, errorClass}) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = '';
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
}

const getErrorMessage = (inputElement) => {
  return inputElement.validationMessage;
}

export const validateInput = (inputElement, formElement, other) => {
  if(!inputElement.validity.valid) {
    showError(inputElement, formElement, getErrorMessage(inputElement), other);
  } else {
    hideError(inputElement, formElement, other);
  }
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

export const validateSubmit = (submitButton, inputList, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    submitButton.classList.add(inactiveButtonClass);
    submitButton.disabled = true;
  } else {
    submitButton.classList.remove(inactiveButtonClass);
    submitButton.disabled = false;
  }
}

const setEventListeners = (formElement, {inputSelector, submitButtonSelector, inactiveButtonClass, ...others}) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const submitButton = formElement.querySelector(submitButtonSelector);

  formElement.addEventListener("reset", () => {
    inputList.forEach((inputElement) => {
      hideError(inputElement, formElement, others);
    });
    validateSubmit(submitButton, inputList, inactiveButtonClass);
  })

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      validateInput(inputElement, formElement, others);
      validateSubmit(submitButton, inputList, inactiveButtonClass);
    });
  });
};

export const validationObject = {
  formSelector: '.form',
  inputSelector: '.form__text-input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_disabled',
  inputErrorClass: 'form__text-input_invalid',
  errorClass: 'form__text-input-error_shown'
}

const enableValidation = () => {
  const { formSelector, ...others } = validationObject;
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => setEventListeners(formElement, others));
};

export default enableValidation