const mongoose = require("mongoose");
// const validator = require('validator');

let ProfileSchema = new mongoose.Schema(
  {
    image: {
      data: Buffer,
      contentType: String 
    },
    description: String
  }
)

const ProfileModel = mongoose.model("Profile", ProfileSchema);

module.exports = {
	ProfileSchema, ProfileModel
}