var dustCount = 25
var crosshairRotateSpeed = 1

var playerRotateSpeed = 2
var playerAimSpeed = playerRotateSpeed * 6
var playerSpeed = 5
var playerFriction = 0.2
var playerReloadTime = 750
var playerHeadScatterForce = 5

var p1Alive = true
var p1Exploded = false
var p1CanShoot = true
var p1CanLay = true

var p2Alive = true
var p2Exploded = false
var p2CanShoot = true
var p2CanLay = true
var playerFootprintLife = 3000

var bulletSpeed = 30
var bulletFriction = 0.1

var game = new Lorina()
	game.setColor('#3D9970')
		.makeFullscreen()
		.makeRoomFullscreen()
		// .hideCursor()

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
	p1Body.setSprite('images/p1Body.png')
			  .setPosition(100, 100)
			  .setAnchor(40, 40)
			  .setBound(-40, -40, 80, 80)
			  .setFriction(playerFriction)

var p1Head = new Entity()
	p1Head.setSprite('images/p1Head.png')
		  .setPosition(p1Body.x, p1Body.y)
		  .setAnchor(27, 27)
		  .setFriction(playerFriction)

var p2Body = new Entity()
	p2Body.setSprite('images/p2Body.png')
		  .setPosition(l.room.width - 100, l.room.height - 100)
		  .setAnchor(40, 40)
		  .setBound(-40, -40, 80, 80)
		  .setFriction(playerFriction)

var p2Head = new Entity()
	p2Head.setSprite('images/p2Head.png')
		  .setPosition(p1Body.x, p1Body.y)
		  .setAnchor(27, 27)
		  .setFriction(playerFriction)

var box = new Entity()
	box.setSprite('images/box.png')
	   .setPosition(l.room.width / 2, l.room.height / 2 - 200)
	   .setAnchor(30, 30)
	   .setBound(-30, -30, 60, 60)
	boxes.add(box)

var box = new Entity()
	box.setSprite('images/box.png')
	   .setPosition(l.room.width / 2, l.room.height / 2)
	   .setAnchor(30, 30)
	   .setBound(-30, -30, 60, 60)
	boxes.add(box)

var box = new Entity()
	box.setSprite('images/box.png')
	   .setPosition(l.room.width / 2, l.room.height / 2 + 200)
	   .setAnchor(30, 30)
	   .setBound(-30, -30, 60, 60)
	boxes.add(box)


var p1Crosshair = new Entity()
	p1Crosshair.setSprite('images/p1Crosshair.png')
			   .setPosition(250, 250)
			   .setAnchor(24, 24)
	crosshairs.add(p1Crosshair)

var p2Crosshair = new Entity()
	p2Crosshair.setSprite('images/p2Crosshair.png')
			   .setPosition(l.room.width - 250, l.room.height - 250)
			   .setAnchor(24, 24)
	crosshairs.add(p2Crosshair)

var i = dustCount

while (i--)
{
	var flower = new Entity()
		flower.setSprite('images/flower.png')
			  .setAnchor(6, 6)
			  .setPosition(tool.random(0, l.room.width), tool.random(0, l.room.height))
		flowers.add(flower)
}

var sfxShoot = new Speaker()
	sfxShoot.setFile('sounds/shoot.wav')

var sfxMine = new Speaker()
	sfxMine.setFile('sounds/mine.wav')

// I would recommend that you keep the data for your room functions in an external file and reference it here
var loading = function()
{
	if (l.loaded)
	{
		game.setRoom(connectControllers)
	}

	game.blank()
	typewriter.setPosition(10, 10).write('Loading')
}

var connectControllers = function()
{
	gamepads.update()

	if (gamepads.p1 && gamepads.p2)
	{
		p1Body.rotate(tool.random(0, 360))
		p1Head.rotate(tool.random(0, 360))
		p2Body.rotate(tool.random(0, 360))
		p2Head.rotate(tool.random(0, 360))
		game.setRoom(main)
	}

	game.blank()

	if (!gamepads.p1 && !gamepads.p2)
	{
		typewriter.setPosition(10, 10).write('Waiting for players')
		console.log(l.gamepads)
	}
	else if (!gamepads.p1)
	{
		typewriter.setPosition(10, 10).write('Waiting for P1')
	}
	else if (!gamepads.p2)
	{
		typewriter.setPosition(10, 10).write('Waiting for P2')
	}
}

var main = function()
{
	gamepads.update()

	if (p1Alive)
	{
		if (gamepads.p1.buttons.r2)
		{
			p1Body.pushTowardDegree(p1Body.degree, playerSpeed)
			p1MakeFootprint()
		}
		else if (gamepads.p1.buttons.l2)
		{
			p1Body.pushTowardDegree(p1Body.degree - 180, playerSpeed * 0.75)
			p1MakeFootprint()
		}

		if (gamepads.p1.joysticks.left.horizontal > 0)
		{
			p1Body.rotate(-playerRotateSpeed * Math.abs(gamepads.p1.joysticks.left.horizontal))
			
			p1MakeFootprint()
		}
		else if (gamepads.p1.joysticks.left.horizontal < 0)
		{
			p1Body.rotate(playerRotateSpeed * Math.abs(gamepads.p1.joysticks.left.horizontal))
			
			p1MakeFootprint()
		}

		if (gamepads.p1.joysticks.right.horizontal)
		{
			p1Crosshair.moveHorizontal(playerAimSpeed * gamepads.p1.joysticks.right.horizontal)		
		}

		if (gamepads.p1.joysticks.right.vertical)
		{
			p1Crosshair.moveVertical(playerAimSpeed * gamepads.p1.joysticks.right.vertical)		
		}

		if (gamepads.p1.buttons.r1)
		{
			if (p1CanShoot)
			{
				sfxShoot.play()
				camera.shake(3, 20, 300)

				var bullet = new Entity()
					bullet.setSprite('images/bullet.png')
						  .setPosition(p1Head.x, p1Head.y)
						  .setAnchor(19, 12)
						  .setBound(-19, -12, 38, 24)
						  .setFriction(bulletFriction)
					p1Bullets.add(bullet)

				bullet.pushTowardDegree(p1Head.degree, bulletSpeed)

				p1CanShoot = false

				setTimeout(function()
				{
					p1CanShoot = true
				}, playerReloadTime)
			}
		}

		if (gamepads.p1.buttons.l1)
		{
			if (p1CanLay)
			{
				sfxMine.play()
				var mine = new Entity()
					mine.setSprite('images/mine.png')
						.setPosition(p1Head.x, p1Head.y)
						.setAnchor(11, 11)
						.setBound(-11, -11, 22, 22)
					p1Mines.add(mine)

				p1CanLay = false

				setTimeout(function()
				{
					p1CanLay = true
				}, playerReloadTime)
			}
		}
	}

	if (p2Alive)
	{
		if (gamepads.p2.buttons.r2)
		{
			p2Body.pushTowardDegree(p2Body.degree, playerSpeed)
			p2MakeFootprint()
		}
		else if (gamepads.p2.buttons.l2)
		{
			p2Body.pushTowardDegree(p2Body.degree - 180, playerSpeed * 0.75)
			p2MakeFootprint()
		}

		if (gamepads.p2.joysticks.left.horizontal > 0)
		{
			p2Body.rotate(-playerRotateSpeed * Math.abs(gamepads.p2.joysticks.left.horizontal))
			
			p2MakeFootprint()
		}
		else if (gamepads.p2.joysticks.left.horizontal < 0)
		{
			p2Body.rotate(playerRotateSpeed * Math.abs(gamepads.p2.joysticks.left.horizontal))
			
			p2MakeFootprint()
		}

		if (gamepads.p2.joysticks.right.horizontal)
		{
			p2Crosshair.moveHorizontal(playerAimSpeed * gamepads.p2.joysticks.right.horizontal)		
		}

		if (gamepads.p2.joysticks.right.vertical)
		{
			p2Crosshair.moveVertical(playerAimSpeed * gamepads.p2.joysticks.right.vertical)		
		}

		if (gamepads.p2.buttons.r1)
		{
			if (p2CanShoot)
			{
				sfxShoot.play()
				camera.shake(3, 20, 300)

				var bullet = new Entity()
					bullet.setSprite('images/bullet.png')
						  .setPosition(p2Head.x, p2Head.y)
						  .setAnchor(19, 12)
						  .setBound(-19, -12, 38, 24)
						  .setFriction(bulletFriction)
					p2Bullets.add(bullet)

				bullet.pushTowardDegree(p2Head.degree, bulletSpeed)

				p2CanShoot = false

				setTimeout(function()
				{
					p2CanShoot = true
				}, playerReloadTime)
			}
		}

		if (gamepads.p2.buttons.l1)
		{
			if (p2CanLay)
			{
				sfxMine.play()
				var mine = new Entity()
					mine.setSprite('images/mine.png')
						.setPosition(p2Head.x, p2Head.y)
						.setAnchor(11, 11)
						.setBound(-11, -11, 22, 22)
					p2Mines.add(mine)

				p2CanLay = false

				setTimeout(function()
				{
					p2CanLay = true
				}, playerReloadTime)
			}
		}
	}

	var i = game.checkCollision(p1Body, p2Bullets)

	if (i)
	{
		i.delete()
		p1Alive = false
	}

	var i = game.checkCollision(p2Body, p1Bullets)

	if (i)
	{
		i.delete()
		p2Alive = false
	}

	var i = game.checkCollision(p1Body, p2Mines)

	if (i)
	{
		i.delete()
		p1Alive = false
	}

	var i = game.checkCollision(p2Body, p1Mines)

	if (i)
	{
		i.delete()
		p2Alive = false
	}

	if (p1Alive)
	{
		p1Head.snapTo(p1Body.x, p1Body.y)
	}
	else
	{
		if (!p1Exploded)
		{
			p1Head.scatter(playerHeadScatterForce).spin(tool.random(2, playerHeadScatterForce * 2))
			p1Exploded = true

			setTimeout(function()
			{
				location.reload()
			}, 1250)
		}
	}

	if (p2Alive)
	{
		p2Head.snapTo(p2Body.x, p2Body.y)
	}
	else
	{
		if (!p2Exploded)
		{
			p2Head.scatter(playerHeadScatterForce).spin(tool.random(2, playerHeadScatterForce * 2))
			p2Exploded = true

			setTimeout(function()
			{
				location.reload()
			}, 1250)
		}
	}

	var i = boxes.database.length
	while (i--)
	{
		var j = game.checkCollision(boxes.database[i], p1Bullets)
		if (j)
		{
			j.delete()
		}
	}

	var i = boxes.database.length
	while (i--)
	{
		var j = game.checkCollision(boxes.database[i], p2Bullets)
		if (j)
		{
			j.delete()
		}
	}

	p1Crosshair.contain()
	p2Crosshair.contain()

	p1Head.rotateTo(tool.measureAngle(p1Head, p1Crosshair))
	p2Head.rotateTo(tool.measureAngle(p2Head, p2Crosshair))

	game.checkSolid(p1Body, boxes)
	game.checkSolid(p2Body, boxes)

	p1Head.applyPhysics()
	p2Head.applyPhysics()

	p1Body.contain().applyPhysics()
	p2Body.contain().applyPhysics()

	p1Bullets.steer().bounce().applyPhysics()
	p2Bullets.steer().bounce().applyPhysics()

	game.blank()
	flowers.draw()
	footprints.draw()
	p1Mines.draw()
	p2Mines.draw()

	boxes.buffer()
	p1Body.buffer()
	p2Body.buffer()
	p1Bullets.buffer()
	p2Bullets.buffer()
	game.draw()

	p1Head.draw()
	p2Head.draw()
	crosshairs.draw()

	// typewriter.hud().setPosition(10, 10).write('WASD to move, left click to shoot, right click for mine')
}

game.start(loading) // Only call once the room functions are defined

var p1MakeFootprint = function()
{
	var footprint = new Entity()
		footprint.setSprite('images/tank_footprint.png')
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
		footprint.setSprite('images/tank_footprint.png')
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