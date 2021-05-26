import { globalStore } from "./store";
import { SELECT_USERNAME, SUBMIT_USERNAME } from "./types";

export const setUsernameReducer = (state = globalStore, action: any) => {
  switch (action.type) {
    case SELECT_USERNAME: //changes username value
      return { ...state, username: action.payload, usernameSelected: false };
    case SUBMIT_USERNAME: //after submitting username
      return { ...state, usernameSelected: true };
    default:
      return state;
  }
};
