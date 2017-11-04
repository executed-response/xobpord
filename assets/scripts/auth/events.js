'use strict'

const getFormFields = require(`../../../lib/get-form-fields`)

const api = require('./api')
const ui = require('./ui')

const onSignIn = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  console.log(data)
  api.signIn(data)
    .then(ui.signInSuccess)
    .catch(ui.signInFailure)
}

const onNewUser = function () {
  console.log('clicked new user')
  $('#sign-in-div').addClass('d-none')
  $('#sign-up-div').removeClass('d-none')
}

const onSignUp = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  api.signUp(data)
    .then(ui.signUpSuccess)
    .catch(ui.signUpFailure)
}

const addHandlers = function () {
  $('#sign-in').on('submit', onSignIn)
  $('#new-user').on('click', onNewUser)
  $('#sign-up').on('submit', onSignUp)
}

module.exports = {
  addHandlers
}
