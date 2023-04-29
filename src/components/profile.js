import { request } from "./net";

const profileElement = document.querySelector(".profile");
const profileAvatar = profileElement.querySelector(".profile__avatar");
const profileName = profileElement.querySelector(".profile__name");
const profileDescription = profileElement.querySelector(".profile__description");

export const setProfileAvatar = (url, sync = true) => {
  if (sync) {
    url = uploadProfile({avatar: url}).url;
  }
  profileAvatar.src = url;
}

export const setProfile = (profile, sync = true) => {
  if (sync) {
    profile = uploadProfile({
      name,
      about: profile.description
    })
  }
  profileName.textContent = profile.name;
  profileDescription.textContent = profile.description;
}

export const getProfile = () => {
  return {
    name: profileName.textContent,
    description: profileDescription.textContent
  }
}

export const loadProfile = async () => {
  const res = await request({
    method: "GET",
    path: "/users/me",
  })

  const {name, about, avatar} = await res.json();

  setProfileAvatar(avatar);
  setProfile({name, description: about});
}

export const uploadProfile = async (profile) => {
  const res = await request({
    path: "/users/me",
    method: "PATCH",
    body: JSON.stringify(profile)
  })

  return await res.json();
}