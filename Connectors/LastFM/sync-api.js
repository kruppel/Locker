/*
*
* Copyright (C) 2011, The Locker Project
* All rights reserved.
*
* Please see the LICENSE file for more information.
*
*/

var fs = require('fs'),
    locker = require('../../Common/node/locker.js');

var app, auth;

module.exports = function(theapp) {
  app = theapp;
  app.get('/', index);
  this.authComplete = authComplete;
  return this;
}

function authComplete(theauth, mongo) {
  auth = theauth;
  sync.init(auth, mongo);

  app.get('/scrobbles', scrobbles);

  sync.eventEmitter.on('scrobble/lastfm', function(eventObj) {
    locker.event('scrobble/lastfm', eventObj);
  });
}

function index(req, res) {
  if(!(auth && auth.accessToken))
    res.redirect(app.externalBase + 'go');
  else {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end("<html>found a token, load <a href='scrobbles'>scrobbles</a></html>");
  }
}

// this is the basic structure of an endpoint for something you'd be parsing.
function scrobbles(req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  sync.syncScrobbles(function(err, repeatAfter, diaryEntry) {
    locker.diary(diaryEntry);
    locker.at('/scrobbles', repeatAfter);
    res.end(JSON.stringify({success: "done fetching items"}));
  });
}
