import $ from 'jquery'; //uses $ as a variable for jquery (this file is js by default)
import { getSettings, getFirstCollectionKey, getTotalLocalCollections, getDocumentLocally, saveSettings, saveFieldAppState, getFieldAppState } from './functions/index-db';
import { saveDocument, getDocument } from './functions/firebase-app';

$(document).ready(async function() {
  let robot = undefined;
  let match = undefined;
  let fieldAppState = undefined;
  let settings = undefined;
  await resetRobot();

  function setupRobot() {
    if (fieldAppState != undefined) {
      robot.team = fieldAppState.currentMatch[settings.colour][settings.station].teamKey;
      robot.colour = settings.colour;
      const robotImages = fieldAppState.currentMatch[settings.colour][settings.station].imageUrls;
      if (robotImages != undefined) {
        robot.image = robotImages[0];
      } else {
        robot.image = null;
      }
    }
  }

  setupRobot();
  //sets data inside of the robot object to data from settings and TBA

  fieldAppState.robot = robot;
  saveFieldAppState(fieldAppState);

  $('#ball-count-display').text(robot.balls);
  $('#high-ball-display').text(robot.points.high);
  $('#low-ball-display').text(robot.points.low);
  $('#miss-display').text(robot.points.miss);
  //set the HUD displays to reference the robot object.

  function parseTeam(team) {
    return team.substring(3);
  }

  function parseColour(colour) {
    if (colour == 'redTeam') {
      return 'Red';
    } else if (colour == 'blueTeam') {
      return 'Blue';
    } else {
      return 'Corrupt Data';
    }
  }
  //interprets alliance ids and changes them to more user-friendly text

  function parseStation(station) {
    return (station + 1).substring(1);
  }
  //changes the station number to be 1-based

  $('#main-team-number-display').text('Scouting: ' + parseTeam(robot.team));
  $('#team-number-display').text('Team Number: ' + parseTeam(robot.team));
  $('#team-colour-display').text('Alliance: ' + parseColour(robot.colour));
  $('#driver-station-display').text('Driver Station: ' + parseStation(settings.station));
  $('#robot-image').attr('src', robot.image);
  //sets up team data to be displayed in the info page

  // if (robot.colour == "redTeam"){
  //   do something
  // }
  // if alliance is red alliance change all features to red?

  $('.start-button').click(function() {
    robot.matchStartTime = Date.now();
    $('#information').addClass('hidden');
    $('#offense').removeClass('hidden');
    fieldAppState.robot = robot;
    saveFieldAppState(fieldAppState);
  });
  //triggers match to begin, moves to offense tab

  $('.toggle').click(function() {
    const $toggled = $(this);
    $toggled.toggleClass('toggle-active');
    fieldAppState.robot = robot;
    saveFieldAppState(fieldAppState);
  });
  //general toggle logic (on/off without reliance on other buttons)

  $('.emoji-toggle').click(function() {
    const $emojiToggled = $(this);
    $('.emoji-toggle').removeClass('emoji-toggle-active');
    $emojiToggled.addClass('emoji-toggle-active');
    fieldAppState.robot = robot;
    saveFieldAppState(fieldAppState);
  });
  //emoji toggle logic, only allows one to be active.

  $('.endgame-toggle').click(function() {
    const $endgameToggled = $(this);
    $('.endgame-toggle').removeClass('endgame-toggle-active');
    $endgameToggled.addClass('endgame-toggle-active');
  });
  // endgame toggle logic, only allows one to be active.

  $('.submenu').click(function() {
    const $tab = $(this);

    $('.tab-container').removeClass('tab-active');
    $tab.addClass('tab-active');

    const tabId = $tab.data('tab-id');

    $('.tab-container').addClass('hidden');
    $('#' + tabId).removeClass('hidden');
  });
  //tab select logic, shows and hides respective tab containers

  //$('.scoring-button').click(function() {});
  //all scoring buttons force the HUD to refresh

  //the preceeding three functions will still work without a ball, leaving the value at zero

  $('.btn-reset').click(function() {
    resetRobot();
    updateDisplay();
    alert('Data cleared. Refresh the page to restore data.');
  });
  //reset button logic, sets all values to 0

  export async function goToMatch(collectionPath, matchID) {
    console.log('collection path is', collectionPath);
    fieldAppState.currentMatch = await getDocument(collectionPath, matchID);
    resetRobot();
    saveFieldAppState(fieldAppState);
  }

  $('.btn-save').click(async function() {
    alert(robot.scout + "'s scouting data was saved.");
    robot.comments = $('#comments').val();
    if (robot.comments === undefined) {
      robot.comments = '';
    }
    robot.formComplete = Date.now();
    const collectionPath = '/events/' + fieldAppState.currentMatch.event + '/robots/' + robot.team + '/matches/';
    await saveDocument(collectionPath, fieldAppState.currentMatch.id, robot);
    goToMatch(fieldAppState.currentMatch.collectionPath, fieldAppState.currentMatch.nextMatch);
  });
  //saves the data and uploads it to firestore or saves it locally

  function checkForInvalidNumbers() {
    if (robot.balls < 0) {
      $('#ball-count-box').addClass('alert');
      $('.btn-undo').addClass('pre-alert');
    }
    if (robot.balls == 0) {
      $('#ball-count-box').removeClass('alert');
      $('#ball-count-box').removeClass('pre-alert');
      $('.btn-undo').removeClass('alert');
      $('.btn-undo').removeClass('pre-alert');
    }
    if (robot.balls == 1) {
      $('#ball-count-box').removeClass('alert');
      $('#ball-count-box').removeClass('pre-alert');
      $('.btn-undo').removeClass('alert');
      $('.btn-undo').removeClass('pre-alert');
    }
    if (robot.balls == 2) {
      $('#ball-count-box').removeClass('alert');
      $('#ball-count-box').removeClass('pre-alert');
      $('.btn-undo').removeClass('alert');
      $('.btn-undo').removeClass('pre-alert');
    }
    if (robot.balls == 3) {
      $('#ball-count-box').removeClass('alert');
      $('#ball-count-box').removeClass('pre-alert');
      $('.btn-undo').removeClass('alert');
      $('.btn-undo').removeClass('pre-alert');
    }
    if (robot.balls == 4) {
      $('#ball-count-box').removeClass('alert');
      $('#ball-count-box').removeClass('pre-alert');
      $('.btn-undo').removeClass('alert');
      $('.btn-undo').removeClass('pre-alert');
    }
    if (robot.balls == 5) {
      $('#ball-count-box').removeClass('alert');
      $('#ball-count-box').removeClass('pre-alert');
      $('.btn-undo').removeClass('alert');
      $('.btn-undo').removeClass('pre-alert');
    }
    if (robot.balls == 6) {
      $('#ball-count-box').removeClass('alert');
      $('#ball-count-box').addClass('pre-alert');
      $('.btn-undo').removeClass('alert');
      $('.btn-undo').addClass('pre-alert');
    }
    if (robot.balls > 6) {
      $('#ball-count-box').addClass('alert');
      $('.btn-undo').addClass('alert');
    }
    if (robot.points.high < 0) {
      $('#high-ball-box').addClass('alert');
    }
    if (robot.points.high > -1) {
      $('#high-ball-box').removeClass('alert');
    }
    if (robot.points.low < 0) {
      $('#low-ball-box').addClass('alert');
    }
    if (robot.points.low > -1) {
      $('#low-ball-box').removeClass('alert');
    }
    if (robot.points.miss < 0) {
      $('#miss-box').addClass('alert');
    }
    if (robot.points.miss > -1) {
      $('#miss-box').removeClass('alert');
    }
  }
  //checks if numbers are invalid for each value, and assigns/removes warning classes based on results

  function updateDisplay() {
    robot.balls = 0;
    robot.points.high = 0;
    robot.points.low = 0;
    robot.points.miss = 0;

    robot.balls = countEvents(robot.events, 'pickup');
    robot.points.high = countEvents(robot.events, 'high');
    robot.points.low = countEvents(robot.events, 'low');
    robot.points.miss = countEvents(robot.events, 'miss');

    if (robot.balls < 0) {
      robot.balls = 0;
    }

    $('#ball-count-display').text(robot.balls);
    $('#high-ball-display').text(robot.points.high);
    $('#low-ball-display').text(robot.points.low);
    $('#miss-display').text(robot.points.miss);
    $('#team-number-display').text(robot.team);
    $('#team-colour-display').text(parseColour(robot.colour));
    $('#driver-station-display').text(parseStation(settings.station));
    $('#match-number-display').text('Match Number: ' + robot.matchNumber);

    checkForInvalidNumbers();
  }
  //updates robot values for the count of each event
  //refreshes all values to the HUD
  //checks for inadmissible values
  //

  $('.button-event').click(function() {
    const $btnEvent = $(this);
    robot.events.push({
      timestamp: Date.now(),
      eventType: $btnEvent.data('event-type'),
    });
    updateDisplay();
    fieldAppState.robot = robot;
    saveFieldAppState(fieldAppState);
  });
  //upon logging a button event (such as a pickup or score), adds the event to the robot's array of events

  function countEvents(array, type) {
    let count = 0;
    if (type == 'pickup') {
      for (var i = 0; i < array.length; i++) {
        if (array[i].eventType == 'pickup') {
          count++;
        }
        if (array[i].eventType == 'high') {
          count--;
        }
        if (array[i].eventType == 'low') {
          count--;
        }
        if (array[i].eventType == 'miss') {
          count--;
        }
      }
      return count;
    }

    if (type == 'high') {
      for (var i = 0; i < array.length; ++i) {
        if (array[i].eventType == 'high') {
          count++;
        }
      }
      return count;
    }

    if (type == 'low') {
      for (var i = 0; i < array.length; ++i) {
        if (array[i].eventType == 'low') {
          count++;
        }
      }
      return count;
    }

    if (type == 'miss') {
      for (var i = 0; i < array.length; ++i) {
        if (array[i].eventType == 'miss') {
          count++;
        }
      }
      return count;
    }
  }

  /* Undo Logic */

  $('.undo').click(function() {
    if (robot.events.length > 0) {
      const $btnEvent = $(this);

      let lastEventIndex = undefined;
      robot.events.forEach(function(event, index) {
        if (isEventValid(event)) {
          lastEventIndex = index;
          fieldAppState.robot = robot;
          saveFieldAppState(fieldAppState);
        }
      });

      if (lastEventIndex != undefined) {
        const event = robot.events[lastEventIndex];
        robot.events.splice(lastEventIndex, 1);
        fieldAppState.robot = robot;
        saveFieldAppState(fieldAppState);
      }
    }
    updateDisplay();
    fieldAppState.robot = robot;
    saveFieldAppState(fieldAppState);
  });
  //undo button function, checks if the button event is one that allows undo (such as a pickup or score)
  //if valid, removes that event from the robot's array

  function isEventValid(currentEvent) {
    if (currentEvent.eventType == 'pickup' || currentEvent.eventType == 'high' || currentEvent.eventType == 'low' || currentEvent.eventType == 'miss') {
      return true;
    }
    return false;
  }
  //tests if the previous event was undoable, checking its id against the four undoable actions
  //these actions are pickup, high score, low score, miss

  $('#rotation-successful').click(function() {
    rotationSuccessStatusRaw++;
    robotStatus(robot);
  });
  //toggles rotation success

  $('#position-successful').click(function() {
    positionSuccessStatusRaw++;
    robotStatus(robot);
    fieldAppState.robot = robot;
    saveFieldAppState(fieldAppState);
  });
  //toggles position success

  $('#fire').click(function() {
    robot.defense.rating = 2;
    fieldAppState.robot = robot;
    saveFieldAppState(fieldAppState);
  });

  $('#ok').click(function() {
    robot.defense.rating = 1;
    fieldAppState.robot = robot;
    saveFieldAppState(fieldAppState);
  });

  $('#bad').click(function() {
    robot.defense.rating = 0;
    fieldAppState.robot = robot;
    saveFieldAppState(fieldAppState);
  });
  //sets defense values corresponding to the emoji chosen

  $('#balanced').click(function() {
    robot.climb = 3;
  });

  $('#climbed').click(function() {
    robot.climb = 2;
  });

  $('#failed').click(function() {
    robot.climb = 1;
  });
  // set climb values corresponding to the chosen button (0 = no data)

  $('#disconnect').click(function() {
    disconnectStatusRaw++;
    fieldAppState.robot = robot;
    saveFieldAppState(fieldAppState);
  });

  $('#failure').click(function() {
    failureStatusRaw++;
    fieldAppState.robot = robot;
    saveFieldAppState(fieldAppState);
  });

  $('#yellow').click(function() {
    yellowRaw++;
    fieldAppState.robot = robot;
    saveFieldAppState(fieldAppState);
  });

  $('#red').click(function() {
    redRaw++;
    fieldAppState.robot = robot;
    saveFieldAppState(fieldAppState);
  });

  $('#estop').click(function() {
    estopRaw++;
    fieldAppState.robot = robot;
    saveFieldAppState(fieldAppState);
  });
  //toggle endgame status values

  async function resetRobot() {
    $('.tab-container').addClass('hidden');
    $('#information').removeClass('hidden');
    let rotationSuccessStatusRaw = 0;
    let positionSuccessStatusRaw = 0;

    let disconnectStatusRaw = 0;
    let failureStatusRaw = 0;
    let yellowRaw = 0;
    let redRaw = 0;
    let estopRaw = 0;

    settings = await getSettings();

    match = undefined;
    fieldAppState = await getFieldAppState();

    if (fieldAppState == undefined) {
      const matchKeys = await getTotalLocalCollections();
      fieldAppState = {
        currentMatch: await getDocumentLocally(matchKeys[0]),
      };
    }

    if (fieldAppState != undefined) {
      if (fieldAppState.robot != undefined) {
        robot = fieldAppState.robot;
      }
      match = fieldAppState.match;
    }

    robot = {
      matchStartTime: 0,
      team: 'No Team Number',
      colour: 'No Alliance',
      balls: 0,
      matchNumber: fieldAppState.currentMatch.matchNumber,
      points: {
        high: 0,
        low: 0,
        miss: 0,
      },
      wheel: {
        rotation: rotationSuccessStatusRaw % 2,
        position: positionSuccessStatusRaw % 2,
      },
      defense: {
        rating: null,
      },
      status: {
        disconnect: disconnectStatusRaw % 2,
        failure: failureStatusRaw % 2,
        yellow: yellowRaw % 2,
        red: redRaw % 2,
        estop: estopRaw % 2,
      },
      climb: 0,
      comments: null,
      scout: settings.scout,
      events: [],
      image: null,
    };

    $('.endgame-toggle').removeClass('endgame-toggle-active');
    $('.emoji-toggle').removeClass('emoji-toggle-active');
    $('toggle').removeClass('toggle-active');

    updateDisplay();
  }
});

//make a function that does both
//fieldAppState.robot = robot;
//saveFieldAppState(fieldAppState);
//to save space
