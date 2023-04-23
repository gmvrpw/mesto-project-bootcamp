// Общие (не зависящие от контекста) функции
function renderToStart(container, ...items) {
  container.prepend(...items);
}

function openPopup(popup) {
  popup.classList.remove("popup_hidden");
  popup.focus();
}

function closePopup (popup) {
  popup.classList.add("popup_hidden");
}

document.querySelectorAll(".popup").forEach((popup) => {
  const closeButton = popup.querySelector(".popup__close");

  popup.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") {
      return;
    }
    closePopup(popup);
  })
  popup.addEventListener("click", (e) => {
    if (e.target !== popup) {
      return;
    }
    closePopup(popup);
  });
  closeButton.addEventListener("click", () => {
    closePopup(popup);
  });
})

// Константы элементов
const placePopup = document.querySelector("#place-popup");
const placePopupImage = placePopup.querySelector(".place__image");
const placePopupName = placePopup.querySelector(".place__capture");

const editProfilePopup = document.querySelector("#edit-profile-popup");
const editProfilePopupForm = editProfilePopup.querySelector(".form");
const editProfilePopupNameInput = editProfilePopupForm.elements.name;
const editProfilePopupDescriptionInput = editProfilePopupForm.elements.description;

const addPlacePopup = document.querySelector("#add-place-popup");
const addPlacePopupForm = addPlacePopup.querySelector(".form");
const addPlacePopupNameInput = addPlacePopupForm.elements.name;
const addPlacePopupLinkInput = addPlacePopupForm.elements.link;

const topBar = document.querySelector(".top-bar");
const topBarAddButton = topBar.querySelector(".top-bar__add");

const profile = document.querySelector(".profile");
const profileName = profile.querySelector(".profile__name");
const profileDescription = profile.querySelector(".profile__description");
const profileEditButton = profile.querySelector(".profile__edit");

const cards = document.querySelector(".cards");
const cardTemplate = document.querySelector("#card-template");

// Функции "поддержки" состояний
const setProfile = ({name, description}) => {
  profileName.textContent = name;
  profileDescription.textContent = description;
}

const setPlaceToPlacePopup = ({name, link}) => {
  placePopupName.textContent = name;
  placePopupImage.src = link;
  placePopupImage.alt = name;
}

const setDefaultValuesToEditProfileForm = ({name, description}) => {
  editProfilePopupNameInput.value = name;
  editProfilePopupDescriptionInput.value = description;
}

const toggleLike = (likeButton) => {
  likeButton.classList.toggle("card__like_liked");
}

const createCard = ({name, link}) => {
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
    setPlaceToPlacePopup({name, link});
    openPopup(placePopup);
  })

  return card;
}

// Основные слушатели для блоков
const setupEditProfilePopup = () => {
  enableValidation()
  editProfilePopupForm.addEventListener("submit", (e) => {
    setProfile({
      name: editProfilePopupNameInput.value,
      description: editProfilePopupDescriptionInput.value
    });
    closePopup(editProfilePopup);
    e.preventDefault();
  })
}

const setupAddPlacePopup = () => {
  addPlacePopupForm.addEventListener("submit", (e) => {
    renderToStart(cards, createCard({
      name: addPlacePopupNameInput.value,
      link: addPlacePopupLinkInput.value
    }))
    addPlacePopupForm.reset();
    closePopup(addPlacePopup);
    e.preventDefault();
  })
}

const setupProfile = () => {
  profileEditButton.addEventListener("click", () => {
    setDefaultValuesToEditProfileForm({
      name: profileName.textContent,
      description: profileDescription.textContent
    });
    openPopup(editProfilePopup);
  })
}

const setupTopBar = () => {
  topBarAddButton.addEventListener("click", () => {
    openPopup(addPlacePopup);
  })
}

const initialPlaces = [
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

setupTopBar();
setupProfile();
setupAddPlacePopup();
setupEditProfilePopup();

renderToStart(cards, ...initialPlaces.map((placeData) => createCard(placeData)))
