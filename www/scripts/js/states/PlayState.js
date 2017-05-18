/**
 * Class PlayState
 * */
class PlayState
{
	constructor()
	{
		this.Players = [];
	}

	preload()
	{

	}

	create()
	{
		Log.print("playState - create");

		Game.Main.physics.startSystem(Phaser.Physics.ARCADE);
		Game.Main.world.setBounds(0,0, Game.MainData.width, Game.MainData.height);
		Game.Main.physics.arcade.gravity.y = 2000;

		Map.create();

		this.Players.push(new Player(650, 600, 'green',
		{
			up: Game.Main.input.keyboard.addKey(Phaser.Keyboard.Z),
			down: Game.Main.input.keyboard.addKey(Phaser.Keyboard.S),
			right: Game.Main.input.keyboard.addKey(Phaser.Keyboard.D),
			left: Game.Main.input.keyboard.addKey(Phaser.Keyboard.Q)
		}));

		this.Players.push(new Player(600, 600, 'blue', Game.Main.input.keyboard.createCursorKeys()));
	}

	update()
	{
		for (let player of this.Players)
		{
			Game.Main.physics.arcade.collide(player.Sprite, Map.map.Layers.collision_wall);
			player.update();
		}
	}
}