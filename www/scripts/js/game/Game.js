/**
 * Static Game class
 * */
/* @TODO
 * Set enemy object in sprite object
 * Correction gravity, jump and movements
 */
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
			god : false,
			mousePosition : false
		}
		
		Game.Text = {};
		Game.Text.Style =
		{
			MainScore : 
			{
				font: "32px Arial",
				fill: "#ff0044",
				align: "center"
				//backgroundColor: "#ffff00"
			},
			PlayerScore :
			{
				font: "26px Arial",
				fill: "#ff0044",
				align: "center"
			},
			GameOver : 
			{
				font: "64px Arial",
				fill: "#ff0044",
				align: "center"
			}
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