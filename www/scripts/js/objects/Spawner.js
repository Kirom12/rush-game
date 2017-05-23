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
		if (Spawner.enemiesCount < Spawner.maxEnemies)
		{
			let rand = Math.random().toFixed(2);

			if (rand < Spawner.SpawnProbability.basic.proba)
			{
				Map.Enemies.push(new Basic(this.x, this.y, this.direction, this));
			}
			else if (rand < Spawner.SpawnProbability.fatty.proba)
			{
				Map.Enemies.push(new Fatty(this.x, this.y, this.direction, this));
			}
			else
			{
				Map.Enemies.push(new Runner(this.x, this.y, this.direction, this));
			}

			Map.Enemies[Map.Enemies.length-1].addToGroup();
			
			Spawner.enemiesCount++;

			if (Spawner.enemiesCount === Spawner.maxEnemies)
			{
				Game.Main.time.events.add(this.betweenSpawnTime, function()
				{
					Spawner.enemiesCount = 0;
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

		Spawner.enemiesCount = 0;
		Spawner.maxEnemies = (2*Map.currentWave)+Map.currentWave;
	};
}