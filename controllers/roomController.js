let RoomModel = require("../models/RoomModel");
let UserModel = require("../models/UserModel");
const mongoose = require("mongoose");

exports.createRoom = async function (req, res) {
  let joinRoomId = generateRoomId();
  // TODO: @salnad, handle error if cookie invalid
  let userCreatorId = req.cookies.userId;
  console.log(userCreatorId);
  let newRoom = new RoomModel({
    joinRoomId: joinRoomId,
    playlist: "test",
    users: [userCreatorId],
  });
  newRoom.save(function (err) {
    // TODO: @salnad, add a "handle error"
    if (err) console.log(`error in creating room: ${err}`);
  });
  res.json({
    roomId: joinRoomId,
  });
};

exports.joinRoom = async function (req, res) {
  let userJoinId = req.cookies.userId;
  let joinRoomId = req.params.roomId;
  const query = {
    joinRoomId: joinRoomId,
  };
  let currentRoom = await RoomModel.findOne(query);
  currentRoom.users.push(userJoinId);
  currentRoom.save();
  res.sendStatus(200);
};

exports.getUsersInRoom = async function (req, res) {
  let joinRoomId = req.params.roomId;
  const query = {
    joinRoomId: joinRoomId,
  };
  let currentRoom = await (await RoomModel.findOne(query)).populate("users");
  console.log(currentRoom.populated("users"));
  res.json(currentRoom.users);
};

function generateRoomId() {
  return Math.random().toString(36).substr(2, 9);
}
