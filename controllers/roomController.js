let RoomModel = require("../models/RoomModel");
let UserModel = require("../models/UserModel");
const mongoose = require("mongoose");

exports.createRoom = async function (req, res) {
  // TODO: @salnad, adjust joinRoomId to include request
  let joinRoomId = "54321";
  // TODO: @salnad, handle error if cookie invalid
  let userCreatorId = req.cookies.userId;
  let newRoom = new RoomModel({
    joinRoomId: joinRoomId,
    playlist: "test",
    users: [userCreatorId],
  });
  newRoom.save(function (err) {
    // TODO: @salnad, add a "handle error"
    if (err) console.log(`error in creating room: ${err}`);
  });
  res.status(200).end();
};
