export function getUsers() {
  return fetch(`${process.env.DOMAIN}/api/users`)
    .then(data => data.json());
}
