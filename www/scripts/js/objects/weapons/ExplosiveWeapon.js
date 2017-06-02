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

		this.ExplosionSprite = Game.Main.add.sprite(-100, -100 , 'big-explosion');
		this.ExplosionSprite.animations.add('explode', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 40, false);
		this.ExplosionSprite.anchor.setTo(0.5);
		this.ExplosionSprite.scale.setTo(1.5);

		this.ExplosionCollider = Game.Main.add.sprite(-(this.radius*2), -(this.radius*2) , Graphics.drawCircle(this.radius, 'orange'));
		this.ExplosionCollider.anchor.setTo(0.5);
		Game.Main.physics.enable(this.ExplosionCollider, Phaser.Physics.ARCADE);

		this.ExplosionCollider.alpha = 0;

		this.HideExplosionTimer = Game.Main.time.create(false);
		this.HideExplosionTimer.loop(this.explosionTime, this.hideExplosion, this);
	};

	update()
	{
		Game.Main.physics.arcade.overlap(this.ExplosionCollider, Map.EnemiesGroup, this.collideExplosion, null, this);

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
		_Enemy.Enemy.hit(this.damage, this.Player);
	};

	explode(_x, _y)
	{
		this.ExplosionSprite.animations.play('explode');
		this.ExplosionSprite.position.x = _x;
		this.ExplosionSprite.position.y = _y;

		this.ExplosionCollider.position.x = _x;
		this.ExplosionCollider.position.y = _y;

		this.HideExplosionTimer.start();
	};

	hideExplosion()
	{
		this.ExplosionCollider.position.x = -(this.radius*2);
		this.ExplosionCollider.position.y = -(this.radius*2);

		this.ExplosionSprite.position.x = -100;
		this.ExplosionSprite.position.y = -100;

	};
}