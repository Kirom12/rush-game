/**
 * Class Fatty
 * */
class Fatty extends Enemy
{
	constructor(_x, _y, _initDirection, _Spawner)
	{
		super(100, 60, 60, _x, _y, _initDirection, _Spawner, 'fatty-monster', '#ffbd38');

		this.life = 100;
		this.score = 30;

		//Anmations
		this.Sprite.animations.add('idle', [4], 5, true);
		this.Sprite.animations.add('left', [6, 7, 8, 9], 5, true);
		this.Sprite.animations.add('right', [0, 1, 2, 3], 5, true);
	}
}