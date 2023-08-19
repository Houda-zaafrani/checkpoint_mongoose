const express = require("express");
const app = express();
port = 5000;

//import librery mongoose(Object Data Modeling librery)
const mongoose = require("mongoose");
app.use(express.json())

//let mongoose connect to database
mongoose
  .connect(
    "mongodb+srv://user:user@cluster0.qk9wouv.mongodb.net/test?retryWrites=true&w=majority"
  )
  //if connection is successfully done display me a message
  .then(() => console.log("data base connected"))
  //if connection not successfully done display me error
  .catch((err) => {
    if (err) throw err;
  }); 
//import router
app.use("/api",require("./routes/personRoutes") )

//connect server to port 5000
app.listen(port, () =>
  console.log("server connected successfult au port : ", port)
);
