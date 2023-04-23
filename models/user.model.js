const { model, Schema } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
    },
    image:{
      type:String,
      require:true
    },
    password:{
        type:String,
        required:true,
        trim:true,
    },


  },
  { timestamps: true }
);

module.exports = model("User", userSchema);
