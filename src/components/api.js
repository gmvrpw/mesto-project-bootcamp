class Api {
  static token = "00fccd87-cb24-497a-b6d0-96321a72a3ba"
  static cohort = "exp-mipt-fbc-1"
  static myId;

  static authorizedFetch = async ({method, path, body}) => {
    return new Promise((resolve, reject) => {
      fetch(`https://nomoreparties.co/v1/${this.cohort}${path}`, {
        method: method,
        headers: {
          authorization: this.token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
      })
        .then(async (res) => {
          const json = await res.json();
          json.status = res.status;
          resolve(json);
        })
        .catch((error) => {
          reject(error);
        });
    })
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

export default Api;