'use strict'

const clearForm = function (id) {
  $(id)[0].reset()
}

const showHomePage = function () {
  $('#fileView').hide()
  $('#home-page').show()
}

const greenNotification = function (text, time = 1000, isDismissable = false) {
  $.notify({
    message: text
  }, {
    type: 'success',
    placement: {
      from: 'top',
      align: 'center'
    },
    animate: {
      enter: 'animated fadeInDown',
      exit: 'animated fadeOutUp'
    },
    allow_dismiss: isDismissable,
    z_index: 1100,
    delay: time,
    timer: 500,
    template: '<div data-notify="container" class="col-11 col-sm-3 alert alert-{0}" role="alert">' +
  '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
  '<span data-notify="message">{2}</span>' +
  '</div>'
  })
}

const redNotification = function (text, time = 1000, isDismissable = false) {
  $.notify({
    message: text
  }, {
    type: 'danger',
    placement: {
      from: 'top',
      align: 'center'
    },
    animate: {
      enter: 'animated fadeInDown',
      exit: 'animated fadeOutUp'
    },
    allow_dismiss: isDismissable,
    z_index: 1100,
    delay: time,
    timer: 500,
    template: '<div data-notify="container" class="col-11 col-sm-3 alert alert-{0}" role="alert">' +
  '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
  '<span data-notify="message">{2}</span>' +
  '</div>'
  })
}

module.exports = {
  clearForm,
  showHomePage,
  greenNotification,
  redNotification
}
