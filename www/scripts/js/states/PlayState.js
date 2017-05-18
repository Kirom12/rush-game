/**
 * Class PlayState
 * */
class PlayState
{
	constructor()
	{

	}

	preload()
	{

	}

	create()
	{
		Log.print("playState - create");

		Game.Main.physics.startSystem(Phaser.Physics.ARCADE);
		Game.Main.world.setBounds(0,0, 1280, 800);
		Game.Main.physics.arcade.gravity.y = 200;

		Map.create();

		this.Player = new Player();

	}

	update()
	{
		this.Player.update();
	}
}