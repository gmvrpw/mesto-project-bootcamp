import "./pages/index.css"
import { renderToStart } from "./components/render";
import { enableValidation } from "./components/validation";
import addPlaceFormValidation from "./components/validation/addPlaceForm";
import editProfileFormValidation from "./components/validation/editProfileForm";
import { openPopup, closePopup } from "./components/modal";
import { getProfile, setProfile } from "./components/profile";
import { createCard } from "./components/card";
import { getProfileFromEditProfileForm, setProfileToEditProfileForm } from "./components/modal/editProfile";
import { getPlaceFromAddPlacePopup, resetAddPlaceForm } from "./components/modal/addPlace";

export function setupPopups() {
  document.querySelectorAll(".popup").forEach((popup) => {
    const closeButton = popup.querySelector(".popup__close");

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
}

const editProfilePopup = document.querySelector("#edit-profile-popup");
const editProfilePopupForm = editProfilePopup.querySelector(".form");

const addPlacePopup = document.querySelector("#add-place-popup");
const addPlacePopupForm = addPlacePopup.querySelector(".form");

const topBar = document.querySelector(".top-bar");
const topBarAddButton = topBar.querySelector(".top-bar__add");

const profile = document.querySelector(".profile");
const profileEditButton = profile.querySelector(".profile__edit");

const cards = document.querySelector(".cards");

const setupEditProfilePopup = () => {
  enableValidation(editProfileFormValidation)
  editProfilePopupForm.addEventListener("submit", (e) => {
    setProfile(getProfileFromEditProfileForm());
    closePopup(editProfilePopup);
    e.preventDefault();
  })
}

const setupAddPlacePopup = () => {
  enableValidation(addPlaceFormValidation);
  addPlacePopupForm.addEventListener("submit", (e) => {
    renderToStart(cards, createCard(getPlaceFromAddPlacePopup()));
    closePopup(addPlacePopup);
    e.preventDefault();
  })
}

const setupProfile = () => {
  profileEditButton.addEventListener("click", () => {
    setProfileToEditProfileForm(getProfile());
    openPopup(editProfilePopup);
  })
}

const setupTopBar = () => {
  topBarAddButton.addEventListener("click", () => {
    resetAddPlaceForm();
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

setupPopups();

setupTopBar();
setupProfile();
setupAddPlacePopup();
setupEditProfilePopup();

renderToStart(cards, ...initialPlaces.map((placeData) => createCard(placeData)))
