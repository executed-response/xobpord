'use strict'

const ui = require('./ui')

const clearFormOnHide = function (id, formId) {
  // select the target node
  const target = $(id).get(0)

  // create an observer instance
  const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (mutation.target.style.display === 'none') ui.clearForm(formId)
    })
  })

  // configuration of the observer:
  const config = { attributes: true, childList: true, characterData: true, attributeFilter: ['style'] }

  // pass in the target node, as well as the observer options
  observer.observe(target, config)

  // later, you can stop observing
  // observer.disconnect()
}

const clearHomeOnHide = function (id) {
  const target = $(id).get(0)

  const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (mutation.target.style.display === 'none') {
        $('#file-lookup-id').val('')
        $('#uploadFileTextDisplay').val('Select files to upload')
        $('#fileSelectorInput').val('')
      }
    })
  })

  const config = { attributes: true, childList: true, characterData: true, attributeFilter: ['style'] }

  observer.observe(target, config)
}

const registerObservers = function () {
  clearFormOnHide('#sign-in-div', '#sign-in')
  clearFormOnHide('#sign-up-div', '#sign-up')
  clearHomeOnHide('#home-page')
}

module.exports = {
  registerObservers
}
