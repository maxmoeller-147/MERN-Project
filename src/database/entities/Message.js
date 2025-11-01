const mongoose = require("mongoose");
const validator = require('validator');

let MessageSchema = new mongoose.Schema(
  {
    room_id: {

    },
    user_id: {

    },
    date_sent: [Date, 'Invalid date!'],
    content: String,
    attachment_url: {

    },
    status: {

    }
}
)

const MessageModel = mongoose.model("Message", MessageSchema);

module.exports = {
  MessageModel, MessageSchema
};