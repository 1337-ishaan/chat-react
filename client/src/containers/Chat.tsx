import React from "react";
import MessagesPanel from "../components/MessagesPanel";
import RenderConnectedUsers from "../components/RenderConnectedUsers";
import SearchConnectedUsers from "../components/SearchConnectedUsers";
import SendMessage from "../components/SendMessage";
const Chat = () => {
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
