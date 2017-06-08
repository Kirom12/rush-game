/**
 * Class slow
 * */
class Slow extends Skill
{
	constructor()
	{
		super('Slow', 5000, 250);
	};

	activate(_Player)
	{

		if (super.activate(_Player))
		{
			this.isActivated = true;
			_Player.mana -= this.price;

			Spawner.currentTrouble = 'slow';

			//Update enemy speed
			for (let Enemy of Map.EnemiesGroup.children)
			{
				Enemy.Enemy.speed /= 2;
				Enemy.Enemy.Sprite.tint = 0x7dd9f2;

			}

			Game.Main.time.events.add(this.duration, this.deactivate, this);
		}
	};

	deactivate()
	{
		super.deactivate();

		this.isActivated = false;
		Spawner.currentTrouble = null;

		for (let Enemy of Map.EnemiesGroup.children)
		{
			Enemy.Enemy.speed *= 2;
			Enemy.Enemy.Sprite.tint = 0xffffff;
		}
	}
}