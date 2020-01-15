// to define a LOCKED var:

const Balls = 3;

// to define a LOCKED var:

let Balls = 3;
balls ++;

// to create a function:

function addBall(number){
      return number + 1;
}

// if statements:

if (balls<3){
      balls = addBall(balls);
}

// *objects*:
// a .JSON object is a container for multiple data types

field = {robotName='chezy'};   // defines robotName of field
field.robotName                // is equal to chezy

field.robotTeam = 254;         // variables can be added into a field at any time

// an example long .JSON object:

robot = {
      name = 'foo',
      team = 123,
      score = {
            highGoal = 5,
            lowGoal = 3,
            miss = 6,
      }
}

// to add 1 to miss:

robot.score.miss ++;

