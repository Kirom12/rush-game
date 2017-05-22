/**
 * Class GrenadeLauncher
 * */
class GrenadeLauncher extends ExplosiveWeapon
{
	constructor(_Player)
	{
		super(
		[
			Game.Main.add.weapon(10, Graphics.drawRect(8, 8, '#FFF'))
		]);

		this.Weapon.trackSprite(_Player.Sprite, 0, 0, false);

		this.Weapon.bulletSpeed = 800;
		this.Weapon.fireRate = 500;
		this.damage = 100;
		
		this.Weapon.bulletGravity.y = 1000;

		this.defaultAngle =
		{
			w : 195,
			e : -15
		};


	};

	update()
	{
		super.update();
	};
}