import $ from 'jquery';

$(document).ready(function() {
  if (window.innerHeight > window.innerWidth) {
    $('.turnDeviceNotification').css('display', 'none');
  }
  $('.turnDeviceNotification').css('display', 'block');
});
