'use strict'

const filesize = require('filesize')
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
  files.uploads.forEach(file => {
    console.log(file)
    file._filesize = filesize(file._filesize)
  })
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
  if (response.upload._owner !== store.user.id) {
    $('#filename').prop('readonly', true)
    $('#description').prop('readonly', true)
    $('#tags_tag').prop('readonly', true)
    $('#view-delete-button').hide()
    $('#view-save-button').hide()
  } else {
    $('#filename').prop('readonly', false)
    $('#description').prop('readonly', false)
    $('#tags_tag').prop('readonly', false)
    $('#view-delete-button').show()
    $('#view-save-button').show()
  }
  $('#file-id').text(response.upload._id)
  $('#filename').val(response.upload.filename)
  $('#description').val(response.upload.description)
  if (response.upload.tags) {
    $('#tags').importTags(response.upload.tags)
  }
  $('#view-download-button').attr('href', response.upload._url)
}

const updateFileSuccess = function () {
  store.uploadId = null
  $('#view-file-div').hide()
  $('#home-page').show()
  greenNotification('File updated')
}

const updateFileFailure = function () {
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
