let RoomModel = require("../models/RoomModel");
const mongoose = require("mongoose");

exports.createRoom = async function (req, res) {
  let joinRoomId = "54321";
  let newRoom = new RoomModel({
    joinRoomId: joinRoomId,
    playlist: "test",
    users: [],
  });
  newRoom.save(function (err) {
    // TODO: @salnad, add a "handle error"
    if (err) console.log(`error in creating room: ${err}`);
  });
};
