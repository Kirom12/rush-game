/**
 * Class Gun
 * */
class Gun extends Weapon
{
	constructor(_Player)
	{
		super();

		this.Weapon = Game.Main.add.weapon(10, Graphics.drawRect(8, 8, '#FFF'));

		this.Weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
		this.Weapon.bulletSpeed = 800;
		this.Weapon.fireRate = 300;

		this.Weapon.fireAngle = 0;		
	}

	update()
	{
		super.update();

		Game.Main.physics.arcade.collide(this.Weapon.bullets, Map.map.Layers.collision_wall, this.collideBulletWall, null, this);
	}

	collideBulletWall(_Bullet)
	{
		_Bullet.kill();
	}
}