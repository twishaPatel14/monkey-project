
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstaclesGroup;
var back,backImage;
var ground,groundImage;
var score=0;
var gameOver;

function preload(){
  backImage=loadImage("jungle.jpg");
  monkey_running =  loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png"); 
  
}



function setup() {
  createCanvas(800, 400);
  back=createSprite(0,0,800,400);
  back.addImage(backImage);
   back.x=back.width/2;
  back.velocityX=-5;
     
  
  monkey = createSprite(110,340,25,50);
  monkey.addAnimation("Running",monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.velocityX=-5;
  ground.x=ground.width/2;
  
  ground.visible=false;
  
  FoodGroup = new Group();
  
  obstaclesGroup = new Group();
  score= 0;
  
}

function draw() {
  background(225);
    
  
    
  if(ground.x<0) {
    ground.x=ground.width/2;
  }
  if(back.x<200){
    back.x=back.width/2;
  }
 if(FoodGroup.isTouching(monkey)) {
   FoodGroup.destroyEach();
   score=score+2;
 }
   
   switch(score){
        case 10: monkey.scale=0.12;
                break;
        case 20: monkey.scale=0.14;
                break;
        case 30: monkey.scale=0.16;
                break;
        case 40: monkey.scale=0.18;
                break;
        default: break;
    }
  if(keyDown("space")){
    monkey.velocityY=-10;
    
  }
   //providing gravitiy
  monkey.velocityY = monkey.velocityY + 0.8;
  //colidding monkey with ground
    monkey.collide(ground);
    spawnFood();
    spawnObstacles();
    if(obstaclesGroup.isTouching(monkey)){ 
        monkey.scale=0.08;
     
    }
  
 drawSprites();
   stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50);
  
}
function spawnFood() {
 
  if (frameCount % 80 === 0) {
    var banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -5;
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
    FoodGroup.add(banana);
  }
}
function spawnObstacles() {
  if(frameCount % 100 === 0) {
    var obstacle = createSprite(800,350,10,40);
    obstacle.velocityX = -6;
    obstacle.addImage(obstacleImage);
        obstacle.scale = 0.2;
    obstacle.lifetime = 300;
    obstaclesGroup.add(obstacle);
  }
}
