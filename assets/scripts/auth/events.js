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

const onUploadFile = function (event) {
  event.preventDefault()
  const data = new FormData(event.target)
  api.uploadFile(data)
    .then(ui.uploadFileSuccess)
    .catch(ui.uploadFileFailure)
}

const addHandlers = function () {
  $('#sign-in').on('submit', onSignIn)
  $('#new-user').on('click', ui.newUser)
  $('#new-user-cancel').on('click', onSignUpCancel)
  $('#sign-up').on('submit', onSignUp)
  $('#change-password-form').on('click', ui.changePasswordForm)
  $('#change-password-cancel').on('click', onChangePasswordCancel)
  $('#change-password').on('submit', onChangePassword)
  $('#sign-out').on('click', onSignOut)
  $('#show-upload-form').on('click', ui.showUploadForm)
  $('#upload-form-cancel').on('click', ui.hideUploadForm)
  $('#upload-form').on('submit', onUploadFile)
}

module.exports = {
  addHandlers
}
