import { globalStore } from "./store";
import {
  AUTH_ERROR_SOCKET,
  CONNECTED_USERS,
  SELECT_USERNAME,
  SUBMIT_USERNAME,
  SELECT_USER,
} from "./types";

export const setUsernameReducer = (state = globalStore, action: any) => {
  switch (action.type) {
    case SELECT_USERNAME: //changes username value
      return { ...state, username: action.payload };
    case SUBMIT_USERNAME: //after submitting username
      return { ...state, usernameSelected: true };
    case AUTH_ERROR_SOCKET: //handling socket.io connection error
      return { ...state, username: null, usernameSelected: false };
    case CONNECTED_USERS:
      return { ...state, usersList: [action.payload] };
    case SELECT_USER:
      return { ...state, selectedUserToChat: action.payload };
    default:
      return state;
  }
};

// export const connectedUsersReducer = (state = globalStore, action: any) => {
//   switch (action.type) {
//     default:
//       return state;
//   }
// };
