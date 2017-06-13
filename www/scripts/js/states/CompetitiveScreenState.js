/**
 * Class CompetitiveScreenState
 * */
class CompetitiveScreenState
{
	constructor()
	{
		
	};

	preload()
	{

	};

	create()
	{
		Game.Main.add.sprite(0 , 0, 'competitive-screen');

		let Rect = Graphics.drawRect(250, 50, '#000');
		let ExitRect = Graphics.drawRect(250, 50, '#000');

		this.Buttons = [];

		for (let i = 0; i < 3; i++)
		{
			this.Buttons.push(Game.Main.add.button(Game.MainData.width/2, 355+(i*56), Rect, function(){this.start(i+2);}, this, 2, 1, 0))
			this.Buttons[i].anchor.setTo(0.5);
			this.Buttons[i].alpha = 0;
		}

		this.ExitButton = Game.Main.add.button(Game.MainData.width/2, Game.MainData.height/2+195, ExitRect, function(){this.exit();}, this, 2, 1, 0);
		this.ExitButton.anchor.setTo(0.5);
		this.ExitButton.alpha = 0;

		Game.createIconsElements();
	};

	start(_nbPlayers)
	{
		Game.competitive = true;
		Game.nbPlayers = _nbPlayers;

		Game.Main.state.start('map-screen');
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