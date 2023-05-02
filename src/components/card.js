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

export const createCard = (card) => {
  const cardElement = cardTemplate.content.querySelector(".card").cloneNode(true);

  // Элементы
  const cardImage = cardElement.querySelector(".card__image");
  const cardName = cardElement.querySelector(".card__name");
  const cardLikeButton = cardElement.querySelector(".card__like")
  const cardLikeCounter = cardElement.querySelector(".card__like-counter")
  const cardDeleteButton = cardElement.querySelector(".card__delete")

  // Данные
  function updateCard(card) {
    cardElement.dataset.id = card._id;
    cardImage.src = card.link;
    cardImage.alt = card.name;
    cardName.textContent = card.name;
    cardLikeCounter.textContent = card.likes.length;
    card.likes.map(like => like._id).includes(Api.myId) ? likeCard(cardLikeButton) : dislikeCard(cardLikeButton);
    if (card.owner._id === Api.myId) showDeleteButton(cardDeleteButton);
  }
  updateCard(card);

  // События
  cardLikeButton.addEventListener("click", () => {
    if (cardLikeButton.classList.contains("card__like_liked")) {
      Api.dislikeCard(card._id).then((card) => {
        if (card.status !== 200) new Error(JSON.stringify(card))
        updateCard(card);
      }).catch((error) => {
        console.log(error);
      });
    } else {
      Api.likeCard(card._id).then((card) => {
        if (card.status !== 200) new Error(JSON.stringify(card))
        updateCard(card);
      }).catch((error) => {
        console.log(error);
      });
    }
  })
  cardDeleteButton.addEventListener("click", async () => {
    Api.deleteCard(card._id).then(() => {
      if (card.status !== 200) new Error(JSON.stringify(card))
      cardElement.remove();
    }).catch((error) => {
      console.log(error);
    });
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