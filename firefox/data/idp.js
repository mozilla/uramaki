
console.log("loading idp.js");

// for some reason, you have to do this to make things work
// unsafeWindow.navigator.wrappedJSObject.foo = 'foobar@foobar.com';

unsafeWindow.navigator.wrappedJSObject.id = (function() {
  var beginProvisioning = function(cb) {
    self.port.on('doBeginProvisioning', function(stuff) {
      console.log("doing begin prov");
      cb(stuff.email, stuff.cert_duration, stuff.auth_token);
    });
    
    self.port.emit('beginProvisioning');
  };

  var genKeyPair = function(cb) {
    self.port.on('doGenKeyPair', function(pubkey) {
      cb(pubkey);
    });
    self.port.emit("genKeyPair");
  };

  var registerCertificate = function(cert) {
    self.port.emit("registerCertificate", cert);
  };

  return {
    beginProvisioning: beginProvisioning,
    genKeyPair: genKeyPair,
    registerCertificate: registerCertificate
  };
})();

