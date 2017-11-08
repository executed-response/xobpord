'use strict'

const setOrigin = require('../../lib/set-api-origin')
const config = require('./config')
const authEvents = require('./auth/events')
const uploadsEvents = require('./uploads/events')
const mutationObservers = require('./shared/mutation-observers')
const publicLinkLookup = require('./public-links/publicLinkLookup.js')

$(() => {
  setOrigin.setAPIOrigin(location, config)
  setOrigin.setClientOrigin(location, config)
})

$(() => {
  authEvents.addHandlers()
  uploadsEvents.addHandlers()
  mutationObservers.registerObservers()
})

$(() => {
  setTimeout(() => { // This is because it would randomly start running this before the refresh finished
    if (publicLinkLookup.isFileToLoad()) {
      publicLinkLookup.loadFile()
    } else {
      $('#sign-in-div').show()
    }
  }, 100)
})
