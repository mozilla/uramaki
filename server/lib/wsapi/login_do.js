/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

const
wsapi = require('../wsapi.js');

exports.url = '/bcp/login';
exports.method = 'post';
exports.writes_db = false;
//exports.authed = false;

exports.process = function(req, res) {
  console.log("yo");
  res.json({
    success: true,
    services: {
      'bookmarks' : 'https://services.mozilla.org/bookmarks',
      'apps' : 'https://services.mozilla.org/apps'
    },
    identities: ['ben@adida.net', 'benadida@mozilla.com']
  });
};
