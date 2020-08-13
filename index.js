const express = require("express");

const axios = require("axios");
const SpotifyWebApi = require("spotify-web-api-node");
const mongoose = require("mongoose");

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

// // INCLUDE CLIENT FILES
app.use(express.static("public"));

// // INCLUDE MIDDLE WARE
app.use(express.json());

// // INCLUDE ROUTES
app.use("/user", userRouter);
app.use("/room", roomRouter);

app.listen(3000, () => {
  console.log("Server started");
});

const CLIENT_ID = "907a3b6dfb7144029e11aa5ac4b68bbf";
const CLIENT_SECRET = "1a603f6afd374387aa6c3f5bf97882ff";

app.get("/playlist", async (req, res) => {
  // TODO: @salnad Buffer() is deprecated
  let buffer = new Buffer(CLIENT_ID + ":" + CLIENT_SECRET);
  let authorization = buffer.toString("base64");

  let playlist_id = req.query.playlist_id;

  // Send a POST request
  try {
    let access_token_response = await axios.post(
      "https://accounts.spotify.com/api/token",
      "grant_type=client_credentials",
      {
        headers: {
          Authorization: "Basic " + authorization,
        },
      }
    );
    let access_token = access_token_response.data.access_token;
    let spotify_data = await get_playlist_items(access_token, playlist_id);
    res.json(spotify_data);
  } catch (err) {
    console.log(`/token post usage error: ${err}`);
  }
});

async function get_playlist_items(access_token, playlist_id) {
  let spotify_api = new SpotifyWebApi();
  spotify_api.setAccessToken(access_token);
  try {
    let spotify_response = await spotify_api.getPlaylist(playlist_id);
    let playlist_items = spotify_response.body.tracks.items;
    let playlist_items_simplified = playlist_items.map((item) => {
      let track = item.track;
      if (!track) {
        return {};
      }
      let track_simplified = {
        track_title: track.name,
        thirty_second_url: track.preview_url,
        track_id: track.id,
        artists: track.artists.map((artist) => {
          return artist.name;
        }),
      };
      return track_simplified;
    });
    return playlist_items_simplified;
  } catch (err) {
    console.log(`SpotifyWebApi usage error: ${err}`);
  }
}
