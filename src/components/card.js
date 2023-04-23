import { openPopup } from "./modal";
import { setPlaceToPlacePopup } from "./modal/place";

const placePopup = document.querySelector("#place-popup");
const cardTemplate = document.querySelector("#card-template");

export const createCard = ({name, link}) => {
  const card = cardTemplate.content.querySelector(".card").cloneNode(true);

  // Элементы
  const cardImage = card.querySelector(".card__image");
  const cardName = card.querySelector(".card__name");
  const cardLikeButton = card.querySelector(".card__like")
  const cardDeleteButton = card.querySelector(".card__delete")

  // Данные
  cardImage.src = link;
  cardImage.alt = name;
  cardName.textContent = name;

  // События
  cardLikeButton.addEventListener("click", () => cardLikeButton.classList.toggle("card__like_liked"))
  cardDeleteButton.addEventListener("click", () => {
    card.remove();
  })
  cardImage.addEventListener("click", () => {
    setPlaceToPlacePopup({name, link});
    openPopup(placePopup);
  })

  return card;
}