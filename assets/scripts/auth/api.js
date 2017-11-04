'use strict'

const config = require('../config.js')

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

module.exports = {
  signIn,
  signUp
}
