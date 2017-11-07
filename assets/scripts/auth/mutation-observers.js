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

const registerObservers = function () {
  clearFormOnHide('#sign-in-div', '#sign-in')
  clearFormOnHide('#sign-up-div', '#sign-up')
  clearFormOnHide('#view-file-div', '#view-file')
}

module.exports = {
  registerObservers
}
