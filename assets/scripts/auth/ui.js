'use strict'

const store = require('../store.js')

const signInSuccess = function (data) {
  $('#sign-in-div').addClass('d-none')
  store.user = data.user
}

const signInFailure = function (error) {
  console.log('error on sign-in')
  console.error(error)
}

const signUpSuccess = function (data) {
  console.log('signUpSuccess data is ', data)
  $('#sign-up-div').addClass('d-none')
  $('#sign-in-div').removeClass('d-none')
}

const signUpFailure = function () {
  console.log('error on sign-up')
}

module.exports = {
  signInSuccess,
  signInFailure,
  signUpSuccess,
  signUpFailure
}
