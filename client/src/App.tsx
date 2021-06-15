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
    user.connected = user.connected ? true : false;
    user.messages = [];
    user.hasNewMessages = false;
    user.connected && setConnectedUsersList((prevUsers: any) => [...prevUsers, user]); //setting the connected users in state
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

  const isUserDisconnected = () => {
    socket.on("connect", () => {
      connectedUsersList.forEach((user: any) => {
        if (user.self) {
          user.connected = true;
        }
      });
    });
  };
  console.log(socket, "SOCKET");
  // storing connected users
  const setConnectedUsers = () => {
    socket.on("users", (users) => {
      let localID = localStorage.getItem("sessionID");
      users.forEach((user: any) => {
        user.self = user.userID === localID; // if the user is the authenticated user
        initReactiveProperties(user);
      });
      users.sort((a: any, b: any) => {
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

  interface ISocket extends Socket {
    userID?: any;
    sessionID?: any;
    username?: string;
  }

  // persisting the user
  const persistUser = (socket: ISocket) => {
    socket.on("session", ({ sessionID, userID, username }) => {
      socket.auth = { sessionID, username }; //storing the sessionID and username in socket
      !(connectedUsersList.length > 0) &&
        (localStorage.setItem("sessionID", sessionID),
        (socket.userID = userID));
    });
  };

  const setUsersAfterDisconnection = () => {
    socket.on("user disconnected", (id: any) => {
      for (let i = 0; i < connectedUsersList.length; i++) {
        const user = connectedUsersList[i];
        console.log(user);
        if (user.userID === id) {
          user.connected = false;
          console.log(connectedUsersList, user, "user and connectedUsersList");
          break;
        }
      }
      setConnectedUsersList((prevUsers: any) => [...prevUsers, connectedUsersList]);    }
    );
  };
  useEffect(() => {
    setConnectedUsers();
    storeNewUser();
    persistUser(socket);
  }, []);

  useEffect(() => {
    // isUserConnected();
    isUserDisconnected();
    setUsersAfterDisconnection(); // setting users after
    // cleaning up equivalent to componentDidUnmount
  });

  return (
    <SnackbarProvider>
      {usernameSelected ? (
        <Chat connectedUsersList={connectedUsersList} />
      ) : (
        <Auth connectedUsersList={connectedUsersList} />
      )}
    </SnackbarProvider>
  );
};

export default App;
