const params = new URLSearchParams(window.location.search);
let ROOM_ID = params.get("roomId");

window.onload = () => {
  displayRoomId();
  displayUsersInRoom();
};

function displayRoomId() {
  let roomIdBox = document.getElementById("join-room-code");
  roomIdBox.innerHTML = ROOM_ID;
}

async function displayUsersInRoom() {
  let roomUsersBox = document.getElementById("room-user-list");
  let userInRoomDataResponse = await fetch(`/room/users/${ROOM_ID}`);
  let usersInRoom = await userInRoomDataResponse.json();
  console.log(usersInRoom);
  for (user of usersInRoom) {
    let newUserInfo = `<p>${user}</p>`;
    roomUsersBox.insertAdjacentHTML("beforeend", newUserInfo);
  }
}
