var game = new Lorina()
	game.setColor('#3D9970')
		.makeFullscreen()
		.makeRoomFullscreen()

var camera = new Camera()
var gamepads = new Gamepad()
	gamepads.setDeadzone(0.2)
var tool = new Tool()
var typewriter = new Typewriter()
	typewriter.setSize(20).setFont('Helvetica').setColor('#FFFFFF').setStyle('bold italic')

var footprints = new Group()
var flowers = new Group()
var crosshairs = new Group()
var p1Bullets = new Group()
var p1Mines = new Group()
var boxes = new Group()

var p1Status = 'drone'
var p1HackDistance = 200

var p1Drone = new Entity()
	p1Drone.setSprite('images/vehicles/drone.png')
		   .setPosition(100, 100)
		   .setAnchor(20, 20)
		   .setBound(-20, -20, 40, 40)
		   .setFriction(playerFriction)
		   .rotate(-45)

var p1Body = new Entity()
	p1Body.setSprite('images/vehicles/p1Body.png')
		  .setPosition(l.room.width - 100, l.room.height - 100)
		  .setAnchor(40, 40)
		  .setBound(-40, -40, 80, 80)
		  .setFriction(playerFriction)
		  .rotate(135)

var p1Head = new Entity()
	p1Head.setSprite('images/vehicles/p1Head.png')
		  .setPosition(p1Body.x, p1Body.y)
		  .setAnchor(27, 27)
		  .setFriction(playerFriction)
		  .rotate(tool.random(0, 360))

var p1Crosshair = new Entity()
	p1Crosshair.setSprite('images/ui/p1Crosshair.png')
			   .setPosition(l.room.width - 250, l.room.height - 250)
			   .setAnchor(24, 24)
	crosshairs.add(p1Crosshair)

var box = new Entity()
	box.setSprite('images/environment/box.png')
	   .setPosition(l.room.width / 2, l.room.height / 2 - 200)
	   .setAnchor(30, 30)
	   .setBound(-30, -30, 60, 60)
	boxes.add(box)

	var box = new Entity()
		box.setSprite('images/environment/box.png')
		   .setPosition(l.room.width / 2, l.room.height / 2)
		   .setAnchor(30, 30)
		   .setBound(-30, -30, 60, 60)
		boxes.add(box)

	var box = new Entity()
		box.setSprite('images/environment/box.png')
		   .setPosition(l.room.width / 2, l.room.height / 2 + 200)
		   .setAnchor(30, 30)
		   .setBound(-30, -30, 60, 60)
		boxes.add(box)

var i = flowerCount
while (i--)
{
	var flower = new Entity()
		flower.setSprite('images/environment/flower.png')
			  .setAnchor(6, 6)
			  .setPosition(tool.random(0, l.room.width), tool.random(0, l.room.height))
		flowers.add(flower)
}

var sfxShoot = new Speaker()
	sfxShoot.setFile('sounds/shoot.wav')

var sfxMine = new Speaker()
	sfxMine.setFile('sounds/mine.wav')

game.start(loading)

var p1MakeFootprint = function()
{
	var footprint = new Entity()
		footprint.setSprite('images/vehicles/footprint.png')
			     .setPosition(p1Body.x, p1Body.y)
			     .setSize(80, 80)
			     .setAnchor(40, 40)
			     .rotateTo(p1Body.degree)
		footprints.add(footprint)

	setTimeout(function()
	{
		footprint.delete()
	}, playerFootprintLife)
}