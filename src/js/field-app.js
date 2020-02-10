import $ from 'jquery'; // uses $ as a variable for jquery (this file is js by default)

$(document).ready(function() {
  // forces jquery to wait until the site is ready

  let rotationSuccessStatusRaw = 0;
  let positionSuccessStatusRaw = 0;

  let disconnectStatusRaw = 0;
  let failureStatusRaw = 0;
  let yellowRaw = 0;
  let redRaw = 0;
  let estopRaw = 0;
  // creates raw variables
  // a raw variable is one that another variable filters to get a refined amount
  // for example, modulus of 2 to find if it is even or odd and return that value

  const robot = {
    matchStartTime: 0,
    hasAuto: 0,
    balls: 0,
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
      rating: undefined,
    },
    status: {
      disconnect: disconnectStatusRaw % 2,
      failure: failureStatusRaw % 2,
      yellow: yellowRaw % 2,
      red: redRaw % 2,
      estop: estopRaw % 2,
    },
    climb: 0,
    events: [],
  };
  // robot object, contains all of a robot's numbers and events

  $('#ball-count-display').text(robot.balls);
  $('#high-ball-display').text(robot.points.high);
  $('#low-ball-display').text(robot.points.low);
  $('#miss-display').text(robot.points.miss);
  // set the HUD displays to reference the robot object.

  $('.start-button').click(function() {
    robot.matchStartTime = Date.now();
    $('#information').addClass('hidden');
    $('#offense').removeClass('hidden');
  });
  // triggers match to begin, moves to offense tab

  $('.toggle').click(function() {
    const $toggled = $(this);
    $toggled.toggleClass('toggle-active');
  });
  // general toggle logic (on/off without reliance on other buttons)

  $('.emoji-toggle').click(function() {
    const $emojiToggled = $(this);
    $('.emoji-toggle').removeClass('emoji-toggle-active');
    $emojiToggled.addClass('emoji-toggle-active');
  });
  // emoji toggle logic, only allows one to be active.

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
  // tab select logic, shows and hides respective tab containers

  $('.scoring-button').click(function() {});
  // all scoring buttons force the HUD to refresh

  // the preceeding three functions will still work without a ball, leaving the value at zero

  // $('.btn-reset').click(function() {
  //   while (robot.events.length > 0) {
  //     robot.events.pop();
  //   }
  // });
  // reset button logic, sets all values to 0

  $('.btn-reset').click(function() {
    alert('Data saved. Press OK to view raw data.');
    alert(JSON.stringify(robot));
  });
  // TEMPORARY reset button code that instead displays a fake alert stating the data was saved

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
  // checks if numbers are invalid for each value, and assigns/removes warning classes based on results

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

    checkForInvalidNumbers();
  }
  // checks for inadmissible values
  // updates robot values for the count of each event
  // finally, refreshes all values to the HUD

  $('.button-event').click(function() {
    const $btnEvent = $(this);
    robot.events.push({
      timestamp: Date.now(),
      eventType: $btnEvent.data('event-type'),
    });
    console.log(robot);
    updateDisplay();
  });
  // upon logging a button event (such as a pickup or score), adds the event to the robot's array of events

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
      console.log(count);
      return count;
    }

    if (type == 'high') {
      for (var i = 0; i < array.length; ++i) {
        if (array[i].eventType == 'high') {
          count++;
        }
      }
      console.log(count);
      return count;
    }

    if (type == 'low') {
      for (var i = 0; i < array.length; ++i) {
        if (array[i].eventType == 'low') {
          count++;
        }
      }
      console.log(count);
      return count;
    }

    if (type == 'miss') {
      for (var i = 0; i < array.length; ++i) {
        if (array[i].eventType == 'miss') {
          count++;
        }
      }
      console.log(count);
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
        }
      });

      if (lastEventIndex != undefined) {
        const event = robot.events[lastEventIndex];
        robot.events.splice(lastEventIndex, 1);
      }
    }
    updateDisplay();
    console.log(robot);
  });
  // undo button function, checks if the button event is one that allows undo (such as a pickup or score)
  // if valid, removes that event from the robot's array

  function isEventValid(currentEvent) {
    if (currentEvent.eventType == 'pickup' || currentEvent.eventType == 'high' || currentEvent.eventType == 'low' || currentEvent.eventType == 'miss') {
      return true;
    }
    return false;
  }
  // tests if the previous event was undoable, checking its id against the four undoable actions
  // these actions are pickup, high score, low score, miss

  $('#rotation-successful').click(function() {
    rotationSuccessStatusRaw++;
    robotStatus(robot);
  });
  // toggles rotation success

  $('#position-successful').click(function() {
    positionSuccessStatusRaw++;
    robotStatus(robot);
  });
  // toggles position success

  $('#fire').click(function() {
    robot.defense.rating = 2;
  });

  $('#ok').click(function() {
    robot.defense.rating = 1;
  });

  $('#bad').click(function() {
    robot.defense.rating = 0;
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
  });

  $('#failure').click(function() {
    failureStatusRaw++;
  });

  $('#yellow').click(function() {
    yellowRaw++;
  });

  $('#red').click(function() {
    redRaw++;
  });

  $('#estop').click(function() {
    estopRaw++;
  });
  // toggle endgame status values
});
