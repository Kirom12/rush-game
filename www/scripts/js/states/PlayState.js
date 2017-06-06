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

		Game.mainScore = 0;

		Map.construct();

		Map.create();

		Game.PlayersGroup = Game.Main.add.group();
		Game.PlayersGroup.Players = [];


		new Player(600, 600, 0, 'Player 1', '#70baeb',
		{
			up : Game.Main.input.keyboard.addKey(38),
			down : Game.Main.input.keyboard.addKey(40),
			right : Game.Main.input.keyboard.addKey(39),
			left : Game.Main.input.keyboard.addKey(37),
			fire : Game.Main.input.keyboard.addKey(187),
			slow : Game.Main.input.keyboard.addKey(Phaser.Keyboard.K),
			weapon : Game.Main.input.keyboard.addKey(Phaser.Keyboard.L),
			other : Game.Main.input.keyboard.addKey(Phaser.Keyboard.M)
		});

		if (Game.multiplayer) 
		{
			new Player(650, 600, 1, 'Player 2','#50ed62',
			{
				up : Game.Main.input.keyboard.addKey(Phaser.Keyboard.Z),
				down : Game.Main.input.keyboard.addKey(Phaser.Keyboard.S),
				right : Game.Main.input.keyboard.addKey(Phaser.Keyboard.D),
				left : Game.Main.input.keyboard.addKey(Phaser.Keyboard.Q),
				fire : Game.Main.input.keyboard.addKey(16),
				slow : Game.Main.input.keyboard.addKey(49),
				weapon : Game.Main.input.keyboard.addKey(50),
				other : Game.Main.input.keyboard.addKey(51)
			});	
		}


		Game.nbPlayers = Game.PlayersGroup.children.length;

		//Text
		Game.Text.MainScore = Game.Main.add.text(Game.MainData.width/2, 30, Game.mainScore, Game.Text.Style.MainScore);
		Game.Text.Waves = Game.Main.add.text(Game.MainData.width/2, 50, 'wave', Game.Text.Style.Waves);
		Game.Text.MainScore.anchor.set(0.5);
		Game.Text.Waves.anchor.set(0.5);

		//PlayState.gameOver();
	};

	update()
	{
		for (let Spawner of Map.Spawners)
		{
			Spawner.update();
		}

		for (let Enemy of Map.EnemiesGroup.children)
		{
			Enemy.Enemy.update();
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