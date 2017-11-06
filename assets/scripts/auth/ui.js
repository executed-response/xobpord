'use strict'

const store = require('../store.js')
const uploadsTableHandlebar = require('../templates/uploadsTable.handlebars')

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
  $('#change-password-div').hide()
  $('#home-page').show()
  greenNotification('Password changed successfully')
}

const changePasswordFailure = function () {
  redNotification('Failed to change password')
}

const changePasswordForm = function () {
  $('#home-page').hide()
  $('#upload-form-div').hide()
  $('#change-password-div').show()
}

const changePasswordCancel = function () {
  $('#change-password-div').hide()
  $('#home-page').show()
}

const signOutSuccess = function () {
  store.user = null
  $('.active-after-signin').hide()
  $('#change-password-div').hide()
  $('#home-page').hide()
  $('#view-file-div').hide()
  $('#sign-in-div').show()
  greenNotification('Signed out successfully')
}

const signOutFailure = function () {
  signOutFailure()
}

const uploadFileSuccess = function () {
  greenNotification('Uploaded file successfully')
}

const uploadFileFailure = function () {
  redNotification('File failed to upload')
}

const viewFilesSuccess = function (files) {
  $('#upload-table-container').empty()
  $('#upload-table-container').append(uploadsTableHandlebar(files))
}

const viewFilesFailure = function () {
  redNotification('Failed to get users files')
}

const deleteFileSuccess = function () {
  store.uploadId = null
  $('#confirmDeleteModal').modal('hide')
  $('#view-file-div').hide()
  $('#home-page').show()
  greenNotification('File deleted')
}

const deleteFileFailure = function () {
  store.uploadId = null // delete this line of code since if a user retries and the server is up again it won't work?
  $('#confirmDeleteModal').modal('hide')
  redNotification('Failed to delete file')
}

const viewFileSuccess = function (response) {
  store.uploadId = response.upload._id
  greenNotification('File viewed')
  $('#home-page').hide()
  $('#view-file-div').show()
  $('#filename').val(response.upload.filename)
  $('#description').val(response.upload.description)
  $('#tags').val(response.upload.tags)
}

const updateFileSuccess = function () {
  store.uploadId = null
  $('#view-file-div').hide()
  $('#home-page').show()
  greenNotification('File updated')
}

const updateFileFailure = function () {
  store.uploadId = null // delete this line of code since if a user retries and the server is up again it won't work?
  redNotification('Failed to update file')
}

const viewFileFailure = function () {
  redNotification('Failed to view file')
}

const showDeleteModal = function () {
  $('#confirmDeleteModal').modal('show')
}

const showHomePage = function () {
  $('#view-file-div').hide()
  $('#home-page').show()
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
  signOutFailure,
  uploadFileSuccess,
  uploadFileFailure,
  viewFilesSuccess,
  viewFilesFailure,
  deleteFileSuccess,
  deleteFileFailure,
  clearForm,
  viewFileSuccess,
  viewFileFailure,
  showDeleteModal,
  showHomePage,
  updateFileSuccess,
  updateFileFailure
}
