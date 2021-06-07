import { connected } from "process";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import socket from "../socket";
import { CONNECTED_USERS, SELECT_USER } from "../store/types";

const RenderConnectedUsers = ({ connectedUsersList }: any) => {
  const dispatch = useDispatch();
  return (
    <div className="pl-5 ">
      <div className="text-4xl my-6 font-extrabold tracking-widest">USERS</div>

      <div className="overflow-y-auto">
        {connectedUsersList &&
          connectedUsersList.map((user: any, i: number) => (
            <div
              className="mb-1 py-2 bg-blue-600 bg-opacity-20 pl-5 hover:bg-opacity-50 rounded-lg font-medium divide-y divide-light-blue-400  cursor-pointer  text-2xl"
              key={i}
              onClick={() => dispatch({ type: SELECT_USER, payload: user })}
            >
              {user.username}
            </div>
          ))}
      </div>
    </div>
  );
};

export default RenderConnectedUsers;
