const checkAuth = require("../middlewares/checkAuth");
const express = require("express")
const router = express.Router();
const {createTask, getTaskOfLoggedUser, deleteTask, updateTask} = require("../controllers/task.controller")
const { uploadAttachment } = require("../utils/upload.util");

//create task
router.post("/create", checkAuth, uploadAttachment.single("attachment"),createTask);

// update the task
router.put("/update/:taskId", checkAuth, uploadAttachment.single("attachment"),updateTask)

//delete the task
router.delete("/delete/:taskId", checkAuth, deleteTask)

//get task of the logged in user
router.get("/current-user", checkAuth, getTaskOfLoggedUser)



module.exports = router