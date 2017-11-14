
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
