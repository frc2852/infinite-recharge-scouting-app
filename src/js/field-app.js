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
      robot.team = fieldAppState.currentMatch[settings.color][settings.station].teamKey;
      robot.color = settings.color;
      const robotImages = fieldAppState.currentMatch[settings.color][settings.station].imageUrls;
      if (robotImages != undefined) {
        robot.image = robotImages[0];
      } else {
        robot.image = null;
      }
    }
    updateDisplay();
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

  function parsecolor(color) {
    if (color == 'redTeam') {
      return 'Red';
    } else if (color == 'blueTeam') {
      return 'Blue';
    } else {
      return 'Corrupt Data';
    }
  }
  //interprets alliance ids and changes them to more user-friendly text

  function parseStation(station) {
    return parseInt(station, 10) + 1;
  }
  //changes the station number to be 1-based

  function writeMods() {
    robot.wheel.rotation = robot.clicks.rotationSuccessStatusRaw % 2;
    robot.wheel.position = robot.clicks.positionSuccessStatusRaw % 2;
    robot.status.yellow = robot.clicks.yellowRaw % 2;
    robot.status.red = robot.clicks.redRaw % 2;
    robot.status.estop = robot.clicks.estopRaw % 2;
    robot.endgame.climbed = robot.clicks.climbedRaw % 2;
    robot.endgame.failed = robot.clicks.failedRaw % 2;
    robot.endgame.balanced = robot.clicks.balancedRaw % 2;
    robot.endgame.parked = robot.clicks.parkedRaw % 2;
  }

  $('.start-button').click(function() {
    robot.matchStartTime = Date.now();
    $('#information').addClass('hidden');
    $('#offense').removeClass('hidden');
    fieldAppState.robot = robot;
    saveFieldAppState(fieldAppState);
    writeMods();
  });
  //triggers match to begin, moves to offense tab

  $('.toggle').click(function() {
    const $toggled = $(this);
    $toggled.toggleClass('toggle-active');
    fieldAppState.robot = robot;
    saveFieldAppState(fieldAppState);
    writeMods();
  });
  //general toggle logic (on/off without reliance on other buttons)

  $('.emoji-toggle').click(function() {
    const $emojiToggled = $(this);
    if ($($emojiToggled).hasClass('emoji-toggle-active')) {
      $($emojiToggled).removeClass('emoji-toggle-active');
    } else {
      $('.emoji-toggle').removeClass('emoji-toggle-active');
      $emojiToggled.addClass('emoji-toggle-active');
    }
    fieldAppState.robot = robot;
    saveFieldAppState(fieldAppState);
    writeMods();
  });
  //emoji toggle logic, only allows one to be active.

  $('.endgame-toggle').click(function() {
    const $endgameToggled = $(this);
    $endgameToggled.toggleClass('endgame-toggle-active');
    writeMods();
  });
  // endgame toggle logic, only allows one to be active.

  $('.submenu').click(function() {
    const $tab = $(this);

    $('.tab-container').removeClass('tab-active');
    $tab.addClass('tab-active');

    const tabId = $tab.data('tab-id');

    $('.tab-container').addClass('hidden');
    $('#' + tabId).removeClass('hidden');
    writeMods();
  });
  //tab select logic, shows and hides respective tab containers
  //the preceeding three functions will still work without a ball, leaving the value at zero

  $('.btn-reset').click(async function() {
    if (confirm('CLICKING OK WILL ERASE YOUR DATA! ARE YOU SURE?')) {
      fieldAppState.robot = undefined;
      await saveFieldAppState(fieldAppState);
      await resetRobot();
      setupRobot();
      updateDisplay();
    }
  });
  //reset button logic, sets all values to 0

  async function goToMatch(collectionPath, matchID) {
    fieldAppState.currentMatch = await getDocument(collectionPath, matchID);
    fieldAppState.robot = undefined;
    await saveFieldAppState(fieldAppState);
    await resetRobot();
    setupRobot();
    fieldAppState.robot = robot;
    await saveFieldAppState(fieldAppState);
    updateDisplay();
  }

  $('.btn-save').click(async function() {
    alert(robot.scout + "'s scouting data was saved.");
    writeMods();
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
    }
    if (robot.balls == 0) {
      $('#ball-count-box').removeClass('alert');
    }
    if (robot.balls == 1) {
      $('#ball-count-box').removeClass('alert');
    }
    if (robot.balls == 2) {
      $('#ball-count-box').removeClass('alert');
    }
    if (robot.balls == 3) {
      $('#ball-count-box').removeClass('alert');
    }
    if (robot.balls == 4) {
      $('#ball-count-box').removeClass('alert');
    }
    if (robot.balls == 5) {
      $('#ball-count-box').removeClass('alert');
    }
    if (robot.balls == 6) {
      $('#ball-count-box').addClass('alert');
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
    robot.balls = countEvents(robot.events, 'pickup');
    robot.points.high = countEvents(robot.events, 'high');
    robot.points.low = countEvents(robot.events, 'low');
    robot.points.miss = countEvents(robot.events, 'miss');
    robot.defense.fouls = countEvents(robot.events, 'foul');
    robot.defense.tech = countEvents(robot.events, 'tech');

    if (robot.balls < 0) {
      robot.balls = 0;
    }

    $('#ball-count-display').text(robot.balls);
    $('#high-ball-display').text(robot.points.high);
    $('#low-ball-display').text(robot.points.low);
    $('#miss-display').text(robot.points.miss);
    $('#match-number-display').text('Match Number: ' + robot.matchNumber);
    $('#team-number-display').text('Team Number: ' + parseTeam(robot.team));
    $('#team-color-display').text('Alliance: ' + parsecolor(robot.color));
    $('#driver-station-display').text('Driver Station: ' + parseStation(settings.station));
    $('#main-team-number-display').text('Scouting: ' + parseTeam(robot.team));
    $('#robot-image').attr('src', robot.image);
    $('#fouls-display').text('Fouls: ' + robot.defense.fouls + '  ');
    $('#tech-fouls-display').text('Techs: ' + robot.defense.tech);

    $('#info-panel').addClass(robot.color);

    writeMods();

    checkForInvalidNumbers();
  }
  //updates robot values for the count of each event
  //refreshes all values to the HUD
  //checks for inadmissible values

  $('.button-event').click(function() {
    const $btnEvent = $(this);
    if (($btnEvent == 'high' || $btnEvent == 'low' || $btnEvent == 'miss') && robot.balls == 0) {
      robot.events.push({
        timestamp: Date.now(),
        eventType: $btnEvent.data('event-type'),
        eventMode: 'empty',
      });
    }
    robot.events.push({
      timestamp: Date.now(),
      eventType: $btnEvent.data('event-type'),
    });
    updateDisplay();
    fieldAppState.robot = robot;
    saveFieldAppState(fieldAppState);
    writeMods();
  });
  //upon logging a button event (such as a pickup or score), adds the event to the robot's array of events

  function countEvents(array, type) {
    let count = 0;
    if (type == 'pickup') {
      for (var i = 0; i < array.length; i++) {
        if (array[i].eventType == 'pickup') {
          count++;
        }
        if (array[i].eventType == 'auto-pickup') {
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

      if (count < 0) {
        robot.events.push({
          timestamp: Date.now(),
          eventType: 'auto-pickup',
        });
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

    if (type == 'foul') {
      for (var i = 0; i < array.length; ++i) {
        if (array[i].eventType == 'foul') {
          count++;
        }
        if (array[i].eventType == 'remove-foul') {
          count--;
        }
      }
      return count;
    }
    if (type == 'tech') {
      for (var i = 0; i < array.length; ++i) {
        if (array[i].eventType == 'tech') {
          count++;
        }
        if (array[i].eventType == 'remove-tech') {
          count--;
        }
      }
      return count;
    }
  }

  $('.undo').click(function() {
    if (robot.events.length > 0) {
      let lastEventIndex = undefined;
      robot.events.forEach(function(event, index) {
        if (isEventValid(event)) {
          lastEventIndex = index;
          fieldAppState.robot = robot;
          saveFieldAppState(fieldAppState);
        }
      });

      if (lastEventIndex != undefined) {
        robot.events.splice(lastEventIndex, 1);
        updateDisplay();
        fieldAppState.robot = robot;
        saveFieldAppState(fieldAppState);

        if (robot.events[robot.events.length - 1].eventType === 'auto-pickup') {
          updateDisplay();
          robot.events.splice(lastEventIndex, 1);
          fieldAppState.robot = robot;
          saveFieldAppState(fieldAppState);
        }
      }
    }
    updateDisplay();
    fieldAppState.robot = robot;
    writeMods();
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

  $('#rotation').click(function() {
    $('#rotation').toggleClass('wheel-toggle-active');
    robot.clicks.rotationSuccessStatusRaw++;
    writeMods();
    fieldAppState.robot = robot;
    saveFieldAppState(fieldAppState);
  });
  //toggles rotation success

  $('#position').click(function() {
    $('#position').toggleClass('wheel-toggle-active');
    robot.clicks.positionSuccessStatusRaw++;
    writeMods();
    fieldAppState.robot = robot;
    saveFieldAppState(fieldAppState);
  });
  //toggles position success

  $('#fire').click(function() {
    robot.defense.rating = 2;
    writeMods();
    fieldAppState.robot = robot;
    saveFieldAppState(fieldAppState);
  });

  $('#ok').click(function() {
    robot.defense.rating = 1;
    writeMods();
    fieldAppState.robot = robot;
    saveFieldAppState(fieldAppState);
  });

  $('#bad').click(function() {
    robot.defense.rating = 0;
    writeMods();
    fieldAppState.robot = robot;
    saveFieldAppState(fieldAppState);
  });
  //sets defense values corresponding to the emoji chosen

  $('#yellow').click(function() {
    robot.clicks.yellowRaw++;
    writeMods();
    fieldAppState.robot = robot;
    saveFieldAppState(fieldAppState);
  });

  $('#red').click(function() {
    robot.clicks.redRaw++;
    writeMods();
    fieldAppState.robot = robot;
    saveFieldAppState(fieldAppState);
  });

  $('#issue').click(function() {
    robot.clicks.estopRaw++;
    writeMods();
    fieldAppState.robot = robot;
    saveFieldAppState(fieldAppState);
  });
  //toggle status values

  $('#climbed').click(function() {
    robot.clicks.climbedRaw++;
    writeMods();
    fieldAppState.robot = robot;
    saveFieldAppState(fieldAppState);
  });

  $('#failed').click(function() {
    robot.clicks.failedRaw++;
    writeMods();
    fieldAppState.robot = robot;
    saveFieldAppState(fieldAppState);
  });

  $('#balanced').click(function() {
    robot.clicks.balancedRaw++;
    writeMods();
    fieldAppState.robot = robot;
    saveFieldAppState(fieldAppState);
  });

  $('#parked').click(function() {
    robot.clicks.parkedRaw++;
    writeMods();
    fieldAppState.robot = robot;
    saveFieldAppState(fieldAppState);
  });
  //toggle engdame values

  async function resetRobot() {
    $('.tab-container').addClass('hidden');
    $('#information').removeClass('hidden');

    settings = await getSettings();

    match = undefined;
    fieldAppState = await getFieldAppState();

    if (fieldAppState == undefined) {
      const matchKeys = await getTotalLocalCollections();
      fieldAppState = {
        currentMatch: await getDocumentLocally(matchKeys[0]),
      };
    }

    if (settings.collectionPath != undefined) {
      let collectionPath = await getDocumentLocally(settings.collectionPath);
      fieldAppState.match = collectionPath;
      fieldAppState.currentMatch = collectionPath;
      settings.collectionPath = undefined;
    }

    robot = {
      matchStartTime: 0,
      team: '###Corrupt Team Number',
      color: 'Corrupt Alliance',
      balls: 0,
      matchNumber: fieldAppState.currentMatch.matchNumber,
      clicks: {
        rotationSuccessStatusRaw: 0,
        positionSuccessStatusRaw: 0,
        yellowRaw: 0,
        redRaw: 0,
        estopRaw: 0,
        climbedRaw: 0,
        failedRaw: 0,
        balancedRaw: 0,
        parkedRaw: 0,
      },
      points: {
        high: 0,
        low: 0,
        miss: 0,
      },
      wheel: {
        rotation: 0,
        position: 0,
      },
      defense: {
        rating: 0,
        fouls: 0,
        tech: 0,
      },
      status: {
        yellow: 0,
        red: 0,
        estop: 0,
      },
      endgame: {
        climbed: 0,
        failed: 0,
        balanced: 0,
        parked: 0,
      },
      scout: settings.scout,
      events: [],
      image: null,
      comments: null,
    };

    document.getElementById('comments').setAttribute('value', '');
    if (fieldAppState != undefined) {
      if (fieldAppState.robot != undefined) {
        robot = fieldAppState.robot;
      }
      match = fieldAppState.match;
    }

    $('.endgame-toggle').removeClass('endgame-toggle-active');
    $('.climb-toggle').removeClass('climb-toggle-active');
    $('.emoji-toggle').removeClass('emoji-toggle-active');
    $('toggle').removeClass('toggle-active');

    updateDisplay();
  }
});
