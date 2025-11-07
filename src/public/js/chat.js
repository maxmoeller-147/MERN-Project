// Get the JWT from the URL query string
const url = new URL(window.location.href);
const jwt = url.searchParams.get("jwt");

if (!jwt) {
  throw new Error("No JWT token found in URL");
}

// Connect to the server using Socket.IO, sending the JWT in auth
window.socket = io("/", {
  auth: { token: jwt }
});

const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');


// Enter or Click to Send 
form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (input.value.trim()) {
    const msgText = input.value
    
    socket.emit('chat message', {
      message : msgText,
      userId : socket.user?.userId || "unknown"
    });
    input.value = '';
  }


});


// Chat message event
socket.on('chat message', (msg) => {
  const li = document.createElement('li');
  li.textContent = msg;
  messages.appendChild(li);
});
