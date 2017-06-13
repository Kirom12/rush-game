/**
 * Class cat
 * */
class Cat
{
	constructor(_x, _y)
	{
		//LifeBar

		this.Sprite = Game.Main.add.sprite(_x, _y, 'cat');
		Game.Main.physics.enable(this.Sprite, Phaser.Physics.ARCADE);
		this.Sprite.anchor.setTo(0.5);

		this.Sprite.body.gravity.y = 1000;

		this.Sprite.animations.add('idle', [0, 1, 2, 3], 3, true);
	};

	update()
	{
		this.Sprite.animations.play('idle');

		Game.Main.physics.arcade.collide(this.Sprite, Map.map.Layers.collide_ground);
	};
}