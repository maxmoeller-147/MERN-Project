const express = require("express");
const multer = require("multer");
let storage = require("../server")
const upload = multer({ storage: storage })
const router = express.Router();
const fs = require("fs");
const { ProfileModel } = require("../database/entities/Profile");
const { ConnectionModel } = require("../database/entities/Connection");


// view user profile for anyone in connection
// TODO: USE CONNECTION CONDITION LOGIC FOR AUTHORISATION, TO FIX
router.get('/:userId', async (request, response) => {
  let requestUserId = "abcd";
  userConnection = await ConnectionModel.find({
    $or: [
      {$and: [
        {userId: requestUserId},
        {friendId: request.params.userId}
      ]},
      {$and: [
        {friendId: requestUserId},
        {userId: request.params.userId}
      ]}
    ]
  })

  // if (userConnection) {
  //   targetUserProfile = await ProfileModel.findOne({user_id: request.params.userId});
  //   response.json({})
  //   next();
  // } else {
  //   return next(new Error("User profile does not exist!"))
  //   // response.json({mesage: "user profile not found"})
  // }
});

// create user profile
// TODO: ADD AUTHORISATION
router.post('/:userId/create', upload.single('image'), async (request, response,next) => {

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
// TODO: ADD USER AUTHORISATION
router.put('/:userId', async (request, response,next) => {
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

// for dev, to be deleted
router.get('/', async (request, response) => {
  allProfiles = await ProfileModel.find({})
  response.json(allProfiles)
});

// router.delete("/:profileId", async(request, response) => {
//   deleteProfile = await ProfileModel.findByIdAndDelete(request.params.profileId)
//   response.json({
//         message: 'profile deleted successfully',
//         deleteData: deleteProfile
//       })
// })

module.exports = router;