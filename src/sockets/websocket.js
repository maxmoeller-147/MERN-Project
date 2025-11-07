const { Server } = require("socket.io");
const { MessageModel } = require("../database/entities/Message");
const { validateJWT } = require("../middleware/jwtFunctions");

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
  io.on('connection',async (socket) => {

    const token = socket.handshake.auth.token;
    console.log('jwt token received', token);

    try{
      const userData = await validateJWT(token);
      socket.user = userData.userId; 
      console.log('User verified:', socket.user);
    } catch (error){
      console.error('Invalid JWT:', error);
      socket.disconnect(true);
      return;
    }
    
    console.log('a user connected:', socket.id);

    socket.on("Message", async (msg) => {
      const newMessage = await MessageModel.create(msg);
      io.emit("Message", newMessage)    
    });

    // Notify when user is typing
    socket.on('typing', (data) => {
      socket.broadcast.emit("userTyping", data)
    });

    // Notify when user read the ,message
    socket.on("messageRead", (msgId) => {
      socket.broadcast.emit("messageReadBy",msgId)
    });

    // Event chat message starts when a client sends a chat message. Message is logged and broadcast to all connected clients  
    socket.on('chat message', async (msg) => {
      console.log('message: ' + msg.message);
      io.emit("chat message", msg);
    });

    // Event Disconnect that triggers when a client disconnects.  
    socket.on('disconnect', () => {
      console.log('user disconnected:', socket.id);
    });


    socket.on("joinRoom", (roomId) => {
      socket.join(roomId);
      console.log(" User has joined the room")
    });

    socket.on("roomMessage", async ({ roomId, msg}) => {
      const newMessage = await MessageModel.create(msg);
      io.to(roomId).emit("roomMessage", newMessage);
    });
  });

  return io;
};
