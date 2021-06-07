import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import socket from "../socket";
import { SELECT_USER } from "../store/types";

const MessagesPanel = ({ connectedUsersList }: any) => {
  const dispatch = useDispatch();
  const { selectedUserToChat } = useSelector(
    (state: any) => state.setUsernameReducer
  );

  const getUserMessages = ({ content, from }: any) => {
    var user;
    for (let i = 0; i < connectedUsersList.length; i++) {
      user = connectedUsersList[i];
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

  // scroll to bottom on new messages / on page open
  const messagesEl: any = useRef(null);
  const scrollToBottom = () => {
    messagesEl.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  });

  useEffect(() => {
    socket.on("private message", getUserMessages);
  }, [connectedUsersList]);

  //check the logic for rendering alternate messages perfectly
  return (
    <div className="flex h-screen mt-2 flex-nowrap overflow-auto  flex-col  ">
      {" "}
      <div className="mt-auto flex flex-col">
        {selectedUserToChat &&
          selectedUserToChat.messages &&
          selectedUserToChat.messages.map((message: any, i: number) => (
            <div key={i}>
              <span
                className={`${
                  selectedUserToChat.messages[i].fromSelf
                    ? "px-4 py-2 my-1 rounded-t-lg rounded-bl-lg inline-block bg-blue-600 text-white float-right"
                    : "px-4 my-1 py-2 rounded-r-lg rounded-bl-lg inline-block bg-gray-300 text-black"
                }`}
              >
                {message.content}{" "}
              </span>
            </div>
          ))}{" "}
      </div>
      <div className="dummy" ref={messagesEl}></div>
    </div>
  );
};

export default MessagesPanel;
