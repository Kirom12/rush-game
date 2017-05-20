/**
 * Class Weapon
 * */
class Weapon
{
	constructor(_Weapons)
	{
		this.Weapons = _Weapons;
		this.Weapon = this.Weapons[0];

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
			
			for (let Sp of Map.Spawners)
			{
				Game.Main.physics.arcade.overlap(Item.bullets, Spawner.Enemies, this.collideEnemy, null, {this : this, _Spawner : Sp});
			}
		}
	};

	collideBulletWall(_Bullet)
	{
		_Bullet.kill();
	};

	collideEnemy(_Bullet, _Enemy, _Spawner)
	{
		_Bullet.kill();

		this._Spawner.Enemies[_Enemy.arrayIndex].destroy(_Enemy);
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
				Item.fireAngle = 180;
			} 
			else if (_orientation === 'E')
			{
				Item.fireAngle = 0;
			}
			else
			{
				return false;
			}
		}
	};
}