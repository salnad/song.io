// model for user collection
var mongoose = require("mongoose");
var userSchema = mongoose.Schema({
  username: String,
});
module.exports = mongoose.model("User", userSchema);
