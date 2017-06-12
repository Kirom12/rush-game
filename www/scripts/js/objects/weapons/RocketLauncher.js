/**
 * Class RocketLauncher
 * */
class RocketLauncher extends ExplosiveWeapon
{
	constructor(_Player)
	{
		super(
		[
			Game.Main.add.weapon(10, Graphics.drawStrokeRect(25, 12, 2,'#FCFF24', '#FFF'))
		], _Player, 'rocket-launcher', 0.3);

		this.Weapon.trackSprite(_Player.Sprite, 0, 0, false);

		this.Weapon.bulletSpeed = 800;
		this.Weapon.fireRate = 500;

		this.damage = 100;
		this.recoil = 8;
	};

	update()
	{
		super.update();
	};
}