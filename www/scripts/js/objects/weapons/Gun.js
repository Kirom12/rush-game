/**
 * Class Gun
 * */
class Gun extends Weapon
{
	constructor(_Player)
	{
		super(
		[
			Game.Main.add.weapon(10, Graphics.drawStrokeRect(8, 8, 2, '#FCFF24','#FFF'))
		], _Player, 'gun');

		this.Weapon.trackSprite(_Player.Sprite, 0, 0, false);

		this.Weapon.bulletSpeed = 800;
		this.Weapon.fireRate = 350;

		this.damage = 25;
		this.recoil = 8;
	};

	update()
	{
		super.update();
	};
}