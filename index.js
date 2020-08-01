const express = require("express");
const axios = require("axios");

const CLIENT_ID = "907a3b6dfb7144029e11aa5ac4b68bbf";
const CLIENT_SECRET = "1a603f6afd374387aa6c3f5bf97882ff";

const app = express();
app.use(express.static("public"));

app.listen(3000, () => {
  console.log("Server started");
});

app.get("/token", (req, res) => {
  let authOptions = {
    method: "post",
    url: "https://accounts.spotify.com/api/token",
    headers: {
      Authorization:
        "Basic " +
        new Buffera.alloc(CLIENT_ID + ":" + CLIENT_SECRET).toString("base64"),
    },
    form: {
      grant_type: "client_credentials",
    },
    json: true,
  };

  // Send a POST request
  console.log(axios(authOptions));

  axios.post(authOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      var token = body.access_token;
      console.log(token);
    }
  });
  res.send("HELLO WORLD!");
});
