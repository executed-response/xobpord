'use strict'

const publicFileViewHandlebar = require('../templates/publicFileView.handlebars')
const tagHandlebar = require('../templates/tag.handlebars')
const config = require('../config')

const onViewPublicFileSuccess = function (response) {
  $('#publicView').empty()
  $('#publicView').append(publicFileViewHandlebar(response))
  if (response.upload.tags) {
    const tags = { tags: response.upload.tags.split(',') }
    $('#tag_container').append(tagHandlebar(tags))
  }
  $('#sharing-link').val(config.clientOrigin + '?id=' + response.upload._id)
  return response
}

const onViewPublicFileFailure = function () {
  $('#publicView').empty()
  $('#publicView').html('<h3 class="text-center">File does not exist or is private</h3>')
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
