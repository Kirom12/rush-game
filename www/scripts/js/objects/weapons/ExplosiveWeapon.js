/**
 * Class ExplosiveWeapon
 * */
class ExplosiveWeapon extends Weapon
{
	constructor(_Weapons, _Player)
	{
		super(_Weapons, _Player);

		this.radius = 90;
		this.explosionTime = 200;
		this.damage = 100;

		this.Player = _Player;

		this.ExplosionSprite = Game.Main.add.sprite(-(this.radius*2), -(this.radius*2) , Graphics.drawCircle(this.radius, 'orange'));
		this.ExplosionSprite.anchor.setTo(0.5);
		Game.Main.physics.enable(this.ExplosionSprite, Phaser.Physics.ARCADE);

		this.HideExplosionTimer = Game.Main.time.create(false);
		this.HideExplosionTimer.loop(this.explosionTime, this.hideExplosion, this);
	};

	update()
	{
		Game.Main.physics.arcade.overlap(this.ExplosionSprite, Map.EnemiesGroup, this.collideExplosion, null, this);

		super.update();
	}

	collideBulletWall(_Bullet)
	{
		this.explode(_Bullet.position.x, _Bullet.position.y);
		
		_Bullet.kill();

	};

	collideEnemy(_Bullet, _Enemy)
	{
		this.explode(_Bullet.position.x, _Bullet.position.y);

		_Bullet.kill();
	};

	collideExplosion(_Explosion, _Enemy)
	{
		Map.Enemies[_Enemy.arrayIndex].hit(this.damage, this.Player);
	};

	explode(_x, _y)
	{
		this.ExplosionSprite.position.x = _x;
		this.ExplosionSprite.position.y = _y;

		this.HideExplosionTimer.start();
	};

	hideExplosion()
	{
		this.ExplosionSprite.position.x = -(this.radius*2);
		this.ExplosionSprite.position.y = -(this.radius*2);
	};
}