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

httpServer.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`));
