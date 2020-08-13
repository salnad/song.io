// model for user collection
var mongoose = require("mongoose");
var roomSchema = mongoose.Schema({
  joinRoomId: String,
  playlist: String,
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});
module.exports = mongoose.model("Room", roomSchema);
