export class Api {
  static token = process.env.TOKEN
  static cohort = process.env.GROUP_ID
  static myId;

  static authorizedFetch = async ({method, path, body}) => {
    const response = await fetch(`https://nomoreparties.co/v1/${this.cohort}${path}`, {
      method: method,
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body),
    });

    return await response.json()
  }

  static async authorize() {
    Api.myId = await this.me()._id;
  }

  static async me() {
    return await this.authorizedFetch({
      path: "/users/me",
      method: "GET",
    })
  }
  static async setMyAvatar(avatar) {
    return await this.authorizedFetch({
      path: "/users/me/avatar",
      method: "PATCH",
      body: {avatar}
    })
  }
  static async setMe(user) {
    return await this.authorizedFetch({
      path: "/users/me",
      method: "PATCH",
      body: user
    })
  }

  static async getCards() {
    return await this.authorizedFetch({
      path: "/cards",
      method: "GET"
    })
  }
  static async createCard(card) {
    return await this.authorizedFetch({
      path: "/cards",
      method: "POST",
      body: card,
    })
  }
  static async deleteCard(cardId) {
    return await this.authorizedFetch({
      path: `/cards/${cardId}`,
      method: "DELETE"
    })
  }

  static async likeCard(cardId) {
    return await this.authorizedFetch({
      path: `/cards/likes/${cardId}`,
      method: "PUT"
    })
  }
  static async dislikeCard(cardId) {
    return await this.authorizedFetch({
      path: `/cards/likes/${cardId}`,
      method: "DELETE"
    })
  }
}