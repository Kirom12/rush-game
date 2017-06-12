/**
 * Class AutomaticRifle
 * */
class AutomaticRifle extends Weapon
{
	constructor(_Player)
	{
		super(
		[
			Game.Main.add.weapon(20, Graphics.drawStrokeCircle(6, 2,'#FCFF24', '#FFF'))
		], _Player, 'automatic-rifle');

		this.Weapon.trackSprite(_Player.Sprite, 0, 0, false);

		this.Weapon.bulletSpeed = 1000;
		this.Weapon.fireRate = 100;
		this.Weapon.bulletAngleVariance = 2;

		this.damage = 20;
		this.recoil = 6;

		this.Camera = 
		{
			strength : 0.002,
			time : 200
		}
	};

	update()
	{
		super.update();
	};
}