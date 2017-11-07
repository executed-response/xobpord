'use strict'

const uploadsApi = require('../uploads/api')
const ui = require('./ui')

const onViewPublicFile = function (id) {
  uploadsApi.viewFile(id)
    .then(ui.onViewPublicFileSuccess)
    .then(() => {
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
