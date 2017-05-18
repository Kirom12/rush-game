/**
 * Static Game class
 * */

class Game
{
	constructor(){};

	static init()
	{
		Game.MainData =
		{
			divName : 'game',
			width : 1200,
			height : 800
		};

		Game.Main = new Phaser.Game(Game.MainData.width, Game.MainData.height, Phaser.AUTO, Game.MainData.divName,
		{
			preload : Game.preload,
			create : Game.create,
			update : Game.update,
			render : Game.render
		});
	}

	static preload()
	{

	}

	static create()
	{
		Game.Main.state.add('play', PlayState);
		Game.Main.state.start('play');
	}

	static update()
	{

	}

	static render()
	{
		
	}
}