/**
 * Class PlayState
 * */
class PlayState
{
	constructor()
	{
	
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

		Game.nbPlayers = 1;
		Game.mainScore = 0;

		Map.construct();

		Map.create();

		Game.PlayersGroup = Game.Main.add.group();
		Game.PlayersGroup.Players = [];

		// new Player(650, 600, 'green',
		// {
		// 	up : Game.Main.input.keyboard.addKey(Phaser.Keyboard.Z),
		// 	down : Game.Main.input.keyboard.addKey(Phaser.Keyboard.S),
		// 	right : Game.Main.input.keyboard.addKey(Phaser.Keyboard.D),
		// 	left : Game.Main.input.keyboard.addKey(Phaser.Keyboard.Q),
		// 	fire : Game.Main.input.keyboard.addKey(220)
		// });

		new Player(600, 600, 'blue',
		{
			up : Game.Main.input.keyboard.addKey(38),
			down : Game.Main.input.keyboard.addKey(40),
			right : Game.Main.input.keyboard.addKey(39),
			left : Game.Main.input.keyboard.addKey(37),
			fire : Game.Main.input.keyboard.addKey(187)
		});

		//Text
		Game.Text.MainScore = Game.Main.add.text(Game.MainData.width/2, 25, Game.mainScore, Game.Text.Style.MainScore);
		Game.Text.MainScore.anchor.set(0.5);

		//PlayState.gameOver();
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

		ItemsController.update();

		for (let Player of Game.PlayersGroup.children)
		{
			Player.Player.update();
		}

		Map.Cat.update();

		if (Game.Debug.mousePosition)
		{
			this.debug();
		}
	};

	debug()
	{
		Debug.getMousePosition();
	};

	static gameOver()
	{
		for (let Player of Game.PlayersGroup.children)
		{
			Player.Player.destroy();
		}

		Game.Text.GameOver = Game.Main.add.text(Game.MainData.width/2, Game.MainData.height/2, "Game Over !", Game.Text.Style.GameOver);
		Game.Text.GameOver.anchor.set(0.5);
		Game.Text.MainScoreGM = Game.Main.add.text(Game.MainData.width/2, Game.MainData.height/2+40, "Score : " + Game.mainScore, Game.Text.Style.MainScore);
		Game.Text.MainScoreGM.anchor.set(0.5);
	};
}