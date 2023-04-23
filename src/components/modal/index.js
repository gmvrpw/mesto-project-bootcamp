export function openPopup(popup) {
  popup.classList.remove("popup_hidden");
  popup.focus();
}

export function closePopup(popup) {
  popup.classList.add("popup_hidden");
}