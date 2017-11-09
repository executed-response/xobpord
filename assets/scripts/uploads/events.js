'use strict'

const getFormFields = require(`../../../lib/get-form-fields`)
const Clipboard = require('clipboard/dist/clipboard.min.js')

const api = require('./api')
const ui = require('./ui')
const store = require('../store')
const sharedUi = require('../shared/ui')

const onUploadFile = function (event) {
  event.preventDefault()
  const data = new FormData(event.target)
  if ($('#fileSelectorInput').val() === '') {
    return
  }
  $('#home-upload-button').prop('disabled', true)
  api.uploadFile(data)
    .then(ui.uploadFileSuccess)
    .then(onViewFiles)
    .catch(ui.uploadFileFailure)
}

const onViewFiles = function () {
  return api.viewFiles()
    .then(ui.viewFilesSuccess)
    .then((response) => {
      $('.home-edit-button').on('click', (event) => {
        event.preventDefault()
        onViewFile($(event.target).attr('data-id'))
      })
      $('.home-delete-button').on('click', onDeleteFile)
      $('.home-preview-button').on('click', (event) => {
        $('.lightgallery').lightGallery()
        const photoId = '[data-photo-id=' + '"' + $(event.target).attr('data-id') + '"' + ']'
        $(photoId).click()
      })
    })
    .catch(ui.viewFilesFailure)
}

const onDeleteFile = function (event) {
  const uploadId = event.target.getAttribute('data-id')
  store.uploadId = uploadId
  ui.showDeleteModal()
}

const onDeleteFileConfirm = function () {
  api.deleteFile(store.uploadId)
    .then(ui.deleteFileSuccess)
    .then(onViewFiles)
    .catch(ui.deleteFileFailure)
}

const onViewFile = function (id) {
  api.viewFile(id)
    .then(ui.viewFileSuccess)
    .then(() => {
      $('#view-delete-button').on('click', onViewDelete)
      $('#view-back-button').on('click', sharedUi.showHomePage)
      $('#view-file').on('submit', onUpdateFile)
    })
    .catch(ui.viewFileFailure)
}

const onViewDelete = function () {
  event.stopPropagation()
  ui.showDeleteModal()
}

const onUpdateFile = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.updateFile(data)
    .then(ui.updateFileSuccess)
    .then(onViewFiles)
    .catch(ui.updateFileFailure)
}

const onFileLookup = function (event) {
  event.preventDefault()
  onViewFile($('#file-lookup-id').val())
  $('#file-lookup-id').val('')
}

const copyLink = function (event) {
  const clip = new Clipboard('#sharing-link-button')
  clip.on('success', function () {
    sharedUi.greenNotification('Link copied to clipboard')
  })
}

const selectFilesToUpload = function (event) {
  event.preventDefault()
  $('#fileSelectorInput').click()
}

const filesSelectedToUpload = function (event) {
  const input = $(this)
  const numFiles = input.get(0).files ? input.get(0).files.length : 1
  const label = input.val().replace(/\\/g, '/').replace(/.*\//, '')
  input.trigger('fileselect', [numFiles, label])
}

const changeFilesSelected = function (event, numFiles, label) {
  const input = $(this).parents('.input-group').find(':text')
  const log = numFiles > 1 ? numFiles + ' files selected' : label
  if (input.length) {
    input.val(log)
  } else {
    input.val('')
  }
}

const addHandlers = function () {
  $('#upload-form').on('submit', onUploadFile)
  $('#deleteUploadConfirm').on('click', onDeleteFileConfirm)
  $('#file-lookup').on('click', onFileLookup)
  $('#browseFileButton').on('click', selectFilesToUpload)
  $('#fileSelectorInput').on('change', filesSelectedToUpload)
  $('#fileSelectorInput').on('fileselect', changeFilesSelected)
  copyLink()
}

module.exports = {
  addHandlers,
  onViewFiles
}
