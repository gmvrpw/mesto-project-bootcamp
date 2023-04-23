function isFormValid(form) {
  return Object.values(form.inputs).reduce((accumulator, input) => accumulator && input.element.validity.valid, true);
}

function showInputErrorMessage(input, message) {
  input.error.element.textContent = message;

  input.element.classList.add(input.modifiers.invalid);
  input.error.element.classList.remove(input.error.modifiers.hidden);
}

function hideInputErrorMessage(input) {
  input.error.element.textContent = "";

  input.element.classList.remove(input.modifiers.invalid);
  input.error.element.classList.add(input.error.modifiers.hidden);
}

function enableSubmitButton(submit) {
  submit.element.disabled = false;
  submit.element.classList.remove(submit.modifiers.disabled)
}

function disableSubmitButton(submit) {
  submit.element.disabled = true;
  submit.element.classList.add(submit.modifiers.disabled)
}

function validateInput(input) {
  if (input.element.validity.valid) {
    hideInputErrorMessage(input);
  } else {
    showInputErrorMessage(input, input.element.validationMessage);
  }
}

function validateSubmit(form) {
  if (isFormValid(form)) {
    enableSubmitButton(form.submit);
  } else {
    disableSubmitButton(form.submit);
  }
}

function validateForm(form) {
  Object.values(form.inputs).forEach((input) => validateInput(input));
  validateSubmit(form);
}

function enableValidation(form) {
  validateForm(form);

  Object.values(form.inputs).forEach((input) => {
    input.element.addEventListener("input", () => {
      validateInput(input);
    })
  })

  form.element.addEventListener("input", () => {
    validateSubmit(form);
  })
}