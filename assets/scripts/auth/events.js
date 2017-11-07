'use strict'

const getFormFields = require(`../../../lib/get-form-fields`)

const api = require('./api')
const ui = require('./ui')
const uploadsEvents = require('../uploads/events')

const onSignIn = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  api.signIn(data)
    .then(ui.signInSuccess)
    .then(uploadsEvents.onViewFiles)
    .catch(ui.signInFailure)
}

const onSignUpCancel = function (event) {
  event.preventDefault()
  ui.signUpCancel()
}

const onSignUp = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  api.signUp(data)
    .then(ui.signUpSuccess)
    .catch(ui.signUpFailure)
}

const onChangePassword = function (event) {
  const data = getFormFields(this)
  event.preventDefault()
  api.changePassword(data)
    .then(ui.changePasswordSuccess)
    .catch(ui.changePasswordFailure)
}

const onSignOut = function (event) {
  api.signOut()
    .then(ui.signOutSuccess)
    .catch(ui.signOutFailure)
}

const addHandlers = function () {
  $('#sign-in').on('submit', onSignIn)
  $('#new-user').on('click', ui.newUser)
  $('#new-user-cancel').on('click', onSignUpCancel)
  $('#sign-up').on('submit', onSignUp)
  $('#changePasswordModal').on('hidden.bs.modal', (event) => $('#change-password').get(0).reset())
  $('#change-password-form').on('click', function () {
    $('#changePasswordModal').modal('show')
  })
  $('#change-password').on('submit', onChangePassword)
  $('#sign-out').on('click', onSignOut)
}

module.exports = {
  addHandlers
}
