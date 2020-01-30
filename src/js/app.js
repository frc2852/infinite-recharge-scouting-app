import '../main.css';
import $ from 'jquery'; // uses $ as a variable for jquery (this file is js by default)

$(document).ready(function() {
  // forces jquery to wait until the site is ready

  let rotationSuccessStatusRaw = 0;
  let positionSuccessStatusRaw = 0;
  // creates raw variables for pizza wheel

  const robot = {
    matchStartTime: 0,
    hasAuto: 0,
    balls: {
      current: 0,
    },
    points: {
      high: 0,
      low: 0,
      miss: 0,
    },
    wheel: {
      rotation: rotationSuccessStatusRaw % 2,
      position: positionSuccessStatusRaw % 2,
    },
    events: [],
  };
  // robot object, will hold all of a robot's numbers and events

  $('#ball-count-display').text(robot.balls.current);
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

  $('.submenu').click(function() {
    const $tab = $(this);

    $('.tab-container').removeClass('tab-active');
    $tab.addClass('tab-active');

    const tabId = $tab.data('tab-id');

    $('.tab-container').addClass('hidden');
    $('#' + tabId).removeClass('hidden');
  });
  // tab select logic, shows and hides respective tab containers

  $('.btn-pickup').click(function() {
    robot.balls.current++;
    updateDisplay();
  });
  // pickup button then update (all proceeding buttons update display)

  $('.btn-high-goal').click(function() {
    robot.points.high++;
    if (robot.balls.current > 0) {
      robot.balls.current--;
    }
    updateDisplay();
  });
  // high goal button, uses picked up ball

  $('.btn-low-goal').click(function() {
    robot.points.low++;
    if (robot.balls.current > 0) {
      robot.balls.current--;
    }
    updateDisplay();
  });
  // low goal button, uses picked up ball

  $('.btn-miss').click(function() {
    robot.points.miss++;
    if (robot.balls.current > 0) {
      robot.balls.current--;
    }
    updateDisplay();
  });
  // missed ball button, uses picked up ball

  // the preceeding three functions will still work without a ball, leaving the value at zero

  $('.btn-reset').click(function() {
    robot.points.high = 0;
    robot.points.low = 0;
    robot.points.miss = 0;
    robot.balls.current = 0;
    updateDisplay();
  });
  // reset button logic, sets all values to 0

  function checkIfInvalidNumbers() {
    if (robot.balls.current < 0) {
      $('#ball-count-box').addClass('alert');
    }
    if (robot.balls.current == 0) {
      $('#ball-count-box').removeClass('alert');
      $('#ball-count-box').removeClass('pre-alert');
    }
    if (robot.balls.current == 1) {
      $('#ball-count-box').removeClass('alert');
      $('#ball-count-box').removeClass('pre-alert');
    }
    if (robot.balls.current == 2) {
      $('#ball-count-box').removeClass('alert');
      $('#ball-count-box').removeClass('pre-alert');
    }
    if (robot.balls.current == 3) {
      $('#ball-count-box').removeClass('alert');
      $('#ball-count-box').removeClass('pre-alert');
    }
    if (robot.balls.current == 4) {
      $('#ball-count-box').removeClass('alert');
      $('#ball-count-box').removeClass('pre-alert');
    }
    if (robot.balls.current == 5) {
      $('#ball-count-box').removeClass('alert');
      $('#ball-count-box').removeClass('pre-alert');
    }
    if (robot.balls.current == 6) {
      $('#ball-count-box').removeClass('alert');
      $('#ball-count-box').addClass('pre-alert');
    }
    if (robot.balls.current > 6) {
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
  // checks if numbers are invalid for each value, and assigns/removes warning classes based on results

  function updateDisplay() {
    checkIfInvalidNumbers();

    robot.balls.currrent = forEach(countEvents(robot.events, pickup));
    robot.points.high = forEach(countEvents(robot.events, high));
    robot.points.low = forEach(countEvents(robot.events, low));
    robot.points.miss = forEach(countEvents(robot.events, miss));

    $('#ball-count-display').text(robot.balls.current);
    $('#high-ball-display').text(robot.points.high);
    $('#low-ball-display').text(robot.points.low);
    $('#miss-display').text(robot.points.miss);
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
  });
  // upon logging a button event (such as a pickup or score), adds the event to the robot's array of events

  function countEvents(array, type) {
    let count = 0;
    for (var i = 0; i < array.length; ++i) {
      if (type == pickup) {
        if (array[i].eventType == pickup) {
          count++;
        }
        return count;
      }
      if (type == high) {
        if (array[i].eventType == high) {
          count++;
        }
        return count;
      }
      if (type == low) {
        if (array[i].eventType == low) {
          count++;
        }
        return count;
      }
      if (type == miss) {
        if (array[i].eventType == miss) {
          count++;
        }
        return count;
      }
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
        removeCount(event);
      }
    }
    updateDisplay();
    console.log(robot);
  });
  // undo button function, checks if the button event is one that allows undo (such as a pickup or score)
  // if valid, removes that event from the robot's array, calling removeCount to fix the values

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
});
