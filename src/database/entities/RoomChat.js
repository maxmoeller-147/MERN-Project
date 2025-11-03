const { default: mongoose } = require("mongoose");
const validator = require('validator');

let RoomChatSchema = new mongoose.Schema(
  {
  creation_date: {
    type: Date,
    default: Date.now()
  },
  name: String,
  participants: [{
    type: mongoose.Types.ObjectId,
    ref: 'User'
  }],
  type: {
    type: String,
    validate: {
      validator: function(typeValue) {
        return ['DIRECT', 'GROUP'].includes(typeValue);
      },
      message: "Invalid type! Room chat type must be 'GROUP' or 'DIRECT'"
    }
  }
}
)

const RoomChatModel = mongoose.model("RoomChat", RoomChatSchema);

module.exports = {
  RoomChatModel, RoomChatSchema
};