'use strict'

const filesize = require('filesize')
const moment = require('moment')
const config = require('../config.js')
const store = require('../store.js')
const uploadsTableHandlebar = require('../templates/uploadsTable.handlebars')
const greenNotification = require('../shared/ui').greenNotification
const redNotification = require('../shared/ui').redNotification
const editFileHandlebars = require('../templates/editFile.handlebars')
const readOnlyFileHandlebars = require('../templates/readOnlyView.handlebars')

const uploadFileSuccess = function () {
  $('#file').val('')
  greenNotification('Uploaded file successfully')
}

const uploadFileFailure = function () {
  redNotification('File failed to upload')
}

const viewFilesSuccess = function (files) {
  files.uploads.forEach(file => {
    file._filesize = filesize(file._filesize)
    file.updatedAt = moment(file.updatedAt).format('lll')
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
  $('#fileView').hide()
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
  $('#fileView').empty()
  if (response.upload._owner === store.user.id) {
    $('#fileView').append(editFileHandlebars(response))
    $('#tags').tagsInput()
    if (response.upload.tags) {
      $('#tags').importTags(response.upload.tags)
    }
  } else {
    $('#fileView').append(readOnlyFileHandlebars(response))
  }
  $('#fileView').show()
  $('#sharing-link').val(config.clientOrigin + '?id=' + response.upload._id)
}

const updateFileSuccess = function () {
  store.uploadId = null
  $('#fileView').hide()
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
