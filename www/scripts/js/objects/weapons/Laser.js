/**
 * Class BigGun
 * */
class Laser extends Weapon
{
	constructor(_Player)
	{
		super(
		[
			Game.Main.add.weapon(10, Graphics.drawStrokeRect(35, 6, 2,'#FCFF24','#FFF'))
		], _Player, 'laser');

		this.Weapon.trackSprite(_Player.Sprite, 0, 0, false);

		this.Player = _Player;

		this.Weapon.bulletSpeed = 1000;
		this.Weapon.fireRate = 650;

		this.damage = 50;
		this.recoil = 10;
	};

	update()
	{

		Game.Main.physics.arcade.collide(this.Weapon.bullets, Map.map.Layers.collide_wall, this.collideBulletWall, null, this);
		Game.Main.physics.arcade.collide(this.Weapon.bullets, Map.map.Layers.collide_ground, this.collideBulletWall, null, this);

		Game.Main.physics.arcade.overlap(this.Weapon.bullets, Map.EnemiesGroup, this.collideEnemy, null, this);
	};

	collideEnemy(_Bullet, _Enemy)
	{
		_Enemy.Enemy.hit(this.damage, this.Player);
	};
}