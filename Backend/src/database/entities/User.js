const { default: mongoose } = require("mongoose");
const validator = require('validator');
const { ProfileModel } = require("./Profile");
const crypto = require("node:crypto");

let UserSchema = new mongoose.Schema({
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
  admin: Boolean,
  username: {
    type: String,
    required: [true, 'username is required!'],
    unique: [true, 'this username already exists'],
		minLength: [4, 'Username must have minimum 4 characters']
  },
  password: {
			type: String,
			required: [true, 'password is required!'],
			minLength: [6, 'password must have minimum 8 characters'],
			validate: {
				validator: function (newPassword) {
					let passwordStrengthRules = {
						minLength: 6,
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
				message: "This is not a strong password!"
			}
		},
  creationDate: {
		type: Date,
		default: Date.now
	},
	salt: {
		type: String,
		required: false,
		default: function () {
			return crypto.randomBytes(64).toString("hex");
		}
	}
});

UserSchema.pre(
	"save",
	async function (next) {
		if (!this.salt){
			// make a salt for the user.
			this.salt = crypto.randomBytes(64).toString("hex");
			// This will be saved into the user document at the end of the middleware.
		}

		// If the password has not been changed, skip the rest of this middleware function.
		if (!this.isModified("password")) return next();

		//Salt the updated password
		this.password = crypto.scryptSync(this.password, this.salt, 64).toString("hex");

		next();
	}
);



UserSchema.methods.isMatchingPassword = async function (passwordToCheck) {
	return crypto.scryptSync(passwordToCheck, this.salt, 64).toString("hex") == this.password;
}

const UserModel = mongoose.model("User", UserSchema);

module.exports = {
	UserSchema, UserModel
}