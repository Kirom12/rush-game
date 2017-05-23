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
			width : 1280,
			height : 800
		};

		Game.Main = new Phaser.Game(Game.MainData.width, Game.MainData.height, Phaser.AUTO, Game.MainData.divName,
		{
			preload : Game.preload,
			create : Game.create,
			update : Game.update,
			render : Game.render
		});

		Game.Debug =
		{
			god : true,
			mousePosition : false
		}
	};

	static preload()
	{
		Game.Main.load.tilemap('test-map', 'assets/maps/test-map.json', null, Phaser.Tilemap.TILED_JSON);
		Game.Main.load.image('test-tileset', 'assets/tilesets/test-tileset.png');
	};

	static create()
	{
		Game.Main.state.add('play', PlayState);
		Game.Main.state.start('play');
	};

	static update()
	{

	};

	static render()
	{
		
	};
}