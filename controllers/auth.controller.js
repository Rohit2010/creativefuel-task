
const bcrypt = require("bcrypt")
const User = require("../models/user.model");
const { createJwtToken } = require("../utils/token.util")
const { USER_NOT_FOUND_ERR , USER_ALREADY_EXISTS } = require("../utils/error");
const { convertJsonToExcel, convertObjToPdf } = require("../utils/jsonToExcel");

exports.createNewUser = async (req, res, next) => {
   
    const { name, email, password} = req.body;
    const {filename} = req.file;
    console.log(req.file)

    const IsUserExist = await User.findOne({email});

    //check if user exist with this email or not
    if (IsUserExist) {
        console.log(USER_ALREADY_EXISTS)
        return res.status(400).json({
            type:'error',
            message:USER_ALREADY_EXISTS,
            data:null
        })
      }
      //encrypt the password
      const hashedPassword = await bcrypt.hash(password, 12);
     
      try {
        const newUser = new User({
            name,
            email, 
            image:filename,
            password:hashedPassword
        })
        //save the user in db
        const user = await newUser.save();

        //return the response 
        res.status(200).json({
            type: "success",
            message: "Account created Successfully",
            data: {
              userId: user._id,
            },
          });
          next()
      } catch (error) {
        // console.log(error)
        next(error)
      }
  };


exports.login = async(req, res, next) => {
    const { email, password } = req.body;
    // console.log(req.body)
    const checkUser = await User.findOne({email});
    // console.log(checkUser);

    //check user exist or not
    if(!checkUser){
        return res.status(404).json({
            type:"error",
            message:USER_NOT_FOUND_ERR,
            data:null
        })
    }
    //compare password with encrypted password
    const comparePassword = await bcrypt.compare(password, checkUser.password);


    if (comparePassword) {
        const token = createJwtToken({ userId: checkUser._id });
        return res.status(200).json({
            type:"success",
            message:"User logged in successfully",
            data:{
                token:token,
                userId:checkUser._id,
            }
        })
    }
    else {
        res.status(403).json({
            type:"error",
            message:"Incorrect password",
            data:null
        })
    }
  }

exports.getSingleUser = async(req, res, next) => {
    const { userId } = req.params;

    try {
    const userDetail = await User.findById({_id:userId}).select("name email image createdAt");

        //code for generating pdf file
    const {name, email, image} = userDetail;
    const obj = {name, email, image};
    convertObjToPdf(obj, "singleUser.pdf")
        //code ends for generating pdf file

        res.status(200).json({
            type:"success",
            message:"User detail fetched successfully",
            data:userDetail
        })
    } catch (error) {
        console.log(error)
    }
}
exports.getAllUser = async(req, res, next) => {
    try {
    const userDetail = await User.find({}, {name:1, email:1, image:1, createdAt:1});
        console.log(userDetail)

        convertJsonToExcel(userDetail, "userdata.xlsx")
        res.status(200).json({
            type:"success",
            message:"Users detail fetched successfully",
            data:userDetail
        })
    } catch (error) {
        console.log(error)
    }
}