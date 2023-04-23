const profile = document.querySelector(".profile");
const profileName = profile.querySelector(".profile__name");
const profileDescription = profile.querySelector(".profile__description");

export const setProfile = ({name, description}) => {
  profileName.textContent = name;
  profileDescription.textContent = description;
}

export const getProfile = () => {
  return {
    name: profileName.textContent,
    description: profileDescription.textContent
  }
}