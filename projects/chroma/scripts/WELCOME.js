
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
