const mongoose = require("mongoose");
// const validator = require('validator');

let UserRoomSchema = new mongoose.Schema(
  {
    room_id: {
      type: mongoose.Types.ObjectId,
      ref: 'RoomChat'
    },
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: 'Users'
    }
}
)

const UserRoomModel = mongoose.model("UserRoom", UserRoomSchema);

module.exports = {
  UserRoomModel, UserRoomSchema
};