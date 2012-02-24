#!/usr/bin/env node

/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

var path = require("path"),
    fs = require("fs"),
    express = require("express"),
    sessions = require('client-sessions');

const HOST = "localhost";
const PORT = "8000";

var app = express.createServer();

// use the express 'static' middleware for serving of static files (cache headers, HTTP range, etc)
app.use(express.static(path.join(__dirname, "static")));

app.set("views", __dirname + '/views');

app.get('/foo', function(req, res, next) {
  console.log(req.headers);
  res.render('foo.ejs');
});

app.get('/bookmarks', function(req, res, next) {
  console.log("bookmarks!");
  res.json({"bookmarks": [
    {
      "url" : "http://ben.adida.net",
      "title" : "Ben Adida"
    },
    {
      "url" : "http://mozilla.org",
      "title" : "Mozilla"
    },
    {
      "url" : "http://theonion.com",
      "title" : "The Onion"
    }    
  ]});
});

app.listen(PORT, HOST);

