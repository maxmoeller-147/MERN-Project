const express = require("express");
const mongoose = require("mongoose");
const { RoomChatModel } = require("../database/entities/RoomChat");
const { MessageModel } = require("../database/entities/Message");
const { UserModel } = require('../database/entities/User');
const { verifyJwt  } = require("../middleware/UserCRUDValidation");
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
    
    let participants =  newRoomData.participants;
    let includes_creator = false;

    //Go through all given participants and make sure they are valid
    for(let i =0; i < participants.length; i ++){
      //If any are not valid throw an error
      if (!mongoose.Types.ObjectId.isValid(participants[i])){
         throw new Error('Invalid participant id');
      } else{
        //if the found user is the same as the user calling, we dont have to add the user calling to the array
        if (participants[i] == user){
          includes_creator = true
        }
      }
    }

    //If the room participants doesnt include the user who made the request, add it to the room
    if (!includes_creator){
      participants.push(user);
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

router.get('/:roomChatId', async  (request, response,next) => {
  try {
    findRoom = await RoomChatModel.findById(request.params.roomChatId).exec();
    findMessage = await MessageModel.find({room_id:request.params.roomChatId}).exec();
    if (findRoom) {
      response.json({
        roomchat:findRoom,
        messages: findMessage});
      next();
    } else {
      return next(new Error("Room not found!"))
    }
  } catch {
    return next(new Error("Room id is not valid!"))
  }
});

router.put('/:roomChatId', async  (request, response,next) => {
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

router.delete('/:roomChatId', async  (request, response,next) => {
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