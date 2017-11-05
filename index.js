'use strict'

// user require with a reference to bundle the file and use it in this file
// var example = require('./example');

// load manifests

window.Popper = require('popper.js')
require('bootstrap')
require('bootstrap-notify')

// scripts
require('./assets/scripts/index.js')

// styles
require('./assets/styles/index.scss')
