/**
 * Class PlayState
 * */
class MapScreenState
{
	constructor()
	{
		
	};

	preload()
	{

	};

	create()
	{
		Game.Main.add.sprite(0 , 0, 'map-screen');

		let Rect = Graphics.drawRect(355, 227, '#000');
		let ExitRect = Graphics.drawRect(250, 50, '#000');

		this.Buttons = [];

		for (let i = 0; i < 3; i++)
		{
			this.Buttons.push(Game.Main.add.button(249+(391*i), Game.MainData.height/2+43, Rect, function(){this.start('map'+(i+1));}, this, 2, 1, 0))
			this.Buttons[i].anchor.setTo(0.5);
			this.Buttons[i].alpha = 0;
		}

		this.ExitButton = Game.Main.add.button(Game.MainData.width/2, Game.MainData.height/2+195, ExitRect, function(){this.exit();}, this, 2, 1, 0);
		this.ExitButton.anchor.setTo(0.5);
		this.ExitButton.alpha = 0;

		Game.createIconsElements();
	};

	start(_map)
	{
		Game.currentMap = _map;

		Game.Main.state.start('play');
	};

	exit()
	{
		Game.Main.state.start('title-screen');
	};

	update()
	{
		
	};

	debug()
	{
		
	};
}