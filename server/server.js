const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

const app = express();
const port = process.env.PORT || 3001;
const publicPath = path.join(__dirname, "../public");
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

//register an event listenner,
//"connection" let the io listen to new connection
io.on("connection", socket => {
  console.log("new user connected");
  socket.on("disconnect", () => console.log("User disconnected"));
});

app.get("/", (req, res) => {
  res.render(index.html);
});

server.listen(port, () => console.log(`App run on port ${port}`));
