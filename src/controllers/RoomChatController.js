const express = require("express");
const { RoomChatModel } = require("../database/entities/RoomChat");
const router = express.Router();

router.post('/', async  (request, response,next) => {
  newRoomData = {...request.body};
  try {
    newRoom = await RoomChatModel.create({
      name: newRoomData.name,
      participants: newRoomData.participants,
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
    findRoom = await RoomChatModel.findById(request.params.roomChatId);
    if (findRoom) {
      response.json(findRoom);
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
      // verifyFindDataAndReturn(deleteUser,"User")
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