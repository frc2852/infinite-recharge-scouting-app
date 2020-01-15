import '../main.css';
import $ from 'jquery';          // uses $ as a variable for jquery (this file is js by default)

$(document).ready(function(){    // forces jquery to wait until the site is ready

      const robot = {
            points = {
                  high = 0,
                  low = 0,
                  miss = 0
            }
      }

      funtion robotStatus(robot){
            console.log(robot)
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
});

