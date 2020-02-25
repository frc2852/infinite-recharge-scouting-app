import $ from 'jquery';
import { saveSettings } from './functions/index-db';

$(document).ready(function() {
  let settings = {
    color: undefined,
    station: undefined,
    scout: undefined,
  };

  $('.alliance-color').click(function() {
    const $chosen = $(this);
    const $allianceID = $chosen.attr('alliance-id');
    $('.alliance-color').removeClass('color-toggled');
    $chosen.addClass('color-toggled');
    settings.color = $allianceID;
  });

  $('.alliance-station').click(function() {
    const $chosen = $(this);
    const $stationID = $chosen.attr('station-id');
    $('.alliance-station').removeClass('station-toggled');
    $chosen.addClass('station-toggled');
    settings.station = $stationID;
  });

  $('.save-settings').click(async function() {
    var name = $('#scouter').val();
    settings.scout = name;
    await saveSettings(settings);
    window.location = './field-app.html';
  });
});
