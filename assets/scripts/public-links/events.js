'use strict'

const uploadsApi = require('../uploads/api')
const ui = require('./ui')

const onViewPublicFile = function (id) {
  uploadsApi.viewFile(id)
    .then(ui.onViewPublicFileSuccess)
    .then((response) => {
      const splitUrl = response.upload._url.split('.')
      const ext = splitUrl[splitUrl.length - 1]
      if (ext === 'jpg' || ext === 'png' || ext === 'gif' || ext === 'gifv' || ext === 'jpeg') {
        $('.lightgallery').lightGallery()
        $('#previewFileBtn').show()
        $('#previewFileBtn').on('click', () => {
          $('#photo')[0].click()
        })
      }
      $('#to-main-site').on('click', loadMainSite)
    })
    .catch(ui.onViewPublicFileFailure)
}

const loadMainSite = function (event) {
  event.preventDefault()
  ui.loadMainSite()
}

module.exports = {
  onViewPublicFile
}
