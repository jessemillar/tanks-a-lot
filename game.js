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
var p2Bullets = new Group()
var p2Mines = new Group()
var boxes = new Group()

var p1Body = new Entity()
	p1Body.setSprite('images/vehicles/p1Body.png')
			  .setPosition(100, 100)
			  .setAnchor(40, 40)
			  .setBound(-40, -40, 80, 80)
			  .setFriction(playerFriction)
			  .rotate(315)

var p1Head = new Entity()
	p1Head.setSprite('images/vehicles/p1Head.png')
		  .setPosition(p1Body.x, p1Body.y)
		  .setAnchor(27, 27)
		  .setFriction(playerFriction)

var p1Crosshair = new Entity()
	p1Crosshair.setSprite('images/ui/p1Crosshair.png')
			   .setPosition(250, 250)
			   .setAnchor(24, 24)
	crosshairs.add(p1Crosshair)

var p2Body = new Entity()
	p2Body.setSprite('images/vehicles/p2Body.png')
		  .setPosition(l.room.width - 100, l.room.height - 100)
		  .setAnchor(40, 40)
		  .setBound(-40, -40, 80, 80)
		  .setFriction(playerFriction)
		  .rotate(135)

var p2Head = new Entity()
	p2Head.setSprite('images/vehicles/p2Head.png')
		  .setPosition(p1Body.x, p1Body.y)
		  .setAnchor(27, 27)
		  .setFriction(playerFriction)

var p2Crosshair = new Entity()
	p2Crosshair.setSprite('images/ui/p2Crosshair.png')
			   .setPosition(l.room.width - 250, l.room.height - 250)
			   .setAnchor(24, 24)
	crosshairs.add(p2Crosshair)

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

var p2MakeFootprint = function()
{
	var footprint = new Entity()
		footprint.setSprite('images/vehicles/footprint.png')
			     .setPosition(p2Body.x, p2Body.y)
			     .setSize(80, 80)
			     .setAnchor(40, 40)
			     .rotateTo(p2Body.degree)
		footprints.add(footprint)

	setTimeout(function()
	{
		footprint.delete()
	}, playerFootprintLife)
}