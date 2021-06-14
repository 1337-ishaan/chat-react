const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer, {
  cors: {
    origin: "http://143.110.246.44:3000",
  },
});

const randomId = () => require("crypto").randomBytes(8).toString("hex");
let sessions = new Map();
const messages: any = [];
const findSession = (id: any) => {
  return sessions.get(id);
};

const saveSession = (id: any, session: any) => {
  sessions.set(id, session);
};

const findAllSessions = () => {
  return [...sessions.values()];
};

const saveMessage = (message: any) => {
  messages.push(message);
};

const findMessageForUser = (userID: any) => {
  return messages.filter(
    ({ from, to }: any) => from === userID || to === userID
  );
};

io.use((socket: any, next: any) => {
  const sessionID = socket.handshake.auth.sessionID;
  if (sessionID) {
    const session = findSession(sessionID);
    if (session) {
      socket.sessionID = sessionID;
      socket.userID = session.userID;
      socket.username = session.username;
      return next();
    }
  }
  const username = socket.handshake.auth.username;
  if (!username) {
    return next(new Error("invalid username"));
  }
  socket.sessionID = socket.id;
  socket.userID = socket.id;
  socket.username = username;
  next();
});
const removeUser = (userList: any, userID: any) => {
  for (let i in userList) {
    if (userList[i].userID == userID) {
      userList.splice(i, 1);
    }
    console.log(userID, "username");
  }

  io.emit("users after disconnection", userList);
  io.emit("users", userList);

  console.log(userList, "ikk");
  return userList;
};

io.sockets.on("connection", (socket: any) => {
  // persist session
  saveSession(socket.sessionID, {
    userID: socket.userID,
    username: socket.username,
    connected: true,
  });

  // emit session details
  socket.emit("session", {
    sessionID: socket.sessionID,
    userID: socket.userID,
  });

  // join the "userID" room
  socket.join(socket.userID);

  // fetch existing users
  var users: any = [];
  const messagesPerUser = new Map();
  findMessageForUser(socket.userID).forEach((message: any) => {
    const { from, to } = message;
    const otherUser = socket.userID === from ? to : from;
    if (messagesPerUser.has(otherUser)) {
      messagesPerUser.get(otherUser).push(message);
    } else {
      messagesPerUser.set(otherUser, [message]);
    }
  });
  findAllSessions().forEach((session: any) => {
    users.push({
      userID: session.userID,
      username: session.username,
      connected: session.connected,
    });
  });
  socket.emit("users", users);

  // notify existing users
  // socket.on("user disconnected", (id: number) => {
  //   for (let i = 0; i < users.length; i++) {
  //     const user = users[i];
  //     if (user.userID === id) {
  //       user.connected = false;
  //       break;
  //     }
  //   }
  // });

  socket.broadcast.emit("user connected", {
    userID: socket.userID,
    username: socket.username,
    connected: true,
  });

  // forward the private message to the right recipient (and to other tabs of the sender)
  socket.on("private message", ({ content, to }: any) => {
    socket.to(to).to(socket.userID).emit("private message", {
      content,
      from: socket.userID,
      to,
    });
  });

  // notify users upon disconnection
  socket.on("disconnect", async () => {
    const matchingSockets = await io.in(socket.userID).allSockets();
    const isDisconnected = matchingSockets.size === 0;
    if (isDisconnected) {
      // notify other users
      socket.broadcast.emit("user disconnected", socket.userID);
      // update the connection status of the session
      saveSession(socket.sessionID, {
        userID: socket.userID,
        username: socket.username,
        connected: false,
      });
    }
  });
});

const PORT = process.env.REACT_APP_PORT || 3010;

httpServer.listen(PORT, () =>
  console.log(`server listening at http://localhost:${PORT}`)
);
