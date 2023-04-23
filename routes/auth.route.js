const express = require("express");
const { createNewUser, login, getSingleUser, getAllUser } = require("../controllers/auth.controller");
const { uploadImage } = require("../utils/upload.util");
const router = express.Router();

//create new user route
router.post("/signup",uploadImage.single("image") ,createNewUser)

//login route
router.post("/login", login);

//fetch single user route
router.get("/:userId", getSingleUser);

//get all user 
router.get("/get/all", getAllUser);



module.exports = router;