'use strict'

const publicFileViewHandlebar = require('../templates/publicFileView.handlebars')
const tagHandlebar = require('../templates/tag.handlebars')

const onViewPublicFileSuccess = function (response) {
  $('#publicView').empty()
  $('#publicView').append(publicFileViewHandlebar(response))
  if (response.upload.tags) {
    const tags = { tags: response.upload.tags.split(',') }
    $('#tag_container').append(tagHandlebar(tags))
  }
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
