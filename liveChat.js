const liveChat = (io) => {
  io.on("connection", (socket) => {
    socket.on("user-message", (data) => {
      console.log(data);
      io.emit("client-message", data);
    });
  });
};

module.exports = liveChat;
