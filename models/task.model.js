const { model, Schema,  } = require("mongoose");
const mongoose = require("mongoose")

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    dueDate:{
        type:String,
        required:true,
        trim:true
    },
    attachment:{
      type:String,
      require:true
    },
    userId:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    }


  },
  { timestamps: true }
);

module.exports = model("Task", taskSchema);