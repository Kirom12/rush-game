/**
 * Class Basic
 * */
class Basic extends Enemy
{
	constructor(_x, _y, _initDirection, _Spawner)
	{
		super(30, 30, _x, _y, _initDirection, _Spawner, 'basic-monster');

		this.initialSpeed = 250;
		this.speed = (_initDirection)? this.initialSpeed : -this.initialSpeed;
		this.life = 50;

		this.score = 10;

		//Anmations
		this.Sprite.animations.add('idle', [4], 10, true);
		this.Sprite.animations.add('left', [5, 6, 7, 8, 9], 10, true);
		this.Sprite.animations.add('right', [0, 1, 2, 3], 10, true);
	}
}