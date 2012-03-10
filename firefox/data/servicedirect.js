
console.log("loading servicedirect.js");

// for some reason, you have to do this to make things work
// unsafeWindow.navigator.wrappedJSObject.foo = 'foobar@foobar.com';

var frame;
var origin;

function createMessageEvent(payload) {
  var evt = document.createEvent('MessageEvent');
  evt.initMessageEvent('message', true, true, payload, "browser://", "foo", window);
  window.dispatchEvent(evt);
}

self.port.on("credentials", function(creds) {
  console.log("got credentials going to " + origin);
  createMessageEvent({type: "credentials", credentials: creds});
  console.log("sent credentials");
});

self.port.on("call", function(call) {
  createMessageEvent({type: "call", method: call.method, params: call.params});
});

// fake the parent
unsafeWindow.channel = {
  postMessage : function(data, target) {
    console.log("type: " + data.type);
    if (data.type == 'ready') {
      console.log("ready!");
      origin = target;
      self.port.emit("ready");
    }
    
    if (data.type == 'credentialsResult') {
      console.log('credentials result');
      self.port.emit("credentialsResult", data);
    }
    
    if (data.type == 'response') {
      self.port.emit("response", data.result);
    }
  }
};

