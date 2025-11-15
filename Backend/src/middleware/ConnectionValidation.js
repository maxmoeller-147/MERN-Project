const { ConnectionModel } = require("../database/entities/Connection");
const { UserModel } = require("../database/entities/User");


async function viewAllConnection(request, response, next) {
  try {
    const requestUserId = request.authentication?.id;

    if (!requestUserId) {
      return next(new Error("No user ID found"))
    };

    const findUser = await UserModel.findById(requestUserId).exec();
        
    if (findUser == null) {
      return next(new Error("Invalid jwt/userID"));
    };
    
    
    const findConnection = await ConnectionModel.find({
      $or: [
        {userId: requestUserId},
        {friendId: requestUserId}
      ]
      })
      .populate("userId")
      .populate("friendId")
      .exec();
      

    if (findConnection == null) {
      return next(new Error("You have no connection at the moment!"));
    };
    response.json(findConnection)

    next()

    }catch (error) {
        return next(new Error(error));
    };
}

module.exports = {
  viewAllConnection
}
