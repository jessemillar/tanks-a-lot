var p2Controls = function()
{
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
					bullet.setSprite('images/weapons/bullet.png')
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
					mine.setSprite('images/weapons/mine.png')
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
}