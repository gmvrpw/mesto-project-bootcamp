import { openPopup } from "./modal";
import { setPlaceToPlacePopup } from "./modal/place";
import Api from "./api";

const placePopup = document.querySelector("#place-popup");
const cardTemplate = document.querySelector("#card-template");

export const likeCard = (cardLikeButton) => {
  cardLikeButton.classList.add("card__like_liked");
}

export const dislikeCard = (cardLikeButton) => {
  cardLikeButton.classList.remove("card__like_liked");
}

export const showDeleteButton = (cardDeleteButton) => {
  cardDeleteButton.classList.remove("card__delete_hidden");
}

export const createCard = async (card) => {
  const cardElement = cardTemplate.content.querySelector(".card").cloneNode(true);

  // Элементы
  const cardImage = cardElement.querySelector(".card__image");
  const cardName = cardElement.querySelector(".card__name");
  const cardLikeButton = cardElement.querySelector(".card__like")
  const cardLikeCounter = cardElement.querySelector(".card__like-counter")
  const cardDeleteButton = cardElement.querySelector(".card__delete")

  // Данные
  cardElement.dataset.id = card._id;
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardName.textContent = card.name;
  cardLikeCounter.textContent = card.likes.length;
  if (card.likes.includes(Api.myId)) likeCard(cardLikeButton);
  if (card.owner._id === Api.myId) showDeleteButton(cardDeleteButton);

  // События
  cardLikeButton.addEventListener("click", async () => {
    if (cardLikeButton.classList.contains("card__like_liked")) {
      await Api.dislikeCard(card._id);
      dislikeCard(cardLikeButton);
    } else {
      await Api.likeCard(card._id);
      likeCard(cardLikeButton);
    }
  })
  cardDeleteButton.addEventListener("click", async () => {
    await Api.deleteCard(card._id);
    cardElement.remove();
  })
  cardImage.addEventListener("click", () => {
    setPlaceToPlacePopup({
      name: card.name,
      link: card.link
    });
    openPopup(placePopup);
  })

  return cardElement;
}