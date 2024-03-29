const express = require("express");
const app = express();
const http = require("http");
const mongoose = require("mongoose");
const { Router } = require("express");
//const server = http.createServer(app);
const server = http.createServer(app);

const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}


app.use(express.json());
app.use(cors(corsOptions))

mongoose.connect(
    "mongodb+srv://thinh:123@cluster0.ydjcp.mongodb.net/CommentPhotos",
)
.then((success) => console.log("db connected"))
.catch((err)=> console.log(err))

app.get("/", function (req, res) {
    res.send("Hello World");
});

const userRouter = require(__dirname + "/controllers/user");
app.use("/api/user", userRouter);

const photoRouter = require(__dirname + "/controllers/photo");
app.use("/api/photo", photoRouter);

app.listen(process.env.PORT || 8000, () =>
  console.log("Listening Port 8000...")
);