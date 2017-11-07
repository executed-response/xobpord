'use strict'

const store = require('../store.js')
const uploadsTableHandlebar = require('../templates/uploadsTable.handlebars')
const greenNotification = require('../shared/ui').greenNotification
const redNotification = require('../shared/ui').redNotification

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
  $('#view-download-button').attr('href', response.upload._url)
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

module.exports = {
  uploadFileSuccess,
  uploadFileFailure,
  viewFilesSuccess,
  viewFilesFailure,
  deleteFileSuccess,
  deleteFileFailure,
  viewFileSuccess,
  viewFileFailure,
  showDeleteModal,
  updateFileSuccess,
  updateFileFailure
}
