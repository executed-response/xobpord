'use strict'

const config = require('../config.js')
const store = require('../store.js')

const signIn = function (data) {
  return $.ajax({
    url: config.apiOrigin + 'sign-in',
    method: 'POST',
    data
  })
}

const signUp = function (data) {
  return $.ajax({
    url: config.apiOrigin + 'sign-up',
    method: 'POST',
    data
  })
}

const changePassword = function (data) {
  return $.ajax({
    url: config.apiOrigin + 'change-password/' + store.user.id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

const signOut = function () {
  return $.ajax({
    url: config.apiOrigin + 'sign-out/' + store.user.id,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

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
  signIn,
  signUp,
  changePassword,
  signOut,
  uploadFile,
  viewFiles,
  deleteFile,
  viewFile,
  updateFile
}
