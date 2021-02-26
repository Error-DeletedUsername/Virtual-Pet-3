dog = 0
happyDog = 0
database = VirtualPet
foodS = 0
foodStock = 0 

var changing_gameState
var reading_gameState

var bedroom
var garden
var livingroom
var washroom

function preload()
{
  dog = loadImage('sprites/dogImg.png')
  bedroom = loadImage('sprites/Bed Room.png')
  garden = loadImage('sprites/Garden.png')
  livingroom = loadImage('sprites/Living Room.png')
  washroom = loadImage('sprites/Wash Room.png')
}

function setup() {
	createCanvas(500, 500);
  var dog=createSprite(250, 250, 100, 100)
  dog.addImage('sprites/dogImg.png')
  foodStock=database.ref('Food')
  foodStock.on("value",readStock)

  readState=database.ref('gameState')
  readState.on("value",function(data){
    gameState=data.val()
  })
}


function draw() {  
  drawSprites();
  background(46,139,87)
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS)
    dog.addImage(dogHappy);
  }
  text(foodStock)
  textSize(15)
  fill(white)
  stroke(black)
  text('Note: Press UP_ARROW Key to feed your pet milk!')
  textSize(15)
  fill(white)
  stroke(black)

  if(gameState!=hungry){
    dog = loadImage('sprites/')
  }

  currentTime=hour()
  if(currentTime==(lastFed+1)){
    update('Playing')
    foodObj.garden()
  }else if(currentTime==(lastFed+2)){
    update("Sleeping")
      foodObj.bedroom()
  }else if(currentTime>(lastFed+2) && currentTime<=(lastFed+4)){
    update("Bathing")
      foodObj.washroom()
  }else{
    update("Hungry")
    foodObj.display()
  }

  function update(state){
    database.ref('/').update({
      gameState:state
    })
  }
}

function readStock(data){
  foodS=data.val()
}

function writeStock(x){
  database.ref('/').update({
    Food:x
  })
}



