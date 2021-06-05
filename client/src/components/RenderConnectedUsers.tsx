import { connected } from "process";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import socket from "../socket";
import { CONNECTED_USERS, SELECT_USER } from "../store/types";

const RenderConnectedUsers = ({ connectedUsersList }: any) => {
  const dispatch = useDispatch();
  return (
    <div className="pl-5">
      <div className="text-4xl my-6 font-extrabold tracking-widest">USERS</div>
      <div>
        {connectedUsersList &&
          connectedUsersList.map((user: any, i: number) => (
            <div
              className="mb-1 font-medium divide-y divide-light-blue-400  border-b-2 border-blue-500 cursor-pointer  text-2xl"
              key={i}
              onClick={() => dispatch({ type: SELECT_USER, payload: user })}
            >
              {user.username} - {user.connected ? "Online": "Offline"}
            </div>
          ))}
      </div>
    </div>
  );
};

export default RenderConnectedUsers;
