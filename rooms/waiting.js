var waiting = function()
{
	gamepads.update()

	if (gamepads.p1 && gamepads.p2)
	{
		game.setRoom(main)
	}

	game.blank()

	if (!gamepads.p1 && !gamepads.p2)
	{
		typewriter.setPosition(10, 10).write('Waiting for players')
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