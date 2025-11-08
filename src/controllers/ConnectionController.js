const express = require("express");
const { ConnectionModel } = require("../database/entities/Connection");
const { verifyJwt } = require("../middleware/UserCRUDValidation");
const { viewAllConnection } = require("../middleware/ConnectionValidation");

const router = express.Router();

router.post('/', verifyJwt, async (request, response,next) => {
  const requestUserId = request.authentication.id;

  let newConnectionData = {...request.body};
  try {
    newConnection = await ConnectionModel.create({
      userId: requestUserId,
      friendId: newConnectionData.friendId,
      connectionStatus: newConnectionData.connectionStatus,
      date: newConnectionData.date
    });
    await newConnection.save();
    response.json(newConnection);
    next();
  } catch(error) {
    return next(new Error(error));
  }

});

router.delete('/:connectionId', verifyJwt, async (request, response,next) => {
  const requestUserId = request.authentication.id;
  try {
   let deleteConnection = await ConnectionModel.findById(request.params.connectionId).exec();
   if (deleteConnection) {
    isUserInConnection = (
      (requestUserId === deleteConnection.userId.toString('utf8')) || (requestUserId === deleteConnection.friendId.toString('utf8'))
    );
    if (!isUserInConnection) {
      return next(new Error("Invalid request! You are not authorised to delete this connection"))
    };
    response.json({
    message:"connection deleted successfully",
    deleteData: deleteConnection
    });
    next()
  } else {
    return next(new Error("Connection not found!"))
   }
  } catch(error) {
    return next(new Error("Connection id is not valid!"));
  }
})

// VIEW all connection the user has
router.get('/', verifyJwt, viewAllConnection, () => {
  next()
});

// view all connection in database, for development testing purpose
router.get('/all', async (request, response) => {
  allConnection = await ConnectionModel.find({})
  response.json(allConnection)
});

module.exports = router;