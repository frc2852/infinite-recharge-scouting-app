import '../main.css';
import $ from 'jquery';          //uses $ as a variable for jquery

$(document).ready(function(){    // forces jquery to wait until the site is ready
      $('#rotation-successful').click(function(){      // # means go to; look at the rotation successful key
            alert('hello button');                     // and when it is clicked, run the function (run alert)
      })

      $('.btn-high-goal').click(function(){   // . means in this class, meaning this fires for all in this class
            alert('hello class');
      })
});

