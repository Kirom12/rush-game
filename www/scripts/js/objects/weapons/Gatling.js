/**
 * Class AutomaticRifle
 * */
class Gatling extends Weapon
{
	constructor(_Player)
	{
		super(
		[
			Game.Main.add.weapon(50, Graphics.drawCircle(6, '#FFF')),
			Game.Main.add.weapon(50, Graphics.drawCircle(6, '#FFF'))
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
		this.recoil = 6;
	};

	update()
	{
		super.update();
	};
}