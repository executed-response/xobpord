'use strict'

const publicFileViewHandlebar = require('../templates/publicFileView.handlebars')
const tagHandlebar = require('../templates/tag.handlebars')
const fileNotFoundHandlebar = require('../templates/fileNotFound.handlebars')
const config = require('../config')

const onViewPublicFileSuccess = function (response) {
  $('#publicView').empty()
  $('#publicView').append(publicFileViewHandlebar(response))
  response.upload.displayType = 'display: none;'
  const splitUrl = response.upload._url.split('.')
  const ext = splitUrl[splitUrl.length - 1]
  if (ext === 'jpg' || ext === 'png') {
    response.upload.displayType = 'display: inline-block;'
  }
  if (response.upload.tags) {
    const tags = { tags: response.upload.tags.split(',') }
    $('#tag_container').append(tagHandlebar(tags))
  }
  $('#sharing-link').val(config.clientOrigin + '?id=' + response.upload._id)
  return response
}

const onViewPublicFileFailure = function () {
  $('#publicView').empty()
  $('#publicView').append(fileNotFoundHandlebar())
}

const loadMainSite = function () {
  $('#publicView').hide()
  $('#sign-in-div').show()
}

module.exports = {
  onViewPublicFileSuccess,
  onViewPublicFileFailure,
  loadMainSite
}
