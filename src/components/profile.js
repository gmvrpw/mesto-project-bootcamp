const profileElement = document.querySelector(".profile");
const profileAvatar = profileElement.querySelector(".profile__avatar");
const profileName = profileElement.querySelector(".profile__name");
const profileAbout = profileElement.querySelector(".profile__about");

export const setProfile = (profile) => {
  if (profile.avatar) profileAvatar.src = profile.avatar;
  if (profile.about) profileAbout.textContent = profile.about;
  if (profile.name) profileName.textContent = profile.name;
}

export const getProfile = () => {
  return {
    avatar: profileAvatar.src,
    name: profileName.textContent,
    about: profileAbout.textContent
  }
}