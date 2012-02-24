const widgets = require("widget");
const tabs = require("tabs");
const data = require("self").data;
const panel = require("panel");
const bcp = require("bcp");

var connectPanel = panel.Panel({
  contentURL : data.url("signin.html"),
  contentScriptFile: [data.url("jquery-1.7.1.min.js"), data.url("signin.js")],
  width: 422,
  height: 272,
});

connectPanel.port.on('login', function(email) {
  // discover the BCP for the email address in question
  bcp.discover(email, function(bcp) {
    connectPanel.port.emit('loadBCP', {url: bcp.loginURL});
  });
});


var widget = widgets.Widget({
  id: "connect-widget",
  label: "Connect to Firefox",
  contentURL: data.url('firefox.png'),
  panel: connectPanel
});

console.log("connect-to-firefox add-on is running.");
