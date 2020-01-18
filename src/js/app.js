import '../main.css';
import $ from 'jquery';          // uses $ as a variable for jquery (this file is js by default)

$(document).ready(function(){    // forces jquery to wait until the site is ready

      let rawRotationSuccessStatus = 0;
      let rawRotationFailureStatus = 0;
      let rawPositionSuccessStatus = 0;
      let rawPositionFailureStatus = 0;
      let rotationSuccessStatus = rawRotationSuccessStatus % 2;
      let rotationFailureStatus = rawRotationFailureStatus % 2;
      let positionSuccessStatus = rawPositionSuccessStatus % 2;
      let positionFailureStatus = rawPositionFailureStatus % 2;

      let rawClimbStatus = 0;
      let rawFallStatus = 0;
      let rawAutoBalanceStatus = 0;
      let rawParkStatus = 0;
      let climbStatus = rawClimbStatus % 2;
      let fallStatus = rawFallStatus % 2;
      let autoBalanceStatus = rawAutoBalanceStatus % 2;
      let parkStatus = rawParkStatus % 2;

      const robot = {
            matchStartTime: 0,
            hasAuto: 0,
            balls: {
                  current: 0
            },
            points: {
                  high: 0,
                  low: 0,
                  miss: 0
            },
            wheel: {
                  rotation: {
                        success: rotationSuccessStatus,
                        fail: rotationFailureStatus
                  },
                  position: {
                        success: positionSuccessStatus,
                        fail: positionFailureStatus
                  }
            },
            climb: {
                  success: climbStatus,
                  fall: fallStatus,
                  autobalance: autoBalanceStatus,
                  park: parkStatus
            },
      }
      
      $("#ball-count-display").text(robot.balls.current);
      $("#high-ball-display").text(robot.points.high);
      $("#low-ball-display").text(robot.points.low);
      $("#miss-display").text(robot.points.miss);

      function robotStatus(robot){
            console.log(robot);
      }

      $('.start-button').click(function(){          /*MATCH START*/
            robot.matchStartTime = Date.now();
            console.log('Match Start Triggered at ', robot.matchStartTime);
            $('#matchTriggerAuto').trigger('click');
            $('.phase-tab').removeClass('hidden');
            $('.hud').removeClass('hidden');
      })

      $('.auto-choice').click(function(){
            const $autoChosen = $(this);
            const activeColour = $autoChosen.data('active-colour');

            $('.auto-choice').removeClass('active-red');
            $('.auto-choice').removeClass('active-green');
            $autoChosen.addClass(activeColour);

            console.log('Selected ' + $autoChosen + '.');
      })

      /*$('.pregame').click(function(){
            $('.phase-tab').addClass('hidden');
      })  */

      $('.phase-tab').click(function(){
            const $tab = $(this);

            $('.phase-tab').removeClass('tab-active');
            $tab.addClass('tab-active');

            const tabId = $tab.data('tab-id');
            
            $('.tab-container').addClass('hidden');
            $('#' + tabId).removeClass('hidden');
      })

      $('.btn-pickup').click(function(){
            robot.balls.current++;
            updateDisplay();
      })

      $('.btn-high-goal').click(function(){
            robot.points.high++;
            robot.balls.current--;
            updateDisplay();
      })

      $('.btn-low-goal').click(function(){
            robot.points.low++;
            robot.balls.current--;
            updateDisplay();
      })

      $('.btn-miss').click(function(){
            robot.points.miss++;
            robot.balls.current--;
            updateDisplay();
      })

      function updateDisplay(){
            if (robot.balls.current < 0){
                  robot.balls.current = 0;
            }
            if (robot.balls.current > 5){
                  $('#ball-count-display').addClass('.alert-red');
            }
            if (robot.balls.current < 5){
                  $('#ball-count-display').removeClass('.alert-red');
            }            
            $("#ball-count-display").text(robot.balls.current);
            $("#high-ball-display").text(robot.points.high);
            $("#low-ball-display").text(robot.points.low);
            $("#miss-display").text(robot.points.miss);
            return null;
      }

      $('.btn-preload').click(function(){
            const $preload = $(this);

            $('.btn-preload').removeClass('preload-button-rb-active');
            $preload.addClass('preload-button-rb-active');
      })

      /* Pizza Time Logic */

      $('#rotation-successful').click(function(){
            rawRotationSuccessStatus++;
            robotStatus(robot);
      })

      $('#rotation-failed').click(function(){
            rawRotationFailureStatus++;
            robotStatus(robot);
      })

      $('#position-successful').click(function(){
            rawPositionSuccessStatus++;
            robotStatus(robot);
      })

      $('#position-failed').click(function(){
            rawPositionFailureStatus++;
            robotStatus(robot);
      })
      
      /* Monkey Bar Logic */

      $('#climb-successful').click(function(){
            rawClimbStatus++;
            robotStatus(robot);
      })

      $('#climb-fall').click(function(){
            rawFallStatus++;
            robotStatus(robot);
      })

      $('#climb-autobalance').click(function(){
            rawAutoBalanceStatus++;
            robotStatus(robot);
      })

      $('#park-successful').click(function(){
            rawParkStatus++;
            robotStatus(robot);
      })

      /* Toggle Logic */

      $('.rotation-toggle').click(function(){
            const $rotationState = $(this);

            $('.rotation-toggle').removeClass('button-active');
            $rotationState.addClass('button-active');
      })      
      
      $('.position-toggle').click(function(){
            const $positionState = $(this);

            $('.position-toggle').removeClass('button-active');
            $positionState.addClass('button-active');
      })      
      
      $('.endgame-toggle').click(function(){
            const $endgameState = $(this);

            $('.endgame-toggle').removeClass('button-active');
            $endgameState.addClass('button-active');
      })

})
