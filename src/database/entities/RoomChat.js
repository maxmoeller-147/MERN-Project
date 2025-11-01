const mongoose = require("mongoose");
const validator = require('validator');

let RoomChatSchema = new mongoose.Schema(
  {
  creation_date: [Date, 'Invalid date!'],
  name: String,
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