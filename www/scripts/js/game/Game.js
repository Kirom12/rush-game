/**
 * Static Game class
 * */
/* @TODO
 * Set enemy object in sprite object
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
			height : 864
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
			Waves : 
			{
				font: "16px Arial",
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
			PlayerMana :
			{
				font: "16px Arial",
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
		//Map
		Game.Main.load.tilemap('map1', 'assets/maps/map1.json', null, Phaser.Tilemap.TILED_JSON);

		//Map tilesets
		Game.Main.load.image('world-sp-0', 'assets/tilesets/world-sp-0.png');
		Game.Main.load.image('world-sp-1', 'assets/tilesets/world-sp-1.png');
		Game.Main.load.image('world-sp-2', 'assets/tilesets/world-sp-2.png');
		Game.Main.load.image('world-sp-3', 'assets/tilesets/world-sp-3.png');
		Game.Main.load.image('world-sp-4', 'assets/tilesets/world-sp-4.png');
		Game.Main.load.image('gui', 'assets/tilesets/gui.png');

		//Characters
		Game.Main.load.spritesheet('basic-monster', 'assets/characters/basic.png', 32, 32);
		Game.Main.load.spritesheet('fatty-monster', 'assets/characters/fatty.png', 48, 48);
		Game.Main.load.spritesheet('runner-monster', 'assets/characters/runner.png', 32, 32);
		Game.Main.load.spritesheet('cat', 'assets/characters/cat.png', 43, 48);

		Game.Main.load.spritesheet('explosion', 'assets/anims/explosions.png', 32, 32);
		Game.Main.load.spritesheet('big-explosion', 'assets/anims/big-explosion.png', 96, 96);

		//Items
		Game.Main.load.image('crate', 'assets/imgs/crate.png');

		//Tilesets
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