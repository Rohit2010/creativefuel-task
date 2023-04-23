const Task = require("../models/task.model");


//create the task
exports.createTask = async (req, res, next) => {
    console.log(res.locals.user)
    const { _id : currentUserId } = res.locals.user;
    const {title, dueDate} = req.body;
    const { filename } = req.file;
    console.log(currentUserId)
    try {
        const newTask = new Task({
            title,
            dueDate,
            attachment:filename,
            userId:currentUserId
    
        })

       const savedTask =  await newTask.save();
        return res.status(200).json({
            type:"Success",
            message:"Task created successfully",
            data:savedTask
        })
    } catch (error) {
        next(error)
    }
    
}

//update the task
exports.updateTask = async (req, res, next) => {
    const {title, dueDate} = req.body;
    const { filename } = req.file;
    const {taskId} = req.params;

    try {
        const updateTask = await Task.findOneAndUpdate({_id:taskId}, {$set:{
            title,
            dueDate,
            attachment:filename,
        }}, {new:true})
        return res.status(200).json({
            type:"success",
            message:"Task updated successfully",
            data:updateTask
        })
    } catch (error) {
        next(error)
    }
}

//delete the task 
exports.deleteTask = async (req, res, next) => {
    const {taskId} = req.params;
    try {
        const checkTaskExist = await Task.findById(taskId);
        if(!checkTaskExist){
            res.status(403).json({
                type:"Error",
                message:"Task not found",
                data:null
            })
        }
       else{
        await Task.deleteOne({_id:taskId})
        res.status(200).json({
            type:"success",
            message:"Task deleted successfully",
            data:null
        })
       }
    } catch (error) {
        next(error)
    }
}
exports.getTaskOfLoggedUser = async (req, res, next) => {
    const {_id} = res.locals.user;
    try {
        const tasks = await Task.find({userId:_id});

        res.status(200).json({
            type:"Success",
            message:"Task fetched of the current user",
            data:tasks
        })
    } catch (error) {
        next(error)
    }
}
