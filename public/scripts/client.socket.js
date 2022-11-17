const socket = io();

const formMessage = document.querySelector("#formMessage");
const usernameInput = document.querySelector("#usernameInput");
const messageInput = document.querySelector("#messageInput");
const messagePool = document.querySelector("#messagePool");

formMessage.addEventListener("submit", (event) => {
  event.preventDefault();

  const newMessage = {
    email: usernameInput.value,
    body: messageInput.value,
  };

  socket.emit("client:messages", newMessage);
  messageInput.value = "";
});

socket.on("server:messages", (messageArray) => {
  messagePool.innerHTML = "";
  messageArray.forEach((messageInfo) => {
    messagePool.innerHTML += `<li style="color: brown;"> <b style="color: blue">${messageInfo.email}</b> [${messageInfo.createdAt}]: <i style="color: green;">${messageInfo.body}</i> </li>`;
  });
});
