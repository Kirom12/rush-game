/**
 * Class PlayState
 * */
class PlayState
{
	constructor()
	{
		this.Players = [];
	};

	preload()
	{

	};

	create()
	{
		Log.print("playState - create");

		Game.Main.physics.startSystem(Phaser.Physics.ARCADE);
		Game.Main.world.setBounds(0,0, Game.MainData.width, Game.MainData.height);
		Game.Main.physics.arcade.gravity.y = 0;

		Game.nbPlayers = 2;

		Map.construct();

		Map.create();

		this.Players.push(new Player(650, 600, 'green',
		{
			up : Game.Main.input.keyboard.addKey(Phaser.Keyboard.Z),
			down : Game.Main.input.keyboard.addKey(Phaser.Keyboard.S),
			right : Game.Main.input.keyboard.addKey(Phaser.Keyboard.D),
			left : Game.Main.input.keyboard.addKey(Phaser.Keyboard.Q),
			fire : Game.Main.input.keyboard.addKey(17)
		}));

		this.Players.push(new Player(600, 600, 'blue',
		{
			up : Game.Main.input.keyboard.addKey(38),
			down : Game.Main.input.keyboard.addKey(40),
			right : Game.Main.input.keyboard.addKey(39),
			left : Game.Main.input.keyboard.addKey(37),
			fire : Game.Main.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
		}));
	};

	update()
	{
		for (let Spawner of Map.Spawners)
		{
			Spawner.update();
		}

		for (let Enemy of Map.Enemies)
		{
			Enemy.update();
		}
		
		for (let Player of this.Players)
		{
			Player.update();
		}

		if (Game.Debug.mousePosition)
		{
			this.debug();
		}
	};

	debug()
	{
		Debug.getMousePosition();
	}
}