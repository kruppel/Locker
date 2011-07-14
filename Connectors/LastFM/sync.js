/*
*
* Copyright (C) 2011, The Locker Project
* All rights reserved.
*
* Please see the LICENSE file for more information.
*
*/

var fs = require('fs'),
    request = require('request'),
    dataStore = require('../../Common/node/connector/dataStore'),
    EventEmitter = require('events').EventEmitter;

var auth;

exports.eventEmitter = new EventEmitter();

exports.init = function(theAuth, mongo) {
  auth = theAuth;
}

exports.syncScrobbles = function(callback) {
  console.log('we\'re trying to do something here.');
}

