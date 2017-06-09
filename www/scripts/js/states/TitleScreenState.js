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

		let Rect = Graphics.drawRect(250, 50, '#000')

		this.Button = 
		{
			OnePlayer : Game.Main.add.button(Game.MainData.width/2, Game.MainData.height/2-78, Rect, function(){this.start();}, this, 2, 1, 0),
			TwoPlayer : Game.Main.add.button(Game.MainData.width/2, Game.MainData.height/2-10, Rect, function(){this.start(2);}, this, 2, 1, 0),
			Competitive : Game.Main.add.button(Game.MainData.width/2, Game.MainData.height/2+65, Rect, function(){this.competitive();}, this, 2, 1, 0),
			Exit : Game.Main.add.button(Game.MainData.width/2+10, Game.MainData.height/2+195, Rect, function(){this.exit();}, this, 2, 1, 0)
		}

		this.Button.OnePlayer.anchor.setTo(0.5);
		this.Button.TwoPlayer.anchor.setTo(0.5);
		this.Button.Competitive.anchor.setTo(0.5);
		this.Button.Exit.anchor.setTo(0.5);

		this.Button.OnePlayer.alpha = 0;
		this.Button.TwoPlayer.alpha = 0;
		this.Button.Competitive.alpha = 0;
		this.Button.Exit.alpha = 0;

		Game.createIconsElements();
	};

	start(_nbPlayers = 1)
	{
		Game.nbPlayers = _nbPlayers;

		Game.Main.state.start('map-screen');
	};

	competitive()
	{
		Game.Main.state.start('competitive-screen');
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