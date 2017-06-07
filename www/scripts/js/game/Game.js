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
			mousePosition : false,
			skillGod : false
		}

		Game.multiplayer = false;
		
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
				font: "20px Arial",
				fill: "#ff0044",
				align: "center"
			},
			PlayerManaText :
			{
				font: "12px Arial",
				fill: "white",
				align: "center"
			},
			PlayerManaValue :
			{
				font: "12px Arial",
				fill: "white",
				align: "center"
			},
			GameOver : 
			{
				font: "64px Arial",
				fill: "#ff0044",
				align: "center"
			},
			Skills :
			{
				font: "14px Arial",
				fill: "white",
				align: "center"
			},
			SkillCenterText :
			{
				font: "84px Arial",
				fill: "#ff0044",
				align: "center"
			},
			SkillCornerText :
			{
				font: "20px Arial",
				fill: "#ff0044",
				align: "center"
			},
			PlayerStatus :
			{
				font: "16px Arial",
				fill: "#ff0044",
				align: "center"
			}
		}

		Game.BarConfig =
		{
			Mana :
			{
				width: 100,
				height: 10,
				x: 0,
				y: 0,
				bg: {
					color: '#651828'
				},
				bar: {
					color: 'blue'
				},
				animationDuration: 200,
				flipped: false
			}
		}
	};

	static preload()
	{
		//Map
		Game.Main.load.tilemap('map1', 'assets/maps/map1.json', null, Phaser.Tilemap.TILED_JSON);
		Game.Main.load.tilemap('map2', 'assets/maps/map2.json', null, Phaser.Tilemap.TILED_JSON);
		Game.Main.load.tilemap('map3', 'assets/maps/map3.json', null, Phaser.Tilemap.TILED_JSON);

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
		Game.Main.load.spritesheet('player', 'assets/characters/player.png', 80, 64);

		Game.Main.load.spritesheet('explosion', 'assets/anims/explosions.png', 32, 32);
		Game.Main.load.spritesheet('big-explosion', 'assets/anims/big-explosion.png', 96, 96);

		//Items
		Game.Main.load.image('crate', 'assets/imgs/crate.png');

		//Backgrounds
		Game.Main.load.image('title-screen', 'assets/imgs/title-screen.jpg');
		Game.Main.load.image('map-screen', 'assets/imgs/map-screen.jpg');

		//Sounds
		Game.Main.load.audio('gun', 'assets/audio/effects/gun.wav');
		Game.Main.load.audio('laser', 'assets/audio/effects/laser.wav');
		Game.Main.load.audio('grenade-launcher', 'assets/audio/effects/grenade.wav');
		Game.Main.load.audio('gatling', 'assets/audio/effects/automatic-rifle.wav');
		Game.Main.load.audio('shotgun', 'assets/audio/effects/shotgun.wav');
		Game.Main.load.audio('rocket-launcher', 'assets/audio/effects/rocket-launcher.wav');
		Game.Main.load.audio('automatic-rifle', 'assets/audio/effects/automatic-rifle.wav');

		Game.Main.load.audio('explosion', 'assets/audio/effects/explosion-1.wav');
		Game.Main.load.audio('hurt', 'assets/audio/effects/hurt.wav');
		Game.Main.load.audio('new-wave', 'assets/audio/effects/new-wave.wav');
		Game.Main.load.audio('lose', 'assets/audio/effects/lose.wav');
		Game.Main.load.audio('die', 'assets/audio/effects/die.wav');

		//Music
		Game.Main.load.audio('M1', 'assets/audio/music/Ascending.mp3');
		Game.Main.load.audio('M2', 'assets/audio/music/BC-B-3.mp3');
		Game.Main.load.audio('M3', 'assets/audio/music/BC-Battle-Special.mp3');
		Game.Main.load.audio('M4', 'assets/audio/music/BC-Epic-Song.mp3');
		Game.Main.load.audio('main', 'assets/audio/music/main.mp3');
	};

	static create()
	{
		Game.Main.state.add('play', PlayState);
		Game.Main.state.add('title-screen', TitleScreenState);
		Game.Main.state.add('map-screen', MapScreenState);

		Game.Main.state.start('title-screen');
	};

	static update()
	{

	};

	static render()
	{
		
	};
}