import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import socket from "../socket";
import { SELECT_USER } from "../store/types";

const SendMessage = () => {
  const [messageToSend, setMessageToSend] = useState("");
  const dispatch = useDispatch();
  const { selectedUserToChat } = useSelector(
    (state: any) => state.setUsernameReducer
  );

  // !bug to fix, selectedUserToChat pushes the content multiple times  
  const onMessage = (e: any, content: any) => {
    e.preventDefault();
    if (selectedUserToChat) {
      socket.emit("private message", {
        content,
        to: selectedUserToChat.userID,
      });
      selectedUserToChat.messages.push({
        content,
        fromSelf: true,
      });
      dispatch({ type: SELECT_USER, payload: selectedUserToChat });
    }
    setMessageToSend("");
  };

  return (
    <form onSubmit={(e) => onMessage(e, messageToSend)} className="">
      <div className="bg-white flex items-center rounded-full shadow-xl">
        <input
          className="rounded-l-full w-full py-4 px-6 text-gray-700 leading-tight focus:outline-none"
          id="Message"
          type="text"
          value={messageToSend}
          placeholder="Search"
          onChange={(e) => setMessageToSend(e.target.value)}
        />
        <div onClick={(e) => onMessage(e, messageToSend)} className="p-4">
          <button className="text-3xl bg-blue-500 text-white rounded-full p-2 hover:bg-blue-400 focus:outline-none w-12 h-12 flex items-center justify-center">
            {">"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default SendMessage;
