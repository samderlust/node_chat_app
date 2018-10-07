const socket = io();
socket.on("connect", function() {
  console.log("connected to server");

  // socket.emit("createMessage", {
  //   from: "client",
  //   text: " this is message"
  // });

  //   socket.emit("createEmail", {
  //     to: "S@s.com",
  //     text: "this iss it"
  //   });
});

socket.on("disconnect", function() {
  console.log("disconnected from server");
});

// socket.on("newEmail", function(email) {
//   console.log("New Email", email);
// });

socket.on("newMessage", function(mess) {
  console.log("new Message", mess);
  let li = $("<li></li>");
  li.text(`${mess.from}: ${mess.text}`);
  $("#messages").append(li);
});

socket.emit(
  "createMessage",
  {
    from: "frank",
    text: "hi"
  },
  function(data) {
    console.log("Got it", data);
  }
);

$("#message-form").on("submit", e => {
  e.preventDefault();
  socket.emit(
    "createMessage",
    {
      from: $("[name=user-name]").val(),
      text: $("[name=message]").val()
    },
    () => {}
  );
});
