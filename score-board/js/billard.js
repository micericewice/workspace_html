// set onload function
window.onload=mainLoad;

/* struc of player
player {
  id    : uint,         // html id of player
  name  : string,       // player's name
  hr    : uint,         // current high run
  avg   : decimal(3),   // current average
  run   : int,          // scored point in current inning
  pts   : int,          // total points

  turn  : boolean,      // indicate if player in turn

  inTurn        : METHOD,   // check if player in turn
  takeTurn      : METHOD,   // player have the turn
  makePoint     : METHOD,   // player make a carom (score single point)
  finishInning  : METHOD,   // player finish inning (miss a carom)
}*/

// number of players: certainly is 2 players
const NUMBER_OF_PLAYERS = 2;
// create empty array
var players = []; 
// inning
var inns = 0;

function mainLoad (argument) {
  // update time clock
  updateTime();

  // init players' data
  initPlayersData();

  // P1 start the game
  gameStart(0);
}

function initPlayersData (argument) {
  for (var i = 0; i < NUMBER_OF_PLAYERS; i++) {
    var strName = "Player " + htmlId(i);
    console.log("initPlayersData() --- " + i + " --- strName: " + strName);
    players.push({
      // properties:
      id    : htmlId(i),
      name  : strName,
      hr    : 0,
      avg   : 0,
      run   : 0,
      pts   : 0,
      turn  : false, // is in the turn

      // behavior:
      /*[interface]: check if the player in the turn*/
      inTurn        : function() {
        return this.turn;
      },

      /*player has the turn himself*/
      takeTurn      : function() {
        this.turn = true;
        // make icon-turn visible
        document.getElementById("turn"+this.id).style.visibility = 'visible';
      },

      /*player make a point (carom)*/
      makePoint     : function() {
        // increase run and update DOM
        document.getElementById("run"+this.id).innerHTML = ++this.run;
      },

      /*player finish his inning*/
      finishInning  : function() {
        // calculation:
        // only P1 (htmlId = 1) can update the inning
        if (this.id == 1) {
          document.getElementById("inns").innerHTML = ++inns;
        };
        // total points
        this.pts+=this.run;
        // high run
        this.hr=(this.run>this.hr)?this.run:this.hr;
        // reset run
        this.run=0;
        // average
        this.avg=this.pts/inns;

        // update DOM
        document.getElementById("pts"+this.id).innerHTML = this.pts;
        document.getElementById("hr"+this.id).innerHTML = this.hr;
        document.getElementById("avg"+this.id).innerHTML = this.avg.toFixed(3);

        // hide run
        document.getElementById("turn"+this.id).style.visibility = 'hidden';

        // release turn
        this.turn = false;
      },
    });
  };
}

// show as "Player 1", "Player 2" instead of "Player 0"
function htmlId (argument) {
  return (argument + 1);
}

// increase points
$('.portrait.p-white').click(function() {if(players[0].inTurn()) {players[0].makePoint();};});
$('.portrait.p-yellow').click(function() {if(players[1].inTurn()) {players[1].makePoint();};});


// finish an inning
// player 1 finish will increase inning count
$('.p-white .score').on('click', function() {
  if(players[0].inTurn()) {
    players[0].finishInning();
    // change turn
    players[1].takeTurn();
  };
});

$('.p-yellow .score').on('click', function() {
  if(players[1].inTurn()) {
    players[1].finishInning();
    // change turn
    players[0].takeTurn();
  };
});

/*id=0: P1 start, id=1:P2 start*/
function gameStart (id) {
  players[id].takeTurn();
}

function updateTime () {
  var today = new Date();
  var hour = today.getHours();
  var mins = today.getMinutes();
  var secs = today.getSeconds();

  if (secs <=9) {secs = "0" + secs;};
  if (mins <=9) {mins = "0" + mins;};
  if (hour <=9) {hour = "0" + hour;};

  var TotalTime = hour + ":" + mins + ":" + secs;

  document.getElementById("time").innerHTML = TotalTime;

  // console.log(TotalTime);

  setTimeout("updateTime()", 1000)
}

// count down clock
var cd_secs = 40;

var refressCountdownId;
var paused = true;

$('#cd-secs').click(function() {
  if (cd_secs==40) {
    // start the interval
    resumeCountdown();
  } else if (cd_secs > 0) {
    if (!paused) {
      // pause the interval
      pauseCountdown();
    } else {
      resumeCountdown();
    }
  } else { // cd_secs <= 0
    // reset clock to 40
    cd_secs = 40;
    // update count down
    pauseCountdown();
    updateCountdown();
  };
});

function countDownTime () {
  cd_secs -= 1;
  // update count down
  updateCountdown();
  if (cd_secs == 0) {
    // stop the interval
    // pauseCountdown();
  };
}

function pauseCountdown (argument) {
  clearInterval(refressCountdownId);
  delete refressCountdownId;
  paused = true;
}
function resumeCountdown (argument) {
  if (paused) {
    refressCountdownId = setInterval(countDownTime, 1000);
    paused = false;
  }
}

function updateCountdown (argument) {
  document.getElementById("cd-secs").innerHTML = cd_secs;
}

$('#cd-secs').dblclick(function() {
  console.log("double click");
  pauseCountdown();
  // reset clock to 40
  cd_secs = 40;
  // update count down
  updateCountdown();
});