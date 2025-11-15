const express = require("express");
const multer = require("multer");
let storage = require("../server")
const upload = multer({ storage: storage })
const router = express.Router();
const fs = require("fs");
const { ProfileModel } = require("../database/entities/Profile");
const { verifyJwt } = require("../middleware/UserCRUDValidation");
const { UserModel } = require("../database/entities/User");

// view current user profile
// router.get('/', async (request, response) => {
//   const requestUserId = request.authentication.id;
//   allProfiles = await ProfileModel.find({})
//   response.json(allProfiles)
// });

// view user profile 
router.get(['/', '/:userId'], verifyJwt, async (request, response, next) => {
  const userId = request?.params?.userId || request?.authentication?.id;
  try {
    const profile = await ProfileModel.findOne({ userId: userId }).exec();
    const user = await UserModel.findById(userId).exec();
    if (!user) {
      return next(new Error("User is not valid!"))
    };
    if (!request.params.userId && !profile) {
      return next(new Error("Current user profile is not available!"))
    }

    response.json({
      username: user.username,
      description: profile.description,
      image: profile.image,
    });
  } catch(error) {
    return next(new Error(error));
  }
});

// create user profile
router.post('/:userId/create', verifyJwt, async (request, response,next) => {
  const requestUserId = request.authentication.id;
  if (requestUserId === request.params.userId) {
    let newProfileData = {
    userId: request.params.userId,
    image: {
      data: request.body.image.data,
      contentType: 'image/png'
    },
    description: request.body.description
  };
  try {
    let newProfile = await ProfileModel.create(newProfileData);
    await newProfile.save();
    response.json(newProfile);
    next();
      } catch(error) {
        return next(new Error(error));
  }
  } else {
    return next(new Error("Invalid request!"))
  }
});



// update profile, with user authorisation
router.put('/:userId', verifyJwt, async (request, response,next) => {
  const requestUserId = request.authentication.id;
  if (requestUserId === request.params.userId) {
    try {
      let updateData = {...request.body};
      updateProfile = await ProfileModel.findOneAndUpdate({
        userId:request.params.userId}, updateData, {returnDocument: "after"}).exec();
      await updateProfile.save();
      response.json(updateProfile);
      next();
      } catch(error) {
        return next(new Error("Profile not found!"));
      }
      } else {
        return next(new Error("Imvalid request!"))
      }
});

module.exports = router;