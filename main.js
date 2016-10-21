MainLoop.setMaxAllowedFPS(60);

// Create the renderer
var renderer = new PIXI.WebGLRenderer(window.innerWidth, window.innerHeight);

// Add the canvas to the HTML document
document.body.appendChild(renderer.view);

// Create a container object called the `stage`
var stage = new PIXI.Container();
var graphics = new PIXI.Graphics();

window.onresize = function(event) {
  renderer.resize(window.innerWidth, window.innerHeight);
};
var opts = {
  "objects" : 3,
  "mass" : 100
}
var fps;
function seed(){
  text = new PIXI.Text('', { fontFamily: 'Arial', fontSize: 12, fill: 0xff1010, align: 'center' });
  stage.addChild(graphics);
  stage.addChild(text);
  //the most important line in the whole game
  cells = [];
  //let's generate some random cells
  for(i=0;i<opts.objects;i++){
    cells[i] = {
      "x": chance.integer({min: 0, max: renderer.width}),
      "y": chance.integer({min: 0, max: renderer.height}),
      "vecx": chance.integer({min: -3, max: 3}),
      "vecy": chance.integer({min: -3, max: 3})
    }
  }
}
function begin(){

}
function update(delta){
  //update cells
  for(i=0;i<cells.length;i++){
    for(a=0;a<cells.length;a++){
      //gravity interaction
      if(i != a){
        distance = Math.round(distanceb(cells[i].x,cells[i].y,cells[a].x,cells[a].y)*100)/100 + 100;
        gravityConst = opts.mass * opts.mass/(distance * distance);
        /*
        if(gravityConst > 1){
          gravityConst = 1;
        }*/
        newGvecx = cells[a].x - cells[i].x;
        newGvecy = cells[a].y - cells[i].y;
        deltaGvecx = setToFixedVelocity(newGvecx ,newGvecy, gravityConst).x;
        deltaGvecy = setToFixedVelocity(newGvecx ,newGvecy, gravityConst).y;
        deltaVecx = cells[i].vecx + deltaGvecx;
        deltaVecy = cells[i].vecy + deltaGvecy;
        cells[i].vecx = deltaVecx;
        cells[i].vecy = deltaVecy;
      }
    }
    //check for border collisions
    if(cells[i].x <= 0 && cells[i].vecx < 0){
      cells[i].vecx *= -0.5;
    }
    if(cells[i].x >= renderer.width && cells[i].vecx > 0){
      cells[i].vecx *= -0.5;
    }
    if(cells[i].y <= 0 && cells[i].vecy < 0){
      cells[i].vecy *= -0.5;
    }
    if(cells[i].y >= renderer.height && cells[i].vecy > 0){
      cells[i].vecy *= -0.5;
    }
    //update location
    cells[i].x += cells[i].vecx;
    cells[i].y += cells[i].vecy;
  }
  //fps
  fps = Math.round(MainLoop.getFPS()); //usually 6 fps only
}

function draw(){
  //add the cells as children
  graphics.clear();
  graphics.beginFill(0xFFFF0B, 1);
  for(i=0;i<cells.length;i++){
    graphics.drawCircle(cells[i].x,cells[i].y,Math.sqrt(opts.mass));
  }
  graphics.endFill();

  //Tell the `renderer` to `render` the `stage`
  text.text = 'FPS: ' + fps;
  renderer.render(stage);
}

//calling seed function
seed();
//setting up loop
MainLoop.setBegin(begin).setUpdate(update).setDraw(draw).start();
