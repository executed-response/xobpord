'use strict'

const store = require('../store.js')

const clearForm = function (id) {
  $(id)[0].reset()
}

const signInSuccess = function (data) {
  $('#sign-in-div').addClass('d-none')
  store.user = data.user
}

const signInFailure = function (error) {
  console.log('error on sign-in')
  console.error(error)
}

const newUser = function () {
  $('#sign-in-div').addClass('d-none')
  $('#sign-up-div').removeClass('d-none')
}

const signUpCancel = function () {
  $('#sign-up-div').addClass('d-none')
  $('#sign-in-div').removeClass('d-none')
  clearForm('#sign-up')
}

const signUpSuccess = function (data) {
  $('#sign-up-div').addClass('d-none')
  $('#sign-in-div').removeClass('d-none')
}

const signUpFailure = function () {
  console.log('error on sign-up')
}

const changePasswordSuccess = function () {
  $('#change-password-div').addClass('d-none')
  $('#nav-user-dropdown-change-password').removeClass('disabled')
}

const changePasswordFailure = function () {
  console.log('change password failure')
}

const changePasswordForm = function () {
  $('#change-password-div').removeClass('d-none')
}

const changePasswordCancel = function () {
  $('#nav-user-dropdown-change-password').removeClass('disabled')
  $('#change-password-div').addClass('d-none')
}

const signOutSuccess = function () {
  store.user = null
  $('#nav-user-dropdown-change-password').removeClass('d-none')
  $('#nav-user-dropdown').addClass('d-none')
  $('#change-password-div').addClass('d-none')
  $('#sign-in-div').removeClass('d-none')
}

const signOutFailure = function () {
  console.log('sign out failure')
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
