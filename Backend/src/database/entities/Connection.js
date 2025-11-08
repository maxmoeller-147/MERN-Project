const { default: mongoose } = require("mongoose");
const validator = require('validator');

let ConnectionSchema = new mongoose.Schema(
  {
  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    require: true
  },
  friendId: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    require: true
  },
  connectionStatus: {
    type: String,
    validate: {
      validator: function(newStatus) {
        return ['PENDING', 'ACCEPTED'].includes(newStatus);
      },
      message: "Invalid Status! Status must be 'PENDING' or 'ACCEPTED'"
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
}
)

const ConnectionModel = mongoose.model("Connection", ConnectionSchema);

module.exports = {
  ConnectionSchema, ConnectionModel
};