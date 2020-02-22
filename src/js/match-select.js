import $ from 'jquery'; // uses $ as a variable for jquery (this file is js by default)
import { goToMatch } from './field-app.js';
import { app } from 'firebase';
import { getSettings, saveSettings, getFieldAppState, saveFieldAppState } from './functions/index-db.js';

$(document).ready(function() {
  $('#btn-select').click(async function() {
    $('#btn-select').addClass('bg-red-400');
    $('#btn-select').text('Please wait...');
    const matchID = $('#match-id').val();
    const eventKey = $('#event-key').val();
    let settings = await getSettings();
    settings.collectionPath = '/events/' + eventKey + '/matches/' + eventKey + '_' + matchID;
    await saveSettings(settings);
    let fieldAppState = await getFieldAppState();
    (fieldAppState = undefined), await saveFieldAppState(fieldAppState);
    window.location.assign('field-app.html');
  });
});
