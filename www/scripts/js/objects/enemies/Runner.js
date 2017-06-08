/**
 * Class Fatty
 * */
class Runner extends Enemy
{
	constructor(_x, _y, _initDirection, _Spawner)
	{
		super(400, 18, 18, _x, _y, _initDirection, _Spawner, 'runner-monster', '#fdff76');

		this.life = 10;
		this.score = 20;
		
		//Anmations
		this.Sprite.animations.add('idle', [4], 15, true);
		this.Sprite.animations.add('left', [4, 5, 6, 7], 15, true);
		this.Sprite.animations.add('right', [0, 1, 2, 3], 15, true);
	}
}