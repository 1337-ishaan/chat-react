// single source of truth i.e handling all the states here

// type declaration for the globalStore
type IGlobalStore = {
  usernameSelected?: null | boolean;
  searchedUser?: null | string;
  username?: null | string;
  usersList?: any;
  selectedUserToChat?: null | Object;
};

export const globalStore: IGlobalStore = {
  usernameSelected: null,
  searchedUser: null,
  username: null,
  usersList: null,
  selectedUserToChat: null
};
