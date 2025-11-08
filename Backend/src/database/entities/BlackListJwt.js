const { default: mongoose } = require("mongoose");

let BlackListSchema = new mongoose.Schema(
  {
  oldjwt: String
}
);

const BlackListModel = mongoose.model("BlackList", BlackListSchema);

module.exports = {
  BlackListModel, BlackListSchema
};