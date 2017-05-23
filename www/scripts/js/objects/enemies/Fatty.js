/**
 * Class Fatty
 * */
class Fatty extends Enemy
{
	constructor(_x, _y, _initDirection, _Spawner)
	{
		super(60, 60, _x, _y, _initDirection, _Spawner, '#ffbd38');

		this.initialSpeed = 100;
		this.speed = (_initDirection)? this.initialSpeed : -this.initialSpeed;
		this.life = 200;
	}
}