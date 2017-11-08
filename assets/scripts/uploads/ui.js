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
const tagHandlebar = require('../templates/tag.handlebars')

const uploadFileSuccess = function () {
  $('#uploadFileTextDisplay').val('Select files to upload')
  $('#fileSelectorInput').val('')
  greenNotification('Uploaded file successfully')
}

const uploadFileFailure = function () {
  redNotification('File failed to upload')
}

const viewFilesSuccess = function (files) {
  files.uploads.forEach(file => {
    file._filesize = filesize(file._filesize)
    file.updatedAt = moment(file.updatedAt).format('lll')
    file.displayType = 'display: none;'
    const splitUrl = file._url.split('.')
    const ext = splitUrl[splitUrl.length - 1]
    if (ext === 'jpg' || ext === 'png') {
      file.displayType = 'display: inline-block;'
    }
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
  response.upload.displayType = 'display: none;'
  const splitUrl = response.upload._url.split('.')
  const ext = splitUrl[splitUrl.length - 1]
  if (ext === 'jpg' || ext === 'png') {
    response.upload.displayType = 'display: inline-block;'
  }
  if (response.upload._owner === store.user.id) {
    $('#fileView').append(editFileHandlebars(response))
    $('.my-tags').tagsInput()
    if (response.upload.tags) {
      $('.my-tags').importTags(response.upload.tags)
    }
  } else {
    $('#fileView').append(readOnlyFileHandlebars(response))
    if (response.upload.tags) {
      const tags = { tags: response.upload.tags.split(',') }
      $('#tag_container').append(tagHandlebar(tags))
    }
  }
  $('.lightgallery').lightGallery()
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
