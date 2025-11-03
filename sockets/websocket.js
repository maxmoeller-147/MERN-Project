const { Server } = require("socket.io");

module.exports = (server) => {
  
  const io = new Server(server, {
    cors: {
      origin: [
        "http://localhost:5000",
        "http://DatingApp.com"
      ],
      methods: [ "GET" , "POST" ]
    }
  });


io.on('connection', (socket) => {
  console.log('a user connected:', socket.id);
  
socket.on('chat message', (msg) => {
  console.log('message: ' + msg);
  io.emit("chat message", msg);
  });

socket.on('disconnect', () => {
  console.log('user disconnected:', socket.id);
  });
});}