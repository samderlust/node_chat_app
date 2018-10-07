const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

const { generateMessage } = require("./utils/message");

const app = express();
const port = process.env.PORT || 3001;
const publicPath = path.join(__dirname, "../public");
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

//register an event listenner,
//"connection" let the io listen to new connection
io.on("connection", socket => {
  // socket.emit("newEmail", {
  //   from: "sang@sang.com",
  //   text: "Hi, this is me"
  // });

  // socket.on("createEmail", newEmail => {
  //   console.log("create email", newEmail);
  // });

  // socket.emit("newMessage", {
  //   from: "someone",
  //   text: "hi how are you",
  //   createdAt: 123
  // });
  socket.emit(
    "newMessage",
    generateMessage("Admin", "Welcome to the chat App")
  );

  socket.broadcast.emit(
    "newMessage",
    generateMessage("Admin", "New user joined")
  );

  socket.on("createMessage", (mess, callback) => {
    console.log("create Message", mess);
    io.emit("newMessage", generateMessage(mess.from, mess.text));
    callback("this is from the server");
    // socket.broadcast.emit("newMessage", {
    //   from: mess.from,
    //   text: mess.text,
    //   createdAt: new Date().getTime()
    // });
  });

  console.log("new user connected");

  socket.on("disconnect", () => console.log("User disconnected"));
});

app.get("/", (req, res) => {
  res.render(index.html);
});

server.listen(port, () => console.log(`App run on port ${port}`));
