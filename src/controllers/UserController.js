const express = require("express");
const { UserModel } = require("../database/entities/User");
const { validateRegisterData } = require("../middleware/UserCRUDValidation");
const router = express.Router();


// POST: user register route
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
        await newUser.save();
        response.json(newUser);
        next();
      } catch(error) {
          return next(new Error(error));
      }}
});


// POST: user login route
router.post(
  "/login", (request, response) => {
    response.json({
		  message:"placeholder for user POST endpoint"
	})
});


//PUT: update an user, only for user
router.put(
  "/:targetUserId", async (request, response,next) => {
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


// GET: view an user, none should be able to see this?
router.get(
  "/:targetUserId", (request, response) => {
    response.json({
		  message:"placeholder for user GET endpoint"
	})
});


// GET: view all users, for admin to view, for development purpose
router.get(
  "/", async (request, response) => {
    let allUsers = await UserModel.find({})
    response.json(allUsers)
});


// DELETE: delete an user
router.delete(
  "/:targetUserId", async (request, response,next) => {
    try {
      deleteUser = await UserModel.findByIdAndDelete(request.params.targetUserId).exec()
      // verifyFindDataAndReturn(deleteUser,"User")
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