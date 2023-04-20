const openPopup = (popup) => {
  popup.addEventListener("transitionend", () => {
    popup.classList.remove("popup_transition_opening");
  }, {once: true})

  popup.classList.remove("popup_hidden");
  popup.classList.add("popup_transition_opening");
}

const closePopup = (popup) => {
  popup.addEventListener("transitionend", () => {
    popup.classList.remove("popup_transition_closing");
    popup.classList.add("popup_hidden");
  }, {once: true})

  popup.classList.add("popup_transition_closing");
}

const setupTopBar = () => {
  const topBarAddButton = document.querySelector(".top-bar__add");
  topBarAddButton.addEventListener("click", () => {
    openAddCardPopup();
  })
}

// Профиль
const setupProfile = () => {
  const profile = document.querySelector(".profile");
  const profileName = profile.querySelector(".profile__name");
  const profileDescription = profile.querySelector(".profile__description");
  const profileEdit = document.querySelector(".profile__edit");

  profileEdit.addEventListener("click", () => {
    updateProfileEditPopup(profileName.textContent, profileDescription.textContent);
    openProfileEditPopup();
  })

  return profile;
}
const updateProfile = ({name, description}, profile) => {
  const profileName = profile.querySelector(".profile__name")
  const profileDescription = profile.querySelector(".profile__description")
  profileName.textContent = name;
  profileDescription.textContent = description;
}

// Popup изменения профиля
const setupEditProfilePopup = (profile) => {
  const popup = document.querySelector("#edit-profile-popup");
  const closeButton = popup.querySelector(".popup__close");
  const form = popup.querySelector("form");
  const nameInput = form.elements.name;
  const descriptionInput = form.elements.description;

  closeButton.addEventListener("click", () => closePopup(popup))
  form.addEventListener("submit", (e) => {
    updateProfile({name: nameInput.value, description: descriptionInput.value}, profile);
    closePopup(popup);
    e.preventDefault();
  })

  return popup;
}
const openProfileEditPopup = () => {
  const popup = document.querySelector("#edit-profile-popup");
  openPopup(popup);
}
const updateProfileEditPopup = (name, description) => {
  const popup = document.querySelector("#edit-profile-popup");
  const form = popup.querySelector("form");
  const nameInput = form.elements.name;
  const descriptionInput = form.elements.description;

  nameInput.value = name;
  descriptionInput.value = description
}


// Popup для создания карточки
const setupAddCardPopup = (cardsRoot) => {
  const popup = document.querySelector("#add-card-popup");
  const closeButton = popup.querySelector(".popup__close");
  const form = popup.querySelector("form");
  const nameInput = form.elements.name;
  const linkInput = form.elements.link;

  closeButton.addEventListener("click", () => closePopup(popup))
  form.addEventListener("submit", (e) => {
    renderCard({name: nameInput.value, link: linkInput.value}, cardsRoot)
    closePopup(popup)
    e.preventDefault();
  })

  return popup;
}
const openAddCardPopup = () => {
  const popup = document.querySelector("#add-card-popup");
  openPopup(popup);
}

// Popup места
const setupPlacePopup = () => {
  const popup = document.querySelector("#place-popup")
  const closeButton = popup.querySelector(".popup__close");

  closeButton.addEventListener("click", () => closePopup(popup))

  return popup;
}
const openPlacePopup = () => {
  const popup = document.querySelector("#place-popup");
  openPopup(popup);
}
const updatePlacePopup = (name, link) => {
  const popup = document.querySelector("#place-popup");
  const placeName = popup.querySelector(".place__capture");
  const placeImage = popup.querySelector(".place__image");

  placeName.textContent = name;
  placeImage.src = link;
  placeImage.alt = name;
}


// Карточка места
const toggleLike = (likeButton) => {
  likeButton.classList.toggle("card__like_liked");
}
const cardTemplate = document.querySelector("#card-template");
const renderCard = ({name, link}, container) => {
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
  cardLikeButton.addEventListener("click", () => toggleLike(cardLikeButton))
  cardDeleteButton.addEventListener("click", () => {
    card.remove();
  })
  cardImage.addEventListener("click", () => {
    updatePlacePopup(name, link);
    openPlacePopup();
  })

  // Рендер
  container.appendChild(card);
  return card;
}

// Начальные карточки
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

document.addEventListener("DOMContentLoaded", () => {
  const cardsRoot = document.querySelector(".cards");

  setupTopBar();
  setupEditProfilePopup(setupProfile());
  setupAddCardPopup(cardsRoot);

  setupPlacePopup();
  initialCards.forEach((card) => {
    renderCard(card, cardsRoot)
  })
})