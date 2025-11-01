const mongoose = require("mongoose");
const validator = require('validator');

let ConnectionSchema = new mongoose.Schema(
  {
  user_id: {
      type: mongoose.Types.ObjectId,
      ref: 'User'
  },
  friend_id: {
      type: mongoose.Types.ObjectId,
      ref: 'User'
  },
  connection_status: {
    type: String,
    validate: {
      validator: function(newStatus) {
        return ['PENDING', 'ACCEPTED'].includes(newStatus);
      },
      message: "Invalid Status! Status must be 'PENDING' or 'ACCEPTED'"
    }
  }
}
)

const ConnectionModel = mongoose.model("Connection", ConnectionSchema);

module.exports = {
  ConnectionSchema, ConnectionModel
};