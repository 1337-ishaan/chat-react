// single source of truth i.e handling all the states here

// type declaration for the globalStore
type IGlobalStore = {
  usernameSelected?: null | boolean;
  connectedUsers?: null | string;
  searchedUser?: null | string;
  username?: null | string;
  usersList?: any;
};

export const globalStore: IGlobalStore = {
  usernameSelected: null,
  connectedUsers: null,
  searchedUser: null,
  username: null,
  usersList: [],
};
