var main = function()
{
	gamepads.update()

	p1Controls()

	p2Controls()

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

	p1Bullets.steer().applyPhysics()
	p2Bullets.steer().applyPhysics()

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
}