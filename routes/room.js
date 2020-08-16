let express = require("express");
let router = express.Router();

// REQUIRE CONTROLLER MODULES
let roomController = require("../controllers/roomController");

// ROOM ROUTES

// POST request for creating a room
router.post("/", roomController.createRoom);
router.put("/join/:roomId", roomController.joinRoom);
router.get("/users/:roomId/", roomController.getUsersInRoom);

module.exports = router;
