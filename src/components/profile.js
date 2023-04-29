import { request } from "./net";

const profileElement = document.querySelector(".profile");
const profileAvatar = profileElement.querySelector(".profile__avatar");
const profileName = profileElement.querySelector(".profile__name");
const profileAbout = profileElement.querySelector(".profile__about");

export const setProfile = (profile, sync) => {
  if (sync) {
    profile = uploadProfile(profile);
  }

  if (profile.avatar) profileAvatar.src = profile.avatar;
  if (profile.about) profileAbout.textContent = profile.about;
  if (profile.name) profileName.textContent = profile.name;
}

export const setProfileAvatar = (url, sync = true) => {
  if (sync) {
    url = uploadProfile({avatar: url}).url;
  }
  profileAvatar.src = url;
}

export const getProfile = () => {
  return {
    avatar: profileAvatar.src,
    name: profileName.textContent,
    about: profileAbout.textContent
  }
}

export const loadProfile = async () => {
  const res = await request({
    method: "GET",
    path: "/users/me",
  })

  const {name, about, avatar} = await res.json();

  setProfileAvatar(avatar);
  setProfile({name, about});
}

export const uploadProfile = async (profile) => {
  const res = await request({
    path: "/users/me",
    method: "PATCH",
    body: JSON.stringify(profile)
  })

  return await res.json();
}