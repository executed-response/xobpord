'use strict'

const store = require('../store.js')

const clearForm = function (id) {
  $(id)[0].reset()
}

const signInSuccess = function (data) {
  $('#sign-in-div').hide()
  $('.active-after-signin').show()
  store.user = data.user
}

const signInFailure = function (error) {
  console.log('error on sign-in')
  console.error(error)
}

const newUser = function () {
  $('#sign-in-div').hide()
  clearForm('#sign-up')
  $('#sign-up-div').show()
}

const signUpCancel = function () {
  $('#sign-up-div').hide()
  clearForm('#sign-in')
  $('#sign-in-div').show()
}

const signUpSuccess = function (data) {
  $('#sign-up-div').hide()
  clearForm('#sign-in')
  $('#sign-in-div').show()
}

const signUpFailure = function () {
  console.log('error on sign-up')
}

const changePasswordSuccess = function () {
  $('#change-password-div').hide()
}

const changePasswordFailure = function () {
  console.log('change password failure')
}

const changePasswordForm = function () {
  clearForm('#change-password')
  $('#change-password-div').show()
}

const changePasswordCancel = function () {
  $('#change-password-div').hide()
}

const signOutSuccess = function () {
  store.user = null
  $('.active-after-signin').hide()
  $('#change-password-div').hide()
  clearForm('#sign-in')
  $('#sign-in-div').show()
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
  changePasswordForm,
  changePasswordCancel,
  signOutSuccess,
  signOutFailure
}
