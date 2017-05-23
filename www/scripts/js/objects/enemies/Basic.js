/**
 * Class Basic
 * */
class Basic extends Enemy
{
	constructor(_x, _y, _initDirection, _Spawner)
	{
		super(30, 30, _x, _y, _initDirection, _Spawner);

		this.initialSpeed = 250;
		this.speed = (_initDirection)? this.initialSpeed : -this.initialSpeed;
		this.life = 100;
	}
}