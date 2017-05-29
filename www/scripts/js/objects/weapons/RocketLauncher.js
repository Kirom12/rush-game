/**
 * Class RocketLauncher
 * */
class RocketLauncher extends ExplosiveWeapon
{
	constructor(_Player)
	{
		super(
		[
			Game.Main.add.weapon(10, Graphics.drawRect(12, 12, '#FFF'))
		], _Player);

		this.Weapon.trackSprite(_Player.Sprite, 0, 0, false);

		this.Weapon.bulletSpeed = 800;
		this.Weapon.fireRate = 500;
		this.damage = 100;
	};

	update()
	{
		super.update();
	};
}