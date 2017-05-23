/**
 * Class Fatty
 * */
class Runner extends Enemy
{
	constructor(_x, _y, _initDirection, _Spawner)
	{
		super(18, 18, _x, _y, _initDirection, _Spawner, '#fdff76');

		this.initialSpeed = 400;
		this.speed = (_initDirection)? this.initialSpeed : -this.initialSpeed;
		this.life = 10;
	}
}