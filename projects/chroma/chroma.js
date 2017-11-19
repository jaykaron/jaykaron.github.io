
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
var platformSpeed = 2;

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
        return false;
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

// ********** Start of BACKGROUND.js **********
var backCirc;

function initBackground() {
  backgroundLayer.activate();
    backCirc = new Path.Circle({
        center: view.center,
        radius: view.bounds.height * 0.45,
        opacity: 0.8
    });

    backCirc.fillColor = {
        gradient: {
    		stops: [new Color(1,1,0), new Color(1,1,1)],
            radial: true
        },
        origin: backCirc.position,
        destination: backCirc.bounds.rightCenter
    };
  mainLayer.activate();
}
function onFrameBackground(event){
  backCirc.fillColor.gradient.stops[0].color.hue+= 0.3;
}

// ********** End of BACKGROUND.js **********

function initWelcome() {
  platforms = []
  platforms.push(new Platform(new Rectangle(screenWidth+100,275, 150,30), platformSpeed,0));
  
  level = 8;                    // newPlatform needs a defined level number
  for(var i=0; i<8; i++)
    newPlatform();
  gameSpeed = initialGameSpeed*2;
  
  hudLayer.activate();
    var title = new Raster("title");
    title.position = view.center;
    
    var spaceText = makeText(view.center+new Point(0, 95), largeTextStyle, 35, "Press SPACE to start");
    
    var controlsText = makeText(view.center+new Point(0, 130), largeTextStyle, 20, "SPACE to jump.   F and D to switch colors.");

    var authorText = makeText(new Point(20, screenHeight - 55), smallTextStyle, 16, "Made by Jay Karon");
    makeLink(authorText, "https://github.com/jaykaron");
    
    var originalText = makeText(new Point(20, screenHeight - 38), smallTextStyle, 12, "Game design by Ari Karon");
    
    var musicText = makeText(new Point(20, screenHeight - 20), smallTextStyle, 12, "Music: Chaoz Fantasy by ParagonX9");
    makeLink(musicText, "https://soundcloud.com/paragonx9");
  mainLayer.activate();
}

// ********** Start of PC.js **********

function PC(x, y) {
    this.w = 35; this.h = 35;

    this.v = 0; this.a = 0.5;   // Velocity, fallingAcceleration
    this.MAX_V = 25;
    this.MIN_V = -12;

    this.c = 0;     // Color

    this.peaked = true;
    this.onPlatform = false;

    this.box = new Rectangle(x,y, this.w,this.h);
    this.path = new Path.Rectangle(this.box);
    this.path.fillColor = "red";
    this.path.strokeColor = "black";

    this.move = function() {

      this.updateV();

      this.shift(this.v);

      var currentPlatform = this.checkPlatforms();
      if(currentPlatform) {
        this.shift(-this.box.intersect(currentPlatform.box).height);
      }
    }

    this.shift = function(deltaY) {
      this.box.y += deltaY;
      var vector = new Point(0, deltaY);
      this.path.position += vector;
      if(this.box.topRight.y > screenHeight + deltaY + 2) {
        gameOver();
      }
    }

    this.nextC = function() {
      /* Switches to the next color */
      this.c = (this.c + 1) % 3;
      this.updateC();
    }

    this.prevC = function() {
      /* Switches to the previous color */
      this.c = (this.c + 2) % 3;
      this.updateC();
    }
    this.updateC = function() {
      switch (this.c) {
        case 0:
          this.path.fillColor = "red";
          break;
        case 1:
          this.path.fillColor = "blue";
          break;
        case 2:
          this.path.fillColor = "green";
          break;
        default:
          this.path.fillColor = "red";
      }
    }

    this.checkPlatforms = function() {
      if(this.v < 0) {
        this.onPlatform = false;
        return null;
      }
      for (var i=0; i<platforms.length; i++) {
        if (platforms[i].c == this.c) {
          if(platforms[i].box.contains(this.box.bottomRight) || platforms[i].box.contains(this.box.bottomLeft)) {
            this.onPlatform = true;
            this.peaked = false;
            return platforms[i];
          }
        }
      }
      this.onPlatform = false;
      return null;
    }

    this.updateV = function() {
      if(Key.isDown('space') && !this.peaked) {
        if(this.onPlatform && this.v >= 0) {    //Landing or on a platform
      		this.v = -5;
      	}
      	else if (this.v < 0) {
      		this.v -= 0.5;
      	}
        if(this.v == 0)
          this.peaked = true;
        if(this.v < this.MIN_V || this.v > 0) {
      		this.peaked = true;
      	}
      }
      else if(!this.onPlatform) {
          this.v += this.a;
      }
      else if (this.v > 0) {    // on a platform
        this.v = 0;
      }
      if(this.v > this.MAX_V)
        this.v = this.MAX_V;
    }
}

// ********** End of PC.js **********

// ********** Start of Platform.js **********

function Platform(rect, v, c) {
  this.move = function() {
    this.box.x -= v * gameSpeed;
    if(this.box.topRight.x < 0) {
      clearPlatforms = true;
      this.offScreen = true;
    }

    var vector = new Point(-v*gameSpeed, 0);
    this.path.position += vector;
  }

  this.updateC = function() {
    switch (this.c) {
      case 0:
        this.path.fillColor = "red";
        break;
      case 1:
        this.path.fillColor = "blue";
        break;
      case 2:
        this.path.fillColor = "green";
        break;
      default:
        this.path.fillColor = "red";
    }
  }

  this.box = rect;
  this.path = new Path.Rectangle(this.box);
  this.path.strokeColor = "black";

  this.v = v; this.c = c;

  this.offScreen = false;

  this.updateC();
}

// ********** End of Platform.js **********

// ********** Start of HUD.js **********
var timeText;
var showedTime = 0;
var speedText;

var countDown;
var speedingUpText;

var pausedText, pausedSmallText;


var largeTextStyle = new Style({
  fontFamily: 'Impact',
  fontWeight: 'bold',
  justification: 'center'
});
var smallTextStyle = new Style({
  justification: "left",
  fontWeight: "normal",
  fontFamily: "arial black"
});

function newHud() {
  hudLayer.activate();
    hudLayer.removeChildren();
    
    timeText = makeText(new Point(10,35), smallTextStyle, 26, "");
    
    speedText = makeText(new Point(10,60), smallTextStyle, 15, "");
    
    countDown = makeText(new Point(view.center+new Point(0,75)), largeTextStyle, 150, "");
    
    pausedText = makeText(new Point(view.center), largeTextStyle, 70, "");
    pausedSmallText = makeText(new Point(view.center+new Point(0,55)), largeTextStyle, 35, "");
    
    updateHudNewLevel();
    updateHudNewSecond();
  mainLayer.activate();
}

function updateHud(){
  if(secondsPassed > showedTime)
    updateHudNewSecond();
  if(countDown.opacity < 1) 
    countDown.opacity+=0.05;
  if(countDown.content){
    countDown.style.fontSize-= 0.8;
    countDown.position.y -= 0.4;
  }
}

function updateHudNewSecond() {
  if(timeIncrement - secondsPassed%timeIncrement <= 3) {
    countDown.content = timeIncrement - secondsPassed%timeIncrement;
    countDown.opacity = 0;
    countDown.style.fontSize = 150;
    countDown.position = view.center+new Point(0,20)
  }
  else
    countDown.content = "";
    
  showedTime = secondsPassed;
  updateTimeText();
}

function updateHudNewLevel() {
  speedText.content = gameSpeed.toPrecision(2) + " x";
}

function updateTimeText() {
  timeText.content = showedTime;
}

function gameOverHud() {
  hudLayer.activate();
    var gameOverText = makeText(new Point(view.center), largeTextStyle, 70, "GAME OVER");
    var restartText = makeText(new Point(view.center+new Point(0,55)), largeTextStyle, 35, "Press SPACE to restart");
    var scoreText = makeText(new Point(view.center+new Point(0,120)), largeTextStyle, 28, "Longest Run: "+highscore);
    
    countDown.content = "";
  mainLayer.activate();
}

function pausedHud(){
  pausedText.content = "PAUSED"
  pausedSmallText.content = "Press P to continue";
}
function unpausedHud(){
  pausedText.content = "";
  pausedSmallText.content = "";
}


//  ******* TEXT HELPER FUNCTIONS *******
function makeText(point, style, size, content) {
  var text = new PointText(point);
  text.style = style;
  text.style.fontSize = size;
  text.content = content;
  return text;
}

function makeLink(pointText, url){
  pointText.onMouseDown = function() {
    window.open(url);
  };
  pointText.onMouseEnter = function(){
    this.style.fontSize += 3;
    document.body.style.cursor = 'pointer';
  };
  pointText.onMouseLeave = function(){
    this.style.fontSize -= 3;
    document.body.style.cursor = "";
  };
}

// ********** End of HUD.js **********

// ********** Start of INIT.js **********
// The code to run after the rest of the code is already loaded
init();

// ********** End of INIT.js **********
