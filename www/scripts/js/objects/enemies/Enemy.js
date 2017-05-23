/**
 * Class Enemy
 * */
class Enemy
{
	constructor(_width = 30, _height = 30, _x = Game.MainData.width/2, _y = 50, _initDirection = Math.random() >= 0.5, _Spawner, _color = 'yellow')
	{
		this.Spawner = _Spawner;

		let bmd = Graphics.drawRect(_width, _height, _color);

		this.Sprite = Game.Main.add.sprite(_x, _y, bmd);
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

	};

	addToGroup()
	{
		this.Sprite.arrayIndex = Map.Enemies.indexOf(this);

		Map.EnemiesGroup.add(this.Sprite);
	};

	hit(_damage)
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
			this.destroy();
		}
	};

	update()
	{
		Game.Main.physics.arcade.collide(this.Sprite, Map.map.Layers.collision_floor);
		Game.Main.physics.arcade.collide(this.Sprite, Map.map.Layers.collision_wall, this.collideEnemyWall, null, this);
		Game.Main.physics.arcade.collide(this.Sprite, Map.map.Layers.collision_gate, this.collideEnemyGate, null, this);

		this.move();
	};

	collideEnemyWall(_Sprite)
	{
		this.speed = this.speed*-1;
	};

	collideEnemyGate(_Sprite)
	{
		this.destroy(_Sprite);
	}

	destroy()
	{
		//Kill sprite and remove from enemies array
		Map.EnemiesGroup.remove(this.Sprite);
		this.Sprite.kill();
		let index = Map.Enemies.indexOf(this);
		//Map.Enemies.splice(index, 1);
	}

	move()
	{
		this.Sprite.body.velocity.x = this.speed;
	}
}