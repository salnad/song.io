async function act() {
  let res = await fetch("/token");
  console.log(res);
  let token = await res.json();
  console.log(token);
}
