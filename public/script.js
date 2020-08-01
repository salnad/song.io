let authorization = atob(CLIENT_ID + ":" + CLIENT_SECRET);
console.log(authorization);
async function act() {
  let authorization = atob(CLIENT_ID + ":" + CLIENT_SECRET);
  let res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    body: {
      grant_type: "client_credentials",
    },
    header: {
      Authorization: `Basic ${authorization}`,
    },
  });
  console.log(res);
  console.log(res.body);
  console.log("HELLO");
}
