import { connected } from "process";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Socket } from "socket.io-client";
import "./App.css";
import Auth from "./containers/Auth";
import Chat from "./containers/Chat";
import socket from "./socket";

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

  const data =
    connectedUsersList &&
    connectedUsersList.filter((user: any, i: any) => {
      return (
        connectedUsersList.findIndex((item: any) => item.userID === user.id) ===
        i
      );
    });

  const isUserConnected = () => {
    socket.on("disconnect", () => {
      connectedUsersList.forEach((user: any) => {
        console.log(connectedUsersList, "user in disconnection");
        if (user.self) {
          user.connected = false;
        }
      });
    });
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
    !localStorage.getItem("sessionID") &&
      socket.once("user connected", (user) => {
        initReactiveProperties(user);
      });
  };

  console.log(localStorage.getItem("sessionID"), "localstorage")
  interface ISocket extends Socket {
    userID?: any;
    sessionID?: any;
    username?: string;
  }

  // persisting the user
  const persistUser = (socket: ISocket) => {
    socket.on("session", ({ sessionID, userID, username }) => {
      socket.auth = { sessionID, username }; //storing the sessionID and username in socket
      localStorage.setItem("sessionID", sessionID); //store the sessionID in localStorage
      socket.userID = userID; // also store the userID in socket
    });
  };

  // !bug: remove duplicate users on page reload
  useEffect(() => {
    setConnectedUsers();
    storeNewUser();
    console.log("check duplication");
    persistUser(socket);
  }, []);

  useEffect(() => {
    isUserConnected();
  });

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
