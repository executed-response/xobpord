'use strict'

const store = require('../store')
const events = require('./events')

const getParameterByName = function (name) {
  name = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\]')
  const regex = new RegExp('[\\?&]' + name + '=([^&#]*)')
  const results = regex.exec(location.search)
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '))
}

const loadFile = function () {
  store.user = {
    id: '0'
  }
  events.onViewPublicFile(store.publicFileId)
}

const isFileToLoad = function () {
  if (store.publicFileId !== null && store.publicFileId !== undefined && store.publicFileId !== '') {
    return true
  } else {
    return false
  }
}

const parseWebParameters = function () {
  const id = getParameterByName('id')
  store.publicFileId = id
}

module.exports = {
  parseWebParameters,
  isFileToLoad,
  loadFile
}
