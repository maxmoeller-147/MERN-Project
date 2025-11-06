const express = require("express");
const { ConnectionModel } = require("../database/entities/Connection");

const router = express.Router();

router.post('/', async (request, response,next) => {
  let newConnectionData = {...request.body};
  try {
    newConnection = await ConnectionModel.create({
      userId: newConnectionData.userid,
      friendId: newConnectionData.friendid,
      connectionStatus: newConnectionData.connectionstatus
    });
    await newConnection.save();
    response.json(newConnection);
    next();
  } catch(error){
    return next(new Error(error));
  }

});

router.delete('/:connectionId', async (request, response,next) => {
  try {
   let deleteConnection = await ConnectionModel.findByIdAndDelete(request.params.connectionId).exec();
   if (deleteConnection) {
    response.json({
    message:"connection deleted successfully",
    deleteData: deleteConnection
    })
    next();
   } else {
    return next(new Error("Connection not found!"))
   }
  } catch(error) {
    return next(new Error("Connection id is not valid!"));
  }
})

// VIEW ALL FRIENDS IN CONNECTION, TO BE EDITED
router.get('/', async  (request, response) => {
  allConnection = await ConnectionModel.find({});
  response.json(allConnection);
});

module.exports = router;