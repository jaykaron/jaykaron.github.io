
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
