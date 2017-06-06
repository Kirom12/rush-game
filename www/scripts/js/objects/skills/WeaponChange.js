/**
 * Class slow
 * */
class WeaponChange extends Skill
{
	constructor()
	{
		super('Weapon', 1000, 400);
	};

	activate(_Player)
	{
		if (super.activate(_Player))
		{
			this.isActivated = true;
			_Player.mana -= this.price;

			for (let Player of Game.PlayersGroup.children)
			{
				Player.Player.switchWeapon(Random.rangeInt(0, 7, true));
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