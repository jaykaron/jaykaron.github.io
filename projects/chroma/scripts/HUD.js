
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
