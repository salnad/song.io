let UserModel = require("../models/UserModel");

// CREATE USER ON POST
exports.createUser = function (req, res) {
  let username = req.body.username;
  let newUser = new UserModel({ username });
  newUser.save(function (err) {
    // TODO: @salnad, add a "handle error"
    if (err) console.log(`error in creating user: ${err}`);
  });
  res
    .writeHead(200, {
      "Set-Cookie": `userId=${newUser._id}; HttpOnly`,
      "Access-Control-Allow-Credentials": "true",
    })
    .send();
};

exports.testCookie = function (req, res) {
  res.send(`user with id ${userId} has made request`);
};
