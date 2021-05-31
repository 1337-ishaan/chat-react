import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import socket from "../socket";
import { SELECT_USER } from "../store/types";

const MessagesPanel = ({ connectedUsersList }: any) => {
  console.log(connectedUsersList, "cul in messagepanel");
  const dispatch = useDispatch();
  const { selectedUserToChat } = useSelector(
    (state: any) => state.setUsernameReducer
  );

  console.log(selectedUserToChat, "selected user to chat");

  // !User's list not updating frequently
  const getUserMessages = ({ content, from }: any) => {
    var user;

    for (let i = 0; i < connectedUsersList.length; i++) {
      user = connectedUsersList[i];
      console.log(user, "user");
    }

    if (user && user.userID === from) {
      console.log("user from");
      user.messages.push({
        content,
        fromSelf: false,
      });
      if (user !== selectedUserToChat) {
        console.log("user to");
        user.hasNewMessages = true;
      }
      dispatch({ type: SELECT_USER, payload: user });
    }
  };

  useEffect(() => {
    socket.on("private message", getUserMessages);
  }, [connectedUsersList]);

  //check the logic for rendering alternate messages perfectly
  console.log(selectedUserToChat, "selected");
  return (
    <div className="flex flex-col h-screen justify-end ">
      {" "}
      {selectedUserToChat &&
        selectedUserToChat.messages &&
        selectedUserToChat.messages.map((message: any, i: number) => (
          <div>
            <span
              className={`${
                selectedUserToChat.messages[i].fromSelf
                  ? "px-4 py-2 my-1 rounded-lg inline-block bg-blue-600 text-white float-right"
                  : "px-4 my-1 py-2 rounded-lg inline-block bg-gray-300 text-black"
              }`}
            >
              {message.content}{" "}
            </span>
          </div>
        ))}{" "}
    </div>
  );
};

export default MessagesPanel;
