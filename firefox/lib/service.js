/*
 * 3rd-party browserid service
 */

const panel = require("panel");
const data = require("self").data;

exports.initiate = function(serviceURL, cert, cb) {
  console.log("initiating service to " + serviceURL);
  /*
  var servicePanel = panel.Panel({
    contentURL: data.url("service.html"),
    contentScriptFile: [data.url("jquery-1.7.1.min.js"), data.url("service.js")]
  });*/
  
  var servicePanel = panel.Panel({
    contentURL: serviceURL,
    contentScriptFile: [data.url("jquery-1.7.1.min.js"), data.url("servicedirect.js")],
    contentScriptWhen: 'ready'
  });

  // set up the response handling for later
  var responseCB = null;
  servicePanel.port.on('response', function(result) {
    responseCB(null, result);
  });

  // set up the service instance
  var serviceInstance = {
    call : function _call(method, params, cb) {
      // stash the callback - XXX - yes this means no multiplexing calls
      responseCB = cb;
      servicePanel.port.emit('call', {method: method, params: params});
    },
    close: function _close() {
      servicePanel.destroy();
      servicePanel = null;
    }
  };

  // now wait for ready and send credentials
  servicePanel.port.on('ready', function() {
    // FIXME: need to generate the right assertion here
    servicePanel.port.emit('credentials', {cert: cert});
  });

  // and when credentials are successfully processed, service is ready to go
  servicePanel.port.on('credentialsResult', function(result) {
    if (!result.result)
      return console.log("oy on credentialsResult");

    cb(null, serviceInstance);
  });

  // and now we initiate things
  // servicePanel.port.emit("initiate", serviceURL);
};