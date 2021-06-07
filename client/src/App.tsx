import { useEffect, useState } from "react";
import SnackbarProvider from "react-simple-snackbar";
import { useDispatch, useSelector } from "react-redux";
import { Socket } from "socket.io-client";
import "./App.css";
import Auth from "./containers/Auth";
import Chat from "./containers/Chat";
import socket from "./socket";

const App = () => {
  const { usernameSelected } = useSelector(
    (state: any) => state.setUsernameReducer
  );
  const [connectedUsersList, setConnectedUsersList]: any = useState([]);
  const initReactiveProperties = (user: any) => {
    //TODO: change 'any' to customized interface
    user.connected = true;
    user.messages = [];
    user.hasNewMessages = false;
    setConnectedUsersList((prevUsers: any) => [...prevUsers, user]); //setting the connected users in state
  };

  console.log(connectedUsersList, "cuulist");
  const isUserConnected = () => {
    socket.on("disconnect", () => {
      connectedUsersList.forEach((user: any) => {
        if (user.self) {
          user.connected = false;
        }
      });
    });
  };
  console.log(socket, "socket");
  // storing connected users
  const setConnectedUsers = () => {
    socket.on("users", (users) => {
      users = users.sort((a: any, b: any) => {
        if (a.self) return -1;
        if (b.self) return 1;
        if (a.username < b.username) return -1;
        return a.username > b.username ? 1 : 0;
      });
      users.forEach((user: any) => {
        user.self = user.userID === socket.id; // if the user is the authenticated user
        initReactiveProperties(user);
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

  interface ISocket extends Socket {
    userID?: any;
    sessionID?: any;
    username?: string;
  }

  // persisting the user
  const persistUser = (socket: ISocket) => {
    socket.on("session", ({ sessionID, userID, username }) => {
      socket.auth = { sessionID, username }; //storing the sessionID and username in socket
      !(connectedUsersList.length > 0)
        ? localStorage.setItem("sessionID", sessionID)
        : localStorage.removeItem("sessionID"); //store the sessionID in localStorage
      socket.userID = userID; // also store the userID in socket
    });
  };

  useEffect(() => {
    setConnectedUsers();
    storeNewUser();
    persistUser(socket);
  }, []);

  useEffect(() => {
    isUserConnected();
    // cleaning up equivalent to componentDidUnmount
    () => (
      socket.off("connect"),
      socket.off("disconnect"),
      socket.off("users"),
      socket.off("user connected"),
      socket.off("user disconnected"),
      socket.off("private message")
    );
  });

  return (
    <SnackbarProvider>
      {usernameSelected ? (
        <Chat connectedUsersList={connectedUsersList} />
      ) : (
        <Auth />
      )}
    </SnackbarProvider>
  );
};

export default App;
