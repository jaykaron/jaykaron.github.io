
// ********** Start of Chroma.js **********

var background; // Background Image
var pc;         // The player obj
var platforms;   //Array holding all the platform obj.s
var startTime;

var screenWidth = 1000;
var screenHeight = 600;

var clearPlatforms; // A boolean true when a platform is off the screen to the left

var music = new Audio("ChoazFantasy.mp3");

var prevLevel;
var level;
var timeIncrement = 10; // Number of seconds between level

var initialGameSpeed = 1;
var gameSpeed;
var gameSpeedIncrement = 0.2; // How much the game speeds up each time
var platformSpeed = 1.7;

var timePassed;
var secondsPassed;     // The number of seconds since the game started

var gameOn = false;
var paused = false;

var backgroundLayer, mainLayer, hudLayer;

var highscore = 0;


function init(){
  backgroundLayer = project.activeLayer;
  mainLayer = new Layer();
  hudLayer = new Layer();
  musicControlLayer = new Layer();
  mainLayer.activate();
  
  initBackground();
  initMusic();
  
  initWelcome();
}
function newGame() {
  mainLayer.removeChildren();
  
  level = 1;
  gameSpeed = initialGameSpeed;
  
  timePassed = 0;
  secondsPassed = 0;  

  pc = new PC(250,50);
  
  platforms = []
  platforms.push(new Platform(new Rectangle(200,275, 350,30), platformSpeed,0));
  for(var i=0; i<8; i++)
    newPlatform();

  gameOn = true;
  newHud();

  startTime = Date.now();

}

var soundButton;    //A path, clicking it toggles the music
function initMusic() {
  musicControlLayer.activate();
    soundButton = new Raster("volumeMed");
    soundButton.position = new Point(950, 550);
    soundButton.box = new Path.Rectangle(925,525, 50,50);
    soundButton.box.fillColor = new Color(1,1,1, 0.00001);    //Needs to be filled in for onMouseDown to work
    soundButton.box.onMouseDown = function(event){
      switch (music.volume) {
        case 0.5:
          music.volume = 1;
          soundButton.image = document.getElementById("volumeHigh")
          break;
        case 1:
          music.volume = 0;
          soundButton.image = document.getElementById("volumeOff")
          break;
        case 0:
          music.volume = 0.25;
          soundButton.image = document.getElementById("volumeLow")
          break;
        case 0.25:
          music.volume = 0.5;
          soundButton.image = document.getElementById("volumeMed")
          break;
        default:
          music.volume = 1;
          soundButton.image = document.getElementById("volumeHigh")
          break;
      }
    };
  mainLayer.activate();
  music.play();
  music.loop = true;
  music.volume = 1;
}

// The GAME LOOP
function onFrame(event) {
  onFrameBackground();
  
  if(gameOn && !paused) {
    pc.move();
    updateTime(event);
  }
  if(!paused)
    for (var i=0; i<platforms.length; i++) {
      platforms[i].move();
    }

  if(clearPlatforms) {
    if (platforms[0].offScreen) {
      platforms.shift();
      newPlatform();
    }
  }
}
function updateTime(event) {
  if(event.delta > 0.05){
    pause();
    return;
  }
  timePassed += event.delta;
  secondsPassed = Math.floor(timePassed);
  if(secondsPassed % timeIncrement == 0)
    if (level < 1 + secondsPassed / timeIncrement)
      nextLevel();
    updateHud();
}
function nextLevel() {
  level++;
  gameSpeed = initialGameSpeed + gameSpeedIncrement * (level - 1);
  updateHudNewLevel();
}

function newPlatform() {
  var lastPlat = platforms[platforms.length-1];
  var newOriginPoint;

  do {
    newOriginPoint = lastPlat.box.topRight+new Point(randomInt(-100, Math.min(100+10*level, 500)), randomInt(-250,250));
  } while (newOriginPoint.y > 550 || newOriginPoint.y < 120);
  platforms.push(new Platform(new Rectangle(newOriginPoint, new Size(randomInt(100,350), 30)),platformSpeed, randomInt(0,3)));
}

function randomInt(min, max) {
  return Math.floor(Math.random()*(max-min)+min);
}

function pause() {
  paused = true;
  pausedHud();
  
}
function unpause(){
  paused = false;
  unpausedHud();
}
function pauseToggle() {
  if(!paused)
    pause();
  else 
    unpause();
}

function gameOver() {
  gameOn = false;
  if(navigator.cookieEnabled)
    highscore = getScoreCookie();
  if(secondsPassed > highscore){
    setScoreCookie(secondsPassed);
    highscore = secondsPassed;
  }
  gameOverHud();
}

function setScoreCookie(score) {
    if(!navigator.cookieEnabled)
      return;
    var d = new Date();
    d.setTime(d.getTime() + (10*24*60*60*1000)); // 10 days to expiry
    var expires = "expires="+ d.toUTCString();
    document.cookie = "score=" + score + ";" + expires + ";path=/";
}
function getScoreCookie(){
   var decodedCookie = decodeURIComponent(document.cookie);
   var splitted = decodedCookie.split("=");
   var cookieScore = splitted[splitted.length - 1]
   return cookieScore;
}

function onKeyDown(event){
  switch (event.key) {
    case 'f':
      pc.nextC();
      break;
      case 'd':
        pc.prevC();
        break;
      case 'space':
        if(!gameOn)
          newGame();
        break;
    default:
      ;
  }
}

function onKeyUp(event) {
  if(event.key == 'space')
    pc.peaked = true;
  if(event.key == 'p' && gameOn)
    pauseToggle();
    
}
// ********** End of Chroma.js **********
