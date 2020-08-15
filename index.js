const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const DATABASE = "game-data";
const USER = "test";
const PASSWORD = "12345";

mongoose.connect(
  `mongodb+srv://${USER}:${PASSWORD}@cluster0.wcn2l.mongodb.net/${DATABASE}?retryWrites=true&w=majority`,
  { useNewUrlParser: true }
);
//Get the default connection
let db = mongoose.connection;

// start up db connection
db.on("error", console.error.bind(console, "MongoDB connection error:"));

let userRouter = require("./routes/user");
let roomRouter = require("./routes/room");

const app = express();

// // INCLUDE MIDDLE WARE
app.use(express.json());
app.use(cookieParser());

// // INCLUDE CLIENT FILES
app.use(express.static("public"));

// // INCLUDE ROUTES
app.use("/user", userRouter);
app.use("/room", roomRouter);

app.listen(3000, () => {
  console.log("Server started");
});
