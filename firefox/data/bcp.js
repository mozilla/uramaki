
console.log("loading bcp.js");

// for some reason, you have to do this to make things work
// unsafeWindow.navigator.wrappedJSObject.foo = 'foobar@foobar.com';

unsafeWindow.navigator.wrappedJSObject.id = (function() {
  var email = null;
  var complete = false;
  
  // browsing context provider
  self.port.on("setEmail", function(e) {
    console.log("got email :" +e);
    email = e;
  });

  var beginAuthentication = function(cb) {
    // XXX - not a timeout, come on
    window.setTimeout(function() {cb(email);}, 100);
  };

  var raiseAuthenticationFailure = function() {
    self.port.emit("authenticationFailure", error);
  };

  var cancelAuthentication = function() {
    self.port.emit("authenticationCanceled");
  };

  var completeAuthentication = function(token) {
    if (!complete) {
      complete = true;
      self.port.emit("authenticationCompleted", token);
    }
  };
  
  return {
    beginAuthentication: beginAuthentication,
    raiseAuthenticationFailure: raiseAuthenticationFailure,
    cancelAuthentication: cancelAuthentication,
    completeAuthentication: completeAuthentication
  };
})();

