/**
 * Class AutomaticRifle
 * */
class Gatling extends Weapon
{
	constructor(_Player)
	{
		super(
		[
			Game.Main.add.weapon(50, Graphics.drawRect(8, 8, '#FFF')),
			Game.Main.add.weapon(50, Graphics.drawRect(8, 8, '#FFF'))
		], _Player, 'gatling');

		this.Weapons[0].trackSprite(_Player.Sprite, 0, -4, false);
		this.Weapons[1].trackSprite(_Player.Sprite, 0, 4, false);

		for (let Item of this.Weapons)
		{
			Item.bulletSpeed = 1000;
			Item.fireRate = 20;
			Item.bulletAngleVariance = 8;
		}

		this.damage = 25;
	};

	update()
	{
		super.update();
	};
}