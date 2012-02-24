#!/usr/bin/env node

/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

const
fs = require('fs'),
path = require('path'),
url = require('url'),
http = require('http');
urlparse = require('urlparse'),
express = require('express');

const
wsapi = require('../lib/wsapi.js'),
httputils = require('../lib/httputils.js'),
logger = require('../lib/logging.js').logger;

const HOST = "localhost";
const PORT = 8000;

var app = express.createServer();

logger.info("uramaki server starting up");

// logging!  all requests other than __heartbeat__ are logged
app.use(express.logger({
  stream: {
    write: function(x) {
      logger.info(typeof x === 'string' ? x.trim() : x);
    }
  }
}));

// limit all content bodies to 10kb, at which point we'll forcefully
// close down the connection.
app.use(express.limit("10kb"));

/*
if (config.get('scheme') == 'https') {
  app.use(function(req, resp, next) {
    // expires in 30 days, include subdomains like www
    resp.setHeader("Strict-Transport-Security", "max-age=2592000; includeSubdomains");
    next();
    });
}

// #4 - prevent framing of everything.  content underneath that needs to be
// framed must explicitly remove the x-frame-options
app.use(function(req, resp, next) {
  resp.setHeader('x-frame-options', 'DENY');
  next();
});*/

// verify all JSON responses are objects
app.use(function(req, resp, next) {
  var realRespJSON = resp.json;
  resp.json = function(obj) {
    if (!obj || typeof obj !== 'object') {
      logger.error("INTERNAL ERROR!  *all* json responses must be objects");
      return httputils.serverError(resp, "broken internal API implementation");
    }
    realRespJSON.call(resp, obj);
  };
  return next();
});

// handle /wsapi requests
wsapi.setup({}, app);

// if nothing else has caught this request, serve static files, but ensure
// that proper vary headers are installed to prevent unwanted caching
app.use(function(req, res, next) {
  res.setHeader('Vary', 'Accept-Encoding,Accept-Language');
  next();
});

app.use(express.static(path.join(__dirname, "..", "resources", "static")));

// custom 404 page
app.use(function(req, res,next) {
  res.statusCode = 404;
  res.write("Cannot find this resource");
  res.end();
});

app.listen(PORT, function() {
  logger.info("running on "+ app.address().address + ":" + app.address().port);
});
