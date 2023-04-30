export const submitLoading = (submitButton) => {
  const submitButtonText = submitButton.textContent;

  submitButton.textContent = "Сохраенние..."

  return () => {
    submitButton.textContent = submitButtonText;
  }
}