import $ from 'jquery';

$(document).ready(function() {
  $('.alliance-colour').click(function() {
    const $chosen = $(this);
    $('.alliance-colour').removeClass('colour-toggled');
    $chosen.addClass('colour-toggled');
  });

  $('.alliance-station').click(function() {
    const $chosen = $(this);
    $('.alliance-station').removeClass('station-toggled');
    $chosen.addClass('station-toggled');
  });
});
