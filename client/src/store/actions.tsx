import { SELECT_USERNAME } from "./types";

// set the username & store it in global store
const setUsername = (event: React.FormEvent<HTMLInputElement>) => {
  let eventTarget = event.target as any;
  console.log(eventTarget.value, "VALUE");
  // TODO => handle null/empty inputs

  return {
    type: SELECT_USERNAME,
    payload: eventTarget.value,
  };
};

export { setUsername };
