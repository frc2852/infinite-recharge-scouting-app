import $ from 'jquery'; // uses $ as a variable for jquery (this file is js by default)
import { goToMatch } from './field-app.js';
import { app } from 'firebase';

$(document).ready(function() {
  $('#btn-select').click(function() {
    $('#btn-select').addClass('bg-red-400');
    const matchID = $('#match-id').val();
    const eventKey = $('event-key').val();
    console.log(matchID, eventKey);
  });
});
