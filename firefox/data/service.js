
console.log("loading service.js");

// for some reason, you have to do this to make things work
// unsafeWindow.navigator.wrappedJSObject.foo = 'foobar@foobar.com';

var frame;
var origin;

self.port.on("initiate", function(serviceURL) {
  console.log("setting service URL to " + serviceURL);
  $('#serviceFrame').attr('src', serviceURL);
  frame = $('#serviceFrame')[0].contentWindow;
});

self.port.on("credentials", function(creds) {
  console.log("got credentials going to " + origin);
  frame.postMessage({type: "credentials", credentials: creds}, origin);
});

self.port.on("call", function(call) {
  frame.postMessage({type: "call", method: call.method, params: call.params});
});

window.addEventListener('message', function(event) {
  var data = event.data;

  console.log("type: " + data.type);
  if (data.type == 'ready') {
    console.log("ready!");
    origin = event.origin;
    self.port.emit("ready");
  }

  if (data.type == 'credentialsResult') {
    console.log('credentials result');
    self.port.emit("credentialsResult", data);
  }

  if (data.type == 'response') {
    self.port.emit("response", data.result);
  }
}, false);