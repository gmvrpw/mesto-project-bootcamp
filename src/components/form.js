export const submitLoading = (submitButton) => {
  const submitButtonText = submitButton.textContent;

  submitButton.textContent = "Сохранение..."

  return () => {
    submitButton.textContent = submitButtonText;
  }
}