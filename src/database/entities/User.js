const { default: mongoose } = require("mongoose");
const validator = require('validator');

let UserSchema = new mongoose.Schema({
  profile_id: {
		type: mongoose.Types.ObjectId,
		ref: 'Profile'
	},
	email: {
    type: String,
    required: [true, 'email is required!'],
    unique: [true, 'this email already existed'],
    validate: {
      validator: function(newEmail) {
        return validator.isEmail(newEmail)
      },
      message: validatorError => `${validatorError.value} is not a valid email!`
    }
  },
  verified: Boolean,
  username: {
    type: String,
    required: [true, 'username is required!'],
    unique: [true, 'this username already existed'],
		minLength: [4, 'Username must have minimum 4 characters']
  },
  password: {
			type: String,
			required: [true, 'password is required!'],
			minLength: 8,
			validate: {
				validator: function (newPassword) {
					let passwordStrengthRules = {
						minLength: 8,
						minLowercase: 1,
						minUppercase: 1,
						minNumbers: 1,
						minSymbols: 0,
						returnScore: false,
						pointsPerUnique: 1,
						pointsPerRepeat: 0.5,
						pointsForContainingLower: 10,
						pointsForContainingUpper: 10,
						pointsForContainingNumber: 10,
						pointsForContainingSymbol: 10
					};
					return validator.isStrongPassword(newPassword, passwordStrengthRules);
				},
				message: validatorError => `${validatorError.value} is not a strong password! Choose another password!`
			}
		},
  creation_date: {
		type: Date,
		default: Date.now
	}
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = {
	UserSchema, UserModel
}