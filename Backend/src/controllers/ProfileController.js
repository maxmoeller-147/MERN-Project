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
router.get('/:userId', verifyJwt, async (request, response) => {
  const userProfile = ProfileModel.findOne({ userId: request.params.userId });
  const username = UserModel.findById(request.params.userId);
  console.log({...userProfile})
  response.json({
    ...userProfile,
    username: username,
  });
});

// create user profile
router.post('/:userId/create', verifyJwt, upload.single('image'), async (request, response,next) => {
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

// for dev testing only
// router.get('/', async (request, response) => {
//   allProfiles = await ProfileModel.find({})
//   response.json(allProfiles)
// });

module.exports = router;