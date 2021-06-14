import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CONNECTED_USERS, SELECT_USER } from "../store/types";

const RenderConnectedUsers = ({ connectedUsersList }: any) => {
  const dispatch = useDispatch();
  const { username } = useSelector((state: any) => state.setUsernameReducer);
  return (
    <div className="pl-5 ">
      <div className="text-4xl my-6 font-extrabold text-white tracking-widest">
        USERS
      </div>
      <div className="overflow-y-auto">
        {connectedUsersList &&
          connectedUsersList.map(
            (user: any, i: number) =>
              user.connected && (
                <div
                  className="mb-1 py-2  font-bold bg-white text-black bg-opacity-80 pl-5 hover:bg-opacity-100 rounded-lg w-4/5 font-medium cursor-pointer text-2xl"
                  key={i}
                  onClick={() => dispatch({ type: SELECT_USER, payload: user })}
                >
                  {user.username} {user.self ? "(You)" : ""}
                </div>
              )
          )}
      </div>
    </div>
  );
};

export default RenderConnectedUsers;
