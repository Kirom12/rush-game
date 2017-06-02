/**
 * Class Spawner
 * */
class Spawner
{
	constructor(_x, _y, _direction)
	{
		this.x = _x;
		this.y = _y;
		this.direction = _direction;

		this.spawnTime = Phaser.Timer.SECOND * 1;
		this.betweenSpawnTime = Phaser.Timer.SECOND * 4;

		//Create spawers
		let bmd = Graphics.drawRect(10, 10, 'white');
		this.Sprite = Game.Main.add.sprite(this.x, this.y, bmd);

		this.Sprite.anchor.setTo(0.5);

		//Time event
		Game.Main.time.events.loop(this.spawnTime, this.spawnEnemy, this);
	};
 
	update()
	{
		
	};

	spawnEnemy()
	{
		if ((Spawner.enemiesCount < Spawner.maxEnemies) && !Spawner.inLoopEvent)
		{
			let rand = Math.random().toFixed(2);

			if (rand < Spawner.SpawnProbability.basic.proba)
			{
				new Basic(this.x, this.y, this.direction, this);
			}
			else if (rand < Spawner.SpawnProbability.fatty.proba)
			{
				new Fatty(this.x, this.y, this.direction, this);
			}
			else
			{
				new Runner(this.x, this.y, this.direction, this);
			}
			
			Spawner.enemiesCount++;

			if (Spawner.enemiesCount >= Spawner.maxEnemies)
			{
				Spawner.inLoopEvent = true;

				Game.Main.time.events.add(this.betweenSpawnTime, function()
				{
					Spawner.enemiesCount = 0;
					Spawner.inLoopEvent = false;
				}, this);
			}
		}
	};

	static staticConstructor()
	{
		Spawner.SpawnProbability =
		{
			basic : {id : 0, proba : .70},
			fatty : {id : 1, proba : .85},
			runner : {id : 2, proba : .100}
		};

		Spawner.inLoopEvent = false;

		Spawner.enemiesCount = 0;
		Spawner.setNewWave();
	};

	static setNewWave()
	{
		Spawner.maxEnemies = Game.mainScore+1;
	}
}