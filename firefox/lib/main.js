const widgets = require("widget");
const tabs = require("tabs");
const data = require("self").data;
const panel = require("panel");
const bcp = require("bcp");

function makeBCPPanel(signinURL) {
  var bcpPanel = panel.Panel({
    contentURL : signinURL,
    contentScriptFile: [data.url("jquery-1.7.1.min.js"), data.url("bcp.js")],
    width: 422,
    height: 272,
    contentScriptWhen: 'ready'
  });

  bcpPanel.port.on('bcpLoginFailure', function(reason) {
    console.log("got failure");
    bcpPanel.hide();
    console.log('failure');
  });

  return bcpPanel;
}

var connectPanel = panel.Panel({
  contentURL : data.url("signin.html"),
  contentScriptFile: [data.url("jquery-1.7.1.min.js"), data.url("signin.js")],
  width: 422,
  height: 272,
});

connectPanel.port.on('login', function(email) {
  // discover the BCP for the email address in question
  bcp.discover(email, function(bcp) {
    connectPanel.hide();
    var bcp_panel = makeBCPPanel(bcp.loginURL);
    bcp_panel.show();
    bcp_panel.port.emit('setEmail', email);
  });
});


var widget = widgets.Widget({
  id: "connect-widget",
  label: "Connect to Firefox",
  contentURL: data.url('firefox.png'),
  onClick: function() {
    connectPanel.show();
  }
});

console.log("connect-to-firefox add-on is running.");
