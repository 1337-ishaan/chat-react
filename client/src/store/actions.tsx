import socket from "../socket";
import { SELECT_USERNAME, SUBMIT_USERNAME } from "./types";

// set the username & store it in global store
export const setUsername = (event: React.FormEvent<HTMLInputElement>) => {
  let eventTarget: any = event.target; // gets the node targetted by the function
  if (eventTarget.value === false) return;
  console.log(eventTarget.value, "<-- USERNAME");
  return {
    type: SELECT_USERNAME,
    payload: eventTarget.value,
  };
};


