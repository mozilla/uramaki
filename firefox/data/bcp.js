
console.log("loading bcp.js");

// for some reason, you have to do this to make things work
// unsafeWindow.navigator.wrappedJSObject.foo = 'foobar@foobar.com';

unsafeWindow.navigator.wrappedJSObject.id = (function() {
  var email = null;
  
  // browsing context provider
  self.port.on("setEmail", function(e) {
    console.log("got email :" +e);
    email = e;
  });

  // called by BCP to initiate process
  var beginBCPLogin = function(cb) {
    console.log("getting...");
    setTimeout(function() {cb(email);}, 0);
  };

  var raiseBCPLoginFailure = function(error) {
    console.log("emitting failure");
    self.port.emit("bcpLoginFailure", error);
  };
  
  return {
    beginBCPLogin: beginBCPLogin,
    raiseBCPLoginFailure : raiseBCPLoginFailure
  };
})();

