/**
 * Class Enemy
 * */
class Enemy
{
	constructor(_x = 500, _y = 50, _color = 'yellow')
	{

		this.speed = 400;

		let bmd = Graphics.drawRect(30, 30, _color);

		this.Sprite = Game.Main.add.sprite(Game.MainData.width/2, _y, bmd);
		Game.Main.physics.enable(this.Sprite, Phaser.Physics.ARCADE);

		this.Sprite.anchor.setTo(0.5);

		this.Sprite.body.bounce.y = 0;
		this.Sprite.body.bounce.x = 0;
		this.Sprite.body.maxVelocity = 500;
		this.Sprite.body.gravity.y = 2000;
	};

	update()
	{
		Game.Main.physics.arcade.collide(this.Sprite, Map.map.Layers.collision_floor);
		Game.Main.physics.arcade.collide(this.Sprite, Map.map.Layers.collision_wall, this.collideEnemyWall, null, this);
		Game.Main.physics.arcade.collide(this.Sprite, Map.map.Layers.collision_gate, this.collideEnemyGate, null, this);

		this.Sprite.body.velocity.x = this.speed;
	};

	collideEnemyWall(_Sprite)
	{
		this.speed = this.speed*-1;
	};

	collideEnemyGate(_Sprite)
	{
		console.log('gate');
		_Sprite.kill();
	}
}