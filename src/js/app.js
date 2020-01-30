import '../main.css';
import $ from 'jquery'; // uses $ as a variable for jquery (this file is js by default)

$(document).ready(function() {
  // forces jquery to wait until the site is ready

  let rotationSuccessStatus = 0;
  let rotationFailureStatus = 0;
  let positionSuccessStatus = 0;
  let positionFailureStatus = 0;

  let climbStatus = 0;
  let fallStatus = 0;
  let autoBalanceStatus = 0;
  let parkStatus = 0;

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
      rotation: {
        success: rotationSuccessStatus,
        fail: rotationFailureStatus,
      },
      position: {
        success: positionSuccessStatus,
        fail: positionFailureStatus,
      },
    },
    climb: {
      success: climbStatus,
      fall: fallStatus,
      autobalance: autoBalanceStatus,
      park: parkStatus,
    },
    events: [],
  };

  $('#ball-count-display').text(robot.balls.current);
  $('#high-ball-display').text(robot.points.high);
  $('#low-ball-display').text(robot.points.low);
  $('#miss-display').text(robot.points.miss);

  function robotStatus(robot) {}

  $('.start-button').click(function() {
    // MATCH START
    robot.matchStartTime = Date.now();
    // $('#match-start-trigger').trigger('click');
    $('#information').addClass('hidden');
    $('#offense').removeClass('hidden');
  });

  $('.phase-choice').click(function() {
    const $phaseChosen = $(this);
    const activeColour = $phaseChosen.data('active-colour');

    $('.phase-choice').removeClass('active-green');
    $('.phase-choice').removeClass('active-blue');
    $phaseChosen.addClass(activeColour);
  });

  $('.toggle').click(function() {
    const $toggled = $(this);
    $toggled.toggleClass('toggle-active');
  });

  $('.emoji-toggle').click(function() {
    const $emojiToggled = $(this);
    $('.emoji-toggle').removeClass('emoji-toggle-active');
    $emojiToggled.addClass('emoji-toggle-active');
  });

  $('.submenu').click(function() {
    const $tab = $(this);

    $('.tab-container').removeClass('tab-active');
    $tab.addClass('tab-active');

    const tabId = $tab.data('tab-id');

    $('.tab-container').addClass('hidden');
    $('#' + tabId).removeClass('hidden');
  });

  $('.btn-pickup').click(function() {
    robot.balls.current++;
    updateDisplay();
  });

  $('.btn-high-goal').click(function() {
    robot.points.high++;
    if (robot.balls.current > 0) {
      robot.balls.current--;
    }
    updateDisplay();
  });

  $('.btn-low-goal').click(function() {
    robot.points.low++;
    if (robot.balls.current > 0) {
      robot.balls.current--;
    }
    updateDisplay();
  });

  $('.btn-miss').click(function() {
    robot.points.miss++;
    if (robot.balls.current > 0) {
      robot.balls.current--;
    }
    updateDisplay();
  });

  $('.btn-reset').click(function() {
    robot.points.high = 0;
    robot.points.low = 0;
    robot.points.miss = 0;
    robot.balls.current = 0;
    updateDisplay();
  });

  function updateDisplay() {
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

    $('#ball-count-display').text(robot.balls.current);
    $('#high-ball-display').text(robot.points.high);
    $('#low-ball-display').text(robot.points.low);
    $('#miss-display').text(robot.points.miss);
  }

  $('.button-event').click(function() {
    const $btnEvent = $(this);
    robot.events.push({
      timestamp: Date.now(),
      eventType: $btnEvent.data('event-type'),
      eventPhase: $btnEvent.data('event-phase'),
    });
  });

  /* Undo Logic */

  $('.undo').click(function() {
    if (robot.events.length > 0) {
      const $btnEvent = $(this);
      const eventPhase = $btnEvent.data('event-phase');

      let lastEventIndex = undefined;
      robot.events.forEach(function(event, index) {
        if (isEventValid(event, eventPhase)) {
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
  });

  function isEventValid(currentEvent, eventPhase) {
    if ((currentEvent.eventType == 'pickup' || currentEvent.eventType == 'high' || currentEvent.eventType == 'low' || currentEvent.eventType == 'miss') && (eventPhase == 'auto' || eventPhase == 'teleop')) {
      return true;
    }
    return false;
  }

  function removeCount(events) {
    switch (events.eventType) {
      case 'pickup':
        robot.balls.current--;
        break;
      case 'high':
        robot.points.high--;
        robot.balls.current++;
        break;
      case 'low':
        robot.points.low--;
        robot.balls.current++;
        break;
      case 'miss':
        robot.points.miss--;
        robot.balls.current++;
        break;
    }
  }

  /* Pizza Time Logic */

  $('#rotation-successful').click(function() {
    rotationSuccessStatus = 1;
    rotationFailureStatus = 0;
    robotStatus(robot);
  });

  $('#position-successful').click(function() {
    positionSuccessStatus = 1;
    positionFailureStatus = 0;
    robotStatus(robot);
  });
