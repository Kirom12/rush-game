/**
 * Class Enemy
 * */
class Enemy
{
	constructor(_initialSpeed ,_width = 30, _height = 30, _x = Game.MainData.width/2, _y = 50, _initDirection = Math.random() >= 0.5, _Spawner, _spriteName, _color = 'yellow')
	{
		this.Spawner = _Spawner;

		this.initialSpeed = _initialSpeed;
		this.speed = (_initDirection)? this.initialSpeed : -this.initialSpeed;

		//let bmd = Graphics.drawRect(_width, _height, _color);

		this.Sprite = Game.Main.add.sprite(_x, _y, _spriteName);
		Game.Main.physics.enable(this.Sprite, Phaser.Physics.ARCADE);

		this.Sprite.anchor.setTo(0.5);

		this.Sprite.body.bounce.y = 0;
		this.Sprite.body.bounce.x = 0;
		this.Sprite.body.maxVelocity = 500;
		this.Sprite.body.gravity.y = 2000;

		this.HitText = Game.Main.add.text(-100, -100, '-', {
			font: '15px Arial',
			fill: 'red',
			align: 'center'
		});

		this.HitText.anchor.setTo(0.5);

		this.Particles =
		{
			Die : Game.Main.add.emitter(_x, _y, 6)
		}

		this.Particles.Die.makeParticles(Graphics.drawRect(7, 7, '#b00000'));
		this.Particles.Die.width = 30;
		this.Particles.Die.minParticleScale = 1;
		this.Particles.Die.maxParticleScale = 1.5;
		//this.Particles.Die.gravity = 500;

		//Add Enemy to group
		Map.EnemiesGroup.add(this.Sprite);
		Map.EnemiesGroup.children[Map.EnemiesGroup.children.indexOf(this.Sprite)].Enemy = this;

		switch (Spawner.currentTrouble)
		{
			case 'slow':
					this.speed /= 2;
					this.Sprite.tint = 0x7dd9f2;
				break;
			default:
		}

		switch (Spawner.styleEffect)
		{
			case 'fat-monster':
					this.Sprite.scale.setTo(1.5);
					this.life *= 1.5;
				break;
			default:
		}

	};

	hit(_damage, _Player)
	{
		this.Sprite.tint = 0xff3333;

		this.HitText.position.x = this.Sprite.position.x+(this.speed/20);
		this.HitText.position.y = this.Sprite.position.y-this.Sprite.height/1.5;

		Game.Main.time.events.add(Phaser.Timer.SECOND * 0.2, function()
		{
			this.Sprite.tint = 0xffffff;
			this.HitText.position.x = 0;
			this.HitText.position.y = 0;
		}, this);


		this.HitText.setText('-'+_damage);

		//Take damage
		this.life -= _damage;

		//Check life
		if (this.life <= 0)
		{
			Game.Sounds.Die.play();
			this.destroy(_Player);
		}
		else
		{
			Game.Sounds.Hurt.play();		
		}

	};

	update()
	{
		Game.Main.physics.arcade.collide(this.Sprite, Map.map.Layers.collide_ground);
		Game.Main.physics.arcade.collide(this.Sprite, Map.map.Layers.collide_wall, this.collideEnemyWall, null, this);
		Game.Main.physics.arcade.overlap(this.Sprite, Map.Cat.Sprite, this.collideEnemyGate, null, this);

		this.move();
	};

	collideEnemyWall(_Sprite)
	{
		this.speed = this.speed*-1;
	};

	collideEnemyGate(_Sprite)
	{
		Game.Sounds.Lose.play();

		if (!Game.Debug.god)
		{
			if (Map.mapLifes > 1)
			{
				Map.mapLifes--;
			}
			else
			{
				PlayState.gameOver();
			}
		}

		Map.Text.MapLifes.setText(Map.mapLifes);

		this.destroy();
	};

	destroy(_Player = null)
	{

		this.Particles.Die.x = this.Sprite.position.x;
		this.Particles.Die.y = this.Sprite.position.y;
		this.Particles.Die.start(true, 200, null, 10);

		//Kill sprite and remove from enemies array
		Map.EnemiesGroup.remove(this.Sprite);
		this.Sprite.kill();
		//let index = Map.Enemies.indexOf(this);
		//Map.Enemies.splice(index, 1);

		if (_Player)
		{
			_Player.increaseScore(this.score);
		}
	};

	move()
	{
		this.Sprite.body.velocity.x = this.speed;
		if (this.speed > 0)
		{
			this.Sprite.animations.play('right');
		}
		else if (this.speed < 0)
		{
			this.Sprite.animations.play('left');
		}
	};
}