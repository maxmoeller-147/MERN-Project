const express = require("express");
const { UserModel } = require("../database/entities/User");
const { validateRegisterData, verifyBasicUserAuth, createJwt, verifyJwt  } = require("../middleware/UserCRUDValidation");
const { generateJWT } = require("../middleware/jwtFunctions");
const { ProfileModel } = require("../database/entities/Profile");
const router = express.Router();

// user register route
router.post("/register", validateRegisterData, async (request, response, next)=> {
  if (request.errors.length > 0) {
    return next(new Error(request.errors));
    } else {
      try {
        let newUserData = {...request.body};
        let newUser = await UserModel.create({
          email: newUserData.email.trim(),
          username: newUserData.username.trim(),
          password: newUserData.password.trim()
        })
        //await newUser.save();
        
        //Create a jwt for the new user
        let jwt = generateJWT(newUser);

        response.json({
          data: newUser, 
          jwt : jwt
      });
        next();

      } catch(error) {
          return next(new Error(error));
      }
}
  
})

// user login route
router.post(
  "/login",
  verifyBasicUserAuth,
  createJwt,
  async (request, response) => {

    response.json({
		  message:"Login successfully!"
	})
  }
);

router.post("/logout", verifyJwt, async (request, response) => {
  try {
    response.clearCookie("access_token");
    response.json({message: "Logged out successfully"})
  } catch(error) {
    return next(new Error("Error when logging out!"));
  }
});

// update an user, only for user
router.put(
  "/:targetUserId", 
  verifyJwt,
  async (request, response,next) => {
    // need to add verify user authentication data here, request.authentication.id === request.params.targetUserId
    try {
      let updateData = {...request.body};
      updateUser = await UserModel.findByIdAndUpdate(request.params.targetUserId, updateData, {returnDocument: "after"}).exec()
      await updateUser.save();
      response.json(updateUser);
      next();
      } catch(error) {
        return next(new Error("User not found!"));
      }
      });

// view an user, none should be able to see this?
router.get(
  "/:targetUserId",
  verifyJwt,
  (request, response) => {
    response.json({
		  message:"placeholder for user GET endpoint"
	})
  }
);

// view all users, for admin to view, for development purpose
router.get(
  "/", async (request, response) => {
    let allUsers = await UserModel.find({})
    response.json(allUsers
	)
  }
);
// delete an user
router.delete(
  "/:targetUserId", verifyJwt,
  async (request, response,next) => {
    try {
      deleteUser = await UserModel.findByIdAndDelete(request.params.targetUserId).exec()
      await ProfileModel.findOneAndDelete({user_id: request.params.targetUserId}).exec()
      if (deleteUser) {
      response.json({
        message: 'User deleted successfully',
        deleteData: deleteUser
      });
      } else {
        return next(new Error("User not found!"))
      }
  } catch {
    return next(new Error("User id is not valid!"));
  }
});

module.exports = router;