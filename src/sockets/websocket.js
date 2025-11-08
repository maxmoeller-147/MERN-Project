const { Server } = require("socket.io");
const mongoose = require("mongoose");
const { MessageModel } = require("../database/entities/Message");
const { UserModel } = require('../database/entities/User');
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

  //Using a map for fast lookup
  const connectedUsers = new Map();

  // Event Connection that triggers each time a new client connects to the server.
  io.on('connection',async (socket) => {

    const token = socket.handshake.auth.token;
    console.log('jwt token received', token);

    try{
      const userData = await validateJWT(token);
      
      socket.user = userData.decodedValidToken.userId;

      console.log('User verified:', socket.user);
    } catch (error){
      console.error('Invalid JWT:', error);
      socket.disconnect(true);
      return;
    }
    
    //Check if the user is already connected
    if (connectedUsers.has(socket.user)) {
      // disconnect the socket 
      console.error('Already connected from another window');
      socket.disconnect(true);
      return;
    }

    //If not add user to the socket map
    connectedUsers.set(socket.user, socket.id);
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
      try {
        //Get the user who sent the message
        console.log(msg);
        const userId = socket.user;

        // Validate that its a valid id
        if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
          console.error('Invalid user id');
          return;
        }

        //Find the user creating the room
        const user = await UserModel.findById(userId).exec();
        if (!user){
          console.error('Cannot find user');
          return;
        }

        msg = `${user.username} says: ${msg}`
        console.log(msg);
        io.emit("chat message", msg);
      } catch (error){
        console.error('Error handling chat message:', err);
        socket.disconnect(true);
      }
    });

    // Event Disconnect that triggers when a client disconnects.  
    socket.on('disconnect', () => {
      //Remove the connection from the map if it is found
      if (connectedUsers.get(socket.user) === socket.id) {
        connectedUsers.delete(socket.user);
      }

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
