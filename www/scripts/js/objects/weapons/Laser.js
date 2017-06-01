/**
 * Class BigGun
 * */
class Laser extends Weapon
{
	constructor(_Player)
	{
		super(
		[
			Game.Main.add.weapon(10, Graphics.drawRect(12, 8, '#FFF'))
		], _Player);

		this.Weapon.trackSprite(_Player.Sprite, 0, 0, false);

		this.Player = _Player;

		this.Weapon.bulletSpeed = 1000;
		this.Weapon.fireRate = 650;
		this.damage = 50;
	};

	update()
	{

		Game.Main.physics.arcade.collide(this.Weapon.bullets, Map.map.Layers.collide_wall, this.collideBulletWall, null, this);
		Game.Main.physics.arcade.collide(this.Weapon.bullets, Map.map.Layers.collide_ground, this.collideBulletWall, null, this);

		Game.Main.physics.arcade.overlap(this.Weapon.bullets, Map.EnemiesGroup, this.collideEnemy, null, this);
	};

	collideEnemy(_Bullet, _Enemy)
	{
		Map.Enemies[_Enemy.arrayIndex].hit(this.damage, this.Player);
	};
}