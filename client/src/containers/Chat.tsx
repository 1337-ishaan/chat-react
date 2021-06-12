import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MessagesPanel from "../components/MessagesPanel";
import RenderConnectedUsers from "../components/RenderConnectedUsers";
import SendMessage from "../components/SendMessage";
import socket from "../socket";
import { AUTH_ERROR_SOCKET, LOGOUT_USER } from "../store/types";

const Chat = (props: any) => {
  const { connectedUsersList } = props;
  const dispatch = useDispatch();

  const { selectedUserToChat, usersList } = useSelector(
    (state: any) => state.setUsernameReducer
  );

  // logout function
  const logoutFunction = () => {
    localStorage.removeItem("sessionID");
    dispatch({ type: LOGOUT_USER });
    socket.disconnect();
  };

  useEffect(() => {
    // if connection error occurs, return to Auth page
    socket.on("connect_error", (err) => {
      err.message === "Invalid Username" &&
        dispatch({ type: AUTH_ERROR_SOCKET });
    });
  }, []);

  return (
    <div className="flex  flex-row ">
      <div className="flex bg-gray-900 flex-col pl-8 pt-8 w-2/5">
        {/* <SearchConnectedUsers /> */}

        <RenderConnectedUsers connectedUsersList={connectedUsersList} />
      </div>
      <div className="flex flex-col w-full p-8 bg-gradient-to-bl from-purple-900 via-purple-600 to-purple-500  overflow-auto  h-screen ">
        <div className="flex bg-gray-800 text-white p-3 rounded-lg justify-between">
          <div className="text-5xl font-bold">
            {selectedUserToChat && selectedUserToChat.username}
          </div>
          <div
            onClick={() => logoutFunction()}
            className="text-2xl transform duration-500  hover:-translate-y-1 bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 border-b-4  border-red-700 hover:border-red-500 rounded-lg cursor-pointer font-bold"
          >
            Logout
          </div>
        </div>
        <MessagesPanel connectedUsersList={connectedUsersList} />
        <SendMessage />
      </div>
    </div>
  );
};

export default Chat;
