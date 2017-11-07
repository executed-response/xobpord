'use strict'

const config = require('../config.js')
const store = require('../store.js')

const uploadFile = function (data) {
  return $.ajax({
    url: config.apiOrigin + 'uploads',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data,
    contentType: false,
    processData: false
  })
}

const viewFiles = function () {
  return $.ajax({
    url: config.apiOrigin + 'uploads',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const deleteFile = function () {
  return $.ajax({
    url: config.apiOrigin + 'uploads/' + store.uploadId,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const viewFile = function (id) {
  return $.ajax({
    url: config.apiOrigin + 'uploads/' + id,
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const updateFile = function (data) {
  return $.ajax({
    url: config.apiOrigin + 'uploads/' + store.uploadId,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

module.exports = {
  uploadFile,
  viewFiles,
  deleteFile,
  viewFile,
  updateFile
}
