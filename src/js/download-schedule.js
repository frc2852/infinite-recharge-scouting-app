import $ from 'jquery'; // uses $ as a variable for jquery (this file is js by default)
import { getDocument, getAllDocumentsInCollection } from './functions/firebase-app';
import validResponse from './functions/valid-response';
import { getDocumentLocally } from './functions/index-db';

$(document).ready(function() {
  $('#btn-download').click(async function() {
    const eventKey = $('#event-key').val();
    const matches = await getAllDocumentsInCollection('/events/' + eventKey + '/matches');

    matches.forEach(match => {
      const teams = match.blueTeam.concat(match.redTeam);
      teams.forEach(team => {
        if (team.imageUrls != undefined) {
          team.imageUrls.forEach(async imageUrl => {
            await fetch(imageUrl);
          });
        }
      });
    });
  });
});
