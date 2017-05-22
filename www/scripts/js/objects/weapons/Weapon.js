/**
 * Class Weapon
 * */
class Weapon
{
	constructor(_Weapons)
	{
		this.damage = 100;
		this.Weapons = _Weapons;
		this.Weapon = this.Weapons[0];

		this.defaultAngle =
		{
			w : 180,
			e : 0
		}

		for (let Item of this.Weapons)
		{
			Item.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
			Item.fireAngle = 0;
		}
	};

	update()
	{
		for (let Item of this.Weapons)
		{
			Game.Main.physics.arcade.collide(Item.bullets, Map.map.Layers.collision_wall, this.collideBulletWall, null, this);
			Game.Main.physics.arcade.collide(Item.bullets, Map.map.Layers.collision_floor, this.collideBulletWall, null, this);

			Game.Main.physics.arcade.collide(Item.bullets, Map.EnemiesGroup, this.collideEnemy, null, this);
		}
	};

	collideBulletWall(_Bullet)
	{
		_Bullet.kill();
	};

	collideEnemy(_Bullet, _Enemy)
	{
		_Bullet.kill();

		Map.Enemies[_Enemy.arrayIndex].hit(this.damage);
	};

	fire()
	{
		for (let Item of this.Weapons)
		{
			Item.fire();
		}
	};

	setOrientation(_orientation)
	{
		for (let Item of this.Weapons)
		{
			if (_orientation === 'W')
			{
				Item.fireAngle = this.defaultAngle.w;
			} 
			else if (_orientation === 'E')
			{
				Item.fireAngle = this.defaultAngle.e;
			}
			else
			{
				return false;
			}
		}
	};
}