const { Server } = require("socket.io");
const mongoose = require("mongoose");
const { MessageModel } = require("../database/entities/Message");
const { UserModel } = require('../database/entities/User');
const { RoomChatModel } = require('../database/entities/RoomChat');
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
      console.log('Invalid JWT:', error);
      socket.disconnect(true);
      return;
    }
    
    //Check if the user is already connected
    if (connectedUsers.has(socket.user)) {
      // disconnect the socket
      console.log('Already connected from another window');
      socket.disconnect(true);
      return;
    }

    
    //If not add user to the socket map
    connectedUsers.set(socket.user, socket.id);
    console.log('a user connected:', socket.id);


    socket.on("joinRoom", async (roomId) =>{
      try{
        // Validate that its a valid id
        if (!roomId || !mongoose.Types.ObjectId.isValid(roomId)) {
          console.log('Invalid room id');
          return;
        }

        //Find the user creating the room
        const room = await RoomChatModel.findById(roomId).exec();
        if (!room){
          console.log('Cannot find room!');
          return;
        }

        console.log(`${socket.id} joined ${roomId}`);       
        
        //Group all sockets in the same room together
        socket.join(roomId);

        //Get the current rooms message history and sort it by date
        const messageHistory = await MessageModel.find({ roomId })
        .sort({ createdAt: 1 });

        //Send the chat history to the socket
        socket.emit("restoreChatHistory", messageHistory);
      }catch(error){
        console.log(error);
      }
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
    socket.on('roomMessage', async (data) => {
      try {
        //Get the user who sent the message
        const userId = socket.user;

        // Validate that its a valid id
        if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
          console.log('Invalid user id');
          return;
        }

        //Find the user creating the room
        const user = await UserModel.findById(userId).exec();
        if (!user) {
          console.log('Cannot find user');
          return;
        }

        const roomId = data.roomId;
        
        // Validate that its a valid id
        if (!roomId || !mongoose.Types.ObjectId.isValid(roomId)) {
          console.log('Invalid room id');
          return;
        }

        //Find the user creating the room
        const room = await RoomChatModel.findById(roomId).exec();
        if (!room){
          console.log('Cannot find room');
          return;
        }


        const msg = `${user.username} says: ${data.msg}`
        console.log(msg);
        
        const fullMessage = await MessageModel.create({
          roomId: roomId,
          senderId: userId,
          content: msg,
          status: 'SENT'
        })

        io.to(roomId).emit("roomMessage", fullMessage);

        
      } catch (error){
        console.log('Error handling chat message:', err);
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


    // Notify when user read the ,message
    socket.on("messageDelete", async (msgId) => {
      try{
        //Get the user who sent the message
        const userId = socket.user;

        // Validate that its a valid id
        if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
          console.log('Invalid user id');
          return;
        }

        //Find the user creating the room
        const user = await UserModel.findById(userId).exec();
        if (!user) {
          console.log('Cannot find user');
          return;
        }
        
        // Validate that its a valid id
        if (!msgId || !mongoose.Types.ObjectId.isValid(msgId)) {
          console.log('Message id');
          return;
        }

        //Find the user creating the room
        const msg = await MessageModel.findById(msgId).exec();
        if (!msg){
          console.log('Cannot find message');
          return;
        }

        //Delete from the database?
        await MessageModel.findByIdAndDelete(msgId).exec()
      }catch(error){
        console.log('Error handling chat message:', err);
      }
    });

  });

  return io;
};
