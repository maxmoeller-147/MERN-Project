const { RoomChatModel } = require("../database/entities/RoomChat");
const { UserModel } = require("../database/entities/User");


async function viewAllRooms(request, response, next) {
  try {
    const requestUserId = request.authentication?.id;

    if (!requestUserId) {
      return next(new Error("No user ID found"))
    };

    const findUser = await UserModel.findById(requestUserId).exec();
        
    if (findUser == null) {
      return next(new Error("Invalid jwt/userID"));
    };
    
    
    const findRoom = await RoomChatModel.find({
        participants : requestUserId
      })
    .select("_id name")//.select("_id name participants")
    .lean()
    .exec();


    if (findRoom == null) {
      return next(new Error("You have no rooms at the moment!"));
    } 
    // else { // asign friendId to only userId different from authenticated user
    //   for (const connection of findConnection) {
    //     connection.friendId === requestUserId ? 
    //     if (connection.friendId === requestUserId) {
    //       connection.friendId = connection.userId
    //       connection.userId = requestUserId
          
    //     }
    //   }
    // }
    response.json(findRoom)

    next()

    }catch (error) {
        return next(new Error(error));
    };
}

module.exports = {
  viewAllRooms
}
