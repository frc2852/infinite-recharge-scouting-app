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

    function robotStatus(robot) {
        console.log(robot);
    }

    $('.start-button').click(function() {
        /*MATCH START*/
        robot.matchStartTime = Date.now();
        console.log('Match Start Triggered at ', robot.matchStartTime);
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

        console.log('Selected ' + $autoChosen + '.');
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
            robot.balls.current = 0;
        }
        if (robot.balls.current > 5) {
            $('#ball-count-display').addClass('.alert-red');
        }
        if (robot.balls.current < 5) {
            $('#ball-count-display').removeClass('.alert-red');
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
        console.log(robot);
    });

    /* Undo Logic */

    $('.undo').click(function() {
        console.log('all points before', robot.points);
        if (robot.events.length > 0) {
            const $btnEvent = $(this);
            const eventPhase = $btnEvent.data('event-phase');
            const lastEventIndex = robot.events.reduce(function(lastEventIndex, currentEvent, index) {
                console.log(currentEvent === lastEventIndex);
                lastEventIndex = currentEvent === lastEventIndex ? undefined : lastEventIndex;
                if (isEventValid(currentEvent, eventPhase)) {
                    return index;
                }
                return lastEventIndex;
            });
            if (lastEventIndex != undefined) {
                console.log(lastEventIndex);
                const event = robot.events[lastEventIndex];
                robot.events.splice(lastEventIndex, 1);
                console.log('remove count event', event);
                removeCount(event);
            }
        }
        updateDisplay();
        console.log('all points after', robot.balls);
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

    function removeCount(event) {
        switch (event.eventType) {
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
        rositionSuccessStatus = 1;
        rositionFailureStatus = 0;
        robotStatus(robot);
    });

    $('#position-failed').click(function() {
        rositionFailureStatus = 1;
        rositionSuccessStatus = 0;
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
        fallStatus = 1;
        climbStatus = 0;
        autoBalanceStatus = 0;
        parkStatus = 0;
        robotStatus(robot);
    });

    $('#climb-autobalance').click(function() {
        autoBalanceStatus = 1;
        fallStatus = 0;
        climbStatus = 0;
        parkStatus = 0;
        robotStatus(robot);
    });

    $('#park-successful').click(function() {
        parkStatus = 1;
        fallStatus = 0;
        autoBalanceStatus = 0;
        climbStatus = 0;
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
