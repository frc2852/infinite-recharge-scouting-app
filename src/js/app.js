import '../main.css';
import $ from 'jquery';          // uses $ as a variable for jquery (this file is js by default)

$(document).ready(function(){    // forces jquery to wait until the site is ready

      let rawRotationSuccessStatus = 0;
      let rawRotationFailureStatus = 0;
      let rawPositionSuccessStatus = 0;
      let rawPositionFailureStatus = 0;
      let RotationSuccessStatus = rawRotationSuccessStatus % 2;
      let RotationFailureStatus = rawRotationFailureStatus % 2;
      let PositionSuccessStatus = rawPositionSuccessStatus % 2;
      let PositionFailureStatus = rawPositionFailureStatus % 2;

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
                        success: RotationSuccessStatus,
                        fail: RotationFailureStatus
                  },
                  position: {
                        success: PositionSuccessStatus,
                        fail: PositionFailureStatus
                  }
            }
      }
      
      $("#ball-count-display").text(robot.balls.current);
      $("#high-ball-display").text(robot.points.high);
      $("#low-ball-display").text(robot.points.low);
      $("#miss-display").text(robot.points.miss);

      function robotStatus(robot){
            console.log(robot);
      }


      $('#rotation-successful').click(function(){
            alert('hello button');
      })

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

      $('#rotation-successful').click(function(){
            rotationSuccessStatus++;
            robotStatus(robot);
      })

      $('#rotation-failed').click(function(){
            rotationFailureStatus++;
            robotStatus(robot);
      })

      $('#position-successful').click(function(){
            positionSuccessStatus++;
            robotStatus(robot);
      })

      $('#position-failed').click(function(){
            positionFailureStatus++;
            robotStatus(robot);
      })
});