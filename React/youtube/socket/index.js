import { Server } from "socket.io";

const io = new Server({
  cors: {
    origin: "http://localhost:3000",
  },
});

let onlineUsers = [];

const addNewUser = (username, socketId) => {
  console.log("addNewUser");
  !onlineUsers.some((user) => user.username === username) &&
    onlineUsers.push({ username, socketId });
  console.log(onlineUsers);
};

const removeUser = (socketId) => {
  console.log("removeUser");
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

const getUser = (username) => {
  console.log("getUser");
  return onlineUsers.find((user) => user.username === username);
};

io.on("connection", (socket) => {
  console.log("connection");
  socket.on("newUser", (username) => {
    addNewUser(username, socket.id);
  });

  socket.on("sendNotification", ({ senderName, receiverName, type }) => {
    console.log("sendNotification");
    console.table([ senderName, receiverName, type]);
    const receiver = getUser(receiverName);
    io.to(receiver.socketId).emit("getNotification", {
      senderName,
      type,
    });
  });

  socket.on("sendText", ({ senderName, receiverName, text }) => {
    console.log("sendText");
    console.table([ senderName, receiverName, text]);

  const receiver = getUser(receiverName);
    io.to(receiver.socketId).emit("getText", {
      senderName,
      text,
    });
  });

  socket.on("disconnect", () => {
  console.log("disconnect");
  removeUser(socket.id);
  });
});

io.listen(5000);
