const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');

//Debugging code, will change to a token based system with front end
const jwt = new URLSearchParams(window.location.search).get("jwt");
const pathSegments = url.pathname.split('/').filter(Boolean);
const roomId = pathSegments[pathSegments.length - 1];

if (!jwt) {
  throw new Error("No JWT token found");
}

// Connection to the server using Socket.IO
window.socket = io("/", {
    auth: { token : jwt }
  });



// Example: join a room
socket.on("connect", () => {
  console.log("socket connect from middleware")
  
  socket.emit("joinRoom", roomId);

});


socket.on("connect_error", (err) => {
  console.error("Socket connect_error:", err && err.message ? err.message : err);
});



// Enter or Click to Send 
form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (input.value.trim()) {
    socket.emit('chat message', input.value);
    input.value = '';
  }
});


// Chat message event
socket.on('chat message', (msg) => {
  const li = document.createElement('li');
  li.textContent = msg;
  messages.appendChild(li);
});
