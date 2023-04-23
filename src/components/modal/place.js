const placePopup = document.querySelector("#place-popup");
const placePopupImage = placePopup.querySelector(".place__image");
const placePopupName = placePopup.querySelector(".place__capture");

export const setPlaceToPlacePopup = ({name, link}) => {
  placePopupName.textContent = name;
  placePopupImage.src = link;
  placePopupImage.alt = name;
}