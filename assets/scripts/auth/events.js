'use strict'

const getFormFields = require(`../../../lib/get-form-fields`)

const api = require('./api')
const ui = require('./ui')

const onSignIn = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  api.signIn(data)
    .then(ui.signInSuccess)
    .catch(ui.signInFailure)
}

const onNewUser = function () {
  ui.newUser()
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

const onChangePasswordForm = function () {
  ui.changePasswordForm()
}

const onChangePasswordCancel = function (event) {
  event.preventDefault()
  ui.changePasswordCancel()
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
  $('#new-user').on('click', onNewUser)
  $('#new-user-cancel').on('click', onSignUpCancel)
  $('#sign-up').on('submit', onSignUp)
  $('#change-password-form').on('click', onChangePasswordForm)
  $('#change-password-cancel').on('click', onChangePasswordCancel)
  $('#change-password').on('submit', onChangePassword)
  $('#sign-out').on('click', onSignOut)
}

module.exports = {
  addHandlers
}
