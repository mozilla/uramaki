/*
 * IdP Functionality
 */

const panel = require("panel");
const data = require("self").data;

exports.provision = function(email, provisionURL, token, cb) {
  var provisionPanel = panel.Panel({
    contentURL: provisionURL,
    contentScriptFile: [data.url("jquery-1.7.1.min.js"), data.url("idp.js")]
  });

  provisionPanel.port.on('beginProvisioning', function() {
    console.log("got begin provision");
    provisionPanel.port.emit('doBeginProvisioning', {
      email: email,
      cert_duration: 3600,
      auth_token: token
    });
  });

  provisionPanel.port.on('genKeyPair', function() {
    // generate a keypair
    var pubkey = "pubkey";
    
    provisionPanel.port.emit('doGenKeyPair', pubkey);
  });

  provisionPanel.port.on('registerCertificate', function(cert) {
    cb(null, cert);
  });
};