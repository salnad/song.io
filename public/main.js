async function createRoom() {
  let usernameInput = document.getElementById("user-name-create");
  let username = usernameInput.value;
  await createUser(username);
  let res = await fetch("/room", {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  let createdRoomData = await res.json();
  console.log(createdRoomData);
  redirectToRoom(createdRoomData.roomId);
}

async function joinRoom() {
  let usernameInput = document.getElementById("user-name-join");
  let username = usernameInput.value;
  await createUser(username);
  let roomIdInput = document.getElementById("room-id-join");
  let roomId = roomIdInput.value;
  await fetch(`/room/join/${roomId}`, {
    method: "PUT",
  });
  redirectToRoom(roomId);
}

async function createUser(username) {
  data = {
    username,
  };
  let response = await fetch("/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

function redirectToRoom(roomId) {
  window.location.href = `/room.html?roomId=${roomId}`;
}

// async function act() {
//   let playlist = document.getElementById("playlist-input").value;
//   let playlist_id = parse_playlist_for_id(playlist);
//   let res = await fetch(`/playlist?playlist_id=${playlist_id}`);
//   let simplified_playlist = await res.json();
//   simplified_playlist = simplified_playlist.filter((track) => {
//     return track.thirty_second_url != null;
//   });
//   let random_track =
//     simplified_playlist[Math.floor(Math.random() * simplified_playlist.length)];
//   let audio_src = random_track.thirty_second_url;
//   var audio = new Audio(audio_src);
//   audio.play();
//   document.getElementById("current-song").innerText = random_track.track_title;
// }

// function parse_playlist_for_id(playlist) {
//   let dirty_id = playlist.split("playlist/", 2)[1];
//   let clean_id = dirty_id.split("?", 2)[0];
//   return clean_id;
// }
