
var origin=null;

function getIdentities() {
  send(["ben@adida.net", "ben2@adida.net"]);
}

function getServices() {
  send({
    "bookmarks": "https://bookmarks.services.mozilla.org",
    "apps": "https://apps.services.mozilla.org"
  });
}

function send(data) {
  window.parent.postMessage(data, origin || "*");
}

function receive(event) {
  $.get("/foo", {data: data}, function() {});
  $.get("/foo", {origin: event.origin}, function() {});

  // lock in the origin
  if (!origin)
    origin = event.origin;

  // bail
  if (event.origin != origin) {
    alert('oy!!');
    return;
  }

  var data = event.data;
  if (data.type == "credentials") {
    // check credentials

    send({type: "credentialsResult", result: true});
  }

  if (data.type == "call") {
    if (data.method == "getIdentities")
      getIdentities();

    if (data.method == "getServices")
      getServices();
  }
}

window.onload = function() {
  window.addEventListener("message", receive, false);
  send({type:"ready"});
};