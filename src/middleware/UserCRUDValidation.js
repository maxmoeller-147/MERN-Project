const { UserModel } = require("../database/entities/User");


async function validateRegisterData (request, response, next) {
    let errors = [];
    
    if (request.body.username) {
      let newUsername = request.body.username.trim().toLowerCase()
      let findUsername = await UserModel.findOne({ username: newUsername }).exec()
      if (findUsername) {
        errors.push("Username already existed, please choose another username!")
      }
    } else {
      errors.push("username missing!")
    }

    if (request.body.email) {
      let newUserEmail = request.body.email.trim().toLowerCase()
      let findUserEmail = await UserModel.findOne({ email: newUserEmail }).exec()
      if (findUserEmail) {
        errors.push("Email already existed!")
      }
    } else {
      errors.push("Email missing!")
    }

    if (!request.body.password) {
      errors.push("Password missing!")
    }
    request.errors = errors;

    next()
    };
    

  module.exports = {
    validateRegisterData
  }