const express = require("express");
const cors = require("cors");
const http = require("http");

const app = express();
app.use(cors);

require("dotenv").config(); // for storing confidential information to hide

let PORT = process.env.REACT_APP_PORT || 3010;

const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer, {
  cors: {
    origin: "http://143.110.246.44:3000",
  },
});

// check the username and allow the connection
io.use((socket: any, next: any) => {
  const username = socket.handshake.auth.username;
  if (!username) return next(new Error("Invalid Username")); // if no username then return Error
  socket.username = username; // set username to socket JSON
  next(); // IMPORTANT: passes to the next middleware
});

// listing and sending the connected users to the client
io.on("connection", (socket: any) => {
  const users = [];
  for (let [id, socket] of io.of("/").sockets) {
    users.push({
      userID: id,
      username: socket.handshake.auth.username,
    });
  }
  socket.emit("users", users);
});

// notify the other connected users if a new users connects
io.on("connection", (socket: any) => {
  socket.broadcast.emit("user connected", {
    userID: socket.id,
    username: socket.username,
  });
});

// starting the http server
httpServer.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`));
