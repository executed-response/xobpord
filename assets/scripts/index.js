'use strict'

const setAPIOrigin = require('../../lib/set-api-origin')
const config = require('./config')
const authEvents = require('./auth/events')
const uploadsEvents = require('./uploads/events')
const mutationObservers = require('./shared/mutation-observers')
const publicLinkLookup = require('./public-links/publicLinkLookup.js')

$(() => {
  setAPIOrigin(location, config)
})

$(() => {
  authEvents.addHandlers()
  uploadsEvents.addHandlers()
  mutationObservers.registerObservers()
  if (publicLinkLookup.isFileToLoad()) {
    publicLinkLookup.loadFile()
  } else {
    $('#sign-in-div').show()
  }
})
