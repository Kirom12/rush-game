/**
 * Class PlayState
 * */
class TitleScreenState
{
	constructor()
	{
		
	};

	preload()
	{

	};

	create()
	{
		Game.Main.add.sprite(0 , 0, 'title-screen');

		let Rect = Graphics.drawRect(200, 50, '#000')

		this.Button = 
		{
			OnePlayer : Game.Main.add.button(Game.MainData.width/2, Game.MainData.height/2-78, Rect, function(){this.start(false);}, this, 2, 1, 0),
			TwoPlayer : Game.Main.add.button(Game.MainData.width/2, Game.MainData.height/2-10, Rect, function(){this.start(true);}, this, 2, 1, 0),
			Exit : Game.Main.add.button(Game.MainData.width/2+10, Game.MainData.height/2+195, Rect, function(){this.exit();}, this, 2, 1, 0)
		}

		this.Button.OnePlayer.anchor.setTo(0.5);
		this.Button.TwoPlayer.anchor.setTo(0.5);
		this.Button.Exit.anchor.setTo(0.5);

		this.Button.OnePlayer.alpha = 0;
		this.Button.TwoPlayer.alpha = 0;
		this.Button.Exit.alpha = 0;

		this.Button.OnePlayer.inputEnable = true;
		this.Button.TwoPlayer.inputEnable = true;
		this.Button.Exit.inputEnable = true;
	};

	start(_multiplayer = false)
	{
		Game.multiplayer = _multiplayer;

		Game.Main.state.start('play');
	};

	exit()
	{

	};

	update()
	{
		
	};

	debug()
	{
		
	};
}