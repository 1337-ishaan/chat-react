// initialization of socket.io-client
import { io } from "socket.io-client";
const URL = "http://143.110.246.44:3010"; // backend port is 3010
const socket = io(URL, { autoConnect: false, multiplex:false });

// console.log every time the socket event is fired!
socket.onAny((eventName: any, ...args: any) => {
  console.log(eventName, args);
});

export default socket;
