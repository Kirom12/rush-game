/**
 * Class Spawner
 * */
class Spawner
{
	constructor(_x, _y, _direction)
	{
		this.x = _x;
		this.y = _y;
		this.direction = _direction;
		this.spawnTime = Phaser.Timer.SECOND * 2;

		//Create spawers
		let bmd = Graphics.drawRect(10, 10, 'white');
		this.Sprite = Game.Main.add.sprite(this.x, this.y, bmd);

		this.Sprite.anchor.setTo(0.5);

		//Time event
		Game.Main.time.events.loop(this.spawnTime, this.spawnEnemy, this)
	};

	update()
	{
		
	};

	spawnEnemy()
	{
		Map.Enemies.push(new Enemy(this.x, this.y, this.direction, this));
		Map.Enemies[Map.Enemies.length-1].addToGroup();
	};

	static staticConstructor()
	{
		Spawner.Enemies = Game.Main.add.group();
	}
}