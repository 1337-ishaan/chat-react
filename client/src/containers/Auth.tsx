import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUsername } from "../store/actions";
import { SUBMIT_USERNAME } from "../store/types";
import socket from "../socket";

const Auth = () => {
  const dispatch = useDispatch();
  const { username, usernameSelected } = useSelector(
    (state: any) => state.setUsernameReducer
  );

  const submitUsername = (event: React.FormEvent) => {
    event.preventDefault(); // prevents reloading of page onSubmit & onClick
    dispatch({ type: SUBMIT_USERNAME });
    socket.auth = { username };
    socket.connect();
    return;
  };

  const checkIfUserPersists = () => {
    const sessionID = localStorage.getItem("sessionID");
    if (sessionID) {
      dispatch({ type: SUBMIT_USERNAME });
      socket.auth = { sessionID };
      socket.connect();
    }
  };

  useEffect(() => {
    checkIfUserPersists();
  }, []);

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={(e) => submitUsername(e)}
        className="p-10 bg-white rounded flex justify-center items-center flex-col shadow-md"
      >
        <p className="mb-5 text-3xl uppercase text-gray-600">
          Select your cool username :-)
        </p>
        <input
          type="name"
          name="name"
          onChange={(e) => dispatch(setUsername(e))}
          className="mb-5 p-3 w-80 focus:border-purple-700 rounded border-2 outline-none"
          autoComplete="off"
          placeholder="eg: '1337-xyz' ..."
          required
        />
        {usernameSelected && <div>Username is selected </div>}
        <button
          onClick={(e) => submitUsername(e)}
          className="bg-purple-600 hover:bg-purple-900 text-white font-bold p-2 rounded w-80"
          id="login"
          type="submit"
        >
          <span>Let's go</span>
        </button>
      </form>
    </div>
  );
};

export default Auth;
