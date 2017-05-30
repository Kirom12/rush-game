/**
 * Class Fatty
 * */
class Fatty extends Enemy
{
	constructor(_x, _y, _initDirection, _Spawner)
	{
		super(60, 60, _x, _y, _initDirection, _Spawner, 'fatty-monster', '#ffbd38');

		this.initialSpeed = 100;
		this.speed = (_initDirection)? this.initialSpeed : -this.initialSpeed;
		this.life = 100;

		this.score = 30;
	}
}