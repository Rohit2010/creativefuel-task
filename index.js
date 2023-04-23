const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
var path = require('path');

require("dotenv").config();

//import variables
const { PORT, MONGO_URI, NODE_ENV } = require("./utils/config")
const {API_ENDPOINT_NOT_FOUND_ERR, SERVER_ERR} = require("./utils/error")

//routes
const userRoutes = require("./routes/auth.route")
const taskRoutes = require("./routes/task.route")

// initiate express app
const app = express();

//middleware
app.use(express.json());
app.use('/public/images', express.static(path.join(__dirname, 'public/images')));
app.use('/public/document', express.static(path.join(__dirname, 'public/document')));


//cors
app.use(cors({
    credentials:true,
    origin:`http://localhost:${PORT}`,
    optionsSuccessStatus:true

}))

//dev environment
if(NODE_ENV === "development"){
    const morgan = require("morgan");
    app.use(morgan("dev"))
}

//welcome route
app.get("/", (req, res) => {
    res.status(200).json({
        type:"SUCCESS",
        message:"SERVER IS UP AND RUNNING",
        data:null
    })
})
// routes start
app.use("/user", userRoutes)
app.use("/task", taskRoutes)


//route end

app.use("*", (req, res, next) => {
    const error = {
      status: 404,
      message: API_ENDPOINT_NOT_FOUND_ERR,
    };
    next(error);
  });
  
  // global error handling middleware
  app.use((err, req, res, next) => {
    console.log(err);
    const status = err.status || 500;
    const message = err.message || SERVER_ERR;
    const data = err.data || null;
    res.status(status).json({
      type: "error",
      message,
      data,
    });
  });
  
  async function connectDb() {
    try {
      await mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
  
      console.log("database connected");
  
      app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  }
  
  connectDb();