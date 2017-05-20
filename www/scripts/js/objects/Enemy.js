/**
 * Class Enemy
 * */
class Enemy
{
	constructor(_x = Game.MainData.width/2, _y = 50, _initDirection = Math.random() >= 0.5, _Spawner,_color = 'yellow')
	{
		this.Spawner = _Spawner;
		this.initialSpeed = 300;

		this.speed = (_initDirection)? this.initialSpeed : -this.initialSpeed;

		let bmd = Graphics.drawRect(30, 30, _color);

		this.Sprite = Game.Main.add.sprite(_x, _y, bmd);
		Game.Main.physics.enable(this.Sprite, Phaser.Physics.ARCADE);

		this.Sprite.anchor.setTo(0.5);

		this.Sprite.body.bounce.y = 0;
		this.Sprite.body.bounce.x = 0;
		this.Sprite.body.maxVelocity = 500;
		this.Sprite.body.gravity.y = 2000;
	};

	addToGroup()
	{
		this.Sprite.arrayIndex = this.Spawner.Enemies.indexOf(this);

		Spawner.Enemies.add(this.Sprite);
	}

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
		console.log('gate');

		this.destroy(_Sprite);
	}

	destroy(_Sprite)
	{
		//Kill sprite and remove from enemies array
		_Sprite.kill();
		let index = this.Spawner.Enemies.indexOf(this);
		this.Spawner.Enemies.splice();
	}

	move()
	{
		this.Sprite.body.velocity.x = this.speed;
	}
}