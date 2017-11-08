'use strict'

const store = require('../store.js')
const greenNotification = require('../shared/ui').greenNotification
const redNotification = require('../shared/ui').redNotification

const signInSuccess = function (data) {
  $('#sign-in-div').hide()
  $('.active-after-signin').show()
  store.user = data.user
  greenNotification('Signed in successfully')
}

const signInFailure = function () {
  redNotification('Failed to sign in')
}

const newUser = function () {
  $('#sign-in-div').hide()
  $('#sign-up-div').show()
}

const signUpCancel = function () {
  $('#sign-up-div').hide()
  $('#sign-in-div').show()
}

const signUpSuccess = function (data) {
  $('#sign-up-div').hide()
  $('#sign-in-div').show()
  greenNotification('Signed up successfully')
}

const signUpFailure = function () {
  redNotification('Failed to sign up')
}

const changePasswordSuccess = function () {
  $('#changePasswordModal').modal('hide')
  greenNotification('Password changed successfully')
}

const changePasswordFailure = function () {
  redNotification('Failed to change password')
}

const signOutSuccess = function () {
  store.user = null
  $('.active-after-signin').hide()
  $('#change-password-div').hide()
  $('#home-page').hide()
  $('#fileView').hide()
  $('#sign-in-div').show()
  greenNotification('Signed out successfully')
}

const signOutFailure = function () {
  signOutFailure()
}

module.exports = {
  signInSuccess,
  signInFailure,
  newUser,
  signUpCancel,
  signUpSuccess,
  signUpFailure,
  changePasswordSuccess,
  changePasswordFailure,
  signOutSuccess,
  signOutFailure
}
