async function act() {
  let playlist = document.getElementById("playlist-input").value;
  let playlist_id = parse_playlist_for_id(playlist);
  let res = await fetch(`/playlist?playlist_id=${playlist_id}`);
  let simplified_playlist = await res.json();
  console.log(simplified_playlist);
}

function parse_playlist_for_id(playlist) {
  let dirty_id = playlist.split("playlist/", 2)[1];
  let clean_id = dirty_id.split("?", 2)[0];
  return clean_id;
}
