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
        {user_id: requestUserId},
        {friend_id: request.params.userId}
      ]},
      {$and: [
        {friend_id: requestUserId},
        {user_id: request.params.userId}
      ]}
    ]
  });

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
    user_id: request.params.userId,
    image: {
      data: request.body.image.data,
      // data: fs.readFileSync(path.join(__dirname+ 'uploads' + request.file.filename)),
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
      updateProfile = await ProfileModel.findOneAndUpdate({user_id:request.params.userId}, updateData, {returnDocument: "after"}).exec();
      await updateProfile.save();
      response.json(updateProfile);
      next();
      } catch(error) {
        return next(new Error("Profile not found!"));
      }
});

// router.delete('/:targetProfileId', (request, response) => {
//   response.json({
// 		  message:"placeholder for endpoint"
// })
// });

module.exports = router;