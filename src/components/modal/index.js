function closeByEscape(e) {
  if (e.key !== "Escape") {
    return;
  }
  const openedPopup = document.querySelector(".popup:not(.popup_hidden)")
  closePopup(openedPopup);
}

export function openPopup(popup) {
  popup.classList.remove("popup_hidden");
  document.addEventListener("keydown", closeByEscape);
}
export function closePopup(popup) {
  popup.classList.add("popup_hidden");
  document.removeEventListener("keydown", closeByEscape);
}
