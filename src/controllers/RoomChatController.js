const path = require('path');
const express = require("express");
const mongoose = require("mongoose");
const { RoomChatModel } = require("../database/entities/RoomChat");
const { MessageModel } = require("../database/entities/Message");
const { UserModel } = require('../database/entities/User');
const { verifyJwt  } = require("../middleware/UserCRUDValidation");
const { canViewRoom  } = require("../middleware/RoomChatValidations");
const router = express.Router();

router.post('/', 
  verifyJwt,
  async  (request, response,next) => {

  let userId = request.authentication.id

  // Validate that its a valid id
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error('Invalid user id');
  }

  //Find the user creating the room
  const user = await UserModel.findById(userId).exec();

  newRoomData = {...request.body};

  try {
    
    let imported_participants = newRoomData.participants;
    let participants = [user.id]

    //Go through all given participants and make sure they are valid
    for(let i =0; i < imported_participants.length; i ++){
      //If any are not valid throw an error
      
      let new_participant = await UserModel.findById(imported_participants[i]).exec();
      if (new_participant == null){
         throw new Error('Invalid participant id');
      } else{
        //if the found user is the same as the user calling, we dont have to add the user calling to the array
        if (new_participant== user){
          continue
        }

        participants.push(imported_participants[i])
      }
    }

    //Create the room model
    newRoom = await RoomChatModel.create({
      name: newRoomData.name,
      participants: participants,
      type: newRoomData.type
    });
    await newRoom.save();
    response.json(newRoom);
    next();

  } catch(error) {
    return next(new Error(error));
  }
});

router.get('/:roomChatId', 
  verifyJwt,
  canViewRoom,
  async  (request, response,next) => {

  //No html version
  //response.json({ message:"Joined room!" })

  try {
    // Serve the chatroom HTML page
    response.sendFile(
      path.join(__dirname, '..', 'public', 'chatroom.html')
    );
  } catch (error) {
    next(error);
  }
  
});

router.put('/:roomChatId', 
  verifyJwt,
  canViewRoom,
  async  (request, response,next) => {
  try {
    let updateData = {...request.body};
    updateRoom = await RoomChatModel.findByIdAndUpdate(request.params.roomChatId, updateData, {returnDocument: "after"}).exec()
    await updateRoom.save();
    response.json(updateRoom);
    next();
    } catch(error) {
      return next(new Error("Room not found!"));
    };
});

router.delete('/:roomChatId', 
  verifyJwt,
  canViewRoom,
  async  (request, response,next) => {
    try {
      deleteRoom = await RoomChatModel.findByIdAndDelete(request.params.roomChatId).exec()
      if (deleteRoom) {
      response.json({
        message: 'Room is deleted successfully',
        deleteData: deleteRoom
      });
      } else {
        return next(new Error("Room not found!"))
      }
  } catch {
    return next(new Error("Room id is not valid!"));
  }
});

// for development purpose, TO BE DELETED
router.get('/', async  (request, response) => {
  allRoom = await RoomChatModel.find({});
  response.json(allRoom);
});

module.exports = router;