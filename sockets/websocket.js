const { Server } = require("socket.io");
const { MessageModel } = require("../src/database/entities/Message");


// Initiates Socket.IO with the HTTP server with cors that defines the origins that can connect via WebSocket
module.exports = (server) => {
  
  const io = new Server(server, {
    cors: {
      origin: [
        "http://localhost:3000",
        "http://localhost:5000",
        "http://DatingApp.com"
      ],
      methods: [ "GET" , "POST" ]
    }
});


// Event Connection that triggers each time a new client connects to the server.
io.on('connection', (socket) => {
  console.log('a user connected:', socket.id);

  // Event chat message starts when a client sends a chat message. Message is logged and broadcast to all connected clients  
  socket.on('chat message', async (msg) => {
    console.log('message: ' + msg);

    io.emit("chat message", msg);
  });

  // Event Disconnect that triggers when a client disconnects.  
  socket.on('disconnect', () => {
    console.log('user disconnected:', socket.id);
    });
});}