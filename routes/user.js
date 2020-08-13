let express = require("express");
let router = express.Router();

// REQUIRE CONTROLLER MODULES
let userController = require("../controllers/userController");

// USER ROUTES

// POST request for creating a user
router.post("/", userController.createUser);

module.exports = router;
