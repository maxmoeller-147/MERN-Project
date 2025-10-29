const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function(newEmail) {
        return validator.isEmail(newEmail)
      },
      message: validatorError => `${validatorError.value} is not a valid email!`
    }
  },
  verified: Boolean,
  username: String,
  password: {
			type: String,
			required: true,
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
				message: validatorError => `${validatorError.value} is not a suitable password!`
			}
		},
    creation_date: Date
})