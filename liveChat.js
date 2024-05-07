const fs = require("fs");

const liveChat = (io) => {
  io.on("connection", (socket) => {
    socket.on("user-message", (data) => {
      console.log(data);
      let ipAddress = socket.request.connection.remoteAddress;
      console.log(ipAddress);
      if (data && data.trim() !== "") {
        storeMessage(data);
        io.emit("client-message", data);
      } else {
        io.emit("client-message", "Please enter valid message");
      }
    });
  });
};

function storeMessage(data) {
  const message = JSON.stringify(data) + "\n";
  fs.appendFile("messages.txt", message, (err) => {
    if (err) {
      console.error("Error storing message:", err);
    } else {
      console.log("Message stored successfully.");
    }
  });
}

module.exports = liveChat;
