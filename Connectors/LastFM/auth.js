/*
*
* Copyright (C) 2011, The Locker Project
* All rights reserved.
*
* Please see the LICENSE file for more information.
*
*/

var request = require('request'),
    lfs = require('lfs'),
    lcrypto = require("lcrypto"),
    fs = require('fs');

exports.auth = {};

function go(req, res) {
  if (!(exports.auth.username)) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end("<html>Enter your IMAP server info that will be used to sync your data" +
            "<form method='post' action='saveAuth'>" +
            "Username: <input name='username'><br>" +
            "<input type='submit' value='Save'>" +
            "</form></html>");
  } else {
    res.redirect('http://www.google.com');
  }
}

exports.authAndRun = function(app, externalUrl, onCompletedCallback) {
  console.log('AUTH AND RUN');
  app.get('/go', go);
};

exports.isAuthed = function() {
  return true;
}

