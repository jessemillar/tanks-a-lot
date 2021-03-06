var p1Controls = function()
{
	if (p1Status == 'drone')
	{
		p1CurrentVehicle = p1Drone
	}
	else if (p1Status == 'tank')
	{
		p1CurrentVehicle = p1Body
	}

	if (p1Alive)
	{
		if (gamepads.p1.buttons.r2)
		{
			p1CurrentVehicle.pushTowardDegree(p1CurrentVehicle.degree, playerSpeed)
			p1MakeFootprint()
		}
		else if (gamepads.p1.buttons.l2)
		{
			p1CurrentVehicle.pushTowardDegree(p1CurrentVehicle.degree - 180, playerSpeed * 0.75)
			p1MakeFootprint()
		}

		if (gamepads.p1.joysticks.left.horizontal > 0)
		{
			p1CurrentVehicle.rotate(-playerRotateSpeed * Math.abs(gamepads.p1.joysticks.left.horizontal))
			
			p1MakeFootprint()
		}
		else if (gamepads.p1.joysticks.left.horizontal < 0)
		{
			p1CurrentVehicle.rotate(playerRotateSpeed * Math.abs(gamepads.p1.joysticks.left.horizontal))
			
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

		if (p1Status == 'drone')
		{
			if (gamepads.p1.buttons.triangle)
			{
				if (tool.measureDistance(p1Drone, p1Body) < p1HackDistance)
				{
					p1Status = 'tank'
				}
			}
		}
		else if (p1Status == 'tank')
		{
			if (gamepads.p1.buttons.r1)
			{
				if (p1CanShoot)
				{
					sfxShoot.play()
					camera.shake(3, 20, 300)

					var bullet = new Entity()
						bullet.setSprite('images/weapons/bullet.png')
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
						mine.setSprite('images/weapons/mine.png')
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
	}
}