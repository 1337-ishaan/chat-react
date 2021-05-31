import { connected } from "process";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import socket from "../socket";
import { CONNECTED_USERS, SELECT_USER } from "../store/types";

const RenderConnectedUsers = ({ connectedUsersList }: any) => {
  // const [connectedUsersList, setConnectedUsersList]: any = useState([]);
  const dispatch = useDispatch();
  const { usersList } = useSelector((state: any) => state.setUsernameReducer);

  console.log(connectedUsersList, "userslist");
  // const initReactiveProperties = (user: any) => {
  //   //TODO: change 'any' to customized interface
  //   user.connected = true;
  //   user.messages = [];
  //   user.hasNewMessages = false;
  //   setConnectedUsersList((prevUsers: any) => [...prevUsers, user]); //setting the connected users in state
  // };
  // // storing connected users
  // const setConnectedUsers = () => {
  //   socket.on("users", (users) => {
  //     users.forEach((user: any) => {
  //       user.self = user.userID === socket.id; // if the user is the authenticated user
  //       initReactiveProperties(user);
  //     });
  //     users = users.sort((a: any, b: any) => {
  //       if (a.self) return -1;
  //       if (b.self) return 1;
  //       if (a.username < b.username) return -1;
  //       return a.username > b.username ? 1 : 0;
  //     });
  //   });
  // };

  // // after new user connects, store it in an array
  // const storeNewUser = () => {
  //   socket.on("user connected", (user) => {
  //     initReactiveProperties(user);
  //   });
  // };

  // useEffect(() => {
  //   setConnectedUsers();
  //   storeNewUser();
  // }, [usersList]);

  console.log(connectedUsersList, "connectedUsersList");
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
