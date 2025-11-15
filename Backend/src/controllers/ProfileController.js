const express = require("express");
const multer = require("multer");
let storage = require("../server")
const upload = multer({ storage: storage })
const router = express.Router();
const fs = require("fs");
const { ProfileModel } = require("../database/entities/Profile");
const { verifyJwt } = require("../middleware/UserCRUDValidation");
const { UserModel } = require("../database/entities/User");



// view user profile 
router.get(['/', '/:userId'], verifyJwt, async (request, response,next) => {
  const userId = request?.params?.userId || request?.authentication?.id;
  try {
  const user = await UserModel.findById(userId).exec();
  const profile = await ProfileModel.findOne({ userId: userId }).exec();
  console.log(profile)
      response.json({
        username: user?.username,
        email: user?.email,
        description: profile?.description,
        image: profile?.image,
      });
    } catch(error) {    
    return next(new Error(error))
  }

});

// create user profile, for profile owner only
// router.post('/edit', verifyJwt, async (request, response,next) => {
//     let newProfileData = {
//     userId: request.authentication.id,
//     image: {
//       data: request.body.image.data,
//       contentType: 'image/png'
//     },
//     description: request.body.description
//   };
//   try {
//     let newProfile = await ProfileModel.create(newProfileData).exec();
//     await newProfile.save();
//     response.json(newProfile);
//     next();
//       } catch(error) {
//         return next(new Error(error));
//   }
// });



// update profile, with user authorisation
router.patch('/edit', verifyJwt, async (request, response,next) => {
    try {
      const updateData = request.body;
      const updateProfile = await ProfileModel.findOneAndUpdate({
        userId: request.authentication.id
      }, updateData, {
        new: true,
        upsert: true
      }).exec();

      await updateProfile.save();

      response.json(updateProfile);

    } catch(error) {
      return next(new Error(error));
    }
});

module.exports = router;