const { default: mongoose } = require("mongoose");


let ProfileSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Types.ObjectId,
		  ref: 'User'
    },
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