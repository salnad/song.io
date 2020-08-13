let UserModel = require("../models/UserModel");

// CREATE USER ON POST
exports.createUser = function (req, res) {
  let username = req.body.username;
  let newUser = new UserModel({ username });
  newUser.save(function (err) {
    // TODO: @salnad, add a "handle error"
    if (err) console.log(`error in creating user: ${err}`);
  });
};
