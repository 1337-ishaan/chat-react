import { globalStore } from "./store";
import { SELECT_USERNAME } from "./types";

export const setUsernameReducer = (state = globalStore, action: any) => {
  console.log(state, "redux state here");
  switch (action.type) {
    case SELECT_USERNAME:
      return { ...state, username: action.payload };
    default:
      return state;
  }
};
