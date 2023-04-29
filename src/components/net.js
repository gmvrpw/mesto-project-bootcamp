export const request = ({method, path, body}) => {
  return fetch(`https://nomoreparties.co/v1/${process.env.GROUP_ID}${path}`, {
    method: method,
    headers: {
      authorization: process.env.TOKEN,
      'Content-Type': 'application/json'
    },
    body,
  });
}