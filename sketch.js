
var bgImg;
var hotAirBallon,hotAirBallonImg;
var database,height;

function preload(){
  hotAirBallonImg=loadAnimation("ballon1.png","ballon2.png","ballon3.png");
  bgImg=loadImage("bgImage.png");
}
function setup() {
  createCanvas(1350,600);

  database=firebase.database();

  hotAirBallon = createSprite(400, 200, 50, 50);
  hotAirBallon.addAnimation("ground",hotAirBallonImg);
  hotAirBallon.scale=0.5;

  var hotAirBallonheight=database.ref('Ballon/height');
  hotAirBallonheight.on("value",readHeight,showError);
}
//readHeight
function draw() {
  background(bgImg); 
  if(keyDown(LEFT_ARROW)){
    updateHeight(-10,0);
 
}
else if(keyDown(RIGHT_ARROW)){
    updateHeight(+10,0);

}
else if(keyDown(UP_ARROW)){

  hotAirBallon.addAnimation("ground",hotAirBallonImg);
  hotAirBallon.scale=hotAirBallon.scale -0.01;
  updateHeight(0,+10);
}
else if(keyDown(DOWN_ARROW)){
    // changePosition(0,+1);
    hotAirBallon.addAnimation("ground",hotAirBallonImg);
    hotAirBallon.scale=hotAirBallon.scale +0.01;
    updateHeight(0,+10);

}
  drawSprites();
}
function updateHeight(x,y){
database.ref('hotAirBallon/height').set({
  'x' : height.x + x ,
  'y' : height.y + y,
})}
function readHeight(data) {
height = data.val();
balloon.x = height.x;
balloon.y = height.y;
}

function showError(){
console.log("error");
}