const express = require("express");
const multer = require("multer");
let storage = require("../server")
const upload = multer({ storage: storage })
const router = express.Router();
const fs = require("fs");
const { ProfileModel } = require("../database/entities/Profile");
const { ConnectionModel } = require("../database/entities/Connection");
const { verifyJwt } = require("../middleware/UserCRUDValidation");


// view user profile 
router.get('/:userId', async (request, response) => {
  userProfile = ProfileModel.findOne({userId:request.params.userId});
  response.json(userProfile);
});

// create user profile
router.post('/:userId/create', verifyJwt, upload.single('image'), async (request, response,next) => {

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
});

// update profile, with user authorisation
router.put('/:userId', verifyJwt, async (request, response,next) => {
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
});

// for dev testing only
// router.get('/', async (request, response) => {
//   allProfiles = await ProfileModel.find({})
//   response.json(allProfiles)
// });

module.exports = router;