/**
 * Class Weapon
 * */
//Todo : 
class Weapon
{
	constructor(_Weapons, _Player, _Sound = null, _volume = 0.8)
	{
		this.damage = 100;
		this.recoil = 8;

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
		};

		for (let Item of this.Weapons)
		{
			Item.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
			Item.fireAngle = 0;
		}

		this.Particles =
		{
			WallHit : Particles.create(0, 0, 4),
			EnemyHit : Particles.create(0, 0, 4),
			Fire : Particles.create(0, 0, 10)
		};

		Particles.configure(this.Particles.WallHit, Graphics.drawRect(4, 4, '#FFF'), 1, 1.5);

		Particles.configure(this.Particles.EnemyHit, Graphics.drawRect(4, 4, '#b00000'), 1, 1.5);

		Particles.configure(this.Particles.Fire, Graphics.drawRect(4, 4, '#FFF'), 1, 1.5, null, 20);

		this.Camera = 
		{
			strength : 0.001,
			time : 200
		};

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
		Particles.start(this.Particles.WallHit ,_Bullet.position.x, _Bullet.position.y, true, 200, null, 4);

		_Bullet.kill();
	};

	collideEnemy(_Bullet, _Enemy)
	{
		Particles.start(this.Particles.EnemyHit ,_Bullet.position.x, _Bullet.position.y, true, 200, null, 4);

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
			this.Sound.fx._sound.playbackRate.value = Random.rangeInt(8, 12, true)/10;

			Game.Main.camera.shake(this.Camera.strength, this.Camera.time);

			if (this.Player.orientation === 'W')
			{
				this.Player.Sprite.position.x += this.recoil;
				Particles.start(this.Particles.Fire ,this.Player.Sprite.position.x-40, this.Player.Sprite.position.y, true, 100, null, 4);
			} 
			else if (this.Player.orientation === 'E')
			{
				this.Player.Sprite.position.x -= this.recoil;
				Particles.start(this.Particles.Fire ,this.Player.Sprite.position.x+40, this.Player.Sprite.position.y, true, 100, null, 4);
			}
		}
	};
}