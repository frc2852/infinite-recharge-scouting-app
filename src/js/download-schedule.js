import $ from 'jquery'; // uses $ as a variable for jquery (this file is js by default)
import { getAllDocumentsInCollection } from './functions/firebase-app';

$(document).ready(function() {
  $('#btn-download').click(async function() {
    $('#btn-download').addClass('bg-red-400');
    $('#btn-download').text('Please wait...');
    const eventKey = $('#event-key').val();
    const matches = await getAllDocumentsInCollection('/events/' + eventKey + '/matches');

    matches.forEach(match => {
      const teams = match.blueTeam.concat(match.redTeam);
      teams.forEach(async team => {
        if (team.imageUrls != undefined) {
          const robotImages = team.imageUrls.map(imageUrl => {
            return fetch(imageUrl).catch(e => {
              console.error(e);
              return null;
            });
          });

          await Promise.all(robotImages);
          window.location = 'settings.html';
        }
      });
    });
  });
});
