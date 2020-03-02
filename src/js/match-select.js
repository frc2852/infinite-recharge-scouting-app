import $ from 'jquery'; // uses $ as a variable for jquery (this file is js by default)
import { getSettings, saveSettings, getFieldAppState, saveFieldAppState } from './functions/index-db.js';
import { getDocument } from './functions/firebase-app.js';

$(document).ready(function() {
  $('#btn-select').click(async function() {
    $('#btn-select').addClass('bg-red-400');
    $('#btn-select').text('Please wait...');
    const matchID = $('#match-id').val();
    const eventKey = $('#event-key').val();
    const matchCollection = '/events/' + eventKey + '/matches/';
    let fieldAppState = await getFieldAppState();
    fieldAppState.currentMatch = await getDocument(matchCollection, eventKey + '_' + matchID);
    await saveFieldAppState(fieldAppState);
    window.location.assign('field-app.html');
  });
});
