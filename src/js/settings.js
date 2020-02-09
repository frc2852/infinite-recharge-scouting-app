import $ from 'jquery';

$(document).ready(function() {
  const settings = {
    alliance: 0,
    station: 0,
    scout: 0,
  };

  $('.alliance-colour').click(function() {
    const $chosen = $(this);
    const $allianceID = $chosen.attr('alliance-id');
    $('.alliance-colour').removeClass('colour-toggled');
    $chosen.addClass('colour-toggled');
    settings.alliance = $allianceID;
  });

  $('.alliance-station').click(function() {
    const $chosen = $(this);
    const $stationID = $chosen.attr('station-id');
    $('.alliance-station').removeClass('station-toggled');
    $chosen.addClass('station-toggled');
    settings.station = $stationID;
  });

  $('.save-settings').click(function() {
    var name = $('#scouter').val();
    settings.scout = name;
    alert(JSON.stringify(settings));
  });
});
