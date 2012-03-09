
const tabBrowser = require("tab-browser");

const widgets = require("widget");
const url = require("url");
const windowUtils = require("window-utils");

function getWidget(index) {
  let browserWindow = windowUtils.activeBrowserWindow;
  let doc = browserWindow.document;

  function container() doc.getElementById("addon-bar");
  function widgetNode(index) container() ? container().getElementsByTagName("toolbaritem")[index] : null;

  return widgetNode(index);
}

exports.testClick = function(test) {
  test.waitUntilDone(5000);
  var the_widget = getWidget(0);
  //the_widget.click();
  
  test.assertEqual(the_widget.firstChild.boxObject.height, 16, "widget has right height");
};