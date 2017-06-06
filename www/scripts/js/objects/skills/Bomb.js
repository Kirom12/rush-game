/**
 * Class slow
 * */
class Bomb extends Skill
{
	constructor()
	{
		super('Bomb', 1000, 400);
	};

	activate(_Player)
	{
		if (super.activate(_Player))
		{
			super.activate();

			this.isActivated = true;
			_Player.mana -= this.price;

			for (let i = Map.EnemiesGroup.children.length-1; i >= 0; i--)
			{
				Map.EnemiesGroup.children[i].Enemy.destroy();
			}

			Game.Main.time.events.add(this.duration, this.deactivate, this);
		}
	};

	deactivate()
	{
		super.deactivate();

		this.isActivated = false;
	}
}