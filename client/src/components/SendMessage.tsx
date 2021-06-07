import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import socket from "../socket";
import { SELECT_USER } from "../store/types";
import { useSnackbar } from "react-simple-snackbar";

const SendMessage = () => {
  const [messageToSend, setMessageToSend] = useState("");
  const snackbarOptions = {
    position: "top-right",
  };
  const [openSnackbar, closeSnackbar] = useSnackbar(snackbarOptions);
  const dispatch = useDispatch();
  const { selectedUserToChat } = useSelector(
    (state: any) => state.setUsernameReducer
  );

  const onMessage = (e: any, content: any) => {
    e.preventDefault();
    if (messageToSend && selectedUserToChat) {
      socket.emit("private message", {
        content,
        to: selectedUserToChat.userID,
      });
      selectedUserToChat.messages.push({
        content,
        fromSelf: true,
      });
      dispatch({ type: SELECT_USER, payload: selectedUserToChat });
      setMessageToSend("");
    } else {
      if (!messageToSend && selectedUserToChat) {
        openSnackbar(
          "Please write something, just in case if the selected user doesn't feel bad lol"
        );
      }
      if (messageToSend && !selectedUserToChat) {
        openSnackbar("Please select a user");
      }
      if (!messageToSend && !selectedUserToChat) {
        openSnackbar("Please select a user");
      }
    }
  };

  return (
    <form onSubmit={(e) => onMessage(e, messageToSend)} className="mt-2">
      <div className="bg-white flex items-center bg-gray-900 text-2xl rounded-full shadow-xl">
        <input
          className="rounded-l-full w-full py-1 px-6 text-white bg-gray-900  leading-tight focus:outline-none"
          id="Message"
          type="text"
          value={messageToSend}
          autoComplete="false"
          placeholder="Write something ..."
          onChange={(e) => setMessageToSend(e.target.value)}
        />
        <div onClick={(e) => onMessage(e, messageToSend)} className="px-4 py-2">
          <button className="text-3xl bg-green-200 text-black  rounded-full p-2 hover:bg-green-400 focus:outline-none w-12 h-12 flex items-center justify-center">
            {">"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default SendMessage;
