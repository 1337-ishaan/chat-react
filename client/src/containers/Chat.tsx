import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import MessagesPanel from "../components/MessagesPanel";
import RenderConnectedUsers from "../components/RenderConnectedUsers";
import SearchConnectedUsers from "../components/SearchConnectedUsers";
import SendMessage from "../components/SendMessage";
import socket from "../socket";
import { AUTH_ERROR_SOCKET } from "../store/types";

const Chat = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // if connection error occurs, return to Auth page
    socket.on("connect_error", (err) => {
      err.message === "Invalid Username" &&
        dispatch({ type: AUTH_ERROR_SOCKET });
    });
  }, []);

  return (
    <div className="flex flex-row">
      <div className="flex flex-col pl-8 pt-8 w-2/5">
        <SearchConnectedUsers />
        <RenderConnectedUsers />
      </div>
      <div className="flex flex-col w-full p-8 h-screen ">
        <MessagesPanel />
        <SendMessage />
      </div>
    </div>
  );
};

export default Chat;
