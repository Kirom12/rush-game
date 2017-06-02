/**
 * Class slow
 * */
class Slow extends Skill
{
	constructor()
	{
		super(5000, 10);
	};

	activate(_Player)
	{
		if (!this.isActivated && _Player.mana >= this.price)
		{
			this.isActivated = true;
			_Player.mana -= this.price;

			Spawner.currentTrouble = 'slow';

			//Update enemy speed
			for (let Enemy of Map.EnemiesGroup.children)
			{
				Enemy.Enemy.speed /= 2;
			}

			Game.Main.time.events.add(this.duration, this.deactivate, this);
		}
		else
		{
			//Message mana low
		}
	};

	deactivate()
	{
		this.isActivated = false;
		Spawner.currentTrouble = null;

		for (let Enemy of Map.EnemiesGroup.children)
		{
			Enemy.Enemy.speed *= 2;
		}
	}
}