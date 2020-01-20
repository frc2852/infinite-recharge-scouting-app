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
        /*MATCH START*/
        robot.matchStartTime = Date.now();

        $('#matchTriggerAuto').trigger('click');
        $('.phase-tab').removeClass('hidden');
        $('.hud').removeClass('hidden');
    });

    /* $('#tab-pregame').click(function(){
            $('.hud').addClass('hidden')
      }) */

    $('.auto-choice').click(function() {
        const $autoChosen = $(this);
        const activeColour = $autoChosen.data('active-colour');

        $('.auto-choice').removeClass('active-red');
        $('.auto-choice').removeClass('active-green');
        $autoChosen.addClass(activeColour);
    });

    /*$('.pregame').click(function(){
            $('.phase-tab').addClass('hidden');
      })  */

    $('.phase-tab').click(function() {
        const $tab = $(this);

        $('.phase-tab').removeClass('tab-active');
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
        robot.balls.current--;
        updateDisplay();
    });

    $('.btn-low-goal').click(function() {
        robot.points.low++;
        robot.balls.current--;
        updateDisplay();
    });

    $('.btn-miss').click(function() {
        robot.points.miss++;
        robot.balls.current--;
        updateDisplay();
    });

    function updateDisplay() {
        if (robot.balls.current < 0) {
            $('#ball-count-display').addClass('alert');
        }
        if (robot.balls.current == 0) {
            $('#ball-count-display').removeClass('alert');
        }
        if (robot.balls.current == 1) {
            $('#ball-count-display').removeClass('alert');
        }
        if (robot.balls.current == 2) {
            $('#ball-count-display').removeClass('alert');
        }
        if (robot.balls.current == 3) {
            $('#ball-count-display').removeClass('alert');
        }
        if (robot.balls.current == 4) {
            $('#ball-count-display').removeClass('alert');
        }
        if (robot.balls.current == 5) {
            $('#ball-count-display').removeClass('alert');
        }
        if (robot.balls.current > 5) {
            $('#ball-count-display').addClass('alert');
        }
        if (robot.points.high < 0) {
            $('#high-ball-display').addClass('alert');
        }
        if (robot.points.high > -1) {
            $('#high-ball-display').removeClass('alert');
        }
        if (robot.points.low < 0) {
            $('#low-ball-display').addClass('alert');
        }
        if (robot.points.low > -1) {
            $('#low-ball-display').removeClass('alert');
        }
        if (robot.points.miss < 0) {
            $('#miss-display').addClass('alert');
        }
        if (robot.points.miss > -1) {
            $('#miss-display').removeClass('alert');
        }

        $('#ball-count-display').text(robot.balls.current);
        $('#high-ball-display').text(robot.points.high);
        $('#low-ball-display').text(robot.points.low);
        $('#miss-display').text(robot.points.miss);
    }

    $('.btn-preload').click(function() {
        const $preload = $(this);

        $('.btn-preload').removeClass('preload-button-rb-active');
        $preload.addClass('preload-button-rb-active');
    });

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
        if (
            (currentEvent.eventType == 'pickup' ||
                currentEvent.eventType == 'high' ||
                currentEvent.eventType == 'low' ||
                currentEvent.eventType == 'miss') &&
            (eventPhase == 'auto' || eventPhase == 'teleop')
        ) {
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

    $('#rotation-failed').click(function() {
        rotationFailureStatus = 1;
        rotationSuccessStatus = 0;
        robotStatus(robot);
    });

    $('#position-successful').click(function() {
        positionSuccessStatus = 1;
        positionFailureStatus = 0;
        robotStatus(robot);
    });

    $('#position-failed').click(function() {
        positionFailureStatus = 1;
        positionSuccessStatus = 0;
        robotStatus(robot);
    });

    /* Monkey Bar Logic */

    $('#climb-successful').click(function() {
        climbStatus = 1;
        fallStatus = 0;
        autoBalanceStatus = 0;
        parkStatus = 0;
        robotStatus(robot);
    });

    $('#climb-fall').click(function() {
        climbStatus = 0;
        fallStatus = 1;
        autoBalanceStatus = 0;
        parkStatus = 0;
        robotStatus(robot);
    });

    $('#climb-autobalance').click(function() {
        climbStatus = 0;
        fallStatus = 0;
        autoBalanceStatus = 1;
        parkStatus = 0;
        robotStatus(robot);
    });

    $('#park-successful').click(function() {
        climbStatus = 0;
        fallStatus = 0;
        autoBalanceStatus = 0;
        parkStatus = 1;
        robotStatus(robot);
    });

    /* Toggle Logic */

    $('.rotation-toggle').click(function() {
        const $rotationState = $(this);

        $('.rotation-toggle').removeClass('button-active');
        $rotationState.addClass('button-active');
    });

    $('.position-toggle').click(function() {
        const $positionState = $(this);

        $('.position-toggle').removeClass('button-active');
        $positionState.addClass('button-active');
    });

    $('.endgame-toggle').click(function() {
        const $endgameState = $(this);

        $('.endgame-toggle').removeClass('button-active');
        $endgameState.addClass('button-active');
    });
});
