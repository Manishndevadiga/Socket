const express = require("express");
const http = require("http");
const app = express();
const path = require("path");
const { Server } = require("socket.io");
const liveChat = require("./liveChat");

const server = http.createServer(app);

const io = new Server(server);

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve("./public")));

liveChat(io);

app.get("/", (req, res) => {
  return res.sendFile(path.resolve("./public/second.html"));
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
