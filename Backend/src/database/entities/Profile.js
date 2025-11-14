const { default: mongoose } = require("mongoose");


let ProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
		  ref: 'User',
      unique: true
    },
    image: {
      data: Buffer,
      contentType: String 
    },
    description: String,
    // for additional feature might be developed in later stage
    // privacySetting: {
    //   type: String,
    //   validate: {
    //     validator: function(setting) {
    //       return ['PUBLIC', 'PRIVATE', 'FRIENDS ONLY'].includes(setting);
    //   },
    //   message: "Invalid privacy setting! Setting must be 'PUBLIC', 'PRIVATE' or 'FRIENDS ONLY'"
    // }
    // }
  }
)

const ProfileModel = mongoose.model("Profile", ProfileSchema);

module.exports = {
	ProfileSchema, ProfileModel
}