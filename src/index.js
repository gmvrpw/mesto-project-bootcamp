import "./pages/index.css"
import {renderToStart} from "./components/render";
import Api from "./components/api";
import enableValidation from "./components/validation";
import {closePopup, openPopup} from "./components/modal";
import {getProfile, setProfile} from "./components/profile";
import {createCard} from "./components/card";
import {getProfileFromEditProfileForm, setProfileToEditProfileForm} from "./components/modal/editProfile";
import {getPlaceFromAddPlacePopup, resetAddPlaceForm} from "./components/modal/addPlace";
import {submitLoading} from "./components/form";
import {
  getProfileAvatarFromEditProfileAvatarForm,
  resetEditProfileAvatarForm
} from "./components/modal/editProfileAvatar";

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

const editProfileAvatarPopup = document.querySelector("#edit-profile-avatar-popup");
const editProfileAvatarPopupForm = editProfileAvatarPopup.querySelector(".form");

const addPlacePopup = document.querySelector("#add-place-popup");
const addPlacePopupForm = addPlacePopup.querySelector(".form");

const topBar = document.querySelector(".top-bar");
const topBarAddButton = topBar.querySelector(".top-bar__add");

const profile = document.querySelector(".profile");
const profileEditButton = profile.querySelector(".profile__edit");
const profileEditAvatarButton = profile.querySelector(".profile__avatar-edit");

const cardsContainer = document.querySelector(".cards");

const setupEditProfilePopup = () => {
  const editProfilePopupFormSubmitButton = editProfilePopupForm.querySelector(".form__submit");

  editProfilePopupForm.addEventListener("submit", (e) => {
    const submitLoaded = submitLoading(editProfilePopupFormSubmitButton);

    Api.setMe(getProfileFromEditProfileForm()).then((profile) => {
      if (profile.status !== 200) new Error(JSON.stringify(profile))
      setProfile(profile);
      closePopup(editProfilePopup);
    }).catch((error) => {
      console.log(error);
    }).finally(() => {
      submitLoaded();
    });

    e.preventDefault();
  })
}

const setupEditProfileAvatarPopup = () => {
  const editProfileAvatarPopupFormSubmitButton = editProfileAvatarPopupForm.querySelector(".form__submit");

  editProfileAvatarPopupForm.addEventListener("submit", (e) => {
    const submitLoaded = submitLoading(editProfileAvatarPopupFormSubmitButton);

    Api.setMyAvatar(getProfileAvatarFromEditProfileAvatarForm())
      .then((profile) => {
        if (profile.status !== 200) new Error(JSON.stringify(profile))
        setProfile(profile);
        closePopup(editProfileAvatarPopup);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        submitLoaded();
      });

    e.preventDefault();
  })
}

const setupAddPlacePopup = () => {
  const addPlaceFormSubmitButton = addPlacePopupForm.querySelector(".form__submit");

  addPlacePopupForm.addEventListener("submit", async (e) => {
    const submitLoaded = submitLoading(addPlaceFormSubmitButton);

    Api.createCard(getPlaceFromAddPlacePopup())
      .then((card) => {
        if (card.status !== 200) new Error(JSON.stringify(card));
        renderToStart(cardsContainer, createCard(card));
        closePopup(addPlacePopup);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        submitLoaded();
      })

    e.preventDefault();
  })
}

const setupProfile = async () => {
  try {
    const profile = await Api.me();
    if (profile.status !== 200) new Error(JSON.stringify(profile))
    Api.myId = profile._id;
    setProfile(profile);
  } catch (error) {
    console.log(error)
  }

  setProfile(profile);
  profileEditButton.addEventListener("click", () => {
    setProfileToEditProfileForm(getProfile());
    openPopup(editProfilePopup);
  });
  profileEditAvatarButton.addEventListener("click", () => {
    resetEditProfileAvatarForm();
    openPopup(editProfileAvatarPopup)
  });
}

const setupTopBar = () => {
  topBarAddButton.addEventListener("click", () => {
    resetAddPlaceForm();
    openPopup(addPlacePopup);
  })
}

const setupCards = () => {
  Api.getCards()
    .then((cards) => {
      renderToStart(cardsContainer, ...cards.map(card => createCard(card)));
    })
    .catch((error) => {
      console.log(error)
    })
}

document.addEventListener("DOMContentLoaded", async () => {
  enableValidation();

  setupPopups();

  setupTopBar();
  await setupProfile();
  setupAddPlacePopup();
  setupEditProfilePopup();
  setupEditProfileAvatarPopup();

  setupCards();

})