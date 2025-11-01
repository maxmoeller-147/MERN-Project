const mongoose = require("mongoose");
const validator = require("validator");

let MessageSchema = new mongoose.Schema(
  {
    room_id: {
      type: mongoose.Types.ObjectId,
      ref: 'RoomChat'
    },
    sender_id: {
      type: mongoose.Types.ObjectId,
      ref: 'User'
    },
    date_sent: {
      type: Date,
      default: Date.now
    },
    content: String,
    attachment: {
      type: mongoose.Types.ObjectId,
      ref: 'File'
    },
    status: {
      type: String,
      validate: {
        validator: function(newStatus) {
          return ['SENT', 'DELIVERED', 'SEEN'].includes(newStatus);
      },
      message: "Invalid Status! Status must be 'SENT', DELIVERED or 'SEEN'"
    }
    }
}
)

const MessageModel = mongoose.model("Message", MessageSchema);

module.exports = {
  MessageModel, MessageSchema
};