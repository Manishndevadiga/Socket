const express = require("express");
const http = require("http");
const app = express();
const path = require("path");
const { Server } = require("socket.io");
const liveChat = require("./liveChat");
const fs = require("fs");

const server = http.createServer(app);

const io = new Server(server);

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve("./public")));

liveChat(io);

app.get("/", (req, res) => {
  return res.sendFile(path.resolve("./public/second.html"));
});

app.get("/chats", (req, res) => {
  return res.sendFile(path.resolve("./public/chats.html"));
});

app.get("/getChats", (req, res) => {
  fs.readFile("messages.txt", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error reading file");
    }
    return res.status(200).send(data);
  });
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
