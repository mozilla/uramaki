const widgets = require("widget");
const tabs = require("tabs");
const data = require("self").data;
const panel = require("panel");
const bcp = require("bcp");
const idp = require("idp");
const timers = require("timers");
const service = require("service");

var ID = null;

function showErrorPanel(message) {
  var errorPanel = panel.Panel({
    contentURL : data.url("error.html"),
    width: 422,
    height: 75
  });

  errorPanel.show();
  timers.setTimeout(function() {errorPanel.destroy();}, 3000);
}

function makeBCPPanel(email, signinURL, provisionURL, discoveryURL) {
  var bcpPanel = panel.Panel({
    contentURL : signinURL,
    contentScriptFile: [data.url("jquery-1.7.1.min.js"), data.url("bcp.js")],
    width: 422,
    height: 272,
    contentScriptWhen: 'ready'
  });

  bcpPanel.port.on('authenticationFailure', function(reason) {
    bcpPanel.hide();
    showErrorPanel("could not log in");
  });

  bcpPanel.port.on('authenticationCanceled', function() {
    bcpPanel.hide();
  });

  bcpPanel.port.on('authenticationCompleted', function(token) {
    ID = {token: token, email: email};
    bcpPanel.destroy();

    // provision
    idp.provision(email, provisionURL, token, function(err, cert) {
      if (err)
        showErrorPanel("oy!");

      console.log("got cert: " + cert);

      // now do discovery
      service.initiate(discoveryURL, cert, function(err, discoveryService) {
        if (err) {
          console.log("oh oh");
        } else {
          console.log("got discovery service");

          discoveryService.call("getIdentities", {}, function(err, result) {
            ID.identities = result;

            discoveryService.call("getServices", {}, function(err, result) {
              ID.services = result;

              console.log(JSON.stringify(ID));
              discoveryService.close();
            });
          });
        }
      });
    });
  });

  bcpPanel.show();
  bcpPanel.port.emit('setEmail', email);
  
  return bcpPanel;
}

var connectPanel = panel.Panel({
  contentURL : data.url("signin.html"),
  contentScriptFile: [data.url("jquery-1.7.1.min.js"), data.url("signin.js")],
  contentScriptWhen: 'ready',
  width: 422,
  height: 272,
});

connectPanel.port.on('login', function(email) {
  // discover the BCP for the email address in question
  bcp.discover(email, function(bcp) {
    connectPanel.hide();
    var bcp_panel = makeBCPPanel(email, bcp.loginURL, bcp.provisionURL, bcp.discoveryURL);
  });
});

var statusPanel = panel.Panel({
  contentURL : data.url("status.html"),
  contentScriptFile : [data.url("jquery-1.7.1.min.js"), data.url("status.js")],
  width: 422,
  height: 272
});

statusPanel.port.on('logout', function() {
  ID = null;
  statusPanel.hide();
});

var widget = widgets.Widget({
  id: "connect-widget",
  label: "Connect to Firefox",
  contentURL: data.url('firefox.png'),
  onClick: function() {
    if (ID) {
      statusPanel.show();
      statusPanel.port.emit('show', ID);
    } else {
      connectPanel.show();
      connectPanel.port.emit('go');
    }
  }
});

console.log("connect-to-firefox add-on is running.");
