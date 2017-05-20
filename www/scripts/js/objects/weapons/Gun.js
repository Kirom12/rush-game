/**
 * Class Gun
 * */
class Gun extends Weapon
{
	constructor(_Player)
	{
		super(
		[
			Game.Main.add.weapon(10, Graphics.drawRect(8, 8, '#FFF'))
		]);

		this.Weapon.trackSprite(_Player.Sprite, 0, 0, false);

		this.Weapon.bulletSpeed = 800;
		this.Weapon.fireRate = 300;
	};

	update()
	{
		super.update();
	};
}