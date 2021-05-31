import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Auth from "./containers/Auth";
import Chat from "./containers/Chat";
import socket from "./socket";
import { CONNECTED_USERS, SELECT_USER } from "./store/types";

// TODO: need to refactor code for usersList
const App = () => {
  const { usernameSelected, usersList } = useSelector(
    (state: any) => state.setUsernameReducer
  );
  const [connectedUsersList, setConnectedUsersList]: any = useState([]);
  const dispatch = useDispatch();
  const initReactiveProperties = (user: any) => {
    //TODO: change 'any' to customized interface
    user.connected = true;
    user.messages = [];
    user.hasNewMessages = false;
    setConnectedUsersList((prevUsers: any) => [...prevUsers, user]); //setting the connected users in state
  };
  // storing connected users
  const setConnectedUsers = () => {
    socket.on("users", (users) => {
      users.forEach((user: any) => {
        user.self = user.userID === socket.id; // if the user is the authenticated user
        initReactiveProperties(user);
      });
      users = users.sort((a: any, b: any) => {
        if (a.self) return -1;
        if (b.self) return 1;
        if (a.username < b.username) return -1;
        return a.username > b.username ? 1 : 0;
      });
    });
  };

  // after new user connects, store it in an array
  const storeNewUser = () => {
    socket.on("user connected", (user) => {
      initReactiveProperties(user);
    });
  };

  useEffect(() => {
    setConnectedUsers();
    storeNewUser();
  }, [usersList]);

  return (
    <>
      {usernameSelected ? (
        <Chat connectedUsersList={connectedUsersList} />
      ) : (
        <Auth />
      )}
    </>
  );
};

export default App;
