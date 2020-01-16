import '../main.css';
import $ from 'jquery';          // uses $ as a variable for jquery (this file is js by default)

$(document).ready(function(){    // forces jquery to wait until the site is ready

      const robot = {
            balls: {
                  preload: 0
            },
            points: {
                  high: 0,
                  low: 0,
                  miss: 0
            },
            wheel: {
                  rotation: {
                        success: 0,
                        fail: 0
                  },
                  position: {
                        success: 0,
                        fail: 0
                  }
            }
      }

      function robotStatus(robot){
            console.log(robot);
      }


      $('#rotation-successful').click(function(){
            alert('hello button');
      })


      $('.btn-high-goal').click(function(){
            robot.points.high++;
            robotStatus(robot);
      })

      $('.btn-low-goal').click(function(){
            robot.points.low++;
            robotStatus(robot);
      })

      $('.btn.miss.ball').click(function(){
            robot.points.miss++;
            robotStatus(robot);
      })

      $('.phase-tab').click(function(){
            const $tab = $(this);

            $('.phase-tab').removeClass('tab-active');
            $tab.addClass('tab-active');

            const tabId = $tab.data('tab-id');
            
            $('.tab-container').addClass('hidden');
            $('#' + tabId).removeClass('hidden');
      })

      $('.btn-preload').click(function(){
            const $preload = $(this);

            $('.btn-preload').removeClass('preload-button-rb-active');
            $preload.addClass('preload-button-rb-active')

      })

      /*$('#rotation-successful').click(function(){
            robot.wheel.rotation.success++;
            robotStatus(robot)
      })

      $('#rotation-failed').click(function(){
            robot.wheel.rotation.fail++;
            robotStatus(robot)
      })

      $('#position-successful').click(function(){
            robot.wheel.position.success++;
            robotStatus(robot)
      })

      $('#position-failed').click(function(){
            robot.wheel.position.fail++;
            robotStatus(robot)
      })*/
});

