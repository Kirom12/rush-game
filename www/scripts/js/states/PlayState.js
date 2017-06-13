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

		//Set sound
		Game.Sounds =
		{
			Hurt : Game.Main.add.audio('hurt'),
			Explosion : Game.Main.add.audio('explosion'),
			NewWave : Game.Main.add.audio('new-wave', 0.8),
			Lose : Game.Main.add.audio('lose'),
			Die : Game.Main.add.audio('die', 0.8)
		};

		Game.Musics =
		{
			M1 : 
			{
				Fx : Game.Main.add.audio('M1', 1, true),
				volume : 1
			},
			M2 : 
			{
				Fx : Game.Main.add.audio('M2', 0.7, true),
				volume : 0.7
			},
			M3 : 
			{
				Fx : Game.Main.add.audio('M3', 0.7, true),
				volume : 0.5
			},
			M4 : 
			{
				Fx : Game.Main.add.audio('M4', 0.8, true),
				volume : 0.8
			},
			Main : 
			{
				Fx : Game.Main.add.audio('main', 0.8, true),
				volume : 0.8
			}
		};

		Game.Main.physics.startSystem(Phaser.Physics.ARCADE);
		Game.Main.world.setBounds(0,0, Game.MainData.width, Game.MainData.height);
		Game.Main.physics.arcade.gravity.y = 0;

		Game.mainScore = 0;

		this.createPlayers();
		
		Map.construct();

		Map.create();

		for (let Player of Game.PlayersGroup.children)
		{
			Player.Player.setText();
		}

		//Text
		Game.Text.MainScore = Game.Main.add.text(Game.MainData.width/2, 30, Game.mainScore, Game.Text.Style.MainScore);
		Game.Text.Waves = Game.Main.add.text(Game.MainData.width/2, 50, 'wave', Game.Text.Style.Waves);
		Game.Text.MainScore.anchor.set(0.5);
		Game.Text.Waves.anchor.set(0.5);

		//Start music
		Game.Musics.Main.Fx.play('', 0, Game.Volume.music*Game.Musics.Main.volume);

		Game.createIconsElements();

		Game.DebugButtons =
		{
			God : Game.Main.input.keyboard.addKey(Phaser.Keyboard.G),
			DeGod : Game.Main.input.keyboard.addKey(Phaser.Keyboard.H),
			Pause : Game.Main.input.keyboard.addKey(Phaser.Keyboard.P)
		}
	};

	createPlayers()
	{
		Game.PlayersGroup = Game.Main.add.group();
		Game.PlayersGroup.Players = [];

		Game.Main.input.gamepad.start();

		new Player(600, 600, 0, 'Player 1', '#70baeb',
		{
			up : Game.Main.input.keyboard.addKey(38),
			down : Game.Main.input.keyboard.addKey(40),
			right : Game.Main.input.keyboard.addKey(39),
			left : Game.Main.input.keyboard.addKey(37),
			fire : Game.Main.input.keyboard.addKey(191),
			slow : Game.Main.input.keyboard.addKey(Phaser.Keyboard.K)
		}, Game.Main.input.gamepad.pad1);

		if (Game.nbPlayers > 1)
		{
			new Player(650, 600, 1, 'Player 2','#50ed62',
			{
				up : Game.Main.input.keyboard.addKey(Phaser.Keyboard.Z),
				down : Game.Main.input.keyboard.addKey(Phaser.Keyboard.S),
				right : Game.Main.input.keyboard.addKey(Phaser.Keyboard.D),
				left : Game.Main.input.keyboard.addKey(Phaser.Keyboard.Q),
				fire : Game.Main.input.keyboard.addKey(16),
				slow : Game.Main.input.keyboard.addKey(49)
			}, Game.Main.input.gamepad.pad2);	
		}

		if (Game.nbPlayers > 2)
		{
			new Player(700, 600, 2, 'Player 3','#e380f7',
			null, Game.Main.input.gamepad.pad3);
		}

		if (Game.nbPlayers > 3)
		{
			new Player(550, 600, 3, 'Player 4','#fff954',
			null, Game.Main.input.gamepad.pad4);	
		}
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

		if (Game.Debug.buttons)
		{
			this.debugButtons();
		}
	};

	debug()
	{
		Debug.getMousePosition();
	};

	debugButtons()
	{
		if (Game.DebugButtons.God.isDown && !Game.Debug.god)
		{
			console.log('GOD MODE ON');
			Game.Debug.god = true;

		}
		if (Game.DebugButtons.DeGod.isDown && Game.Debug.god)
		{
			console.log('GOD MODE OFF');
			Game.Debug.god = false;
		}
		// if (Game.DebugButtons.Pause.isDown)
		// {
		// 	if (Game.Debug.god)
		// 	{
		// 		console.log('PAUSE OFF');
		// 		Game.Main.paused = false;
		// 	}
		// 	else 
		// 	{
		// 		console.log('PAUSE ON');
		// 		Game.Main.paused = true;
		// 	}
		// }
	};

	static gameOver()
	{
		for (let Player of Game.PlayersGroup.children)
		{
			Player.Player.destroy();
		}

		let Screen = Game.Main.add.sprite(0, 0, Graphics.drawRect(Game.MainData.width, Game.MainData.height, "#000"));
		Screen.alpha = 0.4;
		Game.Main.add.tween(Screen).to( { alpha: 1 }, 5000, "Linear", true);

		Game.Text.GameOver = Game.Main.add.text(Game.MainData.width/2, Game.MainData.height/2-20, "Game Over !", Game.Text.Style.GameOver);
		Game.Text.GameOver.anchor.set(0.5);
		Game.Text.MainScoreGM = Game.Main.add.text(Game.MainData.width/2, Game.MainData.height/2+30, "Score : " + Game.mainScore, Game.Text.Style.MainScore);
		Game.Text.MainScoreGM.anchor.set(0.5);

		let Rect = Graphics.drawRect(250, 50, '#000');

		Game.Text.Restart = Game.Main.add.text(Game.MainData.width/2, Game.MainData.height/2+80, "Restart", Game.Text.Style.Restart);
		Game.Text.Restart.anchor.set(0.5);

		this.RestartButton = Game.Main.add.button(Game.MainData.width/2, Game.MainData.height/2+80, Rect, function(){PlayState.restart();}, this, 2, 1, 0);
		this.RestartButton.anchor.setTo(0.5);
		this.RestartButton.alpha = 0;
	};

	static restart()
	{
		location.reload();
	};
}