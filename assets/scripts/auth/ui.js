'use strict'

const store = require('../store.js')

const clearForm = function (id) {
  $(id)[0].reset()
}

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
  greenNotification('Signed up successfully')
}

const signUpFailure = function () {
  redNotification('Failed to sign up')
}

const changePasswordSuccess = function () {
  $('#change-password-div').hide()
  greenNotification('Password changed successfully')
}

const changePasswordFailure = function () {
  redNotification('Failed to change password')
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
  greenNotification('Signed out successfully')
}

const signOutFailure = function () {
  signOutFailure()
}

const greenNotification = function (text, time = 1000, isDismissable = false) {
  $.notify({
    message: text
  }, {
    type: 'success',
    placement: {
      from: 'top',
      align: 'center'
    },
    animate: {
      enter: 'animated fadeInDown',
      exit: 'animated fadeOutUp'
    },
    allow_dismiss: isDismissable,
    z_index: 1100,
    delay: time,
    timer: 500,
    template: '<div data-notify="container" class="col-11 col-sm-3 alert alert-{0}" role="alert">' +
  '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
  '<span data-notify="message">{2}</span>' +
  '</div>'
  })
}

const redNotification = function (text, time = 1000, isDismissable = false) {
  $.notify({
    message: text
  }, {
    type: 'danger',
    placement: {
      from: 'top',
      align: 'center'
    },
    animate: {
      enter: 'animated fadeInDown',
      exit: 'animated fadeOutUp'
    },
    allow_dismiss: isDismissable,
    z_index: 1100,
    delay: time,
    timer: 500,
    template: '<div data-notify="container" class="col-11 col-sm-3 alert alert-{0}" role="alert">' +
  '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
  '<span data-notify="message">{2}</span>' +
  '</div>'
  })
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