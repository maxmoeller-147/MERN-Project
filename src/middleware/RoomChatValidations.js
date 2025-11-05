const { UserModel } = require("../database/entities/User");
const { RoomChatModel } = require("../database/entities/RoomChat");

async function canViewRoom(request, response, next){
    try{
        const userID = request.authentication?.id;

        if (!userID){
            return next(new Error("No user ID found"));
        }

        const findUser = await UserModel.findById(userID).exec();
            
        if (findUser == null) {
            return next(new Error("Invalid jwt/userID"));
        } 
        

        const roomId = request.params.roomChatId;

        if (!roomId){
            return next(new Error("No room ID found"));
        }
        
        const findRoom = await RoomChatModel.findById(request.params.roomChatId).select('participants').exec();

        if (findRoom == null) {
            return next(new Error("Invalid room ID"));
        }


        const isParticipant = findRoom.participants.some(
            p => (p.equals ? p.equals(userID) : String(p) === String(userID))
        )

        if (!isParticipant){
            return next(new Error("Forbidden to visit room"));
        }

    }catch (error){
        return next(new Error(error));
    }

    next()
}

  module.exports = {
    canViewRoom
  }