/**
 * Class Basic
 * */
class Basic extends Enemy
{
	constructor(_x, _y, _initDirection, _Spawner)
	{
		super(250, 30, 30, _x, _y, _initDirection, _Spawner, 'basic-monster');

		this.life = 50;
		this.score = 10;

		//Anmations
		this.Sprite.animations.add('idle', [4], 10, true);
		this.Sprite.animations.add('left', [5, 6, 7, 8, 9], 10, true);
		this.Sprite.animations.add('right', [0, 1, 2, 3], 10, true);
	}
}