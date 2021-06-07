import { CONNECTED_USERS, SELECT_USERNAME, SUBMIT_USERNAME } from "./types";
import { useSnackbar } from 'react-simple-snackbar'



// set the username & store it in global store
export const setUsername = (event: React.FormEvent<HTMLInputElement>) => {
  let eventTarget: any = event.target; // gets the node targetted by the function
  return {
    type: SELECT_USERNAME,
    payload: eventTarget.value,
  };
};

