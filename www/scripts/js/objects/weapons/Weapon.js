/**
 * Class Weapon
 * */
//Todo : 
class Weapon
{
	constructor(_Weapons, _Player, _Sound = null, _volume = 0.8)
	{
		this.damage = 100;
		this.Weapons = _Weapons;
		this.Weapon = this.Weapons[0];

		if (_Sound)
		{
			this.Sound =
			{
				fx : Game.Main.add.sound(_Sound, _volume),
				time : 0
			}
		}
		else
		{
			this.Sound = null;
		}

		this.Player = _Player;

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

		Game.Main.world.bringToTop(Game.PlayersGroup);
	};

	update()
	{
		for (let Item of this.Weapons)
		{
			Game.Main.physics.arcade.collide(Item.bullets, Map.map.Layers.collide_wall, this.collideBulletWall, null, this);
			Game.Main.physics.arcade.collide(Item.bullets, Map.map.Layers.collide_ground, this.collideBulletWall, null, this);

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

		_Enemy.Enemy.hit(this.damage, this.Player);
	};

	fire()
	{
		for (let Item of this.Weapons)
		{
			Item.fire();
		}

		if (this.Sound)
		{
			this.playSound();
		}
	};

	destroy()
	{
		for (let Item of this.Weapons)
		{
			//Item.destroy();
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

	playSound()
	{
		if (Date.now() > this.Sound.time+this.Weapon.fireRate)
		{
			this.Sound.time = Date.now();
			this.Sound.fx.play();
		}
	};

	soundStopped()
	{
		
	};
}