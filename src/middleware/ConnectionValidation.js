const { ConnectionModel } = require("../database/entities/Connection");
const { UserModel } = require("../database/entities/User");


async function viewAllConnection(request, response, next) {
  try {
    const requestUserID = request.authentication?.id;

    if (!requestUserID) {
      return next(new Error("No user ID found"))
    };

    const findUser = await UserModel.findById(requestUserID).exec();
        
    if (findUser == null) {
      return next(new Error("Invalid jwt/userID"));
    };
    
    
    const findConnection = await ConnectionModel.find({
      $or: [
        {userId: requestUserID},
        {friendId: requestUserID}
      ]
      }).exec();

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