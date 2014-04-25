var loading = function()
{
	if (l.loaded)
	{
		game.setRoom(waiting)
	}

	game.blank()
	typewriter.setPosition(10, 10).write('Loading')
}