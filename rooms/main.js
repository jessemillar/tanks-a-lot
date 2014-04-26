var main = function()
{
	gamepads.update()

	p1Controls()

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

	var i = boxes.database.length
	while (i--)
	{
		var j = game.checkCollision(boxes.database[i], p1Bullets)
		if (j)
		{
			j.delete()
		}
	}

	p1Crosshair.contain()

	game.checkSolid(p1Body, boxes)
	game.checkSolid(p1Drone, boxes)

	p1Drone.contain().applyPhysics()

	if (p1Status == 'tank')
	{
		p1Head.rotateTo(tool.measureAngle(p1Head, p1Crosshair))
	}

	p1Head.applyPhysics()
	p1Body.contain().applyPhysics()

	p1Bullets.steer().applyPhysics()

	game.blank()
	flowers.draw()
	footprints.draw()
	p1Mines.draw()

	boxes.buffer()
	p1Drone.buffer()
	p1Body.buffer()
	p1Bullets.buffer()
	game.draw()

	p1Head.draw()
	if (p1Status == 'tank')
	{
		crosshairs.draw()
	}
}