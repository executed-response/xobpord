'use strict'

const setAPIOrigin = require('../../lib/set-api-origin')
const config = require('./config')
const authEvents = require('./auth/events')
const uploadsEvents = require('./uploads/events')
const mutationObservers = require('./shared/mutation-observers')

$(() => {
  setAPIOrigin(location, config)
})

$(() => {
  authEvents.addHandlers()
  uploadsEvents.addHandlers()
  mutationObservers.registerObservers()
})
