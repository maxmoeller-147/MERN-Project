const express = require("express");
const router = express.Router();

router.post(
  "/register", (request, response) => {
    response.json({
		  message:"placeholder for user POST endpoint"
	})
  }
);

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