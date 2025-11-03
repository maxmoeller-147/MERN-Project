const express = require("express");
const { UserModel } = require("../database/entities/User");
const { validateRegisterData } = require("../middleware/UserCRUDValidation");
const router = express.Router();

// async function registerUser(newUserData) {
//   try {  
//     let findUser = await UserModel.findOne({username: newUserData.username, email: newUserData.email});
//       if (!findUser) {
//         let newUser = await UserModel.create({
//           username: newUserData.username,
//           email: newUserData.email,
//           password: newUserData.password
//         })
//       } else {
//         throw new Error("Username or email already exist!");
//       }} catch(error) {
//         console.error(error.message)
//       }
      
// }



router.post("/register", validateRegisterData, async (request, response, next)=> {
  if (request.errors.length > 0) {
    return next(new Error(request.errors));
    } else {
      try {
      let newUserData = {...request.body};
      let newUser = await UserModel.create({
      email: newUserData.email.trim(),
      username: newUserData.username.trim(),
      password: newUserData.password.trim(),
      profile_id: newUserData.profile_id
  })
      response.json(
      newUser
  )
  } catch(error) {
      return next(new Error(error));
  }
}
  
})

router.post(
  "/login", (request, response) => {
    response.json({
		  message:"placeholder for user POST endpoint"
	})
  }
);

// update an user
router.put(
  "/:targetUserId", (request, response) => {
    response.json({
		  message:"placeholder for user PUT endpoint"
	})
  }
);

// view an user, for people with connection only, put authentication part here
router.get(
  "/:targetUserId", (request, response) => {
    response.json({
		  message:"placeholder for user GET endpoint"
	})
  }
);

// view all users, for admin to view
router.get(
  "/users", (request, response) => {
    response.json({
		  message:"placeholder for user GET endpoint"
	})
  }
);
// delete an user
router.delete(
  "/:targetUserId", (request, response) => {
    response.json({
		  message:"placeholder for user DELETE endpoint"
	})
  }
);

module.exports = router;