'use strict'

const getFormFields = require(`../../../lib/get-form-fields`)

const api = require('./api')
const ui = require('./ui')
const store = require('../store')
const sharedUi = require('../shared/ui')

const onUploadFile = function (event) {
  event.preventDefault()
  const data = new FormData(event.target)
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

const addHandlers = function () {
  $('#upload-form').on('submit', onUploadFile)
  $('#deleteUploadConfirm').on('click', onDeleteFileConfirm)
  $('#view-delete-button').on('click', onViewDelete)
  $('#view-back-button').on('click', sharedUi.showHomePage)
  $('#view-file').on('submit', onUpdateFile)
  $('#tags').tagsInput()
  $('#file-lookup').on('click', onFileLookup)
}

module.exports = {
  addHandlers,
  onViewFiles
}
