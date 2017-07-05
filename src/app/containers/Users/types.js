// @flow
export type User = {
  name: string,
  email: string
};
export type Users = Array<User>;
export type UsersState = {
  isFetched: boolean,
  data: Users
};
export type UsersProps = UsersState & {
  dispatch?: Function
};
